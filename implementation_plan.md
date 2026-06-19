# Implementation Plan - ARKA CRETE SUPPLEMENTS LLP Corporate Website

This plan details the implementation of a production-ready website for **ARKA CRETE SUPPLEMENTS LLP** using Next.js 16, TypeScript, Tailwind CSS v4, Zustand, TanStack React Query, Turso, and Drizzle ORM.

## User Review Required

> [!IMPORTANT]
> - **Database Setup**: We will configure Drizzle ORM to use a local LibSQL (SQLite) database file `local.db` for local development. This database file is fully compatible with Turso for production.
> - **Authentication**: We will use JWTs stored in secure, HttpOnly cookies for admin authentication. Password hashing will be managed via `bcryptjs`.
> - **File Uploads**: Admin image and document uploads will be stored inside the `public/uploads/` directory for simplicity in local development, keeping file metadata in the `media_assets` table.

## Open Questions
- **Local vs Cloud Database**: Should we proceed with the local SQLite (`local.db`) setup for development, or do you have a Turso Connection URL and Auth Token you would like to plug in immediately?
- **Brochure Downloads**: Do you have PDF files ready, or should we set up placeholders in the `public/` directory for the product data sheets and brochure?

---

## Proposed Changes

### Component 1: Dependencies & Configurations

#### [MODIFY] [package.json](file:///c:/Users/saisr/Desktop/ARKA/package.json)
Install required production packages and devDependencies:
- **Dependencies**: `drizzle-orm`, `@libsql/client`, `zod`, `zustand`, `@tanstack/react-query`, `lucide-react`, `bcryptjs`, `jose`
- **DevDependencies**: `drizzle-kit`, `@types/bcryptjs`

#### [NEW] [drizzle.config.ts](file:///c:/Users/saisr/Desktop/ARKA/drizzle.config.ts)
Configure Drizzle-kit to manage migrations pointing to `local.db` and `./lib/db/schema.ts`.

#### [NEW] [.env.local](file:///c:/Users/saisr/Desktop/ARKA/.env.local)
Create local environment variables for the database file path and JWT secret key:
```env
DATABASE_URL="file:local.db"
JWT_SECRET="arka-crete-super-secret-key-2026"
```

---

### Component 2: Database Architecture

#### [NEW] [schema.ts](file:///c:/Users/saisr/Desktop/ARKA/lib/db/schema.ts)
Define the 13 tables requested:
- `users`: ID, name, email, password_hash, role_id, is_active, timestamps
- `roles`: ID, name, description
- `permissions`: ID, key, description
- `role_permissions`: role_id, permission_id
- `categories`: ID, name, slug, description, sort_order, is_active
- `products`: ID, category_id, name, slug, short_description, long_description, packaging, coverage, application_type, product_type, features_json (stringified json), benefits_json, specs_json, is_featured, is_active, seo_title, seo_description, timestamps
- `product_images`: ID, product_id, image_url, alt_text, sort_order
- `product_documents`: ID, product_id, title, file_url, file_type, sort_order
- `pages`: ID, slug, title, content, seo_title, seo_description, is_published, timestamps
- `inquiries`: ID, full_name, email, phone, company_name, city, state, product_id, message, status, created_at
- `media_assets`: ID, file_name, file_url, file_type, alt_text, uploaded_by, created_at
- `settings`: ID, key, value_json, updated_at
- `audit_logs`: ID, actor_user_id, action, entity_type, entity_id, before_json, after_json, ip_address, user_agent, created_at

#### [NEW] [client.ts](file:///c:/Users/saisr/Desktop/ARKA/lib/db/client.ts)
Initialize the LibSQL client with the local database file URL.

#### [NEW] [seed.ts](file:///c:/Users/saisr/Desktop/ARKA/lib/db/seed.ts)
Write a seed script to create initial roles, admin user, product categories, and the brochure-derived product catalog:
- Tile Grip Classic / Premium, Tile Fix 720 (Tile Adhesives)
- Block Fix (Block Joining)
- Tile Grout 721, EP Epoxy Grout, Free Grout 50/70, Polygrout, Expacem 225 (Grouts & Anchoring)
- Microcrete, Rep 111 (Repair Products)
- Arkacoat FX, Arkaguard IWPL, Arkabond SBR (Waterproofing)

---

### Component 3: API & Authentication Routes

#### [NEW] [middleware.ts](file:///c:/Users/saisr/Desktop/ARKA/middleware.ts)
Create a middleware to intercept `/admin/*` routes (except `/admin/login`) and verify the JWT cookie.

#### [NEW] [/api/auth/login/route.ts](file:///c:/Users/saisr/Desktop/ARKA/app/api/auth/login/route.ts)
Verify credentials, sign JWT, and store in HttpOnly cookie.

#### [NEW] [/api/auth/logout/route.ts](file:///c:/Users/saisr/Desktop/ARKA/app/api/auth/logout/route.ts)
Clear JWT cookie.

#### [NEW] [/api/inquiries/route.ts](file:///c:/Users/saisr/Desktop/ARKA/app/api/inquiries/route.ts)
Create public inquiry API route supporting Zod validation.

---

### Component 4: Layout & UI Design System

We will configure the branding color palette in `app/globals.css` using Tailwind v4 theme variables:
- Primary Orange: `#F5820A`
- Secondary Brown: `#6B3200`
- Deep Accent: `#230022`

#### [NEW] [Header.tsx](file:///c:/Users/saisr/Desktop/ARKA/components/layout/Header.tsx)
Build a responsive, modern header with dropdowns for product categories and links to public routes.

#### [NEW] [Footer.tsx](file:///c:/Users/saisr/Desktop/ARKA/components/layout/Footer.tsx)
Create a footer featuring Arka Crete's Hyderabad Office and Factory addresses, contact email, and telephone details.

#### [NEW] [Button.tsx](file:///c:/Users/saisr/Desktop/ARKA/components/ui/Button.tsx)
Modular buttons matching the orange/brown corporate identity.

---

### Component 5: Page Content Modules

Each page will render a component imported from `components/` matching the convention:

#### [NEW] [Home Page](file:///c:/Users/saisr/Desktop/ARKA/components/Home/index.tsx)
Build a fully responsive home page with:
- Industrial Hero slider showing brand promises: "Your Strength, Our Priority" and "Innovation at Work. Excellence in Every Structure."
- Categories Grid (Tile Adhesives, Waterproofing, Repair, Grouts, Block Joining).
- Featured Products showcase.
- Industrial R&D and Quality story.

#### [NEW] [About Us](file:///c:/Users/saisr/Desktop/ARKA/components/About/index.tsx)
Explain the story of ARKA Crete, their quality focus, and vision.

#### [NEW] [Products Catalog](file:///c:/Users/saisr/Desktop/ARKA/components/Products/index.tsx)
Catalog listing with dynamic TanStack Query fetching, category filtering chips, and search functionality.

#### [NEW] [Product Details](file:///c:/Users/saisr/Desktop/ARKA/components/ProductDetail/index.tsx)
Display comprehensive parameters for each product: Features, Benefits, Recommended Applications, Coverage, Packaging, and Technical Specifications. Includes a target inquiry form.

#### [NEW] [Infrastructure](file:///c:/Users/saisr/Desktop/ARKA/components/Infrastructure/index.tsx)
Highlight the factory setup in MSME Green Industrial Park, testing lab, and QC machinery.

#### [NEW] [Downloads](file:///c:/Users/saisr/Desktop/ARKA/components/Downloads/index.tsx)
Links to technical sheets and product brochure downloads.

#### [NEW] [Contact Us](file:///c:/Users/saisr/Desktop/ARKA/components/Contact/index.tsx)
Display double addresses (Office & Factory) with interactive Google Maps embeds, contact info, and an inquiry form.

#### [NEW] [Admin Dashboard](file:///c:/Users/saisr/Desktop/ARKA/components/Admin/index.tsx)
Secure admin panel interface incorporating dashboard analytics, inquiries tracker, product editor, and audit logs viewer.

---

## Verification Plan

### Automated Tests
- Run `npm run build` to verify standard rendering compiles without issues.
- Run `npm run lint` to verify ESLint verification passes cleanly.
- Verify migrations generate and seed data successfully.

### Manual Verification
- Test admin login with seeded email and password.
- Test inquiry submission on product page and confirm it reflects in the admin inquires log.
