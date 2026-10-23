import { SHIPPING } from "./constants";

export function formatPrice(value) {
  const n = Number(value || 0);
  return `$${n.toFixed(2)}`;
}

export function slugify(text = "") {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Converts Mongoose lean docs (ObjectId, Date) into plain JSON for client components. */
export function serialize(data) {
  return JSON.parse(JSON.stringify(data));
}

export function isOutOfStock(p) {
  return Boolean(p?.outOfStock) || Number(p?.stock ?? 0) <= 0;
}

export function calcShipping(subtotal, country) {
  const isLebanon = (country || "").trim().toLowerCase() === "lebanon";
  if (isLebanon) return subtotal >= SHIPPING.freeThresholdLebanon ? 0 : SHIPPING.lebanonFee;
  return SHIPPING.internationalFee;
}
