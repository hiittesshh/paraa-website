"use client";

// Landing animations (owner, 14 Nov 2026: "landing animations of cards and content in sections are not there
// properly"). Each heading, lede, card and block animates on its own as it comes into view, not the whole section at
// once; things that arrive together cascade. Headings rise out of a mask; cards rise and settle; other blocks rise.
// Only things still below the screen at load are tucked away, so nothing on screen moves and nothing is hidden without
// JS or under reduced motion. Renders nothing; mount it once.
import { useEffect } from "react";

const SELECTOR = [
  "h2",
  "h3.type-title",
  ".mb-head > p",
  "ol > li",
  "ul > li",
  ".grid > *",
  "details",
  "[class*='rounded-2xl']",
  ".container-page > *",
  ".mk-units > *",
  ".mk-chain > li",
  ".mk-step",
].join(",");

/** Where to look: every section below the hero; in What you're buying only the statement after the slides. */
function candidates(): HTMLElement[] {
  const roots = [...document.querySelectorAll<HTMLElement>("main > section:not(#top)")];
  const basketTail = document.querySelector<HTMLElement>("#basket .mk-units");
  const all = new Set<HTMLElement>();
  for (const r of roots) r.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => all.add(el));
  if (basketTail) {
    all.add(basketTail);
    basketTail.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => all.add(el));
  }
  // Leaves only: an element that contains another candidate is left alone, so nothing moves twice.
  const list = [...all].filter((el) => !el.closest("nav, form, [role='tablist'], .ms-pick, svg, [aria-hidden='true']"));
  return list.filter((el) => !list.some((other) => other !== el && el.contains(other)));
}

const kind = (el: HTMLElement) =>
  el.matches("h2, h3.type-title") ? "head" : el.matches(".mk-step") ? "row" : el.matches("li, details, .grid > *, [class*='rounded-2xl']") ? "card" : "block";

export function SectionEntrance() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only what's actually laid out and below the screen: never anything inside a hidden part (a form's next step, a
    // closed answer, a collapsed menu), which would otherwise stay invisible when it opens later.
    const shown = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4 || el.matches("input, .sr-only")) return false;
      if (el.closest("[hidden], details:not([open]) > :not(summary)")) return false;
      return true;
    };
    const els = candidates().filter((el) => shown(el) && el.getBoundingClientRect().top > innerHeight * 0.92);
    els.forEach((el) => el.setAttribute("data-land", kind(el)));
    // A masked heading has no visible area, so the browser never reports it: watch its parent block for it instead.
    const watched = new Map<Element, HTMLElement[]>();
    els.forEach((el) => {
      const key = kind(el) === "head" && el.parentElement ? el.parentElement : el;
      watched.set(key, [...(watched.get(key) ?? []), el]);
    });
    const io = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((e) => e.isIntersecting)
          .flatMap((e) => {
            io.unobserve(e.target);
            return watched.get(e.target) ?? [];
          })
          .sort((a, b) => {
            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();
            return ra.top - rb.top || ra.left - rb.left;
          });
        arriving.forEach((el, i) => {
          el.style.transitionDelay = `${Math.min(i * 90, 450)}ms`;
          el.setAttribute("data-landed", "");
          setTimeout(() => {
            el.removeAttribute("data-land");
            el.removeAttribute("data-landed");
            el.style.transitionDelay = "";
          }, 1500 + Math.min(i * 90, 450));
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    watched.forEach((_, key) => io.observe(key));
    return () => io.disconnect();
  }, []);
  return null;
}
