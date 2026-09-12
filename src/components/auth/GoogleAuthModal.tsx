import React, { useState } from 'react';
import { X, Check, Plus, ShieldCheck, LogOut, UserCheck, Mail } from 'lucide-react';
import { GoogleUser } from '../../types';

export interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: GoogleUser | null;
  accounts: GoogleUser[];
  onSelectAccount: (user: GoogleUser) => void;
  onAddAccount: (newUser: GoogleUser) => void;
  onSignOut: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  activeUser,
  accounts,
  onSelectAccount,
  onAddAccount,
  onSignOut,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');

  if (!isOpen) return null;

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newName.trim()) return;

    const initials = newName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const user: GoogleUser = {
      id: `google-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim().toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newName)}`,
      verified: true,
    };

    onAddAccount(user);
    setIsAddingNew(false);
    setNewEmail('');
    setNewName('');
  };

  const samplePresets: GoogleUser[] = [
    {
      id: 'preset-1',
      name: 'Anmol Ghogare',
      email: 'anmol.ghogare@gmail.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anmol',
      verified: true,
    },
    {
      id: 'preset-2',
      name: 'Rohan Gohil',
      email: 'rohan.gohil@byteme.io',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
      verified: true,
    },
    {
      id: 'preset-3',
      name: 'ESG Lead Auditor',
      email: 'audit.lead@sebi-brsr.gov.in',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Audit',
      verified: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 transition-all">
        {/* Header with official Google Branding */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center space-x-3">
            {/* Google Colorful G SVG */}
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 p-1.5 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                Google Authentication
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sign in or switch connected Google Account
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Active Account Banner if logged in */}
          {activeUser && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={activeUser.avatar}
                  alt={activeUser.name}
                  className="w-10 h-10 rounded-full border-2 border-emerald-500 bg-white"
                />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-sm text-slate-900 dark:text-white font-heading">
                      {activeUser.name}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {activeUser.email}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold uppercase tracking-wider">
                Active
              </span>
            </div>
          )}

          {/* Add New Google Account Form */}
          {isAddingNew ? (
            <form onSubmit={handleCreateAccount} className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
                  Add Google Account:
                </h4>

                <div>
                  <label className="text-xs text-slate-500 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Anmol Ghogare"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-500 block mb-1">Google Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="user@gmail.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Authenticate Account</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Account Selector List */}
              <div>
                <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Connected Google Accounts:
                </span>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {accounts.length > 0 ? (
                    accounts.map((user) => {
                      const isCurrent = activeUser?.id === user.id;

                      return (
                        <div
                          key={user.id}
                          onClick={() => onSelectAccount(user)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            isCurrent
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 shadow-sm'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3 truncate">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full bg-slate-100 shrink-0"
                            />
                            <div className="truncate">
                              <span className="font-bold text-xs text-slate-900 dark:text-white block truncate font-heading">
                                {user.name}
                              </span>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate block">
                                {user.email}
                              </span>
                            </div>
                          </div>

                          {isCurrent ? (
                            <UserCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono font-bold">
                              Switch
                            </span>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-center text-xs text-slate-400">
                      No Google accounts linked yet. Select a sample profile below or add your Google account.
                    </div>
                  )}
                </div>
              </div>

              {/* Sample Quick Login Presets */}
              <div>
                <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Quick One-Click Google Auth Presets:
                </span>
                <div className="space-y-1.5">
                  {samplePresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => onAddAccount(preset)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 text-left transition-all flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <img src={preset.avatar} alt={preset.name} className="w-6 h-6 rounded-full" />
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                          {preset.name} ({preset.email})
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                        + Add
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Add Account & Sign Out */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Add Google Account</span>
                </button>

                {activeUser && (
                  <button
                    onClick={onSignOut}
                    className="px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 hover:bg-rose-100 font-bold text-xs transition-all flex items-center space-x-1.5"
                    title="Sign Out Current Account"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Security Badge */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-center text-[10.5px] text-slate-400 font-mono flex items-center justify-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>OAuth 2.0 Google Identity Services Secured</span>
        </div>
      </div>
    </div>
  );
};
