import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div className="empty-state">
        <span className="label">404</span>
        <h3 style={{ fontSize: 40 }}>This page took a different path</h3>
        <p>The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="btn btn-primary mt-2">Back to SAVÉMOI</Link>
      </div>
    </div>
  );
}
