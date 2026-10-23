export default function PageHero({ eyebrow, title, sub, date, children, align = "center" }) {
  return (
    <section className={`page-hero ${align === "left" ? "left" : ""}`}>
      <div className={align === "left" ? "inner" : undefined}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {sub && <p className="sub">{sub}</p>}
        {date && <p className="date">{date}</p>}
        {children}
      </div>
    </section>
  );
}
