import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Subscriber from "@/lib/models/Subscriber";

export async function POST(req) {
  const { email = "" } = await req.json().catch(() => ({}));
  const clean = String(email).trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(clean)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  await connectDB();
  await Subscriber.updateOne({ email: clean }, { $setOnInsert: { email: clean } }, { upsert: true });
  return NextResponse.json({ ok: true, message: "Thank you — you're on the list ✦" });
}
