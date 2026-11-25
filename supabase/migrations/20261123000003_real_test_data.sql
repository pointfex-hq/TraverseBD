-- =====================================================================
-- TraverseBD Rich Real-World Production Test Dataset
-- Version: 1.1.0
-- Adds comprehensive, realistic Bangladesh travel packages, itineraries,
-- inclusions, departures, and gallery photos into Supabase PostgreSQL.
-- =====================================================================

-- 1. SEED ADDITIONAL PREMIER DESTINATIONS
INSERT INTO public.destinations (
    id, slug, name_en, name_bn, region,
    short_description_en, short_description_bn,
    full_description_en, full_description_bn,
    cover_image_url, highlights, travel_tips, status, is_featured
)
VALUES
    (
        'd5555555-5555-5555-5555-555555555555',
        'saint-martins-island',
        'Saint Martin''s Island',
        'সেন্ট মার্টিন প্রবাল দ্বীপ',
        'Bay of Bengal, Cox''s Bazar',
        'The only coral island of Bangladesh with crystal clear azure waters, coconut groves, and Chera Dwip.',
        'বাংলাদেশের একমাত্র প্রবাল দ্বীপ, যেখানে রয়েছে নীল জলরাশি, নারিকেল বাগান ও ছেঁড়া দ্বীপের প্রবাল প্রাচীর।',
        'Saint Martin''s Island is a small coral paradise in the northeastern part of the Bay of Bengal. Surrounded by coral reefs, living marine life, and tranquil coconut groves, it offers unforgettable sunset strolls, fresh seafood, and boat journeys to Chera Dwip.',
        'সেন্ট মার্টিন বাংলাদেশের একমাত্র প্রবাল দ্বীপ। স্বচ্ছ নীল পানি, প্রবাল পাথরের প্রাকৃতিক প্রাচীর, সাইকেল রাইড এবং সামুদ্রিক মাছের বারবিকিউ উপভোগ করার এক অনন্য স্বর্গরাজ্য।',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
        ARRAY['Chera Dwip Coral Reef', 'West Beach Sunset Walk', 'Fresh Crab & Lobster Seafood', 'Cycling across the Island'],
        ARRAY['Pre-book ship tickets in peak winter season', 'Respect marine life and avoid stepping on live corals'],
        'published',
        true
    ),
    (
        'd6666666-6666-6666-6666-666666666666',
        'bandarban',
        'Bandarban Hill Tracts',
        'বান্দরবান পার্বত্য জেলা',
        'Chattogram Division',
        'Majestic mountain summits, cloud-kissed peaks, roaring waterfalls, and rich tribal heritage.',
        'উঁচু পাহাড়ের চূড়া, মেঘের আনাগোনা, খরস্রোতা পাহাড়ি ঝর্ণা এবং সমৃদ্ধ পাহাড়ি সংস্কৃতির লীলাভূমি।',
        'Bandarban is the trekking and adventure capital of Bangladesh. Home to the highest peaks including Keokradong and Saka Haphong, breathtaking viewpoints like Nilgiri and Nilachal, and roaring cascades like Nafakhum and Amiakhum.',
        'রোমাঞ্চপ্রেমীদের জন্য বান্দরবান এক অনন্য গন্তব্য। নীলগিরির মেঘের সমুদ্র, নাফাকুম জলপ্রপাত, বগা লেক এবং মারমা, বম, মুরং ক্ষুদ্র নৃগোষ্ঠীর ঐতিহ্যবাহী জীবনধারা মুগ্ধ করার মতো।',
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop',
        ARRAY['Nilgiri Cloud Viewpoint', 'Nafakhum Waterfall Trek', 'Boga Lake & Keokradong Peak', 'Buddha Dhatu Jadi Golden Temple'],
        ARRAY['Hire registered tribal guides for mountain hikes', 'Carry national ID for military security checkpoints'],
        'published',
        true
    ),
    (
        'd7777777-7777-7777-7777-777777777777',
        'kuakata',
        'Kuakata Coastal Beach',
        'কুয়াকাটা সাগরকন্যা',
        'Barisal Division',
        'The Daughter of the Sea where you can witness both unobstructed sunrise and sunset over the Bay of Bengal.',
        'একই সৈকত থেকে সূর্যোদয় ও সূর্যাস্ত দেখার অপূর্ব বেলাভূমি এবং লাল কাঁকড়ার দ্বীপ।',
        'Kuakata is a panoramic coastal haven in southern Bangladesh. Renowned for its unique vantage point where travelers can gaze upon sunrise and sunset over the Bay of Bengal, visit ancient Rakhine Buddhist temples, and explore the Gangamati mangrove forest.',
        'কুয়াকাটা সৈকতের প্রধান আকর্ষণ একই স্থান থেকে সূর্যোদয় ও সূর্যাস্ত দর্শন। এছাড়া রাখাইন পল্লী, শতবর্ষী বৌদ্ধ মন্দির এবং লেম্বুর বনের মোহনা ভ্রমণ অনন্য অভিজ্ঞতা প্রদান করে।',
        'https://images.unsplash.com/photo-1510414842594-a61752afb394?q=80&w=1200&auto=format&fit=crop',
        ARRAY['Panoramic Sunrise & Sunset vantage', 'Gangamati Mangrove Forest', 'Rakhine Women Weaving Village', 'Red Crab Island Excursion'],
        ARRAY['Wake up at 5:00 AM for sunrise viewing at Gangamati point', 'Try fresh grilled Hilsa at beach shacks'],
        'published',
        true
    )
ON CONFLICT (slug) DO UPDATE SET
    highlights = EXCLUDED.highlights,
    travel_tips = EXCLUDED.travel_tips;

-- 2. SEED REAL PREMIER TOUR PACKAGES
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
        'a4444444-4444-4444-4444-444444444444',
        'saint-martin-coral-cruise',
        'd5555555-5555-5555-5555-555555555555',
        'c1111111-1111-1111-1111-111111111111',
        'Saint Martin Coral Island & Chera Dwip Expedition',
        'সেন্ট মার্টিন প্রবাল দ্বীপ ও ছেঁড়া দ্বীপ এক্সপিডিশন',
        '3 Days 2 Nights luxury sea cruise with eco-resort stay and speedboat tour to Chera Dwip.',
        '৩ দিন ২ রাতের লাক্সারি সি-ক্রুজ, সি-ভিউ ইকো-রিসোর্ট এবং স্পিডবোটে ছেঁড়া দ্বীপ অভিযান।',
        'Immerse in the azure wonders of Bangladesh''s only coral island. Includes cruise ship voyage, oceanfront eco-cottage accommodation, fresh crab and fish BBQ dinner, snorkeling gear, and guided Chera Dwip exploration.',
        'সেন্ট মার্টিনের নীল পানিতে ৩ দিন ২ রাতের স্বপ্নিল অবকাশ। বিলাসবহুল জাহাজের টিকিট, সৈকত সংলগ্ন রিসোর্টে রাত্রিযাপন, তাজা সামুদ্রিক মাছের বারবিকিউ এবং ছেঁড়া দ্বীপে স্পিডবোট রাইড অন্তর্ভুক্ত।',
        'fixed',
        8500,
        3,
        2,
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
        'published',
        true,
        true
    ),
    (
        'a5555555-5555-5555-5555-555555555555',
        'bandarban-nilgiri-peak',
        'd6666666-6666-6666-6666-666666666666',
        'c2222222-2222-2222-2222-222222222222',
        'Bandarban Wilderness & Nilgiri Summit Trek',
        'বান্দরবান ওয়াইল্ডারনেস ও নীলগিরি সামিট ট্রেক',
        '4 Days 3 Nights high-altitude adventure across Nilgiri clouds, Chander Gari jeep trails, and Nafakhum falls.',
        '৪ দিন ৩ রাতের মেঘের চূড়া ভ্রমণ, চাঁদের গাড়িতে পাহাড়ি ট্রেইল এবং নাফাকুম জলপ্রপাত ট্র্যাকিং।',
        'Conquer the highest mountain roads in Bangladesh. Ride open-top 4x4 Chander Gari to the Nilgiri clouds, trek down to scenic tribal hamlets, cross Remakri river rapids, and savor authentic indigenous bamboo chicken.',
        'বান্দরবানের সবচেয়ে রোমাঞ্চকর ৪ দিনের এক্সপিডিশন। নীলগিরির চূড়ায় মেঘ স্পর্শ করা, চাঁদের গাড়িতে পাহাড়ি রাইড, রেমাক্রি নদীতে ইঞ্জিন নৌকার রোমাঞ্চ এবং ক্ষুদ্র নৃগোষ্ঠীর আতিথেয়তা গ্রহণ।',
        'fixed',
        11500,
        4,
        3,
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop',
        'published',
        true,
        true
    ),
    (
        'a6666666-6666-6666-6666-666666666666',
        'sylhet-ratargul-tanguar-haor',
        'd3333333-3333-3333-3333-333333333333',
        'c4444444-4444-4444-4444-444444444444',
        'Tanguar Haor & Shimul Bagan Premium Houseboat Cruise',
        'টাঙ্গুয়ার হাওর ও শিমুল বাগান প্রিমিয়াম হাউসবোট ক্রুজ',
        '2 Days 2 Nights luxury traditional wooden houseboat stay with live Haor fish feasts and crystal waters.',
        '২ দিন ২ রাতের কাঠের বিলাসবহুল হাউসবোট ক্রুজ, তাজা হাওরের মাছের ভোজ এবং নীলাদ্রি লেক ভ্রমণ।',
        'Glide through the vast shimmering waters of Tanguar Haor on a private wooden luxury houseboat. Visit the emerald green Niladri Lake, Shimul Bagan red flower fields, and pristine clear Jadukata river streams.',
        'টাঙ্গুয়ার হাওরের বিশাল জলরাশির বুকে বিলাসবহুল হাউসবোটে ২ দিনের জাদুকরী যাত্রা। এসি কেবিন, হাওরের হাঁস ও তাজা মাছের লোভনীয় খাবার, নীলাদ্রি লেকে কায়াকিং এবং যাদুকাটা নদীর স্বচ্ছ পানি উপভোগ।',
        'starting_from',
        9500,
        2,
        2,
        'https://images.unsplash.com/photo-1598890777032-bde13fbe3493?q=80&w=1200&auto=format&fit=crop',
        'published',
        true,
        false
    ),
    (
        'a7777777-7777-7777-7777-777777777777',
        'sundarbans-deep-mangrove-safari',
        'd4444444-4444-4444-4444-444444444444',
        'c3333333-3333-3333-3333-333333333333',
        'Sundarbans Royal Bengal Expedition & Kotka Wildlife Haven',
        'সুন্দরবন রয়্যাল বেঙ্গল এক্সপিডিশন ও কটকা ওয়াইল্ডলাইফ',
        '3 Days 3 Nights premium tourist ship cruise into deep UNESCO mangrove creeks with armed guard escorts.',
        '৩ দিন ৩ রাতের এসি ট্যুরিস্ট জাহাজে গভীর সুন্দরবন ভ্রমণ, হরিণের অভয়ারণ্য এবং ক্যানেল ক্রুজ।',
        'Venture into the heart of the world''s largest mangrove wilderness. Guided by certified naturalists and armed forest guards, explore Kotka sanctuary, track Bengal tiger paw prints on muddy shores, and canoe quietly at dawn.',
        'পৃথিবীর বৃহত্তম ম্যানগ্রোভ অরণ্যে ৩ দিনের অবিস্মরণীয় সাফারি। বিলাসবহুল ক্রুজ জাহাজে থাকা-খাওয়া, কটকা অভয়ারণ্যে শত শত হরিণের বিচরণ দেখা, জামতলী সমুদ্র সৈকত এবং ভোরবেলায় নীরব ক্যানেলে বোট ট্রিপ।',
        'fixed',
        14000,
        3,
        3,
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
        'published',
        true,
        true
    ),
    (
        'a8888888-8888-8888-8888-888888888888',
        'kuakata-panoramic-beach-retreat',
        'd7777777-7777-7777-7777-777777777777',
        'c1111111-1111-1111-1111-111111111111',
        'Kuakata Sunrise & Sunset Coastal Retreat',
        'কুয়াকাটা সানরাইজ ও সানসেট কোস্টাল রিট্রিট',
        '3 Days 2 Nights beach retreat with Red Crab Island boat excursion and fresh grilled seafood.',
        '৩ দিন ২ রাতের সাগরকন্যা কুয়াকাটা ট্যুর, লাল কাঁকড়ার দ্বীপ ও রাখাইন পল্লী দর্শন।',
        'Experience the magical coastline of Kuakata. Watch the sun rise and dip into the Bay of Bengal, explore Gangamati mangrove eco-forest, visit ancient Rakhine Buddhist wells, and taste hot grilled seafood by the beach.',
        'কুয়াকাটায় ৩ দিন ২ রাতের রিলাক্সিং সমুদ্র ভ্রমণ। সূর্যোদয় ও সূর্যাস্ত দেখা, লাল কাঁকড়ার চরে বাইক রাইড, ঝাউবন ও শুঁটকি পল্লী পরিদর্শন।',
        'starting_from',
        7200,
        3,
        2,
        'https://images.unsplash.com/photo-1510414842594-a61752afb394?q=80&w=1200&auto=format&fit=crop',
        'published',
        false,
        false
    )
ON CONFLICT (slug) DO UPDATE SET
    price_bdt = EXCLUDED.price_bdt,
    status = EXCLUDED.status;

-- 3. SEED ITINERARY DAYS FOR NEW PACKAGES
INSERT INTO public.itinerary_days (package_id, day_no, title_en, title_bn, description_en, description_bn)
VALUES
    -- Saint Martin Package
    ('a4444444-4444-4444-4444-444444444444', 1, 'Sea Cruise to Saint Martin & West Beach Sunset', 'জাহাজে সেন্ট মার্টিন যাত্রা ও পশ্চিম সৈকতে সূর্যাস্ত', 'Board the cruise vessel at Teknaf/Inani, arrive at Saint Martin by noon, check-in to beach cottage, and enjoy glowing sunset with coconut water.', 'সকালে বিলাসবহুল জাহাজে যাত্রা, দুপুরে দ্বীপে পৌঁছে কটেজে চেক-ইন এবং বিকেলে পশ্চিম সৈকতে সূর্যাস্ত উপভোগ।'),
    ('a4444444-4444-4444-4444-444444444444', 2, 'Speedboat to Chera Dwip & Coral Reef Exploration', 'স্পিডবোটে ছেঁড়া দ্বীপ ভ্রমণ ও প্রবাল দর্শন', 'Early morning speedboat cruise to Chera Dwip, walk across volcanic coral formations, snorkel in shallow waters, and enjoy beach BBQ dinner.', 'সকালে স্পিডবোটে ছেঁড়া দ্বীপে রোমাঞ্চকর ভ্রমণ, জীবন্ত প্রবাল দর্শন এবং সন্ধ্যায় সৈকতে লাইভ ফিশ বারবিকিউ পার্টি।'),
    ('a4444444-4444-4444-4444-444444444444', 3, 'Island Cycling & Return Cruise', 'দ্বীপ পরিক্রমা ও ফিরতি ক্রুজ', 'Bicycle ride around the coastal perimeter, souvenir shopping for dried fish and shells, and boarding the afternoon return cruise.', 'সকালে সাইকেলে নারিকেল জিঞ্জিরা ঘুরে দেখা, স্যুভেনির কেনাকাটা এবং বিকেলে ফিরতি জাহাজে যাত্রা।'),

    -- Bandarban Package
    ('a5555555-5555-5555-5555-555555555555', 1, 'Chander Gari Journey to Nilgiri Cloud Resort', 'চাঁদের গাড়িতে নীলগিরি মেঘের রাজ্যে যাত্রা', 'Board open 4x4 Chander Gari from Bandarban town, climb up winding hill roads to Nilgiri 2200ft viewpoint, and stay among drifting clouds.', 'বান্দরবান শহর থেকে খোলা চাঁদের গাড়িতে পাহাড় বেয়ে ২,২০০ ফুট উঁচুতে নীলগিরি কটেজে চেক-ইন ও মেঘের ছোয়া।'),
    ('a5555555-5555-5555-5555-555555555555', 2, 'Remakri Riverboat & Nafakhum Waterfall Hike', 'রেমাক্রি নদী ও নাফাকুম ঝর্ণা ট্র্যাকিং', 'Boat cruise along scenic Sangu river to Remakri, followed by an exhilarating 2-hour jungle trek to the roaring Nafakhum waterfall.', 'সাঙ্গু নদীতে ইঞ্জিন নৌকায় রেমাক্রি যাত্রা এবং গভীর জঙ্গলের ট্রেইল ধরে নাফাকুম জলপ্রপাতে ট্রেকিং।'),
    ('a5555555-5555-5555-5555-555555555555', 3, 'Boga Lake & Indigenous Tribal Culture', 'বগা লেক ও মারমা নৃগোষ্ঠীর পল্লী পরিদর্শন', 'Excursion to the legendary volcanic crater Boga Lake, meet local Marma artisans, and enjoy authentic tribal bamboo chicken lunch.', 'রহস্যময় প্রাকৃতিক বগা লেক দর্শন, স্থানীয় পাহাড়ি আদিবাসীদের জীবনযাত্রা দেখা এবং বাঁশের ভেতর রান্না করা চিকেনের স্বাদ গ্রহণ।'),
    ('a5555555-5555-5555-5555-555555555555', 4, 'Golden Temple & Return Journey', 'স্বর্ণমন্দির দর্শন ও বিদায়', 'Visit Buddha Dhatu Jadi golden temple perched on the hill crest, browse tribal fabric markets, and return journey.', 'পাহাড়ের চূড়ায় অবস্থিত দৃষ্টিনন্দন স্বর্ণমন্দির দর্শন, পাহাড়ি তাঁতের চাদর কেনাকাটা এবং সমাপ্তি।'),

    -- Tanguar Haor Package
    ('a6666666-6666-6666-6666-666666666666', 1, 'Houseboat Check-in & Sunset at Tanguar Haor', 'হাউসবোটে চেক-ইন ও টাঙ্গুয়ার হাওরে সূর্যাস্ত', 'Board your private luxury wooden houseboat at Tahirpur, cruise past migratory bird sanctuaries, and witness sunset from the watchtower.', 'তাহিরপুর থেকে বিলাসবহুল এসি হাউসবোটে আরোহণ, ওয়াচ টাওয়ার পয়েন্টে বিশাল হাওরের বুকে সূর্যাস্ত দর্শন।'),
    ('a6666666-6666-6666-6666-666666666666', 2, 'Niladri Lake, Shimul Bagan & Jadukata River', 'নীলাদ্রি লেক, শিমুল বাগান ও যাদুকাটা নদী', 'Morning kayak excursion at Niladri blue lake, photography at red Shimul tree forest, swimming in crystal Jadukata waters, and departure.', 'নীলাদ্রি লেকে কায়াকিং, বসন্তের শিমুল বাগান দর্শন এবং যাদুকাটা নদীর স্বচ্ছ শীতল পানিতে সাঁতার ও বিদায়।'),

    -- Sundarbans Package
    ('a7777777-7777-7777-7777-777777777777', 1, 'Boarding Ship & Harbaria Eco Trail', 'জাহাজে যাত্রা শুরু ও হারবাড়িয়া ইকোট্যুরিজম কেন্দ্র', 'Embark on our luxury cruise ship at Mongla Port, enter Sundarbans National Park, and take wooden walkway tour through Harbaria mangrove trail.', 'মংলা বন্দর থেকে জাহাজে যাত্রা, হারবাড়িয়া ইকো-সেন্টারের কাঠের ট্রেইলে হেঁটে সুন্দরী ও গোলপাতা বন দর্শন।'),
    ('a7777777-7777-7777-7777-777777777777', 2, 'Kotka Sanctuary, Tiger Track & Jamtola Beach', 'কটকা অভয়ারণ্য, বাঘের পদচিহ্ন ও জামতলা সৈকত', 'Full day excursion at Kotka sanctuary. Spot herds of spotted deer, monitor lizards, walk along isolated Jamtola sea beach with armed forest guards.', 'সশস্ত্র বনরক্ষীর পাহারায় কটকার গভীর বনে শত শত হরিণের পাল দেখা, বাঘের পায়ের ছাপ খোঁজা এবং নির্জন জামতলা সৈকত ভ্রমণ।'),
    ('a7777777-7777-7777-7777-777777777777', 3, 'Dawn Silent Canoe Creek Safari & Return', 'ভোরবেলায় নীরব ক্যানেল ক্রুজ ও ফিরতি পথ', 'Board small engine-less wooden country boats at dawn for silent bird and wildlife watching in narrow mangrove creeks, return cruise to port.', 'ভোরবেলায় শব্দহীন কাঠের নৌকায় সরু খালে পাখির কলকাকলি ও বন্যপ্রাণী দর্শন শেষে মংলা বন্দরের উদ্দেশ্যে যাত্রা।')
ON CONFLICT (package_id, day_no) DO NOTHING;

-- 4. SEED PACKAGE ITEMS (Inclusions, Exclusions, Notes)
INSERT INTO public.package_items (package_id, type, text_en, text_bn, sort_order)
VALUES
    -- Saint Martin
    ('a4444444-4444-4444-4444-444444444444', 'included', 'Roundtrip Keari Sindbad / Bay One cruise ship tickets', 'জাহাজে আসা-যাওয়ার নিশ্চিত রাউন্ডট্রিপ টিকিট', 1),
    ('a4444444-4444-4444-4444-444444444444', 'included', '2 Nights beachfront eco-resort AC accommodation', 'সৈকত সংলগ্ন রিসোর্টে ২ রাত এসি রুম', 2),
    ('a4444444-4444-4444-4444-444444444444', 'included', 'Reserved speedboat excursion to Chera Dwip', 'ছেঁড়া দ্বীপে রিজার্ভ স্পিডবোট যাতায়াত', 3),
    ('a4444444-4444-4444-4444-444444444444', 'included', 'Special live seafood & BBQ dinner on the beach', 'সৈকতে লাইভ সামুদ্রিক মাছ ও বারবিকিউ ডিনার', 4),
    ('a4444444-4444-4444-4444-444444444444', 'excluded', 'Dhaka-Cox''s Bazar intercity transport', 'ঢাকা-কক্সবাজার যাতায়াত খরচ', 1),
    ('a4444444-4444-4444-4444-444444444444', 'excluded', 'Personal scuba diving or water sport fees', 'ব্যক্তিগত স্কুবা ডাইভিং বা ওয়াটার স্পোর্ট ফি', 2),

    -- Bandarban
    ('a5555555-5555-5555-5555-555555555555', 'included', 'Reserved 4x4 Chander Gari jeep for all 4 days with experienced hill driver', '৪ দিনের জন্য রিজার্ভ ৪x৪ চাঁদের গাড়ি ও অভিজ্ঞ পাহাড়ি চালক', 1),
    ('a5555555-5555-5555-5555-555555555555', 'included', '1 Night at Nilgiri Army Hill Resort + 2 Nights in Bandarban Town', '১ রাত নীলগিরি রিসোর্টে + ২ রাত বান্দরবান শহরের রিসোর্টে থাকা', 2),
    ('a5555555-5555-5555-5555-555555555555', 'included', 'Remakri river motorboat fare & certified tribal trekking guide', 'রেমাক্রি ইঞ্জিন নৌকার ভাড়া ও অভিজ্ঞ পাহাড়ি গাইড', 3),
    ('a5555555-5555-5555-5555-555555555555', 'included', 'All meals including famous Marma Bamboo Chicken feast', 'সকল ব্রেকফাস্ট, লাঞ্চ ও ঐতিহ্যবাহী বাঁশ মুরগির ডিনার', 4),
    ('a5555555-5555-5555-5555-555555555555', 'excluded', 'Dhaka-Bandarban interdistrict bus ticket', 'ঢাকা-বান্দরবান দূরপাল্লার বাস টিকিট', 1),

    -- Tanguar Haor
    ('a6666666-6666-6666-6666-666666666666', 'included', '2 Days exclusive cabin accommodation on luxury traditional houseboat', 'বিলাসবহুল ঐতিহ্যবাহী কাঠের হাউসবোটে ২ দিনের এসি কেবিন', 1),
    ('a6666666-6666-6666-6666-666666666666', 'included', '6 Rich meals including Haor Duck Curry & fresh Boal/Rui fish', '৬ বেলা রাজকীয় খাবার (হাওরের হাঁসের মাংস ও তাজা মাছের ভোজ)', 2),
    ('a6666666-6666-6666-6666-666666666666', 'included', 'Niladri Lake entry, bike transfer to Shimul Bagan & Jadukata', 'নীলাদ্রি লেক দর্শন, শিমুল বাগান ও যাদুকাটা নদী ভ্রমণ', 3),
    ('a6666666-6666-6666-6666-666666666666', 'included', 'Free life jackets and kayaks for swimming in Haor', 'হাওরে সাঁতারের জন্য লাইফ জ্যাকেট ও কায়াকিং সুবিধা', 4),

    -- Sundarbans
    ('a7777777-7777-7777-7777-777777777777', 'included', '3 Nights luxury tourist vessel accommodation (AC Twin Cabins)', 'বিলাসবহুল ট্যুরিস্ট জাহাজে ৩ রাত এসি কেবিনে থাকার ব্যবস্থা', 1),
    ('a7777777-7777-7777-7777-777777777777', 'included', 'Forest Department armed security guards for all jungle expeditions', 'জঙ্গলে ট্র্যাকিংয়ের জন্য বনবিভাগের সশস্ত্র গানম্যান ও নিরাপত্তা', 2),
    ('a7777777-7777-7777-7777-777777777777', 'included', 'All entrance tickets, revenue fees, and silent canal canoe trips', 'সব জাতীয় উদ্যান প্রবেশ ফি এবং সরু ক্যানেলে নৌকা ভ্রমণ', 3),
    ('a7777777-7777-7777-7777-777777777777', 'included', 'All main meals, evening snacks, and 24/7 tea/coffee aboard', 'জাহাজে প্রতিদিন ৩ বেলার সুস্বাদু বুফে খাবার ও সার্বক্ষণিক চা/কফি', 4)
ON CONFLICT DO NOTHING;

-- 5. SEED PACKAGE DEPARTURES (Realistic Upcoming Winter Dates)
INSERT INTO public.package_departures (package_id, departure_date, capacity, available_seats, status)
VALUES
    -- Saint Martin Departures
    ('a4444444-4444-4444-4444-444444444444', '2026-12-05', 16, 8, 'available'),
    ('a4444444-4444-4444-4444-444444444444', '2026-12-12', 16, 3, 'few_seats'),
    ('a4444444-4444-4444-4444-444444444444', '2026-12-19', 16, 0, 'sold_out'),
    ('a4444444-4444-4444-4444-444444444444', '2026-12-26', 16, 12, 'available'),

    -- Bandarban Departures
    ('a5555555-5555-5555-5555-555555555555', '2026-12-08', 12, 6, 'available'),
    ('a5555555-5555-5555-5555-555555555555', '2026-12-15', 12, 2, 'few_seats'),
    ('a5555555-5555-5555-5555-555555555555', '2026-12-22', 12, 0, 'sold_out'),

    -- Tanguar Haor Departures
    ('a6666666-6666-6666-6666-666666666666', '2026-12-06', 18, 10, 'available'),
    ('a6666666-6666-6666-6666-666666666666', '2026-12-13', 18, 4, 'few_seats'),
    ('a6666666-6666-6666-6666-666666666666', '2026-12-20', 18, 14, 'available'),

    -- Sundarbans Departures
    ('a7777777-7777-7777-7777-777777777777', '2026-12-10', 24, 15, 'available'),
    ('a7777777-7777-7777-7777-777777777777', '2026-12-18', 24, 3, 'few_seats'),
    ('a7777777-7777-7777-7777-777777777777', '2026-12-25', 24, 0, 'sold_out'),

    -- Kuakata Departures
    ('a8888888-8888-8888-8888-888888888888', '2026-12-07', 20, 11, 'available'),
    ('a8888888-8888-8888-8888-888888888888', '2026-12-14', 20, 5, 'few_seats')
ON CONFLICT DO NOTHING;

-- 6. SEED ADDITIONAL HIGH-RES GALLERY DISPATCHES
INSERT INTO public.gallery_images (image_url, title, location, category, badge, status, sort_order)
VALUES
    ('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop', 'Turquoise Waves of Chera Dwip', 'Saint Martin Island', 'coastal', 'Coral Expedition', 'published', 7),
    ('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop', 'Nilgiri Clouds Flowing through Peaks', 'Bandarban Hill Tracts', 'hills', 'High Summit', 'published', 8),
    ('https://images.unsplash.com/photo-1510414842594-a61752afb394?q=80&w=1200&auto=format&fit=crop', 'Crimson Sun Dipping into Kuakata Sea', 'Kuakata Beach', 'coastal', 'Golden Hour', 'published', 9),
    ('https://images.unsplash.com/photo-1598890777032-bde13fbe3493?q=80&w=1200&auto=format&fit=crop', 'Emerald Waters of Niladri Quarry Lake', 'Tahirpur, Sunamganj', 'riverine', 'Haor Wonder', 'published', 10),
    ('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop', 'Spotted Deer Herd at Kotka Shore', 'Sundarbans Tiger Reserve', 'forest', 'Wildlife Haven', 'published', 11)
ON CONFLICT DO NOTHING;
