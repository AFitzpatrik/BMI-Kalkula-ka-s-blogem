import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ochrana CMS stránky
  if (pathname.startsWith('/admin-secret-2024')) {
    // Povolit přístup k login stránce a API routes
    if (pathname === '/admin-secret-2024/login' || pathname.startsWith('/api/')) {
      return NextResponse.next()
    }

    // Zkontrolovat token v cookie
    // V Edge Runtime nemůžeme použít jsonwebtoken, takže jen kontrolujeme přítomnost
    // Skutečné ověření proběhne v API route /api/admin/verify
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin-secret-2024/login'
      return NextResponse.redirect(url)
    }

    // Token je přítomen - nechat projít, ověření proběhne v API route
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin-secret-2024/:path*',
}
