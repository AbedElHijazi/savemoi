import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Administrator" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    lastLoginAt: Date
  },
  { timestamps: true }
);

export default mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);
