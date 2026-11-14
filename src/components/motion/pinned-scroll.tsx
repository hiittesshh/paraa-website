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
const AUTOPLAY = true; // owner, 14 Nov 2026: back on, looping, as a slideshow

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

  // Slides (owner, 14 Nov 2026: the slow autoscroll confused people, "is it me or the site scrolling?"; "it should be
  // faster, like a slideshow"). While the stage is pinned, one wheel gesture moves exactly one chapter, in a quick
  // 0.6 s glide; past the last chapter (or before the first) the page scrolls on as normal. Left alone, it plays itself,
  // about 2.5 s a slide, and says so with an Auto-play chip that can be paused. Desktop live mode only.
  const [auto, setAuto] = useState<"off" | "playing" | "paused">("off");
  const autoRef = useRef(auto);
  useEffect(() => {
    autoRef.current = auto;
  }, [auto]);
  useEffect(() => {
    const tr = track.current;
    if (!live || !tr) return;
    const GLIDE = 0.35;
    const HOLD = 1500;
    let gliding = false;
    let userGliding = false;
    let arriving = false;
    let quietUntil = 0;
    let pinned = false;
    let timer = 0;
    type L = { scrollTo: (y: number, o: object) => void };
    const lenis = () => (window as unknown as { __lenis?: L }).__lenis;
    const geom = () => {
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) * 16 || 64;
      const r = tr.getBoundingClientRect();
      const run = r.height - (innerHeight - header);
      const top = scrollY + r.top - header;
      const p = run > 0 ? Math.min(1, Math.max(0, (header - r.top) / run)) : 0;
      const isPinned = run > 0 && r.top <= header + 4 && r.bottom >= innerHeight - 4;
      return { run, top, at: Math.min(count - 1, Math.floor(p * count)), isPinned };
    };
    const yOf = (g: ReturnType<typeof geom>, i: number) => g.top + (g.run * (i + 0.5)) / count;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const go = (i: number) => {
      const g = geom();
      gliding = true;
      const y = yOf(g, i);
      const done = () => {
        gliding = false;
        if (arriving) quietUntil = performance.now() + 450;
        arriving = false;
        schedule();
      };
      const l = lenis();
      if (l) l.scrollTo(y, { duration: GLIDE, easing: ease, force: true, onComplete: done });
      else {
        scrollTo({ top: y, behavior: "smooth" });
        setTimeout(done, GLIDE * 1000);
      }
    };
    const schedule = () => {
      clearTimeout(timer);
      // Autoplay is off (owner, 14 Nov 2026: "comment out the autoplay, let the user scroll, but scroll should be
      // fast"). Set AUTOPLAY to true to bring it back.
      if (!AUTOPLAY) return;
      const g = geom();
      if (!g.isPinned || autoRef.current === "paused") return;
      setAuto("playing");
      // Loops (owner, 14 Nov 2026): after the last market it goes back to the first.
      timer = window.setTimeout(() => {
        const now = geom();
        if (now.isPinned && autoRef.current === "playing") go(now.at >= count - 1 ? 0 : now.at + 1);
      }, HOLD);
    };
    // Owner, 14 Nov 2026: while the section is in focus, one scroll moves on to the next part of the page (down) or back
    // to the one before (up), not slide by slide; the slides play themselves.
    let settleUntil = 0;
    const onWheel = (e: WheelEvent) => {
      // While the visitor's own move runs, and just after it, the rest of that gesture is absorbed wherever it lands,
      // so one scroll always ends in the same place.
      if (userGliding || performance.now() < settleUntil) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      const g = geom();
      if (!g.isPinned) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      // the rest of a gesture that just landed us here, or the visitor's own move already under way, is absorbed; an
      // autoplay glide never blocks the visitor
      if (userGliding || arriving || performance.now() < quietUntil || Math.abs(e.deltaY) < 4) return;
      clearTimeout(timer);
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) * 16 || 64;
      const trackH = tr.getBoundingClientRect().height;
      const y = e.deltaY > 0 ? g.top + trackH : Math.max(0, g.top - (innerHeight - header));
      gliding = true;
      userGliding = true;
      const l = lenis();
      const done = () => {
        gliding = false;
        userGliding = false;
        settleUntil = performance.now() + 350;
      };
      if (l) l.scrollTo(y, { duration: 0.7, easing: ease, force: true, onComplete: done });
      else {
        scrollTo({ top: y, behavior: "smooth" });
        setTimeout(done, 700);
      }
    };
    let lastY = scrollY;
    const onScroll = () => {
      const g = geom();
      const down = scrollY >= lastY;
      lastY = scrollY;
      if (g.isPinned && !pinned) {
        pinned = true;
        // Arriving: land on the first slide from above, the last from below, whatever the scroll's momentum.
        const want = down ? 0 : count - 1;
        if (!gliding && g.at !== want) {
          arriving = true;
          go(want);
        }
        else schedule();
      } else if (!g.isPinned && pinned) {
        pinned = false;
        clearTimeout(timer);
        setAuto("off");
      }
    };
    addEventListener("wheel", onWheel, { capture: true, passive: false });
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const onToggle = () => {
      if (autoRef.current === "paused") schedule();
      else clearTimeout(timer);
    };
    root.current?.addEventListener("paraa-autoplay", onToggle);
    const rootEl = root.current;
    return () => {
      clearTimeout(timer);
      removeEventListener("wheel", onWheel, { capture: true });
      removeEventListener("scroll", onScroll);
      rootEl?.removeEventListener("paraa-autoplay", onToggle);
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
          {/* The Auto-play chip was removed (owner, 14 Nov 2026). */}
        </div>
      </div>
      {after}
    </section>
  );
}
