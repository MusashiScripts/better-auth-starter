import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

const authRoutes = ['/login', '/sign-up', '/forgot-password', '/reset-password']

function checkIsAuthRoute(path: string) {
  //return authRoutes.includes(path)
  return authRoutes.some(route => path.startsWith(route))
}

export async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname

  if (
    currentPath.startsWith('/_next') ||
    currentPath.startsWith('/api') ||
    currentPath.includes('.') // archivos tipo .css, .js, .png
  ) {
    return NextResponse.next()
  }

  const isAuthRoute = checkIsAuthRoute(currentPath)

  const session = await auth.api.getSession({
    headers: await headers()
  })

  //No tiene session y no esta en una ruta de autenticacion
  if (!session && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  //Si tiene session e intenta acceder a alguna ruta de autenticacion
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}