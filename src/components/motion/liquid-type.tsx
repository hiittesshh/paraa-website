"use client";

// Liquid type (ported from the c3 concept's liquid-type moment): under a moving mouse or pen the heading ripples as
// if seen through water, then settles back to crisp type within about a second. One SVG turbulence + displacement
// filter, put on the heading only while the ripple is alive and taken off when it is spent, so at rest it's plain
// text and costs nothing. The filter paints; it never reflows.
// Owner, 13 Nov 2026 ("not able to see the liquid hover animation" while scrolling): it also ripples as it scrolls
// through the screen, in proportion to the scroll's speed, on every device; the pointer ripple stays mouse and pen
// only. Reduced motion and no JS: plain type.
import { useEffect, useId, useRef, type ReactNode } from "react";

export function LiquidType({ children, className, strength = 1 }: { children: ReactNode; className?: string; strength?: number }) {
  const host = useRef<HTMLDivElement>(null);
  const fid = `lt-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const el = host.current;
    const type = el?.querySelector<HTMLElement>("h2, h3, p");
    const svg = el?.querySelector("svg");
    if (!el || !type || !svg) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const turb = svg.querySelector("feTurbulence")!;
    const disp = svg.querySelector("feDisplacementMap")!;
    let energy = 0, raf = 0, on = false, lastX = 0, lastY = 0, has = false, px = 0.5, t0 = 0;
    const apply = () => {
      const sc = Math.min(44, energy) * strength;
      if (sc < 0.6) {
        if (on) { type.style.filter = ""; on = false; }
        return false;
      }
      disp.setAttribute("scale", sc.toFixed(1));
      const dx = 0.006 + (px - 0.5) * 0.002, dy = 0.013 + Math.sin(t0 / 700) * 0.003;
      turb.setAttribute("baseFrequency", `${dx.toFixed(4)} ${dy.toFixed(4)}`);
      if (!on) { type.style.filter = `url(#${fid})`; on = true; }
      return true;
    };
    const tick = (now: number) => {
      raf = 0;
      t0 = now;
      energy *= 0.93;
      if (apply()) raf = requestAnimationFrame(tick);
      else energy = 0;
    };
    const move = (e: PointerEvent) => {
      const r = type.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (x < -r.width * 0.04 || x > r.width * 1.04 || y < -r.height * 0.2 || y > r.height * 1.2) { has = false; return; }
      px = Math.min(1, Math.max(0, x / r.width));
      if (has) energy = Math.min(44, energy + Math.min(9, Math.hypot(e.clientX - lastX, e.clientY - lastY) * 0.3) * 0.8);
      lastX = e.clientX; lastY = e.clientY; has = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => { has = false; };
    // Scroll: while the heading is on screen, each scroll step adds energy by its speed.
    let seen = false, lastScroll = scrollY;
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; lastScroll = scrollY; });
    io.observe(type);
    const onScroll = () => {
      const dy = Math.abs(scrollY - lastScroll);
      lastScroll = scrollY;
      if (!seen || dy < 1) return;
      energy = Math.min(30, energy + Math.min(6, dy * 0.12));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("scroll", onScroll, { passive: true });
    if (fine) {
      el.addEventListener("pointermove", move, { passive: true });
      el.addEventListener("pointerleave", leave);
    }
    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
      type.style.filter = "";
    };
  }, [fid, strength]);

  return (
    <div ref={host} className={className}>
      <svg width="0" height="0" aria-hidden className="absolute">
        <filter id={fid} x="-5%" y="-20%" width="110%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.013" numOctaves={1} seed={7} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={0} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      {children}
    </div>
  );
}
