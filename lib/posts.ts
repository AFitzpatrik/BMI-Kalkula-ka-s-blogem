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
  coverImage?: string
  coverAlt?: string
}

const postsDirectory = path.join(process.cwd(), 'posts')

function ensureDirectoryExists() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }
  } catch (error) {
    console.error('Error ensuring directory exists:', error)
  }
}

function parseFrontmatter(fileContent: string): { data: Record<string, string>; content: string } {
  const fmRegex = /^---\s*[\r\n]+([\s\S]*?)\r?\n---\s*[\r\n]*/
  const match = fileContent.match(fmRegex)

  if (!match) {
    return { data: {}, content: fileContent.trim() }
  }

  const raw = match[1]
  const data: Record<string, string> = {}

  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed) return
    const separatorIndex = trimmed.indexOf(':')
    if (separatorIndex === -1) return
    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed.slice(separatorIndex + 1).trim()
    data[key] = normalizeFrontmatterValue(value)
  })

  const content = fileContent.slice(match[0].length).trim()
  return { data, content }
}

function normalizeFrontmatterValue(value: string): string {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    try {
      return JSON.parse(trimmed)
    } catch {
      return trimmed.slice(1, -1)
    }
  }
  return trimmed
}

function stringifyFrontmatter(data: Record<string, string>, content: string): string {
  const lines = Object.entries(data).map(([key, value]) => {
    const safeValue = typeof value === 'string' ? value.replace(/\r?\n/g, ' ').trim() : String(value)
    return `${key}: ${JSON.stringify(safeValue)}`
  })
  return `---\n${lines.join('\n')}\n---\n\n${content.trim()}\n`
}

function getMarkdownFilePath(slug: string) {
  return path.join(postsDirectory, `${slug}.md`)
}

function buildPostFromFile(filePath: string): BlogPost | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = parseFrontmatter(fileContent)
    const stats = fs.statSync(filePath)
    const slug = path.basename(filePath, '.md')

    const createdAt = data.createdAt || data.created_at || stats.birthtime.toISOString()
    const updatedAt = data.updatedAt || data.updated_at || stats.mtime.toISOString()
    const excerpt = data.excerpt || content.split(/\r?\n/).find((line) => line.trim())?.slice(0, 180) || ''

    return {
      id: data.id || slug,
      title: data.title || slug,
      content,
      excerpt,
      author: data.author || 'Neznámý autor',
      slug,
      createdAt,
      updatedAt,
      coverImage: data.coverImage || data.cover_image || undefined,
      coverAlt: data.coverAlt || data.cover_alt || undefined,
    }
  } catch (error) {
    console.error('Error parsing markdown file:', filePath, error)
    return null
  }
}

function readFromFS(): BlogPost[] {
  try {
    ensureDirectoryExists()
    const files = fs.readdirSync(postsDirectory)
    const posts = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => buildPostFromFile(path.join(postsDirectory, file)))
      .filter((post): post is BlogPost => Boolean(post))

    return posts.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch (error) {
    console.error('Error reading from filesystem:', error)
    return []
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return readFromFS()
}
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = getMarkdownFilePath(slug)
    if (!fs.existsSync(filePath)) return null
    return buildPostFromFile(filePath)
  } catch (error) {
    console.error('Error reading post by slug:', error)
    return null
  }
}

export async function getPostBySlugAsync(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Promise<BlogPost> {
  try {
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

    ensureDirectoryExists()
    const filePath = getMarkdownFilePath(newPost.slug)
    const frontmatterData: Record<string, string> = {
      id: newPost.id,
      title: newPost.title,
      excerpt: newPost.excerpt,
      author: newPost.author,
      createdAt: newPost.createdAt,
      updatedAt: newPost.updatedAt,
    }
    if (newPost.coverImage) frontmatterData.coverImage = newPost.coverImage
    if (newPost.coverAlt) frontmatterData.coverAlt = newPost.coverAlt

    const fileContent = stringifyFrontmatter(frontmatterData, newPost.content)
    fs.writeFileSync(filePath, fileContent, 'utf-8')
    console.log('✅ Post created in FS (markdown):', newPost.id, newPost.title)
    
    return newPost
  } catch (error) {
    console.error('❌ Error creating post:', error)
    throw error
  }
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const allPosts = await getAllPosts()
    const index = allPosts.findIndex(p => p.id === id)
    
    if (index === -1) return null

    const updatedPost: BlogPost = {
      ...allPosts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    ensureDirectoryExists()
    const filePath = getMarkdownFilePath(updatedPost.slug)
    const frontmatterData: Record<string, string> = {
      id: updatedPost.id,
      title: updatedPost.title,
      excerpt: updatedPost.excerpt,
      author: updatedPost.author,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    }
    if (updatedPost.coverImage) frontmatterData.coverImage = updatedPost.coverImage
    if (updatedPost.coverAlt) frontmatterData.coverAlt = updatedPost.coverAlt

    const fileContent = stringifyFrontmatter(frontmatterData, updatedPost.content)
    fs.writeFileSync(filePath, fileContent, 'utf-8')
    console.log('✅ Post updated in FS (markdown):', id)
    
    return updatedPost
  } catch (error) {
    console.error('❌ Error updating post:', error)
    throw error
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const allPosts = await getAllPosts()
    const postToDelete = allPosts.find(p => p.id === id)
    
    if (!postToDelete) return false

    const filePath = getMarkdownFilePath(postToDelete.slug)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    console.log('✅ Post deleted from FS (markdown):', id)
    
    return true
  } catch (error) {
    console.error('❌ Error deleting post:', error)
    throw error
  }
}
