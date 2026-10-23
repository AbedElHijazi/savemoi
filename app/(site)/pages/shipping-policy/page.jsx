import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Accordion from "@/components/ui/Accordion";
import Icon from "@/components/ui/Icon";

export const metadata = { title: "Shipping Policy" };

const STRIP = [
  { icon: "truck", strong: "Worldwide Shipping", txt: "From Lebanon, globally" },
  { icon: "clock", strong: "3–10 Working Days", txt: "Depending on location" },
  { icon: "mail", strong: "Tracking Confirmation", txt: "Sent by email on dispatch" },
  { icon: "pin", strong: "Free Local Delivery", txt: "Lebanon orders above $50" }
];

const JOURNEY = [
  { icon: "bag", title: "Order Placed", txt: "Confirmed instantly" },
  { icon: "calendar", title: "Prepared", txt: "2–3 business days" },
  { icon: "mail", title: "Shipped", txt: "Tracking sent by email" },
  { icon: "truck", title: "In Transit", txt: "3–10 working days" },
  { icon: "check", title: "Delivered", txt: "At your door" }
];

const REGIONS = [
  ["Lebanon", "1–2 working days", 1],
  ["Middle East", "3–5 working days", 2],
  ["Europe", "4–7 working days", 2],
  ["Americas & Rest of World", "7–10 working days", 3]
];

const CARDS_TOP = [
  { icon: "pulse", tag: "Order Tracking", title: "Track Your Package", txt: "Once your order has been processed and shipped, you will receive a confirmation email with your tracking number so you can follow your package every step of the way." },
  { icon: "globe", tag: "Coverage", title: "Shipping Worldwide", txt: "We ship to destinations across the globe via international courier. Simply enter your delivery address at checkout and we'll handle the rest." }
];
const CARDS_BOTTOM = [
  { icon: "tag", tag: "Free Delivery", title: "Lebanon Orders Above $50", txt: "Free delivery applies to orders above $50 within Lebanon. International orders are subject to shipping fees at checkout." },
  { icon: "star", tag: "Carrier", title: "International Courier", txt: "All products ship from Lebanon with a trusted international courier network, fully trackable from dispatch to delivery." }
];

const FAQ = [
  { title: "When will my order be dispatched?", content: "Orders are prepared within 2–3 business days before being dispatched. You will receive a tracking email as soon as your order ships." },
  { title: "How long does delivery take?", content: "Delivery takes between 3 and 10 working days depending on your location — see the region-by-region estimate above. Orders within Lebanon are typically fastest." },
  { title: "Do you offer free shipping?", content: "Free delivery applies to orders above $50 within Lebanon only. International orders are subject to shipping fees calculated at checkout." },
  { title: "Who is responsible for customs fees?", content: "Any customs duties, import taxes, or fees are the sole responsibility of the recipient. SAVÉMOI is not liable for these additional charges. We recommend checking with your local customs authority before ordering." },
  { title: "Which carrier do you use?", content: "We ship via international courier for all orders. All products ship from Lebanon to your destination worldwide." },
  { title: "What if my order arrives damaged or I need a refund?", content: <>See our full <Link href="/pages/orders-refund-policy">Orders &amp; Refund Policy →</Link> for how to report a defective or damaged product and start a refund.</> }
];

function InfoCards({ cards }) {
  return (
    <div className="grid-2" style={{ margin: "2rem 0" }}>
      {cards.map((c) => (
        <div className="info-card" key={c.title}>
          <div className="icon-circle solid" style={{ width: 42, height: 42 }}><Icon name={c.icon} size={19} /></div>
          <span className="tag">{c.tag}</span>
          <span className="title" style={{ fontSize: 19 }}>{c.title}</span>
          <p className="txt">{c.txt}</p>
        </div>
      ))}
    </div>
  );
}

export default function ShippingPolicyPage() {
  return (
    <>
      <PageHero eyebrow="SAVÉMOI · Policy" title={<>Shipping <em>Policy</em></>} date="Last updated: April 2025" />

      <div className="info-strip">
        <div className="inner">
          {STRIP.map((s) => (
            <div className="item" key={s.strong}>
              <div className="icon-circle sm solid"><Icon name={s.icon} strokeWidth={1.8} /></div>
              <div className="txt"><strong>{s.strong}</strong>{s.txt}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="track-bar">Already placed an order? <Link href="/track-order">Track your order →</Link></div>

      <section className="section">
        <div className="wrap-sm">
          <span className="label">Shipping Policy</span>
          <h2 className="h2">Your order, on its way<br /><em>anywhere in the world</em></h2>

          <div className="journey">
            {JOURNEY.map((j) => (
              <div className="j" key={j.title}>
                <div className="dot"><Icon name={j.icon} strokeWidth={1.6} /></div>
                <b>{j.title}</b>
                <small>{j.txt}</small>
              </div>
            ))}
          </div>

          <InfoCards cards={CARDS_TOP} />

          <span className="label" style={{ marginTop: "1rem" }}>What To Expect</span>
          <h2 className="h2" style={{ fontSize: 24 }}>Estimated delivery <em>by region</em></h2>
          <div style={{ marginTop: "1.6rem" }}>
            <div className="region-row head"><span>Region</span><span>Delivery Time</span><span>Relative Cost</span></div>
            {REGIONS.map(([name, days, cost]) => (
              <div className="region-row" key={name}>
                <span style={{ fontWeight: 500 }}>{name}</span>
                <span className="muted">{days}</span>
                <span className="dots">{[1, 2, 3].map((d) => <i key={d} className={d <= cost ? "on" : ""} />)}</span>
              </div>
            ))}
          </div>
          <p className="body-txt" style={{ fontSize: 12.5, marginTop: "1rem", lineHeight: 1.7 }}>
            These are estimates, not guarantees. Exact shipping cost is calculated automatically at checkout based on destination and order weight — you&apos;ll always see it before you pay.
          </p>

          <InfoCards cards={CARDS_BOTTOM} />
        </div>
      </section>

      <section className="section bg-cream2">
        <div className="wrap-sm">
          <span className="label">International Orders</span>
          <h2 className="h2">Customs &amp; <em>Import Duties</em></h2>
          <div className="info-card" style={{ flexDirection: "row", gap: "1.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <div className="icon-circle solid" style={{ width: 44, height: 44 }}><Icon name="home" size={20} /></div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <span className="title" style={{ display: "block", marginBottom: ".5rem" }}>Know Before You Order</span>
              <p className="txt">Customs duties and import taxes may apply depending on your shipping country and location. SAVÉMOI is not liable for any additional costs related to customs that may occur upon delivery. We recommend contacting your local customs authority to determine any potential landed cost prior to completing your purchase.</p>
              <span className="note-box"><strong>Important:</strong> Customs fees, duties, and taxes are the sole responsibility of the recipient and are not included in the product price or shipping cost.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap-sm">
          <span className="label">Quick Answers</span>
          <h2 className="h2" style={{ marginBottom: "1.5rem" }}>Common <em>shipping questions</em></h2>
          <Accordion items={FAQ} variant="caps" numLabel="Q" />
        </div>
      </section>

      <section className="cta-band">
        <h2 className="h2">Still have a <em>shipping question?</em></h2>
        <p>Our team is happy to help with any shipping or customs enquiries. Reach out and we&apos;ll respond within 24 hours.</p>
        <a className="btn btn-light" href="mailto:info@savemoi.com?subject=Shipping%20Question">Contact Us ↗</a>
        <p className="fine">info@savemoi.com · Response within 24 hours</p>
        <div className="links">
          <Link href="/track-order">Track Your Order</Link>
          <Link href="/pages/orders-refund-policy">Orders &amp; Refund Policy</Link>
        </div>
      </section>
    </>
  );
}
