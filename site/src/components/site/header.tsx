"use client";

// Global header (§0.1). Sticky with a blurred, translucent background; html has
// scroll-padding-top so anchor jumps and focused elements are not hidden underneath it.
// Mobile menu: a disclosure button (aria-expanded / aria-controls) that closes on Escape,
// on any link click, and returns focus to the button when closed with Escape.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/paraa/primitives";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";

// Section anchors from BUILD-BRIEF.md. Prefixed with "/" so they also work from /nav.
const NAV_LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/nav", label: "NAV" },
  { href: "/#fees", label: "Fees" },
  { href: "/#method", label: "Methodology" },
  { href: "/#partners", label: "For partners" },
  { href: "/#faq", label: "FAQ" },
] as const;

const MENU_ID = "site-mobile-menu";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <div className="container-page flex h-16 items-center gap-6 md:h-18">
        <Brand onClick={close} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-11 items-center rounded-sm px-3 text-body-md font-semibold text-muted-foreground no-underline transition-colors duration-150 hover:bg-muted/60 hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Under ~440px the hero CTA is on screen, so the header CTA is dropped (prototype A8). */}
          <ButtonLink href="/nav" variant="outline" className="hidden hover:border-accent hover:text-foreground min-[440px]:inline-flex">
            See every number
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 cursor-pointer place-items-center rounded-md border border-border-strong text-foreground transition-colors duration-150 hover:border-muted-foreground lg:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id={MENU_ID}
        hidden={!open}
        className={cn("border-t bg-background lg:hidden", open && "animate-in fade-in slide-in-from-top-1 duration-200")}
      >
        <nav aria-label="Main menu" className="container-page py-3">
          <ul className="divide-y divide-border">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="flex min-h-13 items-center justify-between rounded-sm text-body-lg font-semibold text-foreground no-underline transition-colors duration-150 hover:text-accent"
                >
                  {l.label}
                  <span aria-hidden className="text-faint">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/nav" onClick={close} size="lg" className="mt-4 mb-2 w-full">
            See every number first
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
