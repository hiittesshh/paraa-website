"use client";

// Hero variant B: the "exploded receipt".
// The specimen fee receipt is split into its three parts: what you put in, what we take, and
// what you get back. At the top of the page the parts float apart in 3D (an isometric tilt,
// each part at its own depth), joined by dashed connectors and numbered 1 → 2 → 3, so the
// story reads before you read a single number. As you scroll the hero away they glide together
// into one flat receipt card. Scroll-linked, never time-based: it moves exactly as fast as you
// scroll, and stops when you stop. No pointer effects (removed at the user's request).
//
// Hydration + reduced motion follow paraa/tilt-3d: the server can't know the visitor's motion
// preference, so server and first client render are the flat, assembled receipt with no
// transforms; the 3D switches on after hydration, and never for prefers-reduced-motion.
//
// 3D rules (same as tilt-3d): every element between the rotated group and a translated part
// keeps transform-style: preserve-3d, and nothing in that chain uses overflow:hidden (both
// flatten the depth into a plain 2D rotation).
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  easeInOut,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowLink, Illustrative, ToConfirm } from "@/components/paraa/primitives";
import { HERO_AMOUNT as AMOUNT, HERO_MONTHS as MONTHS, feeReceipt } from "@/lib/fees";
import { formatINR, formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";

// true only after hydration (useSyncExternalStore: React uses the server value while hydrating,
// then re-renders with the client value, so the markup always matches).
const noop = () => () => {};
const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);

// Two-column hero (lg) gets the full depth; phones and tablets get a shallower, tighter version
// so the tilted group can't push past the 16px page gutter.
const WIDE = "(min-width: 64rem)";
const subscribeWide = (cb: () => void) => {
  const m = window.matchMedia(WIDE);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const useWide = () => useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE).matches, () => false);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** One derived motion value from the shared (spread, size) pair. Keeps the mapping table below readable. */
function useMix(spread: MotionValue<number>, size: MotionValue<number>, fn: (s: number, wide: boolean) => number) {
  return useTransform([spread, size], ([s, w]: number[]) => fn(s, w === 1));
}

// Depth of each part when fully exploded (px, toward the viewer). "You'd receive" floats
// furthest forward: it is the number a visitor actually cares about.
const DEPTH = { invest: 28, fees: 0, receive: 44 } as const;

export function HeroExploded() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const active = useHydrated() && !reduce;
  const wide = useWide();

  const r = feeReceipt(AMOUNT, MONTHS, 0);

  // ---- Scroll mapping ---------------------------------------------------------------------
  // progress 0 → 1 while the group's top edge travels from 15% down the viewport to 30% above
  // it (0.45 of a viewport of scrolling). On desktop the group starts below the 15% line, so it
  // rests fully exploded at scroll 0 and is fully assembled by ~470px of scroll (1440 × 900), while the
  // card is still on screen. On phones the visual sits below the copy, so it stays exploded
  // while it scrolls into view and assembles once it reaches the top of the screen.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.15", "start -0.3"] });
  // spread: 1 = fully exploded, 0 = assembled. easeInOut reshapes the curve (soft start, soft
  // landing) but it is still a pure function of scroll position, so it is never time-based.
  const spread = useTransform(scrollYProgress, (p) => 1 - easeInOut(clamp01(p)));

  // size: 1 on the wide hero, 0 on narrow screens. A motion value (not state) so changing the
  // breakpoint re-maps every transform without re-rendering the component.
  const size = useMotionValue(0);
  useEffect(() => size.set(wide ? 1 : 0), [wide, size]);

  // Group: an isometric tilt that flattens to 0 as the parts assemble.
  const rotateX = useMix(spread, size, (s, w) => s * (w ? 26 : 16));
  const rotateZ = useMix(spread, size, (s, w) => s * (w ? -9 : -5));
  // Slightly smaller while exploded, so the opened-up group stays inside ~440 × 520.
  const scale = useMix(spread, size, (s, w) => 1 - s * (w ? 0.12 : 0.12));

  // Gap between neighbouring parts, and how much of each part's depth is applied.
  const gap = useMix(spread, size, (s, w) => s * (w ? 40 : 26));
  const depth = useMix(spread, size, (s, w) => s * (w ? 1 : 0.5));
  const zInvest = useTransform(depth, (d) => d * DEPTH.invest);
  const zFees = useTransform(depth, (d) => d * DEPTH.fees);
  const zReceive = useTransform(depth, (d) => d * DEPTH.receive);
  // Part 1 rises by one gap and part 3 drops, so both gaps open around the fees. Part 3 drops
  // further because its forward depth, seen through the tilt, lifts it back up on screen.
  const yInvest = useTransform(gap, (g) => -g);
  const yReceive = useTransform(gap, (g) => g * 1.5);

  // Inner corners round off while exploded (each part reads as its own card) and square up in
  // the last half of the assembly, so the finished receipt has one clean outline.
  const innerRadius = useTransform(spread, (s) => 16 * clamp01(s * 2));
  // Labels go first, connectors last: the labels name the parts, the connectors show the joins.
  const labelOpacity = useTransform(spread, (s) => clamp01((s - 0.35) / 0.4));
  const linkOpacity = useTransform(spread, (s) => clamp01((s - 0.2) / 0.3));

  const lines: { label: string; rate: string; value: ReactNode }[] = [
    { label: "Conversion in", rate: "0.50%", value: formatINR(r.fxIn) },
    { label: "Entry fee", rate: "0.00%", value: formatINR(r.entry) },
    { label: "Management", rate: "1.50% a yr", value: formatINR(r.mgmt) },
    { label: "Performance", rate: "not incl.", value: <ToConfirm /> },
    { label: "Exit fee", rate: "1.00% < 12 mo", value: formatINR(r.exit) },
    { label: "Conversion out", rate: "0.50%", value: formatINR(r.fxOut) },
  ];

  const p3d = { transformStyle: "preserve-3d" } as const;

  return (
    <figure aria-labelledby="hero-exploded-title" className="mx-auto w-full max-w-[372px] lg:mx-0">
      {/* Room above and below for the parts to drift into; the 3D lives inside this box. */}
      <div ref={ref} className="pt-8 [perspective:1600px] lg:pt-10">
        <motion.div
          style={active ? { ...p3d, rotateX, rotateZ, scale } : p3d}
          className={cn("relative", active && "will-change-transform")}
        >
          {/* 1 · You invest */}
          <motion.div
            style={active ? { ...p3d, y: yInvest, z: zInvest, borderBottomLeftRadius: innerRadius, borderBottomRightRadius: innerRadius } : undefined}
            className="relative rounded-t-xl border bg-card px-5 pt-4 pb-3.5 shadow-card"
          >
            <PartLabel n={1} active={active} opacity={labelOpacity}>Your money</PartLabel>
            <div className="flex items-center justify-between gap-3">
              <p id="hero-exploded-title" className="text-body-sm font-extrabold tracking-[0.1em] text-faint uppercase">
                Specimen fee receipt
              </p>
              <Illustrative />
            </div>
            <p className="mt-2 text-body-sm font-bold text-muted-foreground">You invest</p>
            <p className="type-h4 text-foreground num">{formatINR(AMOUNT)}</p>
            <p className="text-body-sm text-muted-foreground">for {MONTHS} months · assumed return 0%</p>
          </motion.div>

          {/* 2 · Our fees. -mt-px overlaps the borders so the assembled seam is a single line. */}
          <motion.div
            style={
              active
                ? { ...p3d, z: zFees, borderRadius: innerRadius }
                : undefined
            }
            className="relative -mt-px border bg-card px-5 shadow-card"
          >
            <PartLabel n={2} active={active} opacity={labelOpacity}>Our fees</PartLabel>
            <Connector active={active} gap={gap} depth={depth} dz={DEPTH.invest - DEPTH.fees} opacity={linkOpacity} />
            <p className="pt-2.5 text-body-sm font-bold text-muted-foreground">Our fees, itemised</p>
            <dl>
              {lines.map((l) => (
                <div key={l.label} className="flex items-baseline justify-between gap-3 border-b border-dashed border-border py-1">
                  <dt className="text-body-md text-muted-foreground">
                    {l.label} <span className="text-body-sm text-faint">· {l.rate}</span>
                  </dt>
                  <dd className="text-right text-body-md font-semibold whitespace-nowrap text-foreground num">{l.value}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-3 py-2.5">
                <dt className="text-body-md font-bold text-foreground">Total fees</dt>
                <dd className="text-right whitespace-nowrap text-body-md num">
                  <span className="font-bold text-foreground">{formatINR(r.total)}</span>{" "}
                  <span className="text-body-sm text-faint">({formatPct(r.costPct, { digits: 2, signed: false })})</span>
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* 3 · You'd receive: the dark panel, the bottom of the assembled receipt. */}
          <motion.div
            style={active ? { ...p3d, y: yReceive, z: zReceive, borderTopLeftRadius: innerRadius, borderTopRightRadius: innerRadius } : undefined}
            className="relative -mt-px flex items-center justify-between gap-4 rounded-b-xl border border-ink bg-ink px-5 py-3.5 text-primary-foreground shadow-lift"
          >
            <PartLabel n={3} active={active} opacity={labelOpacity}>What you get</PartLabel>
            <Connector active={active} gap={gap} depth={depth} dz={DEPTH.fees - DEPTH.receive} rise={1.5} opacity={linkOpacity} />
            <p className="text-body-md font-bold">
              You&rsquo;d receive
              <span className="block text-body-sm font-medium text-grey-300">after every fee</span>
            </p>
            <p className="type-h4 num">{formatINR(r.net)}</p>
          </motion.div>
        </motion.div>
      </div>

      <figcaption className="mt-6 px-1 lg:mt-10">
        <p className="text-body-sm text-faint">
          Rates <ToConfirm /> · ₹88.00 per US$ held fixed. A weaker rupee raises your rupee value; a stronger one lowers it.
        </p>
        <ArrowLink href="#fees">Run it for your amount</ArrowLink>
      </figcaption>
    </figure>
  );
}

/** Numbered tag that sits in the gap above a part while the receipt is exploded. Decorative: the
 *  parts already say "You invest" / "Our fees" / "You'd receive" in their own text. */
function PartLabel({ n, active, opacity, children }: { n: number; active: boolean; opacity: MotionValue<number>; children: ReactNode }) {
  return (
    <motion.span
      aria-hidden
      // translateZ lifts the tag a little off its part, so it reads as a floating label.
      style={active ? { opacity, z: 18 } : undefined}
      className={cn(
        "absolute bottom-full left-3 mb-1.5 items-center gap-1.5 rounded-full border bg-card py-0.5 pr-2.5 pl-0.5 text-body-sm font-bold whitespace-nowrap text-foreground shadow-card",
        active ? "inline-flex" : "hidden",
      )}
    >
      <span className="grid size-5 place-items-center rounded-full bg-ink text-body-xs font-extrabold text-primary-foreground num">{n}</span>
      {children}
    </motion.span>
  );
}

/**
 * Dashed connector bridging the gap from the top edge of this part up to the bottom edge of the
 * part above. The two parts sit at different depths, so the bridge is a real 3D segment: it
 * starts at this part's top edge, climbs `gap × rise` px and leans `dz` px toward the viewer
 * (rotateX = −atan2(dz, climb), length = hypot(climb, dz)), landing exactly on the part above.
 * Both shrink to 0 as the receipt assembles, and the connector fades out just before.
 */
function Connector({
  active,
  gap,
  depth,
  dz,
  rise = 1,
  opacity,
}: {
  active: boolean;
  gap: MotionValue<number>;
  depth: MotionValue<number>;
  dz: number;
  /** How many gaps apart the two parts are vertically (part 3 drops 1.5 gaps). */
  rise?: number;
  opacity: MotionValue<number>;
}) {
  const height = useTransform([gap, depth], ([g, d]: number[]) => Math.hypot(g * rise, dz * d));
  const rotateX = useTransform([gap, depth], ([g, d]: number[]) => (-Math.atan2(dz * d, g * rise) * 180) / Math.PI);
  if (!active) return null;
  return (
    <motion.span
      aria-hidden
      style={{ height, rotateX, opacity, transformOrigin: "50% 100%" }}
      className="absolute right-10 bottom-full flex w-2 flex-col items-center justify-between"
    >
      <span className="size-2 shrink-0 rounded-full bg-secondary ring-2 ring-card" />
      <span className="w-0 flex-1 border-l border-dashed border-grey-400" />
      <span className="size-2 shrink-0 rounded-full bg-secondary ring-2 ring-card" />
    </motion.span>
  );
}
