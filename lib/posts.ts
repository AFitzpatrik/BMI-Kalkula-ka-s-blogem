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

// Používáme Vercel KV pro production, filesystem pro development
let kv: any = null

async function initKV() {
  if (kv) return kv
  
  try {
    if (process.env.NODE_ENV === 'production') {
      const { kv: vercelKv } = await import('@vercel/kv')
      kv = vercelKv
    }
  } catch (error) {
    console.log('KV not available, using filesystem')
  }
  
  return kv
}

const postsDirectory = path.join(process.cwd(), 'data')
const postsFile = path.join(postsDirectory, 'posts.json')

// Filesystem fallback
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

function getLocalPosts(): BlogPost[] {
  try {
    ensureDirectoryExists()
    const fileContents = fs.readFileSync(postsFile, 'utf-8')
    const posts: BlogPost[] = JSON.parse(fileContents || '[]')
    return posts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const kvInstance = await initKV()
    
    if (kvInstance && process.env.KV_REST_API_URL) {
      try {
        const posts = await kvInstance.get('blog-posts')
        return posts || []
      } catch (error) {
        console.error('KV read error:', error)
        return getLocalPosts()
      }
    }
    
    return getLocalPosts()
  } catch (error) {
    console.error('Error getting all posts:', error)
    return getLocalPosts()
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getLocalPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function getPostBySlugAsync(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Promise<BlogPost> {
  try {
    const kvInstance = await initKV()
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
    
    if (kvInstance && process.env.KV_REST_API_URL) {
      await kvInstance.set('blog-posts', posts)
    } else {
      ensureDirectoryExists()
      fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf-8')
    }
    
    console.log('Post created:', newPost.id)
    return newPost
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const kvInstance = await initKV()
    const allPosts = await getAllPosts()
    const index = allPosts.findIndex(p => p.id === id)
    
    if (index === -1) return null

    const updatedPost: BlogPost = {
      ...allPosts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    allPosts[index] = updatedPost
    
    if (kvInstance && process.env.KV_REST_API_URL) {
      await kvInstance.set('blog-posts', allPosts)
    } else {
      ensureDirectoryExists()
      fs.writeFileSync(postsFile, JSON.stringify(allPosts, null, 2), 'utf-8')
    }
    
    console.log('Post updated:', id)
    return updatedPost
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const kvInstance = await initKV()
    const allPosts = await getAllPosts()
    const filteredPosts = allPosts.filter(p => p.id !== id)
    
    if (filteredPosts.length === allPosts.length) return false

    if (kvInstance && process.env.KV_REST_API_URL) {
      await kvInstance.set('blog-posts', filteredPosts)
    } else {
      ensureDirectoryExists()
      fs.writeFileSync(postsFile, JSON.stringify(filteredPosts, null, 2), 'utf-8')
    }
    
    console.log('Post deleted:', id)
    return true
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}
