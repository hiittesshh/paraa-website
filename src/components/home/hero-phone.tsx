"use client";

// The hero's figure with its moving phone (owner, 13 Nov 2026: "can we have something that those screens
// automatically change"). The server renders every screen; this cycles them, one every few seconds, sliding the next
// in from the right. It pauses off screen, on a hidden tab and by its control (WCAG 2.2.2: it moves for more than
// five seconds), and stays on the first screen under reduced motion or without JS. The phone and its card are
// decorative (aria-hidden, inert); the control and the caption sit outside them.
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EVERY = 3600;

export function HeroPhoneFigure({ screens, floats, caption }: { screens: ReactNode[]; floats: ReactNode[]; caption: ReactNode }) {
  const phone = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [moving, setMoving] = useState(false);
  const [paused, setPaused] = useState(false);
  const [away, setAway] = useState(false);
  const n = screens.length;

  useEffect(() => {
    const q = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMoving(!q.matches);
    sync();
    q.addEventListener("change", sync);
    const el = phone.current;
    const io = el ? new IntersectionObserver(([e]) => setAway(!e.isIntersecting)) : null;
    if (el && io) io.observe(el);
    return () => {
      q.removeEventListener("change", sync);
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!moving || paused || away) return;
    const t = setInterval(() => {
      if (!document.hidden) setI((k) => (k + 1) % n);
    }, EVERY);
    return () => clearInterval(t);
  }, [moving, paused, away, n]);

  return (
    <figure className="hb-figure-wrap">
      <div className="hb-stage">
        <div className="hb-device">
          <div ref={phone} className="hb-phone enter-rise" aria-hidden>
            <div className="hb-screen" inert>
              <span className="hb-island" />
              <div className="hb-status">
                <span>9:41</span>
                <span className="hb-status-icons">
                  <span className="hb-signal">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <svg className="hb-wifi" viewBox="0 0 16 12" aria-hidden>
                    <path d="M8 11.2 5.6 8.8a3.4 3.4 0 0 1 4.8 0L8 11.2Zm-4.2-4.2-1.4-1.4a7.9 7.9 0 0 1 11.2 0L12.2 7a5.9 5.9 0 0 0-8.4 0ZM.9 4.1-.5 2.7a12 12 0 0 1 17 0l-1.4 1.4a10 10 0 0 0-14.2 0Z" />
                  </svg>
                  <span className="hb-battery">
                    <i />
                  </span>
                </span>
              </div>
              <div className="hb-panels">
                {screens.map((s, k) => (
                  <div key={k} className="hb-panel" data-state={k === i ? "on" : k === (i - 1 + n) % n ? "past" : "next"}>
                    {s}
                  </div>
                ))}
              </div>
              <span className="hb-home-bar" />
            </div>
          </div>
          {/* The card beside the phone: one per screen, changing with it. */}
          <div className="hb-float enter-pop" style={{ "--delay": "200ms" } as React.CSSProperties} aria-hidden>
            {floats.map((f, k) => (
              <div key={k} className="hb-float-slot" data-state={k === i ? "on" : "off"}>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="hb-small hb-caption">
        {moving && (
          <button type="button" className="hb-pause" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
            {paused ? <Play aria-hidden /> : <Pause aria-hidden />}
            {paused ? "Play the screens" : "Pause the screens"}
          </button>
        )}
        {caption}
      </figcaption>
    </figure>
  );
}
