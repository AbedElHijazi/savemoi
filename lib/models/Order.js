import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    slug: String,
    image: String,
    price: Number,
    qty: Number
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    items: { type: [OrderItemSchema], default: [] },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true }
    },
    notes: { type: String, default: "" },
    paymentMethod: { type: String, default: "Cash on Delivery" },
    subtotal: Number,
    shipping: Number,
    total: Number,
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "shipped", "delivered", "cancelled"],
      default: "pending",
      index: true
    },
    trackingNumber: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
