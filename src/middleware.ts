import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  console.log("SESSION:", JSON.stringify(session, null, 2));

  const pathname = request.nextUrl.pathname;

  const commonProtectedRoutes = ["/my-collection"];
  const adminOnlyRoutes = ["/add-item", "/order-manage"];

  const isCommonProtected = commonProtectedRoutes.some((route) => pathname.startsWith(route));
  const isAdminOnly = adminOnlyRoutes.some((route) => pathname.startsWith(route));

  if ((isCommonProtected || isAdminOnly) && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  console.log("SESSION:", session);
console.log("USER:", session?.user);


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
    "/add-item/:path*",
    "/order-manage/:path*",
  ],
};


