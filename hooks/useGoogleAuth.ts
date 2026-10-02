"use client";

import { useCallback, useState } from "react";
import { isFirebaseConfigured, signInWithGoogle, signOutGoogle, type AuthUser } from "@/lib/auth";

const STORAGE_KEY = "badhraleads:user";

function readStoredUser(): AuthUser | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

/**
 * Optional Google sign-in state.
 *
 * The user object is persisted in sessionStorage only (client-side) so the
 * name can pre-fill WhatsApp messages. Nothing is sent to a server and the
 * sign-in NEVER gates the WhatsApp conversion path — an error here leaves
 * the direct WhatsApp route fully usable.
 *
 * Note: the stored session is read inside `login()` (an event/callback path),
 * not in an effect, so there is no setState-in-effect or hydration concern.
 */
export function useGoogleAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const configured = isFirebaseConfigured();

  const persist = useCallback((next: AuthUser | null) => {
    setUser(next);
    try {
      if (next) window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, []);

  const login = useCallback(async (): Promise<AuthUser | null> => {
    if (!configured) return null;
    setLoading(true);
    setError(null);
    try {
      const next = await signInWithGoogle();
      // Merge with any previously stored session details.
      const merged = next ?? readStoredUser();
      if (merged) persist(merged);
      return merged;
    } catch (err) {
      // Popup closed or denied — never block the user, just report quietly.
      setError(err instanceof Error ? err.message : "Google sign-in failed.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [configured, persist]);

  const logout = useCallback(async () => {
    persist(null);
    try {
      await signOutGoogle();
    } catch {
      /* best effort */
    }
  }, [persist]);

  return { user, loading, error, configured, login, logout };
}
