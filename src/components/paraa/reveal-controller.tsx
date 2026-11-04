"use client";

// The one script behind Reveal, RevealGroup and Mark. It runs once after the page is on screen,
// tucks away what is still below the fold, and shows each block the first time it scrolls in.
// One observer for the whole page rather than one per block, and no scroll listener, so nothing
// here runs while scrolling. It renders nothing; the page is complete if it never runs at all.
import { useEffect } from "react";

const STATE = "data-reveal-state";
const STAGGER_MS = 70;
const MAX_STEP = 3;

const belowFold = (el: Element) => el.getBoundingClientRect().top >= window.innerHeight;

export function RevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // What each observed element shows when it arrives: itself, or a group's items.
    const targets = new Map<Element, HTMLElement[]>();

    document.querySelectorAll<HTMLElement>("[data-reveal], [data-mark]").forEach((el) => {
      if (belowFold(el)) targets.set(el, [el]);
    });
    document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
      if (!belowFold(group)) return;
      const items = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal-item]"));
      items.forEach((item, i) => item.style.setProperty("--reveal-delay", `${Math.min(i, MAX_STEP) * STAGGER_MS}ms`));
      targets.set(group, items);
    });

    targets.forEach((els) => els.forEach((el) => el.setAttribute(STATE, "waiting")));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          targets.get(entry.target)?.forEach((el) => el.setAttribute(STATE, "shown"));
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    targets.forEach((_, el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
