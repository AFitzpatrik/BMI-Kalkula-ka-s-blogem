import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Stránka nenalezena
        </h2>
        <p className="text-gray-600 mb-8">
          Omlouváme se, ale stránka, kterou hledáte, neexistuje.
        </p>
        <Link href="/" className="btn-primary">
          Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  )
}
