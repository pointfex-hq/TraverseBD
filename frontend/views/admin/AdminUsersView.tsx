'use client';

import React, { useState, useEffect } from 'react';
import { AdminUser, AdminRole } from '@backend/types/admin.types';
import ConfirmDeleteModal from '@frontend/components/admin/ConfirmDeleteModal';

export default function AdminUsersView() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Add User Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AdminRole>('ADMIN');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In-App Confirm Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadUsers = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data.users || []);
        if (data.data.currentUser) {
          setCurrentUser(data.data.currentUser);
        }
      } else {
        setErrorMsg(data.error?.message || 'Access restricted to administrators.');
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

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert('Forbidden: Only Super Administrator can provision new accounts.');
      return;
    }
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
    if (!isSuperAdmin) {
      alert('Forbidden: Only Super Administrator can elevate or change staff roles.');
      return;
    }
    const nextRole: AdminRole = user.role === 'SUPER_ADMIN' ? 'ADMIN' : 'SUPER_ADMIN';

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
      } else {
        alert(data.error?.message || 'Failed to change role.');
      }
    } catch {
      alert('Failed to change role.');
    }
  };

  const handleToggleStatus = async (user: AdminUser) => {
    if (!isSuperAdmin) {
      alert('Forbidden: Only Super Administrator can toggle account active status.');
      return;
    }
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
      } else {
        alert(data.error?.message || 'Failed to update status.');
      }
    } catch {
      alert('Failed to update status.');
    }
  };

  const handleDeleteUser = (user: AdminUser) => {
    if (!isSuperAdmin) {
      alert('Forbidden: Only Super Administrator can delete administrator accounts.');
      return;
    }
    setDeleteTarget(user);
  };

  const confirmDeleteUser = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert(data.error?.message || 'Failed to delete user.');
      }
    } catch {
      alert('Failed to delete user.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP HEADER & ADD ADMIN BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-1.5 border border-purple-500/30">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            <span>{isSuperAdmin ? 'Super Admin Master Governance' : 'Staff Directory'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Admin & Staff Access Management
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Role-based access control (RBAC) governance. The master Super Admin is authenticated via deployment environment configuration (<code className="text-purple-300 font-mono">ADMIN_EMAIL</code> / <code className="text-purple-300 font-mono">ADMIN_PASSWORD</code>) and retains exclusive privileges to provision or revoke administrator accounts.
          </p>
        </div>

        {isSuperAdmin ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/25 transition self-start sm:self-auto cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Add Administrator</span>
          </button>
        ) : (
          <div className="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-400 text-xs flex items-center gap-2 self-start sm:self-auto" title="Account provisioning is restricted to Super Administrator">
            <span className="material-symbols-outlined text-[16px] text-amber-400">lock</span>
            <span className="text-[11px] font-semibold">Super Admin Only Creation</span>
          </div>
        )}
      </div>

      {/* RBAC Notification Banner */}
      {!isLoading && !isSuperAdmin && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
          <span className="material-symbols-outlined text-[20px] text-amber-400 shrink-0 mt-0.5">info</span>
          <div>
            <p className="font-bold">Standard Administrator Session</p>
            <p className="text-[11px] text-amber-300/80 mt-0.5 leading-relaxed">
              You are signed in with an administrative staff account. You can manage tour packages, categories, media galleries, travel blogs, and platform settings. Provisioning new administrators and modifying staff roles require master Super Administrator authorization.
            </p>
          </div>
        </div>
      )}

      {errorMsg ? (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-red-400">lock</span>
          <h3 className="text-base font-bold text-white">Access Restricted</h3>
          <p className="text-xs text-slate-400">{errorMsg}</p>
        </div>
      ) : (
        /* 2. USER TABLE */
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800 bg-slate-950/60">
                <tr>
                  <th className="py-3.5 px-4">Staff Member</th>
                  <th className="py-3.5 px-4">Role Level</th>
                  <th className="py-3.5 px-4 text-center">Account Status</th>
                  <th className="py-3.5 px-4">Last Active</th>
                  <th className="py-3.5 px-4 text-right">Governance Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      <div className="inline-flex items-center gap-2">
                        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                        <span>Loading staff directory...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No administrative staff accounts found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-800/40 transition">
                      {/* User Identity */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                            {user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
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
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            user.role === 'SUPER_ADMIN'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            {user.role === 'SUPER_ADMIN' ? 'workspace_premium' : 'badge'}
                          </span>
                          <span>{user.role === 'SUPER_ADMIN' ? 'Super Administrator' : 'Administrator'}</span>
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 text-center">
                        {isSuperAdmin ? (
                          <button
                            onClick={() => handleToggleStatus(user)}
                            title="Click to toggle active/inactive"
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer ${
                              user.status === 'Active'
                                ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
                                : 'bg-slate-800 text-slate-500 hover:bg-slate-700 border border-slate-700'
                            }`}
                          >
                            {user.status}
                          </button>
                        ) : (
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${
                              user.status === 'Active'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-slate-800 text-slate-500 border border-slate-700'
                            }`}
                          >
                            {user.status}
                          </span>
                        )}
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
                        {isSuperAdmin ? (
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => handleToggleRole(user)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700 transition cursor-pointer"
                            >
                              Switch to {user.role === 'SUPER_ADMIN' ? 'Admin' : 'Super Admin'}
                            </button>

                            <button
                              onClick={() => handleDeleteUser(user)}
                              title="Revoke Administrator"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[17px]">person_remove</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-500 italic">
                            Super Admin Protected
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ADD ADMIN MODAL */}
      {isModalOpen && isSuperAdmin && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-400">person_add</span>
                <h3 className="text-base font-bold text-white">Add New Administrator</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
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
                  <option value="ADMIN">ADMIN (Packages, Categories, Gallery, Blogs, Settings)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full Governance & User Management)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Provisioning...' : 'Provision Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* In-App Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title="Revoke Administrator Account"
        message={`Are you sure you want to permanently revoke and delete administrator "${deleteTarget?.name}" (${deleteTarget?.email})? They will immediately lose all administrative dashboard access.`}
        confirmLabel="Revoke Administrator"
        isDeleting={isDeleting}
        onConfirm={confirmDeleteUser}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
