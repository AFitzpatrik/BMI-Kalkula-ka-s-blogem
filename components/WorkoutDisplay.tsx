'use client'

import { useEffect, useState } from 'react'

interface Exercise {
  name: string
  sets: string
  reps: string
}

interface Workout {
  id: string
  bodyPart: string
  title: string
  author: string
  date: string
  excerpt: string
  content: string
  exercises: Exercise[]
  techniqueTips?: string
}

interface WorkoutDisplayProps {
  bodyPart: string
}

export default function WorkoutDisplay({ bodyPart }: WorkoutDisplayProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(`/api/workouts?bodyPart=${bodyPart}`)
        if (response.ok) {
          const data = await response.json()
          setWorkouts(data)
        }
      } catch (error) {
        console.error('Chyba při načítání tréninků:', error)
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [bodyPart])

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Načítání tréninků...</p>
      </div>
    )
  }

  if (workouts.length === 0) {
    return null
  }

  return (
    <div className="mt-16 pt-16 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Dostupné tréninky</h2>
      
      <div className="space-y-12">
        {workouts.map((workout) => (
          <article key={workout.id} className="card">
            <div className="mb-4">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>{workout.author}</span>
                <span>•</span>
                <span>{new Date(workout.date).toLocaleDateString('cs-CZ')}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {workout.title}
              </h3>
              <p className="text-gray-600">
                {workout.excerpt}
              </p>
            </div>

            <div className="my-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {workout.content}
              </p>
            </div>

            {/* Cviky */}
            <div className="my-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Tréninková schéma
              </h4>
              <div className="space-y-3">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">
                        {exercise.name}
                      </h5>
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Série:</strong> {exercise.sets} | <strong>Opakování:</strong> {exercise.reps}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tipy na techniku */}
            {workout.techniqueTips && (
              <div className="mt-8 p-4 border-l-4 border-primary-600 bg-primary-50 rounded">
                <h4 className="font-bold text-gray-900 mb-2">
                  💡 Tipy na techniku
                </h4>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {workout.techniqueTips}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
