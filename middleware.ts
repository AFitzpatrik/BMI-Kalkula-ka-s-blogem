import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ochrana CMS stránky
  if (pathname.startsWith('/admin-secret-2024')) {
    // Povolit přístup k login stránce
    if (pathname === '/admin-secret-2024/login') {
      return NextResponse.next()
    }

    // Zkontrolovat token v cookie
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin-secret-2024/login'
      return NextResponse.redirect(url)
    }

    // Token je přítomen - přesměrovat na API route pro ověření
    // Skutečné ověření proběhne v API route, middleware jen kontroluje přítomnost
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin-secret-2024/:path*',
}
