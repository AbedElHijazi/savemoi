import Link from "next/link";
import BottleArt from "@/components/ui/BottleArt";
import LeafRating from "@/components/ui/LeafRating";
import { QuickAdd } from "@/components/cart/AddToCartButton";
import { formatPrice, isOutOfStock } from "@/lib/utils";

export default function ProductCard({ product, index = 0 }) {
  const oos = isOutOfStock(product);
  const image = product.images?.[0]?.url;
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  const cartProduct = {
    _id: product._id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image,
    stock: product.stock
  };

  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <div className={`product-thumb ${oos ? "is-oos" : ""}`}>
        {oos ? (
          <span className="badge dark">Out of Stock</span>
        ) : onSale ? (
          <span className="badge">Sale</span>
        ) : product.isBestSeller ? (
          <span className="badge">Best Seller</span>
        ) : null}
        {image ? <img src={image} alt={product.images[0].alt || product.name} loading="lazy" /> : <BottleArt variant={index} />}
      </div>
      <div className="product-info">
        <div className="pname">{product.name}</div>
        {product.tagline && <div className="ptag">{product.tagline}</div>}
        {product.tags?.length > 0 && (
          <div className="chip-row">
            {product.tags.slice(0, 3).map((t) => (
              <span className="chip" key={t}>{t}</span>
            ))}
          </div>
        )}
        <LeafRating value={product.rating} />
        <div className="product-bottom" style={{ marginTop: 14 }}>
          <span className="price">
            {formatPrice(product.price)}
            {onSale && <s>{formatPrice(product.compareAtPrice)}</s>}
          </span>
          <QuickAdd product={cartProduct} disabled={oos} />
        </div>
      </div>
    </Link>
  );
}
