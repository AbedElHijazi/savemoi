"use client";

import { useState } from "react";

export default function TagInput({ value = [], onChange, placeholder = "Type and press Enter" }) {
  const [text, setText] = useState("");

  function add(raw) {
    const t = raw.trim().replace(/,$/, "");
    if (!t || value.includes(t)) return setText("");
    onChange([...value, t]);
    setText("");
  }

  return (
    <div className="tag-input">
      {value.map((t) => (
        <span className="chip" key={t}>
          {t}
          <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} aria-label={`Remove ${t}`}>×</button>
        </span>
      ))}
      <input
        value={text}
        placeholder={value.length ? "" : placeholder}
        onChange={(e) => (e.target.value.endsWith(",") ? add(e.target.value) : setText(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); add(text); }
          if (e.key === "Backspace" && !text && value.length) onChange(value.slice(0, -1));
        }}
        onBlur={() => text && add(text)}
      />
    </div>
  );
}
