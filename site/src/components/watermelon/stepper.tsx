"use client";

// Adapted from Watermelon UI "stepper" (registry.watermelon.sh/r/stepper.json).
// Kept: the per-digit 3D roll when the value changes.
// Changed for Paraa: named −/+ buttons (the original had none), a visible label, the value
// announced politely to screen readers, lucide icons instead of react-icons, design tokens.
// Light theme: a Greyscale-300 outline, muted Greyscale-100 buttons that darken a step on hover,
// and the value set in type-h4 (the file's 20/24 heading size).
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  label: string;
  unit?: (value: number) => string; // e.g. (n) => (n === 1 ? "month" : "months")
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}

const digitVariants = {
  initial: (dir: number) => ({ y: dir > 0 ? 18 : -18, opacity: 0, filter: "blur(2px)" }),
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({ y: dir > 0 ? -18 : 18, opacity: 0, filter: "blur(2px)" }),
};
const DIGIT_FADE = { type: "tween", duration: 0.2, ease: "easeOut" } as const;

export function Stepper({ label, unit, value, defaultValue = 0, min = 0, max = 999, onChange, className }: StepperProps) {
  const id = useId();
  const [internal, setInternal] = useState(defaultValue);
  const [dir, setDir] = useState(0);
  const current = value ?? internal;
  const digits = String(current).split("");

  const step = (d: number) => {
    const next = Math.min(max, Math.max(min, current + d));
    if (next === current) return;
    setDir(d);
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  // aria-disabled, not disabled, at the limits: a disabled button drops keyboard focus to <body>
  // the moment you reach 1 or 60. step() already ignores presses past the limit.
  const btn =
    "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-muted text-foreground transition-colors duration-200 ease-out-soft hover:bg-grey-200 aria-disabled:cursor-not-allowed aria-disabled:text-faint aria-disabled:opacity-60 aria-disabled:hover:bg-muted";

  return (
    <div className={cn("w-full", className)} role="group" aria-labelledby={`${id}-label`}>
      <span id={`${id}-label`} className="mb-3 block text-body-md font-semibold text-foreground">
        {label}
      </span>
      <div className="inline-flex items-center gap-4 rounded-full border border-border-strong bg-card p-1 shadow-card">
        <motion.button type="button" whileTap={{ scale: 0.92 }} onClick={() => step(-1)} aria-disabled={current <= min} aria-label={`Decrease ${label.toLowerCase()}`} className={btn}>
          <Minus className="size-5" aria-hidden />
        </motion.button>

        <div aria-hidden className="flex min-w-16 items-center justify-center type-h4 text-foreground num perspective-midrange">
          {digits.map((digit, i) => (
            <span key={`${i}-${digits.length}`} className="relative h-8 w-4">
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.span
                  key={`${digit}-${current}`}
                  custom={dir}
                  variants={digitVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  // The spring only drives y: on blur/opacity its overshoot goes below zero, and a
                  // negative blur() is an invalid keyframe (console warning on every step).
                  transition={{ type: "spring", stiffness: 220, damping: 18, filter: DIGIT_FADE, opacity: DIGIT_FADE }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {digit}
                </motion.span>
              </AnimatePresence>
            </span>
          ))}
          {unit && <span className="ml-2 text-body-md font-semibold text-muted-foreground">{unit(current)}</span>}
        </div>

        <motion.button type="button" whileTap={{ scale: 0.92 }} onClick={() => step(1)} aria-disabled={current >= max} aria-label={`Increase ${label.toLowerCase()}`} className={btn}>
          <Plus className="size-5" aria-hidden />
        </motion.button>
      </div>
      <span className="sr-only" aria-live="polite">
        {current} {unit ? unit(current) : ""}
      </span>
    </div>
  );
}
