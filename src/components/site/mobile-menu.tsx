"use client";

// The mobile menu (spec §4.19), below 1024: a native <details>, so it opens and closes with JS off and
// announces its own state. Not modal: no focus trap and no scroll lock. The script adds:
//   1. Esc closes it and returns focus to the toggle;
//   2. a link click closes it;
//   3. a click outside the header closes it;
//   4. focus leaving the menu closes it, so it never hides what has focus (WCAG 2.4.11);
//   5. widening to 1024 closes it.
// The toggle's name is "Menu" closed and "Close menu" open (it stays "Menu" without JS). No CTA inside
// the panel: the header's "Ask a CA" stays visible above it (v1.1, N13). The panel fades over 200ms
// where browsers can animate ::details-content, instantly elsewhere.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { BLOG_LINK, NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";

const ROWS: readonly { href: string; label: string; external?: boolean }[] = [...NAV, ...(BLOG_LINK ? [BLOG_LINK] : [])];

export function MobileMenu({ className }: { className?: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);

  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  // Next keeps a visited route mounted but hidden (Activity). A menu is transient: close it on hide.
  useLayoutEffect(() => {
    const details = ref.current;
    return () => {
      if (details) details.open = false;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const details = ref.current;
    if (!details) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      details.open = false;
      details.querySelector("summary")?.focus();
    };
    const onClickOutside = (event: MouseEvent) => {
      // A click (not a touch scroll) anywhere outside the header, panel included.
      const header = details.closest("header");
      if (header && !header.contains(event.target as Node)) details.open = false;
    };
    const wide = window.matchMedia("(min-width: 64rem)");
    const onWide = (event: MediaQueryListEvent) => {
      if (event.matches) details.open = false;
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClickOutside);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClickOutside);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <details
      ref={ref}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      onBlur={(event) => {
        // focusout: close when focus moves to something outside the menu.
        const next = event.relatedTarget as Node | null;
        if (next && !event.currentTarget.contains(next)) close();
      }}
      className={cn(
        "group [&::details-content]:opacity-0 [&::details-content]:transition-[opacity,content-visibility] [&::details-content]:duration-200 [&::details-content]:ease-out [&::details-content]:[transition-behavior:allow-discrete] open:[&::details-content]:opacity-100",
        className,
      )}
    >
      <summary
        aria-label={open ? "Close menu" : "Menu"}
        className="grid size-11 cursor-pointer list-none place-items-center rounded-sm border border-input text-foreground transition-colors duration-150 ease-out hover:border-foreground [&::-webkit-details-marker]:hidden"
      >
        <Menu aria-hidden className="size-5 group-open:hidden" />
        <X aria-hidden className="hidden size-5 group-open:block" />
      </summary>

      {/* Positioned against the header, so it spans the full width under it. */}
      <div className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b bg-background shadow-panel">
        <nav aria-label="Main menu" className="container-page py-3">
          <ul className="divide-y">
            {ROWS.map((row) => (
              <li key={row.href}>
                {/* A plain <a> (v1.5, decision 68): HashHandler takes the in-page jump over. */}
                <a
                  href={row.href}
                  onClick={close}
                  {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex min-h-13 items-center justify-between text-body-lg font-semibold text-foreground"
                >
                  {row.label}
                  {row.external && <span className="sr-only"> (opens in a new tab)</span>}
                  {row.external ? (
                    <ArrowUpRight aria-hidden className="size-5 text-muted-foreground" />
                  ) : (
                    <ArrowRight aria-hidden className="size-5 text-muted-foreground" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </details>
  );
}
