import { CATEGORIES } from "./constants";
import { slugify } from "./utils";

const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

const STRING_FIELDS = ["name", "sku", "tagline", "description", "ingredients", "howToUse", "size"];
const BOOL_FIELDS = ["outOfStock", "isBestSeller", "isActive"];

/**
 * Whitelists and validates product input coming from the admin UI.
 * partial=true → only fields present in `body` are returned (PATCH).
 * Returns { data, error }.
 */
export function parseProductInput(body = {}, { partial = false } = {}) {
  const data = {};

  for (const f of STRING_FIELDS) {
    if (body[f] !== undefined) data[f] = String(body[f] ?? "").trim();
  }
  for (const f of BOOL_FIELDS) {
    if (body[f] !== undefined) data[f] = Boolean(body[f]);
  }

  if (body.slug !== undefined || (!partial && body.name)) {
    data.slug = slugify(body.slug || body.name || "");
  }

  if (body.price !== undefined) {
    const n = Number(body.price);
    if (!Number.isFinite(n) || n < 0) return { error: "Price must be a positive number." };
    data.price = Math.round(n * 100) / 100;
  }
  if (body.compareAtPrice !== undefined) {
    if (body.compareAtPrice === "" || body.compareAtPrice === null) {
      data.compareAtPrice = null;
    } else {
      const n = Number(body.compareAtPrice);
      if (!Number.isFinite(n) || n < 0) return { error: "Compare-at price must be a positive number." };
      data.compareAtPrice = Math.round(n * 100) / 100;
    }
  }
  if (body.stock !== undefined) {
    const n = Number(body.stock);
    if (!Number.isInteger(n) || n < 0) return { error: "Quantity must be a whole number ≥ 0." };
    data.stock = n;
  }
  if (body.rating !== undefined) {
    const n = Number(body.rating);
    if (!Number.isFinite(n) || n < 0 || n > 5) return { error: "Rating must be between 0 and 5." };
    data.rating = n;
  }
  if (body.sortOrder !== undefined) data.sortOrder = Number(body.sortOrder) || 0;

  if (body.categories !== undefined) {
    if (!Array.isArray(body.categories)) return { error: "Categories must be a list." };
    data.categories = body.categories.filter((c) => CATEGORY_SLUGS.includes(c));
  }
  if (body.tags !== undefined) {
    if (!Array.isArray(body.tags)) return { error: "Tags must be a list." };
    data.tags = [...new Set(body.tags.map((t) => String(t).trim()).filter(Boolean))].slice(0, 12);
  }
  if (body.images !== undefined) {
    if (!Array.isArray(body.images)) return { error: "Images must be a list." };
    data.images = body.images
      .filter((img) => img && typeof img.url === "string" && img.url)
      .map((img) => ({ url: img.url, key: String(img.key || ""), alt: String(img.alt || "") }));
  }

  if (!partial) {
    if (!data.name) return { error: "Product name is required." };
    if (!data.slug) return { error: "Slug could not be generated from the name." };
    if (data.price === undefined) return { error: "Price is required." };
  }
  if (partial && data.name !== undefined && !data.name) return { error: "Product name cannot be empty." };

  return { data };
}
