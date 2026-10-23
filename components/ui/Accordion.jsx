"use client";

import { useState } from "react";

/**
 * items: [{ title, content (ReactNode), num? }]
 * variant: "" | "caps" | "indent" (space-separated)
 */
export default function Accordion({ items, variant = "", numbered = false, numLabel }) {
  const [open, setOpen] = useState(null);

  return (
    <div className={`accordion ${variant}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const num = numLabel ?? (numbered ? String(i + 1).padStart(2, "0") : null);
        return (
          <div key={i} className={`acc-item ${isOpen ? "open" : ""}`}>
            <button
              type="button"
              className="acc-header"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {num && <span className="acc-num">{num}</span>}
              <span className="acc-title">{item.title}</span>
              <span className="acc-icon" />
            </button>
            <div className="acc-body">
              <div>
                <div className="acc-content">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
