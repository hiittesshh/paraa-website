// Single-choice chips (spec §4.13): a native radio group, so one Tab stop per group and arrows move and
// select. No check icon (an icon would reflow the chip on every tap). Checked = ink fill + white text,
// plus an outline in forced colours. "None checked" is valid (the scenarios, once a slider moves).
//
// Works without JS (radios check natively). Controlled when you pass `value` (use null for none checked)
// with `onValueChange`; otherwise `defaultValue` sets the server-rendered choice.
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ChipOption = {
  value: string;
  label: ReactNode;
};

// A focusable control inside a tool sits below the sticky header and readout when scrolled to (§4.15).
const CONTROL_SCROLL_MARGIN = "scroll-mt-[calc(var(--header-h)+var(--readout-h)+1rem)]";

const LABEL =
  // Round 18b: filled Light chips (no outline boxes), ink when checked. The Light fill is 1.12:1 on the white
  // card, so the chip's boundary is carried by its text and fill; the 1px border appears on hover.
  "inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-transparent bg-background-alt px-4 py-2 text-left text-body-md font-semibold text-foreground num transition-colors duration-150 ease-out hover:border-input motion-safe:active:scale-97 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring forced-colors:border-[CanvasText] forced-colors:peer-checked:outline-2";

const CONTAINER = {
  // Wraps to as many rows as it needs (the tax slabs).
  wrap: "flex flex-wrap gap-2",
  // The amounts: 2 × 2 with equal chips below 640 (v1.1, N9), one row from 640.
  grid2: "grid grid-cols-2 gap-2 sm:flex sm:flex-wrap",
} as const;

const LABEL_VARIANT = {
  wrap: "",
  grid2: "justify-center sm:justify-start",
} as const;

export function ChoiceChips({
  legend,
  helper,
  name,
  options,
  variant = "wrap",
  value,
  defaultValue,
  onValueChange,
  className,
}: {
  legend: ReactNode;
  /** A line under the legend ("The rate on the top part of your income."), read with the group. */
  helper?: ReactNode;
  /** The radio group's name; also prefixes each option's id, so keep it unique on the page. */
  name: string;
  options: readonly ChipOption[];
  variant?: keyof typeof CONTAINER;
  value?: string | null;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}) {
  const controlled = value !== undefined;
  const helperId = helper ? `${name}-helper` : undefined;

  // A chip picked before hydration (slow networks) keeps its choice (FL-10, the AskForm pattern of Q36).
  // React keeps the DOM's checked radio while it hydrates; on that commit, adopt it if it differs from
  // `value`. A callback ref rather than a hook, so ChoiceChips stays a Server Component when uncontrolled.
  // After the first commit React has written `value` to the DOM, so later runs find nothing to adopt.
  const adoptCheckedBeforeHydration =
    controlled && onValueChange
      ? (fieldset: HTMLFieldSetElement | null) => {
          const checked = fieldset?.querySelector<HTMLInputElement>("input[type=radio]:checked");
          if (checked && checked.value !== value) onValueChange(checked.value);
        }
      : undefined;

  return (
    <fieldset
      ref={adoptCheckedBeforeHydration}
      className={cn("min-w-0", className)}
      aria-describedby={helperId}
    >
      <legend className={cn("text-body-md font-semibold text-foreground", helper ? "mb-0" : "mb-3")}>{legend}</legend>
      {helper && (
        <p id={helperId} className="mb-3 text-body-md text-muted-foreground">
          {helper}
        </p>
      )}
      <div className={CONTAINER[variant]}>
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          return (
            // One wrapper per option keeps each `peer` scoped to its own label (peer-* matches any
            // earlier sibling). `grid` makes the label fill its cell in the grid variants.
            <div key={option.value} className="relative grid">
              <input
                type="radio"
                id={id}
                name={name}
                value={option.value}
                className={cn("peer sr-only", CONTROL_SCROLL_MARGIN)}
                {...(controlled
                  ? { checked: value === option.value, onChange: () => onValueChange?.(option.value) }
                  : { defaultChecked: defaultValue === option.value })}
              />
              <label htmlFor={id} className={cn(LABEL, LABEL_VARIANT[variant])}>
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
