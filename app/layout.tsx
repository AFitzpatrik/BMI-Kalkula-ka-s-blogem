import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: 'FitMateo | Vypočítejte si svůj Body Mass Index',
  description: 'Jednoduchá a přesná BMI kalkulačka. Vypočítejte si svůj Body Mass Index a zjistěte více o zdravém životním stylu v našem blogu.',
  keywords: 'BMI, kalkulačka, Body Mass Index, zdraví, hubnutí, váha',
  authors: [{ name: 'FitMateo' }],
  openGraph: {
    title: 'FitMateo',
    description: 'Vypočítejte si svůj Body Mass Index',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Navigation />
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2026 FitMateo. Všechna práva vyhrazena.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
