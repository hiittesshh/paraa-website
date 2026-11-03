"use client";

// Global header (§0.1). Sticky, white, with a hairline border; once the page scrolls it tightens
// by 8px and picks up the card shadow. Motion's useScroll only flips a boolean (no per-frame
// re-render); the height/shadow change itself is a 200ms CSS transition on the soft ease.
// html has scroll-padding-top so anchor jumps and focused elements are not hidden underneath it.
// Mobile menu: a disclosure button (aria-expanded / aria-controls) that closes on Escape,
// on any link click, and returns focus to the button when closed with Escape. It opens and
// closes with AnimatePresence (height + fade, ~220ms); reduced motion is handled globally.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/paraa/primitives";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";

// Section anchors from BUILD-BRIEF.md (prefixed with "/" so they work from any future page).
const MENU_LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#rupee", label: "Rupee & dollar" },
  { href: "/#fees", label: "Fees" },
  { href: "/#method", label: "Methodology" },
  { href: "/#partners", label: "For partners" },
  { href: "/#faq", label: "FAQ" },
] as const;

const MENU_ID = "site-mobile-menu";
const EASE = [0.2, 0.7, 0.2, 1] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 8;
    if (next !== scrolled) setScrolled(next);
  });

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
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-background transition-shadow duration-200 ease-out-soft",
        (scrolled || open) && "shadow-card",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center gap-6 transition-[height] duration-200 ease-out-soft",
          scrolled ? "h-14 md:h-16" : "h-16 md:h-18",
        )}
      >
        <Brand onClick={close} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {MENU_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-11 items-center rounded-sm px-3 text-body-md font-semibold text-muted-foreground no-underline transition-colors duration-150 hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Outline, not primary: the hero already carries the one primary action in view.
              Under ~440px the hero CTA is on screen, so the header CTA is dropped (prototype A8). */}
          <ButtonLink href="/#fees" variant="outline" className="hidden min-[440px]:inline-flex">
            See your fee receipt
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 cursor-pointer place-items-center rounded-md border border-border-strong bg-card text-foreground transition-colors duration-150 hover:border-ink hover:bg-background-alt lg:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="menu"
            id={MENU_ID}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="overflow-hidden border-t bg-background lg:hidden"
          >
            <nav aria-label="Main menu" className="container-page py-3">
              <ul className="divide-y divide-border">
                {MENU_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={close}
                      className="group flex min-h-13 items-center justify-between rounded-sm text-body-lg font-semibold text-foreground no-underline transition-colors duration-150 hover:text-accent"
                    >
                      {l.label}
                      <span aria-hidden className="text-faint transition-transform duration-150 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/#fees" onClick={close} size="lg" className="mt-4 mb-2 w-full">
                See your fee receipt
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
