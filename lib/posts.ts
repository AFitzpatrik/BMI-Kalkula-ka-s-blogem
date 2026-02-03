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
  coverImage?: string
  coverAlt?: string
}

let pool: Pool | null = null

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  }
  return pool
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const client = await getPool().connect()
    const result = await client.query(
      'SELECT * FROM posts ORDER BY "createdAt" DESC'
    )
    client.release()
    return result.rows as BlogPost[]
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  // Synchronous wrapper - not ideal, use getPostBySlugAsync instead
  console.warn('getPostBySlug called - use getPostBySlugAsync instead')
  return null
}

export async function getPostBySlugAsync(slug: string): Promise<BlogPost | null> {
  try {
    const client = await getPool().connect()
    const result = await client.query(
      'SELECT * FROM posts WHERE slug = $1',
      [slug]
    )
    client.release()
    return result.rows[0] || null
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

export async function createPost(
  post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'slug'>
): Promise<BlogPost> {
  try {
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const allPosts = await getAllPosts()
    let uniqueSlug = slug
    let counter = 1
    while (allPosts.some(p => p.slug === uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`
      counter++
    }

    const now = new Date().toISOString()
    const id = Date.now().toString()

    const client = await getPool().connect()
    const result = await client.query(
      `INSERT INTO posts (id, title, slug, content, excerpt, author, "coverImage", "coverAlt", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        id,
        post.title,
        uniqueSlug,
        post.content,
        post.excerpt,
        post.author,
        post.coverImage || null,
        post.coverAlt || null,
        now,
        now,
      ]
    )
    client.release()

    console.log('✅ Post created in DB:', id, post.title)
    return result.rows[0] as BlogPost
  } catch (error) {
    console.error('❌ Error creating post:', error)
    throw error
  }
}

export async function updatePost(
  id: string,
  updates: Partial<BlogPost>
): Promise<BlogPost | null> {
  try {
    const now = new Date().toISOString()
    const client = await getPool().connect()

    // Get existing post
    const existing = await client.query('SELECT * FROM posts WHERE id = $1', [id])
    if (existing.rows.length === 0) {
      client.release()
      return null
    }

    const post = existing.rows[0]
    const updated = { ...post, ...updates, updatedAt: now }

    // Update
    const result = await client.query(
      `UPDATE posts SET title = $1, content = $2, excerpt = $3, author = $4, "coverImage" = $5, "coverAlt" = $6, "updatedAt" = $7
       WHERE id = $8
       RETURNING *`,
      [
        updated.title,
        updated.content,
        updated.excerpt,
        updated.author,
        updated.coverImage || null,
        updated.coverAlt || null,
        now,
        id,
      ]
    )
    client.release()

    console.log('✅ Post updated in DB:', id)
    return result.rows[0] as BlogPost
  } catch (error) {
    console.error('❌ Error updating post:', error)
    throw error
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const client = await getPool().connect()
    const result = await client.query('DELETE FROM posts WHERE id = $1', [id])
    client.release()

    console.log('✅ Post deleted from DB:', id)
    return result.rowCount ? result.rowCount > 0 : false
  } catch (error) {
    console.error('❌ Error deleting post:', error)
    throw error
  }
}
