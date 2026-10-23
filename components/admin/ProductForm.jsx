"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import ImageUploader from "./ImageUploader";
import TagInput from "./TagInput";
import ConfirmModal from "./ConfirmModal";
import { useToast } from "./Toast";
import { CATEGORIES, LOW_STOCK_THRESHOLD } from "@/lib/constants";
import { slugify } from "@/lib/utils";

const EMPTY = {
  name: "",
  slug: "",
  sku: "",
  tagline: "",
  description: "",
  ingredients: "",
  howToUse: "",
  size: "",
  categories: [],
  tags: [],
  price: "",
  compareAtPrice: "",
  stock: 0,
  outOfStock: false,
  isBestSeller: false,
  isActive: true,
  rating: 5,
  sortOrder: 0,
  images: []
};

export default function ProductForm({ product }) {
  const router = useRouter();
  const { notify } = useToast();
  const isEdit = Boolean(product?._id);

  const [form, setForm] = useState(() => ({
    ...EMPTY,
    ...(product || {}),
    compareAtPrice: product?.compareAtPrice ?? ""
  }));
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [dirty, setDirty] = useState(false);
  const sessionKeys = useRef(new Set());

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function set(field, value) {
    setDirty(true);
    setForm((f) => {
      const next = { ...f, [field]: value };
      if (field === "name" && !slugTouched) next.slug = slugify(value);
      return next;
    });
  }
  const bind = (field) => ({ value: form[field] ?? "", onChange: (e) => set(field, e.target.value) });

  function toggleCategory(slug) {
    set("categories", form.categories.includes(slug) ? form.categories.filter((c) => c !== slug) : [...form.categories, slug]);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      name: form.name,
      slug: form.slug,
      sku: form.sku,
      tagline: form.tagline,
      description: form.description,
      ingredients: form.ingredients,
      howToUse: form.howToUse,
      size: form.size,
      categories: form.categories,
      tags: form.tags,
      price: form.price === "" ? undefined : Number(form.price),
      compareAtPrice: form.compareAtPrice === "" ? null : Number(form.compareAtPrice),
      stock: parseInt(form.stock, 10) || 0,
      outOfStock: form.outOfStock,
      isBestSeller: form.isBestSeller,
      isActive: form.isActive,
      rating: Number(form.rating),
      sortOrder: Number(form.sortOrder) || 0,
      images: form.images
    };

    try {
      const res = await fetch(isEdit ? `/api/admin/products/${product._id}` : "/api/admin/products", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      sessionKeys.current.clear(); // uploads are now owned by the saved product
      setDirty(false);
      notify(isEdit ? "Product updated" : "Product created");
      if (isEdit) {
        setForm({ ...EMPTY, ...data.item, compareAtPrice: data.item.compareAtPrice ?? "" });
        router.refresh();
      } else {
        router.push(`/admin/products/${data.item._id}`);
        router.refresh();
      }
    } catch (err) {
      setError(err.message);
      notify(err.message, "error");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${product._id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setDirty(false);
      notify("Product deleted");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      notify(err.message, "error");
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  const stockNum = parseInt(form.stock, 10) || 0;
  const effectiveOut = form.outOfStock || stockNum <= 0;
  const stockLabel = form.outOfStock
    ? { cls: "out", txt: "Out of stock (manual)" }
    : stockNum <= 0
      ? { cls: "out", txt: "Out of stock (qty 0)" }
      : stockNum <= LOW_STOCK_THRESHOLD
        ? { cls: "low", txt: "Low stock" }
        : { cls: "ok", txt: "In stock" };

  return (
    <form onSubmit={onSubmit}>
      <div className="admin-topbar">
        <div>
          <Link href="/admin/products" style={{ fontSize: 12.5, color: "var(--ink-soft)", display: "inline-flex", gap: 6, alignItems: "center" }}>
            <Icon name="arrowLeft" size={14} /> All products
          </Link>
          <h1 style={{ marginTop: 6 }}>{isEdit ? form.name || "Edit product" : "Add new product"}</h1>
          {isEdit && <p>Last updated {new Date(product.updatedAt).toLocaleString()}</p>}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {isEdit && (
            <a className="btn btn-ghost btn-sm" href={`/products/${form.slug}`} target="_blank" rel="noopener noreferrer">
              <Icon name="eye" size={14} /> View
            </a>
          )}
          {isEdit && (
            <button type="button" className="btn btn-ghost btn-sm" style={{ color: "var(--danger)" }} onClick={() => setConfirmDelete(true)}>
              <Icon name="trash" size={14} /> Delete
            </button>
          )}
          <button className="btn btn-primary btn-sm" disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-layout">
        {/* ───────── MAIN COLUMN ───────── */}
        <div className="form-stack">
          <div className="a-card">
            <div className="a-card-head"><h2>Details</h2></div>
            <div className="a-card-body form-stack">
              <div className="field">
                <label htmlFor="name">Product name *</label>
                <input id="name" required {...bind("name")} placeholder="e.g. Rosemary Shampoo" />
              </div>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="slug">URL slug *</label>
                  <input
                    id="slug"
                    required
                    value={form.slug}
                    onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }}
                  />
                  <div className="hint">/products/{form.slug || "…"}</div>
                </div>
                <div className="field">
                  <label htmlFor="tagline">Tagline</label>
                  <input id="tagline" {...bind("tagline")} placeholder="Nourish, shine & hydrate" />
                </div>
                <div className="field">
                  <label htmlFor="sku">SKU</label>
                  <input id="sku" {...bind("sku")} placeholder="SM-HC-001" />
                </div>
                <div className="field">
                  <label htmlFor="size">Size / volume</label>
                  <input id="size" {...bind("size")} placeholder="250 ml" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="description">Description</label>
                <textarea id="description" {...bind("description")} rows={5} />
                <div className="hint">Leave an empty line between paragraphs.</div>
              </div>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="ingredients">Key ingredients</label>
                  <textarea id="ingredients" {...bind("ingredients")} rows={4} />
                </div>
                <div className="field">
                  <label htmlFor="howToUse">How to use</label>
                  <textarea id="howToUse" {...bind("howToUse")} rows={4} />
                </div>
              </div>
              <div className="field">
                <label>Tags (shown as chips — e.g. &ldquo;Dry hair&rdquo;)</label>
                <TagInput value={form.tags} onChange={(v) => set("tags", v)} />
              </div>
            </div>
          </div>

          <div className="a-card">
            <div className="a-card-head">
              <h2>Images</h2>
              <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>First image is the main image</span>
            </div>
            <div className="a-card-body">
              <ImageUploader images={form.images} onChange={(v) => set("images", v)} sessionKeys={sessionKeys.current} />
            </div>
          </div>
        </div>

        {/* ───────── SIDE COLUMN ───────── */}
        <div className="side">
          <div className="a-card">
            <div className="a-card-head"><h2>Pricing</h2></div>
            <div className="a-card-body form-stack">
              <div className="field">
                <label htmlFor="price">Price (USD) *</label>
                <input id="price" type="number" min="0" step="0.01" required {...bind("price")} />
              </div>
              <div className="field">
                <label htmlFor="compare">Compare-at price</label>
                <input id="compare" type="number" min="0" step="0.01" {...bind("compareAtPrice")} placeholder="Optional — shows as sale" />
              </div>
            </div>
          </div>

          <div className="a-card">
            <div className="a-card-head">
              <h2>Inventory</h2>
              <span className={`status ${stockLabel.cls}`}>{stockLabel.txt}</span>
            </div>
            <div className="a-card-body form-stack">
              <div className="field">
                <label htmlFor="stock">Quantity in stock</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <button type="button" className="a-icon-btn" onClick={() => set("stock", Math.max(0, stockNum - 1))} aria-label="Decrease">−</button>
                  <input id="stock" type="number" min="0" step="1" {...bind("stock")} style={{ textAlign: "center" }} />
                  <button type="button" className="a-icon-btn" onClick={() => set("stock", stockNum + 1)} aria-label="Increase">+</button>
                </div>
                <div className="hint">Stock decreases automatically with every order.</div>
              </div>
              <label className="switch danger">
                <input type="checkbox" checked={form.outOfStock} onChange={(e) => set("outOfStock", e.target.checked)} />
                <span className="track" />
                Mark as out of stock
              </label>
              <div className="hint" style={{ marginTop: -8 }}>
                {effectiveOut
                  ? "Customers can see this product but cannot add it to the bag."
                  : "Forces “Out of stock” even when quantity is above 0."}
              </div>
            </div>
          </div>

          <div className="a-card">
            <div className="a-card-head"><h2>Organisation</h2></div>
            <div className="a-card-body form-stack">
              <div className="field">
                <label>Categories</label>
                <div className="check-grid">
                  {CATEGORIES.map((c) => (
                    <label key={c.slug} className={`check ${form.categories.includes(c.slug) ? "on" : ""}`}>
                      <input type="checkbox" checked={form.categories.includes(c.slug)} onChange={() => toggleCategory(c.slug)} />
                      {c.name}
                    </label>
                  ))}
                </div>
              </div>
              <label className="switch">
                <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} />
                <span className="track" />
                Visible on storefront
              </label>
              <label className="switch">
                <input type="checkbox" checked={form.isBestSeller} onChange={(e) => set("isBestSeller", e.target.checked)} />
                <span className="track" />
                Show in &ldquo;Our Best Sellers&rdquo;
              </label>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="rating">Rating (0–5)</label>
                  <input id="rating" type="number" min="0" max="5" step="1" {...bind("rating")} />
                </div>
                <div className="field">
                  <label htmlFor="sortOrder">Sort order</label>
                  <input id="sortOrder" type="number" step="1" {...bind("sortOrder")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-save">
        {dirty && <span style={{ alignSelf: "center", fontSize: 12.5, color: "var(--warn)", marginRight: "auto" }}>● Unsaved changes</span>}
        <Link href="/admin/products" className="btn btn-ghost btn-sm">Cancel</Link>
        <button className="btn btn-primary btn-sm" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
        </button>
      </div>

      {isEdit && (
        <ConfirmModal
          open={confirmDelete}
          danger
          busy={deleting}
          title="Delete this product?"
          message={`"${form.name}" and its images on Cloudflare R2 will be permanently removed. To pause selling instead, use “Mark as out of stock” or hide it from the storefront.`}
          confirmLabel="Delete permanently"
          onCancel={() => setConfirmDelete(false)}
          onConfirm={onDelete}
        />
      )}
    </form>
  );
}
