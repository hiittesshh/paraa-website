"use client";

// §0.1 sitewide rebrand notice. Dismissible; the dismissal is remembered in localStorage.
// Storage can throw (private mode, blocked site data), so every access is wrapped and a
// session-only flag keeps the bar closed for this visit even when storage is unavailable.
// useSyncExternalStore (instead of setState in an effect) keeps server and client renders
// consistent: the server always renders the bar, the client hides it once it reads storage.
import { useSyncExternalStore } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Badge } from "@/components/paraa/primitives";

const KEY = "paraa:rebrand-bar:dismissed:v1";
const listeners = new Set<() => void>();
let dismissedThisSession = false;

function readDismissed() {
  if (dismissedThisSession) return true;
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function dismiss() {
  dismissedThisSession = true;
  try {
    window.localStorage.setItem(KEY, "1");
  } catch {
    // Storage unavailable: the session flag above still hides the bar for this visit.
  }
  listeners.forEach((l) => l());
}

export function RebrandBar() {
  const dismissed = useSyncExternalStore(subscribe, readDismissed, () => false);
  if (dismissed) return null;

  return (
    <div role="region" aria-label="Name change notice" className="border-b bg-card">
      <div className="container-page flex items-center gap-3 py-2">
        <Badge tone="accent" className="hidden sm:inline-flex">
          New name
        </Badge>
        <p className="min-w-0 flex-1 text-body-md text-muted-foreground">
          <strong className="font-bold text-foreground">Grade Capital is now Paraa Capital.</strong>{" "}
          Before you log in or pay, check you&rsquo;re on an official channel.{" "}
          <Link
            href="#official-channels"
            className="font-bold whitespace-nowrap text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-150 hover:decoration-foreground"
          >
            Our official channels
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss name change notice"
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-sm border text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-foreground"
        >
          <X aria-hidden className="size-4" />
        </button>
      </div>
    </div>
  );
}
