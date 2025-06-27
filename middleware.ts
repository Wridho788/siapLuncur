import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/auth/login', '/auth/register', '/dashboard/']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = PUBLIC_PATHS.includes(pathname)

  const token = request.cookies.get('sb-access-token')?.value

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
