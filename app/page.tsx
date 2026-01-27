'use client'

import { useState } from 'react'
import BMICalculator from '@/components/BMICalculator'
import AdBanner from '@/components/AdBanner'

export default function Home() {
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
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              BMI Kalkulačka
            </h1>
            <p className="text-xl text-gray-600">
              Vypočítejte si svůj Body Mass Index jednoduše a rychle
            </p>
          </div>
          <BMICalculator />
          <div className="mt-12 card">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Co je BMI?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Body Mass Index (BMI) je měřítko používané k posouzení tělesné hmotnosti vzhledem k výšce.
            Je to jednoduchý způsob, jak zjistit, zda máte zdravou tělesnou hmotnost.
          </p>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            BMI kategorie:
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center whitespace-nowrap">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              <strong>Podváha: </strong>BMI méně než 18.5
            </li>
            <li className="flex items-center whitespace-nowrap">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <strong>Normální váha: </strong>BMI 18.5 - 24.9
            </li>
            <li className="flex items-center whitespace-nowrap">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
              <strong>Nadváha: </strong>BMI 25 - 29.9
            </li>
            <li className="flex items-center whitespace-nowrap">
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
              <strong>Obezita 1. stupně: </strong>BMI 30 - 34.9
            </li>
            <li className="flex items-center whitespace-nowrap">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
              <strong>Obezita 2. stupně: </strong>BMI 35 a více
            </li>
          </ul>
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
