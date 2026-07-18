import { NextRequest, NextResponse } from "next/server";

const SITE_PASSWORD = "ocak2026";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.password === SITE_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("site-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 gun
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
