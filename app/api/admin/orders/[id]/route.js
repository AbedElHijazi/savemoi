import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { requireAdmin } from "@/lib/adminGuard";
import { ORDER_STATUSES } from "@/lib/constants";

export async function PATCH(req, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  await connectDB();
  const order = await Order.findById(id);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  if (body.status !== undefined) {
    if (!ORDER_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    const wasCancelled = order.status === "cancelled";
    const willCancel = body.status === "cancelled";

    // Return stock when an order is cancelled; take it again if un-cancelled.
    if (!wasCancelled && willCancel) {
      await Promise.all(order.items.map((i) => Product.updateOne({ _id: i.product }, { $inc: { stock: i.qty } })));
    } else if (wasCancelled && !willCancel) {
      const taken = [];
      for (const i of order.items) {
        const ok = await Product.findOneAndUpdate(
          { _id: i.product, stock: { $gte: i.qty } },
          { $inc: { stock: -i.qty } }
        );
        if (!ok) {
          await Promise.all(taken.map((t) => Product.updateOne({ _id: t.product }, { $inc: { stock: t.qty } })));
          return NextResponse.json(
            { error: `Not enough stock to re-open this order (${i.name}).` },
            { status: 409 }
          );
        }
        taken.push(i);
      }
    }
    order.status = body.status;
  }
  if (body.trackingNumber !== undefined) order.trackingNumber = String(body.trackingNumber).trim();

  await order.save();
  return NextResponse.json({ item: JSON.parse(JSON.stringify(order.toObject())) });
}
