"use client";

// Scroll-driven 3D presentation for one hero object (the specimen fee receipt).
// The card rests with a slight tilt in the hero, flattens as you scroll down, and leans away as
// it leaves the screen. Scroll-linked, so it moves exactly as fast as you scroll.
// (A mouse-follow tilt was removed at the user's request on 2026-11-03.)
// Depth: children can mark layers with data-depth="front" / "back"; they sit in front of or
// behind the card plane (preserve-3d), so the tilt shows real parallax, not a flat rotation.
// Reduced motion: no transforms at all, just the card.
import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

// true only after hydration. The server can't know the visitor's motion preference, so it renders
// the card flat; the 3D switches on in the browser. (useSyncExternalStore, not setState-in-effect:
// React renders the server value during hydration, then re-renders with the client value.)
const noop = () => () => {};
const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);

export function Tilt3D({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const active = useHydrated() && !reduce;

  // 0 = card's top at the bottom of the viewport, 1 = card's bottom at the top.
  // At rest in the hero (≈ 0.45) the card keeps a visible tilt; it flattens around 0.75.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.45, 0.75, 1], [14, 5, 0, -8]);
  const rotateY = useTransform(scrollYProgress, [0, 0.45, 0.75, 1], [-14, -7, 0, 6]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.75, 1], [0.95, 0.98, 1, 0.97]);

  return (
    <div ref={ref} className={cn("[perspective:1400px]", className)}>
      <motion.div
        style={active ? { rotateX, rotateY, scale, transformStyle: "preserve-3d" } : { transformStyle: "preserve-3d" }}
        // Every element between here and a data-depth layer must keep preserve-3d and must NOT use
        // overflow:hidden (both flatten 3D), so the card itself is built without clipping.
        className="relative will-change-transform [&_[data-depth]]:[transform-style:preserve-3d] [&_[data-depth=back]]:[transform:translateZ(-40px)] [&_[data-depth=front]]:[transform:translateZ(36px)] [&_[data-preserve-3d]]:[transform-style:preserve-3d]"
      >
        {children}
      </motion.div>
    </div>
  );
}
