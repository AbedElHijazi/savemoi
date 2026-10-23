import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "savemoi_admin";
const ALG = "HS256";

function getKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET is missing or too short (min 16 chars).");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getKey());
}

export async function verifySession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getKey());
    return payload;
  } catch {
    return null;
  }
}
