import Link from "next/link";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <Link href="/pages/world-of-savemoi">The World of SAVÉMOI</Link>
        <div className="right">
          <Link href="/pages/store-locator">Store Locator</Link>
          <Link href="/pages/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
}
