import Link from 'next/link'
import AdBanner from '@/components/AdBanner'
import BodyMap from '@/components/BodyMap'

export const metadata = {
  title: 'Katalog cviků | BMI Kalkulačka',
  description: 'Přehled cviků pro celé tělo včetně základních tipů a zaměření.',
}

export default function ExerciseCatalogPage() {
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
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Katalog tréninků</h1>
            <p className="text-xl text-gray-600">
              Vyber partii, kterou chceš trénovat, a objev cviky zaměřené na její posílení a rozvoj.
            </p>
          </div>

          <BodyMap />

          <div className="card mt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Chceš přidat cvik?</h3>
            <p className="text-gray-600 mb-4">
              Pošli nám tip na oblíbený cvik nebo jeho variantu, přidáme jej do katalogu.
            </p>
            <Link
              href="/blog"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Prohlédnout blog →
            </Link>
          </div>

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
