import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Accordion from "@/components/ui/Accordion";
import BottleArt from "@/components/ui/BottleArt";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export const metadata = { title: "SAVÉMOI for Wholesale" };

const MAIL = "mailto:info@savemoi.com?subject=Wholesale%20Inquiry";

const CHANNELS = [
  { icon: "shield", tag: "Pharmacy & Clinical", title: "Pharmacies & Dermocosmetic Counters", txt: "Your clients come in knowing what they want — or they come in trusting you to guide them. SAVÉMOI is formulated to work within that context: clinically grounded, clearly communicated, and backed by a chemist. It earns its place at the counter." },
  { icon: "bag", tag: "Retail", title: "Boutique Beauty Retailers", txt: "A brand with something to say sells itself. SAVÉMOI's identity is specific — French-formulated, Mediterranean-inspired, clean without being cold. Customers who discover it tend to come back, and they tend to tell people." },
  { icon: "leaf", tag: "Wellness", title: "Spas & Wellness Centers", txt: "Whether it's in the treatment room or on the retail shelf by the door, SAVÉMOI belongs in a space that takes care seriously. Our formulas perform well in professional settings — and they make a natural take-home recommendation." },
  { icon: "lock", tag: "Hospitality", title: "Hotels & Guest Experiences", txt: "The amenity kit is often the first thing a guest notices. SAVÉMOI offers amenity formats and custom labelling for properties that want to give guests something worth taking home — not something they'll leave behind." }
];

const PROCESS = [
  { title: "Get in touch", txt: "Tell us about your business — what you stock, who your clients are, roughly what volume you're thinking. We'll come back with pricing, MOQ, and the full catalog within 24 hours." },
  { title: "Place your first order", txt: "Wholesale pricing applies from order one. You'll have a single contact on our team — for this order and every reorder after it. No going through a system, no explaining yourself twice." },
  { title: "We support the shelf", txt: "Brand materials, product training, restocking — we stay involved. A product that sits isn't good for either of us, so we make sure your team knows how to talk about what they're selling." }
];

const FAQ = [
  { title: "Do you offer regional or territory exclusivity?", content: "We're open to discussing exclusivity for the right partner and volume commitment — tell us about your market when you get in touch, and we'll work it through together." },
  { title: "What are your payment terms?", content: "A deposit is required to confirm your order, with the balance due before shipping. Exact terms are included in the pricing information we send within 24 hours of your first message." },
  { title: "What if a product arrives damaged or defective?", content: "Wholesale orders are covered by a separate partner policy from our consumer Orders & Refund Policy — report any damage or defect to your dedicated contact and it will be replaced or credited." },
  { title: "Can I mix products in a single order?", content: "Yes — your order doesn't need to be a single product or format. Mix across the line to match what your shelf and clients need." }
];

export default async function WholesalePage() {
  let preview = [];
  try {
    preview = await getProducts({ category: "hair-care", limit: 5 });
  } catch {
    preview = [];
  }

  return (
    <>
      <section className="page-hero left" style={{ padding: "5rem 2.5rem 4.5rem" }}>
        <div className="inner">
          <span className="eyebrow">SAVÉMOI · Wholesale</span>
          <h1>Your clients deserve<br />better than <em>average.</em></h1>
          <p className="sub" style={{ marginBottom: "2.2rem" }}>
            We&apos;ve spent years getting our formulas right — so you don&apos;t have to explain why your shelves look different from everyone else&apos;s. They just do.
          </p>
          <a className="btn btn-light" href={MAIL}>Let&apos;s Talk ↗</a>
          <p className="note">We reply within 24 hours · Now onboarding our first wholesale partners</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap-xs">
          <span className="label">Who we are</span>
          <h2 className="h2">French formulation.<br /><em>Lebanese roots.</em></h2>
          <p className="body-txt">
            SAVÉMOI was born from a simple frustration: clean beauty in Lebanon either meant overpriced imports or compromised formulas. So Dr. Ismail Hijazi — a chemist trained in France — set out to build something different. Every product is developed with dermocosmetic precision, using botanically sourced ingredients and no unnecessary fillers.
          </p>
          <div className="pull-quote">
            &ldquo;We didn&apos;t want to be a local brand that tried to look French. We wanted to be a French-standard brand that happens to be made for us.&rdquo;
          </div>
          <p className="body-txt">That&apos;s what you&apos;re stocking when you carry SAVÉMOI. Not just a product line — a story your clients can hold in their hands.</p>
        </div>
      </section>

      {preview.length > 0 && (
        <section className="section bg-cream2">
          <div className="wrap-md">
            <span className="label">What You&apos;d Be Stocking</span>
            <h2 className="h2">Five products.<br /><em>One complete ritual.</em></h2>
            <div className="grid-5 keep-2 mt-2">
              {preview.map((p, i) => (
                <Link key={p._id} href={`/products/${p.slug}`} className="info-card hover center" style={{ alignItems: "center", padding: "1.2rem 1rem" }}>
                  <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {p.images?.[0] ? <img src={p.images[0].url} alt={p.name} style={{ maxHeight: 110, objectFit: "contain" }} /> : <div style={{ height: 90 }}><BottleArt variant={i} /></div>}
                  </div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 15 }}>{p.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap-md">
          <span className="label">Who we work with</span>
          <h2 className="h2">The right fit for<br /><em>serious stockists.</em></h2>
          <div className="grid-2 hairline-grid mt-2" style={{ gap: 1 }}>
            {CHANNELS.map((c) => (
              <div key={c.title} style={{ padding: "2.2rem 2rem" }}>
                <div className="icon-circle" style={{ width: 44, height: 44, marginBottom: "1rem" }}><Icon name={c.icon} size={20} /></div>
                <span className="label" style={{ fontSize: 11, marginBottom: ".5rem" }}>{c.tag}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 20, display: "block", marginBottom: ".6rem" }}>{c.title}</span>
                <p className="body-txt" style={{ lineHeight: 1.85 }}>{c.txt}</p>
              </div>
            ))}
          </div>

          <div className="banner mt-3">
            <div className="icon-circle"><Icon name="heart" /></div>
            <div className="text">
              <span className="title">Not ready to commit? Start with a Sample Kit</span>
              <p>Try the full line yourself before placing a wholesale order — no minimum, no pressure. Just a real feel for what you&apos;d be stocking.</p>
            </div>
            <a className="btn btn-outline-light btn-sm" href="mailto:info@savemoi.com?subject=Wholesale%20Sample%20Kit%20Request">Request Sample Kit →</a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap-md">
          <span className="label">How it works</span>
          <h2 className="h2">Simple from<br /><em>start to shelf.</em></h2>
          <div className="grid-3 mt-2" style={{ gap: "2rem" }}>
            {PROCESS.map((p, i) => (
              <div key={p.title} style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--green-soft)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 44, opacity: 0.2, display: "block", lineHeight: 1, marginBottom: ".8rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 13.5, fontWeight: 600, display: "block", marginBottom: ".5rem" }}>{p.title}</span>
                <p className="body-txt" style={{ lineHeight: 1.8 }}>{p.txt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream2">
        <div className="wrap-sm">
          <span className="label">Wholesale FAQ</span>
          <h2 className="h2" style={{ marginBottom: "1.5rem" }}>A few things<br /><em>partners ask us</em></h2>
          <Accordion items={FAQ} />
        </div>
      </section>

      <section className="cta-band">
        <span className="label">Ready when you are</span>
        <h2 className="h2">Send us a message.<br /><em>We&apos;ll take it from there.</em></h2>
        <p>No forms. No waiting. Just a real conversation about whether SAVÉMOI is the right fit for your shelves — and what that looks like in practice.</p>
        <a className="btn btn-outline-light" href={MAIL}>Start the Conversation ↗</a>
        <p className="fine">SAVÉMOI · Wholesale · Lebanon</p>
      </section>
    </>
  );
}
