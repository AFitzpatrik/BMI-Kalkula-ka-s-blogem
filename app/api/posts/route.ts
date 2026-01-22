import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, createPost, updatePost, deletePost } from '@/lib/posts'

export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json(
      { error: 'Chyba při načítání článků', details: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, author } = body

    if (!title || !content || !excerpt || !author) {
      return NextResponse.json(
        { error: 'Všechna pole jsou povinná' },
        { status: 400 }
      )
    }

    const post = await createPost({ title, content, excerpt, author })
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('POST error:', error)
    return NextResponse.json(
      { error: 'Chyba při vytváření článku', details: String(error) },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID článku je povinné' },
        { status: 400 }
      )
    }

    const post = await updatePost(id, updates)
    if (!post) {
      return NextResponse.json(
        { error: 'Článek nebyl nalezen' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('PUT error:', error)
    return NextResponse.json(
      { error: 'Chyba při aktualizaci článku', details: String(error) },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID článku je povinné' },
        { status: 400 }
      )
    }

    const success = await deletePost(id)
    if (!success) {
      return NextResponse.json(
        { error: 'Článek nebyl nalezen' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE error:', error)
    return NextResponse.json(
      { error: 'Chyba při mazání článku', details: String(error) },
      { status: 500 }
    )
  }
}
