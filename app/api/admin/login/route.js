import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import AdminUser from "@/lib/models/AdminUser";
import { SESSION_COOKIE, signSession } from "@/lib/auth";

export async function POST(req) {
  const { email = "", password = "" } = await req.json().catch(() => ({}));
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  await connectDB();
  const user = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });
  const ok = user && (await bcrypt.compare(String(password), user.passwordHash));
  if (!ok) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = await signSession({ sub: String(user._id), email: user.email, name: user.name });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return res;
}
