"use client";

// The hero's flight: the same camera move as Mercury's hero, built from our own drawing instead of a
// video. As you scroll, the camera flies from a wide view of a valley to a desk and into the laptop.
// It's true perspective: every layer scales by the same camera move raised to its own depth, so the
// mountains barely grow while the desk rushes past. Decorative, so hidden from screen readers.
//
// Each layer is its own graphics-card texture (will-change: transform), so scrolling only moves
// textures and never redraws a shape. Near layers are drawn at 2.5x and shown at 0.4x, so they stay
// sharp as the camera closes in. Everything scales about the centre of the picture, which is the
// centre of the laptop's screen.
import { motion, useTransform, type MotionValue } from "motion/react";
import type { ReactNode } from "react";

/** A repeatable random number, so the server and the browser draw the same mountains. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const STEPS = 128;

/** A natural skyline by midpoint displacement: split each slope in two and nudge the middle. */
function ridgeHeights(seed: number, base: number, height: number, roughness: number) {
  const rand = seeded(seed);
  const ys = new Array<number>(STEPS + 1).fill(base);
  ys[0] = base - rand() * height;
  ys[STEPS] = base - rand() * height;
  let spread = height;
  for (let size = STEPS; size > 1; size /= 2) {
    for (let i = size / 2; i < STEPS; i += size) {
      ys[i] = (ys[i - size / 2]! + ys[i + size / 2]!) / 2 + (rand() - 0.5) * spread;
    }
    spread *= roughness;
  }
  return ys;
}

/** The ridge's outline, drawn wider than the picture so its edges never show. */
function ridgePath(ys: number[]) {
  const line = ys.map((y, i) => `${Math.round(-200 + (i / STEPS) * 2000)} ${Math.round(y)}`).join("L");
  return `M${line}L1800 1500L-200 1500Z`;
}

/** A line of small conifers along a ridge, as one path. */
function treesPath(seed: number, ys: number[], size: number, count: number) {
  const rand = seeded(seed);
  let d = "";
  for (let n = 0; n < count; n++) {
    const i = rand() * STEPS;
    const a = ys[Math.floor(i)]!;
    const b = ys[Math.ceil(i)]!;
    const x = Math.round(-200 + (i / STEPS) * 2000);
    const y = Math.round(a + (b - a) * (i % 1) + 3 + rand() * size * 0.8);
    const h = size * (0.7 + rand() * 0.7);
    const w = h * 0.34;
    d += `M${Math.round(x - w)} ${y}L${x} ${Math.round(y - h)}L${Math.round(x + w)} ${y}Z`;
  }
  return d;
}

/** Tufts of grass over the near hill, as one path. */
function grassPath(seed: number, ys: number[], count: number) {
  const rand = seeded(seed);
  let d = "";
  for (let n = 0; n < count; n++) {
    const i = rand() * STEPS;
    const ground = ys[Math.round(i)]!;
    const x = Math.round(-200 + (i / STEPS) * 2000);
    const y = Math.round(ground + 6 + rand() * 260);
    const lean = Math.round((rand() - 0.5) * 12);
    d += `M${x} ${y}l${lean} -${Math.round(9 + rand() * 13)}`;
  }
  return d;
}

const far = ridgeHeights(11, 462, 110, 0.56);
const mid = ridgeHeights(29, 505, 120, 0.56);
const midNear = ridgeHeights(47, 560, 130, 0.58);
const near = ridgeHeights(71, 628, 110, 0.56);
const hill = ridgeHeights(97, 672, 56, 0.5);

const PATHS = {
  far: ridgePath(far),
  mid: ridgePath(mid),
  midTrees: treesPath(3, mid, 9, 150),
  midNear: ridgePath(midNear),
  midNearTrees: treesPath(5, midNear, 15, 130),
  near: ridgePath(near),
  nearTrees: treesPath(7, near, 26, 90),
  hill: ridgePath(hill),
  grass: grassPath(13, hill, 520),
};

/** How much of the flight is done, 0 to 1, with a soft start and landing. Shared with the app window. */
export const flightMove = (flight: number) => {
  const t = Math.min(1, Math.max(0, flight));
  return t * t * (3 - 2 * t);
};

/** One sheet of the scene at its own depth: 0 stays put, 1 is the desk and laptop, more passes faster. */
function Layer({
  flight,
  camera,
  endShift,
  depth,
  sharp = false,
  children,
}: {
  flight: MotionValue<number>;
  camera: MotionValue<number>;
  endShift: MotionValue<number>;
  depth: number;
  sharp?: boolean;
  children: ReactNode;
}) {
  const transform = useTransform(() => {
    const move = flightMove(flight.get());
    const y = `calc(var(--hero-drop) * ${(1 - move).toFixed(4)} + ${(endShift.get() * move).toFixed(1)}px)`;
    const scale = camera.get() ** (move * depth) * (sharp ? 0.4 : 1);
    return `translateY(${y}) scale(${scale.toFixed(4)})`;
  });
  return (
    <motion.svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ transform, ...(sharp ? { inset: "-75%", width: "250%", height: "250%" } : { inset: 0, width: "100%", height: "100%" }) }}
      className="absolute overflow-visible will-change-transform"
    >
      {children}
    </motion.svg>
  );
}

const SCREEN = { x: 715, y: 397, w: 170, h: 106 };

/** The app on the laptop, drawn at normal size and shrunk into the lid. No values, returns or charts. */
function AppScreen() {
  const label = { fill: "var(--color-grey-400)", fontSize: 16 } as const;
  const strong = { fill: "#FFFFFF", fontSize: 16, fontWeight: 600 } as const;
  const panel = { fill: "var(--color-ink)", stroke: "var(--color-ink-2)", rx: 16 } as const;
  return (
    <svg x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} viewBox="0 0 1200 748">
      <rect width="1200" height="748" fill="var(--color-ink-800)" />
      {/* Sidebar */}
      <rect width="236" height="748" fill="var(--color-ink-900)" />
      <circle cx="44" cy="48" r="16" fill="var(--color-gold-500)" />
      <text x="72" y="54" {...strong}>
        Paraa
      </text>
      <rect x="20" y="96" width="196" height="40" rx="10" fill="var(--color-ink)" />
      {["Your plan", "Invest", "Talk to a CA", "Withdraw"].map((item, i) => (
        <text key={item} x="36" y={122 + i * 52} {...(i === 0 ? strong : label)}>
          {item}
        </text>
      ))}
      {/* Heading */}
      <text x="276" y="72" fill="#FFFFFF" fontSize="30" fontWeight="700">
        Your plan
      </text>
      <rect x="1064" y="46" width="96" height="34" rx="17" fill="none" stroke="var(--color-ink-4)" />
      <text x="1112" y="69" textAnchor="middle" {...strong}>
        Example
      </text>
      {/* Main panels */}
      <rect x="276" y="112" width="500" height="280" {...panel} />
      <text x="308" y="164" {...label}>
        Invested so far
      </text>
      <text x="308" y="232" fill="#FFFFFF" fontSize="60" fontWeight="700">
        ₹60,000
      </text>
      <rect x="308" y="284" width="178" height="52" rx="26" fill="var(--color-gold-500)" />
      <text x="397" y="316" textAnchor="middle" fill="var(--color-ink)" fontSize="16" fontWeight="700">
        Invest more
      </text>
      <rect x="800" y="112" width="360" height="280" {...panel} />
      {[
        ["Monthly plan", "₹10,000"],
        ["Next investment", "5 Dec 2026"],
        ["Paid from", "Paraa wallet"],
        ["Withdraw to", "••4821"],
      ].map(([a, b], i) => (
        <g key={a}>
          <text x="828" y={166 + i * 58} {...label}>
            {a}
          </text>
          <text x="1132" y={166 + i * 58} textAnchor="end" {...strong}>
            {b}
          </text>
          {i < 3 && <line x1="828" x2="1132" y1={188 + i * 58} y2={188 + i * 58} stroke="var(--color-ink-2)" />}
        </g>
      ))}
      {/* Lower panels */}
      {[
        ["Invest", "Once or every month", "From your Paraa wallet"],
        ["Talk to a CA", "A chartered accountant", "Ask before you decide"],
        ["Withdraw", "When it matures", "Only to your own account"],
      ].map(([title, line1, line2], i) => (
        <g key={title}>
          <rect x={276 + i * 300} y="416" width="284" height="196" {...panel} />
          <text x={304 + i * 300} y="464" fill="#FFFFFF" fontSize="20" fontWeight="700">
            {title}
          </text>
          <text x={304 + i * 300} y="510" {...strong}>
            {line1}
          </text>
          <text x={304 + i * 300} y="540" {...label}>
            {line2}
          </text>
        </g>
      ))}
      <text x="276" y="660" {...label}>
        Illustration with sample numbers. Not the real app, an account, a quote or a past result.
      </text>
    </svg>
  );
}

export function HeroScene({
  flight,
  camera,
  endShift,
  drawScreen,
}: {
  flight: MotionValue<number>;
  camera: MotionValue<number>;
  endShift: MotionValue<number>;
  /** Off when the live app window is flying in the laptop's place. */
  drawScreen: boolean;
}) {
  const fade = useTransform(flight, [0.62, 0.96], [0, 1]);
  const scrim = useTransform(flight, [0.12, 0.48], [1, 0]);
  const at = { flight, camera, endShift };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-ink-900 [--hero-drop:24svh] sm:[--hero-drop:12svh] sm:[@media(max-height:780px)]:[--hero-drop:18svh]">
      {/* --hero-drop starts the picture lower, so the desk sits below the words on every screen. */}
      {/* The sky: night at the top, warming to gold over the valley. */}
      <Layer {...at} depth={0.04}>
        <defs>
          <linearGradient id="hero-sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-ink-800)" />
            <stop offset="0.3" stopColor="var(--color-ink)" />
            <stop offset="0.5" stopColor="var(--color-gold-900)" />
            <stop offset="0.68" stopColor="var(--color-gold-700)" />
            <stop offset="0.82" stopColor="var(--color-gold-500)" />
          </linearGradient>
          <radialGradient id="hero-sun">
            <stop offset="0" stopColor="var(--color-gold-50)" />
            <stop offset="0.22" stopColor="var(--color-gold-300)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--color-gold-500)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="-400" y="-500" width="2400" height="1400" fill="url(#hero-sky)" />
        <ellipse cx="800" cy="420" rx="640" ry="230" fill="url(#hero-sun)" />
      </Layer>

      {/* Each ridge is lit along its top and falls into shadow and mist below, palest far away. */}
      <Layer {...at} depth={0.08}>
        <defs>
          <linearGradient id="ridge-far" x1="0" x2="0" y1="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="var(--color-gold-700)" />
            <stop offset="0.28" stopColor="var(--color-gold-800)" />
          </linearGradient>
          <linearGradient id="ridge-mid" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-gold-800)" />
            <stop offset="0.3" stopColor="var(--color-gold-900)" />
          </linearGradient>
          <linearGradient id="ridge-mid-near" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-gold-900)" />
            <stop offset="0.34" stopColor="var(--color-ink)" />
          </linearGradient>
          <linearGradient id="ridge-near" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-ink)" />
            <stop offset="0.4" stopColor="var(--color-ink-800)" />
          </linearGradient>
          <radialGradient id="hero-mist">
            <stop offset="0" stopColor="var(--color-gold-100)" stopOpacity="0.32" />
            <stop offset="1" stopColor="var(--color-gold-100)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d={PATHS.far} fill="url(#ridge-far)" />
        <ellipse cx="380" cy="505" rx="460" ry="52" fill="url(#hero-mist)" />
        <ellipse cx="1230" cy="520" rx="420" ry="46" fill="url(#hero-mist)" />
      </Layer>
      <Layer {...at} depth={0.13}>
        <path d={PATHS.mid} fill="url(#ridge-mid)" />
        <path d={PATHS.midTrees} fill="var(--color-gold-900)" />
        <ellipse cx="1040" cy="560" rx="520" ry="50" fill="url(#hero-mist)" />
      </Layer>
      <Layer {...at} depth={0.2}>
        <path d={PATHS.midNear} fill="url(#ridge-mid-near)" />
        <path d={PATHS.midNearTrees} fill="var(--color-gold-900)" />
        <ellipse cx="330" cy="625" rx="500" ry="46" fill="url(#hero-mist)" />
      </Layer>
      <Layer {...at} depth={0.32}>
        <path d={PATHS.near} fill="url(#ridge-near)" />
        <path d={PATHS.nearTrees} fill="var(--color-ink)" />
      </Layer>

      {/* The hilltop the desk stands on. */}
      <Layer {...at} depth={0.85} sharp>
        <defs>
          <linearGradient id="hero-hill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-ink-800)" />
            <stop offset="0.4" stopColor="var(--color-ink-900)" />
          </linearGradient>
        </defs>
        <path d={PATHS.hill} fill="url(#hero-hill)" />
        <path d={PATHS.grass} fill="none" stroke="var(--color-gold-700)" strokeOpacity="0.4" strokeWidth="1.1" />
      </Layer>

      {/* The desk and laptop. */}
      <Layer {...at} depth={1} sharp>
        <defs>
          <linearGradient id="hero-wood" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-gold-700)" />
            <stop offset="1" stopColor="var(--color-gold-900)" />
          </linearGradient>
        </defs>
        {/* Legs and drawers, behind the top */}
        <path d="M618 546h9l-8 170h-8ZM982 546h-9l8 170h8Z" fill="var(--color-ink-900)" />
        <rect x="892" y="548" width="74" height="104" rx="3" fill="var(--color-gold-800)" />
        <rect x="892" y="598" width="74" height="2" fill="var(--color-gold-900)" />
        <rect x="920" y="572" width="20" height="3" rx="1.5" fill="var(--color-gold-200)" />
        <rect x="920" y="622" width="20" height="3" rx="1.5" fill="var(--color-gold-200)" />
        {/* Table top */}
        <path d="M630 514h340l42 26H588Z" fill="url(#hero-wood)" />
        <path d="M588 540h424v7H588Z" fill="var(--color-gold-900)" />
        {/* Laptop */}
        <path d="M704 505h192l14 12H690Z" fill="var(--color-grey-300)" />
        <path d="M690 517h220v3a2 2 0 0 1-2 2H692a2 2 0 0 1-2-2Z" fill="var(--color-grey-500)" />
        <path d="M722 508h156l5 6H717Z" fill="var(--color-ink-2)" />
        <rect x="709" y="391" width="182" height="116" rx="7" fill="var(--color-ink-900)" stroke="var(--color-grey-400)" strokeWidth="0.8" />
        {drawScreen && <AppScreen />}
      </Layer>

      {/* The chair, nearest of all, so it leaves the frame first. */}
      <Layer {...at} depth={1.12} sharp>
        <path d="M536 448c-12-30 34-44 62-34 18 7 22 26 22 44l-6 92c0 12-10 18-22 18h-28c-12 0-20-7-22-18Z" fill="var(--color-ink-900)" />
        <path d="M544 452c-6-22 30-32 52-25 12 4 15 18 15 32l-5 84c0 8-8 12-16 12h-20c-9 0-15-5-16-13Z" fill="var(--color-ink)" />
        <path d="M534 566h98c10 0 16 8 14 16l-3 8c-2 6-8 10-15 10h-84c-8 0-14-5-15-11l-2-8c-2-8 2-15 7-15Z" fill="var(--color-gold-900)" />
        <path d="M578 600h10v62h-10ZM583 662l-46 26M583 662l46 26M583 662l-14 34M583 662l14 34" stroke="var(--color-grey-500)" strokeWidth="5" fill="none" strokeLinecap="round" />
      </Layer>

      {/* Darkens the top so the headline reads, and leaves with the words. */}
      <motion.div
        style={{ opacity: scrim }}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(19_20_22/0.5)_0%,rgb(19_20_22/0.42)_40%,transparent_60%)]"
      />
      {/* The world falls away as you arrive, leaving the app on the dark page, as Mercury's does. */}
      <motion.div style={{ opacity: fade }} className="absolute inset-0 bg-background" />
    </div>
  );
}
