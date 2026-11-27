import { AdminUser, AdminAuditLog } from '@backend/types/admin.types';
import { MOCK_PACKAGES, MOCK_DESTINATIONS, MOCK_CATEGORIES } from '@backend/data/mock-data';
import { Package, Destination, Category } from '@backend/types/database.types';

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'u1',
    email: 'hafizur@traversebd.com',
    name: 'Hafizur Rahman',
    role: 'SUPER_ADMIN',
    status: 'Active',
    mfa_enabled: true,
    created_at: '2026-11-01T08:00:00Z',
    last_login: '2026-11-23T15:10:00Z',
  },
  {
    id: 'u2',
    email: 'sifat@traversebd.com',
    name: 'Sifat Mazib',
    role: 'ADMIN',
    status: 'Active',
    mfa_enabled: false,
    created_at: '2026-11-05T09:30:00Z',
    last_login: '2026-11-23T14:40:00Z',
  },
  {
    id: 'u3',
    email: 'kazi@traversebd.com',
    name: 'Kazi Azmainur Rahman',
    role: 'ADMIN',
    status: 'Active',
    mfa_enabled: false,
    created_at: '2026-11-08T10:00:00Z',
    last_login: '2026-11-22T18:20:00Z',
  },
  {
    id: 'u4',
    email: 'soha@traversebd.com',
    name: 'Jannatun Nahar Soha',
    role: 'ADMIN',
    status: 'Active',
    mfa_enabled: false,
    created_at: '2026-11-10T11:15:00Z',
    last_login: '2026-11-23T11:00:00Z',
  },
];

export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'log-1',
    user_email: 'hafizur@traversebd.com',
    user_role: 'SUPER_ADMIN',
    action: 'PACKAGE_STATUS_CHANGED',
    resource: 'sajek-valley-cloud-kingdom',
    details: 'Status changed from DRAFT to PUBLISHED',
    created_at: '2026-11-23T14:30:00Z',
  },
  {
    id: 'log-2',
    user_email: 'sifat@traversebd.com',
    user_role: 'ADMIN',
    action: 'PRICE_UPDATED',
    resource: 'coxs-bazar-marine-drive-retreat',
    details: 'Updated price to 8,500 BDT',
    created_at: '2026-11-23T13:45:00Z',
  },
  {
    id: 'log-3',
    user_email: 'hafizur@traversebd.com',
    user_role: 'SUPER_ADMIN',
    action: 'ADMIN_INVITED',
    resource: 'soha@traversebd.com',
    details: 'Created admin account with role ADMIN',
    created_at: '2026-11-20T10:00:00Z',
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  author: string;
  gear: string;
  category: 'coastal' | 'hills' | 'forests' | 'riverine' | 'cultural';
  desc: string;
  alt: string;
  imageUrl: string;
  aspect?: string;
  badge?: string;
  sort_order?: number;
  status?: 'published' | 'draft';
  created_at?: string;
}

export interface BlogItem {
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

export interface SiteSettings {
  hero_title: string;
  hero_subtitle: string;
  phone_hotline: string;
  whatsapp_number: string;
  contact_email: string;
  operations_mode: string;
  stat_travelers: string;
  stat_rating: string;
  stat_certified: string;
  social_facebook?: string;
  social_messenger?: string;
  social_instagram?: string;
  social_youtube?: string;
  social_whatsapp_group?: string;
  corporate_inquiry_notice?: string;
  hero_featured_badge?: string;
  hero_featured_title?: string;
  hero_featured_subtitle?: string;
  hero_featured_price?: string;
  hero_featured_location?: string;
  hero_featured_image?: string;
  hero_featured_link?: string;
}

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  hero_title: 'Discover the Untamed Beauty of Bengal & Beyond',
  hero_subtitle: 'Customized corporate tours, student adventures, luxury mangrove houseboats & seamless transit ticketing crafted for lifelong memories across riverways, cloud peaks, and marine horizons.',
  phone_hotline: '01627-444330',
  whatsapp_number: '8801627444330',
  contact_email: 'info@traversebd.com',
  operations_mode: '100% Online Operations (Nationwide Bangladesh)',
  stat_travelers: '15,000+',
  stat_rating: '4.95 / 5.0',
  stat_certified: '100% Certified',
  social_facebook: 'https://www.facebook.com/profile.php?id=61568715145902',
  social_messenger: 'https://www.facebook.com/messages/t/431751336697364',
  social_instagram: 'https://instagram.com/traversebd',
  social_youtube: 'https://youtube.com/@traversebd',
  social_whatsapp_group: 'https://chat.whatsapp.com/traversebd',
  corporate_inquiry_notice: 'Official VAT invoices, corporate retreat buyouts & dedicated trip coordinators available.',
  hero_featured_badge: 'Featured Haven',
  hero_featured_title: 'Saint Martin Coral Bay',
  hero_featured_subtitle: 'Curated Beach Expedition',
  hero_featured_price: 'BDT 9,200',
  hero_featured_location: 'Dhaka • Cox • Saint Martin',
  hero_featured_image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop',
  hero_featured_link: '/packages',
};

export const INITIAL_BLOGS: BlogItem[] = [
  {
    id: 'b1',
    slug: 'coxs-bazar-travel-guide',
    title_en: "Ultimate Travel Guide to Cox's Bazar in 2026",
    excerpt_en: 'Everything you need to know about hotels, local seafood, Marine Drive drives, and quiet beaches.',
    content_en: "Cox's Bazar offers much more than just the main crowded beach. Traveling down the 80km Marine Drive to Inani and Teknaf opens up hidden coral coasts, secluded fishing hamlets, and dramatic ocean viewpoints...",
    cover_image_url: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop',
    destination_slug: 'coxs-bazar',
    read_time: '6 min read',
    status: 'published',
    published_at: '2026-11-15T09:00:00Z',
  },
  {
    id: 'b2',
    slug: 'sajek-cloud-valley-tips',
    title_en: 'How to Catch the Sea of Clouds in Sajek Valley',
    excerpt_en: 'The best months, cottage balcony tips, and early morning viewpoints at Konglak Para.',
    content_en: 'The magic of Sajek Valley lies in its elevation and geographical pocket that traps morning fog and clouds. Between October and February, waking up at 5:30 AM guarantees an ocean of white cotton clouds...',
    cover_image_url: 'https://images.unsplash.com/photo-1628178122971-45607ef3c428?q=80&w=1200&auto=format&fit=crop',
    destination_slug: 'sajek-valley',
    read_time: '5 min read',
    status: 'published',
    published_at: '2026-11-18T10:00:00Z',
  },
  {
    id: 'b3',
    slug: 'sundarbans-wildlife-houseboat-guide',
    title_en: 'Deep in the Mangroves: Complete Guide to Sundarbans Houseboat Cruises',
    excerpt_en: 'Navigating tidal creeks, spotting Royal Bengal tigers and spotted deer from watchtowers.',
    content_en: 'The UNESCO World Heritage mangrove forest of Sundarbans is best explored on an eco-houseboat cruising through Kotka and Kochikhali wildlife sanctuaries...',
    cover_image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    destination_slug: 'sundarbans',
    read_time: '7 min read',
    status: 'published',
    published_at: '2026-11-20T11:00:00Z',
  },
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Azure Waters & Timber Dinghies',
    location: "Saint Martin's Island, Bay of Bengal",
    author: 'Tanvir Chowdhury',
    gear: 'Sony A7R V • 24mm f/2.8',
    category: 'coastal',
    desc: 'Moored handcrafted timber trawlers floating on the azure shallows of Saint Martin Island during peak neap tide.',
    alt: 'High resolution aerial photograph of Saint Martin island Bangladesh with crystal clear aquamarine turquoise waters, colorful moored wooden fishing boats anchored along the shallow coral reef sandbank.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCronGxuKPy8fONsNSjrm3agcaahqrCdxUKpcuQ9p2biYutpSedPOJNqDpSXBlUiwe8VjJcsv8UJL4DvQ-mYIuuT37S-S_uom6eKXCcP3_RUO7-PkEs8n7nxyyva_VilQGjM4BW9k5m4tXRPv5yl0tzTLsTGTFgEFvROSEQR8NBmOkOsFShNx2LGobEiJR6lVJb5Lagagdb8JPdutMtfE24oY8Aw_5N80NaOn1OcTQq',
    aspect: 'aspect-[4/5]',
    badge: 'Coastal & Marine',
    sort_order: 1,
    created_at: '2026-11-20T08:00:00Z',
  },
  {
    id: 'gal-2',
    title: 'Sea of Morning Clouds',
    location: 'Konglak Para, Sajek Valley',
    author: 'Farzana Rahman',
    gear: 'Fujifilm X-T5 • 18-55mm',
    category: 'hills',
    desc: 'Dawn illumination breaking across an undulating white cloud blanket engulfing the lush hills of Rangamati.',
    alt: 'Breathtaking wide landscape of Sajek Valley Konglak Para peak at sunrise, dense ocean of fluffy white cumulus clouds rolling through rolling emerald green mountain valleys.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASAT_2ttF1EyaMdO--79s3RjFjm94mRlfHKISQfnmq7WWHgd9o0iMtg-lpW3CQf3X4qHxoeLfrJ0_bHiTuNZBmmTLQH4GYjq5-AMJNJCs_N0zhOWzHZ3UCV5iD3rOcbuyjcmEUFlAMkmL3MP0fg_7iBhHCU_AYFzLfY93y9QOA478jwkysmnbF_JFun5dOJ3FsnnFL0ZqH33k1UD6PpnqZlYuJpO4ms9QR2UvF6RS8',
    aspect: 'aspect-[3/4]',
    badge: 'Hill Tracts & Clouds',
    sort_order: 2,
    created_at: '2026-11-20T09:00:00Z',
  },
  {
    id: 'gal-3',
    title: 'Mist on the Mangrove Shore',
    location: 'Kotka Wildlife Sanctuary, Sundarbans',
    author: 'Ashfaqul Alam',
    gear: 'Canon R5 • 400mm f/4',
    category: 'forests',
    desc: 'Spotted chital deer and wildlife corridors caught in the silent morning mist of the Sundarbans biosphere.',
    alt: 'Atmospheric documentary wildlife photo in the Sundarbans mangrove forest, spotted chital deer drinking cautiously at the edge of a misty tidal river canal.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ltl9s44tZznBR-chQOfzFdlgvz929W8Mv59Lbl7Py1Lr7y6LCvHCfN74TcFjXFUBcWwD7cC4m3HSQ4_xEnvfNGnuYoKEHwy3V1VVL983K7o90EC8kicT3vgAjNbG0mzqFhjISDf2YA_tADVLiqQO6B6_p1PtCtTtM3baPuWe4GiI0YxU0NxOmvoPCiMQdozpgA9V9qywzFe3wycNheWw-0EuOtV_0cDtoW9qivz3',
    aspect: 'aspect-[16/10]',
    badge: 'Forests & Wildlife',
    sort_order: 3,
    created_at: '2026-11-20T10:00:00Z',
  },
  {
    id: 'gal-4',
    title: 'The Emerald Mirror Basin',
    location: 'Tanguar Haor, Sunamganj',
    author: 'Saifuddin Manik',
    gear: 'Nikon Z7 II • 35mm f/1.8',
    category: 'riverine',
    desc: 'Pure crystal freshwater reflections of Meghalaya foothills spreading silently across the Sunamganj wetlands.',
    alt: 'Pristine reflection of lush green Meghalaya hills on the mirror surface of Tanguar Haor freshwater wetland, solitary wooden boat gliding slowly.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDG6Dd8IWxXIQCgoGPVK2A8Ew6i30pbuY7-t5XeijXtnU5rXRt5c2p1IM0UDdMn2N9qhAAzssJe0_dENnsWHJVyiKCQjJSckF7qdD4LavWm6ES02sqU8g6bdR-1eAXhtuBF58XZL0C-WICt-Lgmh8CE28v8LLqajnefl-pAGEtStWSJeJYWrDwnZKlZETREg82OMerpo5gSBBUix3xr_qZtGNhcp5ILq_DjhepxhGlF',
    aspect: 'aspect-[4/3]',
    badge: 'Riverine & Haors',
    sort_order: 4,
    created_at: '2026-11-20T11:00:00Z',
  },
  {
    id: 'gal-5',
    title: 'Twilight Coral Outcrops',
    location: "Inani Beach, Cox's Bazar",
    author: 'Kazi Nabil',
    gear: 'Sony A1 • 16-35mm GM',
    category: 'coastal',
    desc: "Fossilized shoreline boulders weathering the long exposure surge along the world's longest unbroken beach.",
    alt: "Dramatic dusk seascape at Inani Beach Cox's Bazar, rugged ancient coral boulders jutting out from damp golden sand, foaming ocean waves.",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgEKe7tppNfuh1Sbs_v49LQUwlZwoKAX8vUxsYFWIcShtRYia_8P1Ki3u2uJS8yffGLXVgIAwHoAI-X8wBuSbFGQiJM2pa1gtnOSMmSky2KIp46083ecfUbo3AxfnAgytdqp2LsiDq8GB_BBjiSokFAUHsv9Gdl2BYNkMBbvpMaSCI6Xp7lA7qD8BZfX1tZL1hc_Vmb_DsUuNvcg0_MCxAMbCE-uP56rZUoElqAYnY',
    aspect: 'aspect-[3/4]',
    badge: 'Coastal & Marine',
    sort_order: 5,
    created_at: '2026-11-20T12:00:00Z',
  },
  {
    id: 'gal-6',
    title: 'Floating Guava Flotilla',
    location: 'Bhimruli, Barisal Backwaters',
    author: 'Mahbub Hassan',
    gear: 'DJI Mavic 3 Pro • 24mm eq.',
    category: 'riverine',
    desc: 'Canal traffic woven together by hundreds of wooden skiffs trading freshly picked organic guavas at dawn.',
    alt: 'Top-down vibrant view of the floating guava market in Barisal river canal, dozens of handcrafted slim wooden canoes piled high with fresh green guavas.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzcg2FTyVuVfLuv68C_oE_cS36er71iM7Gql8vXjKtMKpM0Icyy3MOaGq7P3XStaT1CcoR4wVaSKywedhpqmgx3bfrC6TRcpWub3sQu5F0_9AqMQSMa7oLKgDmB9zVA4F5MusFCBWKwL21jKN4DfjVubPaZBJxRPE3xd1YsamKY4hfyy0rgX9Eo9DOp3olb4SBHlBfkAJk4ir5kRQMCM1dX1isLMhUU6cVpUGw6Fjp',
    aspect: 'aspect-[4/5]',
    badge: 'Riverine & Haors',
    sort_order: 6,
    created_at: '2026-11-20T13:00:00Z',
  },
  {
    id: 'gal-7',
    title: 'Jungle Falls of Amiakhum',
    location: 'Amiakhum Falls, Thanchi, Bandarban',
    author: 'Shakil Ahmed',
    gear: 'Sony A7 IV • 20mm f/1.8',
    category: 'hills',
    desc: 'Remote cascading waterways carved deep through ancient limestone gorges in the deepest wilderness of Thanchi.',
    alt: 'Magnificent cascading Amiakhum waterfall nestled deep in the untamed jungle gorges of Bandarban, roaring white water plunging across giant mossy rock boulders.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMpwZJ5DUyskB5vN3LB6mWzd4Mv2JUrRRnkuyIXEK4hrGq5SMW35VBZAyM1yPxrohcZrnbZ-iCUlqYoovwGDNJ86bTDjhBm5FAiCM_g8a-fgu2K3vltPD5_qZMz-V3AA-ksb1OZmnHz180-eUMH2Qs4mpmJlnlzlcjGvZk4qmW5JHturnEA-AYxLTF-O_BGRsx6nqJL2g0dSwXARGaKZHbewq8ZjxvQDfGeT7SDmh2',
    aspect: 'aspect-[9/16]',
    badge: 'Hill Tracts & Clouds',
    sort_order: 7,
    created_at: '2026-11-20T14:00:00Z',
  },
  {
    id: 'gal-8',
    title: 'Dawn in the Valley of Tea',
    location: 'Finlay Tea Estate, Sreemangal',
    author: 'Nusrat Jahan',
    gear: 'Leica Q2 • 28mm Summilux',
    category: 'forests',
    desc: 'Velvet manicured terraces bathed in gentle morning moisture across the tea capital of Sylhet division.',
    alt: 'Immaculate rolling emerald green tea garden hills in Sreemangal during early dawn, soft delicate veil of low ground fog weaving through the manicured tea bushes.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2-AfRgmZdaMWSEoJAfAyCeiUikqqYHVjeK9reOPZfjorp0EONSkd271ovyKOuJCCRRndzNQAfVSAILlWLteSTAvurfMuCmSCmBo3__Eg6yVBLetzmJlRz768IMTQKqcX1mqH7GcVcGgvI5IZObOEDEpgvcb-NVNmqL1CnlgZRt5Bhe6Hwcq4-jWzGDKA-IYZa4HJNDMKG_y0Hto9ir23_6jXM9B4ZnYDgsfXXDDVY',
    aspect: 'aspect-[4/3]',
    badge: 'Forests & Wildlife',
    sort_order: 8,
    created_at: '2026-11-20T15:00:00Z',
  },
  {
    id: 'gal-9',
    title: 'Southernmost Coral Edge',
    location: "Chhera Dwip, Saint Martin's",
    author: 'Rafeul Kabir',
    gear: 'Canon 5D IV • 24-70mm',
    category: 'coastal',
    desc: "Porous fossil reefs meeting open swell at the geographic extremity of Bangladesh's sovereign waters.",
    alt: "Rugged solitary landscape of Chhera Dwip southernmost tip of Bangladesh, jagged ancient fossilized coral reefs protruding into clear tropical turquoise tide pools.",
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbGmnka70uRi-8oOVGIao0WVjUndfBlbN3isyu9haXcLxW7CDc_-4Y0VXtkQAl6_uJXisnzWWSbCwqNaoXRPbnfKg0tTMC8LueX40mXvUw0yY93CWi2o_nCtgjuMKEjYF4Ny_GTQW_9KMzm5AQjv4Hljv8GQslx-_ljDDOA0n22UBHXBk1HDnuVAWfiyIvdtUWXMG3cm3fRYbFcUipdANLlvGsEy1VYo3OcKgE6Gph',
    aspect: 'aspect-[16/10]',
    badge: 'Coastal & Marine',
    sort_order: 9,
    created_at: '2026-11-20T16:00:00Z',
  },
  {
    id: 'gal-10',
    title: 'Floating Above the World',
    location: 'Nilgiri, Bandarban',
    author: 'Zaid Bin Khalid',
    gear: 'Nikon Z6 II • 50mm f/1.4',
    category: 'cultural',
    desc: 'High altitude ridge cabins floating effortlessly over sea-like cumulus formations at 2200 feet.',
    alt: 'Dreamy elevation view of Nilgiri mountain resort cottage perched high on a cliff top at 2200 feet above sea level, billowing fluffy cloud blankets rolling underneath.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6huiY8lX9w1C9yO5XBiGgO1CWKPEfVUrBm8r6qyQesxRdLfkwzcwTay-PFK2g2wD_sHypnN564FYc_kfj56-lif3zKx-r8id6NrEqUpuQ-ci3QpZj7xxweV4mzyhz4Jj_U6XftXBB_ifB7KN7x_4glcXyjnKWnKhFpUbC7rTVxmHLwLdRZVo4yPh5rstrLYarY2eNJhESXJ3NAcmc-077CWNpUhnxxXpWrxO2gG2v',
    aspect: 'aspect-[4/5]',
    badge: 'Cultural & Heritage',
    sort_order: 10,
    created_at: '2026-11-20T17:00:00Z',
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  location: string;
  avatarUrl: string;
  quote: string;
  rating: number;
  package_title: string;
  package_slug: string;
  date: string;
  verified: boolean;
  status: 'published' | 'draft';
}

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Tanvir Ahmed',
    role: 'Corporate Team Lead (Grameenphone)',
    location: 'Uttara, Dhaka',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=250&auto=format&fit=crop',
    quote: 'Our 35-person corporate retreat from Dhaka to Sajek Valley was coordinated down to every minute. Dedicated 4x4 Chander Gari, private resort buyout at Konglak, and delicious Pahari meals. Traverse BD is undoubtedly our trusted travel partner!',
    rating: 5,
    package_title: 'Sajek Valley Cloud Kingdom Escape',
    package_slug: 'sajek-valley-cloud-expedition',
    date: 'November 2025',
    verified: true,
    status: 'published',
  },
  {
    id: 't2',
    name: 'Nusrat Jahan & Tahsin',
    role: 'Family Vacationers',
    location: 'Panchlaish, Chattogram',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop',
    quote: 'Visiting Saint Martin with my toddler and elderly parents felt completely effortless. Traverse BD pre-booked the VIP ship tickets from Teknaf and an eco-resort right beside the west beach. Truly memorable experience!',
    rating: 5,
    package_title: 'Saint Martin Coral Island Cruise',
    package_slug: 'saint-martin-coral-cruise',
    date: 'October 2025',
    verified: true,
    status: 'published',
  },
  {
    id: 't3',
    name: 'Farhan Chowdhury',
    role: 'Travel Blogger & Photographer',
    location: 'Zindabazar, Sylhet',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop',
    quote: 'The premium wooden houseboat expedition across Tanguar Haor and Shimul Bagan was breathtaking. Silent solar cruise, fresh local duck curry, and stargazing at Tekerghat. Best weekend journey of my life.',
    rating: 5,
    package_title: 'Tanguar Haor Luxury Houseboat Cruise',
    package_slug: 'tanguar-haor-luxury-houseboat',
    date: 'September 2025',
    verified: true,
    status: 'published',
  },
  {
    id: 't4',
    name: 'Dr. Sabrina Karim',
    role: 'Cardiologist & Wildlife Enthusiast',
    location: 'Dhanmondi, Dhaka',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop',
    quote: 'Silent early dawn country boat rowing into Kotka canals with armed forest guards and veteran naturalist escorts. We spotted spotted deer, kingfishers, and fresh Bengal tiger pugmarks. World-class safety and service.',
    rating: 5,
    package_title: 'Sundarbans Deep Mangrove Safari',
    package_slug: 'sundarbans-deep-mangrove-safari',
    date: 'November 2025',
    verified: true,
    status: 'published',
  },
  {
    id: 't5',
    name: 'Mahir Faisal',
    role: 'Banker & Trekking Enthusiast',
    location: 'Mirpur DOHS, Dhaka',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=250&auto=format&fit=crop',
    quote: 'Climbing through the misty clouds of Nilgiri and exploring Chimbuk Hill was made seamless with our experienced local guide. Pricing was completely transparent with zero hidden costs. Highly recommended!',
    rating: 5,
    package_title: 'Bandarban & Nilgiri Summit Expedition',
    package_slug: 'bandarban-nilgiri-summit',
    date: 'December 2025',
    verified: true,
    status: 'published',
  },
  {
    id: 't6',
    name: 'Anika Tabassum',
    role: 'Product Designer',
    location: 'Sonadanga, Khulna',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
    quote: 'Peaceful escape among the lush tea estates of Sreemangal and morning trail inside Lawachara rain forest. The 7-color tea tasting and boutique resort stay were memorable highlights.',
    rating: 5,
    package_title: 'Sreemangal Tea Gardens & Lawachara Forest',
    package_slug: 'sreemangal-tea-gardens-lawachara',
    date: 'January 2026',
    verified: true,
    status: 'published',
  },
];

// In-Memory state store for local CRUD persistence
class AdminMemoryStore {
  public packages: Package[] = JSON.parse(JSON.stringify(MOCK_PACKAGES));
  public destinations: Destination[] = JSON.parse(JSON.stringify(MOCK_DESTINATIONS));
  public categories: Category[] = JSON.parse(JSON.stringify(MOCK_CATEGORIES));
  public gallery: GalleryItem[] = JSON.parse(JSON.stringify(INITIAL_GALLERY_ITEMS)).map((g: GalleryItem) => ({ ...g, status: 'published' }));
  public blogs: BlogItem[] = JSON.parse(JSON.stringify(INITIAL_BLOGS));
  public testimonials: Testimonial[] = JSON.parse(JSON.stringify(INITIAL_TESTIMONIALS));
  public siteSettings: SiteSettings = JSON.parse(JSON.stringify(INITIAL_SITE_SETTINGS));
  public users: AdminUser[] = JSON.parse(JSON.stringify(INITIAL_ADMIN_USERS));
  public auditLogs: AdminAuditLog[] = JSON.parse(JSON.stringify(INITIAL_AUDIT_LOGS));

  public addAuditLog(
    user_email: string,
    user_role: 'ADMIN' | 'SUPER_ADMIN',
    action: string,
    resource: string,
    details: string
  ) {
    this.auditLogs.unshift({
      id: `log-${Date.now()}`,
      user_email,
      user_role,
      action,
      resource,
      details,
      created_at: new Date().toISOString(),
    });
    if (this.auditLogs.length > 50) {
      this.auditLogs = this.auditLogs.slice(0, 50);
    }
  }
}

// Global singleton across hot reloads in development
const globalStore = global as unknown as { __adminMemoryStore?: AdminMemoryStore };
if (!globalStore.__adminMemoryStore) {
  globalStore.__adminMemoryStore = new AdminMemoryStore();
}

export const adminStore = globalStore.__adminMemoryStore;
