import fs from 'fs'
import path from 'path'

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

// KV instance
let kvClient: any = null

async function getKVClient() {
  if (kvClient) return kvClient
  
  // Jen na produkci a pokud jsou dostupné KV proměnné
  if (process.env.NODE_ENV === 'production' && process.env.KV_REST_API_URL) {
    try {
      const { kv } = await import('@vercel/kv')
      kvClient = kv
      console.log('✅ Using Vercel KV for storage')
      return kvClient
    } catch (error) {
      console.error('KV not available, falling back to filesystem:', error)
    }
  }
  return null
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

export async function getAllPosts(): Promise<BlogPost[]> {
  const kv = await getKVClient()
  
  if (kv && process.env.KV_REST_API_URL) {
    try {
      const posts = await kv.get('blog-posts')
      console.log('✅ Read from KV:', posts?.length || 0, 'posts')
      return posts || []
    } catch (error) {
      console.error('❌ KV read error:', error)
      // Fallback to filesystem
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
    const kv = await getKVClient()
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

    const posts = [...allPosts, newPost]
    
    if (kv && process.env.KV_REST_API_URL) {
      await kv.set('blog-posts', posts)
      console.log('✅ Post created in KV:', newPost.id, newPost.title)
    } else {
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
    const kv = await getKVClient()
    const allPosts = await getAllPosts()
    const index = allPosts.findIndex(p => p.id === id)
    
    if (index === -1) return null

    const updatedPost: BlogPost = {
      ...allPosts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    allPosts[index] = updatedPost
    
    if (kv && process.env.KV_REST_API_URL) {
      await kv.set('blog-posts', allPosts)
      console.log('✅ Post updated in KV:', id)
    } else {
      writeToFS(allPosts)
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
    const kv = await getKVClient()
    const allPosts = await getAllPosts()
    const filteredPosts = allPosts.filter(p => p.id !== id)
    
    if (filteredPosts.length === allPosts.length) return false

    if (kv && process.env.KV_REST_API_URL) {
      await kv.set('blog-posts', filteredPosts)
      console.log('✅ Post deleted from KV:', id)
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
