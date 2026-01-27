'use client'

interface BMIHorizontalGaugeProps {
  bmi: number
}

export default function BMIHorizontalGauge({ bmi }: BMIHorizontalGaugeProps) {
  // Mapovat BMI na stupnici:
  // < 18,5 = 0% (modrá čárka - PODVÁHA)
  // 18,5-24,9 = 0-33% (zelená - NORMÁLNÍ VÁHA)
  // 25-29,9 = 33-66% (oranžová - NADVÁHA)
  // 30+ = 100% (tmavě červená čárka - OBEZITA 2. STUPEŇ)
  const clampedBmi = Math.min(Math.max(bmi, 0), 50)
  
  let displayPercentage: number
  
  if (clampedBmi < 18.5) {
    displayPercentage = 0
  } else if (clampedBmi < 25) {
    // Mapovat 18.5-25 na 0-33%
    displayPercentage = ((clampedBmi - 18.5) / (25 - 18.5)) * 33
  } else if (clampedBmi < 30) {
    // Mapovat 25-30 na 33-66%
    displayPercentage = 33 + ((clampedBmi - 25) / (30 - 25)) * 33
  } else {
    displayPercentage = 100
  }

  // Určit barvu na základě BMI
  let indicatorColor = '#3b82f6' // modrá - podváha
  if (clampedBmi >= 18.5 && clampedBmi < 25) {
    indicatorColor = '#22c55e' // zelená - normální
  } else if (clampedBmi >= 25 && clampedBmi < 30) {
    indicatorColor = '#f97316' // oranžová - nadváha
  } else if (clampedBmi >= 30) {
    indicatorColor = '#ef4444' // červená - obezita
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="space-y-3">
        {/* Hlavní stupnice - 3 sekce + čárky na konci */}
        <div className="relative h-20 flex items-center">
          {/* Modrá čárka - začátek */}
          <div className="absolute left-0 h-full w-1 bg-blue-600 rounded-full shadow-md"></div>
          
          {/* Tři hlavní sekce */}
          <div className="absolute left-1 right-1 flex h-16 rounded-full shadow-md overflow-hidden">
            {/* Zelená - Normální váha (18,5-24,9) */}
            <div className="flex-1 bg-green-500"></div>
            {/* Oranžová - Nadváha (25-29,9) */}
            <div className="flex-1 bg-orange-400"></div>
            {/* Červená - Obezita (30+) */}
            <div className="flex-1 bg-red-500"></div>
          </div>

          {/* Tmavě červená čárka - konec */}
          <div className="absolute right-0 h-full w-1 bg-red-700 rounded-full shadow-md"></div>

          {/* Indikátor */}
          <div
            className="absolute top-0 bottom-0 w-1 transition-all duration-300 z-10"
            style={{
              left: `${displayPercentage}%`,
              backgroundColor: indicatorColor,
              boxShadow: `0 0 10px ${indicatorColor}`,
              transform: 'translateX(-50%)',
            }}
          >
            {/* Šipka nad stupnicí */}
            <div
              className="absolute -top-3 left-1/2 transform -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: `8px solid ${indicatorColor}`,
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
              }}
            />
          </div>
        </div>

        {/* Popisky - rozprostřeny pod jejich sekcemi */}
        <div className="relative w-full h-12">
          {/* PODVÁHA - pod čárou vlevo - maximálně doleva */}
          <div className="absolute left-0 transform -translate-x-4 text-center text-xs font-semibold whitespace-nowrap">
            <div className="text-blue-600 text-xs">&lt;18,5</div>
            <div className="text-blue-700 text-xs font-medium">Podváha</div>
          </div>

          {/* NORMÁLNÍ VÁHA - pod zelenou sekcí */}
          <div className="absolute left-1/4 transform -translate-x-1/2 text-center text-xs font-semibold whitespace-nowrap">
            <div className="text-green-600 text-xs">18,5-24,9</div>
            <div className="text-green-700 text-xs font-medium">Normální váha</div>
          </div>

          {/* NADVÁHA - pod oranžovou sekcí */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center text-xs font-semibold whitespace-nowrap">
            <div className="text-orange-600 text-xs">25-29,9</div>
            <div className="text-orange-700 text-xs font-medium">Nadváha</div>
          </div>

          {/* OBEZITA - pod červenou sekcí */}
          <div className="absolute left-3/4 transform -translate-x-1/2 text-center text-xs font-semibold whitespace-nowrap">
            <div className="text-red-500 text-xs">30+</div>
            <div className="text-red-600 text-xs font-medium">Obezita</div>
          </div>

          {/* OBEZITA 2. STUPEŇ - pod čárou vpravo - maximálně doprava */}
          <div className="absolute right-0 transform translate-x-4 text-center text-xs font-semibold whitespace-nowrap">
            <div className="text-red-700 text-xs">35+</div>
            <div className="text-red-800 text-xs font-medium">Obezita 2 st.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
