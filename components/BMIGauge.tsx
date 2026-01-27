'use client'

interface BMIGaugeProps {
  bmi: number
}

export default function BMIGauge({ bmi }: BMIGaugeProps) {
  // Normalizovat BMI (0-50 -> 0-180 stupňů)
  const normalizedBmi = Math.min(Math.max(bmi, 0), 50)
  const anglePercent = normalizedBmi / 50 // 0 až 1
  const angle = anglePercent * 180 // 0 až 180 stupňů
  
  // Konvertovat na radiány pro výpočet pozice ukazatele
  // 0° je vlevo, 90° je dole, 180° je vpravo
  const angleRad = (angle * Math.PI) / 180
  
  const centerX = 150
  const centerY = 150
  const radius = 90
  
  // Pozice ukazatele
  const handX = centerX + radius * Math.cos(angleRad)
  const handY = centerY + radius * Math.sin(angleRad)

  return (
    <div className="flex justify-center mb-8">
      <svg width="320" height="180" viewBox="0 0 320 180" className="w-full max-w-lg">
        {/* Šedé pozadí */}
        <rect width="320" height="180" fill="transparent" />
        
        {/* Vnější kruh - pozadí */}
        <circle cx="150" cy="150" r="95" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1" />

        {/* MODRÁ - Podváha (BMI 0-18.5) ~ 67° */}
        <path
          d="M 150 60 A 90 90 0 0 1 217.43 70.89"
          stroke="#3b82f6"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />

        {/* ZELENÁ - Normální (BMI 18.5-25) ~ 42° */}
        <path
          d="M 217.43 70.89 A 90 90 0 0 1 240 150"
          stroke="#22c55e"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />

        {/* ŽLUTÁ - Nadváha (BMI 25-30) ~ 32° */}
        <path
          d="M 240 150 A 90 90 0 0 1 217.43 229.11"
          stroke="#eab308"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />

        {/* ORANŽOVÁ - Obezita I (BMI 30-35) ~ 32° */}
        <path
          d="M 217.43 229.11 A 90 90 0 0 1 150 240"
          stroke="#f97316"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />

        {/* ČERVENÁ - Obezita II (BMI 35-50) ~ 7° */}
        <path
          d="M 150 240 A 90 90 0 0 1 82.57 229.11"
          stroke="#ef4444"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />

        {/* Bílý kruh uprostřed */}
        <circle cx="150" cy="150" r="55" fill="white" />

        {/* Středový bod */}
        <circle cx="150" cy="150" r="4" fill="#1f2937" />

        {/* Ukazatel - linie */}
        <line
          x1="150"
          y1="150"
          x2={handX}
          y2={handY}
          stroke="#1f2937"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Špička ukazatele */}
        <circle cx={handX} cy={handY} r="5" fill="#1f2937" />

        {/* BMI číslo */}
        <text
          x="150"
          y="165"
          textAnchor="middle"
          fontSize="36"
          fontWeight="900"
          fill="#1f2937"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {normalizedBmi.toFixed(1)}
        </text>

        {/* Legenda */}
        <text x="20" y="175" fontSize="9" fill="#3b82f6" fontWeight="bold" fontFamily="system-ui">
          Podváha
        </text>
        <text x="95" y="175" fontSize="9" fill="#22c55e" fontWeight="bold" fontFamily="system-ui">
          Normální
        </text>
        <text x="165" y="175" fontSize="9" fill="#eab308" fontWeight="bold" fontFamily="system-ui">
          Nadváha
        </text>
        <text x="245" y="175" fontSize="9" fill="#f97316" fontWeight="bold" fontFamily="system-ui">
          Obez.
        </text>
      </svg>
    </div>
  )
}
