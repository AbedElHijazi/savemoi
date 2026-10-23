import Link from "next/link";
import Marquee from "@/components/site/Marquee";
import ProductCard from "@/components/site/ProductCard";
import Icon from "@/components/ui/Icon";
import { getBestSellers } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let bestSellers = [];
  try {
    bestSellers = await getBestSellers(8);
  } catch (err) {
    console.error("Home: failed to load products", err);
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url(/hero.jpg)" }} />
        <div className="wrap" style={{ width: "100%" }}>
          <div className="hero-content">
            <span className="hero-eyebrow">French innovation · Mediterranean nature</span>
            <h1>SAVÉMOI: Where Science Meets Nature.</h1>
            <p>Registered in France. Clinically proven, botanically derived.</p>
            <Link href="/collections/all" className="btn btn-light">Shop the Collection</Link>
          </div>
        </div>
      </section>

      <Marquee />

      {/* BEST SELLERS */}
      <section className="section" id="bestsellers">
        <div className="wrap">
          <div className="section-head">
            <span className="label">Most Loved</span>
            <h2 className="h2">Our Best Sellers</h2>
            <div className="gold-rule" />
          </div>
          {bestSellers.length > 0 ? (
            <div className="product-grid cols-4">
              {bestSellers.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>Products coming soon</h3>
              <p>Add products from the admin panel to see them here.</p>
            </div>
          )}
          <div className="center mt-3">
            <Link href="/collections/all" className="link-underline">All Our Products →</Link>
          </div>
        </div>
      </section>

      {/* TEAM / INGREDIENTS / REVIEWS */}
      <section className="section bg-cream2">
        <div className="wrap">
          <div className="triple">
            <div className="panel">
              <h3>The Team</h3>
              <p>Meet the passionate formulators behind SAVÉMOI, blending science with French tradition.</p>
              <div className="ing-row" style={{ marginTop: 28 }}>
                <div className="icon-circle"><Icon name="person" /></div>
                <div>
                  <div className="iname">Dr. Ismail Hijazi</div>
                  <div className="ibenefit">Founder &amp; lead formulator</div>
                </div>
              </div>
              <Link href="/pages/world-of-savemoi" className="text-link" style={{ display: "inline-block", marginTop: 22, fontSize: 12.5 }}>
                Our story →
              </Link>
            </div>

            <div className="panel">
              <h3>Naturally Powerful Ingredients</h3>
              {[
                { icon: "sprout", name: "Fermented Rice Water", benefit: "Strengthens & shines" },
                { icon: "drop", name: "Apple Cider Vinegar", benefit: "Balances pH" },
                { icon: "molecule", name: "Hyaluronic Acid", benefit: "Deep hydration" }
              ].map((ing) => (
                <div className="ing-row" key={ing.name}>
                  <div className="icon-circle"><Icon name={ing.icon} /></div>
                  <div>
                    <div className="iname">{ing.name}</div>
                    <div className="ibenefit">{ing.benefit}</div>
                  </div>
                </div>
              ))}
              <Link href="/pages/active-ingredients" className="text-link" style={{ display: "inline-block", marginTop: 22, fontSize: 12.5 }}>
                Explore our actives →
              </Link>
            </div>

            <div className="panel">
              <h3>Real Reviews</h3>
              <div className="quote-mark">&ldquo;</div>
              <p className="review-text">My hair has never felt this healthy!</p>
              <div className="review-name">— Sophie M.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
