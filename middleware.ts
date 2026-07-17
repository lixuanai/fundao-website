import { NextRequest, NextResponse } from 'next/server'
import { LANGS, DEFAULT_LANG, isValidLang } from '@/lib/i18n/config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, API routes, Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // files with extensions
  ) {
    return
  }

  // Check if pathname starts with a valid lang
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  // Root path → redirect to default lang
  if (pathname === '/') {
    const acceptLang = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0]
    const preferredLang = isValidLang(acceptLang || '') ? acceptLang : DEFAULT_LANG
    return NextResponse.redirect(new URL(`/${preferredLang}`, request.url))
  }

  // Valid lang prefix → pass through
  if (isValidLang(firstSegment)) {
    return
  }

  // Invalid lang prefix → redirect to default lang
  return NextResponse.redirect(new URL(`/${DEFAULT_LANG}${pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|og-image.png|robots.txt|sitemap.xml|llms.txt).*)'],
}
