'use client';

import React, { useState } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: 'hills' | 'coastal' | 'forest' | 'riverine';
  imageUrl: string;
  badge: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: '1',
    title: 'Sea of Morning Clouds',
    location: 'Sajek Valley, Rangamati',
    category: 'hills',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASAT_2ttF1EyaMdO--79s3RjFjm94mRlfHKISQfnmq7WWHgd9o0iMtg-lpW3CQf3X4qHxoeLfrJ0_bHiTuNZBmmTLQH4GYjq5-AMJNJCs_N0zhOWzHZ3UCV5iD3rOcbuyjcmEUFlAMkmL3MP0fg_7iBhHCU_AYFzLfY93y9QOA478jwkysmnbF_JFun5dOJ3FsnnFL0ZqH33k1UD6PpnqZlYuJpO4ms9QR2UvF6RS8',
    badge: 'Sunrise Expedition',
  },
  {
    id: '2',
    title: 'Azure Waters & Timber Dinghies',
    location: 'Saint Martin Island',
    category: 'coastal',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCronGxuKPy8fONsNSjrm3agcaahqrCdxUKpcuQ9p2biYutpSedPOJNqDpSXBlUiwe8VjJcsv8UJL4DvQ-mYIuuT37S-S_uom6eKXCcP3_RUO7-PkEs8n7nxyyva_VilQGjM4BW9k5m4tXRPv5yl0tzTLsTGTFgEFvROSEQR8NBmOkOsFShNx2LGobEiJR6lVJb5Lagagdb8JPdutMtfE24oY8Aw_5N80NaOn1OcTQq',
    badge: 'Coral Shoreline',
  },
  {
    id: '3',
    title: 'Mist on the Mangrove Shore',
    location: 'Sundarbans Tiger Reserve',
    category: 'forest',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ltl9s44tZznBR-chQOfzFdlgvz929W8Mv59Lbl7Py1Lr7y6LCvHCfN74TcFjXFUBcWwD7cC4m3HSQ4_xEnvfNGnuYoKEHwy3V1VVL983K7o90EC8kicT3vgAjNbG0mzqFhjISDf2YA_tADVLiqQO6B6_p1PtCtTtM3baPuWe4GiI0YxU0NxOmvoPCiMQdozpgA9V9qywzFe3wycNheWw-0EuOtV_0cDtoW9qivz3',
    badge: 'UNESCO Heritage',
  },
  {
    id: '4',
    title: 'The Emerald Mirror Basin',
    location: 'Sreemangal Tea Estates',
    category: 'forest',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgEKe7tppNfuh1Sbs_v49LQUwlZwoKAX8vUxsYFWIcShtRYia_8P1Ki3u2uJS8yffGLXVgIAwHoAI-X8wBuSbFGQiJM2pa1gtnOSMmSky2KIp46083ecfUbo3AxfnAgytdqp2LsiDq8GB_BBjiSokFAUHsv9Gdl2BYNkMBbvpMaSCI6Xp7lA7qD8BZfX1tZL1hc_Vmb_DsUuNvcg0_MCxAMbCE-uP56rZUoElqAYnY',
    badge: 'Rainforest Sanctuary',
  },
  {
    id: '5',
    title: 'Twilight Coral Outcrops',
    location: 'Inani Beach, Cox’s Bazar',
    category: 'coastal',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6huiY8lX9w1C9yO5XBiGgO1CWKPEfVUrBm8r6qyQesxRdLfkwzcwTay-PFK2g2wD_sHypnN564FYc_kfj56-lif3zKx-r8id6NrEqUpuQ-ci3QpZj7xxweV4mzyhz4Jj_U6XftXBB_ifB7KN7x_4glcXyjnKWnKhFpUbC7rTVxmHLwLdRZVo4yPh5rstrLYarY2eNJhESXJ3NAcmc-077CWNpUhnxxXpWrxO2gG2v',
    badge: 'Marine Horizon',
  },
  {
    id: '6',
    title: 'Jungle Falls of Amiakhum',
    location: 'Thanchi, Bandarban',
    category: 'hills',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHXu_sxkrQ5bg4x1PXJ4JLV4lLgom0g5DvHdfP9yvwko07yQ9a7Wn-cUykN_mJcwxbiyz_S4VGuo3N8neE5rIirRnyxd_cmVuuwHrE0kNRRhfnnQSEXrd-p8mcULbcgYEZ034fPPbyIIDJefWHvjQ7CisFSJFKhsTloL_55mnBOevlYtgMjyqO3MsYKVPZNSnQi8Kx6Z_P12Dbore6hemqSV6RRpFUcz3ld6rMe52Z',
    badge: 'Wild Trek',
  },
];

interface GalleryViewProps {
  initialItems?: GalleryItem[];
}

export default function GalleryView({ initialItems }: GalleryViewProps) {
  const [items] = useState<GalleryItem[]>(initialItems && initialItems.length > 0 ? initialItems : GALLERY_DATA);
  const [filter, setFilter] = useState<'all' | 'hills' | 'coastal' | 'forest'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filteredItems =
    filter === 'all' ? items : items.filter((item) => item.category === filter);

  return (
    <main className="space-y-14 pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden bg-surface-container-low/70 border-b border-surface-container py-14 px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm border border-surface-container">
            <span className="material-symbols-outlined text-primary text-[16px]">photo_camera</span>
            <span className="text-xs uppercase tracking-wider text-primary font-bold">
              Visual Archives of Bengal
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight">
            Moments Captured Across Wild Bangladesh
          </h1>

          <p className="text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            From the clouds of Sajek to the bioluminescent beaches of Saint Martin and ancient mangrove waterways. High-resolution dispatches from our traveler expeditions.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { key: 'all', label: 'All Photographs' },
              { key: 'hills', label: 'Hills & Cloud Peaks' },
              { key: 'coastal', label: 'Coral Shores & Beaches' },
              { key: 'forest', label: 'Mangroves & Rainforests' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  filter === tab.key
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PHOTO MASONRY / GRID (Stitch Gallery Layout) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-glass-hover transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                  {item.badge}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <h3 className="text-lg font-extrabold tracking-tight group-hover:text-primary-fixed transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-white/80">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full rounded-3xl overflow-hidden bg-surface-container-lowest border border-white/10 shadow-2xl space-y-4"
          >
            <div className="relative max-h-[70vh] overflow-hidden">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain max-h-[70vh]"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-on-surface">{selectedPhoto.title}</h3>
                <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    location_on
                  </span>
                  <span>{selectedPhoto.location}</span>
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {selectedPhoto.badge}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. SOCIAL CALLOUT */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 sm:p-12 text-center space-y-3 shadow-sm">
          <span className="material-symbols-outlined text-3xl text-primary">camera</span>
          <h2 className="text-2xl font-bold text-on-surface">Tag #TraverseBD to Get Featured</h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Share your photos from our guided expeditions on Instagram or Facebook with the tag <strong className="text-primary font-bold">#TraverseBD</strong> to be highlighted on our official portal.
          </p>
        </div>
      </section>
    </main>
  );
}
