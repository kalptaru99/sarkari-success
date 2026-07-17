import { NextResponse } from 'next/server';

const ADMIN_PATH = '/manage-ss-2026-xk9';
const ADMIN_PASSWORD = 'RajShiv@1949';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(ADMIN_PATH)) {
    const adminToken = request.cookies.get('admin_token')?.value;

    if (adminToken !== Buffer.from(ADMIN_PASSWORD).toString('base64')) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin-login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/manage-ss-2026-xk9/:path*'],
};