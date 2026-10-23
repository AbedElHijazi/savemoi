import Link from "next/link";
import Icon from "@/components/ui/Icon";

export const metadata = { title: "Active Ingredients" };

const FAMILIES = [
  { icon: "leafStem", title: "Mediterranean Botanical Antioxidants", body: "Olive, laurel bay, lavender, rosemary — rich in polyphenols.", tags: ["Anti-pollution", "Radiance"], proof: "0% Sulfate · 0% Silicone", found: "Rosemary Shampoo & Conditioner", href: "/search?q=rosemary" },
  { icon: "herb", title: "Botanical Complexes & Herbal Actives", body: "Chamomile, sage, calendula, geranium.", tags: ["Soothing", "Rebalancing"], proof: "0% Silicone · 0% Paraben", found: "Mint Shampoo", href: "/products/mint-shampoo" },
  { icon: "molecule", title: "Dermocosmetic Active Molecules", body: "Hyaluronic acid, niacinamide, peptides, essential vitamins.", tags: ["Hydration", "Anti-aging"], proof: "Silk Protein Complex", found: "Hibiscus Conditioner", href: "/products/hibiscus-conditioner" },
  { icon: "drop", title: "Nourishing Botanical Oils", body: "Cold-pressed argan, jojoba, sweet almond, avocado.", tags: ["Nourishing", "Elasticity"], proof: "0% Mineral Oil · 0% Silicone", found: "Rosemary Hair Oil", href: "/products/rosemary-hair-oil" },
  { icon: "jar", title: "Natural Butters & Lipid Care", body: "Shea, mango, and plant-based butters.", tags: ["Barrier repair", "Comfort"], proof: "0% Dyes · 0% Paraben", found: "Rosemary Conditioner", href: "/products/rosemary-conditioner" }
];

export default function ActiveIngredientsPage() {
  return (
    <>
      <section className="section-sm center">
        <div className="wrap-xs">
          <span className="label">SAVÉMOI · Ingredient Philosophy</span>
          <h1 className="h2" style={{ fontSize: "clamp(30px,4.5vw,44px)" }}>Your hair deserves<br />the source</h1>
          <p className="body-txt" style={{ maxWidth: 440, margin: "0 auto" }}>
            Five families of actives. One promise: nature&apos;s finest, elevated by French dermocosmetic science.
          </p>
        </div>
      </section>

      <div className="wrap-md">
        <div className="banner">
          <div className="icon-circle"><Icon name="flask" /></div>
          <div className="text">
            <span className="title">French Dermocosmetic Precision</span>
            <p>Every formula is developed under strict French standards, from raw material sourcing to final batch testing — the same discipline behind every ingredient family below.</p>
          </div>
          <div className="chip-row">
            <span className="chip chip-light">Clinically Tested</span>
            <span className="chip chip-light">French Expertise</span>
          </div>
        </div>

        <div className="grid-auto" style={{ padding: "2.5rem 0" }}>
          {FAMILIES.map((f) => (
            <div className="info-card hover" key={f.title}>
              <div className="icon-circle"><Icon name={f.icon} /></div>
              <p className="title" style={{ fontSize: 18 }}>{f.title}</p>
              <p className="txt">{f.body}</p>
              <div className="chip-row">{f.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              <div className="proof"><Icon name="check" strokeWidth={2} />{f.proof}</div>
              <div className="found">
                <small>Featured In</small>
                <Link className="text-link" href={f.href}>{f.found} →</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="grid-4 hairline-grid center" style={{ gap: 1 }}>
          {[["5", "Botanical Families"], ["100%", "Botanically Sourced Oils"], ["FR", "Dermocosmetic Standards"], ["∞", "Mediterranean Heritage"]].map(([n, l]) => (
            <div key={l} style={{ padding: "1.6rem 1rem", background: "var(--cream2)" }}>
              <span className="stat-num" style={{ fontSize: 32 }}>{n}</span>
              <span className="stat-label">{l}</span>
            </div>
          ))}
        </div>

        <div className="center" style={{ background: "var(--cream2)", borderRadius: 6, padding: "3rem 2rem", margin: "3rem 0 4rem" }}>
          <h2 className="h2">Discover the rituals<br /><em>built on these actives</em></h2>
          <p className="body-txt" style={{ maxWidth: 440, margin: "0 auto 1.4rem" }}>
            Every ingredient family above lives inside a real SAVÉMOI product — shop the full hair care line.
          </p>
          <Link className="btn btn-primary" href="/collections/hair-care">Shop All Products ↗</Link>
        </div>
      </div>
    </>
  );
}
