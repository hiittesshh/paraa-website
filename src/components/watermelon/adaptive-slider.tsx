"use client";

// Adapted from Watermelon UI "adaptive-slider" (registry.watermelon.sh/r/adaptive-slider.json).
// Kept: the spring-animated fill + thumb over a hidden native range input.
// Changed for Paraa: design-file gold instead of the demo pink/purple gradients, a visible
// <label>, aria-valuetext with the formatted amount, a visible focus ring on the hidden input,
// and generic value formatting instead of "kCal".
// A gold fill on a track tinted from the current text colour, so it works on light and dark
// surfaces, with a gold thumb. When the range crosses zero the fill grows from zero, so "no change"
// looks empty and a loss goes left. The hit area is the full 44px row.
import { useId, useState, type ChangeEvent } from "react";
import { motion } from "motion/react";
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

const THUMB = 28; // px: the fill and thumb travel inside (100% - THUMB), like a native range
const SPRING = { type: "spring", stiffness: 500, damping: 40 } as const;

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
  const toPct = (v: number) => ((v - min) / (max - min)) * 100;
  const pct = toPct(current);
  const crossesZero = min < 0 && max > 0;
  const origin = crossesZero ? toPct(0) : 0;
  const shown = format(current);

  const at = (p: number) => `calc(${THUMB / 2}px + (${p} / 100) * (100% - ${THUMB}px))`;

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setInternal(v);
    onChange?.(v);
  };

  return (
    <div className={cn("w-full select-none", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <label htmlFor={id} className="text-body-md font-semibold">
          {label}
        </label>
        <span aria-hidden className="type-h6 num">
          {shown}
        </span>
      </div>

      <div className="group/slider relative flex h-11 w-full items-center rounded-full has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-1 has-[input:focus-visible]:outline-ring">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 h-2.5 rounded-full bg-current/15" />
        {crossesZero && (
          <span aria-hidden className="pointer-events-none absolute h-4 w-0.5 -translate-x-1/2 rounded-full bg-current/40" style={{ left: at(origin) }} />
        )}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute h-2.5 rounded-full bg-secondary"
          initial={false}
          animate={{
            left: at(Math.min(pct, origin)),
            width: `calc((${Math.abs(pct - origin)} / 100) * (100% - ${THUMB}px))`,
          }}
          transition={SPRING}
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
          className="absolute inset-0 z-50 h-11 w-full cursor-pointer opacity-0"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-40 -ml-3.5 size-7"
          initial={false}
          animate={{ left: at(pct) }}
          transition={SPRING}
        >
          <span className="block size-7 rounded-full border-4 border-card bg-secondary shadow-lift transition-transform duration-150 ease-out-soft group-hover/slider:scale-110 group-has-[input:active]/slider:scale-95" />
        </motion.div>
      </div>
      {hint && (
        <p id={`${id}-hint`} className="text-body-sm text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}
