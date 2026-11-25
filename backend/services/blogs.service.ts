import { adminStore } from '@backend/data/admin-mock-data';

export interface BlogPost {
  id: string;
  slug: string;
  title_en: string;
  title_bn?: string;
  excerpt_en: string;
  excerpt_bn?: string;
  content_en: string;
  content_bn?: string;
  cover_image_url: string;
  destination_slug?: string;
  read_time?: string;
  status: 'published' | 'draft';
  published_at?: string;
}

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'coxs-bazar-travel-guide',
    title_en: 'Ultimate Travel Guide to Cox\'s Bazar in 2026',
    title_bn: '২০২৬ সালের পূর্ণাঙ্গ কক্সবাজার ভ্রমণ গাইড',
    excerpt_en: 'Everything you need to know about hotels, local seafood, Marine Drive drives, and quiet beaches.',
    excerpt_bn: 'হোটেল বুকিং, সামুদ্রিক খাবার, মেরিন ড্রাইভ ও নির্জন সৈকত ভ্রমণের বিস্তারিত তথ্য।',
    content_en: 'Cox\'s Bazar offers much more than just the main crowded beach. Traveling down the 80km Marine Drive to Inani and Teknaf opens up hidden coral coasts and dramatic ocean viewpoints...',
    content_bn: 'কক্সবাজার মানে কেবল লাবণী পয়েন্ট নয়। মেরিন ড্রাইভ ধরে ইনানী ও টেকনাফের দিকে এগিয়ে গেলে দেখা মেলে প্রবাল পাথরের সৈকত ও পাহাড়ের নৈসর্গিক রূপ...',
    cover_image_url: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop',
    destination_slug: 'coxs-bazar',
    status: 'published',
    published_at: '2026-11-15T09:00:00Z',
  },
  {
    id: 'b2',
    slug: 'sajek-cloud-valley-tips',
    title_en: 'How to Catch the Sea of Clouds in Sajek Valley',
    title_bn: 'সাজেক ভ্যালিতে মেঘের সমুদ্র দেখার সঠিক সময় ও নিয়ম',
    excerpt_en: 'The best months, cottage balcony tips, and early morning viewpoints at Konglak Para.',
    excerpt_bn: 'কখন সাজেক গেলে সবচেয়ে বেশি মেঘ দেখা যায় এবং কটেজ বুকিংয়ের গুরুত্বপূর্ণ টিপস।',
    content_en: 'The magic of Sajek Valley lies in its elevation and geographical pocket that traps morning fog and clouds. Between October and February, waking up at 5:30 AM guarantees an ocean of white cotton clouds...',
    content_bn: 'সমুদ্রপৃষ্ঠ থেকে ১,৮০০ ফুট উঁচুতে অবস্থিত সাজেকে অক্টোবর থেকে ফেব্রুয়ারি মাসে সবচেয়ে সুন্দর মেঘের মেলা জমে। ভোরে কংলাক পাহাড়ের চূড়া থেকে দেখা যায় মেঘের সমুদ্র...',
    cover_image_url: 'https://images.unsplash.com/photo-1628178122971-45607ef3c428?q=80&w=1200&auto=format&fit=crop',
    destination_slug: 'sajek-valley',
    status: 'published',
    published_at: '2026-11-18T10:00:00Z',
  },
];

export async function getPublishedBlogs(options?: { destinationSlug?: string; limit?: number }) {
  const source = (adminStore.blogs && adminStore.blogs.length > 0) ? adminStore.blogs : MOCK_BLOGS;
  let list = source.filter((b) => b.status === 'published');
  if (options?.destinationSlug) {
    list = list.filter((b) => b.destination_slug === options.destinationSlug);
  }
  if (options?.limit) {
    list = list.slice(0, options.limit);
  }
  return { data: list, error: null };
}

export async function getBlogBySlug(slug: string) {
  const source = (adminStore.blogs && adminStore.blogs.length > 0) ? adminStore.blogs : MOCK_BLOGS;
  const found = source.find((b) => b.slug === slug && b.status === 'published');
  return { data: found || null, error: found ? null : 'Blog post not found' };
}
