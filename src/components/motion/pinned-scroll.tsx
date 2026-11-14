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
    // Owner, 14 Nov 2026: the pinned slides made the scroll feel off ("is it me or the site?"). The section is a normal
    // scroll now: every market is its own row, at every width. The pinned mode stays in the code, switched off.
    const sync = () => setLive(false && qs[0].matches && qs[1].matches && !qs[2].matches);
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
  const [tickKey, setTickKey] = useState(0);
  const autoRef = useRef(auto);
  useEffect(() => {
    autoRef.current = auto;
  }, [auto]);
  useEffect(() => {
    const tr = track.current;
    if (!live || !tr) return;
    const GLIDE = 0.6;
    const HOLD = 2500;
    let gliding = false;
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
        schedule();
      };
      const l = lenis();
      if (l) l.scrollTo(y, { duration: GLIDE, easing: ease, lock: true, onComplete: done });
      else {
        scrollTo({ top: y, behavior: "smooth" });
        setTimeout(done, GLIDE * 1000);
      }
    };
    const schedule = () => {
      clearTimeout(timer);
      const g = geom();
      if (!g.isPinned || autoRef.current === "paused" || g.at >= count - 1) {
        if (g.at >= count - 1 && autoRef.current === "playing") setAuto("off");
        return;
      }
      setAuto("playing");
      setTickKey((k) => k + 1);
      timer = window.setTimeout(() => {
        const now = geom();
        if (now.isPinned && autoRef.current === "playing" && now.at < count - 1) go(now.at + 1);
      }, HOLD);
    };
    const onWheel = (e: WheelEvent) => {
      const g = geom();
      if (!g.isPinned) return;
      const down = e.deltaY > 0;
      const next = down ? g.at + 1 : g.at - 1;
      if (next < 0 || next > count - 1) return; // let the page carry on past the ends
      // Ours: keep the smooth-scroll engine out of it and move one slide.
      e.preventDefault();
      e.stopImmediatePropagation();
      if (gliding || Math.abs(e.deltaY) < 4) return;
      clearTimeout(timer);
      go(next);
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
        if (!gliding && g.at !== want) go(want);
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

  const toggleAuto = () => {
    const next = auto === "paused" ? "playing" : "paused";
    setAuto(next);
    autoRef.current = next;
    root.current?.dispatchEvent(new Event("paraa-autoplay"));
  };

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
          {live && auto !== "off" ? (
            <button type="button" className="mk-auto" aria-pressed={auto === "paused"} onClick={toggleAuto}>
              <span className="mk-auto-label">{auto === "paused" ? "Paused" : "Auto-play"}</span>
              <span className="mk-auto-bar" aria-hidden>
                {auto === "playing" ? <i key={tickKey} /> : null}
              </span>
              <span className="mk-auto-icon" aria-hidden>
                {auto === "paused" ? "▶" : "❚❚"}
              </span>
              <span className="sr-only">{auto === "paused" ? "Resume the slides" : "Pause the slides"}</span>
            </button>
          ) : null}
        </div>
      </div>
      {after}
    </section>
  );
}
