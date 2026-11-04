"use client";

// Shared scroll reveals: the one motion vocabulary for the whole site, so sections never invent
// their own timings. A 12px rise + fade, once, on the soft ease. Deliberately quiet: section
// headings don't use it at all, and the hero's 3D deck is the page's one big moment.
// MotionConfig reducedMotion="user" (providers.tsx) removes the movement for people who ask
// their OS for less motion; the fade still runs so nothing is ever stuck invisible.
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Reveal one block. `delay` is a stagger step (0–4), 80ms each. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{ ...item, shown: { ...(item.shown as object), transition: { duration: 0.5, ease: EASE, delay: delay * 0.08 } } }}
    >
      {children}
    </Tag>
  );
}

/** Reveal a list: children wrapped in <RevealItem> cascade in, 70ms apart. */
export function RevealGroup({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" }) {
  const Tag = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
