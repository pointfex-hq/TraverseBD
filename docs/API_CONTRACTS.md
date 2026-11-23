# TraverseBD — API Contracts & Backend Documentation
**Author:** Hafizur Rahman (PM, Technical Lead & Backend Developer)  
**Team:** Team Lithium (Pointfex)  
**Target Consumers:** Kazi Azmainur Rahman (Public Frontend), Sifat Mazib (Admin Panel), Janntun Nahar Soha (QA)  
**Version:** 1.0.0 (P0 MVP Baseline)  

---

## 1. Overview & General Conventions

All TraverseBD APIs follow standardized RESTful JSON conventions:

### Base URL:
- Local Development: `http://localhost:3000`
- Production / Staging: `https://traversebd.com` (or Vercel deployment URL)

### Standard Response Envelopes:

#### Success Response Envelope (Single Entity / Action):
```json
{
  "success": true,
  "data": { ... }
}
```

#### Paginated List Response Envelope:
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 36,
    "totalPages": 3
  }
}
```

#### Error Response Envelope:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR | NOT_FOUND | DB_ERROR | INTERNAL_ERROR",
    "message": "Human-readable explanation of error",
    "details": { ... }
  }
}
```

### Standard HTTP Status Codes:
- `200 OK`: Request succeeded.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Validation failure or malformed query/body.
- `401 Unauthorized`: Missing or invalid authentication token.
- `403 Forbidden`: Authenticated user lacks permission.
- `404 Not Found`: Resource does not exist or is unpublished.
- `500 Internal Server Error`: Safe generic server-side error (never leaks credentials or stack traces).

---

## 2. Public API Endpoints (For Kazi's Frontend)

### 2.1 System Health & Database Diagnostic
- **Endpoint:** `GET /api/public/health`
- **Purpose:** Verifies that the Next.js server and Supabase PostgreSQL connection are active and healthy.
- **Auth:** None (Public)
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "database": "connected",
    "timestamp": "2026-11-21T18:20:00.000Z",
    "latencyMs": 42,
    "tablesAccessible": true
  }
}
```

---

### 2.2 Travel Categories List
- **Endpoint:** `GET /api/public/categories`
- **Purpose:** Returns published travel categories for category pills, filters, and home page sections.
- **Auth:** None (Public)
- **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "c1111111-1111-1111-1111-111111111111",
      "slug": "beach-coastal",
      "name_en": "Beach & Coastal",
      "name_bn": "সমুদ্র সৈকত ও উপকূলীয়",
      "description_en": "Explore the world's longest unbroken sandy sea beach and pristine marine islands.",
      "description_bn": "বিশ্বের দীর্ঘতম অবিচ্ছিন্ন বালুকাময় সমুদ্র সৈকত এবং প্রবাল দ্বীপ অন্বেষণ করুন।",
      "sort_order": 1,
      "status": "published",
      "created_at": "2026-11-21T12:00:00Z"
    }
  ]
}
```

---

### 2.3 Destinations List
- **Endpoint:** `GET /api/public/destinations`
- **Purpose:** Returns list of published destinations for listing page or featured home carousel.
- **Auth:** None (Public)
- **Query Parameters:**
  - `featured` (optional, boolean): `true` to fetch only featured destinations.
  - `limit` (optional, number): Number of destinations to return.
- **Example Request:**
  `GET /api/public/destinations?featured=true&limit=6`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "d1111111-1111-1111-1111-111111111111",
      "slug": "coxs-bazar",
      "name_en": "Cox's Bazar",
      "name_bn": "কক্সবাজার",
      "region": "Chattogram Division",
      "short_description_en": "The world's longest natural unbroken sea beach stretching over 120 kilometers.",
      "short_description_bn": "১২০ কিলোমিটার বিস্তৃত বিশ্বের দীর্ঘতম প্রাকৃতিক বালুকাময় সমুদ্র সৈকত।",
      "cover_image_url": "https://images.unsplash.com/...",
      "highlights": ["120km unbroken sea beach", "Marine Drive route"],
      "travel_tips": ["Avoid swimming during high tide warning flags"],
      "status": "published",
      "is_featured": true
    }
  ]
}
```

---

### 2.4 Destination Detail by Slug
- **Endpoint:** `GET /api/public/destinations/[slug]`
- **Purpose:** Fetches full details for a single destination page.
- **Auth:** None (Public)
- **Example Request:** `GET /api/public/destinations/coxs-bazar`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "d1111111-1111-1111-1111-111111111111",
    "slug": "coxs-bazar",
    "name_en": "Cox's Bazar",
    "name_bn": "কক্সবাজার",
    "region": "Chattogram Division",
    "short_description_en": "...",
    "full_description_en": "...",
    "cover_image_url": "https://images.unsplash.com/...",
    "highlights": ["120km unbroken sea beach", "Scenic Marine Drive route"],
    "travel_tips": ["Avoid high tide", "Carry cash"],
    "status": "published",
    "is_featured": true
  }
}
```

---

### 2.5 Packages Listing with Search & Filters
- **Endpoint:** `GET /api/public/packages`
- **Purpose:** Power the main package discovery page, search bar, and filter panel.
- **Auth:** None (Public)
- **Query Parameters:**
  - `q` (string): Text search query.
  - `category` (string): Category slug (e.g. `beach-coastal`).
  - `destination` (string): Destination slug (e.g. `coxs-bazar`).
  - `min_price` (integer): Minimum whole BDT price.
  - `max_price` (integer): Maximum whole BDT price.
  - `duration` (integer): Duration in days.
  - `sort`: `price_asc` | `price_desc` | `duration_asc` | `newest` (default: `newest`).
  - `featured`: `true` | `false`.
  - `trending`: `true` | `false`.
  - `page`: Page number (default: 1).
  - `limit`: Items per page (default: 12, max: 50).
- **Example Request:**
  `GET /api/public/packages?category=beach-coastal&min_price=5000&max_price=10000&sort=price_asc&page=1`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "p1111111-1111-1111-1111-111111111111",
      "slug": "coxs-bazar-coastal-retreat",
      "destination_id": "d1111111-1111-1111-1111-111111111111",
      "category_id": "c1111111-1111-1111-1111-111111111111",
      "title_en": "Cox's Bazar Luxury Beach Retreat",
      "title_bn": "কক্সবাজার লাক্সারি বিচ রিট্রিট",
      "short_description_en": "Experience 3 days and 2 nights of coastal serenity...",
      "short_description_bn": "৩ দিন ২ রাতের সমুদ্র দর্শন...",
      "price_mode": "fixed",
      "price_bdt": 8500,
      "duration_days": 3,
      "duration_nights": 2,
      "cover_image_url": "https://images.unsplash.com/...",
      "status": "published",
      "is_featured": true,
      "is_trending": true,
      "destination": {
        "slug": "coxs-bazar",
        "name_en": "Cox's Bazar",
        "name_bn": "কক্সবাজার"
      },
      "category": {
        "slug": "beach-coastal",
        "name_en": "Beach & Coastal",
        "name_bn": "সমুদ্র সৈকত ও উপকূলীয়"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 1,
    "totalPages": 1
  }
}
```

---

### 2.6 Package Detail with Joined Itinerary & Departures
- **Endpoint:** `GET /api/public/packages/[slug]`
- **Purpose:** Full package details screen with day-by-day itineraries, inclusions, exclusions, and upcoming departures.
- **Auth:** None (Public)
- **Example Request:** `GET /api/public/packages/coxs-bazar-coastal-retreat`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "p1111111-1111-1111-1111-111111111111",
    "slug": "coxs-bazar-coastal-retreat",
    "title_en": "Cox's Bazar Luxury Beach Retreat",
    "title_bn": "কক্সবাজার লাক্সারি বিচ রিট্রিট",
    "price_mode": "fixed",
    "price_bdt": 8500,
    "duration_days": 3,
    "duration_nights": 2,
    "cover_image_url": "https://images.unsplash.com/...",
    "destination": {
      "id": "d1111111-1111-1111-1111-111111111111",
      "slug": "coxs-bazar",
      "name_en": "Cox's Bazar",
      "name_bn": "কক্সবাজার"
    },
    "category": {
      "id": "c1111111-1111-1111-1111-111111111111",
      "slug": "beach-coastal",
      "name_en": "Beach & Coastal"
    },
    "images": [
      {
        "id": "...",
        "image_url": "https://images.unsplash.com/...",
        "alt_en": "Cox's Bazar Beach Sunset",
        "alt_bn": "কক্সবাজার সমুদ্র সৈকত সূর্যাস্ত"
      }
    ],
    "itinerary": [
      {
        "day_no": 1,
        "title_en": "Arrival & Sunset at Laboni Beach",
        "title_bn": "আগমন ও লাবণী বিচে সূর্যাস্ত",
        "description_en": "Check into resort, refresh, and spend the evening enjoying the sunset."
      }
    ],
    "items": [
      {
        "type": "included",
        "text_en": "2 Nights 3-star AC sea-facing resort accommodation",
        "text_bn": "৩ তারকা বিশিষ্ট সি-ভিউ রিসোর্টে ২ রাত থাকার ব্যবস্থা"
      },
      {
        "type": "excluded",
        "text_en": "Intercity bus or airfare",
        "text_bn": "যাতায়াত বাস বা বিমান ভাড়া"
      }
    ],
    "departures": [
      {
        "id": "...",
        "departure_date": "2026-12-05",
        "capacity": 20,
        "available_seats": 8,
        "status": "available"
      },
      {
        "id": "...",
        "departure_date": "2026-12-19",
        "capacity": 20,
        "available_seats": 0,
        "status": "sold_out"
      }
    ]
  }
}
```

---

### 2.7 WhatsApp Inquiry URL Builder
- **Endpoint:** `POST /api/public/whatsapp`
- **Purpose:** Constructs the URL-encoded `wa.me` click-to-chat inquiry link according to PRD Section 7.1.
- **Auth:** None (Public)
- **Constraint:** Strictly NO booking or customer inquiry record is saved to the database.
- **Request Body:**
```json
{
  "packageTitle": "Cox's Bazar Luxury Beach Retreat",
  "packageSlug": "coxs-bazar-coastal-retreat",
  "packagePrice": 8500,
  "priceMode": "fixed",
  "departureDate": "2026-12-05",
  "travelerCount": 2,
  "locale": "bn"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "inquiryUrl": "https://wa.me/8801700000000?text=%E0%A6%A8%E0%A6%AE%E0%A6%B8%E0%A7%8D%E0%A6%95%E0%A6%BE%E0%A6%B0%20...",
    "targetPhone": "8801700000000",
    "status": "ready"
  }
}
```

---

### 2.8 Public Site Settings
- **Endpoint:** `GET /api/public/settings`
- **Purpose:** Retrieve official contact phone, email, WhatsApp number, and social links.
- **Auth:** None (Public)
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "contact_info": {
      "phone": "+8801700000000",
      "email": "info@traversebd.com",
      "address": "Banani, Dhaka, Bangladesh"
    },
    "whatsapp_config": {
      "number": "8801700000000",
      "default_message_en": "Hello TraverseBD, I want to inquire about a tour package."
    },
    "social_links": {
      "facebook": "https://facebook.com/traversebd",
      "instagram": "https://instagram.com/traversebd"
    }
  }
}
```

---

## 3. Business Logic & Constraints Summary

| Rule ID | Name | Description |
| :--- | :--- | :--- |
| **DATA-01** | Public Visibility | Only entities with `status = 'published'` are returned to public endpoints. |
| **DATA-02** | Whole BDT Money | All prices are stored as positive integers (`price_bdt > 0`). No decimals. |
| **DATA-03** | Price Modes | Packages support `fixed` price or `starting_from` price mode. |
| **DATA-04** | Seat Invariant | Available seats must satisfy: $0 \le \text{available\_seats} \le \text{capacity}$. |
| **DATA-05** | No Live Booking DB | Inquiries go directly to WhatsApp via `wa.me`. No user accounts, no booking rows created. |
| **DATA-06** | Zero Secrets in Git | Service role keys and secrets are server-only and excluded by `.gitignore`. |
