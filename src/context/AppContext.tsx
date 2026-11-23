import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Package, Destination, Category, GalleryImage, BlogPost, 
  Testimonial, SiteSettings, AdminUser, AuditLog, PackageItem 
} from '../types';
import { 
  initialPackages, initialDestinations, initialCategories, 
  initialGalleryImages, initialBlogPosts, initialTestimonials, 
  initialSiteSettings, initialAdminUsers, initialAuditLogs 
} from '../data/mockData';

interface AppContextType {
  packages: Package[];
  destinations: Destination[];
  categories: Category[];
  gallery: GalleryImage[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  settings: SiteSettings;
  auditLogs: AuditLog[];
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  
  // Public selectors (only published items as per FR-30 & DATA-01)
  publishedPackages: Package[];
  publishedDestinations: Destination[];
  publishedGallery: GalleryImage[];
  publishedBlogs: BlogPost[];
  publishedTestimonials: Testimonial[];

  // WhatsApp helper
  getWhatsAppLink: (pkg?: { title: string; slug: string }) => string;

  // Package Actions
  addPackage: (data: Omit<Package, 'id' | 'created_at' | 'updated_at'>) => Package;
  updatePackage: (id: string, data: Partial<Package>) => void;
  deletePackage: (id: string) => void;
  togglePackagePublish: (id: string) => void;
  togglePackageFeatured: (id: string) => void;
  togglePackageTrending: (id: string) => void;

  // Destination Actions
  addDestination: (data: Omit<Destination, 'id' | 'created_at' | 'updated_at'>) => Destination;
  updateDestination: (id: string, data: Partial<Destination>) => void;
  deleteDestination: (id: string) => { success: boolean; message?: string };
  toggleDestinationPublish: (id: string) => void;

  // Gallery Actions
  addGalleryImage: (data: Omit<GalleryImage, 'id'>) => GalleryImage;
  deleteGalleryImage: (id: string) => void;
  toggleGalleryPublish: (id: string) => void;

  // Blog Actions
  addBlogPost: (data: Omit<BlogPost, 'id'>) => BlogPost;
  updateBlogPost: (id: string, data: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  toggleBlogPublish: (id: string) => void;

  // Settings
  updateSettings: (newSettings: Partial<SiteSettings>) => void;

  // Auth
  login: (email: string, pass: string, totpCode?: string) => { success: boolean; requiresMfa?: boolean; error?: string };
  logout: () => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PACKAGES: 'traversebd_packages_v1',
  DESTINATIONS: 'traversebd_destinations_v1',
  CATEGORIES: 'traversebd_categories_v1',
  GALLERY: 'traversebd_gallery_v1',
  BLOGS: 'traversebd_blogs_v1',
  SETTINGS: 'traversebd_settings_v1',
  AUDIT_LOGS: 'traversebd_audit_logs_v1',
  ADMIN_SESSION: 'traversebd_admin_session_v1',
};

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<Package[]>(() => loadStorage(STORAGE_KEYS.PACKAGES, initialPackages));
  const [destinations, setDestinations] = useState<Destination[]>(() => loadStorage(STORAGE_KEYS.DESTINATIONS, initialDestinations));
  const [categories] = useState<Category[]>(() => loadStorage(STORAGE_KEYS.CATEGORIES, initialCategories));
  const [gallery, setGallery] = useState<GalleryImage[]>(() => loadStorage(STORAGE_KEYS.GALLERY, initialGalleryImages));
  const [blogs, setBlogs] = useState<BlogPost[]>(() => loadStorage(STORAGE_KEYS.BLOGS, initialBlogPosts));
  const [testimonials] = useState<Testimonial[]>(initialTestimonials);
  const [settings, setSettings] = useState<SiteSettings>(() => loadStorage(STORAGE_KEYS.SETTINGS, initialSiteSettings));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => loadStorage(STORAGE_KEYS.AUDIT_LOGS, initialAuditLogs));
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => loadStorage(STORAGE_KEYS.ADMIN_SESSION, null));

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    }
  }, [adminUser]);

  const addAudit = (action: string, target: string) => {
    const log: AuditLog = {
      id: 'log-' + Date.now(),
      admin_email: adminUser?.email || 'admin@traversebd.com',
      action,
      target,
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }) + ' BST'
    };
    setAuditLogs(prev => [log, ...prev].slice(0, 50));
  };

  // WhatsApp Link Helper as per SRS FR-16 & 12.2
  const getWhatsAppLink = (pkg?: { title: string; slug: string }) => {
    const cleanNumber = (settings.whatsapp_number || '8801627444330').replace(/[^0-9]/g, '');
    if (!pkg) {
      const defaultText = `Hello Traverse BD! I would like to inquire about traveling with you. Please share package details and custom tour options.`;
      return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultText)}`;
    }
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://traversebd.vercel.app';
    const packageUrl = `${currentOrigin}/packages/${pkg.slug}`;
    const rawMessage = settings.whatsapp_message || 'Hello! I would like to inquire about the package "{packageName}". Package link: {packageUrl}. Please share availability and booking details. Thank you.';
    const formattedMessage = rawMessage
      .replace(/{packageName}/g, pkg.title)
      .replace(/{packageUrl}/g, packageUrl);
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(formattedMessage)}`;
  };

  // Package methods
  const addPackage = (data: Omit<Package, 'id' | 'created_at' | 'updated_at'>): Package => {
    const newPkg: Package = {
      ...data,
      id: 'pkg-' + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setPackages(prev => [newPkg, ...prev]);
    addAudit('CREATE_PACKAGE', newPkg.title);
    return newPkg;
  };

  const updatePackage = (id: string, data: Partial<Package>) => {
    setPackages(prev => prev.map(p => p.id === id ? { ...p, ...data, updated_at: new Date().toISOString() } : p));
    const target = packages.find(p => p.id === id);
    addAudit('UPDATE_PACKAGE', target?.title || id);
  };

  const deletePackage = (id: string) => {
    const target = packages.find(p => p.id === id);
    setPackages(prev => prev.filter(p => p.id !== id));
    addAudit('DELETE_PACKAGE', target?.title || id);
  };

  const togglePackagePublish = (id: string) => {
    setPackages(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'published' ? 'draft' : 'published';
        addAudit(nextStatus === 'published' ? 'PUBLISH_PACKAGE' : 'UNPUBLISH_PACKAGE', p.title);
        return { ...p, status: nextStatus, updated_at: new Date().toISOString() };
      }
      return p;
    }));
  };

  const togglePackageFeatured = (id: string) => {
    setPackages(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, is_featured: !p.is_featured, updated_at: new Date().toISOString() };
      }
      return p;
    }));
  };

  const togglePackageTrending = (id: string) => {
    setPackages(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, is_trending: !p.is_trending, updated_at: new Date().toISOString() };
      }
      return p;
    }));
  };

  // Destination methods
  const addDestination = (data: Omit<Destination, 'id' | 'created_at' | 'updated_at'>): Destination => {
    const newDest: Destination = {
      ...data,
      id: 'dest-' + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setDestinations(prev => [newDest, ...prev]);
    addAudit('CREATE_DESTINATION', newDest.name);
    return newDest;
  };

  const updateDestination = (id: string, data: Partial<Destination>) => {
    setDestinations(prev => prev.map(d => d.id === id ? { ...d, ...data, updated_at: new Date().toISOString() } : d));
    const target = destinations.find(d => d.id === id);
    addAudit('UPDATE_DESTINATION', target?.name || id);
  };

  const deleteDestination = (id: string): { success: boolean; message?: string } => {
    // Check if packages are attached as per SRS DATA-03 & NFR-15
    const hasPackages = packages.some(p => p.destination_id === id);
    if (hasPackages) {
      return { success: false, message: 'Cannot delete destination: Active packages are still assigned to this destination. Please reassign or delete those packages first.' };
    }
    const target = destinations.find(d => d.id === id);
    setDestinations(prev => prev.filter(d => d.id !== id));
    addAudit('DELETE_DESTINATION', target?.name || id);
    return { success: true };
  };

  const toggleDestinationPublish = (id: string) => {
    setDestinations(prev => prev.map(d => {
      if (d.id === id) {
        const nextStatus = d.status === 'published' ? 'draft' : 'published';
        addAudit(nextStatus === 'published' ? 'PUBLISH_DESTINATION' : 'UNPUBLISH_DESTINATION', d.name);
        return { ...d, status: nextStatus, updated_at: new Date().toISOString() };
      }
      return d;
    }));
  };

  // Gallery methods
  const addGalleryImage = (data: Omit<GalleryImage, 'id'>): GalleryImage => {
    const newImg: GalleryImage = {
      ...data,
      id: 'gal-' + Date.now(),
    };
    setGallery(prev => [newImg, ...prev]);
    addAudit('UPLOAD_GALLERY_IMAGE', data.caption);
    return newImg;
  };

  const deleteGalleryImage = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    addAudit('DELETE_GALLERY_IMAGE', id);
  };

  const toggleGalleryPublish = (id: string) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, status: g.status === 'published' ? 'draft' : 'published' } : g));
  };

  // Blog methods
  const addBlogPost = (data: Omit<BlogPost, 'id'>): BlogPost => {
    const newPost: BlogPost = {
      ...data,
      id: 'blog-' + Date.now(),
    };
    setBlogs(prev => [newPost, ...prev]);
    addAudit('CREATE_BLOG_POST', newPost.title);
    return newPost;
  };

  const updateBlogPost = (id: string, data: Partial<BlogPost>) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
    const target = blogs.find(b => b.id === id);
    addAudit('UPDATE_BLOG_POST', target?.title || id);
  };

  const deleteBlogPost = (id: string) => {
    const target = blogs.find(b => b.id === id);
    setBlogs(prev => prev.filter(b => b.id !== id));
    addAudit('DELETE_BLOG_POST', target?.title || id);
  };

  const toggleBlogPublish = (id: string) => {
    setBlogs(prev => prev.map(b => {
      if (b.id === id) {
        const nextStatus = b.status === 'published' ? 'draft' : 'published';
        addAudit(nextStatus === 'published' ? 'PUBLISH_BLOG_POST' : 'UNPUBLISH_BLOG_POST', b.title);
        return { ...b, status: nextStatus };
      }
      return b;
    }));
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addAudit('UPDATE_SITE_SETTINGS', 'System Contact and WhatsApp Details');
  };

  // Admin Auth (with demo support for TOTP 2FA)
  const login = (email: string, pass: string, totpCode?: string) => {
    const targetUser = initialAdminUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!targetUser || pass !== 'admin123') {
      return { success: false, error: 'Invalid email or password. (Demo: admin@traversebd.com / admin123)' };
    }

    // Check MFA if enabled
    if (targetUser.mfa_enabled) {
      if (!totpCode) {
        return { success: false, requiresMfa: true, error: 'Two-Factor Authentication is enabled. Please enter your 6-digit TOTP code (Demo: 123456).' };
      }
      if (totpCode.trim() !== '123456') {
        return { success: false, requiresMfa: true, error: 'Invalid 2FA code. Use 123456 for this demo.' };
      }
    }

    const sessionUser: AdminUser = {
      ...targetUser,
      last_login: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }) + ' BST'
    };
    setAdminUser(sessionUser);
    addAudit('ADMIN_LOGIN', sessionUser.email);
    return { success: true };
  };

  const logout = () => {
    if (adminUser) {
      addAudit('ADMIN_LOGOUT', adminUser.email);
    }
    setAdminUser(null);
  };

  const resetToDefaults = () => {
    setPackages(initialPackages);
    setDestinations(initialDestinations);
    setGallery(initialGalleryImages);
    setBlogs(initialBlogPosts);
    setSettings(initialSiteSettings);
    setAuditLogs(initialAuditLogs);
    localStorage.clear();
  };

  // Filtered published views for public site (FR-30)
  const publishedPackages = packages.filter(p => p.status === 'published');
  const publishedDestinations = destinations.filter(d => d.status === 'published');
  const publishedGallery = gallery.filter(g => g.status === 'published');
  const publishedBlogs = blogs.filter(b => b.status === 'published');
  const publishedTestimonials = testimonials.filter(t => t.status === 'published');

  return (
    <AppContext.Provider
      value={{
        packages,
        destinations,
        categories,
        gallery,
        blogs,
        testimonials,
        settings,
        auditLogs,
        adminUser,
        isAuthenticated: !!adminUser,

        publishedPackages,
        publishedDestinations,
        publishedGallery,
        publishedBlogs,
        publishedTestimonials,

        getWhatsAppLink,

        addPackage,
        updatePackage,
        deletePackage,
        togglePackagePublish,
        togglePackageFeatured,
        togglePackageTrending,

        addDestination,
        updateDestination,
        deleteDestination,
        toggleDestinationPublish,

        addGalleryImage,
        deleteGalleryImage,
        toggleGalleryPublish,

        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        toggleBlogPublish,

        updateSettings,

        login,
        logout,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
