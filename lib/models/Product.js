import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    key: { type: String, default: "" }, // R2 object key (empty for external URLs)
    alt: { type: String, default: "" }
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    sku: { type: String, default: "", trim: true },
    tagline: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    ingredients: { type: String, default: "" },
    howToUse: { type: String, default: "" },
    size: { type: String, default: "" }, // e.g. "250 ml"
    categories: { type: [String], default: [], index: true },
    tags: { type: [String], default: [] }, // chips, e.g. "Curly hair"
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, default: null, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    outOfStock: { type: Boolean, default: false }, // manual override by admin
    isBestSeller: { type: Boolean, default: false, index: true },
    isActive: { type: Boolean, default: true, index: true }, // published / hidden
    rating: { type: Number, default: 5, min: 0, max: 5 },
    images: { type: [ImageSchema], default: [] },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", tagline: "text", description: "text", tags: "text" });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
