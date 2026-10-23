"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import Icon from "@/components/ui/Icon";

/** Quick "+" button on product cards. */
export function QuickAdd({ product, disabled }) {
  const { addItem } = useCart();
  return (
    <button
      className="quick-add"
      disabled={disabled}
      aria-label={disabled ? "Out of stock" : `Add ${product.name} to bag`}
      title={disabled ? "Out of stock" : "Add to bag"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, 1);
      }}
    >
      <Icon name="plus" />
    </button>
  );
}

/** Quantity selector + Add to bag on the product page. */
export default function AddToCartPanel({ product, disabled }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const max = Math.max(1, product.stock || 1);

  return (
    <div className="pdp-actions">
      <div className="qty">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={disabled || qty <= 1} aria-label="Decrease">−</button>
        <span>{qty}</span>
        <button onClick={() => setQty((q) => Math.min(max, q + 1))} disabled={disabled || qty >= max} aria-label="Increase">+</button>
      </div>
      <button className="btn btn-primary" disabled={disabled} onClick={() => addItem(product, qty)}>
        {disabled ? "Out of Stock" : "Add to Bag"}
      </button>
    </div>
  );
}
