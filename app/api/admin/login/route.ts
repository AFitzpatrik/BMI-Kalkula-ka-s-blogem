import { NextRequest, NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    // Získat heslo z environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (!password || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Nesprávné heslo' },
        { status: 401 }
      )
    }

    // Vytvořit JWT token
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    const token = sign(
      { admin: true, timestamp: Date.now() },
      secret,
      { expiresIn: '24h' }
    )

    // Uložit token do cookie
    const response = NextResponse.json({ success: true, token })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hodin
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Chyba při přihlašování' },
      { status: 500 }
    )
  }
}
