import { Destination, Category, Package, GalleryImage, BlogPost, Testimonial, SiteSettings, AdminUser, AuditLog } from '../types';

export const initialSiteSettings: SiteSettings = {
  organization_name: "Traverse BD",
  contact_phone: "+880 1627-444330",
  contact_email: "support@traversebd.com",
  address: "House 42, Road 11, Block D, Banani, Dhaka-1213, Bangladesh",
  whatsapp_number: "8801627444330",
  whatsapp_message: 'Hello! I would like to inquire about the package "{packageName}". Package link: {packageUrl}. Please share availability and booking details. Thank you.',
  hero_title: "Discover the Untamed Beauty of Bengal & Beyond",
  hero_subtitle: "Unforgettable expeditions across misty peaks, mangrove waterways, and pristine shorelines. Curated local journeys, zero complicated forms, and instant WhatsApp booking.",
  facebook_url: "https://facebook.com/traversebd",
  instagram_url: "https://instagram.com/traversebd",
  youtube_url: "https://youtube.com/@traversebd",
  office_hours: "Saturday – Thursday: 9:00 AM – 8:00 PM (BST)"
};

export const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Hill & Mountain Trek', slug: 'hill-trek', description: 'Misty peaks, clouds, waterfalls, and tribal hamlets', icon: 'landscape', sort_order: 1, status: 'published' },
  { id: 'cat-2', name: 'Beach & Coastal Islands', slug: 'beach-islands', description: 'Golden sands, marine drives, coral reefs and blue lagoons', icon: 'beach_access', sort_order: 2, status: 'published' },
  { id: 'cat-3', name: 'Riverine & Wetlands', slug: 'riverine-wetlands', description: 'Freshwater haors, swamp forests and luxury houseboats', icon: 'sailing', sort_order: 3, status: 'published' },
  { id: 'cat-4', name: 'Eco & Wildlife Safari', slug: 'eco-safari', description: 'Deep mangroves, Royal Bengal Tigers, deer and bird sanctuaries', icon: 'forest', sort_order: 4, status: 'published' },
  { id: 'cat-5', name: 'Tea Trails & Heritage', slug: 'tea-heritage', description: 'Lush green tea gardens, rain forests, and historical shrines', icon: 'eco', sort_order: 5, status: 'published' },
  { id: 'cat-6', name: 'Corporate & Group Retreat', slug: 'corporate-retreat', description: 'Seamless team-building, premium lodging and luxury transit', icon: 'groups', sort_order: 6, status: 'published' },
  { id: 'cat-7', name: 'Student & Youth Tour', slug: 'student-tour', description: 'Budget-friendly expeditions, camping and adventure thrills', icon: 'backpack', sort_order: 7, status: 'published' }
];

export const initialDestinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Sajek Valley',
    slug: 'sajek-valley',
    region: 'Rangamati, Chittagong Hill Tracts',
    short_description: 'The Kingdom of Clouds perched high on the Marishya range overlooking Lushai hills.',
    full_description: 'Sajek Valley is one of the most popular and scenic hill stations in Bangladesh, located in Baghaichhari Upazila of Rangamati district. Floating above 1,800 feet above sea level, Sajek is renowned for its enchanting morning cloud seas (megh), lush green mountain ranges, indigenous tribal culture (Chakma, Lushei, and Tripura), and exhilarating Chander Gari jeep rides through winding mountain roads.',
    cover_image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'
    ],
    highlights: ['Cloud Sea Panorama from Helipad', 'Ruilui Para & Konglak Peak Trek', 'Authentic Bamboo Chicken Cuisine', 'Military Convoy 4x4 Chander Gari Ride'],
    travel_tips: ['Carry original National ID / Student ID for Dighinala Army Checkpoint', 'Pre-book wooden cottages during winter weekends', 'Mobile network is strongest with Teletalk and Robi'],
    best_time_to_visit: 'September to March (Cloud season: Monsoon & Autumn)',
    status: 'published',
    is_featured: true,
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'dest-2',
    name: 'Sundarbans Mangrove Forest',
    slug: 'sundarbans',
    region: 'Khulna & Bagerhat Division',
    short_description: 'UNESCO World Heritage Site and the world\'s largest contiguous mangrove wetland.',
    full_description: 'The Sundarbans delta is a sprawling wilderness of tidal waterways, mudflats, and salt-tolerant mangrove forests spanning Bangladesh and India. Home to the majestic Royal Bengal Tiger, spotted deer, estuarine crocodiles, Gangetic river dolphins, and hundreds of vibrant bird species, a multi-day river cruise through Kotka, Kochikhali, and Jamtola sea beach is the quintessential wilderness adventure in South Asia.',
    cover_image_url: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1618083707368-b3823daa2726?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    highlights: ['Kotka Wildlife Sanctuary & Watchtower', 'Jamtola Tiger Beach Quiet Walk', 'Silent Canal Wooden Boat Safari at Dawn', 'Bagerhat Sixty Dome Mosque Stopover'],
    travel_tips: ['Wear earth-tone clothing (olive green, beige, khaki)', 'Maintain silence during small boat creek explorations', 'Armed forest guards accompany all official tourist vessels'],
    best_time_to_visit: 'November to February (Mild weather and active wildlife)',
    status: 'published',
    is_featured: true,
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'dest-3',
    name: 'Cox\'s Bazar & Marine Drive',
    slug: 'coxs-bazar',
    region: 'Chittagong Division',
    short_description: 'The longest unbroken natural sand beach in the world stretching 120 kilometers.',
    full_description: 'Cox\'s Bazar offers the quintessential coastal holiday in Bangladesh. Beyond the bustling town center, the world-famous 80km Marine Drive stretches between towering jungle hills on one side and roaring Bay of Bengal breakers on the other. Pristine stops like Inani Coral Beach, Himchhari Waterfall, and serene Ramu Buddhist temples create an unforgettable coastal retreat.',
    cover_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80'
    ],
    highlights: ['Sunset at Laboni & Kolatoli Beach', 'Open Jeep / Chander Gari Marine Drive Run', 'Inani Coral Reef Walk at Low Tide', 'Fresh Coral Fish BBQ & Rupchanda Fry'],
    travel_tips: ['Watch red safety flag warnings before swimming in the surf', 'Early morning Marine Drive drive offers zero traffic and sunrise glow', 'Visit Moheshkhali Adinath temple via speed boat'],
    best_time_to_visit: 'October to April',
    status: 'published',
    is_featured: true,
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'dest-4',
    name: 'Sreemangal & Lawachara',
    slug: 'sreemangal',
    region: 'Moulvibazar, Sylhet Division',
    short_description: 'The Tea Capital of Bangladesh with undulating emerald tea estates and rainforests.',
    full_description: 'Known as the Tea Capital of Bangladesh, Sreemangal boasts over 40 sprawling tea estates. It is also home to Lawachara National Park, a semi-evergreen rainforest harboring endangered Western Hoolock Gibbons, barking deer, and exotic flora. Cycling through quiet estate paths, tasting Nilkantha 7-layer tea, and visiting indigenous Manipuri weaving villages provide peaceful restoration.',
    cover_image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80'
    ],
    highlights: ['Lawachara Rainforest Canopy Trek', 'Cycling through Finlay Tea Gardens', 'Famous 7-Layer Tea Experience', 'Manipuri Traditional Weaving Village'],
    travel_tips: ['Hire a registered local eco-guide for Lawachara Gibbon spotting', 'Rent bicycles from town for quiet morning estate exploration', 'Visit Madhabpur Lake in early morning for lotus blossoms'],
    best_time_to_visit: 'Year-round; Rainy season for lush tea leaves, Winter for cool hikes',
    status: 'published',
    is_featured: false,
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'dest-5',
    name: 'Tanguar Haor & Ratargul',
    slug: 'tanguar-haor',
    region: 'Sunamganj & Sylhet Division',
    short_description: 'Vast freshwater Ramsar wetland and the Amazon of Bengal swamp forest.',
    full_description: 'Tanguar Haor in Sunamganj is a pristine freshwater wetland ecosystem beneath the Meghalaya mountain wall. During monsoon, it transforms into an endless inland sea where luxury traditional wooden houseboats drift under starry skies. Paired with Ratargul Swamp Forest—where freshwater submerged trees create an eerie emerald maze—it offers Bangladesh\'s most peaceful aquatic escapade.',
    cover_image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
    ],
    highlights: ['Overnight Living on Luxury Wooden Houseboat', 'Watchtower Sunset & Shimul Bagan Visit', 'Jadukata River & Niladri Lake Turquoise Waters', 'Silent Dinghy Boat Through Ratargul Swamp Trees'],
    travel_tips: ['Monsoon (July–September) is the golden season for houseboat cruising', 'Book houseboats at least 3 weeks ahead in peak season', 'Strictly preserve nature: no plastic disposal into haor waters'],
    best_time_to_visit: 'July to October (High water level)',
    status: 'published',
    is_featured: true,
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'dest-6',
    name: 'Bandarban & Nilgiri',
    slug: 'bandarban',
    region: 'Bandarban, Chittagong Hill Tracts',
    short_description: 'Rugged highlands, cloud terraces, mysterious caves, and towering peaks.',
    full_description: 'Bandarban is the wildest highland district in Bangladesh, characterized by the highest summits including Keokradong and Saka Haphong. Highlights include Nilgiri Resort floating right over the cloud layers, ancient volcanic Boga Lake, the golden Buddha Dhatu Jadi temple, and thrilling riverboat rides up the Sangu river towards Remakri and Nafakhum falls.',
    cover_image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    highlights: ['Nilgiri Cloud Peak Sunrise', 'Boga Lake Trekking & Indigenous Homestay', 'Nafakhum Waterfall Expedition by Sangu Boat', 'Buddha Dhatu Jadi Golden Temple'],
    travel_tips: ['Foreign nationals require prior Home Ministry clearance', 'Sturdy hiking boots are essential for trail trekking', 'Carry cash as highland ATMs are scarce'],
    best_time_to_visit: 'October to March for trekking; July to September for roaring waterfalls',
    status: 'published',
    is_featured: true,
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'dest-7',
    name: 'Saint Martin\'s Island',
    slug: 'saint-martins-island',
    region: 'Bay of Bengal, Cox\'s Bazar',
    short_description: 'The sole coral island of Bangladesh with crystal turquoise waters and coconut groves.',
    full_description: 'Located in the northeastern part of the Bay of Bengal, Narikel Jinjira (Saint Martin\'s Island) is famous for its living coral colonies, turquoise water, coconut palm fringed shores, and Chera Dwip island. Traveling via luxury sea cruise from Cox\'s Bazar or Teknaf across the estuary into open ocean is an unmatched journey.',
    cover_image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    highlights: ['Luxury Catamaran Cruise across Bay of Bengal', 'Chera Dwip Coral Reef Walk', 'Fresh Green Coconut & Grilled Snapper on Beach', 'Midnight Stargazing with Zero Light Pollution'],
    travel_tips: ['Check seasonal ferry schedules and government eco-guidelines', 'Wear water shoes to protect feet from sharp coral formations', 'Do not touch or collect live corals or marine life'],
    best_time_to_visit: 'November to February',
    status: 'published',
    is_featured: false,
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'dest-8',
    name: 'Kuakata Coastal Beach',
    slug: 'kuakata',
    region: 'Patuakhali, Barisal Division',
    short_description: 'Sagor Kannya (Daughter of the Sea) offering both sunrise and sunset over the water.',
    full_description: 'Kuakata is an enchanting coastal expanse located in southwestern Bangladesh. It is one of the rare beaches in the world where one can witness both the sunrise and sunset over the Bay of Bengal from the same vantage point. Nearby Rakhine indigenous villages, ancient Buddhist temples, and Fatrar Bon mangrove extension make it deeply cultural.',
    cover_image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    highlights: ['Unobstructed Sunrise & Sunset from Same Shoreline', 'Gangamati Reserved Forest & Red Crab Colony', 'Ancient Rakhine Buddhist Temple & 200-year Well', 'Fresh Crab & Hilsa Seafood Stalls'],
    travel_tips: ['Hire a registered motorcycle or battery tom-tom for sunrise point', 'Visit early morning fish market at the beach landing area'],
    best_time_to_visit: 'October to March',
    status: 'draft',
    is_featured: false,
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  }
];

export const initialPackages: Package[] = [
  {
    id: 'pkg-1',
    title: 'Sajek Valley Cloud Kingdom & Ruilui Para Expedition',
    slug: 'sajek-valley-cloud-kingdom',
    destination_id: 'dest-1',
    destination_name: 'Sajek Valley',
    category_id: 'cat-1',
    category_name: 'Hill & Mountain Trek',
    short_description: 'Wake up above a floating sea of clouds in luxury hill resort cottages with traditional bamboo cuisine and 4x4 Chander Gari jeep rides.',
    full_description: 'Experience the magic of Sajek Valley with Traverse BD\'s premium expedition. From crossing the scenic mountain military convoy at Dighinala in our private open-top Chander Gari to witnessing panoramic sunsets from Helipad 2, this curated 3-day itinerary ensures maximum comfort, safety, and cultural immersion. Stay in handpicked hillview cottages with private verandas facing the cloud ocean.',
    price: 8500,
    duration_days: 3,
    duration_nights: 2,
    cover_image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'published',
    is_featured: true,
    is_trending: true,
    itinerary: [
      { day_no: 1, title: 'Arrival at Khagrachhari & Convoy to Sajek', description: 'Early morning arrival at Khagrachhari town. Traditional breakfast, board private 4x4 Chander Gari, pass the official army escort convoy at Dighinala, and arrive at Sajek Valley resort by 1:30 PM. Sunset viewing at Helipad 2 followed by night BBQ party.' },
      { day_no: 2, title: 'Konglak Peak Sunrise & Tribal Hamlet Exploration', description: 'Early morning hike to Konglak Peak (highest point of Sajek) to witness the sunrise above the cloud ocean. Visit Ruilui Para indigenous village, meet tribal artisans, and enjoy signature Bamboo Chicken dinner.' },
      { day_no: 3, title: 'Alutila Mysterious Cave & Return Journey', description: 'Descend to Khagrachhari, explore the prehistoric Alutila Cave with flaming bamboo torches, visit Risang Waterfall, and depart back towards Dhaka via AC sleeper coach.' }
    ],
    items: [
      { id: 'item-1', type: 'included', text: 'Dhaka - Khagrachhari - Dhaka return AC luxury coach tickets' },
      { id: 'item-2', type: 'included', text: '2 nights accommodation in premium hillview eco-resort cottage' },
      { id: 'item-3', type: 'included', text: 'Private 4x4 Chander Gari jeep for all 3 days of travel' },
      { id: 'item-4', type: 'included', text: 'All meals: 3 breakfasts, 3 lunches, 2 dinners including 1 BBQ night & 1 Bamboo chicken' },
      { id: 'item-5', type: 'included', text: 'Certified licensed local tour guide and military convoy permits' },
      { id: 'item-6', type: 'excluded', text: 'Personal snacks, mineral water beyond mealtime, and room service' },
      { id: 'item-7', type: 'excluded', text: 'Entry ticket for optional adventure zipline or quad bikes' },
      { id: 'item-8', type: 'activity', text: 'Konglak Peak morning summit hike and cloud gazing' },
      { id: 'item-9', type: 'activity', text: 'Alutila Cave exploration with bamboo torches' },
      { id: 'item-10', type: 'food', text: 'Traditional Pahari bamboo chicken, indigenous fresh vegetables, lake fish curry' },
      { id: 'item-11', type: 'accommodation', text: 'Cloud-facing wooden cottage with attached modern washroom & private veranda' },
      { id: 'item-12', type: 'transport', text: 'Hyundai Universe AC Coach & Mahindra Bolero 4x4 Chander Gari' },
      { id: 'item-13', type: 'note', text: 'National ID card or passport copy is strictly required at military checkposts.' }
    ],
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'pkg-2',
    title: 'Sundarbans Deep Mangrove & Wildlife Cruise',
    slug: 'sundarbans-deep-mangrove-cruise',
    destination_id: 'dest-2',
    destination_name: 'Sundarbans Mangrove Forest',
    category_id: 'cat-4',
    category_name: 'Eco & Wildlife Safari',
    short_description: '4-day luxury expedition vessel cruise through Kotka wildlife sanctuary, Jamtola beach, and silent tidal creeks.',
    full_description: 'Venture deep into the untamed mangrove realm of the Royal Bengal Tiger on our premier river cruiser. Sailing from Khulna/Mongla, you will navigate the serene tidal waterways of Kotka, Kochikhali, and Harbaria. Includes dawn creek explorations on silent wooden rowboats, guided forest treks with armed wildlife rangers, and gourmet Bangladeshi seafood onboard.',
    price: 14500,
    duration_days: 4,
    duration_nights: 3,
    cover_image_url: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?auto=format&fit=crop&w=1000&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1618083707368-b3823daa2726?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'published',
    is_featured: true,
    is_trending: false,
    itinerary: [
      { day_no: 1, title: 'Boarding at Mongla & Harbaria Eco Center', description: 'Early morning embarkation on luxury cruise vessel. Safety briefing, cruise towards Harbaria Eco-tourism center, walk the wooden canopy boardwalk, and anchor inside deep forest for dinner.' },
      { day_no: 2, title: 'Kotka Wildlife Sanctuary & Jamtola Beach Hike', description: 'Silent country boat ride inside quiet canal at dawn for tiger and bird watching. Forest trek to Kotka watchtower, herd of spotted deer spotting, and hike to untouched Jamtola sea beach.' },
      { day_no: 3, title: 'Kochikhali Tiger Point & Forest Creek Safari', description: 'Cruise towards Kochikhali wildlife point. Explore creeks, mudflats with red fiddler crabs, and evening cultural presentation on boat.' },
      { day_no: 4, title: 'Karamjal Crocodile Breeding Center & Disembarkation', description: 'Visit Karamjal observation tower and salt-water crocodile breeding center. Return to Mongla port by late afternoon and transit back.' }
    ],
    items: [
      { id: 'item-201', type: 'included', text: 'Full 4-day cruise aboard modern tourist cruiser with AC cabins' },
      { id: 'item-202', type: 'included', text: 'All meals (4 breakfasts, 4 lunches, 3 dinners, tea/coffee & snacks)' },
      { id: 'item-203', type: 'included', text: 'Forest Department entry permits, vessel fees, and armed forest guards' },
      { id: 'item-204', type: 'included', text: 'Country wooden boat hire for silent canal bird watching' },
      { id: 'item-205', type: 'excluded', text: 'Forest department camera fee for high-end telephoto lenses' },
      { id: 'item-206', type: 'activity', text: 'Silent morning canal safari and tiger footprint tracking' },
      { id: 'item-207', type: 'food', text: 'Fresh Hilsa, Golda Chingri (jumbo prawns), Bhetki fish, and wild mangrove honey dessert' },
      { id: 'item-208', type: 'accommodation', text: 'Double/twin sharing luxury cabin with climate control' },
      { id: 'item-209', type: 'transport', text: 'Chartered steel hull luxury tourist cruiser vessel' },
      { id: 'item-210', type: 'note', text: 'Foreign travelers must submit passport copies 7 days prior for clearance.' }
    ],
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'pkg-3',
    title: 'Saint Martin Luxury Ocean Cruise & Coral Reef Retreat',
    slug: 'saint-martin-luxury-cruise',
    destination_id: 'dest-7',
    destination_name: 'Saint Martin\'s Island',
    category_id: 'cat-2',
    category_name: 'Beach & Coastal Islands',
    short_description: 'High-speed catamaran cruise across the Bay of Bengal, coral beach cottages, and fresh lobster barbecue under the stars.',
    full_description: 'Escape to Bangladesh\'s only coral paradise. Ride the luxury air-conditioned catamaran MV Karnafuly Express or Bay One directly to Saint Martin Island. Stay in prime beachfront resorts where the blue waves crash just feet from your porch. Explore Chera Dwip at low tide, bicycle along coconut trails, and feast on the freshest seafood in Bengal.',
    price: 9500,
    duration_days: 3,
    duration_nights: 2,
    cover_image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'published',
    is_featured: true,
    is_trending: true,
    itinerary: [
      { day_no: 1, title: 'Catamaran Cruise & Island Sunset', description: 'Morning boarding of luxury sea vessel from Cox\'s Bazar / Teknaf. Scenic 3-hour ocean sail accompanied by flying fish and sea gulls. Check-in to oceanfront resort, swim in turquoise waters, and enjoy fresh coconut on the beach.' },
      { day_no: 2, title: 'Chera Dwip Coral Expedition & Starry Night BBQ', description: 'Early morning speed boat or wooden engine boat to Chera Dwip. Marvel at vibrant coral heads and marine life. Afternoon cycling around the island. Evening open-air beach BBQ with grilled lobster and Rupchanda.' },
      { day_no: 3, title: 'Morning Swim & Return Cruise', description: 'Enjoy sunrise over the bay, beachcombing, collect island dry fish souvenirs, board return cruise vessel at 3:00 PM.' }
    ],
    items: [
      { id: 'item-301', type: 'included', text: 'Return luxury ship catamaran tickets (Executive class AC)' },
      { id: 'item-302', type: 'included', text: '2 nights beachfront resort stay with private ocean view balconies' },
      { id: 'item-303', type: 'included', text: 'Boat expedition to Chera Dwip with life jackets' },
      { id: 'item-304', type: 'included', text: 'All meals including seafood special lunch and beach BBQ night' },
      { id: 'item-305', type: 'excluded', text: 'Personal scuba diving or snorkeling equipment rentals' },
      { id: 'item-306', type: 'food', text: 'Fresh Koral fish grill, lobster BBQ, coconut water, traditional crab curry' },
      { id: 'item-307', type: 'accommodation', text: 'Premier beach resort located in West Beach area' },
      { id: 'item-308', type: 'transport', text: 'MV Karnafuly Express / Bay One Catamaran' }
    ],
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'pkg-4',
    title: 'Ratargul Swamp Forest & Tanguar Haor Houseboat Experience',
    slug: 'ratargul-tanguar-haor-houseboat',
    destination_id: 'dest-5',
    destination_name: 'Tanguar Haor & Ratargul',
    category_id: 'cat-3',
    category_name: 'Riverine & Wetlands',
    short_description: 'Monsoon aquatic wonder: Sleep on a handcrafted wooden houseboat in Tanguar Haor, navigate Ratargul swamp forest and swim in Niladri Lake.',
    full_description: 'Immerse yourself in Bangladesh\'s crown aquatic jewel. Cruise through the shimmering waters of Tanguar Haor on our premium traditional houseboat equipped with plush bedding, rooftop lounges, and onboard chefs. Wander through the surreal submerged green boughs of Ratargul Freshwater Swamp Forest and dip into the mineral turquoise waters of Niladri Lake along the Indian border.',
    price: 8900,
    duration_days: 3,
    duration_nights: 2,
    cover_image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'published',
    is_featured: true,
    is_trending: true,
    itinerary: [
      { day_no: 1, title: 'Taharampur Ghat Boarding & Haor Sunset', description: 'Arrival at Sunamganj, transfer to Tahirpur ghat. Board your boutique houseboat with welcome drinks. Cruise across the vast expanse of Tanguar Haor. Watch dramatic sunset against the backdrop of Meghalaya mountains.' },
      { day_no: 2, title: 'Watchtower, Jadukata River & Niladri Lake', description: 'Sunrise boat tour to Tanguar Haor watchtower. Swim in crystal clear waters. Cruise down Jadukata River to see stone extraction boats, visit Barikka Tila and turquoise Niladri Lake.' },
      { day_no: 3, title: 'Ratargul Swamp Forest & Sylhet Shrine Tour', description: 'Transfer to Sylhet, take country dinghy boat inside Ratargul Swamp Forest. Visit Hazrat Shah Jalal Mazar shrine, taste seven-layer tea, and depart.' }
    ],
    items: [
      { id: 'item-401', type: 'included', text: '2 nights private wooden boutique houseboat charter with rooftop sun-deck' },
      { id: 'item-402', type: 'included', text: 'All freshly cooked haor meals (Deshi chicken, Duck roast, Haor Boal fish, fresh rice)' },
      { id: 'item-403', type: 'included', text: 'Ratargul swamp forest boat fees and certified boatman' },
      { id: 'item-404', type: 'included', text: 'Dedicated guide and solar electrical backup on boat' },
      { id: 'item-405', type: 'excluded', text: 'Personal fishing rod equipment' },
      { id: 'item-406', type: 'food', text: 'Authentic Sylheti duck curry, fresh river fish bhorta, aromatic haor rice' },
      { id: 'item-407', type: 'transport', text: 'AC microbus for road transit and traditional motorized houseboat' }
    ],
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'pkg-5',
    title: 'Cox\'s Bazar Marine Drive & Inani Beach Eco Retreat',
    slug: 'coxs-bazar-marine-drive-retreat',
    destination_id: 'dest-3',
    destination_name: 'Cox\'s Bazar & Marine Drive',
    category_id: 'cat-2',
    category_name: 'Beach & Coastal Islands',
    short_description: 'Coastline exploration along the 80km Marine Drive in open-air jeeps, Inani coral walking, and 5-star beachfront luxury.',
    full_description: 'Experience Cox\'s Bazar the way it was meant to be—luxurious, relaxed, and far away from crowded city beaches. Cruise down the stunning Marine Drive road with green cliffside jungles on your left and crashing Indian Ocean waves on your right. Stay in an award-winning eco-resort at Inani Beach with private oceanfront cabanas.',
    price: 7800,
    duration_days: 4,
    duration_nights: 3,
    cover_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'published',
    is_featured: false,
    is_trending: true,
    itinerary: [
      { day_no: 1, title: 'Arrival & Kolatoli Beach Sunset', description: 'Flight or luxury bus arrival. Check-in to hotel. Sunset stroll at Sugandha beach and seafood dinner.' },
      { day_no: 2, title: 'Open Jeep Marine Drive Safari to Inani', description: 'Scenic drive along Marine drive in customized open safari jeep. Walk among live corals of Inani beach. Visit Himchhari hilltop and waterfalls.' },
      { day_no: 3, title: 'Moheshkhali Island & Adinath Temple', description: 'Speed boat voyage across the channel to Moheshkhali island. Discover Adinath Temple atop Mainak hill and Rakhine Buddhist monasteries.' },
      { day_no: 4, title: 'Beachside Breakfast & Departure', description: 'Sunrise beach walk, Burmese market shopping for handloom fabrics, and afternoon departure.' }
    ],
    items: [
      { id: 'item-501', type: 'included', text: '3 nights accommodation in 4-star beachfront resort' },
      { id: 'item-502', type: 'included', text: 'Private open jeep for Marine drive and Inani excursion' },
      { id: 'item-503', type: 'included', text: 'Daily buffet breakfast and 1 seafood dinner' },
      { id: 'item-504', type: 'included', text: 'Moheshkhali speed boat transfer and local guide' },
      { id: 'item-505', type: 'excluded', text: 'Air tickets (available upon request at corporate rates)' },
      { id: 'item-506', type: 'accommodation', text: 'Deluxe sea-facing room with private balcony' }
    ],
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'pkg-6',
    title: 'Nilgiri Cloud Peak, Boga Lake & Keokradong Summit Trek',
    slug: 'nilgiri-boga-lake-keokradong-trek',
    destination_id: 'dest-6',
    destination_name: 'Bandarban & Nilgiri',
    category_id: 'cat-1',
    category_name: 'Hill & Mountain Trek',
    short_description: 'An adrenaline-filled highland expedition to the top of Bengal: trek through Bom and Marma villages to Keokradong peak.',
    full_description: 'For genuine mountain lovers, Bandarban offers unmatched wilderness. From the surreal mist-covered peaks of Nilgiri to the deep mythical caldera of Boga Lake, hike through pristine indigenous bamboo trails to conquer the legendary summit of Keokradong (3,235 ft). Spend nights under dazzling starry skies at indigenous wooden cottages.',
    price: 11200,
    duration_days: 4,
    duration_nights: 3,
    cover_image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'published',
    is_featured: true,
    is_trending: false,
    itinerary: [
      { day_no: 1, title: 'Bandarban Town & Chander Gari to Ruma Bazar', description: 'Arrive in Bandarban town, military check-in, thrilling 4x4 Chander Gari drive through steep mountain passes to Ruma Bazar, boat ride up Sangu river.' },
      { day_no: 2, title: 'Boga Lake Arrival & Mountain Homestay', description: 'Ascend steep mountain road to mysterious Boga Lake (1,500 ft elevation). Explore Bom ethnic community and swim in natural volcanic freshwater.' },
      { day_no: 3, title: 'Keokradong Summit Trek', description: '4-hour mountain trek through Darjeeling Para to the peak of Keokradong. Stand beside the official survey monument and witness the 360-degree mountain horizon.' },
      { day_no: 4, title: 'Descent to Bandarban Town & Nilgiri Stop', description: 'Descend back to town, stop at Nilgiri hill station for sunset above the clouds, and board night AC bus to Dhaka.' }
    ],
    items: [
      { id: 'item-601', type: 'included', text: 'All mountain transport via dedicated 4x4 Chander Gari' },
      { id: 'item-602', type: 'included', text: 'Licensed highland certified trekking guide and porter assistance' },
      { id: 'item-603', type: 'included', text: '3 nights indigenous eco-cottage homestay and summit hut lodging' },
      { id: 'item-604', type: 'included', text: 'All wholesome Pahari meals, mineral water and trekking energy fruits' },
      { id: 'item-605', type: 'excluded', text: 'Personal trekking poles, headlamps, and medical insurance' }
    ],
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'pkg-7',
    title: 'Sreemangal Lawachara Rainforest & Tea Trail Immersion',
    slug: 'sreemangal-lawachara-tea-trail',
    destination_id: 'dest-4',
    destination_name: 'Sreemangal & Lawachara',
    category_id: 'cat-5',
    category_name: 'Tea Trails & Heritage',
    short_description: 'Peaceful weekend amidst rolling tea gardens, cycling paths, rare Hoolock Gibbon spotting and authentic Manipuri culture.',
    full_description: 'Step into a world of tranquil emerald greens. Perfect for families, solo travelers, and couples looking for a refreshing break from city noise. Cycle through the oldest tea gardens in the subcontinent, walk under towering rainforest canopies at Lawachara National Park, sip the legendary seven-colored tea, and stay in boutique eco-cottages surrounded by lemon groves.',
    price: 6500,
    duration_days: 2,
    duration_nights: 1,
    cover_image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'published',
    is_featured: false,
    is_trending: false,
    itinerary: [
      { day_no: 1, title: 'Arrival & Tea Garden Cycling Tour', description: 'Morning train/car arrival at Sreemangal. Check-in to boutique tea resort. Afternoon cycling through Finlay Tea Gardens. Evening tasting of 7-layer tea and Nilkantha special brews.' },
      { day_no: 2, title: 'Lawachara Rainforest Hike & Madhabpur Lake', description: 'Early morning guided wildlife walk inside Lawachara National park to observe Gibbons and tropical birds. Visit serene Madhabpur lotus lake, shop at Manipuri handloom village, and evening return.' }
    ],
    items: [
      { id: 'item-701', type: 'included', text: '1 night stay in luxury boutique tea resort cottage' },
      { id: 'item-702', type: 'included', text: 'Bicycle rentals for tea garden paths' },
      { id: 'item-703', type: 'included', text: 'Lawachara National park wildlife guide and entry tickets' },
      { id: 'item-704', type: 'included', text: 'All meals including traditional Khasia tea garden lunch' }
    ],
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'pkg-8',
    title: 'Traverse Corporate Annual Retreat: Sylhet & Sreemangal',
    slug: 'traverse-corporate-retreat-sylhet',
    destination_id: 'dest-4',
    destination_name: 'Sreemangal & Lawachara',
    category_id: 'cat-6',
    category_name: 'Corporate & Group Retreat',
    short_description: 'End-to-end customized corporate team building retreat with 5-star resort booking, conference facilities, and guided adventures.',
    full_description: 'Tailored specifically for tech companies, corporate firms, and multinational teams. Traverse BD manages total logistics from luxury AC charter buses to 5-star resort buyouts, gala dinner arrangements, team-building obstacle games, and private security escorts.',
    price: 16500,
    duration_days: 3,
    duration_nights: 2,
    cover_image_url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'published',
    is_featured: false,
    is_trending: false,
    itinerary: [
      { day_no: 1, title: 'Luxury Transit, Grand Welcome & Leadership Session', description: 'Executive Volvo transit from Dhaka with onboard refreshments. Grand welcome at 5-star resort, conference session, and welcome gala dinner.' },
      { day_no: 2, title: 'Team Building Games & Tea Estate Scavenger Hunt', description: 'Curated outdoor team building challenges, tea estate orienteering hunt, gala awards ceremony, and acoustic live music night.' },
      { day_no: 3, title: 'Rainforest Nature Walk & Return Journey', description: 'Mindful morning walk in Lawachara forest, farewell brunch, and comfortable return transit to Dhaka.' }
    ],
    items: [
      { id: 'item-801', type: 'included', text: 'Exclusive charter of premium European luxury buses' },
      { id: 'item-802', type: 'included', text: '5-star resort accommodation with full board meals' },
      { id: 'item-803', type: 'included', text: 'Professional corporate event facilitator, AV equipment and awards stage' },
      { id: 'item-804', type: 'included', text: 'Live acoustic BBQ musical night' }
    ],
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  },
  {
    id: 'pkg-9',
    title: 'Kuakata Sunrise & Sunset Coastal Exploration',
    slug: 'kuakata-sunrise-sunset-coastal-tour',
    destination_id: 'dest-8',
    destination_name: 'Kuakata Coastal Beach',
    category_id: 'cat-2',
    category_name: 'Beach & Coastal Islands',
    short_description: 'Witness the rare spectacle of both sunrise and sunset from the same beach, Rakhine cultural villages, and red crab colonies.',
    full_description: 'A soothing getaway to the Southernmost tip of Bengal. Kuakata allows you to watch the sun rise out of the Bay of Bengal in the morning and dip back into the water at dusk. Explore Rakhine handloom weavers, 200-year-old freshwater wells, and the serene Gangamati mangrove forest.',
    price: 7200,
    duration_days: 3,
    duration_nights: 2,
    cover_image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    gallery_images: [],
    status: 'draft', // Testing draft functionality as per SRS!
    is_featured: false,
    is_trending: false,
    itinerary: [
      { day_no: 1, title: 'Arrival & Sunset at Kuakata Beach', description: 'Check-in to hotel, enjoy the sunset over Bay of Bengal and beach seafood fry.' },
      { day_no: 2, title: 'Gangamati Sunrise & Rakhine Village Tour', description: 'Early morning sunrise viewing, red crab sanctuary, and Rakhine heritage temple.' },
      { day_no: 3, title: 'Morning Beach Walk & Departure', description: 'Visit dry fish drying yards and afternoon return transit.' }
    ],
    items: [
      { id: 'item-901', type: 'included', text: '2 nights hotel stay and all transport within Kuakata' }
    ],
    created_at: '2026-11-20T10:00:00Z',
    updated_at: '2026-11-23T12:00:00Z'
  }
];

export const initialGalleryImages: GalleryImage[] = [
  { id: 'gal-1', image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80', caption: 'Sea of clouds rolling over Sajek Valley at dawn', destination_id: 'dest-1', destination_name: 'Sajek Valley', category: 'Mountains & Clouds', status: 'published', sort_order: 1 },
  { id: 'gal-2', image_url: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?auto=format&fit=crop&w=1000&q=80', caption: 'Silent creeks and mangrove silhouettes in deep Sundarbans', destination_id: 'dest-2', destination_name: 'Sundarbans', category: 'Wildlife & Mangrove', status: 'published', sort_order: 2 },
  { id: 'gal-3', image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80', caption: 'Turquoise ocean waters and coconut palms at Saint Martin Island', destination_id: 'dest-7', destination_name: 'Saint Martin\'s Island', category: 'Beaches & Oceans', status: 'published', sort_order: 3 },
  { id: 'gal-4', image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80', caption: 'Traditional wooden houseboat sailing on Tanguar Haor waters', destination_id: 'dest-5', destination_name: 'Tanguar Haor', category: 'Lakes & Rivers', status: 'published', sort_order: 4 },
  { id: 'gal-5', image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80', caption: 'Lush terraced tea plantations in Sreemangal under morning mist', destination_id: 'dest-4', destination_name: 'Sreemangal', category: 'Tea Trails', status: 'published', sort_order: 5 },
  { id: 'gal-6', image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80', caption: 'Highland summits and cloud towers at Nilgiri Bandarban', destination_id: 'dest-6', destination_name: 'Bandarban', category: 'Mountains & Clouds', status: 'published', sort_order: 6 },
  { id: 'gal-7', image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80', caption: 'Golden sunset over Cox\'s Bazar unbroken marine beach', destination_id: 'dest-3', destination_name: 'Cox\'s Bazar', category: 'Beaches & Oceans', status: 'published', sort_order: 7 },
  { id: 'gal-8', image_url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80', caption: 'Marine drive open-top jeep safari between jungle hills and surf', destination_id: 'dest-3', destination_name: 'Cox\'s Bazar', category: 'Beaches & Oceans', status: 'published', sort_order: 8 },
  { id: 'gal-9', image_url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1000&q=80', caption: 'Wild Western Hoolock Gibbon canopy spotting in Lawachara', destination_id: 'dest-4', destination_name: 'Sreemangal', category: 'Wildlife & Mangrove', status: 'published', sort_order: 9 },
  { id: 'gal-10', image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80', caption: 'Milky way and starry sky over Ruilui Para cottage rooftops', destination_id: 'dest-1', destination_name: 'Sajek Valley', category: 'Mountains & Clouds', status: 'published', sort_order: 10 },
  { id: 'gal-11', image_url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80', caption: 'Estuarine crocodile resting on muddy banks of Kotka canal', destination_id: 'dest-2', destination_name: 'Sundarbans', category: 'Wildlife & Mangrove', status: 'published', sort_order: 11 },
  { id: 'gal-12', image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80', caption: 'Serene reflection on Niladri Lake with Meghalaya mountains', destination_id: 'dest-5', destination_name: 'Tanguar Haor', category: 'Lakes & Rivers', status: 'published', sort_order: 12 },
  { id: 'gal-13', image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80', caption: 'Draft photo pending review', destination_id: 'dest-1', destination_name: 'Sajek Valley', category: 'Mountains & Clouds', status: 'draft', sort_order: 13 }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Ultimate Sajek Valley Guide 2025: Chander Gari Routes, Best Cottages, & Stargazing Tips',
    slug: 'ultimate-sajek-valley-guide-2025',
    excerpt: 'Everything you need to know before visiting the Kingdom of Clouds: military convoy timings, top wooden cottages, authentic Bamboo chicken spots, and how to avoid the weekend rush.',
    content: `
Sajek Valley has captured the imagination of travelers across Bangladesh and international wanderers alike. Perched at an elevation of nearly 1,800 feet above sea level in Rangamati district, Sajek is often called the "Kingdom of Clouds."

### The Journey: Chander Gari and Army Escort
The road to Sajek begins from Khagrachhari town. From there, open-roof 4x4 Mahindra jeeps—affectionately known as *Chander Gari*—carry travelers through winding highland ridges. To ensure maximum safety, all tourist vehicles move in a synchronized military convoy from Dighinala Army Checkpost twice daily (10:00 AM and 3:00 PM). Make sure your group arrives at least 30 minutes before convoy departure!

### Best Stays: Ruilui Para vs. Konglak
- **Ruilui Para**: The bustling center of Sajek, lined with modern wooden cottages, indigenous handicraft stalls, and cozy eateries. Cottages like Meghpunji, Sajek Classic, and Runmoy offer front-row private verandas for cloud watching.
- **Konglak Para**: Located further up at the highest point of Sajek, Konglak is quiet, inhabited by the Lushei tribe, and provides an extraordinary 360-degree vantage point of the surrounding hills.

### Local Flavors You Cannot Miss
No trip to Sajek is complete without ordering Pahari **Bamboo Chicken** (bamboo-stuffed spiced chicken roasted over open wood coals), fresh river fish fry, and local papayas. Pre-order your dinner by 5:00 PM as indigenous kitchens prepare meals fresh upon request!
    `,
    cover_image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
    author: 'Janntun Nahar Soha',
    author_role: 'Senior Travel Writer & QA Lead',
    author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    read_time: '6 min read',
    published_at: '2026-11-18',
    status: 'published',
    destination_id: 'dest-1',
    tags: ['Sajek Valley', 'Hill Tracts', 'Travel Guide', 'Adventure']
  },
  {
    id: 'blog-2',
    title: 'Navigating the Deep Sundarbans: A First-Timer\'s Guide to Mangrove Safari Logistics',
    slug: 'navigating-the-deep-sundarbans-safari',
    excerpt: 'Planning a multi-day wildlife expedition into the world\'s largest mangrove? Here is how to pick the right cruise vessel, what to pack, and how to spot Royal Bengal Tigers responsibly.',
    content: `
The Sundarbans delta is unlike any other national park on Earth. There are no safari jeeps or foot trails; your entire expedition unfolds along tidal channels aboard dedicated motor cruisers.

### Choosing Your Vessel
A 3-night, 4-day cruise is the sweet spot for venturing deep into the Southern sanctuary zones like Kotka, Kochikhali, and Jamtola beach. Traverse BD partners with licensed steel-hulled vessels featuring air-conditioned twin cabins, silent generators, and onboard water filtration systems.

### What to Pack
- Neutral colored clothing: Khaki, olive, brown, and grey. Avoid bright reds, oranges, or yellows that startle wildlife.
- High-grade binoculars: 8x42 or 10x42 binoculars are indispensable for spotting kingfishers, chital deer, and crocodiles along the muddy banks.
- Power banks and insect repellent: Electricity is preserved for night time on vessels.
    `,
    cover_image_url: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?auto=format&fit=crop&w=1000&q=80',
    author: 'Hafizur Rahman',
    author_role: 'Technical Lead & Expedition Planner',
    author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    read_time: '8 min read',
    published_at: '2026-11-15',
    status: 'published',
    destination_id: 'dest-2',
    tags: ['Sundarbans', 'Wildlife Safari', 'Eco Tourism']
  },
  {
    id: 'blog-3',
    title: 'Tanguar Haor by Luxury Houseboat: Everything You Need to Know for Monsoon',
    slug: 'tanguar-haor-luxury-houseboat-guide',
    excerpt: 'How the freshwater Ramsar wetland becomes an emerald inland sea between July and October, and why staying on a handcrafted wooden houseboat is a bucket-list experience.',
    content: `
When monsoon rains arrive in the Meghalaya hills across the northern border, Sunamganj transforms into an endless freshwater ocean. Tanguar Haor, spanning over 100 square kilometers, becomes a spectacle of floating water lilies, misty mountain silhouettes, and starry night reflections.

### The Modern Houseboat Renaissance
Gone are the days of basic cargo boats. Today\'s boutique houseboats offer private ensuite cabins with western washrooms, rooftop bamboo sundecks with cushioned seating, and dedicated culinary chefs serving fresh duck bhuna and local haor boal fish.
    `,
    cover_image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    author: 'Kazi Azmainur Rahman',
    author_role: 'Experience Designer',
    author_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    read_time: '5 min read',
    published_at: '2026-11-12',
    status: 'published',
    destination_id: 'dest-5',
    tags: ['Tanguar Haor', 'Houseboat', 'Monsoon Travel']
  },
  {
    id: 'blog-4',
    title: 'Top 7 Hidden Trails of Sreemangal: Tea Gardens, Khasia Villages & Lawachara Rainforest',
    slug: 'hidden-trails-of-sreemangal',
    excerpt: 'Beyond the commercial tea shops: Discover secret canopy trails inside Lawachara, bicycle routes through heritage tea gardens, and authentic Khasia betel-leaf farming communities.',
    content: `
Sreemangal is known as the tea capital of Bangladesh, but its true magic lies away from the main highway. In this detailed route breakdown, we guide you through offbeat bicycle paths and birdwatching spots.
    `,
    cover_image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    author: 'Sifat Mazib',
    author_role: 'Admin Operations Lead',
    author_avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    read_time: '5 min read',
    published_at: '2026-11-10',
    status: 'published',
    destination_id: 'dest-4',
    tags: ['Sreemangal', 'Tea Trails', 'Rainforest']
  },
  {
    id: 'blog-5',
    title: 'Cox\'s Bazar Marine Drive: Why You Should Skip the Hotel Zone and Head South',
    slug: 'coxs-bazar-marine-drive-guide',
    excerpt: 'The 80-kilometer road between Cox\'s Bazar and Teknaf is arguably the most breathtaking coastal drive in South Asia. Here is how to plan an open-jeep day trip.',
    content: `
While the town beach at Laboni and Kolatoli remains vibrant, travelers seeking tranquility and pristine seascapes should head south along the world-famous Marine Drive road.
    `,
    cover_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    author: 'Janntun Nahar Soha',
    author_role: 'Senior Travel Writer & QA Lead',
    author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    read_time: '4 min read',
    published_at: '2026-11-05',
    status: 'published',
    destination_id: 'dest-3',
    tags: ['Coxs Bazar', 'Marine Drive', 'Beaches']
  },
  {
    id: 'blog-6',
    title: 'Draft Post: Sustainable Tourism Best Practices in Bangladesh High-Altitude Regions',
    slug: 'draft-sustainable-tourism-practices',
    excerpt: 'Internal editorial draft on community-based tourism guidelines.',
    content: 'This draft article is currently undergoing internal review by Team Lithium.',
    cover_image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    author: 'Janntun Nahar Soha',
    read_time: '3 min read',
    published_at: '2026-11-20',
    status: 'draft', // Testing draft functionality
    tags: ['Editorial', 'Sustainability']
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Tanvir Hossain',
    role: 'Head of Engineering',
    organization: 'Kite Digital Ltd.',
    quote: 'Traverse BD organized our 45-person annual company retreat to Sajek Valley flawlessly. The Chander Gari coordination, hill resort cottages, and private barbecue night were executed with military precision. Booking everything over WhatsApp in minutes was unbelievably frictionless!',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    status: 'published'
  },
  {
    id: 'test-2',
    name: 'Nusrat Jahan',
    role: 'Independent Wildlife Photographer',
    organization: 'Dhaka',
    quote: 'The 4-day Sundarbans cruise exceeded all my expectations. As a solo female traveler, safety and professional guides were my top priorities. The armed rangers and quiet dawn boat rides allowed me to capture deer and kingfishers from just 15 meters away.',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    status: 'published'
  },
  {
    id: 'test-3',
    name: 'Marcus Lindqvist',
    role: 'Explorer & Documentary Filmmaker',
    organization: 'Stockholm, Sweden',
    quote: 'Bangladesh is one of South Asia’s best kept travel secrets. Traverse BD handled my foreign permits, luxury houseboat on Tanguar Haor, and local logistics with warmth and extreme competence. I cannot recommend them enough.',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    status: 'published'
  },
  {
    id: 'test-4',
    name: 'Farhana & Asif',
    role: 'Honeymoon Travelers',
    organization: 'Chittagong',
    quote: 'Our Saint Martin coral island trip was pure paradise. The ocean catamaran was comfortable and our beachfront resort was steps away from the turquoise surf. Traverse BD was responsive 24/7 on WhatsApp for all our queries.',
    rating: 5,
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    status: 'published'
  }
];

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'adm-1',
    email: 'admin@traversebd.com',
    name: 'Pointfex Admin Lead',
    role: 'super_admin',
    mfa_enabled: true,
    status: 'active',
    last_login: '2026-11-23 18:45 BST'
  },
  {
    id: 'adm-2',
    email: 'soha@traversebd.com',
    name: 'Janntun Nahar Soha (QA Lead)',
    role: 'editor',
    mfa_enabled: false,
    status: 'active',
    last_login: '2026-11-23 19:10 BST'
  }
];

export const initialAuditLogs: AuditLog[] = [
  { id: 'log-1', admin_email: 'admin@traversebd.com', action: 'PUBLISH_PACKAGE', target: 'Sajek Valley Cloud Kingdom (pkg-1)', timestamp: '2026-11-23 16:30 BST' },
  { id: 'log-2', admin_email: 'admin@traversebd.com', action: 'UPDATE_SETTINGS', target: 'Updated WhatsApp inquiry routing', timestamp: '2026-11-23 17:15 BST' },
  { id: 'log-3', admin_email: 'soha@traversebd.com', action: 'CREATE_POST', target: 'The Ultimate Sajek Valley Guide 2025', timestamp: '2026-11-23 18:00 BST' }
];

export const initialFaqs = [
  {
    question: "How does the WhatsApp booking process work?",
    answer: "Browse our tour packages, click 'Book Now via WhatsApp', and your WhatsApp will open with a pre-formatted message containing the exact package name and link. Our travel concierge will instantly reply with available departure dates, customized itinerary adjustments, and payment instructions."
  },
  {
    question: "Do you offer customized packages for private families or corporate retreats?",
    answer: "Yes! Traverse BD specializes in tailor-made itineraries for private family groups, corporate retreats, and institutional student groups. Simply reach out via WhatsApp with your preferred destination, traveler count, and tentative travel dates."
  },
  {
    question: "Are military checkpost clearances included for Chittagong Hill Tracts?",
    answer: "All required permits, vehicle convoy coordination at Dighinala, and military checkpoint clearances are handled directly by Traverse BD guides for local Bangladeshi citizens. Foreign passport holders require prior Ministry approval, which our team assists with upon booking."
  },
  {
    question: "What is your cancellation and date change policy?",
    answer: "Date changes can be requested up to 72 hours prior to scheduled departure subject to hotel/transport seat availability. Full details are shared in the booking agreement over WhatsApp."
  }
];
