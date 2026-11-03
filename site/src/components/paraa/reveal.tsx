"use client";

// Subtle scroll reveal (brief: "smooth transitions and subtle reveals only").
// A 12px rise + fade, once. MotionConfig reducedMotion="user" (see providers.tsx) turns the
// movement off for people who ask their OS for less motion.
import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number; // stagger step, 0–4
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.5, delay: delay * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Tag>
  );
}
