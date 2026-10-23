import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Icon from "@/components/ui/Icon";

export const metadata = { title: "SAVÉMOI Loyalty" };

const STEPS = [
  { tag: "Join", title: "Create Your Account", txt: "Sign up for free in seconds. We'll welcome you instantly with 10 bonus points — no purchase needed.", chip: "+10 Welcome Points" },
  { tag: "Earn", title: "Shop & Collect", txt: "Earn 1 point for every $1 you spend. Every order, every product, every ritual — your points add up automatically.", chip: "1 pt = $1 spent" },
  { tag: "Engage", title: "Follow or Refer", txt: "Follow us on social media (Facebook, Instagram, TikTok), or refer a friend — and earn 10 points each time.", chip: "+10 pts each" },
  { tag: "Redeem", title: "Claim Your Rewards", txt: "Trade your points for free products, exclusive discounts, and cashback. The more you love SAVÉMOI, the more you get back.", chip: "Points Never Expire" }
];

const REWARDS = [
  { icon: "gift", pts: "100 Points", spent: "$100 spent", title: "Free Product", txt: "Redeem for a curated SAVÉMOI product — a beautiful gift to yourself, on us." },
  { icon: "home", pts: "200 Points", spent: "$200 spent", title: "10% Discount", txt: "Unlock a 10% discount on your entire next order — the reward that keeps on giving." },
  { icon: "dollar", pts: "350 Points", spent: "$350 spent", title: "Cashback to Wallet", txt: "Convert your points into store credit, ready to use on your next order — no strings attached." }
];

export default function LoyaltyPage() {
  return (
    <>
      <PageHero
        eyebrow="SAVÉMOI · Loyalty Program"
        title={<>Beauty that<br />rewards you <em>back.</em></>}
        sub="Every purchase earns you points. Every point brings you closer to exclusive rewards, discounts, and free products. Because loyalty deserves more than a thank you."
      >
        <div className="actions">
          <Link className="btn btn-light" href="/pages/contact?ref=loyalty">Start Earning Today ↗</Link>
          <p className="note">Free to join · No minimum spend · Rewards from day one</p>
        </div>
      </PageHero>

      <section className="section center">
        <div className="wrap-md">
          <span className="label">How It Works</span>
          <h2 className="h2">Four steps to<br /><em>beautiful rewards</em></h2>
          <div className="steps-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {STEPS.map((s, i) => (
              <div className="step" key={s.tag}>
                <div className="step-num">{i + 1}</div>
                <span className="tag">{s.tag}</span>
                <span className="title">{s.title}</span>
                <p className="txt">{s.txt}</p>
                <span className="chip">{s.chip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream2">
        <div className="wrap-md" style={{ maxWidth: 900 }}>
          <div className="section-head">
            <span className="label">Your Rewards</span>
            <h2 className="h2">What your points<br /><em>can unlock</em></h2>
          </div>
          <div className="grid-3">
            {REWARDS.map((r) => (
              <div className="reward-card" key={r.title}>
                <div className="top"><Icon name={r.icon} strokeWidth={1} /></div>
                <div className="body">
                  <span className="label" style={{ marginBottom: ".4rem", fontSize: 11 }}>
                    {r.pts} <span style={{ opacity: 0.7, fontWeight: 500 }}>· {r.spent}</span>
                  </span>
                  <span className="title" style={{ fontFamily: "var(--font-display)", fontSize: 19, display: "block", marginBottom: ".4rem" }}>{r.title}</span>
                  <p className="body-txt" style={{ lineHeight: 1.7 }}>{r.txt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section center">
        <div className="wrap-xs">
          <span className="label">More Ways to Earn</span>
          <h2 className="h2">Every little ritual<br /><em>adds up</em></h2>
          <div className="grid-3 hairline-grid mt-2" style={{ gap: 1 }}>
            {[["15", "Write a Product Review"], ["20", "Celebrate Your Birthday"], ["5", "Complete Your Profile"]].map(([n, t]) => (
              <div key={t} style={{ padding: "1.6rem 1.2rem" }}>
                <span className="stat-num" style={{ fontSize: 34 }}>{n} <small style={{ fontSize: 13, color: "var(--ink-soft)", letterSpacing: ".1em" }}>PTS</small></span>
                <span className="stat-label">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <span className="label">Your Rewards Are Waiting</span>
        <h2 className="h2">Join free.<br />Earn <em>immediately.</em></h2>
        <p>You&apos;re getting in early — join from day one and start earning immediately. Every order, review, and referral builds your rewards from the very first ritual.</p>
        <Link className="btn btn-outline-light" href="/pages/contact?ref=loyalty">Create My Account ↗</Link>
        <p className="fine">Free to join · Points never expire · Exclusive member rewards</p>
      </section>
    </>
  );
}
