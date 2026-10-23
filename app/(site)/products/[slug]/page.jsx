import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/site/ProductGallery";
import ProductCard from "@/components/site/ProductCard";
import AddToCartPanel from "@/components/cart/AddToCartButton";
import Accordion from "@/components/ui/Accordion";
import LeafRating from "@/components/ui/LeafRating";
import Icon from "@/components/ui/Icon";
import { getProductBySlug, getRelated } from "@/lib/products";
import { categoryName, LOW_STOCK_THRESHOLD } from "@/lib/constants";
import { formatPrice, isOutOfStock } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Product not found" };
  return {
    title: p.name,
    description: p.tagline || p.description?.slice(0, 150),
    openGraph: p.images?.[0] ? { images: [p.images[0].url] } : undefined
  };
}

function Paragraphs({ text }) {
  return text
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((para, i) => <p key={i}>{para}</p>);
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelated(product, 4);
  const oos = isOutOfStock(product);
  const low = !oos && product.stock <= LOW_STOCK_THRESHOLD;
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const primaryCat = product.categories?.[0];

  const details = [
    product.description && { title: "Description", content: <Paragraphs text={product.description} /> },
    product.ingredients && { title: "Key Ingredients", content: <Paragraphs text={product.ingredients} /> },
    product.howToUse && { title: "How to Use", content: <Paragraphs text={product.howToUse} /> },
    {
      title: "Delivery & Returns",
      content: (
        <p>
          Orders are prepared within 2–3 business days. Free delivery in Lebanon on orders above $50. See our{" "}
          <Link href="/pages/shipping-policy">Shipping Policy</Link> and{" "}
          <Link href="/pages/orders-refund-policy">Orders &amp; Refund Policy</Link>.
        </p>
      )
    }
  ].filter(Boolean);

  return (
    <>
      <div className="wrap">
        <div className="pdp">
          <ProductGallery images={product.images} name={product.name} outOfStock={oos} />

          <div className="pdp-info">
            <div className="breadcrumb">
              <Link href="/">Home</Link> /{" "}
              {primaryCat ? <Link href={`/collections/${primaryCat}`}>{categoryName(primaryCat)}</Link> : "Shop"}
            </div>
            <h1>{product.name}</h1>
            {product.tagline && <p className="pdp-tagline">{product.tagline}</p>}
            <div style={{ marginTop: 12, display: "flex", gap: 14, alignItems: "center" }}>
              <LeafRating value={product.rating} />
              {product.size && <span className="chip">{product.size}</span>}
            </div>

            <div className="pdp-price">
              {formatPrice(product.price)}
              {onSale && <s>{formatPrice(product.compareAtPrice)}</s>}
            </div>

            <div className="stock-line">
              <span className={`stock-dot ${oos ? "out" : low ? "low" : ""}`} />
              {oos ? "Currently out of stock" : low ? `Only ${product.stock} left — order soon` : "In stock, ready to ship"}
            </div>

            {product.tags?.length > 0 && (
              <div className="chip-row">
                {product.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
            )}

            <AddToCartPanel
              disabled={oos}
              product={{
                _id: product._id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images?.[0]?.url,
                stock: product.stock
              }}
            />

            <div className="pdp-meta">
              <Accordion items={details} />
            </div>

            <div className="pdp-perks">
              <div className="perk"><Icon name="flask" />French dermocosmetic standards</div>
              <div className="perk"><Icon name="leaf" />Botanically derived</div>
              <div className="perk"><Icon name="truck" />Free delivery over $50</div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section bg-cream2">
          <div className="wrap">
            <div className="section-head">
              <span className="label">Complete the Ritual</span>
              <h2 className="h2">You may also love</h2>
            </div>
            <div className="product-grid cols-4">
              {related.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
