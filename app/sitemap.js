import { getProducts } from "@/lib/products";
import { CATEGORIES } from "@/lib/constants";
import { POSTS } from "@/lib/blog-data";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const pages = [
    "", "/collections/all", "/blog", "/track-order",
    ...["world-of-savemoi", "loyalty", "active-ingredients", "sustainability", "wholesale",
      "terms-conditions", "privacy-policy", "orders-refund-policy", "shipping-policy", "contact", "store-locator"
    ].map((p) => `/pages/${p}`),
    ...CATEGORIES.map((c) => `/collections/${c.slug}`),
    ...POSTS.map((p) => `/blog/${p.slug}`)
  ];

  let products = [];
  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" })),
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: p.updatedAt }))
  ];
}
