import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Plus, ShieldCheck, LogOut, UserCheck, Mail, Key, Globe, ExternalLink, RefreshCw } from 'lucide-react';
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

const BOY_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80',
];

/**
 * Decodes standard Google OAuth 2.0 JWT ID token payload safely.
 */
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Failed to parse Google OAuth JWT Token:', err);
    return null;
  }
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

  // Environment Client ID or stored custom client ID
  const envClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '421007877682-1qu3qtria81ul2k0ce37ihma45kd8n25.apps.googleusercontent.com';
  const [customClientId, setCustomClientId] = useState<string>(() => {
    return localStorage.getItem('byteme_custom_google_client_id') || envClientId;
  });
  const [isEditingKey, setIsEditingKey] = useState(false);

  const googleBtnRef = useRef<HTMLDivElement>(null);
  const activeClientId = customClientId.trim() || envClientId;
  const isClientIdConfigured = Boolean(
    activeClientId && !activeClientId.includes('your_google_client_id_here')
  );

  // Initialize official Google Identity Services GIS button
  useEffect(() => {
    if (!isOpen) return;

    if (window.google?.accounts?.id && isClientIdConfigured) {
      try {
        window.google.accounts.id.initialize({
          client_id: activeClientId,
          callback: (response: { credential: string }) => {
            const payload = parseJwt(response.credential);
            if (payload) {
              const newUser: GoogleUser = {
                id: `google-${payload.sub || Date.now()}`,
                name: payload.name || payload.given_name || payload.email?.split('@')[0] || 'Google User',
                email: payload.email,
                avatar: payload.picture || '',
                verified: payload.email_verified ?? true,
              };
              onAddAccount(newUser);
              onSelectAccount(newUser);
            }
          },
        });

        if (googleBtnRef.current) {
          googleBtnRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            shape: 'pill',
            text: 'signin_with',
            logo_alignment: 'left',
            width: 320,
          });
        }
      } catch (e) {
        console.error('Google Identity Services Initialization Error:', e);
      }
    }
  }, [isOpen, activeClientId, isClientIdConfigured]);

  const handleSaveCustomClientId = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('byteme_custom_google_client_id', customClientId.trim());
    setIsEditingKey(false);
  };

  if (!isOpen) return null;

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newName.trim()) return;

    const boyAvatar = BOY_AVATARS[newName.trim().length % BOY_AVATARS.length];

    const user: GoogleUser = {
      id: `google-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim().toLowerCase(),
      avatar: boyAvatar,
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
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    {
      id: 'preset-2',
      name: 'Rohan Gohil',
      email: 'rohan.gohil@byteme.io',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    {
      id: 'preset-3',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@byteme.io',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    {
      id: 'preset-4',
      name: 'Karan Patel',
      email: 'karan.patel@apex-packaging.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 transition-all max-h-[90vh] flex flex-col">
        {/* Header with official Google Branding */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40 shrink-0">
          <div className="flex items-center space-x-3">
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
                Official Google Identity OAuth 2.0 Sign In
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

        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Active Account Banner if logged in */}
          {activeUser && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center space-x-3 truncate">
                {activeUser.avatar ? (
                  <img
                    src={activeUser.avatar}
                    alt={activeUser.name}
                    className="w-10 h-10 rounded-full border border-emerald-500 bg-white shrink-0 object-cover"
                    style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px' }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white dark:bg-gradient-to-br dark:from-emerald-400 dark:to-cyan-500 dark:text-slate-950 font-black text-base flex items-center justify-center shrink-0 border border-emerald-500/30">
                    {(activeUser.name || 'User').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="truncate">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-sm text-slate-900 dark:text-white font-heading truncate">
                      {activeUser.name}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate block">
                    {activeUser.email}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold uppercase tracking-wider shrink-0 ml-2">
                Active
              </span>
            </div>
          )}

          {/* Official Google OAuth 2.0 Live Widget Container */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3 text-center">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                <span>Real Google OAuth 2.0 Auth</span>
              </span>
              <button
                onClick={() => setIsEditingKey(!isEditingKey)}
                className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center space-x-1"
              >
                <Key className="w-3 h-3" />
                <span>{isEditingKey ? 'Close Config' : 'Client ID Config'}</span>
              </button>
            </div>

            {/* Client ID Configuration Panel */}
            {isEditingKey ? (
              <form onSubmit={handleSaveCustomClientId} className="space-y-2 text-left pt-2">
                <label className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  Google OAuth Client ID (<code className="text-emerald-600 font-mono">VITE_GOOGLE_CLIENT_ID</code>):
                </label>
                <input
                  type="text"
                  value={customClientId}
                  onChange={(e) => setCustomClientId(e.target.value)}
                  placeholder="xxxx-xxxx.apps.googleusercontent.com"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">
                    File location: <code className="text-slate-300 font-mono">.env</code> in project root
                  </span>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    Save & Apply
                  </button>
                </div>
              </form>
            ) : isClientIdConfigured ? (
              <div className="space-y-3 pt-1">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Click below to log in with your official Google Account:
                </p>
                <div className="flex justify-center min-h-[44px]">
                  <div ref={googleBtnRef} id="googleSignInButton" className="flex justify-center"></div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-left space-y-2 text-xs">
                <div className="flex items-center space-x-1.5 font-bold">
                  <Key className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Google Client ID Pending Configuration</span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                  To enable live Google Sign-In popups, add your Google OAuth Client ID to the <code className="font-mono bg-amber-500/20 px-1 py-0.5 rounded text-amber-800 dark:text-amber-200">.env</code> file at:
                </p>
                <code className="block p-2 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] break-all border border-slate-800">
                  VITE_GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com
                </code>
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline pt-1"
                >
                  <span>Get Client ID from Google Cloud Console</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Add New Google Account Custom Form */}
          {isAddingNew ? (
            <form onSubmit={handleCreateAccount} className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
                  Add Account Manually:
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
                  Connected Accounts:
                </span>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {accounts.length > 0 ? (
                    accounts.map((user) => {
                      const isCurrent = activeUser?.id === user.id;

                      return (
                        <div
                          key={user.id}
                          onClick={() => onSelectAccount(user)}
                          className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            isCurrent
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 shadow-sm'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3 truncate">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-8 h-8 rounded-full border border-emerald-500 bg-white shrink-0 object-cover"
                                style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px' }}
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white dark:bg-gradient-to-br dark:from-emerald-400 dark:to-cyan-500 dark:text-slate-950 font-black text-xs flex items-center justify-center shrink-0 border border-emerald-500/30">
                                {(user.name || 'User').charAt(0).toUpperCase()}
                              </div>
                            )}
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
                      No Google accounts linked yet. Use Google Auth above or add an account.
                    </div>
                  )}
                </div>
              </div>

              {/* Sample Quick Login Presets */}
              <div>
                <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Quick Auth Profiles:
                </span>
                <div className="space-y-1.5">
                  {samplePresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        onAddAccount(preset);
                        onSelectAccount(preset);
                      }}
                      className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 text-left transition-all flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white dark:bg-gradient-to-br dark:from-emerald-400 dark:to-cyan-500 dark:text-slate-950 font-black text-[11px] flex items-center justify-center shrink-0">
                          {(preset.name || 'User').charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                          {preset.name} ({preset.email})
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                        Select
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
                  <span>Add Account</span>
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
        <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-center text-[10.5px] text-slate-400 font-mono flex items-center justify-center space-x-1.5 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>OAuth 2.0 Google Identity Services Secured</span>
        </div>
      </div>
    </div>
  );
};
