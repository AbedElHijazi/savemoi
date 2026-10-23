import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

export async function POST(req) {
  const { orderNumber = "", email = "" } = await req.json().catch(() => ({}));
  if (!orderNumber.trim() || !email.trim()) {
    return NextResponse.json({ error: "Order number and email are required." }, { status: 400 });
  }
  await connectDB();
  const order = await Order.findOne({
    orderNumber: orderNumber.trim().toUpperCase(),
    "customer.email": email.trim().toLowerCase()
  })
    .select("orderNumber status items total trackingNumber createdAt")
    .lean();

  if (!order) {
    return NextResponse.json({ error: "We couldn't find an order with these details." }, { status: 404 });
  }
  return NextResponse.json({ order: JSON.parse(JSON.stringify(order)) });
}
