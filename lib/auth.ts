import { getAuth, GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth";
import { getFirebaseApp, isFirebaseConfigured } from "@/lib/firebase";

export type AuthUser = {
  name: string;
  email: string;
  picture?: string;
};

const GOOGLE_SCOPES = ["profile", "email"].join(" ");

/**
 * Optional Google sign-in (Google Identity via Firebase Authentication).
 * Retrieves only: name, email and profile image (if available).
 * Nothing is persisted — the user object lives in component state only.
 *
 * Returns `null` when Firebase is not configured so callers can quietly fall
 * back to the direct WhatsApp path.
 */
export async function signInWithGoogle(): Promise<AuthUser | null> {
  const app = getFirebaseApp();
  if (!app) return null;

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  provider.addScope(GOOGLE_SCOPES);

  const credential = await signInWithPopup(auth, provider);
  return mapFirebaseUser(credential.user);
}

/** Sign out of the in-memory session (never touches a server). */
export async function signOutGoogle(): Promise<void> {
  const app = getFirebaseApp();
  if (!app) return;
  await getAuth(app).signOut();
}

export function mapFirebaseUser(user: User): AuthUser {
  return {
    name: user.displayName ?? user.email?.split("@")[0] ?? "There",
    email: user.email ?? "",
    picture: user.photoURL ?? undefined,
  };
}

export { isFirebaseConfigured };
