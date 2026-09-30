import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const pathname = request.nextUrl.pathname;

  // Admin-only protected routes
  const adminOnlyRoutes = ["/add-item", "/order-manage"];
  const isAdminOnly = adminOnlyRoutes.some((route) => pathname.startsWith(route));

  // If trying to access admin routes without login
  if (isAdminOnly && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in but not admin
  if (isAdminOnly && session && session.user?.role !== "admin") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-item/:path*",
    "/order-manage/:path*",
  ],
};


