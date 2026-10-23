import Link from "next/link";

export const metadata = { title: "Order confirmed" };

export default async function SuccessPage({ searchParams }) {
  const { order } = await searchParams;
  return (
    <div className="wrap section">
      <div className="empty-state" style={{ maxWidth: 560, margin: "0 auto" }}>
        <span className="label">Thank you</span>
        <h3 style={{ fontSize: 36 }}>Your order is confirmed</h3>
        {order && (
          <p style={{ margin: "12px 0" }}>
            Order number: <b style={{ color: "var(--green)" }}>{order}</b>
          </p>
        )}
        <p>
          We&apos;re preparing your order — it will be ready within 2–3 business days. A tracking email is sent as soon as it ships.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
          <Link href="/track-order" className="btn btn-outline">Track Order</Link>
          <Link href="/collections/all" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
