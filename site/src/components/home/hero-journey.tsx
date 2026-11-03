"use client";

// Hero variant D, "Pinned journey". The whole hero section belongs to this file (hero.tsx returns
// <HeroJourney /> for variant D), because pinning needs control of the section's height.
//
// Copy on the left (HeroCopy: the page's only h1). On the right, a rail of three connected steps
// that follow the specimen ₹1,00,000 for 12 months: your rupees leave your bank → our fees →
// what comes back to you. All three numbers are computed live by lib/fees feeReceipt.
//
// Desktop (≥1024px wide and ≥760px tall), motion allowed: the section is 240svh tall and its inner
// wrapper is position:sticky just below the sticky header, so the hero holds still while the visitor
// scrolls ~140svh. Scroll progress through that pinned range draws the connecting line and passes
// the "active" state down the rail; then the pin releases and the page carries on.
// Phones, short screens, reduced motion and the server render: no pin, no transforms. The three
// steps are simply shown, connected by a fully drawn line, with the shared Reveal fades only.
//
// Sticky constraint: position:sticky stops working if ANY ancestor clips (overflow hidden/auto/
// clip). The other hero variants put overflow-hidden on the section to clip the backdrop; here the
// backdrop is clipped inside its own absolute wrapper instead, and nothing above the sticky element
// clips (the page's <main> and <body> don't either).
import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Check } from "lucide-react";
import { ArrowLink, Illustrative, Reveal, RevealGroup, RevealItem, ToConfirm } from "@/components/paraa/primitives";
import { HERO_AMOUNT as AMOUNT, HERO_MONTHS as MONTHS, feeReceipt } from "@/lib/fees";
import { formatINR, formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";
import { HeroBackdrop, HeroCopy } from "./hero-shared";

// Pin only where it is robust: a desktop-width screen tall enough for the whole rail (~760px).
// Same hydration-safe idea as useHydrated in paraa/tilt-3d: the server snapshot is false, React
// hydrates with false (identical markup and props), then re-renders with the real browser value.
const PIN_QUERY = "(min-width: 1024px) and (min-height: 760px)";
function subscribePin(onChange: () => void) {
  const mq = window.matchMedia(PIN_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const usePinnable = () =>
  useSyncExternalStore(subscribePin, () => window.matchMedia(PIN_QUERY).matches, () => false);

// Scroll map. p = progress through the pinned range: 0 when the section's top meets the header
// (64px), 1 when its bottom meets the viewport bottom, i.e. the moment the pin releases.
//
//   p:  0 ────── .20 ──── .38 ────── .62 ──── .80 ────── 1
//       step 1 holds │ 1 → 2 │ step 2 holds │ 2 → 3 │ step 3 holds
//
// Each step gets a "phase": −1 upcoming, 0 active, +1 completed. Holds are long and hand-overs short,
// so each card sits still and readable for most of its scroll, rather than being always mid-move.
const HANDOVER_1: [number, number] = [0.2, 0.38];
const HANDOVER_2: [number, number] = [0.62, 0.8];
const PHASES: { input: number[]; output: number[] }[] = [
  { input: HANDOVER_1, output: [0, 1] },
  { input: [...HANDOVER_1, ...HANDOVER_2], output: [-1, 0, 0, 1] },
  { input: HANDOVER_2, output: [-1, 0] },
];

export function HeroJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const pinned = usePinnable() && !reduce;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 64px", "end end"] });

  const r = feeReceipt(AMOUNT, MONTHS, 0);
  const fees = [
    { label: "Conversion in", rate: "0.50%", value: r.fxIn },
    { label: "Management fee", rate: "1.50% a yr", value: r.mgmt },
    { label: "Exit fee", rate: "1.00% under 12 mo", value: r.exit },
    { label: "Conversion out", rate: "0.50%", value: r.fxOut },
  ];

  return (
    <section ref={sectionRef} aria-labelledby="hero-title" className={cn("relative isolate border-b", pinned && "h-[240svh]")}>
      {/* The pinned frame: fills the viewport under the 64px scrolled header. No overflow here or above. */}
      <div
        data-hero-pin
        className={cn(
          "relative lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center",
          pinned && "sticky top-16 h-[calc(100svh-4rem)]",
        )}
      >
        {/* The backdrop is clipped by its own wrapper, so the sticky frame's ancestors stay un-clipped. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <HeroBackdrop />
        </div>

        <div className="container-page grid items-center gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-10">
          <Reveal className="max-w-[600px]">
            <HeroCopy />
          </Reveal>

          <div className="mx-auto w-full max-w-[520px] lg:mx-0 lg:justify-self-end">
            {/* h2 under the page h1, so the step h3s below never skip a level. */}
            <Reveal delay={1} className="flex items-center justify-between gap-3 pl-14">
              <h2 className="text-body-sm font-extrabold tracking-[0.1em] text-faint uppercase">
                Where {formatINR(AMOUNT)} goes in {MONTHS} months
              </h2>
              <Illustrative />
            </Reveal>

            <RevealGroup as="ol" className="mt-4 space-y-4">
              <Step index={0} progress={scrollYProgress} pinned={pinned} label="Leaves your bank">
                <StepHead title="Your rupees" amount={formatINR(AMOUNT)} />
                <p className="mt-1 text-body-md text-muted-foreground">Sent from a bank account in your own name.</p>
              </Step>

              <Step index={1} progress={scrollYProgress} pinned={pinned} label="Over 12 months">
                <StepHead
                  title="Our fees"
                  amount={formatINR(r.total)}
                  note={formatPct(r.costPct, { digits: 2, signed: false })}
                />
                <dl className="mt-3 border-t border-dashed border-border-strong">
                  {fees.map((f) => (
                    <div key={f.label} className="flex items-baseline justify-between gap-3 border-b border-dashed py-1.5">
                      <dt className="text-body-sm text-muted-foreground">
                        {f.label} <span className="text-faint">· {f.rate}</span>
                      </dt>
                      <dd className="text-body-sm font-semibold whitespace-nowrap text-foreground num">{formatINR(f.value)}</dd>
                    </div>
                  ))}
                </dl>
              </Step>

              <Step index={2} progress={scrollYProgress} pinned={pinned} label="After every fee" tone="ink">
                <StepHead title="Back to you" amount={formatINR(r.net)} tone="ink" />
                <p className="mt-1 text-body-md text-grey-300">Paid only into a bank account in your name.</p>
              </Step>
            </RevealGroup>

            <Reveal delay={2} className="mt-4 pl-14">
              <p className="text-body-sm text-faint">
                Rates <ToConfirm /> · performance fee not included · assumed return 0% · ₹88.00 per US$ held fixed. A
                weaker rupee raises your rupee value; a stronger one lowers it.
              </p>
              <ArrowLink href="#fees">Run it for your amount</ArrowLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepHead({ title, amount, note, tone = "card" }: { title: string; amount: string; note?: string; tone?: "card" | "ink" }) {
  const ink = tone === "ink";
  return (
    <div className="mt-1 flex items-baseline justify-between gap-4">
      <h3 className={cn("type-h5", ink ? "text-primary-foreground" : "text-foreground")}>{title}</h3>
      <p className={cn("type-h4 whitespace-nowrap num", ink ? "text-primary-foreground" : "text-foreground")}>
        {amount}
        {note && <span className="ml-1.5 text-body-sm font-medium text-faint">({note})</span>}
      </p>
    </div>
  );
}

/**
 * One step on the rail: a node + the line down to the next node, and the card.
 * Pinned, the card's 3D pose follows its phase (−1 upcoming, 0 active, +1 completed):
 *   upcoming   tilted back (rotateX 10°, top edge away), pushed away (z −40px), 75% opacity
 *   active     flat, brought forward (z +24px), full opacity, gold border + lifted shadow
 *   completed  flat, settled back (z −24px), 88%, check node
 * Upcoming steps stay at 75% (never hidden), so every step reads at any scroll position.
 * Not pinned: none of these styles are applied: full opacity, no transform, line fully drawn.
 */
function Step({
  index,
  progress,
  pinned,
  label,
  tone = "card",
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  pinned: boolean;
  label: string;
  tone?: "card" | "ink";
  children: ReactNode;
}) {
  const { input, output } = PHASES[index];
  const phase = useTransform(progress, input, output);
  const rotateX = useTransform(phase, [-1, 0, 1], [10, 0, 0]);
  const z = useTransform(phase, [-1, 0, 1], [-40, 24, -24]);
  const opacity = useTransform(phase, [-1, 0, 1], [0.75, 1, 0.88]);
  // Node layers cross-fade: upcoming number → gold active number → completed check.
  const upcoming = useTransform(phase, [-1, 0], [1, 0]);
  const focus = useTransform(phase, [-1, 0, 1], [0, 1, 0]);
  const done = useTransform(phase, [0, 1], [0, 1]);
  // The line below this node fills during the hand-over to the next step (scaleY from the top).
  const next = PHASES[index + 1];
  const fill = useTransform(progress, next ? next.input.slice(0, 2) : [0, 1], [0, 1]);

  const ink = tone === "ink";
  const n = index + 1;
  const isLast = !next;

  return (
    <RevealItem as="li" className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4">
      {/* Rail column: decorative; the <ol> already tells assistive tech the order. */}
      <div aria-hidden className="flex flex-col items-center">
        <span className="relative mt-4 grid size-10 shrink-0 place-items-center rounded-full border-2 border-secondary bg-card text-body-md font-bold text-foreground num">
          {n}
          <motion.span
            className="absolute -inset-0.5 grid place-items-center rounded-full border-2 border-border-strong bg-card text-faint"
            style={{ opacity: pinned ? upcoming : 0 }}
          >
            {n}
          </motion.span>
          <motion.span
            className="absolute -inset-0.5 grid place-items-center rounded-full border-2 border-secondary bg-secondary text-secondary-foreground ring-4 ring-gold-100"
            style={{ opacity: pinned ? focus : 0 }}
          >
            {n}
          </motion.span>
          <motion.span
            className="absolute -inset-0.5 grid place-items-center rounded-full border-2 border-secondary bg-gold-50"
            style={{ opacity: pinned ? done : 0 }}
          >
            <Check className="size-5 text-accent" strokeWidth={2.5} />
          </motion.span>
        </span>
        {/* Track to the next node. -mb-8 crosses the 16px list gap + the next node's 16px top margin. */}
        {!isLast && (
          <span className="relative -mb-8 w-0.5 flex-1 bg-border-strong">
            <motion.span className="absolute inset-0 origin-top bg-secondary" style={pinned ? { scaleY: fill } : undefined} />
          </span>
        )}
      </div>

      {/* Perspective sits on the card's own parent, so the 3D pose never depends on the list's styles. */}
      <div className="[perspective:1200px]">
        <motion.div
          data-step-card
          className={cn(
            "relative rounded-lg border p-5 shadow-card will-change-transform",
            ink ? "border-ink bg-ink text-primary-foreground" : "bg-card",
          )}
          style={pinned ? { rotateX, z, opacity, transformOrigin: "50% 0%" } : undefined}
        >
          {/* Active emphasis, faded in by phase: gold edge + lifted shadow. */}
          <motion.span
            aria-hidden
            className={cn("pointer-events-none absolute -inset-px rounded-lg border shadow-lift", ink ? "border-ink" : "border-gold-300")}
            style={{ opacity: pinned ? focus : 0 }}
          />
          <div className="relative">
            <p className={cn("text-body-sm font-extrabold tracking-[0.1em] uppercase", ink ? "text-grey-300" : "text-faint")}>
              Step {n} · {label}
            </p>
            {children}
          </div>
        </motion.div>
      </div>
    </RevealItem>
  );
}
