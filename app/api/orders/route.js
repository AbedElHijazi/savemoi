import { NextResponse } from "next/server";
import crypto from "node:crypto";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import Order from "@/lib/models/Order";
import { calcShipping } from "@/lib/utils";

const REQUIRED = ["name", "email", "phone", "address", "city", "country"];

function orderNumber() {
  return `SM-${Date.now().toString(36).toUpperCase().slice(-5)}${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const customer = body?.customer || {};
  for (const f of REQUIRED) {
    if (!String(customer[f] || "").trim()) {
      return NextResponse.json({ error: `Please fill in your ${f}.` }, { status: 400 });
    }
  }
  if (!/^\S+@\S+\.\S+$/.test(customer.email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const requested = Array.isArray(body.items) ? body.items : [];
  const lines = requested
    .map((i) => ({ id: String(i.id || ""), qty: Math.floor(Number(i.qty) || 0) }))
    .filter((i) => mongoose.isValidObjectId(i.id) && i.qty > 0);
  if (lines.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  await connectDB();

  // Reserve stock atomically, item by item; roll back on any failure.
  const reserved = [];
  const orderItems = [];
  try {
    for (const line of lines) {
      const p = await Product.findOneAndUpdate(
        { _id: line.id, isActive: true, outOfStock: { $ne: true }, stock: { $gte: line.qty } },
        { $inc: { stock: -line.qty } },
        { new: true }
      ).lean();

      if (!p) {
        const existing = await Product.findById(line.id).select("name stock").lean().catch(() => null);
        const name = existing?.name || "An item";
        const left = existing?.stock ?? 0;
        throw new Error(
          left > 0
            ? `${name}: only ${left} left in stock. Please update your bag.`
            : `${name} is out of stock. Please remove it from your bag.`
        );
      }
      reserved.push(line);
      orderItems.push({
        product: p._id,
        name: p.name,
        slug: p.slug,
        image: p.images?.[0]?.url || "",
        price: p.price, // always use the server price
        qty: line.qty
      });
    }
  } catch (err) {
    await Promise.all(reserved.map((r) => Product.updateOne({ _id: r.id }, { $inc: { stock: r.qty } })));
    return NextResponse.json({ error: err.message || "Could not reserve stock" }, { status: 409 });
  }

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = calcShipping(subtotal, customer.country);

  try {
    const order = await Order.create({
      orderNumber: orderNumber(),
      items: orderItems,
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        country: customer.country.trim()
      },
      notes: String(body.notes || "").slice(0, 1000),
      subtotal,
      shipping,
      total: subtotal + shipping
    });
    return NextResponse.json({ ok: true, orderNumber: order.orderNumber }, { status: 201 });
  } catch (err) {
    await Promise.all(reserved.map((r) => Product.updateOne({ _id: r.id }, { $inc: { stock: r.qty } })));
    console.error("Order create failed", err);
    return NextResponse.json({ error: "Could not place the order. Please try again." }, { status: 500 });
  }
}
