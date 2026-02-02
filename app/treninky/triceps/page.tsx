import Link from 'next/link'
import AdBanner from '@/components/AdBanner'
import WorkoutDisplay from '@/components/WorkoutDisplay'

export const metadata = {
  title: 'Tréninky na triceps | BMI Kalkulačka',
  description: 'Cviky a tréninky zaměřené na triceps.',
}

export default function TricepsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex gap-10 max-w-[1400px] mx-auto">
        <aside className="hidden md:block w-48 lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <AdBanner />
          </div>
        </aside>

        <div className="flex-1 max-w-[1100px] mx-auto">
          <div className="mb-8">
            <Link href="/treninky" className="text-primary-600 hover:text-primary-700 font-semibold">
              ← Zpět na katalog
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Tréninky na triceps</h1>
            <p className="text-xl text-gray-600">
              Triceps tvoří většinu objemu paže a pomáhá v tlacích i stabilitě loktů.
            </p>
          </div>

          <div className="card text-center py-16">
            <p className="text-gray-600 text-lg">Krátké série s kontrolou zpevní lokty i paže.</p>
            <p className="text-gray-500 mt-4">Zařaď tlakové i izolované cviky.</p>
          </div>

          <WorkoutDisplay bodyPart="triceps" />
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
