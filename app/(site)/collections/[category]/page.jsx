import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/site/ProductCard";
import CollectionToolbar from "@/components/site/CollectionToolbar";
import { getProducts } from "@/lib/products";
import { CATEGORIES, categoryName } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { category } = await params;
  return { title: categoryName(category) };
}

export default async function CollectionPage({ params, searchParams }) {
  const { category } = await params;
  const sp = await searchParams;

  if (category !== "all" && !CATEGORIES.some((c) => c.slug === category)) notFound();

  const products = await getProducts({
    category,
    sort: sp?.sort || "featured",
    inStockOnly: sp?.instock === "1"
  });

  return (
    <>
      <section className="collection-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <span>{categoryName(category)}</span>
          </div>
          <h1>{categoryName(category)}</h1>
          <p>Clinically proven, botanically derived — formulated with French dermocosmetic precision.</p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "4.5rem" }}>
        <Suspense>
          <CollectionToolbar active={category} count={products.length} />
        </Suspense>
        {products.length > 0 ? (
          <div className="product-grid cols-4">
            {products.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Nothing here yet</h3>
            <p>New rituals for this collection are on their way.</p>
            <Link href="/collections/all" className="btn btn-primary mt-2">Browse all products</Link>
          </div>
        )}
      </section>
    </>
  );
}
