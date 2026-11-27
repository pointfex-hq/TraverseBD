# TraverseBD — Discover Uncharted Bangladesh 🇧🇩

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?logo=supabase)](https://supabase.com/)
[![Test Suite](https://img.shields.io/badge/Tests-67%2F67%20Passed-success)](#testing--verification)

> **TraverseBD** is an enterprise-grade travel exploration portal and expedition management engine engineered specifically for domestic and inbound travel across Bangladesh. Built with a decoupled Next.js architecture, bilingual localization (English & Bengali), and an integrated administrative control center.

---

## 👨‍💻 Project Leadership & Ownership

- **Lead Full-Stack Developer & Technical Project Manager:**  
  **Hafizur Rahman** ([@Hafizur-Rahman-SD](https://github.com/Hafizur-Rahman-SD))  
  *Email:* [hafizurrahman5004@gmail.com](mailto:hafizurrahman5004@gmail.com) | [2022200000178@seu.edu.bd](mailto:2022200000178@seu.edu.bd)  
  *Team:* TraverseBD / Pointfex  

---

## ✨ Key Architectural Highlights

### 1. Decoupled Clean Architecture
The codebase strictly separates the presentation layer (`frontend/`) from the domain business logic (`backend/`), ensuring seamless long-term maintainability:
- **`frontend/`**: Client components, views, responsive masonry grids, modals, and Stitch design-system styling.
- **`backend/`**: Domain services, database access layer, validation schemas, pricing invariants, and seat capacity rules.
- **`src/app/`**: Next.js 14 App Router connecting client views with RESTful API route handlers.

### 2. High-Conversion WhatsApp Direct Booking (PRD 7.1)
Eliminates traditional payment gateway friction and cart abandonment. Travelers customize their party size, departure date, and notes, and the platform automatically formats structured, URL-encoded WhatsApp inquiry messages (`wa.me`) in either English or Bengali.

### 3. Strict Integer BDT Pricing & Bengali Numerals
- Enforces Bangladesh commercial standards: whole positive integers only (`BDT 8,500`), strictly rejecting floating-point decimals.
- Native conversion engine transforms Western digits to authentic Bengali numerals (`৮৫০০ ৳`).

### 4. Hybrid Dual-Mode Data Engine
- **Cloud Mode:** Fully integrated with Supabase PostgreSQL under Row-Level Security (RLS) with relational foreign-key joins.
- **Local Fallback Mode:** Reactive in-memory singleton store (`adminStore`) ensuring that local development, unit tests, and admin CRUD work out of the box with zero setup.

### 5. Unified Administrative Control Center
Complete administrative management suite with role-based access control (RBAC):
- **Tour Packages CRUD:** Create, edit, toggle Draft/Published status, manage dates and seat limits.
- **Destinations & Categories:** Manage regions, highlights, and display orders.
- **Visual Media Archives:** Direct image URL management with live thumbnail preview.
- **Super Admin Governance:** Manage staff accounts, elevate roles (`ADMIN` $\leftrightarrow$ `SUPER_ADMIN`), and view security audit logs.

---

## 📁 Repository Structure

```text
TraverseBD/
├── backend/                      # Decoupled Domain Logic & Data Layer
│   ├── data/                     # Mock data & reactive local in-memory store
│   ├── database/                 # Supabase client & server connection factories
│   ├── services/                 # Packages, destinations, categories, gallery, pricing, departures
│   │   └── admin/                # Admin auth, packages, destinations, users, dashboard
│   ├── types/                    # Database models, relational DTOs, and admin types
│   ├── utils/                    # Unified JSON API responses & pagination helpers
│   └── validations/              # Zod query & payload validation schemas
├── frontend/                     # Decoupled Presentation Layer
│   ├── components/               # Navbar, Footer, WhatsApp Drawer, AdminSidebar, Cards
│   └── views/                    # Public views & Admin views
├── src/app/                      # Next.js 14 App Router (Pages & REST Endpoints)
│   ├── (public)/                 # Home, Packages, Destinations, Gallery, Blog, About, Contact
│   ├── admin/                    # Admin Dashboard, Packages, Destinations, Categories, Gallery, Users
│   └── api/                      # /api/public/*, /api/admin/*, and /api/auth/*
├── supabase/
│   └── migrations/               # PostgreSQL schema DDL, RLS policies, and production seed datasets
├── scripts/                      # Automated test runners & database diagnostic scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v18.17+ or v20+
- **Package Manager:** npm (v9+)
- **Database:** Supabase account (or run locally in standalone in-memory mode)

### 1. Clone & Install
```bash
git clone https://github.com/pointfex-hq/TraverseBD.git
cd TraverseBD
npm install
```

### 2. Configure Environment Variables
Copy the template to `.env.local`:
```bash
cp .env.example .env.local
```

Populate `.env.local` with your Supabase credentials (found in **Supabase Dashboard $\rightarrow$ Project Settings $\rightarrow$ API**):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key (Optional for read operations)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER=8801700000000
```

### 3. Database Setup (Supabase)
Run the migration scripts in the **Supabase SQL Editor**:
1. Run `supabase/migrations/20261121000001_initial_schema.sql` (Creates all 13 tables, relations, and RLS policies).
2. Run `supabase/migrations/20261121000002_seed_data.sql` (Inserts initial destinations, packages, and gallery data).
3. *(Optional)* Run `supabase/migrations/20261123000003_real_test_data.sql` (Populates rich real-world test data across all regions).

Verify database connectivity:
```bash
npm run db:test
```

### 4. Run Development Server
```bash
npm run dev
```
- **Public Portal:** [http://localhost:3000](http://localhost:3000)
- **Admin Control Center:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login) *(Click "⚡ One-Click Demo Super Admin Login" for instant testing)*

---

## 🧪 Testing & Verification

The project includes an automated test runner validating all core services, pricing rules, seat capacity logic, WhatsApp contracts, and admin mutations:

```bash
# Run the 67-test backend test suite
npm run test:backend

# Run production build and type checking
npm run build
```

**Test Suite Coverage (67 Passed | 0 Failed):**
- [x] Pricing Service & Rules (Integer BDT, Bengali conversion)
- [x] Departures & Capacity Thresholds (`available`, `few_seats`, `sold_out`)
- [x] WhatsApp Inquiry URL Generation Contract (PRD 7.1)
- [x] Destination & Package Filter Engine (Category, Region, Price, Sort)
- [x] Admin Authentication & Session Management
- [x] Admin Tour Packages Full CRUD & Status Toggle
- [x] Admin Destinations & Categories Management
- [x] Gallery Media Archive CRUD & Live Preview
- [x] Super Admin User Governance & Role Elevation (`ADMIN` $\rightarrow$ `SUPER_ADMIN`)
- [x] Real-Time Admin Mutation to Public Frontend Synchronization

---

## 📄 License & Attribution

This project is proprietary software developed by **Hafizur Rahman** for **TraverseBD / Pointfex**. All rights reserved.
