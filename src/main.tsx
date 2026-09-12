import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/refined-ui.css';

// ─── Purge all legacy dummy/preset Google accounts from localStorage ──────────
// Any account that isn't from a real Google OAuth session (id must start with
// "google-" and contain a real email) is wiped immediately on every app boot.
(function purgeLocalStorageDummyAccounts() {
  try {
    const isReal = (u: { id?: string; email?: string } | null) =>
      u && typeof u.id === 'string' && u.id.startsWith('google-') && u.email;

    // Purge accounts list
    const rawAccounts = localStorage.getItem('byteme_google_users');
    if (rawAccounts) {
      const parsed = JSON.parse(rawAccounts);
      const valid = Array.isArray(parsed) ? parsed.filter(isReal) : [];
      if (valid.length !== parsed.length) {
        localStorage.setItem('byteme_google_users', JSON.stringify(valid));
      }
    }

    // Purge active user if not real
    const rawActive = localStorage.getItem('byteme_active_google_user');
    if (rawActive) {
      const parsed = JSON.parse(rawActive);
      if (!isReal(parsed)) {
        localStorage.removeItem('byteme_active_google_user');
      }
    }
  } catch (_) {
    // Safety net — clear corrupted data
    localStorage.removeItem('byteme_google_users');
    localStorage.removeItem('byteme_active_google_user');
  }
})();

const rootElement = document.getElementById('app');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
