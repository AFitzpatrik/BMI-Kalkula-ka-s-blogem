import Link from 'next/link'
import AdBanner from '@/components/AdBanner'

export const metadata = {
  title: 'Tréninky na nohy | BMI Kalkulačka',
  description: 'Cviky a tréninky zaměřené na posílení noh a hýždí.',
}

export default function LegsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex gap-8 max-w-7xl mx-auto">
        <aside className="hidden md:block w-48 lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <AdBanner />
          </div>
        </aside>

        <div className="flex-1 max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/treninky" className="text-primary-600 hover:text-primary-700 font-semibold">
              ← Zpět na katalog
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Tréninky na nohy</h1>
            <p className="text-xl text-gray-600">
              Zde budou tréninky a cviky zaměřené na posílení noh a hýždí.
            </p>
          </div>

          <div className="card text-center py-16">
            <p className="text-gray-600 text-lg">Tato sekce je zatím v přípravě.</p>
            <p className="text-gray-500 mt-4">Brzy sem přidáme detailní tréninky a cviky.</p>
          </div>
        </div>

        <aside className="hidden lg:block w-48 xl:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <AdBanner />
          </div>
        </aside>
      </div>
    </div>
  )
}
