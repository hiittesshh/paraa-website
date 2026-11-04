"use client";

// Global header (§0.1). Sticky, white, with a hairline border; once the page scrolls it tightens
// by 8px and picks up the card shadow. Motion's useScroll only flips a boolean (no per-frame
// re-render); the height/shadow change itself is a 200ms CSS transition on the soft ease.
// html has scroll-padding-top so anchor jumps and focused elements are not hidden underneath it.
// Mobile menu: a disclosure button (aria-expanded / aria-controls) that closes on Escape,
// on any link click, and returns focus to the button when closed with Escape. It opens and
// closes with AnimatePresence (height + fade, ~220ms); reduced motion is handled globally.
// The desktop nav shows where you are on the page: an observer watches a thin line across the
// middle of the screen, and a gold underline slides to whichever section is crossing it.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/paraa/primitives";
import { BLOG_URL } from "@/lib/links";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";

// Section anchors from docs/build-brief.md (prefixed with "/" so they work from any future page).
// The blog is the one external link (shown only once BLOG_URL is set); it opens in a new tab and says so.
const MENU_LINKS: readonly { href: string; label: string; external?: boolean }[] = [
  { href: "/#basket", label: "Basket" },
  { href: "/#why-usd", label: "Why USD" },
  { href: "/#how", label: "How it works" },
  { href: "/#tax", label: "Tax" },
  { href: "/#advisors", label: "CA Advisors" },
  ...(BLOG_URL ? [{ href: BLOG_URL, label: "Blog", external: true }] : []),
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const MENU_ID = "site-mobile-menu";
const EASE = [0.23, 1, 0.32, 1] as const;
// The question form is its own band, but it belongs to the "CA Advisors" nav item.
const SECTIONS: Record<string, string> = { basket: "/#basket", "why-usd": "/#why-usd", how: "/#how", tax: "/#tax", advisors: "/#advisors", ask: "/#advisors" };

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 8;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => {
    const crossing = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? crossing.add(e.target.id) : crossing.delete(e.target.id)));
        const [id] = crossing;
        setCurrent(id ? SECTIONS[id] : null);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    Object.keys(SECTIONS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

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
      {/* How far down the page you are. */}
      <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-secondary" />
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
                  {...(l.external ? external : {})}
                  aria-current={current === l.href ? "location" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center gap-1 rounded-sm px-3 text-body-md font-semibold no-underline transition-colors duration-150 hover:text-foreground",
                    current === l.href ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {l.label}
                  {current === l.href && (
                    <motion.span
                      aria-hidden
                      layoutId="nav-current"
                      transition={{ duration: 0.25, ease: EASE }}
                      className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-secondary"
                    />
                  )}
                  {l.external && (
                    <>
                      <ArrowUpRight aria-hidden className="size-3.5" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Gold, not primary: the hero already carries the one primary action in view.
              Under ~440px the hero CTA is on screen, so the header CTA is dropped (prototype A8). */}
          <ButtonLink href="/#ask" variant="secondary" className="hidden min-[440px]:inline-flex">
            Talk to a CA
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
                      {...(l.external ? external : {})}
                      className="group flex min-h-13 items-center justify-between rounded-sm text-body-lg font-semibold text-foreground no-underline transition-colors duration-150 hover:text-accent"
                    >
                      {l.label}
                      {l.external && <span className="sr-only">(opens in a new tab)</span>}
                      {l.external ? (
                        <ArrowUpRight aria-hidden className="size-5 text-faint" />
                      ) : (
                        <ArrowRight aria-hidden className="size-5 text-faint transition-transform duration-150 group-hover:translate-x-1" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/#ask" onClick={close} size="lg" className="mt-4 mb-2 w-full">
                Talk to a CA
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
