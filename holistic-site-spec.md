# Holistic Consulting Website -- Project Spec

**Author:** JohnnyLeeXYZ
**Status:** Scoping
**Stack:** React + Vite, Vercel, Turso (SQLite), Cloudinary, Stripe
**Brand:** TBD (templated for now)

---

## 1. Overview

A holistic health and wellness consulting website with three core offerings: consulting services, retreats, and wellness products. Includes a full admin portal for the business owner to manage all content without touching code. Stripe handles payments for both products and service bookings.

---

## 2. Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Frontend | React + Vite | SPA with client-side routing (React Router) |
| Styling | Tailwind CSS | Utility-first, custom theme tokens for brand |
| Hosting | Vercel | Serverless functions for API routes |
| Database | Turso | SQLite edge database, free tier: 9GB / 500 DBs / no pause |
| ORM | Drizzle ORM | Type-safe, SQLite-compatible, lightweight |
| Image Storage | Cloudinary | 25GB free, auto-optimization, transformations |
| Payments | Stripe Checkout | Hosted checkout sessions via API |
| Auth (Admin) | httpOnly cookie | Secure session cookie, single admin user |
| Email | Resend | Contact form delivery, free tier: 3,000/mo |

---

## 3. Design System

### Aesthetic Direction

Earthy organic warmth meets clean luxury minimalism. Think wellness retreat brochure designed by a high-end editorial studio.

### Typography

- **Display/Headings:** Cormorant Garamond (serif, elegant, warm) or similar distinctive serif
- **Body:** DM Sans or Outfit (clean, modern, highly readable)
- **Accent:** A handwritten or organic script for callouts and section labels

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-earth` | `#5C4033` | Primary brown, grounding tone |
| `--color-sage` | `#8A9A5B` | Primary green, life/growth |
| `--color-sand` | `#E8DCC8` | Warm neutral background |
| `--color-cream` | `#FAF6F0` | Light background |
| `--color-clay` | `#C4956A` | Warm accent |
| `--color-charcoal` | `#2C2C2C` | Text color |
| `--color-white` | `#FFFFFF` | Cards, overlays |
| `--color-gold` | `#B8860B` | CTA accent, premium feel |

### Visual Language

- Generous whitespace, asymmetric layouts where appropriate
- Soft rounded corners on cards and buttons
- Subtle grain/noise texture overlays on hero sections
- Organic shapes as dividers (waves, curves) instead of hard lines
- Muted, warm photography style (the owner uploads images, but the layout should complement earthy tones)
- Scroll-triggered fade-in animations on sections
- Hover states on cards: gentle lift with shadow shift

### Mobile-First Responsive Design

All components are built mobile-first using Tailwind breakpoints (`sm`, `md`, `lg`, `xl`).

- **Navigation:** Hamburger icon with slide-out drawer on mobile, horizontal nav on desktop
- **Product/Service grids:** 1 column on mobile, 2 on tablet (`md`), 3-4 on desktop (`lg`+)
- **Hero sections:** Stacked layout on mobile, side-by-side or overlapping on desktop
- **Cards:** Full-width on mobile with generous vertical spacing
- **Admin portal:** Sidebar collapses to top hamburger menu on mobile, all forms single-column and touch-friendly
- **Cart:** Stacked line items on mobile, table-style on desktop
- **Touch targets:** Minimum 44x44px on all interactive elements
- **Images:** Responsive srcset via Cloudinary transformations, smaller sizes served on mobile
- **Typography:** Fluid type scale, headings scale down proportionally on small screens

---

## 4. Site Architecture

### Public Pages

```
/                       Home (hero, featured services, testimonials, CTA)
/about                  About the practitioner / brand story
/services               All consulting services listing
/services/:slug         Individual service detail + booking CTA
/retreats               All retreats listing
/retreats/:slug         Individual retreat detail + booking/purchase
/shop                   All wellness products grid
/shop/:slug             Individual product detail + add to cart
/cart                   Shopping cart
/checkout/success       Post-purchase confirmation
/contact                Contact form
*                       404 Not Found (catch-all)
```

### Admin Pages

```
/admin                  Dashboard (overview stats)
/admin/login            Admin login
/admin/services         CRUD for consulting services
/admin/services/new     Create new service
/admin/services/:id     Edit existing service
/admin/retreats         CRUD for retreats
/admin/retreats/new     Create new retreat
/admin/retreats/:id     Edit existing retreat
/admin/products         CRUD for products
/admin/products/new     Create new product
/admin/products/:id     Edit existing product
/admin/orders           View orders list
/admin/orders/:id       Order detail
/admin/testimonials     CRUD for testimonials
/admin/testimonials/new Create new testimonial
/admin/testimonials/:id Edit existing testimonial
/admin/settings         Site settings (brand name, contact info, social links)
```

---

## 5. Database Schema (Turso / Drizzle)

### services

| Column | Type | Notes |
|---|---|---|
| id | TEXT (ULID) | Primary key |
| title | TEXT | Service name |
| slug | TEXT | URL-safe identifier, unique |
| description | TEXT | Short description for listing cards |
| body | TEXT | Full description (rich text stored as HTML or markdown) |
| image_url | TEXT | Cloudinary URL |
| price | INTEGER | Price in cents |
| price_label | TEXT | Optional display label ("Starting at $150/session") |
| duration | TEXT | e.g. "60 minutes", "90 minutes" |
| category | TEXT | e.g. "nutrition", "energy healing", "life coaching" |
| is_active | INTEGER | 1 = visible, 0 = hidden |
| sort_order | INTEGER | Manual sort position |
| stripe_price_id | TEXT | Stripe price ID for checkout |
| created_at | TEXT | ISO timestamp |
| updated_at | TEXT | ISO timestamp |

### retreats

| Column | Type | Notes |
|---|---|---|
| id | TEXT (ULID) | Primary key |
| title | TEXT | Retreat name |
| slug | TEXT | URL-safe identifier, unique |
| description | TEXT | Short description |
| body | TEXT | Full description |
| image_url | TEXT | Cloudinary URL |
| gallery | TEXT | JSON array of Cloudinary URLs |
| location | TEXT | e.g. "Sedona, AZ" |
| start_date | TEXT | ISO date |
| end_date | TEXT | ISO date |
| price | INTEGER | Price in cents |
| capacity | INTEGER | Max attendees |
| spots_remaining | INTEGER | Decremented via conditional UPDATE (WHERE spots_remaining > 0) |
| is_active | INTEGER | 1 = visible |
| sort_order | INTEGER | Manual sort position |
| stripe_price_id | TEXT | Stripe price ID |
| created_at | TEXT | ISO timestamp |
| updated_at | TEXT | ISO timestamp |

### products

| Column | Type | Notes |
|---|---|---|
| id | TEXT (ULID) | Primary key |
| title | TEXT | Product name |
| slug | TEXT | URL-safe identifier, unique |
| description | TEXT | Short description |
| body | TEXT | Full description |
| image_url | TEXT | Primary Cloudinary URL |
| gallery | TEXT | JSON array of additional image URLs |
| price | INTEGER | Price in cents |
| compare_at_price | INTEGER | Optional strikethrough price in cents |
| category | TEXT | e.g. "supplements", "teas", "skincare", "tools" |
| inventory_count | INTEGER | Stock tracking |
| is_active | INTEGER | 1 = visible |
| sort_order | INTEGER | Manual sort position |
| stripe_price_id | TEXT | Stripe price ID |
| created_at | TEXT | ISO timestamp |
| updated_at | TEXT | ISO timestamp |

### orders

| Column | Type | Notes |
|---|---|---|
| id | TEXT (ULID) | Primary key |
| stripe_session_id | TEXT | Stripe checkout session ID |
| stripe_payment_intent | TEXT | Payment intent ID |
| customer_email | TEXT | From Stripe session |
| customer_name | TEXT | From Stripe session |
| items | TEXT | JSON array of line items with type/id/title/qty/price |
| total | INTEGER | Total in cents |
| status | TEXT | "pending", "paid", "fulfilled", "cancelled" |
| shipping_address | TEXT | JSON object if applicable |
| notes | TEXT | Optional admin notes |
| created_at | TEXT | ISO timestamp |
| updated_at | TEXT | ISO timestamp |

### testimonials

| Column | Type | Notes |
|---|---|---|
| id | TEXT (ULID) | Primary key |
| name | TEXT | Client name |
| title | TEXT | Client title/role (optional) |
| body | TEXT | Testimonial text |
| image_url | TEXT | Client photo (Cloudinary URL, optional) |
| rating | INTEGER | 1-5 star rating (optional) |
| is_featured | INTEGER | 1 = show on home page |
| is_active | INTEGER | 1 = visible |
| sort_order | INTEGER | Manual sort position |
| created_at | TEXT | ISO timestamp |
| updated_at | TEXT | ISO timestamp |

### site_settings

| Column | Type | Notes |
|---|---|---|
| key | TEXT | Primary key (e.g. "brand_name", "tagline", "email") |
| value | TEXT | Setting value |
| updated_at | TEXT | ISO timestamp |

### admin_users

| Column | Type | Notes |
|---|---|---|
| id | TEXT (ULID) | Primary key |
| email | TEXT | Unique |
| password_hash | TEXT | bcrypt hashed |
| created_at | TEXT | ISO timestamp |

---

## 6. API Routes (Vercel Serverless Functions)

All API routes live under `/api/`. Admin routes require valid httpOnly session cookie.

### Public

```
GET    /api/services                 List active services
GET    /api/services/:slug           Single service
GET    /api/retreats                 List active retreats
GET    /api/retreats/:slug           Single retreat
GET    /api/products                 List active products (supports ?category= filter)
GET    /api/products/:slug           Single product
POST   /api/checkout                 Create Stripe checkout session
POST   /api/webhooks/stripe          Stripe webhook (order creation, inventory update)
POST   /api/contact                  Contact form submission (sends email via Resend)
GET    /api/settings                 Public site settings
GET    /api/testimonials             List active testimonials (supports ?featured=1 filter)
```

### Admin (Protected)

```
POST   /api/admin/login              Authenticate, set httpOnly session cookie
POST   /api/admin/logout             Clear session cookie
GET    /api/admin/dashboard          Stats (order count, revenue, product count)

GET    /api/admin/services           List all services (including inactive)
POST   /api/admin/services           Create service
PUT    /api/admin/services/:id       Update service
DELETE /api/admin/services/:id       Delete service

GET    /api/admin/retreats           List all retreats
POST   /api/admin/retreats           Create retreat
PUT    /api/admin/retreats/:id       Update retreat
DELETE /api/admin/retreats/:id       Delete retreat

GET    /api/admin/products           List all products
POST   /api/admin/products           Create product
PUT    /api/admin/products/:id       Update product
DELETE /api/admin/products/:id       Delete product

GET    /api/admin/orders             List orders (supports ?status= filter)
GET    /api/admin/orders/:id         Single order detail
PUT    /api/admin/orders/:id         Update order status/notes

GET    /api/admin/testimonials       List all testimonials
POST   /api/admin/testimonials       Create testimonial
PUT    /api/admin/testimonials/:id   Update testimonial
DELETE /api/admin/testimonials/:id   Delete testimonial

PUT    /api/admin/settings           Update site settings

POST   /api/admin/upload             Upload image to Cloudinary, return URL
```

---

## 7. Stripe Integration

### Checkout Flow

1. User adds items to cart (stored in React state + localStorage)
2. User clicks "Checkout" which hits `POST /api/checkout`
3. Server creates a Stripe Checkout Session with line items
4. User redirects to Stripe hosted checkout page
5. On success, Stripe redirects to `/checkout/success?session_id=...`
6. Stripe webhook fires `checkout.session.completed`
7. Server creates order record in Turso, decrements inventory/spots using conditional UPDATE (e.g. `UPDATE retreats SET spots_remaining = spots_remaining - 1 WHERE id = ? AND spots_remaining > 0`, check rows affected to detect sold-out race conditions)

### Stripe Product Sync

When admin creates a product/service/retreat:
- Server creates a corresponding Stripe Product and Price
- Stores the `stripe_price_id` in the database

When admin updates:
- Non-price edits (title, description, images, etc.) do not touch Stripe
- If the price amount changes, server creates a new Stripe Price, archives the old one, and stores the new `stripe_price_id`
- At checkout session creation, always pull the current `stripe_price_id` from the database server-side (never trust client-sent price IDs)
- In-flight Stripe sessions referencing an old price ID complete normally on Stripe's end

### Environment Variables

```
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 8. Cloudinary Integration

### Upload Flow

1. Admin selects image in the admin form
2. Frontend sends file to `POST /api/admin/upload`
3. Server uploads to Cloudinary using the Node SDK
4. Server returns the Cloudinary URL (secure_url)
5. Admin form stores the URL in the relevant image field

### Transformations

Use Cloudinary URL-based transformations for automatic optimization:

- Listing thumbnails: `w_400,h_300,c_fill,f_auto,q_auto`
- Detail hero images: `w_1200,h_800,c_fill,f_auto,q_auto`
- Gallery thumbnails: `w_200,h_200,c_fill,f_auto,q_auto`

### Environment Variables

```
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## 9. Admin Portal

### Authentication

- Single admin user seeded in the database on first deploy
- Login with email/password, server sets an httpOnly secure cookie (24h expiry)
- Browser automatically sends cookie on all admin API requests
- Cookie is invisible to JavaScript (immune to XSS)
- Protected admin routes redirect to `/admin/login` if no valid session
- Logout endpoint clears the cookie

### Admin UI Structure

Each content type (services, retreats, products) gets:

1. **List view:** Table with title, status (active/inactive toggle), price, sort order, edit/delete actions
2. **Create/Edit form:**
   - Title, slug (auto-generated from title, editable)
   - Short description (textarea)
   - Body (rich text editor, recommend TipTap or similar)
   - Image upload with preview
   - Gallery upload (retreats, products)
   - Price input (displays as dollars, stores as cents)
   - Category select/input
   - Type-specific fields (duration for services, dates/location/capacity for retreats, inventory for products)
   - Active/inactive toggle
   - Sort order number input
   - Save and Cancel buttons

### Testimonials Admin

1. **List view:** Table with client name, excerpt, featured toggle, active toggle, sort order, edit/delete actions
2. **Create/Edit form:**
   - Client name
   - Client title/role (optional)
   - Testimonial body (textarea)
   - Client photo upload (optional)
   - Star rating (1-5, optional)
   - Featured toggle (shows on home page)
   - Active/inactive toggle
   - Sort order number input
   - Save and Cancel buttons

### Dashboard

- Total orders (this month / all time)
- Revenue (this month / all time)
- Active products / services / retreats counts
- Recent orders list (last 10)

---

## 10. Public Page Details

### Home Page

- **Hero:** Full-width image/gradient with brand name, tagline, primary CTA
- **Featured Services:** 3 highlighted services in cards
- **Retreats Spotlight:** Next upcoming retreat with image, date, location, CTA
- **Product Highlights:** 3-4 featured products
- **Testimonials:** Rotating or static testimonial cards (pulls featured testimonials from database)
- **Footer:** Contact info, social links, quick navigation

### Services Page

- Category filter tabs/pills
- Card grid: image, title, short description, price indicator, "Learn More" link
- Individual service page: hero image, full description, pricing, duration, "Book Now" CTA (goes to Stripe checkout)

### Retreats Page

- Card layout (larger cards with more visual emphasis)
- Each card: image, title, location, dates, price, spots remaining badge
- Individual retreat page: hero image, gallery, full description, location details, dates, pricing, capacity indicator, "Reserve Your Spot" CTA

### Shop Page

- Category filter
- Product grid: image, title, short description, price (with compare-at-price strikethrough if set)
- "Add to Cart" button on cards
- Individual product page: image gallery, full description, price, inventory status, "Add to Cart" button

### Cart Page

- Line items with image thumbnail, title, quantity adjuster, price, remove button
- Cart total
- "Continue Shopping" and "Proceed to Checkout" buttons
- Empty cart state with CTA back to shop

### Contact Page

- Contact form: name, email, subject dropdown (general, services inquiry, retreat inquiry), message
- Contact information display
- Optional embedded map

---

## 11. Environment Variables Summary

```env
# Turso
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Auth
SESSION_SECRET=...
ADMIN_EMAIL=...
ADMIN_PASSWORD=...  (only used for initial seed, then deleted)

# Resend
RESEND_API_KEY=re_...
CONTACT_EMAIL=...  (where contact form submissions are sent)
```

---

## 12. Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css                    (Tailwind base + custom theme)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MobileNav.jsx
│   │   │   └── Layout.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── SectionDivider.jsx   (organic wave/curve SVG)
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── FeaturedServices.jsx
│   │   │   ├── RetreatSpotlight.jsx
│   │   │   ├── ProductHighlights.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── TestimonialCard.jsx
│   │   ├── services/
│   │   │   ├── ServiceCard.jsx
│   │   │   └── ServiceDetail.jsx
│   │   ├── retreats/
│   │   │   ├── RetreatCard.jsx
│   │   │   └── RetreatDetail.jsx
│   │   ├── shop/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── ProductGallery.jsx
│   │   │   └── CartItem.jsx
│   │   └── admin/
│   │       ├── AdminLayout.jsx
│   │       ├── AdminSidebar.jsx
│   │       ├── DashboardStats.jsx
│   │       ├── DataTable.jsx
│   │       ├── ContentForm.jsx      (reusable form for services/retreats/products)
│   │       ├── RichTextEditor.jsx
│   │       ├── ImageUploader.jsx
│   │       └── OrderDetail.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── ServicePage.jsx
│   │   ├── Retreats.jsx
│   │   ├── RetreatPage.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductPage.jsx
│   │   ├── Cart.jsx
│   │   ├── CheckoutSuccess.jsx
│   │   ├── Contact.jsx
│   │   ├── NotFound.jsx
│   │   └── admin/
│   │       ├── Login.jsx
│   │       ├── Dashboard.jsx
│   │       ├── ServicesList.jsx
│   │       ├── ServiceForm.jsx
│   │       ├── RetreatsList.jsx
│   │       ├── RetreatForm.jsx
│   │       ├── ProductsList.jsx
│   │       ├── ProductForm.jsx
│   │       ├── OrdersList.jsx
│   │       ├── OrderPage.jsx
│   │       ├── TestimonialsList.jsx
│   │       ├── TestimonialForm.jsx
│   │       └── Settings.jsx
│   ├── hooks/
│   │   ├── useCart.js               (cart state + localStorage persistence)
│   │   ├── useAuth.js               (admin session management via httpOnly cookie)
│   │   └── useApi.js                (fetch wrapper with credentials: 'include' for cookie auth)
│   ├── lib/
│   │   ├── api.js                   (API client functions)
│   │   ├── stripe.js                (Stripe publishable key init)
│   │   ├── formatters.js            (cents to dollars, date formatting, etc.)
│   │   └── constants.js
│   └── context/
│       ├── CartContext.jsx
│       └── AuthContext.jsx
├── api/
│   ├── services/
│   │   ├── index.js                 (GET list)
│   │   └── [slug].js                (GET single)
│   ├── retreats/
│   │   ├── index.js
│   │   └── [slug].js
│   ├── products/
│   │   ├── index.js
│   │   └── [slug].js
│   ├── checkout.js                  (POST create Stripe session)
│   ├── webhooks/
│   │   └── stripe.js                (POST Stripe webhook handler)
│   ├── contact.js                   (POST contact form)
│   ├── settings.js                  (GET public settings)
│   ├── testimonials/
│   │   └── index.js                 (GET active testimonials)
│   └── admin/
│       ├── login.js
│       ├── logout.js
│       ├── dashboard.js
│       ├── services/
│       │   ├── index.js             (GET all, POST create)
│       │   └── [id].js              (PUT update, DELETE)
│       ├── retreats/
│       │   ├── index.js
│       │   └── [id].js
│       ├── products/
│       │   ├── index.js
│       │   └── [id].js
│       ├── orders/
│       │   ├── index.js
│       │   └── [id].js
│       ├── testimonials/
│       │   ├── index.js             (GET all, POST create)
│       │   └── [id].js              (PUT update, DELETE)
│       ├── settings.js              (PUT update)
│       └── upload.js                (POST image to Cloudinary)
├── db/
│   ├── schema.js                    (Drizzle schema definitions)
│   ├── client.js                    (Turso + Drizzle client init)
│   ├── seed.js                      (Initial admin user + settings seed)
│   └── migrate.js                   (Run migrations)
├── tailwind.config.js
├── vite.config.js
├── vercel.json
├── package.json
├── .env.local                       (local env vars, gitignored)
└── .env.example                     (template with all required vars)
```

---

## 13. Key Dependencies

```json
{
  "dependencies": {
    "react": "^19",
    "react-dom": "^19",
    "react-router-dom": "^6",
    "@libsql/client": "latest",
    "drizzle-orm": "latest",
    "stripe": "latest",
    "@cloudinary/url-gen": "latest",
    "tiptap": "latest (or @tiptap/react + extensions)",
    "jsonwebtoken": "latest",
    "bcryptjs": "latest",
    "ulid": "latest",
    "resend": "latest"
  },
  "devDependencies": {
    "vite": "^5",
    "@vitejs/plugin-react": "latest",
    "tailwindcss": "^3",
    "autoprefixer": "latest",
    "postcss": "latest",
    "drizzle-kit": "latest"
  }
}
```

---

## 14. Deployment Notes

### Vercel Configuration

- Framework preset: Vite
- Build command: `vite build`
- Output directory: `dist`
- Serverless functions directory: `api/`
- Environment variables: set all from Section 11 in Vercel dashboard

### Turso Setup

1. Install Turso CLI: `curl -sSfL https://get.tur.so/install.sh | bash`
2. Login: `turso auth login`
3. Create database: `turso db create holistic-site`
4. Get URL: `turso db show holistic-site --url`
5. Create token: `turso db tokens create holistic-site`
6. Run migrations: `node db/migrate.js`
7. Seed admin user: `node db/seed.js`

### Stripe Setup

1. Create Stripe account
2. Get API keys from Stripe Dashboard
3. Set up webhook endpoint pointing to `https://yourdomain.com/api/webhooks/stripe`
4. Subscribe to `checkout.session.completed` event
5. Get webhook signing secret

### Cloudinary Setup

1. Create Cloudinary account
2. Get cloud name, API key, and API secret from dashboard
3. Create an upload preset (optional, for unsigned uploads)

---

## 15. Build Order for Claude Code

Recommended sequence for implementation:

**Phase 1: Foundation**
1. Scaffold React + Vite project with Tailwind
2. Configure custom theme (colors, fonts, spacing)
3. Build Layout shell (Header, Footer, MobileNav)
4. Set up React Router with all public routes + 404 catch-all
5. Build reusable UI components (Button, Card, Badge, Input, etc.)

**Phase 2: Public Pages (Static/Mock Data)**
6. Home page with all sections
7. Services listing + detail page
8. Retreats listing + detail page
9. Shop listing + detail page
10. Cart page
11. Contact page
12. About page

**Phase 3: Database + API**
13. Turso database setup + Drizzle schema
14. Migration and seed scripts
15. Public API routes (services, retreats, products, testimonials, settings)
16. Connect frontend to live API data

**Phase 4: Admin Portal**
17. Auth context + login flow (httpOnly cookie)
18. Admin layout + sidebar
19. Dashboard with stats
20. Services CRUD (list + form)
21. Retreats CRUD (list + form)
22. Products CRUD (list + form)
23. Testimonials CRUD (list + form)
24. Orders list + detail view
25. Settings page

**Phase 5: Integrations**
26. Cloudinary image upload in admin forms
27. Stripe product/price creation on admin save
28. Stripe checkout session creation
29. Stripe webhook handler (order creation, inventory updates)
30. Checkout success page with order confirmation

**Phase 6: Polish**
31. Scroll animations (fade-in on sections)
32. Loading states and skeleton screens
33. Error handling and toast notifications
34. Cross-device QA pass (mobile, tablet, desktop)
35. Deploy to Vercel

**Note:** Mobile-first responsive design is not a polish step. It is built into every component from Phase 1 onward. SEO meta tags are omitted since the site does not target organic search traffic.
