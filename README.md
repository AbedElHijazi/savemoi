# SAVÉMOI — Next.js Store + Admin

E-commerce website for SAVÉMOI built with **Next.js 15 (App Router)**, **MongoDB (Mongoose)** and **Cloudflare R2** for image storage, styled with the brand palette (`#556246` / `#FEFDF9` / `#F7F7F0`, Cormorant Garamond + Jost).

---

## 1. Features

### Storefront
| Area | Route |
|---|---|
| Home (hero, free-delivery marquee, best sellers, team / ingredients / reviews) | `/` |
| Collections (Body, Hair, Home, Skin Care, Refills, Travel Size) + sort + in-stock filter | `/collections/[category]`, `/collections/all` |
| Product page (gallery, stock status, qty, add to bag, details accordion, related) | `/products/[slug]` |
| Search | `/search?q=` |
| Bag drawer + bag page + checkout (Cash on Delivery) | `/cart`, `/checkout` |
| Order tracking (order # + email) | `/track-order` |
| Brand pages | `/pages/world-of-savemoi`, `/pages/loyalty`, `/pages/active-ingredients`, `/pages/sustainability`, `/pages/wholesale` |
| Policies | `/pages/terms-conditions`, `/pages/orders-refund-policy`, `/pages/shipping-policy`, `/pages/privacy-policy` |
| Journal (filterable) | `/blog`, `/blog/[slug]` |
| Contact / Store locator | `/pages/contact`, `/pages/store-locator` |
| Newsletter signup (saved to MongoDB) | footer + blog |

### Admin (`/admin`)
- Secure login (bcrypt + signed JWT HTTP-only cookie, middleware-protected routes & APIs)
- **Dashboard** — products, low stock, out of stock, open orders, revenue, subscribers
- **Products list**
  - Inline edit **price** and **quantity** (Enter = save, Esc = cancel)
  - **Out of stock** toggle (manual override even if qty > 0)
  - **Visible / hidden** toggle
  - Search, category & status filters
  - Bulk: mark out of stock / available, hide / publish, delete
  - Delete with confirmation (also deletes the images from R2)
- **Add / Edit product** — name, slug, SKU, tagline, size, description, ingredients, how to use, tags, categories, price, compare-at price, quantity, out-of-stock, best seller, visible, rating, sort order, **multi-image upload to Cloudflare R2** (drag & drop, reorder, set main, remove)
- **Orders** — status workflow, courier tracking number, details. Cancelling an order **returns stock automatically**.

Stock is decremented atomically when an order is placed (no overselling), and prices are always taken from the database — never from the browser.

---

## 2. Requirements
- Node.js **20.6+** (22 LTS recommended)
- MongoDB Atlas cluster (free tier is fine) or self-hosted MongoDB 6+
- Cloudflare account with R2 enabled

---

## 3. Setup

### 3.1 MongoDB
1. Create a cluster at https://cloud.mongodb.com → **Database Access**: create a user.
2. **Network Access**: allow your server IP (or `0.0.0.0/0` for testing).
3. Copy the connection string → `MONGODB_URI` (add `/savemoi` as database name).

### 3.2 Cloudflare R2
1. Cloudflare dashboard → **R2** → **Create bucket** → name `savemoi-media`.
2. Bucket → **Settings → Public access**: enable the **r2.dev subdomain** (or connect a custom domain such as `media.savemoi.com`). Copy the public URL → `R2_PUBLIC_URL`.
3. R2 → **Manage R2 API Tokens** → **Create API token** → permission **Object Read & Write**, scoped to the bucket. Copy **Access Key ID** and **Secret Access Key**.
4. Your **Account ID** is shown on the R2 overview page.

> Uploads go through the Next.js server (`/api/admin/upload`), so **no CORS configuration is needed** on the bucket.

### 3.3 Environment
```bash
cp .env.example .env.local
# fill in all values
```

### 3.4 Install, seed, run
```bash
npm install
npm run seed          # creates the admin account + 7 sample products
npm run dev           # http://localhost:3000   admin: http://localhost:3000/admin
```
`npm run seed -- --reset` wipes products before seeding. Re-running `npm run seed` also resets the admin password to `ADMIN_PASSWORD`.

> Sample prices and quantities are placeholders — edit them in the admin panel.

---

## 4. Production

### Vercel (simplest)
Import the repo, add the same environment variables, deploy. Image uploads are limited to 4 MB to fit Vercel's request size limit.

### Windows Server / IIS
```bash
npm ci
npm run build
npm run start         # listens on port 3000 (set PORT to change)
```
Run it as a service (e.g. **PM2** + `pm2-installer`, or **NSSM**), then in IIS create a site with **URL Rewrite + ARR** reverse-proxying to `http://localhost:3000`.

---

## 5. Project structure
```
app/
  (site)/              storefront pages (shared header/footer/cart)
  admin/login          admin sign-in
  admin/(panel)/       dashboard, products, product form, orders
  api/                 orders, tracking, newsletter
  api/admin/           login/logout, products CRUD, R2 upload, orders
components/
  site/  cart/  ui/  admin/
lib/
  db.js  r2.js  auth.js  products.js  productInput.js  constants.js  utils.js
  models/  Product, Order, Subscriber, AdminUser
scripts/seed.mjs
middleware.js          protects /admin and /api/admin
```

## 6. Configuration
- Categories, shipping fees, low-stock threshold, contact info: `lib/constants.js`
  (Free Lebanon delivery above $50 comes from the shipping policy; the flat Lebanon / international fees are defaults — set your real rates.)
- Hero image: `public/hero.jpg` (replace with your own photography).
- WhatsApp button number: `NEXT_PUBLIC_WHATSAPP`.

## 7. Content still to confirm
- Privacy Policy text (placeholder page).
- Terms: "Limitation of Liability" and jurisdiction flagged for legal review (kept from your source file).
- Social media and Google Review links in the footer (`components/site/Footer.jsx`).
- Loyalty "Create account" buttons currently link to the Contact page (customer accounts are not part of this build).
