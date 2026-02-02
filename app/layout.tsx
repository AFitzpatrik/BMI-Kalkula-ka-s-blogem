import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: 'BMI Kalkulačka Online | Vypočítejte si Body Mass Index zdarma',
  description: 'Vypočítejte si svůj BMI index jednoduše a rychle. Zjistěte, zda máte ideální váhu. BMI kalkulačka s podrobným vysvětlením hodnot, tabulkou a grafem. Zdarma a bez registrace.',
  keywords: [
    'BMI kalkulačka',
    'BMI kalkulátor',
    'Body Mass Index',
    'výpočet BMI',
    'ideální váha',
    'zdravá váha',
    'nadváha',
    'podváha',
    'obezita',
    'index tělesné hmotnosti',
    'BMI tabulka',
    'BMI hodnoty',
    'kalkulačka váhy',
    'BMI calculator',
    'BMI graf',
  ].join(', '),
  authors: [{ name: 'FitMateo' }],
  creator: 'FitMateo',
  publisher: 'FitMateo',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://bmi-kalkula-ka-s-blogem-git-main-patriks-projects-e4ad545d.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BMI Kalkulačka Online | Vypočítejte si Body Mass Index zdarma',
    description: 'Vypočítejte si svůj BMI index jednoduše a rychle. Zjistěte, zda máte ideální váhu.',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'FitMateo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Kalkulačka Online',
    description: 'Vypočítejte si svůj BMI index jednoduše a rychle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console - přidej později
    // google: 'your-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BMI Kalkulačka" />
      </head>
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
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* O webu */}
              <div>
                <h3 className="text-xl font-bold mb-4">FitMateo</h3>
                <p className="text-gray-400 mb-4">
                  Váš průvodce zdravým životním stylem. BMI kalkulačka, články o výživě a cvičení, 
                  tréninky na různé partie těla. Vše zdarma a přehledně.
                </p>
              </div>
              
              {/* Užitečné odkazy */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Užitečné odkazy</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-gray-400 hover:text-white transition-colors">
                      BMI Kalkulačka
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                      Blog o zdraví
                    </a>
                  </li>
                  <li>
                    <a href="/treninky" className="text-gray-400 hover:text-white transition-colors">
                      Tréninky
                    </a>
                  </li>
                  <li>
                    <a href="/o-nas" className="text-gray-400 hover:text-white transition-colors">
                      O nás
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Kontakt */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <a href="mailto:kontakt@fitmateo.cz" className="hover:text-white transition-colors">
                      kontakt@fitmateo.cz
                    </a>
                  </div>
                  
                  <div>
                    <div className="flex gap-3">
                      <a 
                        href="#" 
                        className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors" 
                        aria-label="Facebook"
                        title="Facebook"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                        </svg>
                      </a>
                      <a 
                        href="#" 
                        className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors" 
                        aria-label="Instagram"
                        title="Instagram"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} FitMateo. Všechna práva vyhrazena.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Informace na tomto webu slouží pouze pro vzdělávací účely a nenahrazují odbornou lékařskou péči.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
