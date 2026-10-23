import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata = { title: "Store Locator" };

export default function StoreLocatorPage() {
  return (
    <>
      <PageHero eyebrow="SAVÉMOI · Stockists" title={<>Find SAVÉMOI <em>near you</em></>} sub="Our stockist network is growing. Contact us to find the nearest point of sale." />
      <div className="wrap-xs section center">
        <p className="body-txt">Are you a pharmacy, boutique, spa or hotel interested in carrying SAVÉMOI?</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/pages/wholesale">Become a Stockist</Link>
          <Link className="btn btn-outline" href="/pages/contact">Contact Us</Link>
        </div>
      </div>
    </>
  );
}
