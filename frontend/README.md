# TraverseBD — Frontend Architecture & Design System Guide

**Frontend Designer & Deployment Engineer:** Kazi Azmainur Rahman  
**Team:** TraverseBD / Pointfex  
**Design System:** Lush Horizon (Modern Lightweight Tourism Portal)  
**Stack:** Next.js 14 App Router, React 18, Tailwind CSS, TypeScript, Material Symbols Outlined  

---

## 1. Directory Structure

All user-facing views, components, layout wrappers, and styles are isolated in `frontend/`:

```text
frontend/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Responsive navigation bar with mobile drawer & language switch
│   │   └── Footer.tsx           # Brand footer, site links, social handles, and trust indicators
│   ├── packages/
│   │   ├── PackageCard.tsx      # Card with image, duration, price in whole BDT, and WhatsApp action
│   │   └── PackageFilterSidebar.tsx # Interactive search, category, price range, and duration filter
│   ├── destinations/
│   │   └── DestinationCard.tsx  # 3D interactive tilt destination card
│   └── shared/
│       └── SearchBar.tsx        # High-performance debounced search input
└── views/
    ├── HomeView.tsx             # Matching Stitch 'traverse_bd_home_lightweight_modern'
    ├── PackagesView.tsx         # Matching Stitch 'tour_packages_traverse_bd_1'
    ├── PackageDetailView.tsx    # Matching Stitch 'tour_packages_traverse_bd_2'
    ├── DestinationsView.tsx     # Regional destination catalog & division filter
    ├── GalleryView.tsx          # Matching Stitch 'gallery_traverse_bd' with photo lightbox
    ├── BlogView.tsx             # Matching Stitch 'blog_guides_traverse_bd' with featured guide
    ├── AboutView.tsx            # Matching Stitch 'about_us_traverse_bd' with story, stats & team
    └── ContactView.tsx          # Matching Stitch 'contact_us_traverse_bd_1' with FAQ & operations desk
```

---

## 2. Path Aliases & Server-Client Separation

To prevent tight coupling and merge conflicts:
- `@frontend/*` maps directly to `./frontend/*`
- `@backend/*` maps directly to `./backend/*`

### Integration Pattern:
Next.js App Router files in `src/app/` act strictly as thin data fetchers (Server Components):
```tsx
// src/app/packages/page.tsx (Server Component)
import PackagesView from '@frontend/views/PackagesView';
import { getPublishedPackages } from '@backend/services/packages.service';

export default async function PackagesPage({ searchParams }) {
  const packagesRes = await getPublishedPackages({ ...searchParams });
  return <PackagesView initialPackages={packagesRes.data || []} />;
}
```

---

## 3. Design System Tokens (Lush Horizon)

Configured in `tailwind.config.ts`:
- **Primary Color:** `#005f49` (Deep Rainforest Emerald)
- **Primary Fixed Dim:** `#7cd8b8`
- **Surface / Background:** `#f9f9ff`
- **Surface Container Lowest:** `#ffffff`
- **Glassmorphism:** `.glass-panel` and `.glass-header` with backdrop blur
- **Micro-interactions:** `.css-tilt-card` hover 3D elevation
- **Typography:** Plus Jakarta Sans (Headings & Body), Hind Siliguri (Bengali scripts)
- **Icons:** Google Material Symbols Outlined

---

## 4. High-Performance Image Guidelines

To avoid slow loading in Bangladesh, all images use Google User Content CDN URLs from the Stitch design system exports (`https://lh3.googleusercontent.com/...`). Do not use raw Unsplash URLs which suffer from intermittent timeouts.
