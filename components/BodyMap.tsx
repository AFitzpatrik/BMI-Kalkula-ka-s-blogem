'use client'

import Link from 'next/link'
import { useState } from 'react'

type BodyPart = 'chest' | 'abs' | 'shoulders' | 'arms' | 'legs'

interface BodyPartInfo {
  id: BodyPart
  label: string
  path: string
  href: string
}

const bodyParts: BodyPartInfo[] = [
  { id: 'chest', label: 'Prsa', path: 'M200,180 L240,180 L240,240 L200,240 Z', href: '/treninky/prsa' },
  { id: 'abs', label: 'Břicho', path: 'M200,240 L240,240 L240,300 L200,300 Z', href: '/treninky/bricho' },
  { id: 'shoulders', label: 'Ramena', path: 'M160,150 L200,180 M240,180 L280,150', href: '/treninky/ramena' },
  { id: 'arms', label: 'Ruce', path: 'M140,200 L160,280 M280,200 L300,280', href: '/treninky/biceps' },
  { id: 'legs', label: 'Nohy', path: 'M190,300 L210,400 M230,300 L250,400', href: '/treninky/nohy' },
]

export default function BodyMap() {
  const [hoveredPart, setHoveredPart] = useState<BodyPart | null>(null)

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900">Interaktivní mapa těla</h2>
      <p className="text-gray-600">Najeď myší na část těla a klikni na trénink</p>
      
      <div className="relative w-full max-w-md h-auto flex items-center justify-center">
        <svg
          viewBox="0 0 400 500"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hlava */}
          <circle cx="200" cy="80" r="35" fill="#f5f5f5" stroke="#333" strokeWidth="2" />

          {/* Krk */}
          <rect x="190" y="115" width="20" height="20" fill="#f5f5f5" stroke="#333" strokeWidth="2" />

          {/* Tělo - horní část (Prsa) */}
          <Link href="/treninky/prsa">
            <g
              onMouseEnter={() => setHoveredPart('chest')}
              onMouseLeave={() => setHoveredPart(null)}
              className="cursor-pointer transition-all"
            >
              <rect
                x="160"
                y="140"
                width="80"
                height="70"
                fill={hoveredPart === 'chest' ? '#3b82f6' : '#f5f5f5'}
                stroke="#333"
                strokeWidth="2"
                className="transition-colors duration-200"
              />
              <text
                x="200"
                y="175"
                textAnchor="middle"
                className="text-sm font-semibold fill-gray-900 pointer-events-none"
              >
                Prsa
              </text>
            </g>
          </Link>

          {/* Tělo - střední část (Břicho) */}
          <Link href="/treninky/bricho">
            <g
              onMouseEnter={() => setHoveredPart('abs')}
              onMouseLeave={() => setHoveredPart(null)}
              className="cursor-pointer transition-all"
            >
              <rect
                x="160"
                y="210"
                width="80"
                height="70"
                fill={hoveredPart === 'abs' ? '#3b82f6' : '#f5f5f5'}
                stroke="#333"
                strokeWidth="2"
                className="transition-colors duration-200"
              />
              <text
                x="200"
                y="250"
                textAnchor="middle"
                className="text-sm font-semibold fill-gray-900 pointer-events-none"
              >
                Břicho
              </text>
            </g>
          </Link>

          {/* Ramena - levé */}
          <Link href="/treninky/ramena">
            <g
              onMouseEnter={() => setHoveredPart('shoulders')}
              onMouseLeave={() => setHoveredPart(null)}
              className="cursor-pointer transition-all"
            >
              <circle
                cx="130"
                cy="150"
                r="25"
                fill={hoveredPart === 'shoulders' ? '#3b82f6' : '#f5f5f5'}
                stroke="#333"
                strokeWidth="2"
                className="transition-colors duration-200"
              />
            </g>
          </Link>

          {/* Ramena - pravé */}
          <Link href="/treninky/ramena">
            <g
              onMouseEnter={() => setHoveredPart('shoulders')}
              onMouseLeave={() => setHoveredPart(null)}
              className="cursor-pointer transition-all"
            >
              <circle
                cx="270"
                cy="150"
                r="25"
                fill={hoveredPart === 'shoulders' ? '#3b82f6' : '#f5f5f5'}
                stroke="#333"
                strokeWidth="2"
                className="transition-colors duration-200"
              />
            </g>
          </Link>

          {/* Ruce - levá */}
          <Link href="/treninky/biceps">
            <g
              onMouseEnter={() => setHoveredPart('arms')}
              onMouseLeave={() => setHoveredPart(null)}
              className="cursor-pointer transition-all"
            >
              <rect
                x="105"
                y="180"
                width="40"
                height="140"
                fill={hoveredPart === 'arms' ? '#3b82f6' : '#f5f5f5'}
                stroke="#333"
                strokeWidth="2"
                className="transition-colors duration-200"
                rx="20"
              />
            </g>
          </Link>

          {/* Ruce - pravá */}
          <Link href="/treninky/biceps">
            <g
              onMouseEnter={() => setHoveredPart('arms')}
              onMouseLeave={() => setHoveredPart(null)}
              className="cursor-pointer transition-all"
            >
              <rect
                x="255"
                y="180"
                width="40"
                height="140"
                fill={hoveredPart === 'arms' ? '#3b82f6' : '#f5f5f5'}
                stroke="#333"
                strokeWidth="2"
                className="transition-colors duration-200"
                rx="20"
              />
            </g>
          </Link>

          {/* Nohy - levá */}
          <Link href="/treninky/nohy">
            <g
              onMouseEnter={() => setHoveredPart('legs')}
              onMouseLeave={() => setHoveredPart(null)}
              className="cursor-pointer transition-all"
            >
              <rect
                x="170"
                y="280"
                width="35"
                height="180"
                fill={hoveredPart === 'legs' ? '#3b82f6' : '#f5f5f5'}
                stroke="#333"
                strokeWidth="2"
                className="transition-colors duration-200"
                rx="18"
              />
            </g>
          </Link>

          {/* Nohy - pravá */}
          <Link href="/treninky/nohy">
            <g
              onMouseEnter={() => setHoveredPart('legs')}
              onMouseLeave={() => setHoveredPart(null)}
              className="cursor-pointer transition-all"
            >
              <rect
                x="195"
                y="280"
                width="35"
                height="180"
                fill={hoveredPart === 'legs' ? '#3b82f6' : '#f5f5f5'}
                stroke="#333"
                strokeWidth="2"
                className="transition-colors duration-200"
                rx="18"
              />
            </g>
          </Link>
        </svg>
      </div>

      {hoveredPart && (
        <div className="text-center">
          <p className="text-lg font-semibold text-primary-600">
            Klikni pro zobrazení tréninků
          </p>
        </div>
      )}
    </div>
  )
}
