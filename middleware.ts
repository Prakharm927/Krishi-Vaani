import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ["/profile", "/settings"]

  // Auth routes that should redirect to profile if already logged in
  const authRoutes = ["/login", "/register"]

  // Check if the route is protected and user is not authenticated
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !sessionCookie) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // Check if the route is an auth route and user is already authenticated
  if (authRoutes.some((route) => pathname.startsWith(route)) && sessionCookie) {
    return NextResponse.redirect(new URL("/profile", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*", "/settings/:path*", "/login", "/register"],
}
