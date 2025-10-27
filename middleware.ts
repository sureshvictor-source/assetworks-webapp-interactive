import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // In development with auth disabled, always authorize
        if (process.env.NODE_ENV === 'development' && process.env.DISABLE_AUTH === 'true') {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/financial-playground/:path*',
    '/api/widgets/:path*',
    '/api/user/:path*',
    '/api/playground/:path*',
  ],
};