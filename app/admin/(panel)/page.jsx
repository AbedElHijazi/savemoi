import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import Order from "@/lib/models/Order";
import Subscriber from "@/lib/models/Subscriber";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants";
import { formatPrice, serialize } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await connectDB();
  const outFilter = { $or: [{ outOfStock: true }, { stock: { $lte: 0 } }] };

  const lowFilter = { outOfStock: { $ne: true }, stock: { $gt: 0, $lte: LOW_STOCK_THRESHOLD } };
  const [total, active, outCount, lowCount, lowItems, pendingOrders, subscribers, recentOrders, revenueAgg] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ isActive: true }),
    Product.countDocuments(outFilter),
    Product.countDocuments(lowFilter),
    Product.find(lowFilter).sort({ stock: 1 }).limit(8).lean(),
    Order.countDocuments({ status: { $in: ["pending", "confirmed", "preparing"] } }),
    Subscriber.countDocuments(),
    Order.find().sort({ createdAt: -1 }).limit(6).lean(),
    Order.aggregate([{ $match: { status: { $ne: "cancelled" } } }, { $group: { _id: null, sum: { $sum: "$total" } } }])
  ]);
  const outItems = serialize(await Product.find(outFilter).sort({ updatedAt: -1 }).limit(8).lean());
  const low = serialize(lowItems);
  const orders = serialize(recentOrders);
  const revenue = revenueAgg[0]?.sum || 0;

  const kpis = [
    { icon: "box", v: total, l: `Products · ${active} visible` },
    { icon: "alert", v: lowCount, l: "Low stock", cls: "warn" },
    { icon: "ban", v: outCount, l: "Out of stock", cls: "danger" },
    { icon: "bag", v: pendingOrders, l: "Open orders" }
  ];

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Revenue (non-cancelled orders): <b>{formatPrice(revenue)}</b> · Newsletter subscribers: <b>{subscribers}</b></p>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary btn-sm"><Icon name="plus" size={14} /> Add Product</Link>
      </div>

      <div className="kpi-grid">
        {kpis.map((k) => (
          <div className={`kpi ${k.cls || ""}`} key={k.l}>
            <div className="icon-circle"><Icon name={k.icon} /></div>
            <div><div className="v">{k.v}</div><div className="l">{k.l}</div></div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ gap: 20, alignItems: "start" }}>
        <div className="a-card">
          <div className="a-card-head"><h2>Needs attention</h2><Link className="text-link" style={{ fontSize: 12 }} href="/admin/products">Manage stock →</Link></div>
          <div className="table-wrap">
            <table className="a-table">
              <tbody>
                {[...outItems.map((p) => ({ ...p, _s: "out" })), ...low.map((p) => ({ ...p, _s: "low" }))].map((p) => (
                  <tr key={p._id}>
                    <td><Link href={`/admin/products/${p._id}`} style={{ fontWeight: 600 }}>{p.name}</Link></td>
                    <td>{p.stock} in stock</td>
                    <td style={{ textAlign: "right" }}>
                      <span className={`status ${p._s}`}>{p._s === "out" ? (p.outOfStock ? "Out (manual)" : "Out of stock") : "Low stock"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {outItems.length + low.length === 0 && <div className="empty-state" style={{ padding: "2rem" }}>All products are well stocked ✦</div>}
          </div>
        </div>

        <div className="a-card">
          <div className="a-card-head"><h2>Recent orders</h2><Link className="text-link" style={{ fontSize: 12 }} href="/admin/orders">All orders →</Link></div>
          <div className="table-wrap">
            <table className="a-table">
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td><b>{o.orderNumber}</b><div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{o.customer?.name}</div></td>
                    <td>{formatPrice(o.total)}</td>
                    <td style={{ textAlign: "right" }}><span className={`status ${o.status === "cancelled" ? "out" : o.status === "delivered" ? "ok" : "low"}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && <div className="empty-state" style={{ padding: "2rem" }}>No orders yet</div>}
          </div>
        </div>
      </div>
    </>
  );
}
