'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@frontend/components/admin/AdminSidebar';
import AdminHeader from '@frontend/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const getPageTitle = () => {
    if (pathname.includes('/packages')) return 'Tour Packages & Departures';
    if (pathname.includes('/destinations')) return 'Destinations & Regions';
    if (pathname.includes('/categories')) return 'Tour Categories';
    if (pathname.includes('/users')) return 'Staff & Role Management';
    return 'Executive Overview';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title={getPageTitle()} subtitle="TraverseBD Operations & Control Center" />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
