import { NextResponse } from 'next/server';

const legacyPrefixes = ['/en', '/pl'];
const excludedPaths = ['/api', '/_next', '/favicon.ico', '/robots.txt'];

export default async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // We are not using matchers here to avoid unnecessary complexity
  if (excludedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  } else {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';
    const newPathname = `/${locale}${pathname}`;

    if (newPathname !== pathname) {
      return NextResponse.redirect(new URL(newPathname, req.nextUrl));
    }
  }
}
