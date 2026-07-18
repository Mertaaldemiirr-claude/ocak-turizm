import { NextRequest, NextResponse } from "next/server";

const SITE_PASSWORD = "ocak2026";
const COOKIE_NAME = "site-auth";

export function middleware(request: NextRequest) {
  // /studio yolunu koruma dışında tut (Sanity Studio)
  if (request.nextUrl.pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  // API rotalarını koruma dışında tut
  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Statik dosyaları koruma dışında tut
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/favicon") ||
    request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|gif|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Parola gönderilmişse kontrol et
  if (request.method === "POST" && request.nextUrl.pathname === "/giris") {
    return NextResponse.next();
  }

  // Cookie varsa geç
  const authCookie = request.cookies.get(COOKIE_NAME);
  if (authCookie?.value === "true") {
    return NextResponse.next();
  }

  // Giriş sayfasına yönlendir
  const loginUrl = new URL("/giris", request.url);
  return NextResponse.rewrite(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
