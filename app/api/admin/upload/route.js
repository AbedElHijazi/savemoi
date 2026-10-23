import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminGuard";
import { ALLOWED_IMAGE_TYPES, MAX_UPLOAD_BYTES, deleteFromR2, uploadToR2 } from "@/lib/r2";

export const runtime = "nodejs";

/** POST multipart/form-data with field "file" → uploads to Cloudflare R2. */
export async function POST(req) {
  const { error } = await requireAdmin();
  if (error) return error;

  let form;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }
  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file received" }, { status: 400 });
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only JPG, PNG, WEBP, AVIF or GIF images are allowed." }, { status: 415 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "Image is larger than 4 MB." }, { status: 413 });
  }

  try {
    const folder = String(form.get("folder") || "products").replace(/[^a-z0-9-]/gi, "") || "products";
    const result = await uploadToR2(file, folder);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("R2 upload failed", err);
    return NextResponse.json({ error: "Upload to storage failed. Check R2 settings." }, { status: 500 });
  }
}

/** DELETE ?key=products/xxx.jpg → removes an orphan upload (e.g. on cancelled new product). */
export async function DELETE(req) {
  const { error } = await requireAdmin();
  if (error) return error;

  const key = new URL(req.url).searchParams.get("key");
  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });
  try {
    await deleteFromR2(key);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("R2 delete failed", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
