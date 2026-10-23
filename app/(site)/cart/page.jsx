"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import BottleArt from "@/components/ui/BottleArt";
import { formatPrice } from "@/lib/utils";
import { SHIPPING } from "@/lib/constants";

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem, hydrated } = useCart();

  if (!hydrated) return <div className="wrap section" />;

  if (items.length === 0) {
    return (
      <div className="wrap section">
        <div className="empty-state">
          <h3>Your bag is empty</h3>
          <p>Discover rituals crafted with French precision.</p>
          <Link href="/collections/all" className="btn btn-primary mt-2">Shop the Collection</Link>
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, SHIPPING.freeThresholdLebanon - subtotal);

  return (
    <>
      <section className="collection-hero">
        <div className="wrap"><h1>Your Bag</h1></div>
      </section>
      <div className="wrap">
        <div className="cart-page">
          <div>
            {items.map((item) => (
              <div className="cart-table-line" key={item.id}>
                <Link href={`/products/${item.slug}`} className="cart-thumb">
                  {item.image ? <img src={item.image} alt={item.name} /> : <BottleArt />}
                </Link>
                <div>
                  <div style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em", fontSize: 14 }}>
                    {item.name}
                  </div>
                  <div style={{ color: "var(--ink-soft)", fontSize: 13, marginTop: 4 }}>{formatPrice(item.price)}</div>
                  <button className="remove-link" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
                <div className="qty">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease">−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} disabled={item.qty >= (item.maxQty ?? 99)} aria-label="Increase">+</button>
                </div>
                <div style={{ fontWeight: 600, minWidth: 70, textAlign: "right" }}>{formatPrice(item.qty * item.price)}</div>
              </div>
            ))}
            <Link href="/collections/all" className="text-link" style={{ display: "inline-block", marginTop: 20, fontSize: 13 }}>
              ← Continue shopping
            </Link>
          </div>

          <aside className="summary-card">
            <h3>Order Summary</h3>
            <div className="summary-line"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="summary-line"><span>Shipping</span><span>Calculated at checkout</span></div>
            {remaining > 0 && (
              <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "10px 0" }}>
                Add {formatPrice(remaining)} more for free delivery in Lebanon.
              </p>
            )}
            <div className="summary-line total"><span>Estimated Total</span><span>{formatPrice(subtotal)}</span></div>
            <Link href="/checkout" className="btn btn-primary btn-block mt-1">Proceed to Checkout</Link>
          </aside>
        </div>
      </div>
    </>
  );
}
