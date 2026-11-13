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
