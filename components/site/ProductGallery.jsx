"use client";

import { useState } from "react";
import BottleArt from "@/components/ui/BottleArt";

export default function ProductGallery({ images = [], name, outOfStock }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="gallery-main">
        {outOfStock && <span className="badge dark">Out of Stock</span>}
        {current ? <img src={current.url} alt={current.alt || name} /> : <BottleArt />}
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((img, i) => (
            <button
              key={img.url}
              className={i === active ? "active" : ""}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={img.url} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
