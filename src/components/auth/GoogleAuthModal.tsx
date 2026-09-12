import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, LogOut, CheckCircle2, UserCheck, RefreshCw } from 'lucide-react';
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
  onAddAccount,
  onSelectAccount,
  onSignOut,
}) => {
  const googleBtnRef = useRef<HTMLDivElement>(null);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '421007877682-1qu3qtria81ul2k0ce37ihma45kd8n25.apps.googleusercontent.com';

  // Initialize official Google Identity Services GIS button
  useEffect(() => {
    if (!isOpen) return;

    if (window.google?.accounts?.id && clientId) {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
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
  }, [isOpen, clientId, onAddAccount, onSelectAccount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 transition-all">
        {/* Header with official Google Branding */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 p-2 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
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

        <div className="p-6 space-y-6">
          {/* Active Logged In Google Account Card */}
          {activeUser ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-50 to-emerald-500/5 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border border-emerald-500/30 shadow-sm space-y-4">
                <div className="flex items-center space-x-3.5">
                  {activeUser.avatar ? (
                    <img
                      src={activeUser.avatar}
                      alt={activeUser.name}
                      className="w-12 h-12 rounded-full border-2 border-emerald-500 bg-white shrink-0 object-cover shadow-md"
                      style={{ width: '48px', height: '48px', minWidth: '48px', minHeight: '48px' }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white dark:bg-gradient-to-br dark:from-emerald-400 dark:to-cyan-500 dark:text-slate-950 font-black text-lg flex items-center justify-center shrink-0 border-2 border-emerald-500/30 shadow-md">
                      {(activeUser.name || 'User').charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="truncate flex-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-base text-slate-900 dark:text-white font-heading truncate">
                        {activeUser.name}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate block">
                      {activeUser.email}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-500/20 text-xs text-slate-600 dark:text-slate-300 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="leading-tight">
                    Facility configuration and carbon telemetry are synced to this Google account.
                  </span>
                </div>
              </div>

              {/* Sign In with different account or Sign Out */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider block text-center">
                  Switch or Re-authenticate Account:
                </span>
                <div className="flex justify-center min-h-[44px]">
                  <div ref={googleBtnRef} id="googleSignInButton" className="flex justify-center"></div>
                </div>

                <button
                  onClick={onSignOut}
                  className="w-full py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 font-bold text-xs transition-all flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Google Account</span>
                </button>
              </div>
            </div>
          ) : (
            /* Clean Prompt for Google OAuth Login */
            <div className="space-y-6 text-center animate-fadeIn py-2">
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                  Sign in with your Google Account
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Authenticate securely to access your saved facility parameters, carbon audit telemetry, and AI models.
                </p>
              </div>

              <div className="flex justify-center min-h-[48px] py-1">
                <div ref={googleBtnRef} id="googleSignInButton" className="flex justify-center"></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Security Badge */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400 font-mono flex items-center justify-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>OAuth 2.0 Google Identity Services Secured</span>
        </div>
      </div>
    </div>
  );
};
