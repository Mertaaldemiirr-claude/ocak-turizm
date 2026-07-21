import { NextRequest, NextResponse } from "next/server";

const SITE_PASSWORD = "ocak2026";
const COOKIE_NAME = "site-auth";

const locales = ["tr", "en", "de", "fr", "es"];
const defaultLocale = "tr";

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language") || "";
  for (const locale of locales) {
    if (acceptLang.toLowerCase().includes(locale)) return locale;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths, static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|gif|css|js|mp4)$/)
  ) {
    return NextResponse.next();
  }

  // Skip /studio (Sanity Studio)
  if (pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  // Skip /api routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Skip /giris (login page - outside locale)
  if (pathname === "/giris") {
    return NextResponse.next();
  }

  // Auth check: if no cookie, rewrite to /giris
  const authCookie = request.cookies.get(COOKIE_NAME);
  if (authCookie?.value !== "true") {
    const loginUrl = new URL("/giris", request.url);
    return NextResponse.rewrite(loginUrl);
  }

  // Locale routing: check if pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to locale-prefixed path
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
