import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { cs } from 'date-fns/locale/cs'
import AdBanner from '@/components/AdBanner'

// Revalidate - ISR (Incremental Static Regeneration)
export const revalidate = 60 // Revalidovat každých 60 sekund

export const metadata = {
  title: 'Blog | BMI Kalkulačka',
  description: 'Články o zdraví, výživě a zdravém životním stylu',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex gap-10 max-w-[1400px] mx-auto">
        {/* Levý sidebar s reklamou */}
        <aside className="hidden md:block w-48 lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <AdBanner />
          </div>
        </aside>

        {/* Hlavní obsah */}
        <div className="flex-1 max-w-[1100px] mx-auto">
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
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-56 lg:w-64 flex-shrink-0">
                    <Link href={`/blog/${post.slug}`} aria-label={`Otevřít článek ${post.title}`}>
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.coverAlt || post.title}
                          width={420}
                          height={280}
                          className="w-full aspect-video object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, 260px"
                        />
                      ) : (
                        <div className="w-full aspect-video rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                          Bez obrázku
                        </div>
                      )}
                    </Link>
                  </div>

                  <div className="flex-1">
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <div className="text-sm text-gray-500 mb-3 flex flex-wrap items-center gap-2">
                      <span>{post.author}</span>
                      <span>•</span>
                      <time dateTime={post.createdAt}>
                        {format(new Date(post.createdAt), 'd. MMMM yyyy', { locale: cs })}
                      </time>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      Číst více →
                    </Link>
                  </div>
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
