"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import Icon from "@/components/ui/Icon";
import BottleArt from "@/components/ui/BottleArt";
import { formatPrice } from "@/lib/utils";
import { SHIPPING } from "@/lib/constants";

export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, updateQty, removeItem } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const remaining = Math.max(0, SHIPPING.freeThresholdLebanon - subtotal);
  const pct = Math.min(100, (subtotal / SHIPPING.freeThresholdLebanon) * 100);

  return (
    <>
      <div className="drawer-backdrop" onClick={closeCart} />
      <aside className="drawer" role="dialog" aria-label="Shopping bag">
        <div className="drawer-head">
          <h3>Your Bag</h3>
          <button className="icon-btn" onClick={closeCart} aria-label="Close bag">
            <Icon name="close" />
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty-state">
              <h3>Your bag is empty</h3>
              <p>Discover rituals crafted with French precision.</p>
              <Link href="/collections/all" className="btn btn-primary mt-2" onClick={closeCart}>
                Shop the Collection
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-line" key={item.id}>
                <Link href={`/products/${item.slug}`} className="cart-thumb" onClick={closeCart}>
                  {item.image ? <img src={item.image} alt={item.name} /> : <BottleArt />}
                </Link>
                <div>
                  <div className="name">{item.name}</div>
                  <div className="price">{formatPrice(item.price)}</div>
                  <button className="remove-link" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
                <div className="qty sm">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease">−</button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    disabled={item.qty >= (item.maxQty ?? 99)}
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="drawer-progress">
              {remaining > 0
                ? <>Add <b>{formatPrice(remaining)}</b> more for free delivery in Lebanon</>
                : <>You&apos;ve unlocked <b>free delivery</b> in Lebanon ✦</>}
              <div className="progress-bar"><span style={{ width: `${pct}%` }} /></div>
            </div>
            <div className="row-between total-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link href="/checkout" className="btn btn-primary btn-block" onClick={closeCart}>
              Checkout
            </Link>
            <Link href="/cart" className="btn btn-outline btn-block mt-1" onClick={closeCart}>
              View Bag
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
