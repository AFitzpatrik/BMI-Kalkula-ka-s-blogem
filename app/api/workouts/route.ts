import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const workoutsFile = path.join(process.cwd(), 'data', 'workouts.json')

interface Workout {
  id: string
  bodyPart: string
  title: string
  author: string
  date: string
  excerpt: string
  content: string
  exercises: Array<{
    name: string
    sets: string
    reps: string
  }>
  techniqueTips?: string
}

async function readWorkouts(): Promise<Workout[]> {
  try {
    const data = await fs.readFile(workoutsFile, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

async function writeWorkouts(workouts: Workout[]): Promise<void> {
  await fs.writeFile(workoutsFile, JSON.stringify(workouts, null, 2))
}

function verifyAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const token = process.env.ADMIN_SECRET || 'admin-secret-2024'
  return authHeader === `Bearer ${token}`
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bodyPart = searchParams.get('bodyPart')

    const workouts = await readWorkouts()

    if (bodyPart) {
      const filtered = workouts.filter(w => w.bodyPart === bodyPart)
      return NextResponse.json(filtered)
    }

    return NextResponse.json(workouts)
  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json(
      { error: 'Chyba při načítání tréninků' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json(
        { error: 'Neautorizováno' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      bodyPart,
      title,
      author,
      excerpt,
      content,
      exercises,
      techniqueTips,
    } = body

    if (!bodyPart || !title || !author || !excerpt || !content || !exercises) {
      return NextResponse.json(
        { error: 'Všechna povinná pole musí být vyplněna' },
        { status: 400 }
      )
    }

    const workouts = await readWorkouts()
    const newWorkout: Workout = {
      id: Date.now().toString(),
      bodyPart,
      title,
      author,
      date: new Date().toISOString().split('T')[0],
      excerpt,
      content,
      exercises,
      techniqueTips,
    }

    workouts.push(newWorkout)
    await writeWorkouts(workouts)

    return NextResponse.json(newWorkout, { status: 201 })
  } catch (error) {
    console.error('POST error:', error)
    return NextResponse.json(
      { error: 'Chyba při vytváření tréninku' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json(
        { error: 'Neautorizováno' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID tréninku je povinné' },
        { status: 400 }
      )
    }

    const workouts = await readWorkouts()
    const index = workouts.findIndex(w => w.id === id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Trénink nenalezen' },
        { status: 404 }
      )
    }

    workouts[index] = { ...workouts[index], ...updates }
    await writeWorkouts(workouts)

    return NextResponse.json(workouts[index])
  } catch (error) {
    console.error('PUT error:', error)
    return NextResponse.json(
      { error: 'Chyba při aktualizaci tréninku' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json(
        { error: 'Neautorizováno' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID tréninku je povinné' },
        { status: 400 }
      )
    }

    const workouts = await readWorkouts()
    const filtered = workouts.filter(w => w.id !== id)

    if (filtered.length === workouts.length) {
      return NextResponse.json(
        { error: 'Trénink nenalezen' },
        { status: 404 }
      )
    }

    await writeWorkouts(filtered)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE error:', error)
    return NextResponse.json(
      { error: 'Chyba při mazání tréninku' },
      { status: 500 }
    )
  }
}
