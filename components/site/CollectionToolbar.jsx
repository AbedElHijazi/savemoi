"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";

export default function CollectionToolbar({ active, count }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const sort = params.get("sort") || "featured";
  const inStock = params.get("instock") === "1";

  function setParam(key, value) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="toolbar">
      <div className="pill-row">
        <Link href="/collections/all" className={`pill ${active === "all" ? "active" : ""}`}>All</Link>
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className={`pill ${active === c.slug ? "active" : ""}`}>
            {c.name}
          </Link>
        ))}
      </div>
      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <label className="check" style={{ border: "none", padding: 0 }}>
          <input type="checkbox" checked={inStock} onChange={(e) => setParam("instock", e.target.checked ? "1" : "")} />
          In stock only
        </label>
        <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{count} products</span>
        <label htmlFor="sort" className="sr-only">Sort by</label>
        <select id="sort" className="select" value={sort} onChange={(e) => setParam("sort", e.target.value)}>
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
    </div>
  );
}
