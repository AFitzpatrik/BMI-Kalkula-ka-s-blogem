import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'

// Parse frontmatter
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
    
    const cleanValue = value.trim()
    if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) || 
        (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
      data[key] = cleanValue.slice(1, -1)
    } else {
      data[key] = cleanValue
    }
  })

  const content = fileContent.slice(match[0].length).trim()
  return { data, content }
}

async function migratePostsToDB() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    console.log('🔍 Connecting to database...')
    const client = await pool.connect()
    
    // Create table
    console.log('📋 Creating posts table...')
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        author TEXT,
        "coverImage" TEXT,
        "coverAlt" TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    // Read posts from filesystem
    console.log('📂 Reading posts from /posts folder...')
    const postsDir = path.join(process.cwd(), 'posts')
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
    
    let migrated = 0
    for (const file of files) {
      const filePath = path.join(postsDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = parseFrontmatter(fileContent)
      const slug = path.basename(file, '.md')
      
      const post = {
        id: data.id || slug,
        title: data.title || slug,
        slug,
        content,
        excerpt: data.excerpt || '',
        author: data.author || 'Neznámý autor',
        coverImage: data.coverImage || null,
        coverAlt: data.coverAlt || null,
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
      }
      
      // Insert or ignore
      await client.query(
        `INSERT INTO posts (id, title, slug, content, excerpt, author, "coverImage", "coverAlt", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO NOTHING`,
        [
          post.id,
          post.title,
          post.slug,
          post.content,
          post.excerpt,
          post.author,
          post.coverImage,
          post.coverAlt,
          post.createdAt,
          post.updatedAt,
        ]
      )
      migrated++
      console.log(`✅ Migrated: ${post.title}`)
    }
    
    console.log(`\n✨ Successfully migrated ${migrated} posts to database!`)
    client.release()
  } catch (error) {
    console.error('❌ Migration error:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

migratePostsToDB()
