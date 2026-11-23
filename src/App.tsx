import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Public Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { DestinationsPage } from './pages/public/DestinationsPage';
import { DestinationDetailPage } from './pages/public/DestinationDetailPage';
import { PackagesPage } from './pages/public/PackagesPage';
import { PackageDetailPage } from './pages/public/PackageDetailPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { BlogPage } from './pages/public/BlogPage';
import { BlogPostPage } from './pages/public/BlogPostPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminPackagesPage } from './pages/admin/AdminPackagesPage';
import { AdminDestinationsPage } from './pages/admin/AdminDestinationsPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminBlogPage } from './pages/admin/AdminBlogPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminAuditPage } from './pages/admin/AdminAuditPage';

// Scroll To Top on route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public Layout wrapper with Navbar, Footer, and Floating WhatsApp
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/destinations" element={<PublicLayout><DestinationsPage /></PublicLayout>} />
          <Route path="/destinations/:slug" element={<PublicLayout><DestinationDetailPage /></PublicLayout>} />
          <Route path="/packages" element={<PublicLayout><PackagesPage /></PublicLayout>} />
          <Route path="/packages/:slug" element={<PublicLayout><PackageDetailPage /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
          <Route path="/blog/:slug" element={<PublicLayout><BlogPostPage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Protected CMS */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="packages" element={<AdminPackagesPage />} />
            <Route path="destinations" element={<AdminDestinationsPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="blog" element={<AdminBlogPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="audit" element={<AdminAuditPage />} />
          </Route>

          {/* 404 Recovery (FR-09 / S-09) */}
          <Route path="/404" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
          <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
