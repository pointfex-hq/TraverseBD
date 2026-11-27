# TraverseBD — Backend Architecture & Core Services

**Project Manager & Technical Lead:** Hafizur Rahman  
**Team:** TraverseBD / Pointfex  
**Stack:** Next.js 14, TypeScript, Supabase (PostgreSQL), Zod, Tailwind CSS  

---

## 1. Directory Structure

All backend business logic, database connectors, types, validation schemas, and mock data live strictly inside the isolated `backend/` directory:

```text
backend/
├── data/
│   └── mock-data.ts             # Fast, zero-latency Google CDN data for local offline development
├── database/
│   ├── client.ts                # Browser/client Supabase connector (Anon/Publishable key)
│   ├── server.ts                # Server Component Supabase connector
│   └── admin.ts                 # Service Role connector (for secure operations / Admin panel)
├── services/
│   ├── packages.service.ts      # Query filtering (search, category, price, duration, sort, pagination)
│   ├── pricing.service.ts       # Whole BDT integer logic (DATA-02), bilingual currency formatting
│   ├── departures.service.ts    # Seat invariant (0 <= available_seats <= capacity), status computation
│   ├── whatsapp.service.ts      # PRD 7.1 wa.me click-to-chat inquiry URL constructor (Zero DB writes)
│   ├── destinations.service.ts  # Regional catalog and single destination lookups
│   ├── categories.service.ts    # Travel categories sorted by sort_order
│   ├── blogs.service.ts         # Travel dispatches & guides
│   ├── testimonials.service.ts  # Verified customer reviews
│   ├── settings.service.ts      # Key-value site configuration & contact coordinates
│   └── analytics.service.ts     # Privacy-first non-PII visitor analytics recorder
├── types/
│   └── database.types.ts        # Database entity schemas, DTOs, and API response types
├── utils/
│   └── api-response.ts          # Standardized HTTP JSON helpers (successResponse, paginatedResponse, errorResponse)
└── validations/
    └── index.ts                 # Zod validation schemas for query parameters, packages, and inquiries
```

---

## 2. Core Business Rules & Invariants

### A. Pricing Invariant (DATA-02 & PRD Section 6)
- **Rule:** All tour package prices are strictly positive integers in whole Bangladeshi Taka (BDT).
- **Enforcement:**
  - Database level: `CHECK (price_bdt > 0 AND price_bdt = TRUNC(price_bdt))`
  - Service level: `validatePackagePrice(price)` in `pricing.service.ts` rejects negative numbers and decimals.
  - Formatting: `formatCurrencyBDT()` provides standard English (`BDT 8,500`) and Bengali numerals (`৳৮,৫০০`).

### B. Departure Seat Invariant (DATA-03)
- **Rule:** The remaining seat count must always satisfy $0 \le \text{available\_seats} \le \text{capacity}$.
- **Status Classification:**
  - `available`: $\text{available\_seats} > 5$
  - `few_seats`: $1 \le \text{available\_seats} \le 5$
  - `sold_out`: $\text{available\_seats} = 0$

### C. WhatsApp Inquiry Contract (PRD Section 7.1)
- **No Online Booking Table:** Customer personal accounts and direct booking rows are **NOT** stored in the database.
- **Contract URL:** `https://wa.me/{phone}?text={URL_encoded_message}`
- **Bilingual Generator:** `generateWhatsAppInquiryUrl()` in `whatsapp.service.ts` creates complete pre-filled messages with package title, selected departure date, traveler count, and custom notes.

---

## 3. Database & Migrations

PostgreSQL schemas are managed via Supabase SQL migrations in `supabase/migrations/`:
- `20261121000001_initial_schema.sql`: 13 relational tables, foreign key constraints, Row Level Security (RLS) policies, and performance indexes.
- `20261121000002_seed_data.sql`: Seed data for Bangladesh tourist destinations (Cox's Bazar, Sajek, Saint Martin, Sundarbans, Sreemangal, Bandarban).

---

## 4. Testing & Verification

Run the automated backend test suite (35 local tests):
```bash
npm run test:backend
```

Run the live Supabase database diagnostic:
```bash
npm run db:test
```
