/**
 * TraverseBD Comprehensive Backend Unit & Integration Test Suite
 * 
 * Tests all core backend logic, services, rules, and validators locally.
 * Run via: node scripts/test-backend.mjs
 */

import { toBengaliNumerals, formatCurrencyBDT, validatePackagePrice } from '../backend/services/pricing.service.ts';
import { computeDepartureStatus, validateDepartureData } from '../backend/services/departures.service.ts';
import { generateWhatsAppInquiryUrl } from '../backend/services/whatsapp.service.ts';
import { getPublishedDestinations, getDestinationBySlug } from '../backend/services/destinations.service.ts';
import { getPublishedPackages, getPackageBySlug } from '../backend/services/packages.service.ts';
import { getPublishedCategories } from '../backend/services/categories.service.ts';
import { recordAnalyticsEvent } from '../backend/services/analytics.service.ts';
import { 
  adminLogin, 
  demoSuperAdminLogin,
  verifyAdminSession 
} from '../backend/services/admin/admin-auth.service.ts';
import { 
  getAllAdminPackages, 
  getAdminPackageById,
  createAdminPackage, 
  updateAdminPackage, 
  togglePackageStatus, 
  deleteAdminPackage 
} from '../backend/services/admin/admin-packages.service.ts';
import { 
  getAllAdminDestinations, 
  createAdminDestination, 
  deleteAdminDestination 
} from '../backend/services/admin/admin-destinations.service.ts';
import { 
  getAllAdminCategories, 
  createAdminCategory, 
  deleteAdminCategory 
} from '../backend/services/admin/admin-categories.service.ts';
import { 
  getAllAdminUsers, 
  createAdminUser, 
  updateAdminUserRole 
} from '../backend/services/admin/admin-users.service.ts';
import { 
  getAdminDashboardMetrics, 
  getRecentAuditLogs 
} from '../backend/services/admin/admin-dashboard.service.ts';
import { 
  getPublishedGalleryItems 
} from '../backend/services/gallery.service.ts';
import { 
  getAllAdminGallery, 
  createAdminGalleryItem, 
  deleteAdminGalleryItem 
} from '../backend/services/admin/admin-gallery.service.ts';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failed++;
  }
}

async function runTestSuite() {
  console.log('\n======================================================');
  console.log('🧪 TRAVERSEBD BACKEND CORE TEST SUITE (LOCAL MODE)');
  console.log('======================================================\n');

  // 1. PRICING SERVICE TESTS
  console.log('--- 1. Testing Pricing Service & Rules ---');
  assert(toBengaliNumerals(8500) === '৮৫০০', 'Bengali numeral conversion (8500 -> ৮৫০০)');
  assert(formatCurrencyBDT(8500, 'fixed', 'en') === 'BDT 8,500', 'Fixed price formatting (EN)');
  assert(formatCurrencyBDT(8500, 'fixed', 'bn') === '৳৮,৫০০', 'Fixed price formatting (BN)');
  assert(formatCurrencyBDT(7500, 'starting_from', 'en') === 'Starting from BDT 7,500', 'Starting From formatting (EN)');
  assert(formatCurrencyBDT(7500, 'starting_from', 'bn') === 'শুরু ৳৭,৫০০ থেকে', 'Starting From formatting (BN)');
  
  const validPrice = validatePackagePrice(5000);
  assert(validPrice.valid === true, 'Valid whole integer BDT price accepted');
  const invalidFloat = validatePackagePrice(5000.50);
  assert(invalidFloat.valid === false, 'Invalid decimal BDT price rejected (DATA-02)');
  const invalidNegative = validatePackagePrice(-100);
  assert(invalidNegative.valid === false, 'Negative BDT price rejected');

  // 2. DEPARTURES & SEAT AVAILABILITY RULES
  console.log('\n--- 2. Testing Departures & Seat Capacity Rules ---');
  assert(computeDepartureStatus(20, 15) === 'available', 'Seat status > 5 is "available"');
  assert(computeDepartureStatus(20, 3) === 'few_seats', 'Seat status <= 5 and > 0 is "few_seats"');
  assert(computeDepartureStatus(20, 0) === 'sold_out', 'Seat status == 0 is "sold_out"');
  
  const validDep = validateDepartureData(20, 10, '2026-12-05');
  assert(validDep.valid === true, 'Valid capacity and seats accepted');
  const invalidSeats = validateDepartureData(20, 25, '2026-12-05');
  assert(invalidSeats.valid === false, 'Seats exceeding capacity rejected (available_seats <= capacity)');
  const negativeSeats = validateDepartureData(20, -1, '2026-12-05');
  assert(negativeSeats.valid === false, 'Negative available seats rejected');

  // 3. WHATSAPP INQUIRY URL GENERATION
  console.log('\n--- 3. Testing WhatsApp Inquiry Contract (PRD 7.1) ---');
  const waUrlEn = generateWhatsAppInquiryUrl({
    packageTitle: 'Cox\'s Bazar Luxury Beach Retreat',
    packageSlug: 'coxs-bazar-coastal-retreat',
    packagePrice: 8500,
    departureDate: '2026-12-05',
    travelerCount: 2,
    locale: 'en',
    phoneNumber: '8801700000000',
  });
  assert(waUrlEn.startsWith('https://wa.me/8801700000000?text='), 'WhatsApp URL begins with wa.me and phone');
  assert(waUrlEn.includes('Cox'), 'English WhatsApp message contains package title');
  assert(waUrlEn.includes('2026-12-05'), 'WhatsApp message contains departure date');

  const waUrlBn = generateWhatsAppInquiryUrl({
    packageTitle: 'সাজেক ভ্যালি ক্লাউড এক্সপিডিশন',
    packageSlug: 'sajek-valley-cloud-expedition',
    packagePrice: 7500,
    locale: 'bn',
    phoneNumber: '8801700000000',
  });
  assert(decodeURIComponent(waUrlBn).includes('নমস্কার'), 'Bengali WhatsApp message contains Bengali greetings');

  // 4. DESTINATIONS SERVICE (LOCAL FALLBACK)
  console.log('\n--- 4. Testing Destinations Service ---');
  const allDest = await getPublishedDestinations();
  assert(allDest.data.length >= 4, `Destinations fetched (Found: ${allDest.data.length})`);
  const featuredDest = await getPublishedDestinations({ featuredOnly: true });
  assert(featuredDest.data.every((d) => d.is_featured), 'Featured filter returns only featured destinations');
  const singleDest = await getDestinationBySlug('coxs-bazar');
  assert(singleDest.data !== null && singleDest.data.slug === 'coxs-bazar', 'Fetched destination by slug (coxs-bazar)');
  const notFoundDest = await getDestinationBySlug('non-existent-place');
  assert(notFoundDest.data === null, 'Non-existent destination returns null');

  // 5. PACKAGES SERVICE & FILTER ENGINE
  console.log('\n--- 5. Testing Packages Service & Query Filters ---');
  const allPkgs = await getPublishedPackages();
  assert(allPkgs.data.length >= 4, `Packages fetched (Found: ${allPkgs.total})`);

  // Text search
  const searched = await getPublishedPackages({ q: 'Sajek' });
  assert(searched.data.length >= 1 && searched.data[0].slug.includes('sajek'), 'Search by text "Sajek" works');

  // Category filter
  const beachPkgs = await getPublishedPackages({ categorySlug: 'beach-coastal' });
  assert(beachPkgs.data.every((p) => p.category?.slug === 'beach-coastal'), 'Category filter (beach-coastal) works');

  // Price range filter
  const priceFiltered = await getPublishedPackages({ minPrice: 5000, maxPrice: 9000 });
  assert(priceFiltered.data.every((p) => p.price_bdt >= 5000 && p.price_bdt <= 9000), 'Price range filter (5000-9000 BDT) works');

  // Sorting
  const sortedPrice = await getPublishedPackages({ sort: 'price_asc' });
  assert(sortedPrice.data[0].price_bdt <= sortedPrice.data[sortedPrice.data.length - 1].price_bdt, 'Sort by price_asc works');

  // Package by slug with relations
  const pkgDetail = await getPackageBySlug('coxs-bazar-marine-drive-retreat');
  assert(pkgDetail.data !== null, 'Fetched package detail by slug');
  assert(pkgDetail.data.itinerary.length > 0, 'Package detail includes itinerary days');
  assert(pkgDetail.data.items.length > 0, 'Package detail includes package items (inclusions/exclusions)');
  assert(pkgDetail.data.departures.length > 0, 'Package detail includes departures');

  // 6. CATEGORIES SERVICE
  console.log('\n--- 6. Testing Categories Service ---');
  const cats = await getPublishedCategories();
  assert(cats.data.length >= 4, `Categories fetched (Found: ${cats.data.length})`);
  assert(cats.data[0].sort_order <= cats.data[1].sort_order, 'Categories ordered by sort_order');

  // 7. ANALYTICS EVENT LOGGING
  console.log('\n--- 7. Testing Analytics Event Logger ---');
  const evResult = await recordAnalyticsEvent({
    eventType: 'package_view',
    targetSlug: 'coxs-bazar-marine-drive-retreat',
    locale: 'en',
  });
  assert(evResult.recorded === true, 'Analytics event recorded without error');
  assert(evResult.totalForType >= 1, 'Analytics event counter incremented');

  // 8. ADMIN AUTHENTICATION & SESSIONS
  console.log('\n--- 8. Testing Admin Auth & RBAC ---');
  const demoAuth = await adminLogin('hafizur@traversebd.com');
  assert(demoAuth !== null && demoAuth.user.role === 'SUPER_ADMIN', 'Super Admin login successful');
  assert(demoAuth.token.length > 0, 'Admin session token issued');

  const oneClickDemo = demoSuperAdminLogin();
  assert(oneClickDemo !== null && oneClickDemo.token === 'demo-super-admin-token', 'One-Click Demo Super Admin login works');
  
  const invalidAuth = await adminLogin('hacker@unknown.com');
  assert(invalidAuth === null, 'Unknown user rejected');

  // 9. ADMIN PACKAGES CRUD
  console.log('\n--- 9. Testing Admin Packages CRUD Engine ---');
  const adminPkgsBefore = getAllAdminPackages();
  const initialCount = adminPkgsBefore.length;

  const newPkg = createAdminPackage({
    title_en: 'Bandarban Wilderness & Nilgiri Summit',
    title_bn: 'বান্দরবান ওয়াইল্ডারনেস ও নীলগিরি সামিট',
    destination_id: 'dest-bandarban',
    category_id: 'cat-hill-trek',
    short_description_en: 'Deep cloudscape adventure across Nilgiri and Thanchi hills.',
    short_description_bn: 'নীলগিরি ও থানচি পাহাড়ের অপূর্ব অ্যাডভেঞ্চার।',
    full_description_en: 'Full 3-day deep adventure across Bandarban summits.',
    full_description_bn: 'বান্দরবানের চূড়ায় ৩ দিনের পূর্ণাঙ্গ অ্যাডভেঞ্চার।',
    price_bdt: 11500,
    price_mode: 'fixed',
    duration_days: 3,
    duration_nights: 2,
    cover_image_url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62',
    status: 'draft',
    is_featured: false,
    departures: [
      { departure_date: '2026-12-15', capacity: 16, available_seats: 12 }
    ]
  }, 'hafizur@traversebd.com');

  assert(newPkg.slug === 'bandarban-wilderness-nilgiri-summit', 'Auto-generated clean URL slug');
  assert(newPkg.price_bdt === 11500, 'Whole BDT price recorded');
  assert(newPkg.status === 'draft', 'Initial draft status set');
  assert(newPkg.departures.length === 1, 'Departures attached to created package');

  // Toggle status
  const toggled = togglePackageStatus(newPkg.id, 'hafizur@traversebd.com');
  assert(toggled !== null && toggled.status === 'published', 'Status toggled from draft to published');

  // Update price
  const updated = updateAdminPackage(newPkg.id, { price_bdt: 12000 }, 'hafizur@traversebd.com');
  assert(updated !== null && updated.price_bdt === 12000, 'Price updated to 12000 BDT');

  // Delete package
  const deleted = deleteAdminPackage(newPkg.id, 'hafizur@traversebd.com');
  assert(deleted === true, 'Package deleted successfully');
  assert(getAllAdminPackages().length === initialCount, 'Package count restored after deletion');

  // 10. ADMIN DESTINATIONS CRUD
  console.log('\n--- 10. Testing Admin Destinations CRUD ---');
  const destsBefore = getAllAdminDestinations().length;
  const newDest = createAdminDestination({
    name_en: 'Kuakata Daughter of Sea',
    name_bn: 'কুয়াকাটা সাগরকন্যা',
    region: 'Barisal',
    short_description_en: 'Panoramic sunrise and sunset beach in southern Bangladesh.',
    short_description_bn: 'সূর্যোদয় ও সূর্যাস্তের অপূর্ব বেলাভূমি।',
  }, 'hafizur@traversebd.com');
  assert(newDest.slug === 'kuakata-daughter-of-sea', 'Destination slug created');
  assert(getAllAdminDestinations().length === destsBefore + 1, 'Destination count incremented');
  deleteAdminDestination(newDest.id, 'hafizur@traversebd.com');
  assert(getAllAdminDestinations().length === destsBefore, 'Destination deleted successfully');

  // 11. ADMIN CATEGORIES CRUD
  console.log('\n--- 11. Testing Admin Categories CRUD ---');
  const catsBefore = getAllAdminCategories().length;
  const newCat = createAdminCategory({
    name_en: 'Mangrove Safari',
    name_bn: 'ম্যানগ্রোভ সাফারি',
  }, 'hafizur@traversebd.com');
  assert(newCat.slug === 'mangrove-safari', 'Category slug created');
  assert(getAllAdminCategories().length === catsBefore + 1, 'Category count incremented');
  deleteAdminCategory(newCat.id, 'hafizur@traversebd.com');
  assert(getAllAdminCategories().length === catsBefore, 'Category deleted successfully');

  // 12. ADMIN USERS & RBAC GOVERNANCE
  console.log('\n--- 12. Testing Staff Management & RBAC Governance ---');
  const newStaff = createAdminUser({
    email: 'operations.lead@traversebd.com',
    name: 'Tamim Iqbal',
    role: 'ADMIN',
  }, 'hafizur@traversebd.com');
  assert(newStaff.role === 'ADMIN' && newStaff.status === 'Active', 'New staff admin user created');

  const elevatedStaff = updateAdminUserRole(newStaff.id, 'SUPER_ADMIN', 'hafizur@traversebd.com');
  assert(elevatedStaff !== null && elevatedStaff.role === 'SUPER_ADMIN', 'Staff role promoted to SUPER_ADMIN');

  // 13. ADMIN DASHBOARD METRICS & AUDIT LOGS
  console.log('\n--- 13. Testing Dashboard Metrics & Audit Trail ---');
  const metrics = getAdminDashboardMetrics();
  assert(metrics.totalPackages > 0, `Dashboard packages metric: ${metrics.totalPackages}`);
  assert(metrics.totalDestinations > 0, `Dashboard destinations metric: ${metrics.totalDestinations}`);
  assert(metrics.totalAdmins > 0, `Dashboard admins metric: ${metrics.totalAdmins}`);

  const logs = getRecentAuditLogs(5);
  assert(logs.length > 0, `Audit log entries captured: ${logs.length}`);
  assert(logs[0].user_email !== undefined && logs[0].action !== undefined, 'Audit log contains valid user_email and action');

  // 14. GALLERY SERVICE & ADMIN CRUD
  console.log('\n--- 14. Testing Gallery Service & Admin Media CRUD ---');
  const initialGallery = await getPublishedGalleryItems();
  assert(initialGallery.data.length >= 6, `Public gallery fetched: ${initialGallery.data.length} photos`);

  const createdPhoto = createAdminGalleryItem({
    title: 'Kaptai Lake Blue Twilight',
    location: 'Rangamati Hill Tracts',
    category: 'riverine',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    badge: 'Sunset Boating',
  }, 'hafizur@traversebd.com');
  assert(createdPhoto.title === 'Kaptai Lake Blue Twilight', 'Gallery photo added by admin');

  const afterAddGallery = await getPublishedGalleryItems();
  assert(afterAddGallery.data.length === initialGallery.data.length + 1, 'Public gallery immediately reflects new photo');

  deleteAdminGalleryItem(createdPhoto.id, 'hafizur@traversebd.com');
  const afterDeleteGallery = await getPublishedGalleryItems();
  assert(afterDeleteGallery.data.length === initialGallery.data.length, 'Public gallery immediately reflects photo deletion');

  // 15. REAL-TIME ADMIN CRUD TO PUBLIC FRONTEND SYNC
  console.log('\n--- 15. Testing Real-time Admin Mutation to Public Frontend Sync ---');
  // Edit Cox's Bazar package price in Admin
  const targetPkg = getAllAdminPackages().find((p) => p.slug === 'coxs-bazar-marine-drive-retreat');
  const originalPrice = targetPkg.price_bdt;

  // Change price in Admin
  updateAdminPackage(targetPkg.id, { price_bdt: 9999 }, 'hafizur@traversebd.com');
  
  // Verify public service immediately returns updated price
  const publicPkgsAfterPriceChange = await getPublishedPackages();
  const publicUpdatedPkg = publicPkgsAfterPriceChange.data.find((p) => p.slug === 'coxs-bazar-marine-drive-retreat');
  assert(publicUpdatedPkg.price_bdt === 9999, 'Public frontend immediately reflects price change (9999 BDT)');

  // Toggle package to draft
  togglePackageStatus(targetPkg.id, 'hafizur@traversebd.com');
  const publicPkgsAfterDraft = await getPublishedPackages();
  const hiddenPkg = publicPkgsAfterDraft.data.find((p) => p.slug === 'coxs-bazar-marine-drive-retreat');
  assert(hiddenPkg === undefined, 'Public frontend immediately hides draft package');

  // Toggle back to published and restore price
  togglePackageStatus(targetPkg.id, 'hafizur@traversebd.com');
  updateAdminPackage(targetPkg.id, { price_bdt: originalPrice }, 'hafizur@traversebd.com');
  const publicPkgsRestored = await getPublishedPackages();
  const restoredPkg = publicPkgsRestored.data.find((p) => p.slug === 'coxs-bazar-marine-drive-retreat');
  assert(restoredPkg !== undefined && restoredPkg.price_bdt === originalPrice, 'Public frontend restored to active state');

  console.log('\n======================================================');
  console.log(`📊 TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('Unhandled test failure:', err);
  process.exit(1);
});
