"use client";

// Hand-drawn art for the three basket tiles: a city of towers for US companies, a stack of ingots
// for gold, rolling waves for crude oil. Decorative only (aria-hidden), and deliberately not
// charts: nothing here may read as the basket's performance. Colours are design-file tokens.
import { motion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;
const ONCE = { once: true, margin: "0px 0px -10% 0px" } as const;

// x, width, height: an uneven skyline, not a rising line, so it can't be mistaken for returns.
const TOWERS = [
  [0, 44, 96], [48, 36, 150], [88, 52, 112], [144, 40, 186], [188, 60, 130],
  [252, 38, 170], [294, 50, 104], [348, 42, 142], [394, 46, 88],
] as const;

export function SkylineArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 440 190" preserveAspectRatio="xMidYMax meet" className={className}>
      <defs>
        <pattern id="tower-windows" width="12" height="14" patternUnits="userSpaceOnUse">
          <rect x="3" y="3" width="5" height="7" rx="1" fill="var(--color-gold-500)" fillOpacity="0.55" />
        </pattern>
      </defs>
      {TOWERS.map(([x, w, h], i) => (
        <motion.g
          key={x}
          style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
          initial={{ scaleY: 0.2, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={ONCE}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
        >
          <rect x={x} y={190 - h} width={w} height={h} rx="4" fill={i % 2 ? "var(--color-ink-3)" : "var(--color-ink-2)"} />
          <rect x={x} y={190 - h} width={w} height={h} rx="4" fill="url(#tower-windows)" />
        </motion.g>
      ))}
    </svg>
  );
}

function Ingot({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon points="0,18 56,0 104,16 48,34" fill="var(--color-gold-200)" />
      <polygon points="0,18 48,34 48,60 0,44" fill="var(--color-gold-700)" />
      <polygon points="48,34 104,16 104,42 48,60" fill="var(--color-gold-800)" />
    </g>
  );
}

// Bottom row first, so the stack builds upward.
const INGOTS = [[0, 92], [104, 92], [52, 58]] as const;

export function IngotArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 208 152" className={className}>
      {INGOTS.map(([x, y], i) => (
        <motion.g
          key={`${x}-${y}`}
          initial={{ y: -28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={ONCE}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.12 }}
        >
          <Ingot x={x} y={y} />
        </motion.g>
      ))}
    </svg>
  );
}

// One wave, repeated: the path is two identical halves, so sliding it by 50% loops seamlessly.
function wave(y: number, amp: number) {
  let d = `M0 ${y}`;
  for (let i = 0; i < 8; i++) d += ` q100 ${i % 2 ? amp : -amp} 200 0`;
  return `${d} V200 H0 Z`;
}

/** Waves roll only while you point at the tile. White, so they lift the dark text's contrast. */
export function WaveArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 800 200" preserveAspectRatio="none" className={className}>
      {[
        { y: 70, amp: 26, opacity: 0.1, secs: "14s" },
        { y: 110, amp: 20, opacity: 0.14, secs: "10s" },
        { y: 150, amp: 16, opacity: 0.18, secs: "7s" },
      ].map((w) => (
        <path
          key={w.y}
          d={wave(w.y, w.amp)}
          fill="var(--primary-foreground)"
          fillOpacity={w.opacity}
          style={{ animationDuration: w.secs }}
          className="animate-[slide-half_10s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running] motion-reduce:animate-none"
        />
      ))}
    </svg>
  );
}

/** The basket's three shares as a ring: for "plans with you". Sweeps round once. */
export function PlanArt({ className }: { className?: string }) {
  const slices = [
    { share: 0.5, start: 0, stroke: "var(--color-gold-500)" },
    { share: 0.3, start: 0.5, stroke: "var(--color-grey-300)" },
    { share: 0.2, start: 0.8, stroke: "var(--color-ink-4)" },
  ];
  return (
    <svg aria-hidden viewBox="0 0 160 160" className={className}>
      {slices.map((s, i) => (
        <motion.circle
          key={s.start}
          cx="80"
          cy="80"
          r="56"
          fill="none"
          stroke={s.stroke}
          strokeWidth="26"
          transform={`rotate(${s.start * 360 - 90} 80 80)`}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: s.share - 0.012 }}
          viewport={ONCE}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.15 }}
        />
      ))}
    </svg>
  );
}

/** Two chat bubbles: for "answers your questions". */
export function ChatArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 160" className={className}>
      <motion.g initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={ONCE} transition={{ duration: 0.5, ease: EASE }}>
        <path d="M12 12h120a12 12 0 0 1 12 12v44a12 12 0 0 1-12 12H52l-24 22V80H12A12 12 0 0 1 0 68V24a12 12 0 0 1 12-12Z" fill="var(--color-ink)" />
        <rect x="20" y="32" width="96" height="8" rx="4" fill="var(--color-gold-500)" />
        <rect x="20" y="50" width="64" height="8" rx="4" fill="var(--color-grey-400)" />
      </motion.g>
      <motion.g initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={ONCE} transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}>
        <path d="M76 72h112a12 12 0 0 1 12 12v36a12 12 0 0 1-12 12h-12v22l-24-22H76a12 12 0 0 1-12-12V84a12 12 0 0 1 12-12Z" fill="var(--color-card)" />
        <rect x="84" y="92" width="96" height="8" rx="4" fill="var(--color-ink)" />
        <rect x="84" y="108" width="56" height="8" rx="4" fill="var(--color-grey-400)" />
      </motion.g>
    </svg>
  );
}

/** A filed return with a tick stamped on it: for "files your tax". */
export function FileArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 160 160" className={className}>
      <rect x="34" y="18" width="92" height="124" rx="10" fill="var(--color-ink-3)" transform="rotate(-7 80 80)" />
      <rect x="34" y="18" width="92" height="124" rx="10" fill="var(--color-card)" />
      {[38, 54, 70, 86].map((y, i) => (
        <rect key={y} x="48" y={y} width={i === 3 ? 36 : 64} height="7" rx="3.5" fill={i === 0 ? "var(--color-ink)" : "var(--color-grey-300)"} />
      ))}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 1.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={ONCE}
        transition={{ duration: 0.35, ease: EASE, delay: 0.3 }}
      >
        <circle cx="110" cy="116" r="24" fill="var(--color-gold-500)" />
        <path d="m99 116 8 8 15-16" fill="none" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

/** A stack of rupee coins, the top one dropping into place: for "invest in rupees". */
export function RupeeCoinArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 170" className={className}>
      {[128, 106, 84].map((y, i) => (
        <motion.g
          key={y}
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={ONCE}
          transition={{ duration: 0.45, ease: EASE, delay: i * 0.1 }}
        >
          <ellipse cx="100" cy={y + 12} rx="72" ry="24" fill="var(--color-gold-800)" />
          <rect x="28" y={y - 6} width="144" height="18" fill="var(--color-gold-700)" />
          <ellipse cx="100" cy={y - 6} rx="72" ry="24" fill="var(--color-gold-500)" />
        </motion.g>
      ))}
      <motion.text
        x="100"
        y="89"
        textAnchor="middle"
        fontSize="30"
        fontWeight="800"
        fill="var(--color-ink)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={ONCE}
        transition={{ duration: 0.3, delay: 0.35 }}
      >
        ₹
      </motion.text>
    </svg>
  );
}

/** A receipt whose tax line reads ₹0: for "no tax when you invest". */
export function ZeroTaxArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 170" className={className}>
      <path
        d="M44 10h112a8 8 0 0 1 8 8v142l-15-10-15 10-15-10-15 10-14-10-14 10-15-10-15 10-15-10-3 2V18a8 8 0 0 1 8-8Z"
        fill="var(--color-card)"
      />
      <rect x="58" y="30" width="84" height="8" rx="4" fill="var(--color-ink)" />
      <rect x="58" y="48" width="56" height="7" rx="3.5" fill="var(--color-grey-300)" />
      <motion.text
        x="100"
        y="118"
        textAnchor="middle"
        fontSize="46"
        fontWeight="800"
        fill="var(--color-ink)"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 1.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={ONCE}
        transition={{ duration: 0.35, ease: EASE, delay: 0.25 }}
      >
        ₹0
      </motion.text>
    </svg>
  );
}

/**
 * A plain registration card with a tick: for "Registered with FIU-IND". Deliberately generic: no
 * government emblem, seal or logo, which would suggest endorsement.
 */
export function RegistrationArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 170" className={className}>
      <rect x="20" y="30" width="160" height="110" rx="12" fill="var(--color-card)" />
      <rect x="20" y="30" width="160" height="26" rx="12" fill="var(--color-ink)" />
      <rect x="20" y="44" width="160" height="12" fill="var(--color-ink)" />
      {[72, 90, 108].map((y, i) => (
        <rect key={y} x="36" y={y} width={i === 2 ? 44 : 72} height="8" rx="4" fill={i === 0 ? "var(--color-ink)" : "var(--color-grey-300)"} />
      ))}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 1.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={ONCE}
        transition={{ duration: 0.35, ease: EASE, delay: 0.25 }}
      >
        <circle cx="146" cy="98" r="20" fill="var(--color-gold-500)" />
        <path d="m137 98 7 7 12-13" fill="none" stroke="var(--color-ink)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}
