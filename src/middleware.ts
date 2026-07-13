import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const pathname = request.nextUrl.pathname;

  const commonProtectedRoutes = ["/my-collection", "/all-items"];
  const adminOnlyRoutes = ["/add-item", "/order-manage"];

  const isCommonProtected = commonProtectedRoutes.some((route) => pathname.startsWith(route));
  const isAdminOnly = adminOnlyRoutes.some((route) => pathname.startsWith(route));

  if ((isCommonProtected || isAdminOnly) && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }


  if (isAdminOnly && session && session.user?.role !== "admin") {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my-collection/:path*",
    "/all-items/:path*",
    "/add-item/:path*",
    "/order-manage/:path*",
  ],
};