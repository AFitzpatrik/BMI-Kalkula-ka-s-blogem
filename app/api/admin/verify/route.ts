import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    try {
      verify(token, secret)
      return NextResponse.json({ valid: true })
    } catch (error) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}
