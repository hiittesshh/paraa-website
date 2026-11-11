"use client";

// The native range slider (spec §4.14), replacing the Watermelon adaptive slider. The thumb tracks the
// pointer 1:1 (nothing eases or springs), a click on the track jumps there, the keys work natively, and
// a vertical swipe that starts on it still scrolls the page (no touch-action is set). The visual is the
// `.range` CSS in globals.css: a 6px track, the ink fill from the origin to the value, and a 24px white
// thumb with a 2px ink border. The fill runs between --a and --b (fractions 0–1).
//
// When the range crosses zero, the fill grows from zero and a 2 × 16px zero tick sits *under* the input,
// so the fill and thumb paint over it. The tick is hidden while the thumb's centre is within 32px of it
// (the 24px thumb plus 8px clear, v1.3), so it never reads as touching the thumb (the tax default sits 4%
// from zero; Gold −5% at 390).
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const THUMB_PX = 24;
const TICK_CLEAR_PX = THUMB_PX + 8;
// Before the track is measured (server render, or JS off), assume the narrowest track on the page: the
// tool card at 320 (288 − 2 × 20 padding − the thumb). A narrower track makes "near zero" more likely,
// so the tick can only appear after measuring, never disappear.
const NARROWEST_TRACK_PX = 224;

// A focusable control inside a tool sits below the sticky header and readout when scrolled to (§4.15).
const CONTROL_SCROLL_MARGIN = "scroll-mt-[calc(var(--header-h)+var(--readout-h)+1rem)]";

export function Slider({
  label,
  value: valueProp,
  defaultValue,
  min,
  max,
  step,
  onValueChange,
  format,
  hint,
  id: idProp,
  className,
}: {
  /** The visible label; it is also the accessible name. */
  label: ReactNode;
  value?: number;
  defaultValue?: number;
  min: number;
  max: number;
  step: number;
  onValueChange?: (value: number) => void;
  /** How the value is shown and announced (aria-valuetext), e.g. "−25%" or "+₹1,00,000". */
  format: (value: number) => string;
  /** A line under the slider, linked with aria-describedby. Use <Disclosure as="span" /> for a limit. */
  hint?: ReactNode;
  id?: string;
  className?: string;
}) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const [internal, setInternal] = useState(defaultValue ?? min);
  const value = valueProp ?? internal;

  const inputRef = useRef<HTMLInputElement>(null);
  const [trackPx, setTrackPx] = useState<number | null>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const observer = new ResizeObserver(([entry]) => setTrackPx(entry.contentRect.width - THUMB_PX));
    observer.observe(input);
    return () => observer.disconnect();
  }, []);

  // A slider moved before hydration (slow networks) keeps its value (FL-10, the AskForm pattern of Q36):
  // React keeps the DOM value while it hydrates, but the first re-render would write the default back over
  // it. Read it once on mount and adopt it if it differs.
  const hydrationValue = useRef(value);
  const onHydrationChange = useRef(onValueChange);
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const typed = Number(input.value);
    if (Number.isFinite(typed) && typed !== hydrationValue.current) {
      setInternal(typed);
      onHydrationChange.current?.(typed);
    }
  }, []);

  const span = max - min;
  const pos = span === 0 ? 0 : (value - min) / span;
  const crossesZero = min < 0 && max > 0;
  const origin = crossesZero ? -min / span : 0;
  const nearZero = Math.abs(pos - origin) * (trackPx ?? NARROWEST_TRACK_PX) < TICK_CLEAR_PX;
  const shown = format(value);

  return (
    <div className={cn("w-full", className)}>
      {/* Round 18d: the label at reading size and the value in a soft gold box, the familiar calculator pattern. */}
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-body-lg font-semibold text-foreground">
          {label}
        </label>
        {/* Never split a figure: "+₹1,00,000" may otherwise break after "+" beside a two-line label (Dev 3). */}
        <span
          aria-hidden
          className="num shrink-0 rounded-lg bg-brand-soft px-3 py-1.5 text-body-lg font-semibold whitespace-nowrap text-brand-foreground"
        >
          {shown}
        </span>
      </div>
      <div className="relative isolate">
        {crossesZero && !nearZero && (
          <span
            aria-hidden
            className="absolute top-1/2 z-0 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-muted-foreground"
            style={{ left: `calc(0.75rem + (100% - 1.5rem) * ${origin})` }}
          />
        )}
        <input
          ref={inputRef}
          id={id}
          type="range"
          className={cn("range relative z-[1]", CONTROL_SCROLL_MARGIN)}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => {
            const next = Number(event.target.value);
            setInternal(next);
            onValueChange?.(next);
          }}
          aria-valuetext={shown}
          aria-describedby={hint ? `${id}-hint` : undefined}
          style={{ "--a": Math.min(pos, origin), "--b": Math.max(pos, origin) } as CSSProperties}
        />
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-body-md text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}
