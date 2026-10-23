import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "savemoi_admin";
const PUBLIC_ADMIN_PATHS = ["/admin/login", "/api/admin/login"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  let valid = false;
  if (token && process.env.AUTH_SECRET) {
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET));
      valid = true;
    } catch {
      valid = false;
    }
  }

  if (valid) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
