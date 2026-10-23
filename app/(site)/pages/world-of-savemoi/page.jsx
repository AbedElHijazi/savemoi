import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Icon from "@/components/ui/Icon";

export const metadata = { title: "The World of SAVÉMOI" };

const TIMELINE = [
  {
    yr: "2024 — The Conviction",
    title: "A gap nobody was filling",
    txt: "Lebanon's botanical legacy was extraordinary. French cosmetic mastery was unmatched. No one had truly united them into a complete beauty universe — until SAVÉMOI."
  },
  {
    yr: "2025 — The Obsession",
    title: "Every formula pushed past every standard",
    txt: "Hundreds of iterations across every category. Every texture tested, every active refined. Only formulas that exceeded expectations made it through."
  },
  {
    yr: "2026 — The Moment",
    title: "SAVÉMOI enters the world",
    txt: "A complete cosmetic universe, launched with one clear ambition: to become the defining reference in Mediterranean-inspired beauty worldwide.",
    peak: true
  },
  {
    yr: "The Future — Your Beauty",
    title: "This is only the beginning",
    txt: "New formulas. New rituals. New ways to reveal your beauty. One unwavering obsession: giving you exactly what you deserve.",
    future: true
  }
];

export default function WorldOfSavemoiPage() {
  return (
    <>
      <PageHero
        eyebrow="SAVÉMOI · Our Story"
        title={<>Two years of obsession.<br /><em>One extraordinary vision.</em></>}
        sub="Lebanon's botanical legacy. French cosmetic mastery. United, for the first time, into one complete beauty universe."
      />

      <div className="stat-strip">
        <div className="inner">
          {[["2", "Years in Development"], ["5", "Product Lines at Launch"], ["2", "Countries, One Vision"]].map(([n, l]) => (
            <div key={l}><span className="stat-num">{n}</span><span className="stat-label">{l}</span></div>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="wrap-xs center">
          <span className="label">The Duality at Our Core</span>
          <div className="duality">
            <div className="node">
              <div className="icon-circle"><Icon name="pin" /></div>
              <b>Lebanon</b>
              <small>Botanical Legacy</small>
            </div>
            <div className="line" />
            <Icon name="sprout" size={22} />
            <div className="line" />
            <div className="node">
              <div className="icon-circle"><Icon name="flask" /></div>
              <b>France</b>
              <small>Cosmetic Mastery</small>
            </div>
          </div>
          <p className="body-txt" style={{ maxWidth: 460, margin: "0 auto" }}>
            Every SAVÉMOI formula begins with a Mediterranean botanical and ends with French dermocosmetic precision — never one without the other.
          </p>
        </div>
      </section>

      <section className="section bg-cream2">
        <div className="wrap-xs">
          <span className="label">Our Journey</span>
          <h2 className="h2" style={{ marginBottom: "2.2rem" }}>From conviction<br />to <em>launch</em></h2>
          <div className="timeline">
            {TIMELINE.map((t) => (
              <div className={`tl-item ${t.peak ? "peak" : ""}`} key={t.yr}>
                <div className={`tl-dot ${t.future ? "future" : ""}`} />
                <span className="tl-yr">{t.yr}</span>
                <span className="tl-title">{t.title}</span>
                <p className="tl-txt">{t.txt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap-xs">
          <span className="label center">The People Behind It</span>
          <div className="info-card" style={{ flexDirection: "row", alignItems: "center", gap: "1.6rem", background: "var(--cream2)", flexWrap: "wrap" }}>
            <div className="icon-circle" style={{ width: 96, height: 96, borderStyle: "dashed", background: "var(--cream)" }}>
              <Icon name="person" size={38} />
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <span className="title" style={{ display: "block" }}>Dr. Ismail Hijazi &amp; Sahar Hijazi</span>
              <span className="tag" style={{ display: "block", margin: ".2rem 0 .5rem" }}>Founder &amp; Co-Founder</span>
              <p className="txt">
                A chemist trained in France and a partner in every step — the two people whose conviction turned a two-year obsession into SAVÉMOI.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <h2 className="h2">Two years in the making.<br /><em>Yours from today.</em></h2>
        <p>Discover the five product lines that two years of obsession were spent perfecting.</p>
        <Link className="btn btn-light" href="/collections/all">Shop the Collection ↗</Link>
      </section>
    </>
  );
}
