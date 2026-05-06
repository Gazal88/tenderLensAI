"use client";

import { useState } from "react";
import { Settings, Moon, Sun, Bell, Shield, Save } from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center">
          <Settings className="w-7 h-7 mr-3" style={{ color: '#004B49' }} />
          Settings
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Manage your account preferences and system configurations.</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">

        {/* Appearance */}
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Appearance</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme("light")}
              className="flex-1 flex items-center justify-center p-4 rounded-md border-2 transition-all"
              style={theme === 'light'
                ? { borderColor: '#004B49', backgroundColor: '#E0F0EF' }
                : { borderColor: '#e2e8f0' }}
            >
              <Sun className="w-5 h-5 mr-2" style={{ color: theme === 'light' ? '#004B49' : '#64748b' }} />
              <span className="font-medium text-sm" style={{ color: theme === 'light' ? '#004B49' : '#64748b' }}>Light Mode</span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className="flex-1 flex items-center justify-center p-4 rounded-md border-2 transition-all"
              style={theme === 'dark'
                ? { borderColor: '#004B49', backgroundColor: '#E0F0EF' }
                : { borderColor: '#e2e8f0' }}
            >
              <Moon className="w-5 h-5 mr-2" style={{ color: theme === 'dark' ? '#004B49' : '#64748b' }} />
              <span className="font-medium text-sm" style={{ color: theme === 'dark' ? '#004B49' : '#64748b' }}>Dark Mode (Coming Soon)</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Notifications</h2>
          <div className="flex items-center justify-between p-4 rounded-md border border-slate-200" style={{ backgroundColor: '#FAFAF7' }}>
            <div className="flex items-center">
              <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center border border-slate-200 mr-4">
                <Bell className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="font-medium text-slate-800 text-sm">Email Alerts</p>
                <p className="text-xs text-slate-400 mt-0.5">Receive an email when an AI evaluation finishes.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all"
                style={{ backgroundColor: notifications ? '#004B49' : '' }}></div>
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Security</h2>
          <div className="flex items-center p-4 rounded-md border border-slate-200" style={{ backgroundColor: '#FAFAF7' }}>
            <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center border border-slate-200 mr-4">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-800 text-sm">Two-Factor Authentication</p>
              <p className="text-xs text-slate-400 mt-0.5">Enabled securely by the Department of Defense portal.</p>
            </div>
            <span className="px-3 py-1 text-xs font-bold rounded uppercase tracking-wider" style={{ backgroundColor: '#E0F0EF', color: '#004B49' }}>Active</span>
          </div>
        </div>

        {/* Save */}
        <div className="p-5 flex justify-end" style={{ backgroundColor: '#FAFAF7' }}>
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-2.5 text-white font-semibold rounded-md transition-opacity hover:opacity-90 shadow-sm text-sm"
            style={{ backgroundColor: saved ? '#2d6a4f' : '#004B49' }}
          >
            {saved ? (
              <>✓ Saved Successfully</>
            ) : (
              <><Save className="w-4 h-4 mr-2" /> Save Preferences</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
