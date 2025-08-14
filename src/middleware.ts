import { NextRequest, NextResponse } from 'next/server';

const supportedLocales = ['en', 'pl'];
const excludedPaths = ['/api', '/_next', '/favicon.ico', '/robots.txt', '/assets', '/images'];

const getLocalePrefix = (locale: string): string => {
  if (locale.startsWith('pl')) return 'pl';
  if (locale.startsWith('en')) return 'en';
  return 'en';
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (excludedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const alreadyPrefixed = supportedLocales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (alreadyPrefixed) {
    return NextResponse.next();
  }

  const fullLocale =
    req.cookies.get('NEXT_LOCALE')?.value ||
    req.headers.get('accept-language') ||
    'en';
  const locale = getLocalePrefix(fullLocale);

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
}