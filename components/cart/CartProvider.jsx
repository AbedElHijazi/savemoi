"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "savemoi_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  /** product: { _id, slug, name, price, image, stock } */
  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const max = Math.max(0, Number(product.stock ?? 99));
      const existing = prev.find((i) => i.id === product._id);
      if (existing) {
        return prev.map((i) =>
          i.id === product._id ? { ...i, qty: Math.min(max, i.qty + qty), maxQty: max, price: product.price } : i
        );
      }
      return [
        ...prev,
        {
          id: product._id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image || "",
          qty: Math.min(max, qty),
          maxQty: max
        }
      ];
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, Math.min(i.maxQty ?? 99, qty)) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    return {
      items, count, subtotal, hydrated, isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem, updateQty, removeItem, clearCart
    };
  }, [items, hydrated, isOpen, addItem, updateQty, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
