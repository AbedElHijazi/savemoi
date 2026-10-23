"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";

const STEPS = ["pending", "confirmed", "preparing", "shipped", "delivered"];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order not found");
      setOrder(data.order);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const stepIndex = order ? STEPS.indexOf(order.status) : -1;

  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">SAVÉMOI · Orders</span>
        <h1>Track your <em>order</em></h1>
        <p className="sub">Enter your order number and the email used at checkout.</p>
      </section>

      <div className="wrap-xs section">
        <form className="card-box" onSubmit={onSubmit}>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="form-grid">
            <div className="field">
              <label htmlFor="on">Order number</label>
              <input id="on" required value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder="SM-XXXXXX" />
            </div>
            <div className="field">
              <label htmlFor="em">Email</label>
              <input id="em" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <button className="btn btn-primary btn-block mt-1" disabled={loading}>{loading ? "Searching…" : "Track"}</button>
        </form>

        {order && (
          <div className="card-box mt-2">
            <div className="row-between" style={{ marginBottom: 16 }}>
              <h3 style={{ margin: 0 }}>{order.orderNumber}</h3>
              <span className={`status ${order.status === "cancelled" ? "out" : "ok"}`}>{order.status}</span>
            </div>
            {order.status !== "cancelled" && (
              <div className="journey" style={{ margin: "1.5rem 0" }}>
                {STEPS.map((s, i) => (
                  <div className="j" key={s} style={{ opacity: i <= stepIndex ? 1 : 0.35 }}>
                    <div className="dot">{i + 1}</div>
                    <b style={{ textTransform: "capitalize" }}>{s}</b>
                  </div>
                ))}
              </div>
            )}
            {order.trackingNumber && <p className="body-txt">Courier tracking number: <b>{order.trackingNumber}</b></p>}
            {order.items.map((it, idx) => (
              <div className="summary-line" key={idx}><span>{it.name} × {it.qty}</span><span>{formatPrice(it.price * it.qty)}</span></div>
            ))}
            <div className="summary-line total"><span>Total</span><span>{formatPrice(order.total)}</span></div>
          </div>
        )}
      </div>
    </>
  );
}
