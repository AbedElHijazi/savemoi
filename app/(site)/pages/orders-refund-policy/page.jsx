import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Accordion from "@/components/ui/Accordion";
import Icon from "@/components/ui/Icon";

export const metadata = { title: "Orders & Refund Policy" };

const STRIP = [
  { icon: "truck", strong: "2–3 Business Days", txt: "Order preparation time" },
  { icon: "calendar", strong: "Mon – Fri, 9AM – 5PM", txt: "Delivery hours" },
  { icon: "clock", strong: "Within 24 Hours", txt: "Report defective products" },
  { icon: "dollar", strong: "Within 1–14 Days", txt: "Refund processing time" }
];

const FAQ = [
  { title: "I received the wrong item — what now?", content: <>That&apos;s on us, not you. Email <strong>info@savemoi.com</strong> with your order number and a photo of what you received — we&apos;ll send the correct item and cover return shipping for the mistake, no refund process needed.</> },
  { title: "My package arrived damaged — is that covered?", content: "Yes. Shipping damage is treated the same as a product defect: report it within 24 hours with photos of the damaged packaging and product, and follow the three refund steps above." },
  { title: "Can I cancel my order before it ships?", content: "Usually, yes — orders are prepared within 2–3 business days, so there's a short window. Email us as soon as possible; if it hasn't entered preparation yet, we'll cancel it in full." },
  { title: "How long does delivery take once my order ships?", content: <>3–10 working days depending on your location. See our full <Link href="/pages/shipping-policy">Shipping Policy →</Link> for carrier details, customs, and free delivery thresholds.</> }
];

export default function OrdersRefundPage() {
  return (
    <>
      <PageHero eyebrow="SAVÉMOI · Policy" title={<>Orders &amp; <em>Refund Policy</em></>} date="Last updated: April 2025" />

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

      <section className="section-sm">
        <div className="wrap-sm">
          <span className="label">Our Policy</span>
          <h2 className="h2">Orders prepared with care.<br /><em>Issues resolved with speed.</em></h2>
          <p className="body-txt">SAVÉMOI orders are prepared within two to three business days and delivered Monday to Friday, from 9AM until 5PM. If anything arrives defective, we make it right fast: a full refund, reported within 24 hours of receipt, resolved in as little as 1 day.</p>
          <p className="body-txt">Where we can&apos;t help is exchanges or returns of unopened, undamaged products — see why below, and the three simple steps to a defect refund.</p>

          <div className="outline-box mt-2">
            <div className="icon-circle solid" style={{ width: 40, height: 40 }}><Icon name="xCircle" size={18} /></div>
            <div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 19, display: "block", marginBottom: ".4rem" }}>No Exchanges or Returns</span>
              <p className="body-txt" style={{ lineHeight: 1.8 }}>We currently do not accept exchanges or returns. This is standard across personal care and cosmetics — once a product is opened, it can&apos;t be safely resold, for the same hygiene reasons your pharmacy or dermocosmetic counter follows.</p>
              <p className="body-txt" style={{ lineHeight: 1.8 }}>Refunds are only issued in the case of a verified product defect, reported within 24 hours of delivery. Please inspect your order upon receipt.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-cream2">
        <div className="wrap-sm">
          <span className="label">Refund Process</span>
          <h2 className="h2">Three steps to your <em>refund</em></h2>
          <div className="vsteps">
            <div className="vstep">
              <div className="num">1</div>
              <div>
                <div className="head"><span className="label" style={{ margin: 0, fontSize: 11 }}>Contact Us</span><span className="badge-inline">Action Needed</span></div>
                <span className="step-title-lg" style={{ fontFamily: "var(--font-display)", fontSize: 21, display: "block", marginBottom: ".6rem" }}>Send Us Your Refund Request</span>
                <p className="body-txt">Email us at <strong>info@savemoi.com</strong> explaining the reason for your refund. Please include a photo of the defective product, your name, delivery address, and order number.</p>
                <span className="note-box"><strong>Note:</strong> Specify if you&apos;d like a credit card refund — otherwise we will issue store credits. Refund amounts exclude shipping costs, duties, and taxes.</span>
              </div>
            </div>
            <div className="vstep">
              <div className="num">2</div>
              <div>
                <div className="head"><span className="label" style={{ margin: 0, fontSize: 11 }}>Await Approval</span><span className="badge-inline">Action Needed</span></div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 21, display: "block", marginBottom: ".6rem" }}>Return the Defective Product</span>
                <p className="body-txt">Once your request is approved, we will email you authorisation to return the product, along with instructions and a destination address. Products must be returned as received, in their original packaging.</p>
                <span className="note-box"><strong>Note:</strong> You will be responsible for the return shipping cost, duties, and taxes.</span>
              </div>
            </div>
            <div className="vstep auto">
              <div className="num">3</div>
              <div>
                <div className="head"><span className="label" style={{ margin: 0, fontSize: 11 }}>Refund Issued</span><span className="badge-inline dashed">Automatic</span></div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 21, display: "block", marginBottom: ".6rem" }}>Receive Your Refund</span>
                <p className="body-txt">Upon receipt and inspection of the returned product, we will refund your credit card or issue store credits within <strong>1 to 14 days</strong> — no further action needed from you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap-sm">
          <span className="label">Common Questions</span>
          <h2 className="h2" style={{ marginBottom: "1.5rem" }}>A few things<br /><em>people ask us</em></h2>
          <Accordion items={FAQ} />
        </div>
      </section>

      <section className="cta-band">
        <h2 className="h2">Still have <em>questions?</em></h2>
        <p>For further information on our orders and refund policy, our team is ready to help. Reach out and we&apos;ll get back to you within 24 hours.</p>
        <a className="btn btn-light" href="mailto:info@savemoi.com?subject=Order%20or%20Refund%20Question">Contact Us ↗</a>
        <p className="fine">info@savemoi.com · Response within 24 hours</p>
        <div className="links">
          <Link href="/track-order">Track Your Order</Link>
          <Link href="/pages/shipping-policy">Shipping Policy</Link>
        </div>
      </section>
    </>
  );
}
