"use client";

// The hero: the international basket told as three connected cards, one per part (US stocks,
// gold, crude oil). The cards rest as a closed 3D deck, tilted back, the first card in front and
// the other two peeking out behind it: the basket, shut. As you scroll it opens: the cards fan out
// into a connected zig-zag (a straight column on phones) and dotted connectors fade in between.
// (Chosen 2026-11-03 as hero variant C; the specimen-receipt content was replaced in round 3.)
//
// The whole hero section lives here because
// the fan plays while the hero is PINNED: the section is taller than the screen and an inner frame
// is position:sticky, so scrolling plays the fan instead of moving the page, then the page carries
// on. It is a CSS sticky pin, not wheel interception: keyboard, trackpad momentum, scrollbars and
// screen readers all keep working, and nothing calls preventDefault.
//
// How it is built, and why:
// - The *fanned* layout is the normal CSS layout. The deck is a transform that pulls every card
//   onto one spot. So with no transform at all (server render, reduced motion) the visitor sees
//   the final fanned, connected layout, flat and fully readable, with the cards in reading order.
// - Scroll-linked (useScroll + useTransform), never time-based: it moves exactly as fast as you
//   scroll, and stops when you stop. No pointer effects (removed at the user's request).
// - 3D: perspective on the stage, preserve-3d on the deck, translateZ on the cards. Nothing in
//   that chain may use overflow:hidden, which would flatten the 3D (same rule as paraa/tilt-3d).
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowLink, Reveal } from "@/components/paraa/primitives";
import { SLEEVES, type Sleeve } from "@/lib/basket";
import { formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";
import { HeroBackdrop, HeroCopy } from "./hero-shared";
import { SLEEVE_INFO } from "./sleeve-info";

// true only after hydration (same pattern as paraa/tilt-3d). The server can't know the visitor's
// motion preference or screen, so it renders the flat fanned layout; the deck switches on in the
// browser. React renders the server value during hydration, so the markup always matches.
const noop = () => () => {};
const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);

/** Card positions as laid out by CSS (transforms don't affect offsetLeft/Top), measured on resize. */
interface Layout {
  ready: boolean;
  /** true when the hero is two columns (lg+): the whole hero pins, so progress follows the section. */
  wide: boolean;
  /** true when the cards sit in one column (phones): the fan is a straight vertical column. */
  column: boolean;
  deckW: number;
  deckH: number;
  cards: { left: number; top: number; w: number; h: number }[];
}
const EMPTY: Layout = { ready: false, wide: false, column: false, deckW: 0, deckH: 0, cards: [] };

// Deck tuning. PEEK: how far each card behind sits above the one in front; DEPTH: how far back.
const PEEK = 38;
const DEPTH = 44;
// Each card starts moving a little after the one before it, so the fan unfolds as a cascade.
const STAGGER = 0.12;
const SPAN = 1 - 2 * STAGGER;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const ease = (t: number) => t * t * (3 - 2 * t); // smoothstep: soft start, soft landing
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Where card i sits at fan progress p (0 = deck, 1 = fanned). Returns translate/rotate values that
 * are *added* to the card's CSS position, so at p = 1 they are small (just the fan's turn).
 */
function pose(i: number, p: number, l: Layout) {
  const c = l.cards[i];
  if (!l.ready || !c) return { x: 0, y: 0, z: 0, rz: 0, ry: 0 };
  const t = ease(clamp01((p - i * STAGGER) / SPAN));

  // Deck: every card centred on the middle of the stage (it is pinned, so the middle is always on
  // screen), each one further back and a little higher, so its top edge peeks out above the one in front.
  const anchorX = (l.deckW - c.w) / 2;
  const anchorY = (l.deckH - c.h) / 2;
  const deck = { x: anchorX - c.left, y: anchorY - c.top - i * PEEK, z: -i * DEPTH, rz: [0, 2.5, -2.5][i], ry: 0 };

  // Fan: the CSS position, each card turned slightly, like cards wrapped round a cylinder: the
  // outer edges turn away from you, so the fan never grows past the column.
  // The middle card comes forward a touch so it overlaps its neighbours' (empty) corners.
  const fan = l.column
    ? { x: 0, y: 0, z: [0, 12, 0][i], rz: [-0.8, 0.8, -0.8][i], ry: 0 }
    : { x: 0, y: 0, z: [0, 20, 0][i], rz: [-1.5, 1.2, -1.2][i], ry: [-6, 6, -6][i] };

  return {
    x: mix(deck.x, fan.x, t),
    y: mix(deck.y, fan.y, t),
    z: mix(deck.z, fan.z, t),
    rz: mix(deck.rz, fan.rz, t),
    ry: mix(deck.ry, fan.ry, t),
  };
}

// The fan is complete at 85% of the pinned range; the last 15% holds it still before the pin lets go.
const FAN_END = 0.85;

/**
 * The pinned hero section. Two pin shapes, both plain CSS (so server and client markup match):
 * - lg+ (two columns): the section is 190svh tall and the frame holding copy + deck is sticky just
 *   below the 64px header, so the whole hero holds still for ~90svh of scrolling.
 * - Below lg (one column): copy + deck can't fit one phone screen, so the copy scrolls by as normal
 *   and only the deck pins: a "track" (pinned height + 90svh) whose child is sticky below the
 *   header (56px on phones, 64px from md). The pinned deck fills the rest of the screen.
 * Reduced motion: every motion-reduce: variant below turns the pin off (normal heights, static;
 * the md:/lg: heights need their own motion-reduce:md:/lg: twin, or the breakpoint class wins),
 * and the deck shows its flat fanned layout.
 * Sticky rule: no ancestor of a sticky element may clip (overflow hidden/auto), or sticky silently
 * stops working. So the section has no overflow-hidden; the backdrop is clipped in its own wrapper.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // 0 when the pin starts (top of the section/track meets the header's bottom edge), 1 when it
  // releases (bottom meets the bottom of the viewport).
  const { scrollYProgress: wide } = useScroll({ target: sectionRef, offset: ["start 64px", "end end"] });
  const { scrollYProgress: narrow } = useScroll({ target: trackRef, offset: ["start 64px", "end end"] });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate border-b lg:h-[190svh] motion-reduce:lg:h-auto"
    >
      <div className="relative lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] motion-reduce:lg:static motion-reduce:lg:h-auto">
        {/* Clips the glow + vignette without clipping any ancestor of the sticky elements. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <HeroBackdrop />
        </div>
        <div className="container-page grid items-center gap-12 py-12 md:py-16 lg:h-full lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-8 motion-reduce:lg:min-h-[min(760px,calc(100svh-140px))] motion-reduce:lg:py-14">
          <Reveal className="max-w-[600px]">
            <HeroCopy />
          </Reveal>
          <div
            ref={trackRef}
            className="h-[calc(190svh-3.5rem)] w-full md:h-[calc(190svh-4rem)] lg:h-auto lg:justify-self-end motion-reduce:h-auto motion-reduce:md:h-auto"
          >
            <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] items-center md:top-16 md:h-[calc(100svh-4rem)] lg:static lg:h-auto motion-reduce:static motion-reduce:h-auto motion-reduce:md:h-auto">
              <Reveal delay={1} className="w-full">
                <HeroDeck wide={wide} narrow={narrow} />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroDeck({ wide, narrow }: { wide: MotionValue<number>; narrow: MotionValue<number> }) {
  const deckRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const active = useHydrated() && !reduce;
  const layout = useMotionValue<Layout>(EMPTY);

  // Measure the CSS (fanned) layout once mounted and whenever the deck resizes.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const measure = () => {
      const cards = [...deck.children].map((el) => {
        const e = el as HTMLElement;
        return { left: e.offsetLeft, top: e.offsetTop, w: e.offsetWidth, h: e.offsetHeight };
      });
      layout.set({
        ready: cards.length === 3,
        wide: window.matchMedia("(min-width: 1024px)").matches,
        column: cards.length > 0 && cards[0].w > deck.offsetWidth * 0.9,
        deckW: deck.offsetWidth,
        deckH: deck.offsetHeight,
        cards,
      });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(deck);
    return () => ro.disconnect();
  }, [layout]);

  // The scroll mapping, as one 0 → 1 "fan progress": take the pinned range that applies at this
  // width (whole section on lg+, the deck's track below lg), and stretch its first 85% to 0 → 1, so
  // the deck is stacked when the pin starts, fully fanned at 85%, then holds still until release.
  // Function form: Motion subscribes to every .get() made on the first run, so read both sources
  // unconditionally (a value read only inside the ternary would never be tracked).
  const progress = useTransform(() => {
    const w = wide.get();
    const n = narrow.get();
    return clamp01((layout.get().wide ? w : n) / FAN_END);
  });

  // The whole deck rests tilted back and straightens (not fully) as it fans.
  const rotateX = useTransform(progress, [0, 1], [18, 4]);

  return (
    <figure aria-labelledby="hero-deck-title" className="relative mx-auto w-full max-w-[520px] lg:mx-0">
      <p id="hero-deck-title" className="sr-only">
        What the basket holds, example allocation:{" "}
        {SLEEVES.map((s) => `${s.name} ${formatPct(s.weight, { digits: 0, signed: false })}`).join(", ")}
      </p>

      {/* Stage: perspective for the 3D. No overflow-hidden anywhere from here down. */}
      <div className="[perspective:1400px]">
        <motion.ol
          ref={deckRef}
          style={active ? { rotateX, transformStyle: "preserve-3d" } : { transformStyle: "preserve-3d" }}
          className="relative flex flex-col will-change-transform"
        >
          {/* Zig-zag: card 1 left, card 2 right and in front of both neighbours (so it is always
              fully visible), card 3 left. The corners card 2 overlaps are left empty. */}
          {SLEEVES.map((s, i) => (
            <DeckCard
              key={s.id}
              index={i}
              progress={progress}
              layout={layout}
              active={active}
              ink={i === 2}
              className={i === 1 ? "z-10 sm:self-end" : "sm:self-start"}
            >
              <SleeveCard sleeve={s} ink={i === 2} />
            </DeckCard>
          ))}
        </motion.ol>
      </div>

      <figcaption className="mt-6">
        <p className="text-body-sm text-faint">Example allocation, for illustration.</p>
        <ArrowLink href="#basket">What each part does</ArrowLink>
      </figcaption>
    </figure>
  );
}

/**
 * One card. Layout (CSS): full width and content height in a column on phones, 32px apart; from
 * sm up, 58% wide and 184px tall in a zig-zag, each overlapping the one above by 40px. Transforms (only when active) come from pose().
 */
function DeckCard({
  index,
  progress,
  layout,
  active,
  ink = false,
  className,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  layout: MotionValue<Layout>;
  active: boolean;
  ink?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const at = (key: "x" | "y" | "z" | "rz" | "ry") => () => pose(index, progress.get(), layout.get())[key];
  const x = useTransform(at("x"));
  const y = useTransform(at("y"));
  const z = useTransform(at("z"));
  const rotateZ = useTransform(at("rz"));
  const rotateY = useTransform(at("ry"));
  // Connectors fade in over the last stretch of this card's own move, once the cards have parted.
  const start = index * STAGGER + SPAN * 0.6;
  const linkOpacity = useTransform(progress, [start, start + SPAN * 0.35], [0, 1]);

  return (
    <motion.li
      style={active ? { x, y, z, rotateZ, rotateY } : undefined}
      className={cn(
        "relative w-full will-change-transform sm:h-46 sm:w-[58%]",
        index > 0 && "mt-8 sm:-mt-10",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-xl border shadow-lift",
          ink ? "border-ink bg-ink text-primary-foreground" : "bg-card",
        )}
      >
        {children}
      </div>
      {index < 2 && <Connector toLeft={index === 1} opacity={active ? linkOpacity : undefined} />}
    </motion.li>
  );
}

/**
 * Dotted link from this card to the next, with gold dots at both ends. Decorative (aria-hidden):
 * the list order already says "1, 2, 3".
 * - Phones: a short vertical line in the 32px gap below the card.
 * - sm+: an elbow from the card's side (vertical middle) to the next card's top edge, at the next
 *   card's centre. Card 58% wide, next card's centre 13% of the row beyond this card's edge, so the
 *   elbow is 22% of this card wide; 92px (half of h-46) minus the 40px overlap = 52px (h-13) tall.
 */
function Connector({ toLeft, opacity }: { toLeft: boolean; opacity?: MotionValue<number> }) {
  const dot = "absolute size-2 rounded-full bg-secondary";
  const end = "absolute size-2.5 rounded-full bg-secondary ring-4 ring-gold-100";
  return (
    <motion.div aria-hidden style={opacity ? { opacity } : undefined} className="pointer-events-none">
      {/* phones */}
      <div className="absolute top-full left-10 h-8 w-px border-l border-dashed border-grey-400 sm:hidden">
        <span className={cn(dot, "-top-1 -left-1")} />
        <span className={cn(end, "-bottom-1.5 -left-1.5")} />
      </div>
      {/* sm+ */}
      <div
        className={cn(
          "absolute top-1/2 hidden h-13 w-[22%] border-t border-dashed border-grey-400 sm:block",
          toLeft ? "right-full rounded-tl-lg border-l" : "left-full rounded-tr-lg border-r",
        )}
      >
        <span className={cn(dot, "-top-1", toLeft ? "-right-1" : "-left-1")} />
        <span className={cn(end, "-bottom-1.5", toLeft ? "-left-1.5" : "-right-1.5")} />
      </div>
    </motion.div>
  );
}

/** One part of the basket: swatch + name (+ tag), what moves it, and its share of the basket. */
function SleeveCard({ sleeve, ink = false }: { sleeve: Sleeve; ink?: boolean }) {
  const info = SLEEVE_INFO[sleeve.id];
  return (
    <div className="flex h-full flex-col justify-between gap-3 p-5">
      <div>
        <div className="flex items-center justify-between gap-3">
          <SleeveLabel swatch={info.swatch} ink={ink}>
            {sleeve.name}
          </SleeveLabel>
          {info.tag && (
            <span className="rounded-full border border-gold-200 bg-gold-50 px-2.5 py-0.5 text-body-sm font-bold text-accent">
              {info.tag}
            </span>
          )}
        </div>
        <p className={cn("mt-2 text-body-sm", ink ? "text-grey-300" : "text-muted-foreground")}>{info.short}</p>
      </div>
      <p className="flex items-baseline gap-2">
        <span className="type-h3 num">{formatPct(sleeve.weight, { digits: 0, signed: false })}</span>
        <span className={cn("text-body-sm", ink ? "text-grey-300" : "text-faint")}>of the basket</span>
      </p>
    </div>
  );
}

/** "● US STOCKS": the sleeve's swatch + its name. */
function SleeveLabel({ swatch, ink = false, children }: { swatch: string; ink?: boolean; children: ReactNode }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-body-sm font-extrabold tracking-[0.1em] uppercase",
        ink ? "text-grey-300" : "text-faint",
      )}
    >
      <span aria-hidden className={cn("size-2.5 rounded-full", swatch, ink && "ring-2 ring-ink-3")} />
      {children}
    </p>
  );
}
