/**
 * SAVÉMOI — MongoDB initialisation
 * Location in project:  scripts/init-db.mjs
 *
 * Creates all collections with JSON-schema validation + indexes.
 * Safe to run multiple times (existing collections are updated, data is kept).
 *
 * Usage:  npm run db:init      (reads MONGODB_URI from .env.local)
 * Then:   npm run seed         (admin account + sample products)
 */
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  console.error("✖ MONGODB_URI missing. Create .env.local first.");
  process.exit(1);
}

const NUM = { bsonType: "number" };
const STR = { bsonType: "string" };
const BOOL = { bsonType: "bool" };
const DATE = { bsonType: "date" };

const ORDER_STATUSES = ["pending", "confirmed", "preparing", "shipped", "delivered", "cancelled"];

const COLLECTIONS = {
  /* ───────────── PRODUCTS ───────────── */
  products: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "slug", "price"],
        properties: {
          name: { ...STR, minLength: 1 },
          slug: { ...STR, minLength: 1 },
          sku: STR,
          tagline: STR,
          description: STR,
          ingredients: STR,
          howToUse: STR,
          size: STR,
          categories: { bsonType: "array", items: STR },
          tags: { bsonType: "array", items: STR },
          price: { ...NUM, minimum: 0 },
          compareAtPrice: { bsonType: ["number", "null"] },
          stock: { ...NUM, minimum: 0 },
          outOfStock: BOOL,
          isBestSeller: BOOL,
          isActive: BOOL,
          rating: { ...NUM, minimum: 0, maximum: 5 },
          sortOrder: NUM,
          images: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["url"],
              properties: { url: STR, key: STR, alt: STR }
            }
          },
          createdAt: DATE,
          updatedAt: DATE
        }
      }
    },
    indexes: [
      { key: { slug: 1 }, name: "slug_1", unique: true },
      { key: { categories: 1 }, name: "categories_1" },
      { key: { isBestSeller: 1 }, name: "isBestSeller_1" },
      { key: { isActive: 1 }, name: "isActive_1" },
      { key: { stock: 1, outOfStock: 1 }, name: "stock_1_outOfStock_1" },
      {
        key: { name: "text", tagline: "text", description: "text", tags: "text" },
        name: "name_text_tagline_text_description_text_tags_text"
      }
    ]
  },

  /* ───────────── ORDERS ───────────── */
  orders: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["orderNumber", "customer", "items", "status"],
        properties: {
          orderNumber: STR,
          items: {
            bsonType: "array",
            minItems: 1,
            items: {
              bsonType: "object",
              required: ["product", "name", "price", "qty"],
              properties: {
                product: { bsonType: "objectId" },
                name: STR,
                slug: STR,
                image: STR,
                price: { ...NUM, minimum: 0 },
                qty: { ...NUM, minimum: 1 }
              }
            }
          },
          customer: {
            bsonType: "object",
            required: ["name", "email", "phone", "address", "city", "country"],
            properties: {
              name: STR,
              email: STR,
              phone: STR,
              address: STR,
              city: STR,
              country: STR
            }
          },
          notes: STR,
          paymentMethod: STR,
          subtotal: NUM,
          shipping: NUM,
          total: NUM,
          status: { enum: ORDER_STATUSES },
          trackingNumber: STR,
          createdAt: DATE,
          updatedAt: DATE
        }
      }
    },
    indexes: [
      { key: { orderNumber: 1 }, name: "orderNumber_1", unique: true },
      { key: { status: 1 }, name: "status_1" },
      { key: { createdAt: -1 }, name: "createdAt_-1" },
      { key: { "customer.email": 1 }, name: "customer.email_1" }
    ]
  },

  /* ───────────── NEWSLETTER SUBSCRIBERS ───────────── */
  subscribers: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["email"],
        properties: { email: STR, createdAt: DATE, updatedAt: DATE }
      }
    },
    indexes: [{ key: { email: 1 }, name: "email_1", unique: true }]
  },

  /* ───────────── ADMIN USERS ───────────── */
  adminusers: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["email", "passwordHash"],
        properties: {
          name: STR,
          email: STR,
          passwordHash: STR,
          lastLoginAt: DATE,
          createdAt: DATE,
          updatedAt: DATE
        }
      }
    },
    indexes: [{ key: { email: 1 }, name: "email_1", unique: true }]
  }
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  console.log(`✔ Connected to database "${db.databaseName}"`);

  const existing = new Set(
    (await db.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name)
  );

  for (const [name, def] of Object.entries(COLLECTIONS)) {
    const options = {
      validator: def.validator,
      validationLevel: "moderate",
      validationAction: "error"
    };

    if (existing.has(name)) {
      await db.command({ collMod: name, ...options });
      console.log(`↻ ${name}: validation updated`);
    } else {
      await db.createCollection(name, options);
      console.log(`✔ ${name}: created`);
    }

    for (const idx of def.indexes) {
      const { key, ...opts } = idx;
      try {
        await db.collection(name).createIndex(key, opts);
      } catch (err) {
        console.warn(`  ⚠ ${name}.${idx.name}: ${err.message}`);
      }
    }
    console.log(`  ✔ ${def.indexes.length} index(es) ensured`);
  }

  await mongoose.disconnect();
  console.log("Done. Next step: npm run seed");
}

run().catch((err) => {
  console.error("✖ Init failed:", err.message);
  process.exit(1);
});
