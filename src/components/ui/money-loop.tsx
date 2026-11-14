"use client";

// Where your money goes (spec §4.11), as a loop (owner, 13 Nov 2026: "the pulses ... too basic, refine that
// properly"). The road in runs along the top (your bank → Paraa wallet → basket units), turns down at maturity, and
// the road back runs along the bottom (Paraa wallet → your bank, in your name). A gold ₹ coin travels the route on
// one clock, easing into each step and resting there; a gold trail draws behind it; each step lights and lifts as the
// coin arrives. Below 1024 the steps are one column and the route runs down it.
//
// The list is the content (a semantic <ol>, server-rendered, readable with JS off); the route, coin, trail and the
// "Matures" label are decorative. The route is measured from the step icons, so it follows the layout at any
// width. It runs only on screen, pauses on a hidden tab and by its control (WCAG 2.2.2), and under reduced motion
// shows the whole route drawn, every step lit, with no coin.
//
// Custody isn't shown: a node is added only once custody is confirmed (spec §12).
import { Landmark, Layers, Pause, Play, Wallet, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import "./money-loop.css";

type Step = { node: string; how: string; icon: LucideIcon };

const STEPS: readonly Step[] = [
  { node: "Your bank account", how: "You pay in rupees", icon: Landmark },
  { node: "Paraa wallet", how: "By UPI or bank transfer, verified", icon: Wallet },
  { node: "Basket units", how: "Invested at the next daily price", icon: Layers },
  { node: "Paraa wallet", how: "Redeemed after it matures", icon: Wallet },
  { node: "Your bank account, in your name", how: "Withdrawn in rupees", icon: Landmark },
];

// The clock (ms): rest at the start, then for each leg a move and a rest at its step, then a hold with the whole
// route lit, then the trail fades and it starts again.
const START = 450;
const MOVE = 950;
const REST = 420;
const HOLD = 1100;
const FADE = 500;
const LEGS = STEPS.length - 1;
const CYCLE = START + LEGS * (MOVE + REST) + HOLD + FADE;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Frame = { leg: number; along: number; at: number; fade: number };

/** Where the coin is at time t: which leg, how far along it (0–1), the last step reached, and the fade (0–1). */
function frameAt(t: number): Frame {
  if (t < START) return { leg: 0, along: 0, at: 0, fade: 0 };
  let r = t - START;
  for (let k = 0; k < LEGS; k++) {
    if (r < MOVE) return { leg: k, along: ease(r / MOVE), at: k, fade: 0 };
    r -= MOVE;
    if (r < REST) return { leg: k, along: 1, at: k + 1, fade: 0 };
    r -= REST;
  }
  if (r < HOLD) return { leg: LEGS - 1, along: 1, at: LEGS, fade: 0 };
  return { leg: LEGS - 1, along: 1, at: LEGS, fade: Math.min(1, (r - HOLD) / FADE) };
}

export function MoneyLoop({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const clockRef = useRef(0); // ms into the cycle; kept across pause and play
  const [moving, setMoving] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const q = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMoving(!q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  // The route, rebuilt from the step icons whenever the layout changes.
  useEffect(() => {
    const el = root.current;
    const s = svg.current;
    if (!el || !s) return;
    const track = s.querySelector<SVGPathElement>("[data-track]")!;
    const trails = [...s.querySelectorAll<SVGPathElement>("[data-trail]")];
    const coin = s.querySelector<SVGGElement>("[data-coin]")!;
    const steps = [...el.querySelectorAll<HTMLElement>(".ml-step")];
    const measure = document.createElementNS("http://www.w3.org/2000/svg", "path");
    s.appendChild(measure);
    measure.setAttribute("visibility", "hidden");

    let total = 0;
    let cum: number[] = [];
    let lens: number[] = [];

    const build = () => {
      const box = el.getBoundingClientRect();
      s.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      const p = steps.map((st) => {
        const r = st.querySelector(".ml-dot")!.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      const wide = el.dataset.layout === "loop" && getComputedStyle(el).getPropertyValue("--ml-wide").trim() === "1";
      const R = Math.max(70, (p[3].y - p[2].y) * 0.8);
      const segs = p.slice(0, -1).map((a, k) => {
        const b = p[k + 1];
        if (wide && k === 2) return `M ${a.x} ${a.y} C ${a.x + R} ${a.y} ${b.x + R} ${b.y} ${b.x} ${b.y}`;
        return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
      });
      lens = segs.map((d) => {
        measure.setAttribute("d", d);
        return measure.getTotalLength();
      });
      cum = lens.reduce<number[]>((acc, l, k) => [...acc, acc[k] + l], [0]);
      total = cum[cum.length - 1];
      const d = segs.map((x, k) => (k === 0 ? x : x.replace(/^M [^A-Z]+/, ""))).join(" ");
      [track, ...trails].forEach((path) => path.setAttribute("d", d));
    };

    let lastAt = -1;
    const paint = (f: Frame) => {
      const L = cum[f.leg] + lens[f.leg] * f.along;
      trails.forEach((t) => {
        t.style.strokeDasharray = `${L} ${total + 1}`;
        t.style.opacity = String(1 - f.fade);
      });
      const pt = track.getPointAtLength(L);
      coin.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      // The coin shows while it travels; it sinks into the step while resting there, and fades with the trail.
      const travelling = f.along > 0 && f.along < 1;
      coin.style.opacity = String(f.fade > 0 ? 0 : travelling || (f.at === 0 && f.along === 0) ? 1 : 0);
      if (f.at !== lastAt || f.fade > 0) {
        lastAt = f.at;
        steps.forEach((st, k) => {
          st.toggleAttribute("data-reached", f.fade < 0.5 && k <= f.at);
          st.toggleAttribute("data-current", f.fade < 0.5 && k === f.at);
        });
      }
    };

    let raf = 0;
    let last = 0;
    let visible = false;
    const still = !moving;
    const running = () => moving && !paused && visible && !document.hidden;
    const tick = (now: number) => {
      raf = 0;
      if (last) clockRef.current = (clockRef.current + Math.min(64, now - last)) % CYCLE;
      last = now;
      paint(frameAt(clockRef.current));
      if (running()) raf = requestAnimationFrame(tick);
      else last = 0;
    };
    const kick = () => {
      if (!raf && running()) raf = requestAnimationFrame(tick);
    };

    build();
    const ro = new ResizeObserver(() => {
      build();
      if (still) paint({ leg: LEGS - 1, along: 1, at: LEGS, fade: 0 });
      else paint(frameAt(clockRef.current));
    });
    ro.observe(el);

    if (still) {
      // Reduced motion: the whole route drawn, every step lit, no coin.
      paint({ leg: LEGS - 1, along: 1, at: LEGS, fade: 0 });
      coin.style.opacity = "0";
      steps.forEach((st) => st.setAttribute("data-reached", ""));
    } else {
      paint(frameAt(clockRef.current));
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      kick();
    });
    io.observe(el);
    const vis = () => kick();
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", vis);
      if (raf) cancelAnimationFrame(raf);
      measure.remove();
    };
  }, [moving, paused]);

  return (
    <div className={cn("ml", className)}>
      <div ref={root} className="ml-stage" data-layout="loop">
        <svg ref={svg} className="ml-route" aria-hidden>
          <defs>
            <filter id="ml-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <radialGradient id="ml-halo">
              <stop offset="0" stopColor="#FDC037" stopOpacity=".55" />
              <stop offset="1" stopColor="#FDC037" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path data-track className="ml-track" />
          <path data-trail className="ml-trail-glow" filter="url(#ml-glow)" />
          <path data-trail className="ml-trail" />
          <g data-coin className="ml-coin">
            <circle r="26" fill="url(#ml-halo)" />
            <circle r="12" className="ml-coin-face" />
            <text y="4.5" textAnchor="middle" className="ml-coin-mark">
              ₹
            </text>
          </g>
        </svg>

        <ol aria-label="Where your money goes" className="ml-list">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={i} className="ml-step" data-i={i}>
                <span className="ml-dot" aria-hidden>
                  <Icon strokeWidth={1.75} />
                </span>
                <span className="ml-text">
                  <span className="ml-name">{step.node}</span>
                  <span className="ml-how">{step.how}</span>
                </span>
              </li>
            );
          })}
        </ol>

        {/* The turn at maturity, labelled on the curve (desktop only). */}
        <span className="ml-turn" aria-hidden>
          Matures
        </span>
      </div>

      {moving && (
        <button type="button" className="ml-pause" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
          {paused ? <Play aria-hidden /> : <Pause aria-hidden />}
          {paused ? "Play the journey" : "Pause the journey"}
        </button>
      )}
    </div>
  );
}
