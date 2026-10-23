import Link from "next/link";
import ProductCard from "@/components/site/ProductCard";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export const metadata = { title: "Search" };

export default async function SearchPage({ searchParams }) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const products = query ? await getProducts({ q: query }) : [];

  return (
    <>
      <section className="collection-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/">Home</Link> / Search</div>
          <h1>{query ? <>Results for &ldquo;{query}&rdquo;</> : "Search"}</h1>
          <p>{query ? `${products.length} product${products.length === 1 ? "" : "s"} found` : "Type in the search bar above."}</p>
        </div>
      </section>
      <section className="wrap section">
        {products.length > 0 ? (
          <div className="product-grid cols-4">
            {products.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        ) : (
          query && (
            <div className="empty-state">
              <h3>No matches</h3>
              <p>Try another keyword, or browse the full collection.</p>
              <Link href="/collections/all" className="btn btn-primary mt-2">Browse all products</Link>
            </div>
          )
        )}
      </section>
    </>
  );
}
