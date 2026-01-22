import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { cs } from 'date-fns/locale/cs'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import AdBanner from '@/components/AdBanner'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Článek nenalezen',
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex gap-8 max-w-7xl mx-auto">
        {/* Levý sidebar s reklamou */}
        <aside className="hidden md:block w-48 lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <AdBanner />
          </div>
        </aside>

        {/* Hlavní obsah */}
        <div className="flex-1 max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="text-primary-600 hover:text-primary-700 mb-6 inline-block"
          >
            ← Zpět na blog
          </Link>

          <article className="card">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-8 pb-6 border-b">
            <span>Autor: {post.author}</span>
            <span>•</span>
            <span>
              {format(new Date(post.createdAt), 'd. MMMM yyyy', { locale: cs })}
            </span>
            {post.updatedAt !== post.createdAt && (
              <>
                <span>•</span>
                <span className="text-gray-500">
                  Aktualizováno: {format(new Date(post.updatedAt), 'd. MMMM yyyy', { locale: cs })}
                </span>
              </>
            )}
          </div>

          <MarkdownRenderer content={post.content} />
          </article>
        </div>

        {/* Pravý sidebar s reklamou */}
        <aside className="hidden lg:block w-48 xl:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <AdBanner />
          </div>
        </aside>
      </div>
    </div>
  )
}
