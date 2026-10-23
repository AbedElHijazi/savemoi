"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { calcShipping, formatPrice } from "@/lib/utils";

const COUNTRIES = [
  "Lebanon", "Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", "Oman", "Jordan",
  "Egypt", "France", "Germany", "United Kingdom", "United States", "Canada", "Australia", "Other"
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, hydrated } = useCart();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", country: "Lebanon", notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const shipping = calcShipping(subtotal, form.country);
  const total = subtotal + shipping;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          notes: form.notes,
          items: items.map((i) => ({ id: i.id, qty: i.qty }))
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not place the order");
      clearCart();
      router.push(`/checkout/success?order=${encodeURIComponent(data.orderNumber)}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  if (!hydrated) return <div className="wrap section" />;

  if (items.length === 0) {
    return (
      <div className="wrap section">
        <div className="empty-state">
          <h3>Your bag is empty</h3>
          <Link href="/collections/all" className="btn btn-primary mt-2">Shop the Collection</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="collection-hero">
        <div className="wrap">
          <div className="breadcrumb"><Link href="/cart">Bag</Link> / Checkout</div>
          <h1>Checkout</h1>
        </div>
      </section>
      <div className="wrap">
        <form className="cart-page" onSubmit={onSubmit}>
          <div className="card-box">
            <h3>Delivery Details</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-grid">
              <div className="field full">
                <label htmlFor="name">Full name</label>
                <input id="name" required value={form.name} onChange={set("name")} autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required value={form.email} onChange={set("email")} autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" required value={form.phone} onChange={set("phone")} autoComplete="tel" />
              </div>
              <div className="field full">
                <label htmlFor="address">Address</label>
                <input id="address" required value={form.address} onChange={set("address")} autoComplete="street-address" />
              </div>
              <div className="field">
                <label htmlFor="city">City</label>
                <input id="city" required value={form.city} onChange={set("city")} autoComplete="address-level2" />
              </div>
              <div className="field">
                <label htmlFor="country">Country</label>
                <select id="country" value={form.country} onChange={set("country")}>
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="field full">
                <label htmlFor="notes">Order notes (optional)</label>
                <textarea id="notes" value={form.notes} onChange={set("notes")} placeholder="Building, floor, delivery instructions…" />
              </div>
            </div>
            <div className="note-box" style={{ marginTop: 20 }}>
              <b>Payment:</b> Cash on Delivery. Customs duties for international orders are the responsibility of the recipient.
            </div>
          </div>

          <aside className="summary-card">
            <h3>Your Order</h3>
            {items.map((i) => (
              <div className="summary-line" key={i.id}>
                <span>{i.name} × {i.qty}</span>
                <span>{formatPrice(i.qty * i.price)}</span>
              </div>
            ))}
            <div className="summary-line" style={{ borderTop: "1px solid var(--green-soft)", paddingTop: 12, marginTop: 12 }}>
              <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="summary-line total"><span>Total</span><span>{formatPrice(total)}</span></div>
            <button className="btn btn-primary btn-block mt-1" disabled={submitting}>
              {submitting ? "Placing order…" : "Place Order"}
            </button>
            <p style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 12, lineHeight: 1.6 }}>
              By placing your order you agree to our <Link href="/pages/terms-conditions" className="text-link">Terms</Link>.
            </p>
          </aside>
        </form>
      </div>
    </>
  );
}
