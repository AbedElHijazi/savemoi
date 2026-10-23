/** Elegant placeholder bottle used when a product has no uploaded image yet. */
export default function BottleArt({ variant = 0 }) {
  if (variant % 2 === 1) {
    return (
      <svg viewBox="0 0 100 160" aria-hidden="true">
        <rect x="40" y="4" width="20" height="10" rx="4" fill="rgba(85,98,70,0.5)" />
        <rect x="30" y="14" width="40" height="16" rx="8" fill="rgba(85,98,70,0.12)" />
        <rect x="26" y="30" width="48" height="112" rx="10" fill="rgba(85,98,70,0.12)" />
        <rect x="32" y="68" width="36" height="42" rx="2" fill="#556246" opacity="0.85" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 160" aria-hidden="true">
      <rect x="36" y="6" width="28" height="14" rx="3" fill="#556246" />
      <rect x="24" y="20" width="52" height="128" rx="10" fill="rgba(85,98,70,0.12)" />
      <rect x="30" y="62" width="40" height="46" rx="2" fill="#556246" opacity="0.85" />
    </svg>
  );
}
