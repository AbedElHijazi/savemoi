export default function LeafRating({ value = 5 }) {
  const full = Math.round(Number(value) || 0);
  return (
    <div className="leaf-rating" aria-label={`Rated ${full} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" fill={i <= full ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2">
          <path d="M12 3C7 6 4 11 4 15c0 3 2 5 5 5 5 0 8-4 8-9 0-3-1-6-5-8z" />
        </svg>
      ))}
    </div>
  );
}
