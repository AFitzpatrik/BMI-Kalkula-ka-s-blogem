'use client'

import Link from 'next/link'

const tiles = [
  { label: 'Prsa', href: '/treninky/prsa' },
  { label: 'Ramena', href: '/treninky/ramena' },
  { label: 'Biceps', href: '/treninky/biceps' },
  { label: 'Triceps', href: '/treninky/triceps' },
  { label: 'Břicho', href: '/treninky/bricho' },
  { label: 'Hamstringy', href: '/treninky/hamstringy' },
  { label: 'Quadricepsy', href: '/treninky/quadricepsy' },
  { label: 'Lýtka', href: '/treninky/lytka' },
  { label: 'Cardio', href: '/treninky/cardio' },
]

export default function BodyMap() {
  return (
    <div className="flex flex-col items-center gap-8 pt-4 pb-12">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
          >
            <div className="text-lg font-semibold text-gray-900 group-hover:text-primary-700">
              {tile.label}
            </div>
            <div className="mt-2 text-sm text-primary-600 group-hover:text-primary-700">
              Zobrazit tréninky →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
