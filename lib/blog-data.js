export const BLOG_FILTERS = [
  { key: "all", label: "All" },
  { key: "skin", label: "Skin Care" },
  { key: "ingredients", label: "Ingredients" },
  { key: "hair", label: "Hair Care" },
  { key: "clean", label: "Clean Beauty" },
  { key: "routine", label: "Routine" }
];

export const POSTS = [
  {
    slug: "skin-barrier",
    featured: true,
    icon: "shield",
    imgLabel: "Skin Essentials",
    tag: "Skin Essentials · Most Read",
    categories: ["skin"],
    title: "The Skin Barrier: The Most Important Thing You're Probably Damaging",
    author: "Dr. Ismail Hijazi",
    minutes: 5,
    points: [
      "Your skin barrier is a lipid-and-cell wall that locks in moisture and blocks irritants — when it breaks down, nothing in your routine works properly.",
      "The most common culprits are harsh sulfates, over-exfoliation, alcohol-based toners, and synthetic fragrances — often found in expensive products.",
      "Repair it with ceramides, hyaluronic acid, and niacinamide — and apply moisturiser on damp skin to seal hydration in."
    ]
  },
  {
    slug: "ingredient-list",
    icon: "sprout",
    imgLabel: "Ingredients",
    tag: "Ingredients Guide",
    categories: ["ingredients"],
    title: "How to Read a Cosmetic Ingredient List",
    author: "SAVÉMOI Editorial",
    minutes: 4,
    related: { label: "See these standards applied →", href: "/pages/active-ingredients" },
    points: [
      "Ingredients are listed by concentration — the first 5–7 make up the bulk of the formula. Anything near the bottom is present at less than 1%.",
      "Red flags to avoid: SLS/SLES, Parfum/Fragrance, Parabens, Mineral Oil, and Alcohol Denat.",
      "Green flags to seek: Ceramides, Hyaluronic Acid, Niacinamide, and plant extracts listed high on the label."
    ]
  },
  {
    slug: "moisturiser-vs-hydrator",
    icon: "drop",
    imgLabel: "Hydration",
    tag: "Hydration",
    categories: ["skin"],
    title: "Moisturiser vs Hydrator: Do You Know the Difference?",
    author: "SAVÉMOI Editorial",
    minutes: 3,
    points: [
      "Hydrators (humectants like hyaluronic acid and glycerin) draw water into the skin. Moisturisers (occlusives like shea butter and ceramides) seal it in. They do different jobs.",
      "If your skin feels tight or dull, you're likely missing a hydrator — not just a richer cream.",
      "Layer them correctly: hydrator first on damp skin, then moisturiser on top to lock everything in."
    ]
  },
  {
    slug: "dry-hair-porosity",
    icon: "hair",
    imgLabel: "Hair Care",
    tag: "Hair Care",
    categories: ["hair"],
    title: "Why Your Hair Is Dry No Matter What You Use",
    author: "SAVÉMOI Editorial",
    minutes: 4,
    related: { label: "Shop Rosemary Hair Oil →", href: "/products/rosemary-hair-oil" },
    points: [
      "Persistent dryness is almost always a porosity issue — your hair either can't absorb moisture or can't hold onto it, regardless of what product you use.",
      "The main causes are sulfate shampoos, heat styling without protection, chemical treatments, and hard water buildup.",
      "Fix it in three steps: clarify weekly with ACV, deep condition with a protein mask, then seal the cuticle with argan oil or a cold water rinse."
    ]
  },
  {
    slug: "ingredients-to-avoid",
    icon: "bottle",
    imgLabel: "Clean Beauty",
    tag: "Clean Beauty",
    categories: ["clean", "ingredients"],
    title: "10 Ingredients to Avoid in Your Beauty Products",
    author: "Dr. Ismail Hijazi",
    minutes: 5,
    related: { label: "See our full ingredient list →", href: "/pages/active-ingredients" },
    points: [
      "The most harmful are sulfates (strip the barrier), parabens (mimic oestrogen), and synthetic fragrance (hides up to 3,000 undisclosed chemicals).",
      "Others to eliminate: mineral oil, phthalates, formaldehyde releasers, hydroquinone, triclosan, PFAs, and plastic microbeads.",
      "None of these appear in SAVÉMOI formulas — ever. Clean beauty is not a trend here; it's a founding commitment."
    ]
  },
  {
    slug: "am-pm-routine",
    icon: "sun",
    imgLabel: "Routine",
    tag: "Daily Ritual",
    categories: ["routine", "skin"],
    title: "The Perfect Beauty Routine: Morning vs Evening",
    author: "SAVÉMOI Editorial",
    minutes: 5,
    points: [
      "Morning is for protection: gentle cleanser → vitamin C serum → moisturiser → SPF. SPF is non-negotiable — UV is the number one cause of premature ageing.",
      "Evening is for repair: double cleanse → treatment serum (retinol, peptides, or niacinamide) → eye cream → rich night cream.",
      "Always layer thinnest to thickest. Apply body lotion within 3 minutes of showering on damp skin for maximum absorption."
    ]
  },
  {
    slug: "sensitive-vs-damaged",
    icon: "heart",
    imgLabel: "Sensitive",
    tag: "Sensitive Beauty",
    categories: ["skin"],
    title: "Do You Actually Have Sensitive Skin — or Damaged Skin?",
    author: "SAVÉMOI Editorial",
    minutes: 3,
    points: [
      "Most people who think they have sensitive skin actually have a damaged barrier — caused by harsh products or over-exfoliation, not genetics.",
      "The key sign: if your skin has become increasingly reactive over time, especially after new products, it's damaged — not naturally sensitive.",
      "Damaged skin needs a stripped-back routine (cleanser + ceramide moisturiser + SPF only) for 4–6 weeks. Truly sensitive skin needs fragrance-free, single-active formulas and a dermatologist."
    ]
  }
];

export const SUMMARY = [
  ["Protect your skin barrier first.", "It's the foundation of everything. Without it, no product — however premium — can do its job."],
  ["Read the ingredient list, not the marketing.", "The first five ingredients are what you're actually paying for."],
  ["Hydrate and moisturise separately.", "They're not the same thing. You likely need both."],
  ["Dry hair is a porosity problem.", "Clarify, deep condition, and seal — in that order, weekly."],
  ["Cut the harmful ten.", "Sulfates, parabens, synthetic fragrance, mineral oil — eliminate them from every product category."],
  ["Align your routine with your biology.", "Protect in the morning. Repair at night. Layer thinnest to thickest, always."],
  ["Sensitivity is often damage.", "If your skin has worsened over time, simplify first — then rebuild with barrier-supporting actives."]
];
