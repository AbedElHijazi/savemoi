import Link from "next/link";
import Icon from "@/components/ui/Icon";
import ProductsTable from "@/components/admin/ProductsTable";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { serialize } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await connectDB();
  const products = serialize(await Product.find().sort({ updatedAt: -1 }).lean());

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Products</h1>
          <p>Edit prices and quantities inline, mark items out of stock, or open a product to edit all details.</p>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary btn-sm"><Icon name="plus" size={14} /> Add Product</Link>
      </div>
      <ProductsTable initialProducts={products} />
    </>
  );
}
