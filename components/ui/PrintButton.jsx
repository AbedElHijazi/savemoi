"use client";

import Icon from "./Icon";

export default function PrintButton() {
  return (
    <button
      type="button"
      className="btn btn-outline-light btn-sm"
      style={{ marginTop: "1.1rem", borderRadius: 100, position: "relative", zIndex: 1 }}
      onClick={() => window.print()}
    >
      <Icon name="print" size={13} /> Print / Save as PDF
    </button>
  );
}
