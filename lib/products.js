import { connectDB } from "./db";
import Product from "./models/Product";
import { serialize } from "./utils";

const SORTS = {
  featured: { isBestSeller: -1, sortOrder: 1, createdAt: -1 },
  newest: { createdAt: -1 },
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
  name: { name: 1 }
};

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getProducts({ category, sort = "featured", q, inStockOnly = false, limit = 0 } = {}) {
  await connectDB();
  const filter = { isActive: true };
  if (category && category !== "all") filter.categories = category;
  if (q) {
    const rx = new RegExp(escapeRegex(q), "i");
    filter.$or = [{ name: rx }, { tagline: rx }, { tags: rx }, { description: rx }];
  }
  if (inStockOnly) {
    filter.outOfStock = { $ne: true };
    filter.stock = { $gt: 0 };
  }
  let query = Product.find(filter).sort(SORTS[sort] || SORTS.featured);
  if (limit) query = query.limit(limit);
  return serialize(await query.lean());
}

export async function getBestSellers(limit = 8) {
  await connectDB();
  let items = await Product.find({ isActive: true, isBestSeller: true })
    .sort({ sortOrder: 1, createdAt: -1 })
    .limit(limit)
    .lean();
  if (items.length === 0) {
    items = await Product.find({ isActive: true }).sort({ createdAt: -1 }).limit(limit).lean();
  }
  return serialize(items);
}

export async function getProductBySlug(slug) {
  await connectDB();
  const p = await Product.findOne({ slug, isActive: true }).lean();
  return p ? serialize(p) : null;
}

export async function getRelated(product, limit = 4) {
  await connectDB();
  const items = await Product.find({
    _id: { $ne: product._id },
    isActive: true,
    categories: { $in: product.categories || [] }
  })
    .limit(limit)
    .lean();
  return serialize(items);
}
