import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { requireAdmin } from "@/lib/adminGuard";
import { parseProductInput } from "@/lib/productInput";
import { serialize } from "@/lib/utils";

export async function GET(req) {
  const { error } = await requireAdmin();
  if (error) return error;

  await connectDB();
  const sp = new URL(req.url).searchParams;
  const filter = {};
  const q = sp.get("q");
  if (q) filter.name = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
  if (sp.get("category")) filter.categories = sp.get("category");
  const items = await Product.find(filter).sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ items: serialize(items) });
}

export async function POST(req) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json().catch(() => null);
  const { data, error: inputError } = parseProductInput(body || {});
  if (inputError) return NextResponse.json({ error: inputError }, { status: 400 });

  await connectDB();
  if (await Product.exists({ slug: data.slug })) {
    return NextResponse.json({ error: `The URL slug "${data.slug}" is already used by another product.` }, { status: 409 });
  }
  const product = await Product.create(data);
  return NextResponse.json({ item: serialize(product.toObject()) }, { status: 201 });
}
