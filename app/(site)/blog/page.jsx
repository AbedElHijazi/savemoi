import PageHero from "@/components/ui/PageHero";
import BlogList from "@/components/site/BlogList";
import NewsletterForm from "@/components/ui/NewsletterForm";
import { SUMMARY } from "@/lib/blog-data";

export const metadata = { title: "Journal" };

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="SAVÉMOI · Journal"
        title={<>Beauty knowledge.<br /><em>Beautifully shared.</em></>}
        sub="What every beauty lover needs to know — distilled to what matters most."
      />
      <div className="wrap-md" style={{ paddingTop: "3rem" }}>
        <span className="label">All Articles</span>
        <h2 className="h2" style={{ marginBottom: "1.6rem" }}>What every beauty lover<br /><em>needs to know</em></h2>
      </div>
      <BlogList />

      <section className="section bg-green">
        <div className="wrap-xs">
          <span className="label">The Essentials · Summary</span>
          <h2 className="h2" style={{ marginBottom: "1.6rem" }}>Seven things your beauty<br /><em>routine needs right now</em></h2>
          <ul className="star-list">
            {SUMMARY.map(([b, t]) => <li key={b}><strong>{b}</strong> {t}</li>)}
          </ul>
        </div>
      </section>

      <section className="section center bg-cream2">
        <h2 className="h2">Beauty wisdom,<br /><em>straight to your inbox.</em></h2>
        <p className="body-txt" style={{ marginBottom: ".8rem" }}>New articles every week. No spam. Unsubscribe anytime.</p>
        <span className="chip" style={{ fontSize: 12, textTransform: "none", padding: "6px 14px", marginBottom: "1.6rem" }}>
          ✦ Get 10% off your first order when you subscribe
        </span>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <NewsletterForm light />
        </div>
      </section>
    </>
  );
}
