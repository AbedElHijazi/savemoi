"use client";

import { Fragment, useState } from "react";
import { useToast } from "./Toast";
import { ORDER_STATUSES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

const STATUS_CLS = { pending: "low", confirmed: "low", preparing: "low", shipped: "ok", delivered: "ok", cancelled: "out" };

export default function OrdersTable({ initialOrders }) {
  const { notify } = useToast();
  const [orders, setOrders] = useState(initialOrders);
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("");
  const [q, setQ] = useState("");

  async function patch(id, payload) {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setOrders((prev) => prev.map((o) => (o._id === id ? data.item : o)));
      notify("Order updated");
    } catch (err) {
      notify(err.message, "error");
    }
  }

  const term = q.trim().toLowerCase();
  const visible = orders.filter(
    (o) =>
      (!filter || o.status === filter) &&
      (!term || `${o.orderNumber} ${o.customer?.name} ${o.customer?.email} ${o.customer?.phone}`.toLowerCase().includes(term))
  );

  return (
    <div className="a-card">
      <div className="filters-bar">
        <div className="search">
          <input style={{ paddingLeft: 14 }} placeholder="Search order #, name, email or phone…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className="select" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status">
          <option value="">All statuses</option>
          {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              <th>Order</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th />
            </tr>
          </thead>
          <tbody>
            {visible.map((o) => (
              <Fragment key={o._id}>
                <tr>
                  <td><b>{o.orderNumber}</b></td>
                  <td style={{ whiteSpace: "nowrap" }}>{new Date(o.createdAt).toLocaleString()}</td>
                  <td>{o.customer?.name}<div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{o.customer?.country}</div></td>
                  <td>{o.items.reduce((n, i) => n + i.qty, 0)}</td>
                  <td><b>{formatPrice(o.total)}</b></td>
                  <td>
                    <select
                      className="select"
                      style={{ padding: "6px 30px 6px 10px", fontSize: 12.5 }}
                      value={o.status}
                      onChange={(e) => patch(o._id, { status: e.target.value })}
                      aria-label={`Status for ${o.orderNumber}`}
                    >
                      {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <span className={`status ${STATUS_CLS[o.status]}`} style={{ marginLeft: 8 }}>{o.status}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setOpen(open === o._id ? null : o._id)}>
                      {open === o._id ? "Hide" : "Details"}
                    </button>
                  </td>
                </tr>
                {open === o._id && (
                  <tr>
                    <td colSpan={7} style={{ background: "#fbfbf7" }}>
                      <div className="grid-3" style={{ gap: 20, padding: "8px 0" }}>
                        <div>
                          <span className="label" style={{ fontSize: 10 }}>Customer</span>
                          <div>{o.customer.name}</div>
                          <div><a className="text-link" href={`mailto:${o.customer.email}`}>{o.customer.email}</a></div>
                          <div>{o.customer.phone}</div>
                          <div style={{ marginTop: 6 }}>{o.customer.address}, {o.customer.city}, {o.customer.country}</div>
                          {o.notes && <div style={{ marginTop: 6, fontStyle: "italic" }}>“{o.notes}”</div>}
                        </div>
                        <div>
                          <span className="label" style={{ fontSize: 10 }}>Items</span>
                          {o.items.map((i, idx) => (
                            <div key={idx} className="row-between" style={{ fontSize: 13, marginBottom: 4 }}>
                              <span>{i.name} × {i.qty}</span><span>{formatPrice(i.price * i.qty)}</span>
                            </div>
                          ))}
                          <div className="row-between" style={{ fontSize: 13, color: "var(--ink-soft)" }}><span>Shipping</span><span>{formatPrice(o.shipping)}</span></div>
                          <div className="row-between" style={{ fontWeight: 600, marginTop: 6 }}><span>Total</span><span>{formatPrice(o.total)}</span></div>
                        </div>
                        <div>
                          <span className="label" style={{ fontSize: 10 }}>Courier tracking #</span>
                          <TrackingInput value={o.trackingNumber} onSave={(v) => patch(o._id, { trackingNumber: v })} />
                          <p style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 8 }}>
                            Cancelling an order returns its items to stock automatically.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && <div className="empty-state"><h3>No orders</h3></div>}
      </div>
    </div>
  );
}

function TrackingInput({ value, onSave }) {
  const [v, setV] = useState(value || "");
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <input className="inline-input" style={{ width: "100%" }} value={v} onChange={(e) => setV(e.target.value)} placeholder="e.g. 1Z999…" />
      <button className="btn btn-primary btn-sm" onClick={() => onSave(v)} disabled={v === (value || "")}>Save</button>
    </div>
  );
}
