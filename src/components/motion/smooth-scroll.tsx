"use client";

// Smooth vertical scrolling for the whole page (owner, 13 Nov 2026), with Lenis. Lenis keeps the page's native
// scroll (it eases window.scrollTo towards the wheel's target), so sticky sections, IntersectionObservers, the
// pinned markets and the hash handler all keep working. Wheel and trackpad only: touch keeps the phone's own
// native scrolling. Off under reduced motion. Renders nothing; mount it once.
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const q = matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    const start = () => {
      if (lenis || q.matches) return;
      lenis = new Lenis({ autoRaf: true, lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true, syncTouch: false });
      // Shared with the pinned section's slow autoscroll, so both move the page through one engine.
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    };
    const stop = () => {
      lenis?.destroy();
      lenis = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
    const sync = () => (q.matches ? stop() : start());
    sync();
    q.addEventListener("change", sync);
    return () => {
      q.removeEventListener("change", sync);
      stop();
    };
  }, []);
  return null;
}
