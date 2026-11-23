import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, Phone, Mail, MapPin, MessageSquare, 
  Save, CheckCircle2, AlertCircle, RefreshCw 
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings } = useApp();

  const [formState, setFormState] = useState({
    organization_name: settings.organization_name,
    contact_phone: settings.contact_phone,
    contact_email: settings.contact_email,
    address: settings.address,
    whatsapp_number: settings.whatsapp_number,
    whatsapp_message: settings.whatsapp_message,
    hero_title: settings.hero_title,
    hero_subtitle: settings.hero_subtitle,
    office_hours: settings.office_hours
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSavedSuccess(false);

    // Phone / WhatsApp validation as per SRS FR-28 ("an invalid phone number is rejected")
    const cleanWhatsApp = formState.whatsapp_number.replace(/[^0-9]/g, '');
    if (cleanWhatsApp.length < 10 || cleanWhatsApp.length > 15) {
      setError('Validation Error: WhatsApp number must be a valid international phone number containing 10-15 digits (e.g. 8801627444330).');
      return;
    }

    updateSettings({
      organization_name: formState.organization_name.trim(),
      contact_phone: formState.contact_phone.trim(),
      contact_email: formState.contact_email.trim(),
      address: formState.address.trim(),
      whatsapp_number: cleanWhatsApp,
      whatsapp_message: formState.whatsapp_message.trim(),
      hero_title: formState.hero_title.trim(),
      hero_subtitle: formState.hero_subtitle.trim(),
      office_hours: formState.office_hours.trim()
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-4xl mx-auto">
      <div>
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
          System Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Site & WhatsApp Settings
        </h1>
        <p className="text-xs text-slate-400">
          Changes here update contact blocks, WhatsApp booking links, and homepage copy instantly across the entire application (FR-28).
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Settings saved successfully! Public pages and WhatsApp inquiry links now reflect these values.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 shadow-xl">
        
        {/* WhatsApp Integration Block (FR-16, FR-28) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Click-to-Chat Configuration (FR-16, FR-28)</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-300">WhatsApp Inquiry Number (International Digits Only) *</label>
              <span className="text-emerald-400 font-mono text-[11px]">Format: 8801627444330</span>
            </div>
            <input
              type="text"
              required
              value={formState.whatsapp_number}
              onChange={(e) => setFormState({ ...formState, whatsapp_number: e.target.value })}
              className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-xs outline-hidden focus:border-[#005f49]"
              placeholder="8801627444330"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Default WhatsApp Inquiry Template (FR-16 &amp; 12.2)</label>
            <textarea
              rows={3}
              required
              value={formState.whatsapp_message}
              onChange={(e) => setFormState({ ...formState, whatsapp_message: e.target.value })}
              className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-xs outline-hidden focus:border-[#005f49] leading-relaxed"
            />
            <p className="text-[10px] text-slate-400">
              Template tokens: <code className="text-amber-300">{'{packageName}'}</code> is replaced with tour title, and <code className="text-amber-300">{'{packageUrl}'}</code> with the full public link.
            </p>
          </div>
        </div>

        {/* Organization Contact Details (FR-10, FR-28) */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-slate-300 font-bold text-sm uppercase tracking-wider">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Organization Contact Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Organization Name</label>
              <input
                type="text"
                required
                value={formState.organization_name}
                onChange={(e) => setFormState({ ...formState, organization_name: e.target.value })}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Hotline Phone Number</label>
              <input
                type="text"
                required
                value={formState.contact_phone}
                onChange={(e) => setFormState({ ...formState, contact_phone: e.target.value })}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Support Email</label>
              <input
                type="email"
                required
                value={formState.contact_email}
                onChange={(e) => setFormState({ ...formState, contact_email: e.target.value })}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Office Working Hours</label>
              <input
                type="text"
                required
                value={formState.office_hours}
                onChange={(e) => setFormState({ ...formState, office_hours: e.target.value })}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Physical Office Address</label>
            <input
              type="text"
              required
              value={formState.address}
              onChange={(e) => setFormState({ ...formState, address: e.target.value })}
              className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
            />
          </div>
        </div>

        {/* Homepage Hero Copy (FR-28, FR-34) */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-slate-300 font-bold text-sm uppercase tracking-wider">
            <Settings className="w-4 h-4 text-emerald-400" />
            <span>Homepage Hero Copywriting</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Hero Main Title</label>
            <input
              type="text"
              required
              value={formState.hero_title}
              onChange={(e) => setFormState({ ...formState, hero_title: e.target.value })}
              className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Hero Subtitle</label>
            <textarea
              rows={2}
              required
              value={formState.hero_subtitle}
              onChange={(e) => setFormState({ ...formState, hero_subtitle: e.target.value })}
              className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#005f49] hover:bg-[#0a4b3b] text-white px-8 py-3.5 rounded-2xl text-xs font-bold shadow-lg shadow-[#005f49]/30 transition-all cursor-pointer hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Save System Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
