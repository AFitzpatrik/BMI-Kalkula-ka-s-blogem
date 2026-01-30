import Link from 'next/link'
import AdBanner from '@/components/AdBanner'

export const metadata = {
  title: 'Katalog cviků | BMI Kalkulačka',
  description: 'Přehled cviků pro celé tělo včetně základních tipů a zaměření.',
}

type ExerciseCategory = {
  title: string
  description: string
  href: string
  items: string[]
}

const categories: ExerciseCategory[] = [
  {
    title: 'Horní část těla',
    description: 'Ramena, prsa, záda a paže. Síla i mobilita.',
    href: '/cviky#horni-cast-tela',
    items: ['Kliky', 'Přítahy v předklonu', 'Tlaky na ramena', 'Bicepsové zdvihy'],
  },
  {
    title: 'Střed těla',
    description: 'Core a stabilizace páteře pro lepší držení těla.',
    href: '/cviky#stred-tela',
    items: ['Plank', 'Zkracovačky', 'Bird-dog', 'Dead bug'],
  },
  {
    title: 'Dolní část těla',
    description: 'Nohy a hýždě pro sílu, výkon i prevenci zranění.',
    href: '/cviky#dolni-cast-tela',
    items: ['Dřepy', 'Výpady', 'Rumunský mrtvý tah', 'Hip thrust'],
  },
  {
    title: 'Kardio a kondice',
    description: 'Spalování kalorií a zlepšení vytrvalosti.',
    href: '/cviky#kardio',
    items: ['Burpees', 'Skákání přes švihadlo', 'Běh na místě', 'Mountain climbers'],
  },
]

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
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Katalog cviků</h1>
            <p className="text-xl text-gray-600">
              Rychlý přehled oblíbených cviků pro celé tělo. Postupně
              doplníme detailní návody a varianty.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <section key={category.title} className="card">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={category.href}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Zobrazit více →
                </Link>
              </section>
            ))}
          </div>

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
