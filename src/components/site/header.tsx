"use client";

// Global header (§0.1). Floats over the hero's scene, then takes the page colour and a hairline once
// the page scrolls.
// html has scroll-padding-top so anchor jumps and focused elements are not hidden underneath it.
// Mobile menu: a native <details>, so it opens and closes with no JavaScript and announces its own
// state. The script adds the extras: Escape closes it and returns focus to the button, and a link
// click closes it. It fades over 200ms where browsers can animate ::details-content, instantly
// elsewhere. The desktop nav shows where you are on the page: an observer watches a thin line across
// the middle of the screen, and a gold underline grows under whichever section is crossing it.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/paraa/primitives";
import { BLOG_URL } from "@/lib/links";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";

// Section anchors from docs/build-brief.md (prefixed with "/" so they work from any future page).
// The blog is the one external link (shown only once BLOG_URL is set); it opens in a new tab and says so.
const MENU_LINKS: readonly { href: string; label: string; external?: boolean }[] = [
  { href: "/#tour", label: "The app" },
  { href: "/#basket", label: "Basket" },
  { href: "/#what-if", label: "Calculator" },
  { href: "/#how", label: "How it works" },
  { href: "/#trust", label: "Our rules" },
  { href: "/#faq", label: "FAQ" },
  ...(BLOG_URL ? [{ href: BLOG_URL, label: "Blog", external: true }] : []),
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const SECTIONS: Record<string, string> = { tour: "/#tour", basket: "/#basket", "what-if": "/#what-if", how: "/#how", trust: "/#trust", faq: "/#faq" };

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const menuRef = useRef<HTMLDetailsElement>(null);

  // Only ever flips a boolean, so scrolling doesn't re-render the header.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const first = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
    const onKey = (e: KeyboardEvent) => {
      const menu = menuRef.current;
      if (e.key !== "Escape" || !menu?.open) return;
      menu.open = false;
      menu.querySelector("summary")?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 border-b transition-colors duration-200 ease-out-soft md:h-18",
        scrolled ? "border-border bg-background" : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-full items-center gap-6">
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
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-secondary transition-transform duration-150 ease-out-soft",
                      current === l.href ? "scale-x-100" : "scale-x-0",
                    )}
                  />
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
          {/* "Talk to a CA" doesn't fit beside the logo and menu on the narrowest phones, so the header
              alone shortens it. */}
          <ButtonLink href="/#ask">
            <span className="min-[352px]:hidden">Ask a CA</span>
            <span className="hidden min-[352px]:inline">Talk to a CA</span>
          </ButtonLink>
          <details
            ref={menuRef}
            className="group/menu lg:hidden [&::details-content]:opacity-0 [&::details-content]:transition-[opacity,content-visibility] [&::details-content]:duration-200 [&::details-content]:ease-out-soft [&::details-content]:[transition-behavior:allow-discrete] open:[&::details-content]:opacity-100"
          >
            <summary
              aria-label="Menu"
              className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-border-strong text-foreground transition-colors duration-150 hover:border-foreground [&::-webkit-details-marker]:hidden"
            >
              <Menu aria-hidden className="size-5 group-open/menu:hidden" />
              <X aria-hidden className="hidden size-5 group-open/menu:block" />
            </summary>

            {/* Measured against the header, not the button, so it spans the full width. */}
            <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-y bg-background shadow-lift">
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
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
