import mongoose from "mongoose";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { serialize } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit product" };

export default async function EditProductPage({ params }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) notFound();

  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) notFound();

  return <ProductForm key={id} product={serialize(product)} />;
}
