import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const authPaths = ['/login', '/registration', '/verification'];
const isAuthRequest = (url = '') =>
  authPaths.some((path) => url.includes(path));

const tokenCookieName = 'sid';

export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get(tokenCookieName)?.value;

  console.log('Session token:', sessionToken);

  const { pathname } = request.nextUrl;
  const isAuthPage = isAuthRequest(pathname);
  const isProtectedPage = pathname.startsWith('/profile');

  if (isProtectedPage && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && sessionToken) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/login', '/registration', '/verification'],
};
