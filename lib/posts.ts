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

// Zajistíme, že adresář existuje
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

// Vždycky čteme z filesystem (nejspolehlivější)
export async function getAllPosts(): Promise<BlogPost[]> {
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

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    ensureDirectoryExists()
    const fileContents = fs.readFileSync(postsFile, 'utf-8')
    const posts: BlogPost[] = JSON.parse(fileContents || '[]')
    return posts.find(post => post.slug === slug) || null
  } catch (error) {
    console.error('Error reading post:', error)
    return null
  }
}

export async function getPostBySlugAsync(slug: string): Promise<BlogPost | null> {
  return getPostBySlug(slug)
}

export async function createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Promise<BlogPost> {
  try {
    ensureDirectoryExists()
    const fileContents = fs.readFileSync(postsFile, 'utf-8')
    const posts: BlogPost[] = JSON.parse(fileContents || '[]')
    
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    // Zajistíme unikátní slug
    let uniqueSlug = slug
    let counter = 1
    while (posts.some(p => p.slug === uniqueSlug)) {
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

    posts.push(newPost)
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf-8')
    
    console.log('✅ Post created:', newPost.id, newPost.title)
    return newPost
  } catch (error) {
    console.error('❌ Error creating post:', error)
    throw error
  }
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    ensureDirectoryExists()
    const fileContents = fs.readFileSync(postsFile, 'utf-8')
    const posts: BlogPost[] = JSON.parse(fileContents || '[]')
    const index = posts.findIndex(p => p.id === id)
    
    if (index === -1) return null

    const updatedPost: BlogPost = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    posts[index] = updatedPost
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf-8')
    
    console.log('✅ Post updated:', id)
    return updatedPost
  } catch (error) {
    console.error('❌ Error updating post:', error)
    throw error
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    ensureDirectoryExists()
    const fileContents = fs.readFileSync(postsFile, 'utf-8')
    const posts: BlogPost[] = JSON.parse(fileContents || '[]')
    const filteredPosts = posts.filter(p => p.id !== id)
    
    if (filteredPosts.length === posts.length) return false

    fs.writeFileSync(postsFile, JSON.stringify(filteredPosts, null, 2), 'utf-8')
    console.log('✅ Post deleted:', id)
    return true
  } catch (error) {
    console.error('❌ Error deleting post:', error)
    throw error
  }
}
