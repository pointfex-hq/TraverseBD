'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminDashboardMetrics, AdminAuditLog } from '@backend/types/admin.types';

export default function AdminDashboardView() {
  const [metrics, setMetrics] = useState<AdminDashboardMetrics | null>(null);
  const [logs, setLogs] = useState<AdminAuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        const data = await res.json();
        if (data.success && data.data) {
          setMetrics(data.data.metrics);
          setLogs(data.data.recentLogs || []);
        }
      } catch (e) {
        console.error('Failed to load dashboard:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* 1. METRICS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Packages */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Tour Packages</span>
            <span className="material-symbols-outlined text-primary-fixed">tour</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {metrics ? metrics.totalPackages : '...'}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span className="text-emerald-400 font-bold">
              {metrics ? metrics.publishedPackages : 0} Published
            </span>
            <span>•</span>
            <span className="text-slate-500 font-medium">
              {metrics ? metrics.draftPackages : 0} Drafts
            </span>
          </div>
        </div>

        {/* Card 2: Destinations */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Destinations</span>
            <span className="material-symbols-outlined text-sky-400">location_on</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {metrics ? metrics.totalDestinations : '...'}
          </div>
          <div className="text-[11px] text-slate-400">
            Across 5 Divisions in Bangladesh
          </div>
        </div>

        {/* Card 3: Departures & Seats */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Seats & Batches</span>
            <span className="material-symbols-outlined text-amber-400">event_seat</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {metrics ? metrics.totalAvailableSeats : '...'}
          </div>
          <div className="text-[11px] text-slate-400">
            Available seats across {metrics ? metrics.totalDepartures : 0} batches
          </div>
        </div>

        {/* Card 4: Administrative Team */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">System Staff</span>
            <span className="material-symbols-outlined text-purple-400">shield_person</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {metrics ? metrics.totalAdmins : '...'}
          </div>
          <div className="text-[11px] text-purple-300 font-medium">
            {metrics ? metrics.superAdmins : 0} Super Admins (RBAC Active)
          </div>
        </div>
      </div>

      {/* 2. QUICK ACTIONS */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-white">Operational Shortcuts</h2>
          <p className="text-xs text-slate-400">
            Manage packages, schedule departure batches, or review administrative access.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/packages"
            className="px-3 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <span className="material-symbols-outlined text-[16px]">tour</span>
            <span>Packages</span>
          </Link>

          <Link
            href="/admin/destinations"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition"
          >
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            <span>Destinations</span>
          </Link>

          <Link
            href="/admin/gallery"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition"
          >
            <span className="material-symbols-outlined text-[16px]">photo_library</span>
            <span>Gallery</span>
          </Link>

          <Link
            href="/admin/blogs"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition"
          >
            <span className="material-symbols-outlined text-[16px]">article</span>
            <span>Blogs</span>
          </Link>

          <Link
            href="/admin/settings"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Settings</span>
          </Link>

          <Link
            href="/admin/users"
            className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-bold flex items-center gap-1.5 border border-purple-500/30 transition"
          >
            <span className="material-symbols-outlined text-[16px]">manage_accounts</span>
            <span>Staff</span>
          </Link>
        </div>
      </div>

      {/* 3. RECENT SECURITY AUDIT TRAIL */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm space-y-4 p-4 sm:p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-fixed text-lg">history</span>
              <span>Administrative Security & Activity Log</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Audit log of all mutations, package status changes, and staff access actions.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 min-w-[640px]">
            <thead className="text-[10px] uppercase font-bold text-slate-500 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Administrator</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Target Resource</th>
                <th className="py-2.5 px-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3 px-3 font-sans font-semibold text-white whitespace-nowrap">
                    {log.user_email}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-primary-fixed">{log.resource}</td>
                  <td className="py-3 px-3 font-sans text-slate-300">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
