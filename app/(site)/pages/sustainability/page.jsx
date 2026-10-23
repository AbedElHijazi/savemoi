import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Icon from "@/components/ui/Icon";

export const metadata = { title: "Sustainability" };

const PILLARS = [
  { icon: "shield", title: "Proven Clean, Not Just Claimed", txt: "No sulfates, parabens, mineral oils, or PFAs — not because it's trendy, but because your scalp absorbs what you put on it. We take that seriously.", link: { href: "/pages/active-ingredients", label: "See what's inside every formula →" } },
  { icon: "leaf", title: "No Animal Was Harmed. Period.", txt: "There's no version of good beauty that hurts animals to get there. Cruelty-free isn't a badge for us — it's just the only way we know how to work." },
  { icon: "root", title: "Traced From Root to Bottle", txt: "We know where every botanical comes from. Not approximately — exactly. Ethical sourcing means being able to answer that question without hesitation." },
  { icon: "recycle", title: "Packaging That Earns Its Place", txt: "We hate waste as much as you do. Our packaging is refillable because throwing away a perfectly good bottle every month never made sense to us." }
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="SAVÉMOI · Sustainability"
        title={<>Your beauty deserves<br /><em>better ingredients.</em></>}
        sub="We started SAVÉMOI because we couldn't find beautycare that worked without the ingredients we didn't want. So we made it ourselves."
      />

      <div className="stat-strip" style={{ background: "var(--cream)" }}>
        <div className="inner" style={{ gap: "4rem" }}>
          {[["0", "Harsh chemicals. Ever."], ["75%", "Less plastic with refill pouches"], ["100%", "Cruelty-free, always"]].map(([n, l]) => (
            <div key={l} style={{ maxWidth: 180 }}><span className="stat-num">{n}</span><span className="stat-label">{l}</span></div>
          ))}
        </div>
      </div>

      <section className="section bg-cream2">
        <div className="wrap-xs" style={{ maxWidth: 780 }}>
          <div className="center">
            <span className="label">The SAVÉMOI Standard</span>
            <h2 className="h2" style={{ marginBottom: "2rem" }}>Formulated to perform.<br /><em>Designed to do no harm.</em></h2>
          </div>
          {PILLARS.map((p) => (
            <div className="p-row" key={p.title}>
              <div className="icon-circle"><Icon name={p.icon} /></div>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 18, display: "block", marginBottom: ".3rem" }}>{p.title}</span>
                <p className="body-txt" style={{ lineHeight: 1.75 }}>{p.txt}</p>
                {p.link && <Link className="text-link" href={p.link.href} style={{ display: "inline-block", marginTop: ".5rem", fontSize: 12 }}>{p.link.label}</Link>}
              </div>
            </div>
          ))}

          <div className="center" style={{ paddingTop: "2.4rem" }}>
            <p className="body-txt" style={{ maxWidth: 460, margin: "0 auto 1.4rem", fontSize: 13 }}>
              Every claim on this page is backed by our own formulation and sourcing records — never tested on animals, at any stage, by us or on our behalf.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.6rem", flexWrap: "wrap" }}>
              {[["shieldPlain", "Cruelty-Free Formula"], ["leaf", "Vegan Formula"], ["flask", "Made in France"]].map(([ic, l]) => (
                <div key={l} style={{ width: 96, display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem" }}>
                  <div className="icon-circle" style={{ borderStyle: "dashed", borderColor: "var(--green-strong)", background: "transparent" }}><Icon name={ic} /></div>
                  <span className="stat-label" style={{ marginTop: 0, fontSize: 9.5 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section center">
        <div className="wrap-xs" style={{ maxWidth: 780 }}>
          <span className="label">Refill &amp; Save</span>
          <h2 className="h2">How refilling<br /><em>actually works</em></h2>
          <div className="steps-row small" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              ["Buy Once", "Start with any full-size SAVÉMOI bottle — yours to keep for good."],
              ["Order a Refill", "When it's low, order a 1L or 5L refill in place of a new bottle."],
              ["Pour & Reuse", "Top up your original bottle. Less plastic, lower cost, same formula."]
            ].map(([t, x], i) => (
              <div className="step" key={t}>
                <div className="step-num">{i + 1}</div>
                <span className="title" style={{ fontSize: 17 }}>{t}</span>
                <p className="txt" style={{ fontSize: 13.5 }}>{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-green">
        <div className="wrap-md" style={{ maxWidth: 900 }}>
          <span className="label center">Refill &amp; Save</span>
          <h2 className="h2 center">The same formula.<br /><em>A fraction of the waste.</em></h2>
          <div className="grid-2 mt-2" style={{ gap: 1, background: "rgba(254,253,249,.12)" }}>
            {[
              { tag: "Bulk Format", title: "5L Refill", stats: [["75%", "Less Plastic"], ["25%", "Cost Saving"]] },
              { tag: "Compact Format", title: "1L Refill", stats: [["30%", "Less Plastic"], ["10%", "Cost Saving"]] }
            ].map((c) => (
              <div key={c.title} style={{ background: "var(--green)", padding: "1.8rem" }}>
                <span className="label" style={{ fontSize: 10, marginBottom: ".5rem" }}>{c.tag}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 22, display: "block", marginBottom: "1rem" }}>{c.title}</span>
                <div style={{ display: "flex", gap: "2rem" }}>
                  {c.stats.map(([n, l]) => (
                    <div key={l}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 28, display: "block", lineHeight: 1 }}>{n}</span>
                      <span style={{ fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--cream-soft)" }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section center">
        <h2 className="h2">You don&apos;t have to compromise.<br /><em>You never did.</em></h2>
        <Link className="btn btn-primary mt-1" href="/collections/refills">Start Refilling Today ↗</Link>
        <p className="stat-label" style={{ marginTop: "1.1rem" }}>Clean · Cruelty-Free · Refill &amp; Reuse</p>
      </section>
    </>
  );
}
