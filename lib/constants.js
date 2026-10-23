/** Store categories — used by the header nav, collection pages and the admin form. */
export const CATEGORIES = [
  { slug: "body-care", name: "Body Care" },
  { slug: "hair-care", name: "Hair Care" },
  { slug: "home-care", name: "Home Care" },
  { slug: "skin-care", name: "Skin Care" },
  { slug: "refills", name: "Refills" },
  { slug: "travel-size", name: "Travel Size" }
];

export const categoryName = (slug) =>
  CATEGORIES.find((c) => c.slug === slug)?.name ?? "All Products";

/**
 * Shipping rules. Free Lebanon delivery above $50 comes from the shipping policy.
 * The flat fees below are DEFAULTS — adjust them to your real courier rates.
 */
export const SHIPPING = {
  freeThresholdLebanon: 50,
  lebanonFee: 4,
  internationalFee: 15
};

export const LOW_STOCK_THRESHOLD = 5;

export const SITE = {
  name: "SAVÉMOI",
  tagline: "French innovation, Mediterranean nature.",
  email: "info@savemoi.com",
  phone: "+961 76 708 604",
  address: "Beirut, Lebanon",
  googleRating: 5,
  googleReviewsCount: 14
};

export const ORDER_STATUSES = ["pending", "confirmed", "preparing", "shipped", "delivered", "cancelled"];
