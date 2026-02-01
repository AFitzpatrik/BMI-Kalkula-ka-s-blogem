'use client'

import { useState } from 'react'

export default function AuthorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    {
      src: '/author-1.JPG',
      alt: 'Portrét'
    },
    {
      src: '/author-2.jpg',
      alt: 'Pullup'
    },
    {
      src: '/author-3.jpg',
      alt: 'Gym'
    },
    {
      src: '/author-4.jpg',
      alt: 'Kickbox'
    }
  ]

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="w-64 rounded-lg overflow-hidden shadow-md bg-gray-900 relative flex-shrink-0">
      {/* Carousel image */}
      <div className="relative h-[400px] overflow-hidden bg-gray-800">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Navigation buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto p-2 rounded-full bg-white/30 hover:bg-white/50 text-white transition-all"
          aria-label="Předchozí fotka"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto p-2 rounded-full bg-white/30 hover:bg-white/50 text-white transition-all"
          aria-label="Následující fotka"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Dots indicators */}
      <div className="flex gap-2 justify-center p-3 bg-gray-100">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Přejít na fotku ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
