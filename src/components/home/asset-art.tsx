"use client";

// Hand-drawn art for the three basket tiles: a city of towers for US companies, a stack of ingots
// for gold, rolling waves for crude oil. Decorative only (aria-hidden), and deliberately not
// charts: nothing here may read as the basket's performance. Colours are design-file tokens.
//
// The towers rise and the ingots stack once, only when half of the drawing is on screen, so it plays
// in front of you and not while you're still scrolling towards it. With reduced motion, Motion drops
// the movement and the drawing just fades in.
import { motion, type Variants } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;
const ON_ARRIVAL = { initial: "hidden", whileInView: "shown", viewport: { once: true, amount: 0.5 } } as const;
const stagger = (gap: number): Variants => ({ shown: { transition: { staggerChildren: gap, delayChildren: 0.1 } } });

const tower: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  shown: { scaleY: 1, opacity: 1, transition: { duration: 0.8, ease: EASE } },
};
const ingot: Variants = {
  hidden: { y: -70, opacity: 0 },
  shown: { y: 0, opacity: 1, transition: { duration: 0.65, ease: EASE } },
};

// x, width, height: an uneven skyline, not a rising line, so it can't be mistaken for returns.
const TOWERS = [
  [0, 44, 96], [48, 36, 150], [88, 52, 112], [144, 40, 186], [188, 60, 130],
  [252, 38, 170], [294, 50, 104], [348, 42, 142], [394, 46, 88],
] as const;

export function SkylineArt({ className }: { className?: string }) {
  return (
    <motion.svg aria-hidden viewBox="0 0 440 190" preserveAspectRatio="xMidYMax meet" className={className} variants={stagger(0.07)} {...ON_ARRIVAL}>
      <defs>
        <pattern id="tower-windows" width="12" height="14" patternUnits="userSpaceOnUse">
          <rect x="3" y="3" width="5" height="7" rx="1" fill="var(--color-gold-500)" fillOpacity="0.55" />
        </pattern>
      </defs>
      {TOWERS.map(([x, w, h], i) => (
        <motion.g key={x} variants={tower} style={{ transformBox: "fill-box", transformOrigin: "bottom" }}>
          <rect x={x} y={190 - h} width={w} height={h} rx="4" fill={i % 2 ? "var(--color-ink-3)" : "var(--color-ink-2)"} />
          <rect x={x} y={190 - h} width={w} height={h} rx="4" fill="url(#tower-windows)" />
        </motion.g>
      ))}
    </motion.svg>
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

const INGOTS = [[0, 92], [104, 92], [52, 58]] as const;

export function IngotArt({ className }: { className?: string }) {
  return (
    <motion.svg aria-hidden viewBox="0 0 208 152" className={className} variants={stagger(0.16)} {...ON_ARRIVAL}>
      {INGOTS.map(([x, y]) => (
        <motion.g key={`${x}-${y}`} variants={ingot}>
          <Ingot x={x} y={y} />
        </motion.g>
      ))}
    </motion.svg>
  );
}

// One wave, repeated across the width.
function wave(y: number, amp: number) {
  let d = `M0 ${y}`;
  for (let i = 0; i < 8; i++) d += ` q100 ${i % 2 ? amp : -amp} 200 0`;
  return `${d} V200 H0 Z`;
}

/** Still waves. White, so they lift the dark text's contrast. */
export function WaveArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 800 200" preserveAspectRatio="none" className={className}>
      {[
        { y: 70, amp: 26, opacity: 0.1 },
        { y: 110, amp: 20, opacity: 0.14 },
        { y: 150, amp: 16, opacity: 0.18 },
      ].map((w) => (
        <path key={w.y} d={wave(w.y, w.amp)} fill="#FFFFFF" fillOpacity={w.opacity} />
      ))}
    </svg>
  );
}
