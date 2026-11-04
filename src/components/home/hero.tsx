"use client";

// The hero: a centred headline on a dark stage, over three reasons to choose Paraa as big solid
// tiles. It answers "why Paraa?"; the section after it answers "what's inside?", so the asset
// split deliberately isn't shown here. The tiles start as one tilted 3D stack. As you scroll they
// deal out into a full-width row, straighten and link together.
//
// How it's built, and why:
// - The *finished row* is the normal CSS layout. The stack is a set of transforms that pull the
//   tiles together. So with no transforms at all (server render, reduced motion) the visitor sees
//   the final row, flat and fully readable, in reading order.
// - md+: the section is taller than the screen and an inner frame is position:sticky, so scrolling
//   plays the deal while the page holds still, then the page carries on. It's a CSS pin, not wheel
//   interception: keyboard, trackpad momentum, scrollbars and screen readers all keep working.
// - Phones: a headline, buttons and tiles don't fit one short screen, so nothing pins; the tiles
//   deal out as they scroll into view.
// - Scroll-linked (useScroll + useTransform), never time-based, with no pointer effects.
// - Sticky rule: no ancestor of the sticky frame may clip. The frame itself may, so it crops the
//   stack. 3D rule: nothing between the stage and a tile may clip, which would flatten the 3D.
import { useEffect, useRef, useSyncExternalStore, type ComponentType } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Link2 } from "lucide-react";
import { ButtonLink, Reveal } from "@/components/paraa/primitives";
import { cn } from "@/lib/utils";
import { FIU_REG_NO } from "@/lib/links";
import { RegistrationArt, RupeeCoinArt, ZeroTaxArt } from "./asset-art";

// true only after hydration. The server can't know the visitor's motion preference or screen, so
// it renders the flat row; the stack switches on in the browser, and the markup always matches.
const noop = () => () => {};
const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (t: number) => t * t * (3 - 2 * t); // soft start, soft landing

// The row is finished at 80% of the pinned range; the last 20% holds it before the pin lets go.
const DEAL_END = 0.8;

const REASONS: { title: string; body: string; art: ComponentType<{ className?: string }>; tile: string }[] = [
  {
    title: "Invest in rupees",
    body: "Pay from your bank account. Invest once or every month.",
    art: RupeeCoinArt,
    tile: "bg-ink-800 text-primary-foreground",
  },
  {
    title: "No tax when you invest",
    body: "You pay tax only on the profit you make.",
    art: ZeroTaxArt,
    tile: "bg-secondary text-ink",
  },
  {
    // A stated fact, not an endorsement: the footer note says what this registration does and
    // doesn't mean. Never reword it as "approved by" or name the ministry (see build-brief ROUND 10).
    title: "Registered with FIU-IND",
    body: FIU_REG_NO ? `Financial Intelligence Unit, India. Reg. no. ${FIU_REG_NO}.` : "Financial Intelligence Unit, India.",
    art: RegistrationArt,
    tile: "bg-grey-400 text-ink",
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const active = useHydrated() && !reduce;
  const pins = useMotionValue(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => pins.set(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [pins]);

  const { scrollYProgress: pinned } = useScroll({ target: sectionRef, offset: ["start 64px", "end end"] });
  const { scrollYProgress: entering } = useScroll({ target: stageRef, offset: ["start 85%", "end 75%"] });

  // Function form: Motion subscribes to every .get() made on the first run, so read all sources
  // unconditionally (a value read only inside the ternary would never be tracked).
  const progress = useTransform(() => {
    const a = pinned.get();
    const b = entering.get();
    return smooth(clamp01(pins.get() ? a / DEAL_END : b));
  });

  const rotateX = useTransform(progress, [0, 1], [30, 0]);
  const y = useTransform(progress, [0, 1], [40, 0]);
  const scale = useTransform(progress, [0, 1], [0.88, 1]);
  const linkOpacity = useTransform(progress, [0.8, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="surface-ink relative isolate md:h-[220svh] motion-reduce:md:h-auto"
    >
      <div className="relative flex flex-col overflow-hidden md:sticky md:top-16 md:h-[calc(100svh-4rem)] motion-reduce:md:static motion-reduce:md:h-auto">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* A faint grid, fading out from the centre: the stage floor. */}
          <div className="absolute inset-0 [background-image:linear-gradient(var(--color-ink-2)_1px,transparent_1px),linear-gradient(90deg,var(--color-ink-2)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent)]" />
          {/* Gold light behind the tiles. */}
          <div className="absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_75%,rgb(253_192_55/0.3),transparent_75%)]" />
          {/* Vignette: the edges fall away to the darkest ink, pulling the eye to the centre. */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_95%_at_50%_50%,transparent_55%,var(--color-ink-900)_120%)]" />
        </div>

        <div className="container-page flex min-h-0 flex-1 flex-col py-8 md:py-10 [@media(max-height:820px)]:md:py-6">
          <Reveal className="mx-auto max-w-[800px] shrink-0 text-center">
            <h1 id="hero-title" className="type-h1 text-balance">
              Invest in <span className="text-secondary">US stocks, gold and crude oil</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[52ch] text-body-xl text-grey-300">
              One basket, bought in rupees from India. A chartered accountant guides you from day one.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="#basket" variant="secondary" size="lg" className="group">
                Explore the basket
                <ArrowRight aria-hidden className="transition-transform duration-150 ease-out-soft group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href="#ask"
                variant="outline"
                size="lg"
                className="border-ink-4 bg-transparent text-primary-foreground hover:border-grey-300 hover:bg-ink-2"
              >
                Talk to a CA
              </ButtonLink>
            </div>
          </Reveal>

          {/* Stage: perspective for the 3D. No overflow-hidden from here down to the tiles. */}
          <div
            ref={stageRef}
            className="mt-8 h-80 min-h-0 [perspective:1400px] md:h-auto md:min-h-64 md:flex-1 motion-reduce:md:h-96 motion-reduce:md:flex-none"
          >
            <motion.ul
              style={
                active
                  ? { rotateX, y, scale, transformStyle: "preserve-3d", transformOrigin: "50% 100%" }
                  : { transformStyle: "preserve-3d" }
              }
              className="relative grid h-full grid-cols-3 gap-2 will-change-transform sm:gap-3"
            >
              {REASONS.map((reason, i) => (
                <Tile key={reason.title} reason={reason} index={i} progress={progress} active={active} />
              ))}
              {[1, 2].map((n) => (
                <motion.li
                  key={n}
                  aria-hidden
                  style={active ? { opacity: linkOpacity, z: 1 } : undefined}
                  className={cn(
                    "absolute top-1/2 z-10 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-secondary bg-ink text-secondary sm:size-10",
                    n === 1 ? "left-1/3" : "left-2/3",
                  )}
                >
                  <Link2 className="size-4 sm:size-5" />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One tile. Its place in the row is plain CSS; these transforms start it in the stack: the side
 * tiles slid in behind the middle one, turned outward, further back, peeking out on each side.
 */
function Tile({
  reason,
  index,
  progress,
  active,
}: {
  reason: (typeof REASONS)[number];
  index: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const side = 1 - index; // +1 left tile, 0 middle, -1 right
  const x = useTransform(progress, [0, 1], [`${side * 80}%`, "0%"]);
  const rotateZ = useTransform(progress, [0, 1], [-side * 7, 0]);
  const rotateY = useTransform(progress, [0, 1], [side * 20, 0]);
  const z = useTransform(progress, [0, 1], [side === 0 ? 0 : -140, 0]);
  const Art = reason.art;

  return (
    <motion.li style={active ? { x, z, rotateZ, rotateY } : undefined} className="relative min-w-0 will-change-transform">
      <article className={cn("flex h-full flex-col overflow-hidden rounded-lg p-3 shadow-lift sm:rounded-xl sm:p-6", reason.tile)}>
        {/* The art takes all the room above the words, so they can never collide. */}
        <div className="relative mb-3 min-h-0 flex-1 sm:mb-4">
          <Art className="absolute inset-0 size-full" />
        </div>
        <h2 className="text-body-md font-bold sm:type-h4">{reason.title}</h2>
        {/* On short laptop screens the art needs this room more than the sentence does. */}
        <p className="mt-1 hidden text-body-md lg:block [@media(max-height:820px)]:hidden">{reason.body}</p>
      </article>
    </motion.li>
  );
}
