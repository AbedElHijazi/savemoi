import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import crypto from "node:crypto";

let client;

function getClient() {
  if (!client) {
    const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;
    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
      throw new Error("Cloudflare R2 credentials are missing in .env.local");
    }
    client = new S3Client({
      region: "auto",
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY
      }
    });
  }
  return client;
}

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // 4 MB (fits Vercel's 4.5 MB request limit)

export function publicUrl(key) {
  const base = (process.env.R2_PUBLIC_URL || "").replace(/\/+$/, "");
  return `${base}/${key}`;
}

/** Uploads a File (from FormData) to R2 and returns { key, url }. */
export async function uploadToR2(file, folder = "products") {
  const ext = (file.name?.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const key = `${folder}/${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const body = Buffer.from(await file.arrayBuffer());

  await getClient().send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      Body: body,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000, immutable"
    })
  );
  return { key, url: publicUrl(key) };
}

export async function deleteFromR2(key) {
  if (!key) return;
  await getClient().send(new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key }));
}
