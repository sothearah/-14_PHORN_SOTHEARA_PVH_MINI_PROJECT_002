import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("next-auth.session-token")?.value || 
                req.cookies.get("__Secure-next-auth.session-token")?.value;

  const protectedRoutes = ["/products", "/profile", "/orders", "/checkout"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!token && pathname.startsWith("/products")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/products/:path*',
    '/login',
    '/register',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};