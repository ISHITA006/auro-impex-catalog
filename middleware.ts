import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname.startsWith("/login");
  const isProtectedPage = pathname.startsWith("/catalogue");

  if (isProtectedPage && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && token) {
    const catalogueUrl = new URL("/catalogue", request.url);
    return NextResponse.redirect(catalogueUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/catalogue/:path*"],
};
