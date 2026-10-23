"use client";

import { useEffect } from "react";

export default function ConfirmModal({ open, title, message, confirmLabel = "Confirm", danger = false, busy = false, onConfirm, onCancel }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && !busy && onCancel();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, busy, onCancel]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={() => !busy && onCancel()}>
      <div className="modal" role="alertdialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="actions">
          <button className="btn btn-ghost btn-sm" onClick={onCancel} disabled={busy}>Cancel</button>
          <button className={`btn btn-sm ${danger ? "btn-danger" : "btn-primary"}`} onClick={onConfirm} disabled={busy}>
            {busy ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
