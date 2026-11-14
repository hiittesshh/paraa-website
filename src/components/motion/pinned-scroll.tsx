"use client";

// Pinned scroll (ported from the c3 concept's pinned-chapters, rebuilt for smoothness). The server renders every
// chapter in full with its photograph inline, so without JS, under reduced motion and below 1024 × 640 the section
// is static rows (or a stack on a phone). Live, the track grows so the stage holds for `hold` screens per chapter;
// the stage sticks under the header, one chapter at a time opens and its photograph crossfades in the frame.
//
// Smoothness: one passive scroll listener schedules at most one requestAnimationFrame; that frame reads one rect
// and writes one CSS variable (--mk-p, 0–1) plus `data-step` only when the chapter changes. No React state per
// frame, no layout reads after writes. The photo's slow zoom and the progress rule are CSS driven by --mk-p, so
// they follow the scroll continuously (transform and opacity only).
import { useEffect, useRef, useState, type ReactNode } from "react";

const HOLD = 0.75; // screens of scroll per chapter

export function PinnedScroll({
  id,
  labelledBy,
  count,
  className,
  frame,
  children,
  after,
}: {
  id: string;
  labelledBy: string;
  count: number;
  className?: string;
  /** The live frame's figures (`.mk-shot` with data-i); rendered only when live, so the static page loads none. */
  frame: ReactNode;
  children: ReactNode;
  /** Content after the pinned track (it scrolls normally). */
  after?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const qs = [matchMedia("(min-width: 64rem)"), matchMedia("(min-height: 40rem)"), matchMedia("(prefers-reduced-motion: reduce)")];
    const sync = () => setLive(qs[0].matches && qs[1].matches && !qs[2].matches);
    sync();
    qs.forEach((q) => q.addEventListener("change", sync));
    return () => qs.forEach((q) => q.removeEventListener("change", sync));
  }, []);

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!live || !el || !tr) return;
    let raf = 0;
    let step = -1;
    let last = -1;
    const frameFn = () => {
      raf = 0;
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) * 16 || 64;
      const r = tr.getBoundingClientRect();
      const run = r.height - (innerHeight - header);
      const p = run > 0 ? Math.min(1, Math.max(0, (header - r.top) / run)) : 0;
      if (Math.abs(p - last) > 0.0005) {
        last = p;
        el.style.setProperty("--mk-p", p.toFixed(4));
      }
      const s = Math.min(count - 1, Math.floor(p * count));
      if (s !== step) {
        step = s;
        el.dataset.step = String(s);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frameFn);
    };
    frameFn();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      delete el.dataset.step;
      el.style.removeProperty("--mk-p");
    };
  }, [live, count]);

  // Slow autoscroll (owner, 14 Nov 2026: "add smooth and slow autoscrolling in our What you're buying section").
  // While the stage is pinned and the visitor has been idle for a few seconds, glide slowly to the next chapter, hold,
  // and go on until the last one; any wheel, touch, key or pointer press hands control straight back. It never leaves
  // the section. Live (desktop) only, so never under reduced motion.
  useEffect(() => {
    const tr = track.current;
    if (!live || !tr) return;
    const IDLE = 2600; // ms without input before it moves
    const HOLD = 3200; // ms on each chapter before the next glide
    const GLIDE = 1.9; // s per glide
    let lastInput = performance.now();
    let lastArrive = performance.now();
    let gliding = false;
    let pinned = false;
    let raf = 0;
    const lenis = () => (window as unknown as { __lenis?: { scrollTo: (y: number, o: object) => void; stop?: () => void } }).__lenis;
    const onInput = () => {
      lastInput = performance.now();
      if (gliding) {
        gliding = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const glideTo = (y: number) => {
      gliding = true;
      const l = lenis();
      const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      if (l) {
        l.scrollTo(y, { duration: GLIDE, easing: ease, onComplete: () => { gliding = false; lastArrive = performance.now(); } });
        return;
      }
      const from = scrollY;
      const start = performance.now();
      const step = (now: number) => {
        if (!gliding) return;
        const t = Math.min(1, (now - start) / (GLIDE * 1000));
        scrollTo(0, from + (y - from) * ease(t));
        if (t < 1) raf = requestAnimationFrame(step);
        else {
          gliding = false;
          lastArrive = performance.now();
        }
      };
      raf = requestAnimationFrame(step);
    };
    const tick = setInterval(() => {
      if (gliding || document.hidden) return;
      const now = performance.now();
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) * 16 || 64;
      const r = tr.getBoundingClientRect();
      const run = r.height - (innerHeight - header);
      // pinned: the track's top has reached the header and its end is still below the screen's foot
      if (run <= 0 || r.top > header + 4 || r.bottom < innerHeight - 4) {
        pinned = false;
        return;
      }
      // just arrived: hold on the chapter in view first
      if (!pinned) {
        pinned = true;
        lastArrive = now;
        return;
      }
      if (now - lastInput < IDLE || now - lastArrive < HOLD) return;
      const p = Math.min(1, Math.max(0, (header - r.top) / run));
      const at = Math.min(count - 1, Math.floor(p * count));
      if (at >= count - 1) return;
      const top = scrollY + r.top - header;
      glideTo(top + (run * (at + 1 + 0.5)) / count);
    }, 400);
    const opts = { passive: true } as AddEventListenerOptions;
    addEventListener("wheel", onInput, opts);
    addEventListener("touchstart", onInput, opts);
    addEventListener("pointerdown", onInput, opts);
    addEventListener("keydown", onInput);
    return () => {
      clearInterval(tick);
      if (raf) cancelAnimationFrame(raf);
      removeEventListener("wheel", onInput);
      removeEventListener("touchstart", onInput);
      removeEventListener("pointerdown", onInput);
      removeEventListener("keydown", onInput);
    };
  }, [live, count]);

  return (
    <section
      ref={root}
      id={id}
      aria-labelledby={labelledBy}
      className={className}
      data-live={live ? "" : undefined}
      style={{ "--mk-n": count, "--mk-hold": HOLD } as React.CSSProperties}
    >
      <div ref={track} className="mk-track">
        <div className="container-page mk-stage">
          {children}
          {live ? (
            <div className="mk-frame" aria-hidden>
              {frame}
            </div>
          ) : null}
        </div>
      </div>
      {after}
    </section>
  );
}
