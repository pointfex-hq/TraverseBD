# TraverseBD — Frontend Demo & UI Visualization

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-005f49?style=flat&logo=vercel)](https://traversebd.vercel.app)
[![Branch](https://img.shields.io/badge/Branch-docs%2Fsoha--documentation--qa-blue?style=flat&logo=github)](https://github.com/pointfex-hq/TraverseBD/tree/docs/soha-documentation-qa)
[![Team](https://img.shields.io/badge/Team-Lithium%20(Pointfex)-emerald?style=flat)](https://github.com/pointfex-hq/TraverseBD)

This repository contains the interactive frontend demo and UI visualization for **TraverseBD: Tourism and Travel Exploration Web Application**, developed based on the **TraverseBD Software Requirements Specification (SRS) v1.1** by Team Lithium for the Pointfex client engagement.

---

## 🚀 Live Demo URL
**Vercel Live URL:** [https://traversebd.vercel.app](https://traversebd.vercel.app)  
*(Also accessible on preview deployment URL generated via Vercel CLI below)*

---

## 🎯 Task Objectives & Requirements Traceability

This demo strictly implements the proposed UI, core features, and user workflows specified in the **TraverseBD SRS**:

| Requirement ID | Specification | Implementation in Demo |
|---|---|---|
| **FR-01** | Homepage with hero, destinations, trending packages, services, field snapshots, testimonials, blog | ✅ **Implemented** (`src/pages/public/HomePage.tsx`) |
| **FR-02** | Uniform header navigation, hotline, and footer on every public page | ✅ **Implemented** (`src/components/Navbar.tsx`, `Footer.tsx`) |
| **FR-03** | Destination listing as cards with regions and short descriptions | ✅ **Implemented** (`src/pages/public/DestinationsPage.tsx`) |
| **FR-04** | Destination details with highlights, travel tips, best season, and related packages (draft returns 404) | ✅ **Implemented** (`src/pages/public/DestinationDetailPage.tsx`) |
| **FR-05** | Real-time search across destinations and packages with fallback suggestions on empty search | ✅ **Implemented** (`src/pages/public/PackagesPage.tsx`, `DestinationsPage.tsx`) |
| **FR-06** | Package filtering (destination, category, duration, price slider) & sorting (price low-high, high-low, newest, trending) | ✅ **Implemented** (Interactive filter bar & sorter) |
| **FR-07** | Responsive gallery with category tabs and modal lightbox viewer with keyboard controls | ✅ **Implemented** (`src/pages/public/GalleryPage.tsx`, `ImageLightbox.tsx`) |
| **FR-08** | Travel blog list and full article pages with reading times, tags, and author cards | ✅ **Implemented** (`src/pages/public/BlogPage.tsx`, `BlogPostPage.tsx`) |
| **FR-09** | Testimonials preview on homepage and About page | ✅ **Implemented** (Solo, honeymoon, corporate retreat testimonials) |
| **FR-10** | About Us & Contact Us showing organization info, direct phone, email, and live FAQ accordion | ✅ **Implemented** (`src/pages/public/AboutPage.tsx`, `ContactPage.tsx`) |
| **FR-12** | Responsive design from 360px mobile to 1920px desktop with zero horizontal scroll | ✅ **Implemented** (Tested and mobile-ready) |
| **FR-13** | Package cards with cover, duration, price in BDT (৳), destination tag, trending/featured badges | ✅ **Implemented** (`src/components/PackageCard.tsx`) |
| **FR-14** | Travel categories (Hill Trek, Beach & Island, Riverine Houseboats, Wildlife Safari, Heritage, Corporate) | ✅ **Implemented** (`src/data/mockData.ts`) |
| **FR-15** | Comprehensive package detail: Day-by-day itinerary, inclusions, exclusions, activities, meals, lodging, transport, notes | ✅ **Implemented** (`src/pages/public/PackageDetailPage.tsx`) |
| **FR-16** | WhatsApp booking inquiry: One-click `wa.me` generation with prefilled package name and package URL | ✅ **Implemented** (`AppContext.tsx` -> `getWhatsAppLink`) |
| **FR-17** | Social share controls (Copy link, WhatsApp share, Facebook share) | ✅ **Implemented** (`src/components/ShareModal.tsx`) |
| **FR-18** | Protected Admin CMS requiring authentication | ✅ **Implemented** (`/admin/login` -> `/admin`) |
| **FR-19** | Two-Factor Authentication (TOTP 6-digit code support demo) | ✅ **Implemented** (Demo TOTP code: `123456`) |
| **FR-20** | Session logout control ending administrative session | ✅ **Implemented** (Session cleared upon logout) |
| **FR-21** | Admin dashboard with KPI totals (published vs draft) and direct module shortcuts | ✅ **Implemented** (`src/pages/admin/AdminDashboardPage.tsx`) |
| **FR-22** | Destination management (CRUD, publish/draft toggle, highlights editor, packages deletion guard) | ✅ **Implemented** (`src/pages/admin/AdminDestinationsPage.tsx`) |
| **FR-23** | Package management CRUD with price validation (rejects price <= 0 BDT) | ✅ **Implemented** (`src/pages/admin/AdminPackagesPage.tsx`) |
| **FR-24** | Dynamic package items builder (inclusions, exclusions, meals, stay, transport - e.g. "Sunrise boat ride") | ✅ **Implemented** (Live dynamic custom item adder & remover) |
| **FR-25** | Gallery management (upload URL, caption, category, destination link, publish toggle, delete) | ✅ **Implemented** (`src/pages/admin/AdminGalleryPage.tsx`) |
| **FR-26** | Blog post management (create, edit, publish/draft toggle, delete) | ✅ **Implemented** (`src/pages/admin/AdminBlogPage.tsx`) |
| **FR-28** | Site settings (instant WhatsApp number update, inquiry message template, hero copy, office contacts) | ✅ **Implemented** (`src/pages/admin/AdminSettingsPage.tsx`) |
| **FR-30** | Draft vs Published visibility control (draft items excluded from public pages) | ✅ **Implemented** (Filtered reactive selectors) |
| **FR-32** | Admin rate-limiting warning after repeated failed login attempts | ✅ **Implemented** (5-failure attempt alert) |
| **FR-33** | Administrative action audit log tracking actions, targets, timestamps | ✅ **Implemented** (`src/pages/admin/AdminAuditPage.tsx`) |

---

## 🔑 Administrative Demo Credentials

You can test the protected Admin CMS by navigating to `/admin` or `/admin/login`:

- **Super Administrator (with 2FA demo):**
  - **Email:** `admin@traversebd.com`
  - **Password:** `admin123`
  - **TOTP 2FA Code:** `123456`
- **Technical Documentation & QA Lead:**
  - **Email:** `soha@traversebd.com`
  - **Password:** `admin123`

*(A one-click demo login autofill helper is also provided on the login page for effortless evaluation).*

---

## 🛠️ Technology Stack

- **Framework:** React 18 with TypeScript
- **Bundler & Dev Server:** Vite 6
- **Routing:** React Router v6 (SPA with full client-side history & Vercel rewrites)
- **Styling:** Tailwind CSS (Custom Lush Horizon & Pointfex Design System)
- **Icons:** Lucide React & Google Material Symbols
- **Typography:** Plus Jakarta Sans & Inter
- **Data & State Management:** Reactive React Context with `localStorage` persistence and fallback initial seed dataset
- **Deployment Platform:** Vercel

---

## 💻 Running Locally

1. Clone or checkout the assigned branch:
   ```bash
   git checkout docs/soha-documentation-qa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx      # Sticky glassmorphism header & mobile drawer
│   │   ├── Footer.tsx      # Site footer with admin-driven contact data
│   │   ├── PackageCard.tsx # Tour card with badges & WhatsApp CTA
│   │   ├── DestinationCard.tsx # Destination showcase card
│   │   ├── ImageLightbox.tsx   # Modal image viewer with keyboard navigation
│   │   ├── ShareModal.tsx      # Social share dialog (Copy link, WhatsApp, FB)
│   │   └── WhatsAppFloatingButton.tsx # Sticky bottom-right chat concierge
│   ├── context/
│   │   └── AppContext.tsx  # Central reactive state, localStorage sync, WhatsApp router
│   ├── data/
│   │   └── mockData.ts     # Realistic Bangladesh tourism seed data & settings
│   ├── pages/
│   │   ├── public/         # Public visitor pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── DestinationsPage.tsx
│   │   │   ├── DestinationDetailPage.tsx
│   │   │   ├── PackagesPage.tsx
│   │   │   ├── PackageDetailPage.tsx
│   │   │   ├── GalleryPage.tsx
│   │   │   ├── BlogPage.tsx
│   │   │   ├── BlogPostPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   └── admin/          # Protected Admin CMS pages
│   │       ├── AdminLoginPage.tsx
│   │       ├── AdminLayout.tsx
│   │       ├── AdminDashboardPage.tsx
│   │       ├── AdminPackagesPage.tsx
│   │       ├── AdminDestinationsPage.tsx
│   │       ├── AdminGalleryPage.tsx
│   │       ├── AdminBlogPage.tsx
│   │       ├── AdminSettingsPage.tsx
│   │       └── AdminAuditPage.tsx
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces matching SRS schema
│   ├── App.tsx             # Root router configuration
│   ├── index.css           # Tailwind directives & theme utilities
│   └── main.tsx            # Application entry point
├── vercel.json             # Vercel SPA rewrite configuration
├── vite.config.ts          # Vite build configuration
├── tailwind.config.js      # Brand design tokens & theme palette
└── tsconfig.json           # TypeScript configuration
```

---

## 👥 Team Lithium (Pointfex Engagement)

- **Hafizur Rahman** — Project Manager & Technical Lead
- **Kazi Azmainur Rahman** — UI/UX Designer & Deployment Engineer
- **Sifat Mazib** — Admin Panel Developer
- **Janntun Nahar Soha** — Technical Documentation & QA Tester
