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
  category: 'hills' | 'coastal' | 'forest' | 'riverine';
  imageUrl: string;
  badge: string;
  created_at?: string;
}

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Sea of Morning Clouds',
    location: 'Sajek Valley, Rangamati',
    category: 'hills',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASAT_2ttF1EyaMdO--79s3RjFjm94mRlfHKISQfnmq7WWHgd9o0iMtg-lpW3CQf3X4qHxoeLfrJ0_bHiTuNZBmmTLQH4GYjq5-AMJNJCs_N0zhOWzHZ3UCV5iD3rOcbuyjcmEUFlAMkmL3MP0fg_7iBhHCU_AYFzLfY93y9QOA478jwkysmnbF_JFun5dOJ3FsnnFL0ZqH33k1UD6PpnqZlYuJpO4ms9QR2UvF6RS8',
    badge: 'Sunrise Expedition',
    created_at: '2026-11-20T08:00:00Z',
  },
  {
    id: 'gal-2',
    title: 'Azure Waters & Timber Dinghies',
    location: 'Saint Martin Island',
    category: 'coastal',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCronGxuKPy8fONsNSjrm3agcaahqrCdxUKpcuQ9p2biYutpSedPOJNqDpSXBlUiwe8VjJcsv8UJL4DvQ-mYIuuT37S-S_uom6eKXCcP3_RUO7-PkEs8n7nxyyva_VilQGjM4BW9k5m4tXRPv5yl0tzTLsTGTFgEFvROSEQR8NBmOkOsFShNx2LGobEiJR6lVJb5Lagagdb8JPdutMtfE24oY8Aw_5N80NaOn1OcTQq',
    badge: 'Coral Shoreline',
    created_at: '2026-11-20T09:00:00Z',
  },
  {
    id: 'gal-3',
    title: 'Mist on the Mangrove Shore',
    location: 'Sundarbans Tiger Reserve',
    category: 'forest',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ltl9s44tZznBR-chQOfzFdlgvz929W8Mv59Lbl7Py1Lr7y6LCvHCfN74TcFjXFUBcWwD7cC4m3HSQ4_xEnvfNGnuYoKEHwy3V1VVL983K7o90EC8kicT3vgAjNbG0mzqFhjISDf2YA_tADVLiqQO6B6_p1PtCtTtM3baPuWe4GiI0YxU0NxOmvoPCiMQdozpgA9V9qywzFe3wycNheWw-0EuOtV_0cDtoW9qivz3',
    badge: 'UNESCO Heritage',
    created_at: '2026-11-20T10:00:00Z',
  },
  {
    id: 'gal-4',
    title: 'The Emerald Mirror Basin',
    location: 'Sreemangal Tea Estates',
    category: 'forest',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgEKe7tppNfuh1Sbs_v49LQUwlZwoKAX8vUxsYFWIcShtRYia_8P1Ki3u2uJS8yffGLXVgIAwHoAI-X8wBuSbFGQiJM2pa1gtnOSMmSky2KIp46083ecfUbo3AxfnAgytdqp2LsiDq8GB_BBjiSokFAUHsv9Gdl2BYNkMBbvpMaSCI6Xp7lA7qD8BZfX1tZL1hc_Vmb_DsUuNvcg0_MCxAMbCE-uP56rZUoElqAYnY',
    badge: 'Rainforest Sanctuary',
    created_at: '2026-11-20T11:00:00Z',
  },
  {
    id: 'gal-5',
    title: 'Twilight Coral Outcrops',
    location: 'Inani Beach, Cox’s Bazar',
    category: 'coastal',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6huiY8lX9w1C9yO5XBiGgO1CWKPEfVUrBm8r6qyQesxRdLfkwzcwTay-PFK2g2wD_sHypnN564FYc_kfj56-lif3zKx-r8id6NrEqUpuQ-ci3QpZj7xxweV4mzyhz4Jj_U6XftXBB_ifB7KN7x_4glcXyjnKWnKhFpUbC7rTVxmHLwLdRZVo4yPh5rstrLYarY2eNJhESXJ3NAcmc-077CWNpUhnxxXpWrxO2gG2v',
    badge: 'Marine Horizon',
    created_at: '2026-11-20T12:00:00Z',
  },
  {
    id: 'gal-6',
    title: 'Jungle Falls of Amiakhum',
    location: 'Thanchi, Bandarban',
    category: 'hills',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHXu_sxkrQ5bg4x1PXJ4JLV4lLgom0g5DvHdfP9yvwko07yQ9a7Wn-cUykN_mJcwxbiyz_S4VGuo3N8neE5rIirRnyxd_cmVuuwHrE0kNRRhfnnQSEXrd-p8mcULbcgYEZ034fPPbyIIDJefWHvjQ7CisFSJFKhsTloL_55mnBOevlYtgMjyqO3MsYKVPZNSnQi8Kx6Z_P12Dbore6hemqSV6RRpFUcz3ld6rMe52Z',
    badge: 'Wild Trek',
    created_at: '2026-11-20T13:00:00Z',
  },
];

// In-Memory state store for local CRUD persistence
class AdminMemoryStore {
  public packages: Package[] = JSON.parse(JSON.stringify(MOCK_PACKAGES));
  public destinations: Destination[] = JSON.parse(JSON.stringify(MOCK_DESTINATIONS));
  public categories: Category[] = JSON.parse(JSON.stringify(MOCK_CATEGORIES));
  public gallery: GalleryItem[] = JSON.parse(JSON.stringify(INITIAL_GALLERY_ITEMS));
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
