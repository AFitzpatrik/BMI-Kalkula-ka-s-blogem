'use client'

interface BMIHorizontalGaugeProps {
  bmi: number
}

export default function BMIHorizontalGauge({ bmi }: BMIHorizontalGaugeProps) {
  // Mapovat BMI na stupnici:
  // < 18,5 = 0% (modrá čárka)
  // 18,5-24,9 = 0-25% (zelená sekce)
  // 25-29,9 = 25-50% (oranžová sekce)
  // 30-34,9 = 50-75% (světle červená sekce)
  // 35+ = 100% (tmavě červená čárka)
  const clampedBmi = Math.min(Math.max(bmi, 0), 50)
  
  let displayPercentage: number
  
  if (clampedBmi < 18.5) {
    displayPercentage = 0
  } else if (clampedBmi < 25) {
    // Mapovat 18.5-25 na 0-25%
    displayPercentage = ((clampedBmi - 18.5) / (25 - 18.5)) * 25
  } else if (clampedBmi < 30) {
    // Mapovat 25-30 na 25-50%
    displayPercentage = 25 + ((clampedBmi - 25) / (30 - 25)) * 25
  } else if (clampedBmi < 35) {
    // Mapovat 30-35 na 50-75%
    displayPercentage = 50 + ((clampedBmi - 30) / (35 - 30)) * 25
  } else {
    displayPercentage = 100
  }

  // Určit barvu na základě BMI
  let indicatorColor = '#3b82f6' // modrá - podváha
  if (clampedBmi >= 18.5 && clampedBmi < 25) {
    indicatorColor = '#22c55e' // zelená - normální
  } else if (clampedBmi >= 25 && clampedBmi < 30) {
    indicatorColor = '#f97316' // oranžová - nadváha
  } else if (clampedBmi >= 30 && clampedBmi < 35) {
    indicatorColor = '#fc6b6b' // světle červená - obezita
  } else if (clampedBmi >= 35) {
    indicatorColor = '#ef4444' // červená - extrémní obezita
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
            {/* Zelená - Normální váha */}
            <div className="flex-1 bg-green-500"></div>
            {/* Oranžová - Nadváha */}
            <div className="flex-1 bg-orange-400"></div>
            {/* Světle červená - Obezita */}
            <div className="flex-1 bg-red-400"></div>
            {/* Tmavě červená - Extrémní obezita */}
            <div className="flex-1 bg-red-600"></div>
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

        {/* Popisky s rozsahy */}
        <div className="flex justify-between text-xs font-semibold pl-2 pr-2">
          <div className="text-center">
            <div className="text-blue-600">&lt;18,5</div>
            <div className="text-blue-700 text-xs">Podváha</div>
          </div>
          <div className="text-center">
            <div className="text-green-600">18,5-24,9</div>
            <div className="text-green-700 text-xs">Normální váha</div>
          </div>
          <div className="text-center">
            <div className="text-orange-600">25-29,9</div>
            <div className="text-orange-700 text-xs">Nadváha</div>
          </div>
          <div className="text-center">
            <div className="text-red-500">30-34,9</div>
            <div className="text-red-600 text-xs">Obezita</div>
          </div>
          <div className="text-center">
            <div className="text-red-700">35+</div>
            <div className="text-red-800 text-xs">Extrémní</div>
          </div>
        </div>
      </div>
    </div>
  )
}
