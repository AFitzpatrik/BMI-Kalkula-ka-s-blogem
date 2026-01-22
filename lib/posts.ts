import fs from 'fs'
import path from 'path'
import { Pool } from 'pg'

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  createdAt: string
  updatedAt: string
  slug: string
}

const postsDirectory = path.join(process.cwd(), 'data')
const postsFile = path.join(postsDirectory, 'posts.json')

// PostgreSQL pool - pro produkci
let pgPool: Pool | null = null

function getPGPool(): Pool | null {
  if (pgPool) return pgPool
  
  // Jen pokud je dostupná DATABASE_URL (Neon PostgreSQL)
  if (process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
    try {
      pgPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      })
      console.log('✅ Using Neon PostgreSQL for storage')
      return pgPool
    } catch (error) {
      console.error('PostgreSQL connection failed:', error)
    }
  }
  return null
}

// Inicializovat databázovou tabulku
async function initDB() {
  const pool = getPGPool()
  if (!pool) return
  
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      )
    `)
    console.log('✅ Database initialized')
  } catch (error) {
    console.error('Database init error:', error)
  }
}

// Filesystem - pro dev a fallback
function ensureDirectoryExists() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }
    if (!fs.existsSync(postsFile)) {
      fs.writeFileSync(postsFile, JSON.stringify([], null, 2), 'utf-8')
    }
  } catch (error) {
    console.error('Error ensuring directory exists:', error)
  }
}

// Čtení z filesystem
function readFromFS(): BlogPost[] {
  try {
    ensureDirectoryExists()
    const fileContents = fs.readFileSync(postsFile, 'utf-8')
    const posts: BlogPost[] = JSON.parse(fileContents || '[]')
    return posts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch (error) {
    console.error('Error reading from filesystem:', error)
    return []
  }
}

// Psaní do filesystem
function writeToFS(posts: BlogPost[]) {
  try {
    ensureDirectoryExists()
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing to filesystem:', error)
    throw error
  }
}

// Čtení z PostgreSQL
async function readFromDB(): Promise<BlogPost[]> {
  const pool = getPGPool()
  if (!pool) return []
  
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    )
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      content: row.content,
      excerpt: row.excerpt,
      author: row.author,
      slug: row.slug,
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
    }))
  } catch (error) {
    console.error('Database read error:', error)
    return []
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const pool = getPGPool()
  
  if (pool) {
    try {
      await initDB()
      return await readFromDB()
    } catch (error) {
      console.error('❌ Database error:', error)
      return readFromFS()
    }
  }
  
  // Dev mode - use filesystem
  return readFromFS()
}
export function getPostBySlug(slug: string): BlogPost | null {
  const posts = readFromFS()
  return posts.find(post => post.slug === slug) || null
}

export async function getPostBySlugAsync(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Promise<BlogPost> {
  try {
    const pool = getPGPool()
    const allPosts = await getAllPosts()
    
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    // Zajistíme unikátní slug
    let uniqueSlug = slug
    let counter = 1
    while (allPosts.some(p => p.slug === uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`
      counter++
    }

    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      slug: uniqueSlug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (pool) {
      await initDB()
      await pool.query(
        'INSERT INTO blog_posts (id, title, content, excerpt, author, slug, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [newPost.id, newPost.title, newPost.content, newPost.excerpt, newPost.author, newPost.slug, newPost.createdAt, newPost.updatedAt]
      )
      console.log('✅ Post created in PostgreSQL:', newPost.id, newPost.title)
    } else {
      const posts = [...allPosts, newPost]
      writeToFS(posts)
      console.log('✅ Post created in FS:', newPost.id, newPost.title)
    }
    
    return newPost
  } catch (error) {
    console.error('❌ Error creating post:', error)
    throw error
  }
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const pool = getPGPool()
    const allPosts = await getAllPosts()
    const index = allPosts.findIndex(p => p.id === id)
    
    if (index === -1) return null

    const updatedPost: BlogPost = {
      ...allPosts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    if (pool) {
      await initDB()
      await pool.query(
        'UPDATE blog_posts SET title=$1, content=$2, excerpt=$3, author=$4, updated_at=$5 WHERE id=$6',
        [updatedPost.title, updatedPost.content, updatedPost.excerpt, updatedPost.author, updatedPost.updatedAt, id]
      )
      console.log('✅ Post updated in PostgreSQL:', id)
    } else {
      const posts = [...allPosts]
      posts[index] = updatedPost
      writeToFS(posts)
      console.log('✅ Post updated in FS:', id)
    }
    
    return updatedPost
  } catch (error) {
    console.error('❌ Error updating post:', error)
    throw error
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const pool = getPGPool()
    const allPosts = await getAllPosts()
    const filteredPosts = allPosts.filter(p => p.id !== id)
    
    if (filteredPosts.length === allPosts.length) return false

    if (pool) {
      await initDB()
      await pool.query('DELETE FROM blog_posts WHERE id=$1', [id])
      console.log('✅ Post deleted from PostgreSQL:', id)
    } else {
      writeToFS(filteredPosts)
      console.log('✅ Post deleted from FS:', id)
    }
    
    return true
  } catch (error) {
    console.error('❌ Error deleting post:', error)
    throw error
  }
}
