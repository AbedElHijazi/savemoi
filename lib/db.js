import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Cached connection — prevents opening a new connection on every
 * hot-reload in development and on every request in serverless.
 */
let cached = globalThis.__mongoose;
if (!cached) {
  cached = globalThis.__mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined. Add it to .env.local");
  }
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => m);
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}
