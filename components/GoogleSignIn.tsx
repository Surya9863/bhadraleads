"use client";

import { Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AuthUser } from "@/lib/auth";

/* ----------------------------- Google glyph ------------------------------ */

export function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className ?? "size-4"}>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3.01h3.88c2.27-2.09 3.58-5.17 3.58-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.92l-3.88-3.01c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.28a12 12 0 0 0 0 10.76l4.01-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.98 11.98 0 0 0 1.28 6.62l4.01 3.11C6.23 6.88 8.88 4.77 12 4.77Z"
      />
    </svg>
  );
}


/* ------------------------- Optional Google sign-in ------------------------ */

type GoogleSignInProps = {
  onUserChange?: (user: AuthUser | null) => void;
  className?: string;
  compact?: boolean;
};

/**
 * OPTIONAL Google sign-in. It only appears when Firebase is configured via
 * environment variables. It never blocks "Continue Directly to WhatsApp" —
 * an error here leaves the WhatsApp path fully usable.
 */
export function GoogleSignIn({ onUserChange, className, compact }: GoogleSignInProps) {
  const { login, loading, error, configured, user, logout } = useGoogleAuth();

  if (!configured) return null;

  if (user) {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-3 py-2",
          className
        )}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          {user.picture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.picture}
              alt=""
              referrerPolicy="no-referrer"
              className="size-7 rounded-full ring-1 ring-gold/40"
            />
          ) : (
            <span className="grid size-7 place-items-center rounded-full bg-brand text-[0.65rem] font-bold text-white">
              {(user.name ?? "?").charAt(0).toUpperCase()}
            </span>
          )}
          <span className="truncate text-xs font-semibold text-brand">{user.name}</span>
        </div>
        <button
          type="button"
          onClick={async () => {
            await logout();
            onUserChange?.(null);
          }}
          className="shrink-0 text-[0.7rem] font-semibold uppercase tracking-wider text-muted transition-colors hover:text-gold-deep"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Button
        type="button"
        variant="outline"
        className="w-full justify-center"
        disabled={loading}
        onClick={async () => {
          trackEvent("google_login_started");
          const next = await login();
          if (next) {
            trackEvent("google_login_completed");
            onUserChange?.(next);
          }
        }}
      >
        {loading ? <Loader2 className="animate-spin" /> : <GoogleGlyph className="size-4" />}
        {compact ? "Google" : "Sign in with Google"}
      </Button>
      <p className="text-center text-[0.68rem] leading-relaxed text-muted/80">
        Optional — add your name &amp; email to the enquiry.
      </p>
      {error ? (
        <p role="status" className="text-center text-[0.7rem] text-rose-600">
          Google sign-in unavailable. You can continue directly to WhatsApp.
        </p>
      ) : null}
    </div>
  );
}

/* ---------------------------- Signed-in chip ----------------------------- */

type GoogleUserChipProps = {
  onUserChange?: (user: AuthUser | null) => void;
  className?: string;
};

/** Small navbar chip: sign-in button when signed out, identity when signed in. */
export function GoogleUserChip({ onUserChange, className }: GoogleUserChipProps) {
  const { user, configured, login, logout, loading } = useGoogleAuth();

  if (!configured) return null;

  if (user) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border border-line bg-surface/80 py-1 pl-1 pr-3 backdrop-blur",
          className
        )}
      >
        {user.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.picture}
            alt=""
            referrerPolicy="no-referrer"
            className="size-7 rounded-full ring-1 ring-gold/50"
          />
        ) : (
          <span className="grid size-7 place-items-center rounded-full bg-brand text-[0.65rem] font-bold text-white">
            {(user.name ?? "?").charAt(0).toUpperCase()}
          </span>
        )}
        <button
          type="button"
          onClick={async () => {
            await logout();
            onUserChange?.(null);
          }}
          className="max-w-28 truncate text-xs font-semibold text-brand hover:text-gold-deep"
          title="Sign out"
        >
          {user.name}
        </button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn("hidden md:inline-flex", className)}
      disabled={loading}
      onClick={async () => {
        trackEvent("google_login_started");
        const next = await login();
        if (next) {
          trackEvent("google_login_completed");
          onUserChange?.(next);
        }
      }}
    >
      {loading ? <Loader2 className="animate-spin" /> : <GoogleGlyph className="size-4" />}
      Sign in
    </Button>
  );
}

