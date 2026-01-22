import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import { format } from 'date-fns'
import { cs } from 'date-fns/locale/cs'
import AdBanner from '@/components/AdBanner'

export const metadata = {
  title: 'Blog | BMI Kalkulačka',
  description: 'Články o zdraví, výživě a zdravém životním stylu',
}

export default function BlogPage() {
  const posts = getAllPosts()

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
        <div className="flex-1 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600">
              Články o zdraví, výživě a zdravém životním stylu
            </p>
          </div>

        {posts.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              Zatím zde nejsou žádné články.
            </p>
            <p className="text-gray-500">
              Přidejte první článek v sekci CMS.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="card hover:shadow-xl transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>Autor: {post.author}</span>
                    <span>
                      {format(new Date(post.createdAt), 'd. MMMM yyyy', { locale: cs })}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Číst více →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
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
