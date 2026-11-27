'use client';

import React, { useState, useEffect } from 'react';
import { Destination } from '@backend/types/database.types';
import ImageUploadField from '@frontend/components/admin/ImageUploadField';
import ConfirmDeleteModal from '@frontend/components/admin/ConfirmDeleteModal';

export default function AdminDestinationsView() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);

  // Form Fields
  const [nameEn, setNameEn] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [region, setRegion] = useState('Chittagong Division');
  const [shortDescEn, setShortDescEn] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In-App Confirm Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadDestinations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/destinations');
      const data = await res.json();
      if (data.success) {
        setDestinations(data.data.destinations || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  const openCreateModal = () => {
    setEditingDest(null);
    setNameEn('');
    setNameBn('');
    setRegion('Chittagong Division');
    setShortDescEn('');
    setCoverImageUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (dest: Destination) => {
    setEditingDest(dest);
    setNameEn(dest.name_en);
    setNameBn(dest.name_bn);
    setRegion(dest.region);
    setShortDescEn(dest.short_description_en);
    setCoverImageUrl(dest.cover_image_url);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name_en: nameEn,
      name_bn: nameBn || nameEn,
      region,
      short_description_en: shortDescEn,
      short_description_bn: shortDescEn,
      cover_image_url: coverImageUrl,
    };

    try {
      if (editingDest) {
        const res = await fetch(`/api/admin/destinations/${editingDest.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setDestinations((prev) =>
            prev.map((d) => (d.id === editingDest.id ? data.data.destination : d))
          );
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/destinations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setDestinations((prev) => [...prev, data.data.destination]);
          setIsModalOpen(false);
        }
      }
    } catch {
      alert('Failed to save destination.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteDestination = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/destinations/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        setDestinations((prev) => prev.filter((d) => d.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert('Failed to delete destination.');
      }
    } catch {
      alert('Failed to delete destination.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            Destinations &amp; Regions
          </h2>
          <p className="text-xs text-slate-400">
            Manage Bangladesh tourism hubs and divisional geographic clusters.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition w-full sm:w-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_location_alt</span>
          <span>Add Destination</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={dest.cover_image_url}
                  alt={dest.name_en}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-slate-300 border border-slate-700">
                    {dest.region}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-white">{dest.name_en}</h3>
                <p className="text-xs text-slate-400 font-bengali">{dest.name_bn}</p>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {dest.short_description_en}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">ID: {dest.slug}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(dest)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <span className="material-symbols-outlined text-[17px]">edit</span>
                </button>
                <button
                  onClick={() => setDeleteTarget({ id: dest.id, name: dest.name_en })}
                  title="Delete Destination"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-6 sm:p-8 space-y-5 shadow-2xl my-2 sm:my-8 max-h-[94vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingDest ? 'Edit Destination' : 'Add New Destination'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Name (English):</label>
                <input
                  type="text"
                  required
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g. Sajek Valley"
                  className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Name (বাংলা):</label>
                <input
                  type="text"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  placeholder="e.g. সাজেক ভ্যালি"
                  className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Division / Region:</label>
                <input
                  type="text"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="e.g. Rangamati Hill District"
                  className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <ImageUploadField
                label="Destination Cover Image"
                value={coverImageUrl}
                onChange={(url) => setCoverImageUrl(url)}
                folder="destinations"
                required
                helperText="Upload landscape image (<10MB) or paste direct image URL."
              />

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Short Summary:</label>
                <textarea
                  rows={2}
                  required
                  value={shortDescEn}
                  onChange={(e) => setShortDescEn(e.target.value)}
                  placeholder="Scenic highlights and overview..."
                  className="w-full bg-slate-800 text-white text-xs p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 cursor-pointer"
                >
                  {isSubmitting ? 'Saving...' : 'Save Destination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title="Delete Destination"
        message={`Are you sure you want to permanently delete destination "${deleteTarget?.name}"? Associated packages may need reassignment.`}
        confirmLabel="Delete Destination"
        isDeleting={isDeleting}
        onConfirm={confirmDeleteDestination}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
