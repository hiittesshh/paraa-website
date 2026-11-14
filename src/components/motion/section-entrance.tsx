"use client";

// A smooth entrance for every section below the hero (owner, 14 Nov 2026: "add smooth entry/landing animation to each
// section"). The first time a section comes into view, its content rises into place and fades in: the heading block
// first, the rest a beat later. Transform and opacity only, once per section. The hidden state is set from script and
// only on sections still below the screen, so with JS off, under reduced motion, or for a section already in view,
// nothing is ever hidden. Renders nothing; mount it once.
import { useEffect } from "react";

export function SectionEntrance() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sections = [...document.querySelectorAll<HTMLElement>("main > section:not(#top)")];
    const pending = sections.filter((s) => s.getBoundingClientRect().top > innerHeight * 0.9);
    pending.forEach((s) => s.setAttribute("data-entrance", "out"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const s = e.target as HTMLElement;
          s.setAttribute("data-entrance", "in");
          io.unobserve(s);
          // Once landed, take the transforms off, so sticky stages and fixed children behave as if nothing happened.
          setTimeout(() => s.removeAttribute("data-entrance"), 1400);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.02 },
    );
    pending.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return null;
}
