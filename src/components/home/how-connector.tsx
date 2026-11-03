"use client";

// One connector on the "How your money moves" rail: vertical on phones, horizontal on desktop.
// It wipes in once, step by step. A clip-path wipe isn't "movement", so MotionConfig's
// reducedMotion="user" doesn't stop it; useReducedMotion sets the wipe's duration to 0 instead.
// The animation props are identical on server and client (only the transition differs, and that
// never reaches the HTML), so reduced motion can't cause a hydration mismatch.
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.2, 0.7, 0.2, 1] as const;
const ONCE = { once: true, margin: "0px 0px -10% 0px" } as const;

export function Connector({ dashed, index }: { dashed: boolean; index: number }) {
  const reduce = useReducedMotion();
  const transition = reduce ? { duration: 0 } : { duration: 0.5, ease: EASE, delay: 0.15 + index * 0.12 };
  // motion-reduce: the server HTML ships the clipped state, so without this the line would stay
  // hidden until it scrolled into view. !important beats Motion's inline clip-path from first paint.
  const line = cn("absolute border-border-strong motion-reduce:[clip-path:none]!", dashed && "border-dashed border-grey-400");
  const wipe = (hidden: string) => ({ initial: { clipPath: hidden }, whileInView: { clipPath: "inset(0 0 0 0)" }, viewport: ONCE, transition });

  return (
    <span aria-hidden className="relative my-2 w-0.5 flex-1 lg:mx-3 lg:my-0 lg:-mr-4 lg:h-12 lg:w-auto">
      <motion.span className={cn(line, "inset-y-0 left-0 border-l-2 lg:hidden")} {...wipe("inset(0 0 100% 0)")} />
      <motion.span className={cn(line, "inset-x-0 top-1/2 hidden -translate-y-1/2 border-t-2 lg:block")} {...wipe("inset(0 100% 0 0)")} />
    </span>
  );
}
