import AdBanner from '@/components/AdBanner'

export default function AboutPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">O projektu</h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            FitMateo je osobní projekt zaměřený na jednoduché a srozumitelné nástroje
            pro zdravější životní styl. Cílem je nabídnout přehlednou BMI kalkulačku,
            praktické informace a motivaci k lepším návykům.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            Jsem tvůrce tohoto projektu a průběžně jej vylepšuji na základě zpětné vazby.
            Pokud máte nápady na další funkce nebo chcete sdílet své zkušenosti,
            budu rád za zpětnou vazbu.
          </p>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Proč to vzniklo?</h2>
            <p className="text-gray-700 leading-relaxed">
              Chtěl jsem vytvořit moderní, rychlý a mobilně přívětivý nástroj, který pomůže
              lidem rychle zjistit základní informace o jejich tělesných parametrech a nabídne
              přehledné doporučení. Zároveň chci, aby web sloužil i jako inspirace pro začínající cvičence a nadšence do zdravého životního stylu a prostor pro sdílení uživatelských zkušeností, v podobě článků v sekci blogu.

            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">O autorovi</h2>
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="flex flex-col items-start gap-4 flex-shrink-0">
                <div className="w-56 h-[380px] rounded-lg bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center text-xl font-bold text-gray-700 shadow-md">
                  Foto
                </div>
                <div className="flex gap-2 w-full">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 17.5V10.4H5.67v7.1h2.67zM7 9.1a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zM18.33 17.5V13.6c0-2.1-1.12-3.08-2.62-3.08-1.2 0-1.74.66-2.04 1.12v-0.96h-2.67c.04.64 0 7.1 0 7.1h2.67v-3.96c0-.21.02-.43.08-.58.17-.43.56-.88 1.2-.88.85 0 1.2.66 1.2 1.62v3.8h2.67z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.25 6.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:kontakt@fitmateo.cz"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    aria-label="Email"
                    title="Email"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Jmenuji se Patrik a stojím za tímto projektem. Cvičení ve fitku se věnuji zhruba 9 let a pohyb je pro mě dlouhodobě přirozenou součástí života.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kromě silového tréninku se momentálně aktivně věnuji také tréninku kickboxu, který mi dává další rozměr disciplíny a motivace. Zároveň mě baví řešit zdravou stravu, suplementaci a celkově hledat cesty, jak se cítit líp a fungovat dlouhodobě udržitelně.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Baví mě tvořit smysluplné a praktické věci, které mohou ostatním pomoct lépe se orientovat ve světě sportu a aktivního životního stylu. Pokud máte otázky nebo chcete spolupracovat, nebojte se mi napsat!
                </p>
              </div>
            </div>
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
