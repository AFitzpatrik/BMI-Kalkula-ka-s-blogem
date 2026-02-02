'use client'

import { useState } from 'react'
import BMICalculator from '@/components/BMICalculator'
import AdBanner from '@/components/AdBanner'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="flex gap-4 lg:gap-8 max-w-7xl mx-auto">
        {/* Levý sidebar s reklamou */}
        <aside className="hidden lg:block w-48 xl:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <AdBanner />
          </div>
        </aside>

        {/* Hlavní obsah */}
        <div className="flex-1 w-full max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              BMI Kalkulačka
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Vypočítejte si svůj Body Mass Index jednoduše a rychle
            </p>
          </div>

          {/* Navigační tlačítka */}
          <div className="mb-8">
            <div className="flex gap-3 justify-center flex-wrap max-w-3xl mx-auto">
              <a 
                href="#bmi-kalkulacka" 
                className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap hover:bg-blue-50 border border-gray-200"
              >
                BMI kalkulačka
              </a>
              <a 
                href="#bmi-tabulka" 
                className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap hover:bg-blue-50 border border-gray-200"
              >
                BMI tabulka
              </a>
              <a 
                href="#bmi-graf" 
                className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap hover:bg-blue-50 border border-gray-200"
              >
                BMI graf
              </a>
              <a 
                href="#bmi-hodnoty" 
                className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap hover:bg-blue-50 border border-gray-200"
              >
                BMI hodnoty
              </a>
              <a 
                href="#faq" 
                className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap hover:bg-blue-50 border border-gray-200"
              >
                FAQ
              </a>
              <a 
                href="#vzorce" 
                className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap hover:bg-blue-50 border border-gray-200"
              >
                Vzorce a výpočty
              </a>
            </div>
          </div>

          <div id="bmi-kalkulacka">
            <BMICalculator />
          </div>

          {/* BMI tabulka */}
          <div id="bmi-tabulka" className="mt-12 card scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              BMI tabulka
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Mějte s pomocí přehledné tabulky povědomí o své hodnotě BMI.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">BMI hodnota</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Kategorie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-blue-50">
                    <td className="border border-gray-300 px-4 py-3">&lt; 18,5</td>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-blue-600">Podváha</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border border-gray-300 px-4 py-3">18,5 – 24,9</td>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-green-600">Optimální váha</td>
                  </tr>
                  <tr className="hover:bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-3">25,0 – 29,9</td>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-yellow-600">Nadváha</td>
                  </tr>
                  <tr className="hover:bg-orange-50">
                    <td className="border border-gray-300 px-4 py-3">30,0 – 34,9</td>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-orange-600">Obezita I. stupně</td>
                  </tr>
                  <tr className="hover:bg-orange-100">
                    <td className="border border-gray-300 px-4 py-3">35,0 – 39,9</td>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-orange-700">Obezita II. stupně</td>
                  </tr>
                  <tr className="hover:bg-red-50">
                    <td className="border border-gray-300 px-4 py-3">≥ 40,0</td>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-red-600">Obezita III. stupně</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Zdroj: <a href="https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WHO recommendations</a>
            </p>
          </div>

          {/* Graf BMI podle výšky a hmotnosti */}
          <div id="bmi-graf" className="mt-12 card scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Graf BMI podle výšky a hmotnosti
            </h2>
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 via-green-100 via-yellow-100 via-orange-100 to-red-100 rounded-lg overflow-hidden">
              {/* SVG Graf */}
              <svg viewBox="0 0 800 400" className="w-full h-full">
                {/* Oblasti */}
                <defs>
                  <linearGradient id="underweight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#60A5FA', stopOpacity: 0.3}} />
                    <stop offset="100%" style={{stopColor: '#60A5FA', stopOpacity: 0.6}} />
                  </linearGradient>
                  <linearGradient id="normal" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#34D399', stopOpacity: 0.3}} />
                    <stop offset="100%" style={{stopColor: '#34D399', stopOpacity: 0.6}} />
                  </linearGradient>
                  <linearGradient id="overweight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#FBBF24', stopOpacity: 0.3}} />
                    <stop offset="100%" style={{stopColor: '#FBBF24', stopOpacity: 0.6}} />
                  </linearGradient>
                  <linearGradient id="obese" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#F87171', stopOpacity: 0.3}} />
                    <stop offset="100%" style={{stopColor: '#F87171', stopOpacity: 0.6}} />
                  </linearGradient>
                </defs>

                {/* Podváha */}
                <polygon points="100,350 100,280 700,130 700,350" fill="url(#underweight)" />
                
                {/* Optimální váha */}
                <polygon points="100,280 100,180 700,80 700,130" fill="url(#normal)" />
                
                {/* Nadváha */}
                <polygon points="100,180 100,120 700,50 700,80" fill="url(#overweight)" />
                
                {/* Obezita */}
                <polygon points="100,120 100,50 700,30 700,50" fill="url(#obese)" />

                {/* Osy */}
                <line x1="100" y1="350" x2="700" y2="350" stroke="#374151" strokeWidth="2" />
                <line x1="100" y1="50" x2="100" y2="350" stroke="#374151" strokeWidth="2" />

                {/* Popisky os */}
                <text x="400" y="385" textAnchor="middle" className="text-sm fill-gray-700" fontSize="14">Výška (cm)</text>
                <text x="50" y="200" textAnchor="middle" transform="rotate(-90 50 200)" className="text-sm fill-gray-700" fontSize="14">Hmotnost (kg)</text>

                {/* Hodnoty na ose X (výška) */}
                <text x="100" y="370" textAnchor="middle" fontSize="12" className="fill-gray-600">150</text>
                <text x="250" y="370" textAnchor="middle" fontSize="12" className="fill-gray-600">165</text>
                <text x="400" y="370" textAnchor="middle" fontSize="12" className="fill-gray-600">180</text>
                <text x="550" y="370" textAnchor="middle" fontSize="12" className="fill-gray-600">195</text>
                <text x="700" y="370" textAnchor="middle" fontSize="12" className="fill-gray-600">210</text>

                {/* Hodnoty na ose Y (hmotnost) */}
                <text x="85" y="355" textAnchor="end" fontSize="12" className="fill-gray-600">40</text>
                <text x="85" y="280" textAnchor="end" fontSize="12" className="fill-gray-600">60</text>
                <text x="85" y="200" textAnchor="end" fontSize="12" className="fill-gray-600">80</text>
                <text x="85" y="120" textAnchor="end" fontSize="12" className="fill-gray-600">100</text>
                <text x="85" y="55" textAnchor="end" fontSize="12" className="fill-gray-600">130</text>

                {/* Popisky kategorií */}
                <text x="200" y="320" fontSize="16" fontWeight="bold" className="fill-blue-600">PODVÁHA</text>
                <text x="450" y="230" fontSize="16" fontWeight="bold" className="fill-green-600">OPTIMÁLNÍ VÁHA</text>
                <text x="300" y="150" fontSize="16" fontWeight="bold" className="fill-yellow-600">NADVÁHA</text>
                <text x="200" y="85" fontSize="16" fontWeight="bold" className="fill-red-600">OBEZITA</text>
              </svg>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Graf znázorňuje vztah mezi výškou a hmotností pro jednotlivé BMI kategorie.
            </p>
          </div>

          {/* Co znamenají hodnoty BMI */}
          <div id="bmi-hodnoty" className="mt-12 card scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Co znamenají hodnoty BMI
            </h2>

            {/* BMI < 18,5 - Podváha */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">
                BMI &lt; 18,5 – Podváha
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Jedná se o velmi nízkou váhu ve vztahu k výšce. Hodnota nižší než 18,5 je důsledkem nedostatečné výživy. 
                Energetické a výživové požadavky organismu nejsou ve správném poměru.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Příčinou může být špatné energetické krytí pohybových aktivit během dne. Pozor také na onemocnění, 
                která způsobují úbytek tělesné hmotnosti.
              </p>
            </div>

            {/* BMI 18,5-24,9 - Optimální váha */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-2xl font-semibold mb-3 text-green-600">
                BMI 18,5–24,9 – Optimální váha
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Pokud se pohybujete v tomto rozmezí, máte ve vztahu ke své výšce optimální hmotnost. 
                Riziko vzniku závažných onemocnění spojených s nadváhou je nízké.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Z hodnoty indexu ale nezjistíte, jaké je složení vašeho těla. Jinak řečeno, kolik máte tuku 
                oproti aktivní svalové hmotě. K úplnému zhodnocení je proto vhodné zvážit i další faktory.
              </p>
            </div>

            {/* BMI 25-29,9 - Nadváha */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-2xl font-semibold mb-3 text-yellow-600">
                BMI 25–29,9 – Nadváha
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                BMI v hodnotách 25–29,9 vypovídá o nadváze. Ta bývá často označována jako preobézní stav. 
                Je spojována s mírně zvýšeným rizikem vzniku přidružených onemocnění.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Může se jednat o diabetes mellitus, kardiovaskulární onemocnění, onemocnění žlučníku, 
                případně o rozvoj obezity při nedodržování zásad životosprávy. Počet osob s nadváhou 
                celosvětově rapidně narůstá.
              </p>
            </div>

            {/* BMI 30-34,9 - Obezita I. stupně */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-2xl font-semibold mb-3 text-orange-600">
                BMI 30–34,9 – Obezita I. stupně
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Za obézního se dá považovat člověk, kterému vyšla hodnota mezi 30,0 a 34,9 body. 
                S onemocněním obezitou I. stupně se zvyšuje riziko některých zdravotních komplikací.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Jedná se především o výskyt ischemické choroby srdeční, vysokého krevního tlaku, dny, 
                nádorových onemocnění (prsu, dělohy, tlustého střeva a konečníku) a artrózy nosných kloubů.
              </p>
            </div>

            {/* BMI 35-39,9 - Obezita II. stupně */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-2xl font-semibold mb-3 text-orange-700">
                BMI 35–39,9 – Obezita II. stupně
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Druhý stupeň je diagnostikován při dosažení výsledku od 35,0 do 39,9 bodů. 
                Riziko závažných onemocnění je zde vyšší než u předchozích kategorií.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Je nutné, aby se člověk pokusil snížit svou váhu a byl schopen si ji dlouhodobě udržet. 
                Doporučuje se konzultace s lékařem nebo odborníkem na výživu.
              </p>
            </div>

            {/* BMI ≥ 40 - Obezita III. stupně */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-3 text-red-600">
                BMI ≥ 40 – Obezita III. stupně
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Tímto stupněm označujeme obezitu s výslednou hodnotou nad 40,0 bodů. Známá je též jako morbidní obezita. 
                Rizika jsou u této kategorie nejvyšší.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Redukce váhy je velmi obtížná a většinou se přistupuje k chirurgickému řešení pomocí bariatrické léčby. 
                Je nezbytná lékařská péče a komplexní přístup k léčbě.
              </p>
            </div>
          </div>

          {/* FAQ sekce */}
          <div id="faq" className="mt-12 card scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Často kladené otázky (FAQ)
            </h2>

            <div className="space-y-6">
              {/* Otázka 1 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Co je BMI?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  BMI (Body Mass Index) neboli Index tělesné hmotnosti je číslo vypočítané z vaší váhy a výšky. 
                  Je to spolehlivý ukazatel množství tuku v těle a slouží k screeningu váhových kategorií, 
                  které mohou vést ke zdravotním problémům.
                </p>
              </div>

              {/* Otázka 2 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Jaký je vzorec pro výpočet BMI?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  BMI se vypočítá vydělením vaší hmotnosti v kilogramech druhou mocninou vaší výšky v metrech:
                </p>
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-center">
                  BMI = hmotnost (kg) / [výška (m)]²
                </div>
                <p className="text-gray-700 leading-relaxed mt-3">
                  <strong>Příklad:</strong> Osoba vážící 70 kg a měřící 175 cm: BMI = 70 / (1,75)² = 22,9
                </p>
              </div>

              {/* Otázka 3 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Je BMI přesné pro všechny?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  BMI je dobrým ukazatelem pro většinu lidí, ale není dokonalé. Nerozlišuje mezi svalovou hmotou a tukem. 
                  Sportovci s velkým množstvím svalů mohou mít vysoké BMI, ačkoli mají nízké procento tělesného tuku. 
                  Stejně tak starší lidé mohou mít normální BMI, ale málo svalové hmoty.
                </p>
              </div>

              {/* Otázka 4 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Jaká je ideální váha?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Termín „ideální váha" oficiálně neexistuje, ale při hodnotách BMI v rozmezí 18,5–24,9 
                  je vaše tělesná váha v intervalu, který nazýváme jako optimální váha vzhledem k vaší výšce. 
                  V tomto rozmezí je nejnižší riziko zdravotních komplikací spojených s váhou.
                </p>
              </div>

              {/* Otázka 5 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Jak závisí BMI na věku?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  U dospělých nad 18 let se BMI kategorie nemění s věkem. Pro děti a mladistvé do 18 let 
                  je však věk zásadním faktorem a používají se percentilové grafy podle věku a pohlaví. 
                  S přibývajícím věkem u dospělých může docházet ke změně tělesného složení, proto je vhodné 
                  BMI hodnotit v kontextu dalších zdravotních ukazatelů.
                </p>
              </div>

              {/* Otázka 6 */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Jaký je rozdíl mezi nadváhou a obezitou?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Nadváha</strong> je stav, kdy BMI je mezi 25 a 29,9. Jedná se o mírné překročení optimální váhy 
                  s mírně zvýšeným zdravotním rizikem. <strong>Obezita</strong> začíná při BMI 30 a více a představuje 
                  významnější zdravotní riziko. Obezita se dále dělí na tři stupně podle závažnosti (I. stupeň: 30-34,9, 
                  II. stupeň: 35-39,9, III. stupeň: 40 a více).
                </p>
              </div>

              {/* Otázka 7 */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Co dělat, když mám vysoké BMI?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Pokud vaše BMI indikuje nadváhu nebo obezitu, je vhodné se poradit s lékařem nebo výživovým poradcem. 
                  Doporučuje se kombinace vyváženého jídelníčku, pravidelné pohybové aktivity a případně změna životního stylu. 
                  Důležité je hubnutí provádět postupně a udržitelným způsobem, ideálně pod odborným dohledem.
                </p>
              </div>
            </div>
          </div>

          {/* Vzorec pro výpočet BMI */}
          <div id="vzorce" className="mt-12 card bg-gradient-to-br from-blue-50 to-indigo-50 scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Vzorec pro výpočet BMI
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Své BMI vypočítáte tak, že svou hmotnost v kilogramech vydělíte svou výškou v metrech umocněnou na druhou.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4">
              <div className="text-center text-2xl font-mono mb-4">
                BMI = hmotnost (kg) ÷ výška (m)²
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Příklad výpočtu:</h3>
              <p className="text-gray-700 mb-2">
                Žena ve věku 34 let měří 164 cm a váží 82 kg. Výpočet jejího BMI je následující:
              </p>
              <div className="bg-gray-50 p-4 rounded font-mono text-center text-lg my-3">
                BMI = 82 ÷ 1,64² = 82 ÷ 2,69 = <strong className="text-orange-600">30,5</strong>
              </div>
              <p className="text-gray-700">
                Hodnota BMI 30,5 napovídá, že žena trpí obezitou I. stupně. Doporučujeme konzultaci 
                s lékařem nebo výživovým poradcem.
              </p>
            </div>
          </div>
        </div>

        {/* Pravý sidebar s reklamou */}
        <aside className="hidden xl:block w-48 2xl:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <AdBanner />
          </div>
        </aside>
      </div>
    </div>
  )
}
