'use client';

import React, { useState, useRef } from 'react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string, publicId?: string) => void;
  onDelete?: () => void;
  folder?: string;
  required?: boolean;
  helperText?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  onDelete,
  folder = 'traversebd',
  required = false,
  helperText,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [notice, setNotice] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [useDirectUrl, setUseDirectUrl] = useState(false);
  const [currentPublicId, setCurrentPublicId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_SIZE_MB = 10;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  const handleFileUpload = async (file: File) => {
    setErrorMsg('');
    setNotice('');

    // 1. Client-Side Size Validation (Max 10MB)
    if (file.size > MAX_SIZE_BYTES) {
      const actualSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setErrorMsg(`File size (${actualSizeMB}MB) exceeds the maximum allowed limit of 10MB.`);
      return;
    }

    // 2. MIME Type Validation
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Only image files (JPEG, PNG, WEBP, AVIF, GIF) are allowed.');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.data) {
        throw new Error(json.error || 'Failed to upload image.');
      }

      const { url, public_id, notice: serverNotice } = json.data;
      setCurrentPublicId(public_id);
      onChange(url, public_id);

      if (serverNotice) {
        setNotice(serverNotice);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Image upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleRemove = async () => {
    if (currentPublicId) {
      try {
        await fetch(`/api/admin/upload?public_id=${encodeURIComponent(currentPublicId)}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Failed to delete image on server:', err);
      }
    }
    setCurrentPublicId(null);
    onChange('', undefined);
    if (onDelete) onDelete();
    setErrorMsg('');
    setNotice('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
          {label} {required && <span className="text-error">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setUseDirectUrl(!useDirectUrl)}
          className="text-[11px] text-primary hover:underline font-semibold"
        >
          {useDirectUrl ? '← Upload Image File' : 'Paste Direct URL instead →'}
        </button>
      </div>

      {useDirectUrl ? (
        <div className="space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... (Direct image link)"
            className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-surface-container focus:outline-none focus:border-primary font-mono text-[11px]"
          />
          {helperText && <p className="text-[10px] text-on-surface-variant">{helperText}</p>}
        </div>
      ) : (
        <div className="space-y-2">
          {value ? (
            /* Image Preview Card */
            <div className="relative group rounded-2xl overflow-hidden border border-surface-container bg-surface-container-low p-2 flex items-center gap-3">
              <div className="relative h-20 w-28 rounded-xl overflow-hidden bg-surface-container shrink-0">
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0 pr-2">
                <span className="text-xs font-bold text-on-surface block truncate">
                  Image Ready
                </span>
                <span className="text-[10px] text-on-surface-variant font-mono block truncate">
                  {value}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 mt-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Validated (&lt;10MB Cloud Storage)
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition"
                  title="Replace with another file"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 rounded-lg text-error hover:bg-error-container/40 transition"
                  title="Remove image"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ) : (
            /* Upload Dropzone */
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-primary bg-primary/5'
                  : 'border-surface-container hover:border-primary/60 bg-surface-container-low hover:bg-surface-container'
              } ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />

              {isUploading ? (
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-bold text-primary">
                    Uploading &amp; Optimizing image (Max 10MB)...
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-on-surface block">
                      Click to upload or drag &amp; drop photo
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-medium mt-0.5 block">
                      Supported: JPG, PNG, WEBP, AVIF • Strict Limit: 10MB (Cloudinary Storage)
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-error-container text-on-error-container text-xs font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {notice && (
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 text-[11px] font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-sky-600">info</span>
              <span>{notice}</span>
            </div>
          )}

          {helperText && !errorMsg && !notice && (
            <p className="text-[10px] text-on-surface-variant">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
}
