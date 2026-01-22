import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, createPost, updatePost, deletePost } from '@/lib/posts'

export async function GET() {
  try {
    const posts = getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Chyba při načítání článků' },
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

    const post = createPost({ title, content, excerpt, author })
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Chyba při vytváření článku' },
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

    const post = updatePost(id, updates)
    if (!post) {
      return NextResponse.json(
        { error: 'Článek nebyl nalezen' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: 'Chyba při aktualizaci článku' },
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

    const success = deletePost(id)
    if (!success) {
      return NextResponse.json(
        { error: 'Článek nebyl nalezen' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Chyba při mazání článku' },
      { status: 500 }
    )
  }
}
