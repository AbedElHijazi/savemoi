import Icon from "@/components/ui/Icon";

export default function Marquee({ text = "Free Delivery On Orders Above $50", repeat = 8 }) {
  const items = Array.from({ length: repeat });
  return (
    <div className="marquee" aria-label={text}>
      <div className="marquee-track">
        {[...items, ...items].map((_, i) => (
          <span className="marquee-item" key={i} aria-hidden={i > 0}>
            <Icon name="truck" /> {text}
          </span>
        ))}
      </div>
    </div>
  );
}
