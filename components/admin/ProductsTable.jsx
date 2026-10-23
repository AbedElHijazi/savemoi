"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import BottleArt from "@/components/ui/BottleArt";
import ConfirmModal from "./ConfirmModal";
import { useToast } from "./Toast";
import { CATEGORIES, LOW_STOCK_THRESHOLD, categoryName } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

function stockStatus(p) {
  if (!p.isActive) return { cls: "muted", label: "Hidden" };
  if (p.outOfStock) return { cls: "out", label: "Out of stock (manual)" };
  if (p.stock <= 0) return { cls: "out", label: "Out of stock" };
  if (p.stock <= LOW_STOCK_THRESHOLD) return { cls: "low", label: "Low stock" };
  return { cls: "ok", label: "In stock" };
}

async function patchProduct(id, payload) {
  const res = await fetch(`/api/admin/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Update failed");
  return data.item;
}

async function deleteProduct(id) {
  const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Delete failed");
}

export default function ProductsTable({ initialProducts }) {
  const { notify } = useToast();
  const [rows, setRows] = useState(initialProducts);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [drafts, setDrafts] = useState({});
  const [busy, setBusy] = useState({});
  const [confirm, setConfirm] = useState(null); // { ids, names }
  const [deleting, setDeleting] = useState(false);

  useEffect(() => setRows(initialProducts), [initialProducts]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter((p) => {
      if (term && !`${p.name} ${p.sku} ${p.slug}`.toLowerCase().includes(term)) return false;
      if (category && !p.categories?.includes(category)) return false;
      if (status) {
        const s = stockStatus(p).cls;
        if (status === "ok" && s !== "ok") return false;
        if (status === "low" && s !== "low") return false;
        if (status === "out" && s !== "out") return false;
        if (status === "hidden" && p.isActive) return false;
      }
      return true;
    });
  }, [rows, q, category, status]);

  const counts = useMemo(() => {
    const c = { all: rows.length, ok: 0, low: 0, out: 0, hidden: 0 };
    rows.forEach((p) => {
      const s = stockStatus(p).cls;
      if (s === "muted") c.hidden++;
      else c[s]++;
    });
    return c;
  }, [rows]);

  function replaceRow(item) {
    setRows((prev) => prev.map((r) => (r._id === item._id ? item : r)));
  }

  async function update(id, payload, successMsg) {
    setBusy((b) => ({ ...b, [id]: true }));
    try {
      const item = await patchProduct(id, payload);
      replaceRow(item);
      setDrafts((d) => {
        const next = { ...d };
        delete next[id];
        return next;
      });
      if (successMsg) notify(successMsg);
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setBusy((b) => ({ ...b, [id]: false }));
    }
  }

  function setDraft(id, field, value) {
    setDrafts((d) => ({ ...d, [id]: { ...d[id], [field]: value } }));
  }

  function commitDraft(p, field) {
    const draft = drafts[p._id]?.[field];
    if (draft === undefined) return;
    const original = field === "stock" ? p.stock : p.price;
    if (draft === "" || Number(draft) === Number(original)) {
      setDrafts((d) => {
        const next = { ...d, [p._id]: { ...d[p._id] } };
        delete next[p._id][field];
        return next;
      });
      return;
    }
    const value = field === "stock" ? parseInt(draft, 10) : Number(draft);
    update(p._id, { [field]: value }, `${p.name}: ${field === "stock" ? "quantity" : "price"} updated`);
  }

  function onKey(e, p, field) {
    if (e.key === "Enter") e.currentTarget.blur();
    if (e.key === "Escape") {
      setDrafts((d) => {
        const next = { ...d, [p._id]: { ...d[p._id] } };
        delete next[p._id][field];
        return next;
      });
      setTimeout(() => e.target.blur(), 0);
    }
  }

  const allVisibleSelected = filtered.length > 0 && filtered.every((p) => selected.has(p._id));
  function toggleAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) filtered.forEach((p) => next.delete(p._id));
      else filtered.forEach((p) => next.add(p._id));
      return next;
    });
  }
  function toggleOne(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function bulkUpdate(payload, label) {
    const ids = [...selected];
    const results = await Promise.allSettled(ids.map((id) => patchProduct(id, payload)));
    results.forEach((r) => r.status === "fulfilled" && replaceRow(r.value));
    const failed = results.filter((r) => r.status === "rejected").length;
    notify(failed ? `${failed} item(s) failed to update` : `${ids.length} product(s) ${label}`, failed ? "error" : "success");
    setSelected(new Set());
  }

  async function runDelete() {
    if (!confirm) return;
    setDeleting(true);
    const results = await Promise.allSettled(confirm.ids.map((id) => deleteProduct(id)));
    const okIds = confirm.ids.filter((_, i) => results[i].status === "fulfilled");
    setRows((prev) => prev.filter((r) => !okIds.includes(r._id)));
    setSelected((prev) => {
      const next = new Set(prev);
      okIds.forEach((id) => next.delete(id));
      return next;
    });
    const failed = confirm.ids.length - okIds.length;
    notify(failed ? `${failed} product(s) could not be deleted` : `${okIds.length} product(s) deleted`, failed ? "error" : "success");
    setDeleting(false);
    setConfirm(null);
  }

  return (
    <div className="a-card">
      <div className="filters-bar">
        <div className="search">
          <Icon name="search" />
          <input placeholder="Search by name, SKU or slug…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
        </div>
        <select className="select" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <select className="select" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          <option value="">All statuses ({counts.all})</option>
          <option value="ok">In stock ({counts.ok})</option>
          <option value="low">Low stock ({counts.low})</option>
          <option value="out">Out of stock ({counts.out})</option>
          <option value="hidden">Hidden ({counts.hidden})</option>
        </select>
      </div>

      {selected.size > 0 && (
        <div className="filters-bar" style={{ background: "var(--green-wash)", borderRadius: 0 }}>
          <b style={{ fontSize: 13 }}>{selected.size} selected</b>
          <button className="btn btn-ghost btn-sm" onClick={() => bulkUpdate({ outOfStock: true }, "marked out of stock")}>
            <Icon name="ban" size={14} /> Mark Out of Stock
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => bulkUpdate({ outOfStock: false }, "marked available")}>
            <Icon name="check" size={14} /> Mark Available
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => bulkUpdate({ isActive: false }, "hidden")}>
            <Icon name="eyeOff" size={14} /> Hide
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => bulkUpdate({ isActive: true }, "published")}>
            <Icon name="eye" size={14} /> Publish
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => setConfirm({ ids: [...selected], names: rows.filter((r) => selected.has(r._id)).map((r) => r.name) })}
          >
            <Icon name="trash" size={14} /> Delete
          </button>
          <button className="btn btn-sm" style={{ marginLeft: "auto" }} onClick={() => setSelected(new Set())}>Clear</button>
        </div>
      )}

      <div className="table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}>
                <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Select all" style={{ accentColor: "var(--green)" }} />
              </th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Out of stock</th>
              <th>Visible</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => {
              const st = stockStatus(p);
              const d = drafts[p._id] || {};
              const isBusy = !!busy[p._id];
              return (
                <tr key={p._id} className={p.isActive ? "" : "is-hidden"}>
                  <td>
                    <input type="checkbox" checked={selected.has(p._id)} onChange={() => toggleOne(p._id)} aria-label={`Select ${p.name}`} style={{ accentColor: "var(--green)" }} />
                  </td>
                  <td>
                    <div className="prod-cell">
                      <div className="thumb">
                        {p.images?.[0] ? <img src={p.images[0].url} alt="" /> : <BottleArt variant={idx} />}
                      </div>
                      <div>
                        <Link href={`/admin/products/${p._id}`} className="n">{p.name}</Link>
                        <div className="s">
                          {p.sku ? `SKU ${p.sku} · ` : ""}{p.size || "—"}
                          {p.isBestSeller && " · ★ Best seller"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 12.5, color: "var(--ink-soft)", maxWidth: 160 }}>
                    {(p.categories || []).map(categoryName).join(", ") || "—"}
                  </td>
                  <td>
                    <div className="inline-money">
                      <span>$</span>
                      <input
                        className={`inline-input ${d.price !== undefined ? "dirty" : ""}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={d.price ?? p.price}
                        disabled={isBusy}
                        onChange={(e) => setDraft(p._id, "price", e.target.value)}
                        onBlur={() => commitDraft(p, "price")}
                        onKeyDown={(e) => onKey(e, p, "price")}
                        aria-label={`Price for ${p.name}`}
                      />
                    </div>
                    {p.compareAtPrice > p.price && (
                      <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 3 }}>
                        was <s>{formatPrice(p.compareAtPrice)}</s>
                      </div>
                    )}
                  </td>
                  <td>
                    <input
                      className={`inline-input ${d.stock !== undefined ? "dirty" : ""}`}
                      style={{ width: 76 }}
                      type="number"
                      min="0"
                      step="1"
                      value={d.stock ?? p.stock}
                      disabled={isBusy}
                      onChange={(e) => setDraft(p._id, "stock", e.target.value)}
                      onBlur={() => commitDraft(p, "stock")}
                      onKeyDown={(e) => onKey(e, p, "stock")}
                      aria-label={`Quantity for ${p.name}`}
                    />
                  </td>
                  <td><span className={`status ${st.cls}`}>{st.label}</span></td>
                  <td>
                    <label className="switch danger" title="Force this item out of stock regardless of quantity">
                      <input
                        type="checkbox"
                        checked={!!p.outOfStock}
                        disabled={isBusy}
                        onChange={(e) =>
                          update(p._id, { outOfStock: e.target.checked }, `${p.name} ${e.target.checked ? "marked out of stock" : "is available again"}`)
                        }
                      />
                      <span className="track" />
                    </label>
                  </td>
                  <td>
                    <label className="switch" title="Show / hide on the storefront">
                      <input
                        type="checkbox"
                        checked={!!p.isActive}
                        disabled={isBusy}
                        onChange={(e) => update(p._id, { isActive: e.target.checked }, `${p.name} ${e.target.checked ? "published" : "hidden"}`)}
                      />
                      <span className="track" />
                    </label>
                  </td>
                  <td>
                    <div className="row-actions">
                      {isBusy && <span className="spinner" style={{ alignSelf: "center" }} />}
                      <a className="a-icon-btn" href={`/products/${p.slug}`} target="_blank" rel="noopener noreferrer" title="View on store">
                        <Icon name="eye" />
                      </a>
                      <Link className="a-icon-btn" href={`/admin/products/${p._id}`} title="Edit details">
                        <Icon name="edit" />
                      </Link>
                      <button className="a-icon-btn danger" title="Delete" onClick={() => setConfirm({ ids: [p._id], names: [p.name] })}>
                        <Icon name="trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Adjust the filters or add a new product.</p>
            <Link href="/admin/products/new" className="btn btn-primary btn-sm mt-1">Add Product</Link>
          </div>
        )}
      </div>

      <div className="pagination">
        <span>Showing {filtered.length} of {rows.length} products</span>
        <span>Tip: edit price / qty inline — press Enter to save, Esc to cancel.</span>
      </div>

      <ConfirmModal
        open={!!confirm}
        danger
        busy={deleting}
        title={confirm?.ids.length > 1 ? `Delete ${confirm.ids.length} products?` : "Delete product?"}
        message={
          confirm
            ? `${confirm.names.slice(0, 3).join(", ")}${confirm.names.length > 3 ? "…" : ""} will be permanently removed, including images stored in Cloudflare R2. This cannot be undone. Tip: use "Out of stock" or "Hidden" if you only want to pause selling.`
            : ""
        }
        confirmLabel="Delete permanently"
        onCancel={() => setConfirm(null)}
        onConfirm={runDelete}
      />
    </div>
  );
}
