'use client'

import { useState } from 'react'

interface BMIResult {
  value: number
  category: string
  color: string
  description: string
}

export default function BMICalculator() {
  const [height, setHeight] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [gender, setGender] = useState<'muž' | 'žena'>('muž')
  const [result, setResult] = useState<BMIResult | null>(null)
  const [error, setError] = useState<string>('')

  const calculateBMI = () => {
    setError('')
    
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)

    if (!height || !weight) {
      setError('Prosím vyplňte všechna pole')
      return
    }

    if (isNaN(heightNum) || isNaN(weightNum)) {
      setError('Prosím zadejte platná čísla')
      return
    }

    if (heightNum <= 0 || weightNum <= 0) {
      setError('Výška a váha musí být větší než 0')
      return
    }

    if (heightNum > 300) {
      setError('Výška by měla být v centimetrech (max 300 cm)')
      return
    }

    if (weightNum > 500) {
      setError('Váha by měla být v kilogramech (max 500 kg)')
      return
    }

    // Převod výšky z cm na metry
    const heightInMeters = heightNum / 100
    const bmi = weightNum / (heightInMeters * heightInMeters)
    
    // Výpočet BMR (Basal Metabolic Rate) podle pohlaví
    // Mifflin-St Jeor Equation
    let bmr: number
    if (gender === 'muž') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * 30 + 5 // Věk 30 jako průměr
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * 30 - 161
    }
    
    // Upravené kategorie podle pohlaví (ženy mají obvykle o něco nižší ideální BMI)
    let category: string
    let color: string
    let description: string
    const isWoman = gender === 'žena'

    if (bmi < 18.5) {
      category = 'Podváha'
      color = 'green'
      description = isWoman 
        ? 'Máte podváhu. Pro ženy je ideální BMI 18.5-24.9. Zvažte konzultaci s lékařem o zdravém přibírání.'
        : 'Máte podváhu. Pro muže je ideální BMI 18.5-24.9. Zvažte konzultaci s lékařem o zdravém přibírání.'
    } else if (bmi < 25) {
      category = 'Normální váha'
      color = 'blue'
      description = isWoman
        ? 'Gratulujeme! Máte zdravou tělesnou hmotnost. Pro ženy je ideální rozmezí BMI 18.5-24.9.'
        : 'Gratulujeme! Máte zdravou tělesnou hmotnost. Pro muže je ideální rozmezí BMI 18.5-24.9.'
    } else if (bmi < 30) {
      category = 'Nadváha'
      color = 'yellow'
      description = isWoman
        ? 'Máte mírnou nadváhu. Pro ženy je doporučené BMI pod 25. Zvažte úpravu stravy a více pohybu.'
        : 'Máte mírnou nadváhu. Pro muže je doporučené BMI pod 25. Zvažte úpravu stravy a více pohybu.'
    } else if (bmi < 35) {
      category = 'Obezita 1. stupně'
      color = 'orange'
      description = 'Máte obezitu 1. stupně. Doporučujeme konzultaci s lékařem a odbornou pomoc při hubnutí.'
    } else {
      category = 'Obezita 2. stupně'
      color = 'red'
      description = 'Máte obezitu 2. stupně. Určitě se poraďte s lékařem o vhodném postupu hubnutí.'
    }

    setResult({
      value: bmi,
      category,
      color,
      description: `${description} Vaše bazální metabolismus (BMR) je přibližně ${Math.round(bmr)} kcal/den.`,
    })
  }

  const reset = () => {
    setHeight('')
    setWeight('')
    setGender('muž')
    setResult(null)
    setError('')
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Vypočítejte své BMI
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pohlaví
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setGender('muž')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                gender === 'muž'
                  ? 'border-primary-600 bg-primary-50 text-primary-700 font-semibold'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              Muž
            </button>
            <button
              type="button"
              onClick={() => setGender('žena')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                gender === 'žena'
                  ? 'border-primary-600 bg-primary-50 text-primary-700 font-semibold'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              Žena
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
            Výška (cm)
          </label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Např. 175"
            className="input-field"
            min="1"
            max="300"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
            Váha (kg)
          </label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Např. 70"
            className="input-field"
            min="1"
            max="500"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className={`rounded-lg p-6 mt-4 ${
            result.color === 'green' ? 'bg-green-50 border-2 border-green-300' :
            result.color === 'blue' ? 'bg-blue-50 border-2 border-blue-300' :
            result.color === 'yellow' ? 'bg-yellow-50 border-2 border-yellow-300' :
            result.color === 'orange' ? 'bg-orange-50 border-2 border-orange-300' :
            'bg-red-50 border-2 border-red-300'
          }`}>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Vaše BMI</p>
              <p className={`text-5xl font-bold mb-2 ${
                result.color === 'green' ? 'text-green-600' :
                result.color === 'blue' ? 'text-blue-600' :
                result.color === 'yellow' ? 'text-yellow-600' :
                result.color === 'orange' ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {result.value.toFixed(1)}
              </p>
              <p className={`text-xl font-semibold mb-3 ${
                result.color === 'green' ? 'text-green-700' :
                result.color === 'blue' ? 'text-blue-700' :
                result.color === 'yellow' ? 'text-yellow-700' :
                result.color === 'orange' ? 'text-orange-700' :
                'text-red-700'
              }`}>
                {result.category}
              </p>
              <p className="text-gray-700">{result.description}</p>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={calculateBMI}
            className="btn-primary flex-1"
          >
            Vypočítat BMI
          </button>
          {result && (
            <button
              onClick={reset}
              className="btn-secondary"
            >
              Resetovat
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
