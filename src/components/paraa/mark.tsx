"use client";

// A gold highlighter stroke that sweeps under a phrase in a heading, once, as it comes into view.
// It's a background, so the text itself is readable from the first paint and on any surface.
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

export function Mark({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="bg-linear-to-r from-secondary to-secondary bg-no-repeat box-decoration-clone [background-position:0_92%]"
      initial={{ backgroundSize: "0% 0.2em" }}
      whileInView={{ backgroundSize: "100% 0.2em" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE, delay: 0.15 }}
    >
      {children}
    </motion.span>
  );
}
