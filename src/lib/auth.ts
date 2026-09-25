// src/lib/auth.ts
// Centrale sessie- en authenticatie utilities voor het festivalportaal

export interface AuthSession {
  email: string;
  resNumber: string;
  name: string;
  timestamp: number; // Unix epoch ms
  expiresAt: number; // Unix epoch ms
}

// Standaard sessieduur: 7 dagen (7 * 24 * 60 * 60 * 1000 ms)
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const AUTH_STORAGE_KEY = 'wf_auth_session';

/**
 * Haal de huidige sessie op uit localStorage of sessionStorage.
 * Controleert automatisch of de sessie nog geldig is qua TTL.
 */
export function getStoredSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const session: AuthSession = JSON.parse(raw);
    if (!session || !session.email || !session.expiresAt) {
      clearStoredSession();
      return null;
    }

    // Controleer of de sessie is verlopen
    if (Date.now() > session.expiresAt) {
      console.info('[Auth] Sessie is verlopen.');
      clearStoredSession();
      return null;
    }

    return session;
  } catch (err) {
    console.warn('[Auth] Fout bij parsen van sessie:', err);
    clearStoredSession();
    return null;
  }
}

/**
 * Sla een nieuwe geldige sessie op met TTL.
 */
export function saveAuthSession(data: { email: string; resNumber: string; name?: string }, remember: boolean = true): AuthSession {
  const now = Date.now();
  const session: AuthSession = {
    email: data.email.trim().toLowerCase(),
    resNumber: data.resNumber ? data.resNumber.trim() : '',
    name: data.name ? data.name.trim() : (data.email.split('@')[0].charAt(0).toUpperCase() + data.email.split('@')[0].slice(1)),
    timestamp: now,
    expiresAt: now + SESSION_TTL_MS,
  };

  const raw = JSON.stringify(session);
  if (remember) {
    localStorage.setItem(AUTH_STORAGE_KEY, raw);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  } else {
    sessionStorage.setItem(AUTH_STORAGE_KEY, raw);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  // Verwijder verouderde flags
  localStorage.removeItem('wf_user_logged_out');

  // Trigger cross-tab/header update event
  window.dispatchEvent(new Event('storage'));
  return session;
}

/**
 * Wis de actieve sessie (Uitloggen).
 */
export function clearStoredSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.setItem('wf_user_logged_out', 'true');
  window.dispatchEvent(new Event('storage'));
}

/**
 * Controleert of er momenteel een actieve, geldige sessie bestaat.
 */
export function isUserAuthenticated(): boolean {
  return getStoredSession() !== null;
}
