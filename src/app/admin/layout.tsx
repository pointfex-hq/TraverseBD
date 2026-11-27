'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@frontend/components/admin/AdminSidebar';
import AdminHeader from '@frontend/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const getPageTitle = () => {
    if (pathname.includes('/packages')) return 'Tour Packages & Departures';
    if (pathname.includes('/categories')) return 'Tour Categories';
    if (pathname.includes('/gallery')) return 'Gallery Visual Dispatches';
    if (pathname.includes('/blogs')) return 'Travel Blogs & Guides';
    if (pathname.includes('/settings')) return 'Platform Global Settings';
    if (pathname.includes('/users')) return 'Staff & Role Management';
    return 'Executive Overview';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title={getPageTitle()}
          subtitle="TraverseBD Operations & Control Center"
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
