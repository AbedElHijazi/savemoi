/**
 * Seeds the first admin account and sample SAVÉMOI products.
 * Usage:  npm run seed            (requires .env.local)
 *         npm run seed -- --reset (wipes products first)
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Product from "../lib/models/Product.js";
import AdminUser from "../lib/models/AdminUser.js";

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!MONGODB_URI) {
  console.error("✖ MONGODB_URI missing. Create .env.local first.");
  process.exit(1);
}

// NOTE: prices / stock below are SAMPLE values — edit them from the admin panel.
const products = [
  {
    name: "Rosemary Conditioner",
    slug: "rosemary-conditioner",
    tagline: "Shine, detangle & curl control",
    tags: ["Rinse-out", "Curly hair"],
    categories: ["hair-care"],
    size: "250 ml",
    price: 18,
    stock: 40,
    isBestSeller: true,
    rating: 4,
    description:
      "A rinse-out conditioner built around Mediterranean rosemary to bring shine, effortless detangling and defined curls.",
    ingredients: "Natural butters & lipid care: shea, mango and plant-based butters. 0% Dyes · 0% Paraben.",
    howToUse: "After shampooing, apply to lengths and ends. Leave 2–3 minutes, then rinse thoroughly."
  },
  {
    name: "Mint Shampoo",
    slug: "mint-shampoo",
    tagline: "Refresh, repair & protect",
    tags: ["All hair types"],
    categories: ["hair-care"],
    size: "250 ml",
    price: 16,
    stock: 50,
    isBestSeller: true,
    rating: 5,
    description: "A refreshing shampoo with botanical complexes that cleanses gently while protecting hair and scalp.",
    ingredients: "Botanical complexes & herbal actives: chamomile, sage, calendula, geranium. 0% Silicone · 0% Paraben.",
    howToUse: "Massage into wet hair and scalp, lather, then rinse. Repeat if needed."
  },
  {
    name: "Rosemary Shampoo",
    slug: "rosemary-shampoo",
    tagline: "Nourish, shine & hydrate",
    tags: ["Dry hair", "Dull hair"],
    categories: ["hair-care"],
    size: "250 ml",
    price: 16,
    stock: 35,
    isBestSeller: true,
    rating: 4,
    description: "A nourishing rosemary shampoo rich in Mediterranean antioxidants for shine and lasting hydration.",
    ingredients: "Mediterranean botanical antioxidants: olive, laurel bay, lavender, rosemary. 0% Sulfate · 0% Silicone.",
    howToUse: "Apply to wet hair, massage the scalp gently, rinse well."
  },
  {
    name: "Hibiscus Conditioner",
    slug: "hibiscus-conditioner",
    tagline: "Leave-in · detangle & smooth",
    tags: ["Leave-in", "Fine hair"],
    categories: ["hair-care"],
    size: "200 ml",
    price: 19,
    stock: 25,
    isBestSeller: true,
    rating: 4,
    description: "A lightweight leave-in conditioner that detangles and smooths fine hair without weighing it down.",
    ingredients: "Dermocosmetic actives: hyaluronic acid, niacinamide, peptides, vitamins. Silk Protein Complex.",
    howToUse: "Spray or apply onto towel-dried hair. Do not rinse. Style as usual."
  },
  {
    name: "Rosemary Hair Oil",
    slug: "rosemary-hair-oil",
    tagline: "Strengthen, fortify & hydrate",
    tags: ["Thinning hair", "Scalp care"],
    categories: ["hair-care", "travel-size"],
    size: "50 ml",
    price: 22,
    stock: 3,
    isBestSeller: true,
    rating: 5,
    description: "A fortifying hair oil with cold-pressed botanical oils and rosemary to strengthen hair and care for the scalp.",
    ingredients: "Cold-pressed argan, jojoba, sweet almond, avocado. 0% Mineral Oil · 0% Silicone.",
    howToUse: "Massage a few drops into the scalp and lengths. Leave 30 minutes or overnight, then shampoo."
  },
  {
    name: "Rosemary Shampoo — 1L Refill",
    slug: "rosemary-shampoo-1l-refill",
    tagline: "Same formula, 30% less plastic",
    tags: ["Refill", "1L"],
    categories: ["refills", "hair-care"],
    size: "1 L",
    price: 48,
    stock: 15,
    rating: 5,
    description: "Top up your original bottle. Less plastic, lower cost, same formula."
  },
  {
    name: "Mint Shampoo — 5L Refill",
    slug: "mint-shampoo-5l-refill",
    tagline: "Bulk format, 75% less plastic",
    tags: ["Refill", "5L"],
    categories: ["refills"],
    size: "5 L",
    price: 180,
    stock: 0,
    rating: 5,
    description: "Our bulk refill format — the same formula with a fraction of the waste."
  }
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("✔ Connected to MongoDB");

  if (process.argv.includes("--reset")) {
    await Product.deleteMany({});
    console.log("✔ Products collection cleared");
  }

  for (const p of products) {
    await Product.updateOne({ slug: p.slug }, { $setOnInsert: p }, { upsert: true });
  }
  console.log(`✔ ${products.length} sample products ensured`);

  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await AdminUser.updateOne(
      { email: ADMIN_EMAIL.toLowerCase() },
      { $set: { passwordHash }, $setOnInsert: { name: "Administrator" } },
      { upsert: true }
    );
    console.log(`✔ Admin account ready: ${ADMIN_EMAIL}`);
  } else {
    console.warn("⚠ ADMIN_EMAIL / ADMIN_PASSWORD not set — admin not created");
  }

  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
