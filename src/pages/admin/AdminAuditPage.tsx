import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ShieldAlert, Lock, Clock, UserCheck, KeyRound } from 'lucide-react';
import { initialAdminUsers } from '../../data/mockData';

export const AdminAuditPage: React.FC = () => {
  const { auditLogs } = useApp();

  return (
    <div className="p-6 sm:p-10 space-y-10 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
          Security & Compliance
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Access Control & Administrative Audit Log
        </h1>
        <p className="text-xs text-slate-400">
          Role-based permissions, 2FA status, and automated action audit tracking (FR-19, FR-32, FR-33).
        </p>
      </div>

      {/* Admin Users Table */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Authorized Administrative Accounts</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">2 Active Admins</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">Admin Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">2FA Enrolled</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {initialAdminUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 font-bold text-white">{user.name}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-slate-300 px-2 py-0.5 rounded-sm border border-slate-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      user.mfa_enabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {user.mfa_enabled ? 'TOTP Active (123456)' : 'Standard Password'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-400 font-bold uppercase text-[10px]">{user.status}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{user.last_login}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Audit Log Table (FR-33) */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">Administrative Action Audit Trail (FR-33)</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">{auditLogs.length} Events Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Administrator</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Affected Resource</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-4 font-mono text-emerald-300">{log.admin_email}</td>
                  <td className="py-3 px-4">
                    <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md font-bold text-[10px] text-slate-200 uppercase font-mono">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-medium">{log.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
