import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/posts'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post) {
      return NextResponse.json(
        { error: 'Článek nebyl nalezen' },
        { status: 404 }
      )
    }
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: 'Chyba při načítání článku' },
      { status: 500 }
    )
  }
}
