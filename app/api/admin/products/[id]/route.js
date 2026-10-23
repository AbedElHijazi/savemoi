import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { requireAdmin } from "@/lib/adminGuard";
import { parseProductInput } from "@/lib/productInput";
import { deleteFromR2 } from "@/lib/r2";
import { serialize } from "@/lib/utils";

function badId() {
  return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
}

export async function GET(_req, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return badId();

  await connectDB();
  const item = await Product.findById(id).lean();
  if (!item) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json({ item: serialize(item) });
}

/** Partial update — used by the full edit form AND the inline qty / price / stock toggles. */
export async function PATCH(req, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return badId();

  const body = await req.json().catch(() => null);
  const { data, error: inputError } = parseProductInput(body || {}, { partial: true });
  if (inputError) return NextResponse.json({ error: inputError }, { status: 400 });

  await connectDB();
  const existing = await Product.findById(id).lean();
  if (!existing) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  if (data.slug && data.slug !== existing.slug && (await Product.exists({ slug: data.slug, _id: { $ne: id } }))) {
    return NextResponse.json({ error: `The URL slug "${data.slug}" is already used by another product.` }, { status: 409 });
  }

  const updated = await Product.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();

  // Clean up R2 objects that were removed from the gallery
  if (data.images) {
    const kept = new Set(data.images.map((i) => i.key).filter(Boolean));
    const removed = (existing.images || []).filter((i) => i.key && !kept.has(i.key));
    await Promise.allSettled(removed.map((i) => deleteFromR2(i.key)));
  }

  return NextResponse.json({ item: serialize(updated) });
}

export async function DELETE(_req, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return badId();

  await connectDB();
  const deleted = await Product.findByIdAndDelete(id).lean();
  if (!deleted) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  await Promise.allSettled((deleted.images || []).filter((i) => i.key).map((i) => deleteFromR2(i.key)));
  return NextResponse.json({ ok: true });
}
