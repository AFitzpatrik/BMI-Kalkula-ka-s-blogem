'use client'

import { useState, useEffect } from 'react'

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

const BODY_PARTS = [
  { value: 'prsa', label: 'Prsa' },
  { value: 'bricho', label: 'Břicho' },
  { value: 'ramena', label: 'Ramena' },
  { value: 'biceps', label: 'Biceps' },
  { value: 'triceps', label: 'Triceps' },
  { value: 'nohy', label: 'Nohy' },
  { value: 'hamstringy', label: 'Hamstringy' },
  { value: 'quadricepsy', label: 'Quadricepsy' },
  { value: 'lytka', label: 'Lýtka' },
  { value: 'cardio', label: 'Cardio' },
]

export default function WorkoutManager() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null)
  const [formData, setFormData] = useState({
    bodyPart: 'prsa',
    title: '',
    author: '',
    excerpt: '',
    content: '',
    techniqueTips: '',
    exercises: [{ name: '', sets: '', reps: '' }],
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [adminToken, setAdminToken] = useState('')

  useEffect(() => {
    loadWorkouts()
    // Pokus se načíst token z localStorage pro development
    const token = localStorage.getItem('adminToken')
    if (token) setAdminToken(token)
  }, [])

  const loadWorkouts = async () => {
    try {
      const response = await fetch('/api/workouts')
      if (response.ok) {
        const data = await response.json()
        setWorkouts(data)
      }
    } catch (error) {
      showMessage('error', 'Chyba při načítání tréninků')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleExerciseChange = (index: number, field: keyof Exercise, value: string) => {
    const newExercises = [...formData.exercises]
    newExercises[index] = { ...newExercises[index], [field]: value }
    setFormData({ ...formData, exercises: newExercises })
  }

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [...formData.exercises, { name: '', sets: '', reps: '' }],
    })
  }

  const removeExercise = (index: number) => {
    const newExercises = formData.exercises.filter((_, i) => i !== index)
    setFormData({ ...formData, exercises: newExercises })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.bodyPart ||
      !formData.title ||
      !formData.author ||
      !formData.excerpt ||
      !formData.content ||
      formData.exercises.some(ex => !ex.name || !ex.sets || !ex.reps)
    ) {
      showMessage('error', 'Všechna pole jsou povinná')
      return
    }

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken || process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'admin-secret-2024'}`,
      }

      const url = editingWorkout ? '/api/workouts' : '/api/workouts'
      const method = editingWorkout ? 'PUT' : 'POST'

      const body = editingWorkout
        ? { id: editingWorkout.id, ...formData }
        : formData

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (response.ok) {
        showMessage(
          'success',
          editingWorkout
            ? 'Trénink byl úspěšně aktualizován'
            : 'Trénink byl úspěšně vytvořen'
        )
        resetForm()
        await loadWorkouts()
      } else {
        showMessage('error', data.error || 'Chyba při ukládání tréninku')
      }
    } catch (error) {
      showMessage('error', `Chyba: ${error}`)
    }
  }

  const handleEdit = (workout: Workout) => {
    setEditingWorkout(workout)
    setFormData({
      bodyPart: workout.bodyPart,
      title: workout.title,
      author: workout.author,
      excerpt: workout.excerpt,
      content: workout.content,
      techniqueTips: workout.techniqueTips || '',
      exercises: workout.exercises,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Opravdu chcete smazat tento trénink?')) return

    try {
      const headers: HeadersInit = {
        Authorization: `Bearer ${adminToken || process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'admin-secret-2024'}`,
      }

      const response = await fetch(`/api/workouts?id=${id}`, {
        method: 'DELETE',
        headers,
      })

      const data = await response.json()

      if (response.ok) {
        showMessage('success', 'Trénink byl úspěšně smazán')
        await loadWorkouts()
      } else {
        showMessage('error', data.error || 'Chyba při mazání tréninku')
      }
    } catch (error) {
      showMessage('error', `Chyba: ${error}`)
    }
  }

  const resetForm = () => {
    setFormData({
      bodyPart: 'prsa',
      title: '',
      author: '',
      excerpt: '',
      content: '',
      techniqueTips: '',
      exercises: [{ name: '', sets: '', reps: '' }],
    })
    setEditingWorkout(null)
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        {editingWorkout ? 'Upravit trénink' : 'Nový trénink'}
      </h2>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 mb-12">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partie těla *
            </label>
            <select
              value={formData.bodyPart}
              onChange={(e) => setFormData({ ...formData, bodyPart: e.target.value })}
              className="input-field"
              required
            >
              {BODY_PARTS.map(part => (
                <option key={part.value} value={part.value}>{part.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Název tréninku *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autor *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Datum publikace
            </label>
            <input
              type="date"
              className="input-field text-gray-500"
              disabled
              value={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Krátký popis (excerpt) *
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="input-field"
            rows={2}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Obsah/Úvod *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="input-field"
            rows={4}
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Cviky *
            </label>
            <button
              type="button"
              onClick={addExercise}
              className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
            >
              + Přidat cvik
            </button>
          </div>
          <div className="space-y-4">
            {formData.exercises.map((exercise, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Název cviku *
                    </label>
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                      className="input-field"
                      placeholder="Př. Bench Press"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Série *
                    </label>
                    <input
                      type="text"
                      value={exercise.sets}
                      onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                      className="input-field"
                      placeholder="Př. 3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opakování *
                    </label>
                    <input
                      type="text"
                      value={exercise.reps}
                      onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                      className="input-field"
                      placeholder="Př. 8-12"
                      required
                    />
                  </div>
                </div>
                {formData.exercises.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className="text-sm text-red-600 hover:text-red-700 font-semibold"
                  >
                    Odebrat cvik
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipy na techniku (volitelně)
          </label>
          <textarea
            value={formData.techniqueTips}
            onChange={(e) => setFormData({ ...formData, techniqueTips: e.target.value })}
            className="input-field"
            rows={4}
            placeholder="Napiš tipy a rady na správnou techniku..."
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn-primary flex-1">
            {editingWorkout ? 'Uložit změny' : 'Vytvořit trénink'}
          </button>
          {editingWorkout && (
            <button
              type="button"
              onClick={resetForm}
              className="btn-secondary"
            >
              Zrušit
            </button>
          )}
        </div>
      </form>

      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Seznam tréninků ({workouts.length})
        </h2>
        {loading ? (
          <p className="text-gray-600">Načítání...</p>
        ) : workouts.length === 0 ? (
          <p className="text-gray-600">Zatím nejsou žádné tréninky.</p>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{workout.title}</h3>
                    <p className="text-sm text-gray-500">
                      {BODY_PARTS.find(p => p.value === workout.bodyPart)?.label} • {workout.author} • {workout.date}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {workout.excerpt}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Cviků: {workout.exercises.length}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(workout)}
                    className="text-sm btn-secondary py-1 px-3"
                  >
                    Upravit
                  </button>
                  <button
                    onClick={() => handleDelete(workout.id)}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg transition-colors"
                  >
                    Smazat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
