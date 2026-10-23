import OrdersTable from "@/components/admin/OrdersTable";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import { serialize } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Orders" };

export default async function AdminOrdersPage() {
  await connectDB();
  const orders = serialize(await Order.find().sort({ createdAt: -1 }).limit(500).lean());
  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Orders</h1>
          <p>Update order status and courier tracking. Customers can follow progress on the Track Order page.</p>
        </div>
      </div>
      <OrdersTable initialOrders={orders} />
    </>
  );
}
