"use client";

// The header's light/dark switch (owner, 13 Nov 2026: "one dark copy that is toggleable from right side"). It flips
// html[data-look] between the beige look (default) and the ink look for the header and hero, and remembers the
// choice in localStorage (read before first paint by the script in layout.tsx). The button reads the attribute
// itself (useSyncExternalStore), so it always matches what's on screen.
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const KEY = "paraa-look";

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-look"] });
  return () => mo.disconnect();
}
const isDark = () => document.documentElement.dataset.look === "dark";

export function LookToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  const flip = () => {
    const next = !dark;
    if (next) document.documentElement.dataset.look = "dark";
    else delete document.documentElement.dataset.look;
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      /* private mode: the choice lasts for this visit only */
    }
  };

  return (
    <button
      type="button"
      onClick={flip}
      aria-pressed={dark}
      aria-label="Dark look"
      title={dark ? "Switch to the light look" : "Switch to the dark look"}
      className="inline-grid size-11 place-items-center rounded-sm border border-border text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {dark ? <Sun aria-hidden className="size-5" /> : <Moon aria-hidden className="size-5" />}
    </button>
  );
}
