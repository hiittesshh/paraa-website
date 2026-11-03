"use client";

// Adapted from Watermelon UI "adaptive-slider" (registry.watermelon.sh/r/adaptive-slider.json).
// Kept: the spring-animated fill + thumb and the per-character value pop.
// Changed for Paraa: design-file gold instead of the demo pink/purple gradients, a visible
// <label>, aria-valuetext with the formatted amount, a visible focus ring on the hidden input,
// no fixed-height card wrapper, and generic value formatting instead of "kCal".
import { useId, useMemo, useState, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AdaptiveSliderProps {
  label: string;
  value?: number;
  defaultValue?: number;
  min: number;
  max: number;
  step: number;
  onChange?: (value: number) => void;
  /** How the number is shown and announced, e.g. (v) => "₹1,00,000" */
  format?: (value: number) => string;
  hint?: string;
  className?: string;
}

const THUMB = 52; // px, also the track height: comfortably over the 44px touch target

export function AdaptiveSlider({
  label,
  value,
  defaultValue,
  min,
  max,
  step,
  onChange,
  format = (v) => String(v),
  hint,
  className,
}: AdaptiveSliderProps) {
  const id = useId();
  const [internal, setInternal] = useState(defaultValue ?? min);
  const current = value ?? internal;
  const pct = ((current - min) / (max - min)) * 100;
  const shown = format(current);

  const dots = useMemo(
    () => Array.from({ length: 6 }, (_, i) => <span key={i} className="size-1.5 rounded-full bg-ink-600" />),
    [],
  );

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setInternal(v);
    onChange?.(v);
  };

  return (
    <div className={cn("w-full select-none", className)}>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <label htmlFor={id} className="text-body-md font-semibold">
          {label}
        </label>
        <AnimatedText value={shown} className="text-[28px] font-extrabold tracking-tight num sm:text-[32px]" />
      </div>

      <div className="relative flex h-13 w-full items-center overflow-hidden rounded-full bg-muted has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-offset-3 has-[input:focus-visible]:outline-ring">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-6">{dots}</div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 h-full rounded-full bg-linear-to-r from-gold-700 to-gold-500"
          animate={{ width: `calc((${pct} / 100) * (100% - ${THUMB}px) + ${THUMB}px)` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={handle}
          aria-valuetext={shown}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="absolute inset-0 z-50 h-13 w-full cursor-pointer opacity-0"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 z-40 flex size-13 items-center justify-center"
          animate={{ left: `calc((${pct} / 100) * (100% - ${THUMB}px))` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <span className="size-10 rounded-full bg-foreground shadow-[inset_0_2px_4px_rgba(0,0,0,0.12)]" />
        </motion.div>
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-body-sm text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

function AnimatedText({ value, className }: { value: string; className?: string }) {
  return (
    <span aria-hidden className={cn("flex will-change-transform", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        {value.split("").map((char, i) => (
          <motion.span
            key={char + i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
