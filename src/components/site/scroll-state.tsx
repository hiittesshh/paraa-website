"use client";

// Renders nothing (spec §4.19). Two IntersectionObservers, no scroll listener:
//   1. the header's hairline: data-at-top on [data-header] while the [data-top-sentinel] (the first child
//      of <main>) is on screen. With JS off the attribute is never set, so the hairline always shows;
//   2. the scrollspy: the section crossing the middle of the screen marks its NavLink current
//      (aria-current="location", which draws the ink text and bar). With no section crossing (the hero,
//      the footer), nothing is current.
// Mount it once, after </main>.
import { useEffect } from "react";
import { NAV } from "@/lib/nav";

export function ScrollState() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-header]");
    const sentinel = document.querySelector<HTMLElement>("[data-top-sentinel]");
    if (!header || !sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      header.toggleAttribute("data-at-top", entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const links = new Map<string, HTMLElement>();
    document.querySelectorAll<HTMLElement>("[data-header] a[data-nav-id]").forEach((a) => links.set(a.dataset.navId!, a));

    const crossing = new Set<string>();
    const update = () => {
      // Page order wins if two sections ever touch the line at once.
      const current = NAV.find((item) => crossing.has(item.id))?.id;
      links.forEach((a, id) => {
        if (id === current) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? crossing.add(entry.target.id) : crossing.delete(entry.target.id)));
        update();
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    NAV.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
