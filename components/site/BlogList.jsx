"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { BLOG_FILTERS, POSTS } from "@/lib/blog-data";

export default function BlogList() {
  const [filter, setFilter] = useState("all");
  const visible = POSTS.filter((p) => filter === "all" || p.categories.includes(filter));
  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <div className="wrap-md" style={{ paddingBottom: "4rem" }}>
      <div className="pill-row" role="tablist" aria-label="Filter articles by category" style={{ marginBottom: "2rem" }}>
        {BLOG_FILTERS.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            className={`pill ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {featured && (
        <Link href={`/blog/${featured.slug}`} className="blog-featured" style={{ marginBottom: "2.5rem" }}>
          <div className="blog-img">
            <span className="badge">Start Here</span>
            <Icon name={featured.icon} strokeWidth={0.8} />
          </div>
          <div className="blog-body">
            <span className="label" style={{ fontSize: 11, marginBottom: ".6rem" }}>{featured.tag}</span>
            <h3 style={{ fontSize: 27, lineHeight: 1.25 }}>{featured.title}</h3>
            <ul className="dash-list">{featured.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            <span style={{ fontSize: 11, color: "var(--ink-soft)" }}>By {featured.author} · {featured.minutes} min read</span>
            <span className="text-link" style={{ marginTop: "1rem", fontSize: 12, width: "fit-content" }}>Continue Reading →</span>
          </div>
        </Link>
      )}

      <div className="grid-3">
        {rest.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
            <div className="blog-img">
              <Icon name={p.icon} strokeWidth={0.9} size={40} />
              <span className="lbl">{p.imgLabel}</span>
            </div>
            <div className="blog-body">
              <span className="label" style={{ fontSize: 11, marginBottom: ".5rem" }}>{p.tag}</span>
              <h3 style={{ fontSize: 18, lineHeight: 1.3, fontWeight: 400 }}>{p.title}</h3>
              <ul className="dash-list" style={{ borderTop: "1px solid var(--green-soft)", paddingTop: ".9rem" }}>
                {p.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
              <div className="card-foot">
                <span>By {p.author} · {p.minutes} min read</span>
                <b>Read →</b>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visible.length === 0 && <div className="empty-state"><h3>No articles yet</h3></div>}
    </div>
  );
}
