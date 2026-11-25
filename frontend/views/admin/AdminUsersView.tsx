'use client';

import React, { useState, useEffect } from 'react';
import { AdminUser, AdminRole } from '@backend/types/admin.types';

export default function AdminUsersView() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Add User Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AdminRole>('ADMIN');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadUsers = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data.users || []);
      } else {
        setErrorMsg(data.error?.message || 'Access restricted to Super Admins.');
      }
    } catch {
      setErrorMsg('Failed to connect to administrative user service.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role }),
      });
      const data = await res.json();

      if (data.success) {
        setUsers((prev) => [...prev, data.data.user]);
        setIsModalOpen(false);
        setName('');
        setEmail('');
        setRole('ADMIN');
      } else {
        alert(data.error?.message || 'Failed to add administrator.');
      }
    } catch {
      alert('Network error while adding administrator.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleRole = async (user: AdminUser) => {
    const nextRole: AdminRole = user.role === 'SUPER_ADMIN' ? 'ADMIN' : 'SUPER_ADMIN';
    if (!confirm(`Change role of ${user.name} to ${nextRole}?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: nextRole }),
      });
      const data = await res.json();

      if (data.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, role: nextRole } : u))
        );
      }
    } catch {
      alert('Failed to change role.');
    }
  };

  const handleToggleStatus = async (user: AdminUser) => {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toggleStatus: true }),
      });
      const data = await res.json();

      if (data.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === user.id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
          )
        );
      }
    } catch {
      alert('Failed to update status.');
    }
  };

  const handleDeleteUser = async (user: AdminUser) => {
    if (!confirm(`Revoke and permanently delete administrator ${user.name} (${user.email})?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
      } else {
        alert(data.error?.message || 'Failed to delete user.');
      }
    } catch {
      alert('Failed to delete user.');
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP HEADER & ADD ADMIN BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-1.5">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            <span>Super Admin Restricted</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Admin & Staff Access Management
          </h2>
          <p className="text-xs text-slate-400">
            Enforce role-based access control (RBAC), provision staff logins, and manage permissions.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-purple-600/20 transition self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Add Administrator</span>
        </button>
      </div>

      {errorMsg ? (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
          <span className="material-symbols-outlined text-3xl text-red-400">lock</span>
          <h3 className="text-sm font-bold text-white">Access Denied</h3>
          <p className="text-xs text-slate-400">{errorMsg}</p>
        </div>
      ) : (
        /* 2. USER TABLE (Matching Stitch) */
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase font-bold text-slate-500 border-b border-slate-800 bg-slate-950/40">
                <tr>
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Role Assignment</th>
                  <th className="py-3 px-4 text-center">Account Status</th>
                  <th className="py-3 px-4">Last Active</th>
                  <th className="py-3 px-4 text-right">Access Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/40 transition">
                    {/* User Identity */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <span className="font-bold text-white block">{user.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          user.role === 'SUPER_ADMIN'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {user.role === 'SUPER_ADMIN' ? 'workspace_premium' : 'badge'}
                        </span>
                        <span>{user.role}</span>
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(user)}
                        title="Click to toggle active/inactive"
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                          user.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                            : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>

                    {/* Last Active */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {user.last_login
                        ? new Date(user.last_login).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Never logged in'}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleToggleRole(user)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700 transition"
                        >
                          Switch to {user.role === 'SUPER_ADMIN' ? 'Admin' : 'Super Admin'}
                        </button>

                        <button
                          onClick={() => handleDeleteUser(user)}
                          title="Revoke Administrator"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
                        >
                          <span className="material-symbols-outlined text-[17px]">person_remove</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ADD ADMIN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Add New Administrator</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Staff Full Name:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sifat Mazib"
                  className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Staff Email Address:</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sifat@traversebd.com"
                  className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Role Level:</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminRole)}
                  className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="ADMIN">ADMIN (Manage Packages, Destinations, Categories)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full Access & User Roles)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                >
                  {isSubmitting ? 'Adding...' : 'Provision Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
