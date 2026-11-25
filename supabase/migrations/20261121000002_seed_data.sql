-- =====================================================================
-- TraverseBD Seed Data Migration (Authentic Bangladesh Tourism)
-- Version: 1.0.0
-- Reference: TraverseBD Master PRD v1.0
-- =====================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, slug, name_en, name_bn, description_en, description_bn, sort_order, status)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'beach-coastal', 'Beach & Coastal', 'সমুদ্র সৈকত ও উপকূলীয়', 'Explore the world''s longest unbroken sandy sea beach and pristine marine islands.', 'বিশ্বের দীর্ঘতম অবিচ্ছিন্ন বালুকাময় সমুদ্র সৈকত এবং প্রবাল দ্বীপ অন্বেষণ করুন।', 1, 'published'),
    ('c2222222-2222-2222-2222-222222222222', 'hill-mountain', 'Hill & Mountain', 'পাহাড় ও উপত্যকা', 'Breathtaking valleys, clouds, tribal cultures, and misty mountain ranges.', 'মেঘের উপত্যকা, পাহাড়ের সবুজ সৌন্দর্য এবং পাহাড়ি সংস্কৃতির মোহময় অভিজ্ঞতা।', 2, 'published'),
    ('c3333333-3333-3333-3333-333333333333', 'forest-wildlife', 'Forest & Wildlife', 'বন ও বন্যপ্রাণী', 'Discover the Royal Bengal Tiger, mangrove labyrinths, and rainforests.', 'ম্যানগ্রোভ বনাঞ্চল, রয়েল বেঙ্গল টাইগার ও জীববৈচিত্র্যের রোমাঞ্চকর জগৎ।', 3, 'published'),
    ('c4444444-4444-4444-4444-444444444444', 'heritage-culture', 'Heritage & Culture', 'ঐতিহ্য ও সংস্কৃতি', 'Centuries-old archaeological wonders, historic mosques, and tea heritage.', 'প্রাচীন প্রত্নতাত্ত্বিক নিদর্শন, ঐতিহাসিক স্থাপত্য এবং চা-বাগান সংস্কৃতি।', 4, 'published')
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED DESTINATIONS
INSERT INTO public.destinations (id, slug, name_en, name_bn, region, short_description_en, short_description_bn, full_description_en, full_description_bn, cover_image_url, highlights, travel_tips, status, is_featured)
VALUES
    (
        'd1111111-1111-1111-1111-111111111111',
        'coxs-bazar',
        'Cox''s Bazar',
        'কক্সবাজার',
        'Chattogram Division',
        'The world''s longest natural unbroken sea beach stretching over 120 kilometers.',
        '১২০ কিলোমিটার বিস্তৃত বিশ্বের দীর্ঘতম প্রাকৃতিক বালুকাময় সমুদ্র সৈকত।',
        'Cox''s Bazar is the tourism capital of Bangladesh, famous for its magnificent sea beach, stunning sunsets at Laboni and Kolatoli, Marine Drive drives, and Himchari waterfalls.',
        'কক্সবাজার বাংলাদেশের প্রধান পর্যটন কেন্দ্র, যা এর অন্তহীন সৈকত, লাবণী ও কলাতলী পয়েন্টের সূর্যাস্ত, চোখ জুড়ানো মেরিন ড্রাইভ এবং হিমছড়ি ঝর্ণার জন্য বিশ্বখ্যাত।',
        'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop',
        ARRAY['120km unbroken sea beach', 'Scenic Marine Drive route', 'Himchari National Park', 'Inani Coral Stone Beach'],
        ARRAY['Avoid swimming during high tide warning flags', 'Book eco-resorts near Inani for quieter surroundings'],
        'published',
        true
    ),
    (
        'd2222222-2222-2222-2222-222222222222',
        'sajek-valley',
        'Sajek Valley',
        'সাজেক ভ্যালি',
        'Rangamati Hill District',
        'Known as the Roof of Rangamati, where clouds float gently through the cottages.',
        'মেঘের উপত্যকা হিসেবে পরিচিত, যেখানে তুলোর মতো মেঘ কটেজের বারান্দায় ভেসে বেড়ায়।',
        'Located deep within the lush green hills of the Chittagong Hill Tracts, Sajek Valley sits at an elevation of 1,800 feet above sea level. It offers sweeping panoramic views of the hills and valleys of Mizoram.',
        'রাঙ্গামাটির বাঘাইছড়ি উপজেলায় অবস্থিত সাজেক ভ্যালি সমুদ্রপৃষ্ঠ থেকে প্রায় ১,৮০০ ফুট উঁচুতে। এখানকার কাঠের কটেজে বসে মেঘ ছুঁয়ে দেখার অনুভূতি অতুলনীয়।',
        'https://images.unsplash.com/photo-1628178122971-45607ef3c428?q=80&w=1200&auto=format&fit=crop',
        ARRAY['Konglak Para highest peak', 'Sunrise above cloud blanket', 'Helipad sunset view', 'Authentic Bamboo Chicken'],
        ARRAY['Travel in Chander Gari army security escorts on time', 'Carry adequate cash as network and ATM services are limited'],
        'published',
        true
    ),
    (
        'd3333333-3333-3333-3333-333333333333',
        'sreemangal-sylhet',
        'Sreemangal & Sylhet',
        'শ্রীমঙ্গল ও সিলেট',
        'Sylhet Division',
        'The tea capital of Bangladesh surrounded by lush green tea estates and wetlands.',
        'সবুজ চা-বাগান, রাতারগুল সোয়াম্প ফরেস্ট ও প্রাকৃতিক ঝর্ণার নৈসর্গিক ভূমি।',
        'Sreemangal is known as the tea capital of Bangladesh, boasting terraced green hills, Lawachara National Park rainforest, Madhabpur Lake, and rich birdlife.',
        'শ্রীমঙ্গল বাংলাদেশের চায়ের রাজধানী। এখানে রয়েছে মাইলের পর মাইল বিস্তৃত সবুজ চা-বাগান, লাউয়াছড়া রেইনফরেস্ট, মাধবপুর লেক এবং বিখ্যাত সাত রঙের চা।',
        'https://images.unsplash.com/photo-1598890777032-bde13fbe3493?q=80&w=1200&auto=format&fit=crop',
        ARRAY['Endless green tea garden estates', 'Lawachara Rainforest trail', 'Ratargul Freshwater Swamp Forest', 'Traditional 7-layer tea experience'],
        ARRAY['Hire a registered local guide for deep jungle trails in Lawachara', 'Early morning is best for bird watching'],
        'published',
        true
    ),
    (
        'd4444444-4444-4444-4444-444444444444',
        'sundarbans',
        'Sundarbans Mangrove Forest',
        'সুন্দরবন ম্যানগ্রোভ বন',
        'Khulna Division',
        'The world''s largest tidal halophytic mangrove forest and UNESCO World Heritage site.',
        'ইউনেস্কো বিশ্ব ঐতিহ্যবাহী বিশ্বের বৃহত্তম ম্যানগ্রোভ বন ও রয়েল বেঙ্গল টাইগারের আবাসস্থল।',
        'The Sundarbans delta spans rivers, creeks, and estuaries teeming with spotted deer, estuarine crocodiles, river dolphins, and the majestic Bengal tiger.',
        'সুন্দরবন পৃথিবীর বৃহত্তম শ্বাসমূলীয় বন। নদী ও খালের আঁকাবাঁকা পথে বিলাসবহুল জাহাজে ঘুরে বুনো হরিণ, বানর, কুমির আর রয়েল বেঙ্গল টাইগারের পদচিহ্ন দেখার অনন্য অভিজ্ঞতা।',
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
        ARRAY['Kotka Wildlife Sanctuary', 'Harbaria Eco-tourism Center', 'Karamjal crocodile breeding center', 'Forest boat safari through narrow canals'],
        ARRAY['Always stay with armed forest guards during land walks', 'Choose eco-cruises with sound-dampened engines'],
        'published',
        false
    )
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED PACKAGES
INSERT INTO public.packages (
    id, slug, destination_id, category_id,
    title_en, title_bn,
    short_description_en, short_description_bn,
    full_description_en, full_description_bn,
    price_mode, price_bdt, duration_days, duration_nights,
    cover_image_url, status, is_featured, is_trending
)
VALUES
    (
        'a1111111-1111-1111-1111-111111111111',
        'coxs-bazar-coastal-retreat',
        'd1111111-1111-1111-1111-111111111111',
        'c1111111-1111-1111-1111-111111111111',
        'Cox''s Bazar Luxury Beach Retreat',
        'কক্সবাজার লাক্সারি বিচ রিট্রিট',
        'Experience 3 days and 2 nights of coastal serenity with sea-view resort accommodation.',
        '৩ দিন ২ রাতের সমুদ্র দর্শন, মেরিন ড্রাইভ ভ্রমণ এবং ইনানী প্রবাল সৈকতের রিলাক্সিং ট্যুর।',
        'Unwind along the golden sands of Cox''s Bazar. This package includes premium resort stay, open-air Jeep drive along the Marine Drive, fresh seafood dinners, and visit to Inani coral beach and Himchari national park.',
        'কক্সবাজারের সোনালী বালুকাবেলায় ৩ দিন ২ রাতের আনন্দময় ছুটি। বিলাসবহুল রিসোর্টে থাকার ব্যবস্থা, মেরিন ড্রাইভে খোলা জিপে রোমাঞ্চকর রাইড এবং ইনানী সৈকত ভ্রমণ অন্তর্ভুক্ত।',
        'fixed',
        8500,
        3,
        2,
        'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop',
        'published',
        true,
        true
    ),
    (
        'a2222222-2222-2222-2222-222222222222',
        'sajek-valley-cloud-expedition',
        'd2222222-2222-2222-2222-222222222222',
        'c2222222-2222-2222-2222-222222222222',
        'Sajek Valley Cloud Expedition',
        'সাজেক ভ্যালি ক্লাউড এক্সপিডিশন',
        'Touch the clouds from wooden hill-resort cottages with scenic Chander Gari jeep rides.',
        'পাহাড়ের কটেজে মেঘের মেলা, চাঁদের গাড়িতে পাহাড়ি রোমাঞ্চ এবং কংলাক পাহাড়ের চূড়া ভ্রমণ।',
        'Travel high into the mountains of Sajek. Catch the mesmerizing morning sea of clouds from your private balcony, trek up to Konglak Para, and enjoy authentic tribal delicacies.',
        'মেঘের দেশ সাজেকে ৩ দিন ২ রাতের অবিস্মরণীয় ট্রিপ। কটেজের বারান্দা থেকে মেঘের সমুদ্র দেখা, পাহাড়ি চাঁদের গাড়ির রোমাঞ্চ এবং ব্যাম্বু চিকেনের স্বাদ গ্রহণ।',
        'starting_from',
        7500,
        3,
        2,
        'https://images.unsplash.com/photo-1628178122971-45607ef3c428?q=80&w=1200&auto=format&fit=crop',
        'published',
        true,
        true
    ),
    (
        'a3333333-3333-3333-3333-333333333333',
        'sreemangal-tea-garden-escape',
        'd3333333-3333-3333-3333-333333333333',
        'c4444444-4444-4444-4444-444444444444',
        'Sreemangal Tea Garden Escape',
        'শ্রীমঙ্গল গ্রিন টি গার্ডেন এস্কেপ',
        'A refreshing 2-day nature getaway through tea estates and rainforest trails.',
        'চা বাগানের সবুজ গালিচায় ২ দিন ১ রাতের প্রশান্তিময় ছুটি ও লাউয়াছড়া বনাঞ্চল ভ্রমণ।',
        'Explore scenic tea estates, walk through the Lawachara national rainforest canopy, and savor legendary 7-color tea in Sreemangal.',
        'সবুজ প্রকৃতির মাঝে নিজেকে রিফ্রেশ করার জন্য পারফেক্ট ২ দিন ১ রাতের ট্যুর। চা বাগান, মাধবপুর লেক ও লাউয়াছড়া জাতীয় উদ্যান দর্শন।',
        'fixed',
        5200,
        2,
        1,
        'https://images.unsplash.com/photo-1598890777032-bde13fbe3493?q=80&w=1200&auto=format&fit=crop',
        'published',
        false,
        false
    )
ON CONFLICT (slug) DO NOTHING;

-- 4. SEED ITINERARY DAYS FOR COX''S BAZAR PACKAGE
INSERT INTO public.itinerary_days (package_id, day_no, title_en, title_bn, description_en, description_bn)
VALUES
    (
        'a1111111-1111-1111-1111-111111111111',
        1,
        'Arrival & Sunset at Laboni Beach',
        'আগমন ও লাবণী বিচে সূর্যাস্ত',
        'Check into resort, refresh, and spend the evening enjoying the breathtaking ocean sunset and beach snacks.',
        'রিসোর্টে চেক-ইন ও বিশ্রাম শেষে বিকেলে সমুদ্র সৈকতে সময় কাটানো এবং সূর্যাস্ত উপভোগ।'
    ),
    (
        'a1111111-1111-1111-1111-111111111111',
        2,
        'Marine Drive & Inani Coral Beach',
        'মেরিন ড্রাইভ ও ইনানী প্রবাল সৈকত',
        'Exhilarating open-air Jeep drive along the world-famous Marine Drive road, visiting Himchari waterfalls and Inani beach.',
        'খোলা জিপে মেরিন ড্রাইভ রোড ভ্রমণ, হিমছড়ি পাহাড় ও ঝর্ণা এবং ইনানী কোরাল বিচের প্রাকৃতিক রূপ দর্শন।'
    ),
    (
        'a1111111-1111-1111-1111-111111111111',
        3,
        'Local Crafts & Return Journey',
        'বার্মিজ মার্কেট শপিং ও বিদায়',
        'Visit the traditional Burmese market for dry fruits and local handicrafts before departing.',
        'সকালের নাস্তা শেষে বার্মিজ মার্কেটে স্থানীয় স্যুভেনির কেনাকাটা এবং ঢাকার উদ্দেশ্যে যাত্রা।'
    )
ON CONFLICT (package_id, day_no) DO NOTHING;

-- 5. SEED PACKAGE ITEMS (Inclusions, Exclusions, Notes)
INSERT INTO public.package_items (package_id, type, text_en, text_bn, sort_order)
VALUES
    ('a1111111-1111-1111-1111-111111111111', 'included', '2 Nights 3-star AC sea-facing resort accommodation', '৩ তারকা বিশিষ্ট সি-ভিউ রিসোর্টে ২ রাত থাকার ব্যবস্থা', 1),
    ('a1111111-1111-1111-1111-111111111111', 'included', 'Daily buffet breakfast at resort', 'রিসোর্টে প্রতিদিনের বুফে ব্রেকফাস্ট', 2),
    ('a1111111-1111-1111-1111-111111111111', 'included', 'Reserved open Jeep for Marine Drive and Inani excursion', 'মেরিন ড্রাইভ ও ইনানী ভ্রমণের জন্য রিজার্ভ খোলা জিপ', 3),
    ('a1111111-1111-1111-1111-111111111111', 'excluded', 'Dhaka-Cox''s Bazar intercity bus or airfare', 'ঢাকা-কক্সবাজার যাতায়াত বাস বা বিমান ভাড়া', 1),
    ('a1111111-1111-1111-1111-111111111111', 'excluded', 'Personal shopping and extra room charges', 'ব্যক্তিগত কেনাকাটা ও অতিরিক্ত রুম চার্জ', 2),
    ('a1111111-1111-1111-1111-111111111111', 'note', 'Carry national ID card or passport copy for resort registration.', 'রিসোর্ট রেজিস্ট্রেশনের জন্য জাতীয় পরিচয়পত্র বা পাসপোর্টের কপি সঙ্গে রাখুন।', 1)
ON CONFLICT DO NOTHING;

-- 6. SEED PACKAGE DEPARTURES (Informational seat counts)
INSERT INTO public.package_departures (package_id, departure_date, capacity, available_seats, status)
VALUES
    ('a1111111-1111-1111-1111-111111111111', '2026-12-05', 20, 8, 'available'),
    ('a1111111-1111-1111-1111-111111111111', '2026-12-12', 20, 3, 'few_seats'),
    ('a1111111-1111-1111-1111-111111111111', '2026-12-19', 20, 0, 'sold_out'),
    ('a2222222-2222-2222-2222-222222222222', '2026-12-08', 14, 6, 'available'),
    ('a2222222-2222-2222-2222-222222222222', '2026-12-15', 14, 2, 'few_seats')
ON CONFLICT DO NOTHING;

-- 7. SEED SITE SETTINGS
INSERT INTO public.site_settings (key, value, description)
VALUES
    ('contact_info', '{"phone": "+8801700000000", "email": "info@traversebd.com", "address": "Banani, Dhaka, Bangladesh"}'::jsonb, 'Official contact phone, email and office address'),
    ('whatsapp_config', '{"number": "8801700000000", "default_message_en": "Hello TraverseBD, I want to inquire about a tour package.", "default_message_bn": "নমস্কার TraverseBD, আমি একটি ট্যুর প্যাকেজ সম্পর্কে জানতে চাচ্ছি।"}'::jsonb, 'WhatsApp click-to-chat configuration'),
    ('social_links', '{"facebook": "https://facebook.com/traversebd", "instagram": "https://instagram.com/traversebd", "youtube": "https://youtube.com/@traversebd"}'::jsonb, 'Official social media handles')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 8. SEED GALLERY IMAGES
INSERT INTO public.gallery_images (image_url, title, location, category, badge, status, sort_order)
VALUES
    ('https://lh3.googleusercontent.com/aida-public/AB6AXuASAT_2ttF1EyaMdO--79s3RjFjm94mRlfHKISQfnmq7WWHgd9o0iMtg-lpW3CQf3X4qHxoeLfrJ0_bHiTuNZBmmTLQH4GYjq5-AMJNJCs_N0zhOWzHZ3UCV5iD3rOcbuyjcmEUFlAMkmL3MP0fg_7iBhHCU_AYFzLfY93y9QOA478jwkysmnbF_JFun5dOJ3FsnnFL0ZqH33k1UD6PpnqZlYuJpO4ms9QR2UvF6RS8', 'Sea of Morning Clouds', 'Sajek Valley, Rangamati', 'hills', 'Sunrise Expedition', 'published', 1),
    ('https://lh3.googleusercontent.com/aida-public/AB6AXuCronGxuKPy8fONsNSjrm3agcaahqrCdxUKpcuQ9p2biYutpSedPOJNqDpSXBlUiwe8VjJcsv8UJL4DvQ-mYIuuT37S-S_uom6eKXCcP3_RUO7-PkEs8n7nxyyva_VilQGjM4BW9k5m4tXRPv5yl0tzTLsTGTFgEFvROSEQR8NBmOkOsFShNx2LGobEiJR6lVJb5Lagagdb8JPdutMtfE24oY8Aw_5N80NaOn1OcTQq', 'Azure Waters & Timber Dinghies', 'Saint Martin Island', 'coastal', 'Coral Shoreline', 'published', 2),
    ('https://lh3.googleusercontent.com/aida-public/AB6AXuD3ltl9s44tZznBR-chQOfzFdlgvz929W8Mv59Lbl7Py1Lr7y6LCvHCfN74TcFjXFUBcWwD7cC4m3HSQ4_xEnvfNGnuYoKEHwy3V1VVL983K7o90EC8kicT3vgAjNbG0mzqFhjISDf2YA_tADVLiqQO6B6_p1PtCtTtM3baPuWe4GiI0YxU0NxOmvoPCiMQdozpgA9V9qywzFe3wycNheWw-0EuOtV_0cDtoW9qivz3', 'Mist on the Mangrove Shore', 'Sundarbans Tiger Reserve', 'forest', 'UNESCO Heritage', 'published', 3),
    ('https://lh3.googleusercontent.com/aida-public/AB6AXuBgEKe7tppNfuh1Sbs_v49LQUwlZwoKAX8vUxsYFWIcShtRYia_8P1Ki3u2uJS8yffGLXVgIAwHoAI-X8wBuSbFGQiJM2pa1gtnOSMmSky2KIp46083ecfUbo3AxfnAgytdqp2LsiDq8GB_BBjiSokFAUHsv9Gdl2BYNkMBbvpMaSCI6Xp7lA7qD8BZfX1tZL1hc_Vmb_DsUuNvcg0_MCxAMbCE-uP56rZUoElqAYnY', 'The Emerald Mirror Basin', 'Sreemangal Tea Estates', 'forest', 'Rainforest Sanctuary', 'published', 4),
    ('https://lh3.googleusercontent.com/aida-public/AB6AXuA6huiY8lX9w1C9yO5XBiGgO1CWKPEfVUrBm8r6qyQesxRdLfkwzcwTay-PFK2g2wD_sHypnN564FYc_kfj56-lif3zKx-r8id6NrEqUpuQ-ci3QpZj7xxweV4mzyhz4Jj_U6XftXBB_ifB7KN7x_4glcXyjnKWnKhFpUbC7rTVxmHLwLdRZVo4yPh5rstrLYarY2eNJhESXJ3NAcmc-077CWNpUhnxxXpWrxO2gG2v', 'Twilight Coral Outcrops', 'Inani Beach, Cox’s Bazar', 'coastal', 'Marine Horizon', 'published', 5),
    ('https://lh3.googleusercontent.com/aida-public/AB6AXuCHXu_sxkrQ5bg4x1PXJ4JLV4lLgom0g5DvHdfP9yvwko07yQ9a7Wn-cUykN_mJcwxbiyz_S4VGuo3N8neE5rIirRnyxd_cmVuuwHrE0kNRRhfnnQSEXrd-p8mcULbcgYEZ034fPPbyIIDJefWHvjQ7CisFSJFKhsTloL_55mnBOevlYtgMjyqO3MsYKVPZNSnQi8Kx6Z_P12Dbore6hemqSV6RRpFUcz3ld6rMe52Z', 'Jungle Falls of Amiakhum', 'Thanchi, Bandarban', 'hills', 'Wild Trek', 'published', 6)
ON CONFLICT DO NOTHING;
