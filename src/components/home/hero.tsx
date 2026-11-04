"use client";

// The first screen, with Mercury's scroll, as one continuous pinned sequence on wide screens:
//   1. the camera flies from the valley into the laptop, and the words fade early in the flight;
//   2. the world falls away, leaving the app window whole on the dark page;
//   3. that same window slides right as the list appears beside it, and the pair sits centred, fully
//      on screen. On narrower screens the window also shrinks, or tucks away its side panels;
//   4. scrolling moves the app through its four screens, then the page carries on.
// It's a CSS pin, not wheel interception, so keyboard, trackpad and scrollbar all keep working. Scroll
// is lightly smoothed, because a mouse wheel moves in steps. All of it only moves graphics-card
// textures, so nothing is redrawn while scrolling.
//
// A phone can't show that window whole, so narrow and short screens fly into the laptop, dissolve into
// the page, and show the tour as its own section. With reduced motion: one still first screen and the
// tour section. The registration line is on the first screen either way.
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ButtonLink } from "@/components/paraa/primitives";
import { cn } from "@/lib/utils";
import { HeroAsk } from "./hero-ask";
import { HeroScene, flightMove } from "./hero-scene";
import { AppDesktop, DESK_H, DESK_TUCKED_W, DESK_W, ProductTour, SCREENS } from "./product-tour";

const WIDE = "(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)";
const subscribe = (notify: () => void) => {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const useWide = () => useSyncExternalStore(subscribe, () => window.matchMedia(WIDE).matches, () => false);
// The pin's extra height is only added once the script is running. If it never runs, this is a normal
// one-screen hero, not a long stretch of scrolling past a picture that doesn't move.
const noop = () => () => {};
const useReady = () => useSyncExternalStore(noop, () => true, () => false);

// Where each part of the wide sequence ends, as a share of the pinned scroll (3.7 screens long).
const FLIGHT_END = 0.36;
const SLIDE_START = 0.42;
const SLIDE_END = 0.55;

const HEADER = 72;
// The laptop's screen is 170 wide in the 1600-wide picture.
const SCREEN_W = 170;
// The list gets a share of the screen, within limits.
const listWidth = (vw: number) => Math.min(380, Math.max(280, vw * 0.24));
// Below this size the window's text gets too small, so it tucks away its side panels instead.
const MIN_WHOLE_SCALE = 0.8;

export function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const wide = useWide();
  const ready = useReady();
  const [active, setActive] = useState(0);
  const [listW, setListW] = useState(380);
  const [listLeft, setListLeft] = useState(48);

  // Measured on resize: how the picture maps to this screen, and where the window ends up.
  const camera = useMotionValue(9.6);
  const endShift = useMotionValue(0);
  const startScale = useMotionValue(0.13);
  const fullScale = useMotionValue(1);
  const startDrop = useMotionValue(0);
  const slideX = useMotionValue(0);
  const tourRatio = useMotionValue(1);
  const tuck = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      // clientWidth leaves out the scrollbar, which is what the sticky frame is measured against.
      const vw = document.documentElement.clientWidth;
      const vh = window.innerHeight;
      const k = Math.max(vw / 1600, vh / 900);
      const small = SCREEN_W * k;
      if (!window.matchMedia(WIDE).matches) {
        camera.set(9.6);
        endShift.set(0);
        return;
      }
      const fit = Math.min(1, (vw - 96) / DESK_W, (vh - HEADER - 48) / DESK_H);
      camera.set((DESK_W * fit) / small);
      endShift.set(HEADER / 2);
      startScale.set(small / DESK_W);
      fullScale.set(fit);
      startDrop.set(vh * (vh <= 780 ? 0.18 : 0.12));
      // The pair (list + window) is centred, and always fits.
      const list = listWidth(vw);
      const margin = vw >= 1280 ? 48 : 24;
      const gap = vw >= 1280 ? 48 : 32;
      const room = vw - 2 * margin - list - gap;
      const whole = Math.min(fit, room / DESK_W);
      const tucked = whole < MIN_WHOLE_SCALE;
      const tourScale = tucked ? Math.min(fit, room / DESK_TUCKED_W) : whole;
      const shown = (tucked ? DESK_TUCKED_W : DESK_W) * tourScale;
      const left = Math.max(margin, (vw - list - gap - shown) / 2);
      setListW(list);
      setListLeft(left);
      tourRatio.set(tourScale / fit);
      tuck.set(tucked ? DESK_W - DESK_TUCKED_W : 0);
      // The window scales about its middle, so aim its middle at where its left edge should end up.
      slideX.set(left + list + gap + (DESK_W * tourScale) / 2 - vw / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [camera, endShift, startScale, fullScale, startDrop, slideX, tourRatio, tuck]);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.35, restDelta: 0.0002 });
  const flight = useTransform(smooth, (p) => (reduce ? 0 : p / (wide ? FLIGHT_END : 0.86)));

  const copyOpacity = useTransform(flight, [0.16, 0.48], [1, 0]);
  // Faded words shouldn't catch a click meant for what's underneath.
  const copyEvents = useTransform(copyOpacity, (o) => (o < 0.05 ? "none" : "auto"));

  const slide = useTransform(smooth, [SLIDE_START, SLIDE_END], [0, 1], { clamp: true });
  const windowTransform = useTransform(() => {
    const move = flightMove(flight.get());
    const y = startDrop.get() * (1 - move) + endShift.get() * move;
    const t = slide.get();
    const eased = t * t * (3 - 2 * t);
    const s = startScale.get() * (fullScale.get() / startScale.get()) ** move * tourRatio.get() ** eased;
    return `translate3d(${(slideX.get() * eased).toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${s.toFixed(4)})`;
  });
  // The list arrives once the window has cleared the space it needs.
  const windowClip = useTransform(() => {
    const t = slide.get();
    const right = tuck.get() * t * t * (3 - 2 * t);
    return right > 0 ? `inset(0 ${right.toFixed(1)}px 0 0 round 24px)` : "none";
  });
  const listOpacity = useTransform(slide, [0.72, 1], [0, 1]);
  const listY = useTransform(slide, [0.72, 1], [16, 0]);
  const listEvents = useTransform(listOpacity, (o) => (o < 0.5 ? "none" : "auto"));

  useMotionValueEvent(smooth, "change", (p) => {
    if (!wide) return;
    const t = (p - SLIDE_END) / (1 - SLIDE_END);
    setActive(Math.min(SCREENS.length - 1, Math.max(0, Math.floor(t * SCREENS.length))));
  });

  function choose(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const range = track.offsetHeight - window.innerHeight;
    const share = SLIDE_END + ((i + 0.5) / SCREENS.length) * (1 - SLIDE_END);
    window.scrollTo({ top: track.getBoundingClientRect().top + window.scrollY + share * range, behavior: "instant" });
  }

  return (
    <>
      <section
        ref={trackRef}
        aria-labelledby="hero-title"
        className={cn("relative isolate motion-reduce:h-auto", ready && (wide ? "h-[470svh]" : "h-[250svh]"))}
      >
        {/* Where "The app" in the header lands, and how the header knows you're there. */}
        {wide && <div id="tour" aria-hidden className="absolute inset-x-0 top-[203.5svh] h-[166.5svh]" />}

        <div className="sticky top-0 flex h-svh min-h-[560px] flex-col overflow-hidden pt-24 motion-reduce:static md:pt-32">
          <HeroScene flight={flight} camera={camera} endShift={endShift} drawScreen={!wide} />

          {wide && (
            <>
              {/* The app: flies out of the laptop, stops whole, slides aside. */}
              <motion.div
                data-tour
                style={{ transform: windowTransform, clipPath: windowClip, marginLeft: -DESK_W / 2, marginTop: -DESK_H / 2 }}
                className="pointer-events-none absolute top-1/2 left-1/2 z-10 will-change-transform"
              >
                <AppDesktop active={active} />
              </motion.div>

              <motion.div
                data-tour
                style={{ opacity: listOpacity, y: listY, pointerEvents: listEvents, left: listLeft }}
                className="absolute inset-y-0 flex items-center"
              >
                <div style={{ width: listW }}>
                  <h2 className="type-h2 text-balance">Invest and withdraw from one app</h2>
                  <ul className="mt-8 border-b">
                    {SCREENS.map((s, i) => {
                      const on = i === active;
                      return (
                        <li key={s.key} className="border-t">
                          <button type="button" aria-pressed={on} onClick={() => choose(i)} className="w-full cursor-pointer rounded-sm py-4 text-left">
                            <span className={cn("flex items-center gap-3 text-body-lg font-bold transition-colors duration-200", on ? "text-foreground" : "text-faint hover:text-foreground")}>
                              <span aria-hidden className={cn("size-2 rounded-full transition-colors duration-200", on ? "bg-secondary" : "bg-border-strong")} />
                              {s.title}
                            </span>
                            <span
                              className={cn(
                                "grid pl-5 text-body-md text-muted-foreground transition-[grid-template-rows,opacity] duration-300 ease-out-soft",
                                on ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                              )}
                            >
                              <span className="overflow-hidden">{s.body}</span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-3 text-body-md text-faint">An illustration of how it works, with sample numbers. Not a screenshot of the app, a real account, a quote or a past result.</p>
                </div>
              </motion.div>
            </>
          )}

          <motion.div style={{ opacity: copyOpacity, pointerEvents: copyEvents }} className="relative z-20 flex flex-1 flex-col">
            <div className="container-page text-center">
              <h1 id="hero-title" className="mx-auto max-w-[820px] type-h1 text-balance">
                US stocks, gold and crude oil in one basket, bought in rupees
              </h1>
              <p className="mx-auto mt-4 max-w-[52ch] text-body-xl text-grey-100">
                One of the baskets in the Paraa app, for residents of India. Its price is updated daily.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <HeroAsk />
                <ButtonLink href="#tour" variant="ghost" className="h-13 bg-ink-900/70 px-6 text-foreground hover:bg-ink-900/90 hover:text-foreground">
                  See an example
                </ButtonLink>
              </div>
            </div>

            {/* The registration and its limit, in the first view on every screen. */}
            <div className="container-page mt-auto pt-8 pb-5">
              <p className="mx-auto max-w-[860px] rounded-xl bg-ink-900/95 px-5 py-3 text-center text-body-md text-grey-100">
                Paraa Capital is registered with FIU-IND for anti-money-laundering reporting. This isn&rsquo;t approval of this investment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {!wide && <ProductTour />}
    </>
  );
}
