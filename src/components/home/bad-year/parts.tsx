// Pieces shared by the "bad year" prototypes (round 18g, compacted in 18h): the scenario radio, the ink answer
// panel, the − / + move control, and the step-by-step list. Imported only by the client prototypes.
import type { ReactNode } from "react";
import { Minus, Plus, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Disclosure } from "@/components/ui/disclosure";
import { CONTROL_SCROLL_MARGIN } from "@/components/ui/tool-result";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { OWN, type BadYear } from "./model";

type Part = BadYear["parts"][number];

/** One native radio and its label: arrows move within the group, one Tab stop. Style the label per prototype. */
export function ScenarioRadio({
  id,
  name = "what-if-scenario",
  value,
  checked,
  onSelect,
  className,
  children,
}: {
  id: string;
  name?: string;
  value: string;
  checked: boolean;
  onSelect: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative grid">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onSelect}
        className={cn("peer sr-only", CONTROL_SCROLL_MARGIN)}
      />
      <label
        htmlFor={id}
        className={cn(
          "cursor-pointer transition-colors duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring forced-colors:peer-checked:outline-2",
          className,
        )}
      >
        {children}
      </label>
    </div>
  );
}

/** The whole year in one bar, in the step-by-step's language: what's left (solid), lost (hatched) or gained (gold). */
function SummaryBar({ m, className }: { m: BadYear; className?: string }) {
  const end = Math.round(m.r.inrValue);
  const diff = end - m.amount;
  const top = Math.max(m.amount, end);
  const w = (v: number) => `${(Math.max(0, v) / top) * 100}%`;
  const bar = "absolute inset-y-0 left-0 motion-safe:transition-[width] motion-safe:duration-500 motion-safe:ease-out";
  return (
    <div className={className}>
      <span aria-hidden className="relative block h-3 overflow-hidden rounded-full bg-background-alt">
        {diff < 0 ? (
          <>
            <span className={cn(bar, "bg-hatch")} style={{ width: w(m.amount) }} />
            <span className={cn(bar, "bg-foreground")} style={{ width: w(end) }} />
          </>
        ) : (
          <>
            <span className={cn(bar, "bg-brand")} style={{ width: w(end) }} />
            <span className={cn(bar, "bg-foreground")} style={{ width: w(m.amount) }} />
          </>
        )}
      </span>
      <p className="num mt-2 flex flex-wrap justify-between gap-x-4 text-body-md text-muted-foreground">
        <span>{formatINR(Math.min(end, m.amount))} still yours</span>
        {diff !== 0 && <span>{formatINR(Math.abs(diff))} {diff < 0 ? "lost" : "gained"}</span>}
      </p>
    </div>
  );
}

/** The answer: the value after a year, the change, and the scenario in one sentence. An ink panel. */
export function Answer({ m, className }: { m: BadYear; className?: string }) {
  return (
    <div className={cn("theme-ink flex flex-col justify-between gap-6 rounded-2xl p-5 sm:p-6", className)}>
      <div>
        <p className="inline-flex rounded-xs bg-background-alt px-2.5 py-1 text-body-md font-semibold">{m.scenarioLine}</p>
        <p className="mt-5 text-body-md text-muted-foreground">Your {formatINR(m.amount)} after one year</p>
        <p className="mt-1 type-result text-brand">
          <span className="num">{m.value}</span>
        </p>
        <p className="num mt-1 text-body-lg font-semibold">
          {formatINR(m.r.inrValue - m.amount, { signed: true })} ({m.change})
        </p>
        <SummaryBar m={m} className="mt-6" />
      </div>
      <div className="border-t pt-4 text-body-md">
        <p className="text-copy">{m.sentence}</p>
        <Disclosure id="rupee-both-v1" as="p" className="mt-2 text-muted-foreground" />
      </div>
    </div>
  );
}

/**
 * A market's move. Read-only it's a pill with the move in it; in "Your own" the same pill gains − and + either
 * side, so the figure doesn't jump. − always means less money for you and + more (for the rupee: stronger and
 * weaker). The buttons stay focusable at the ends of the range and do nothing there (aria-disabled), so focus
 * is never dropped. The live region speaks the new moves and result after each press.
 */
export function MoveControl({ m, part, className }: { m: BadYear; part: Part; className?: string }) {
  const editing = m.selected === OWN;
  const rupee = part.key === "rupee";
  const value = (
    <span className="num w-[6.5rem] text-center text-body-md font-semibold whitespace-nowrap text-foreground">{part.move}</span>
  );
  if (!editing) {
    return (
      <span className={cn("inline-flex h-10 items-center justify-center rounded-full bg-background-alt px-1.5", className)}>
        {value}
      </span>
    );
  }
  const button =
    "grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border border-border-strong bg-card text-foreground transition-colors duration-150 hover:border-input motion-safe:active:scale-95 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:size-4";
  return (
    <span
      role="group"
      aria-label={`${part.label}: ${part.move}`}
      className={cn("inline-flex h-10 items-center rounded-full bg-background-alt px-0.5", className)}
    >
      <button
        type="button"
        className={cn(button, CONTROL_SCROLL_MARGIN)}
        aria-label={rupee ? "Make the rupee stronger" : `Lower the ${part.label} move`}
        aria-disabled={part.atLimit.low || undefined}
        onClick={() => !part.atLimit.low && m.nudge(part.key, -1)}
      >
        <Minus aria-hidden />
      </button>
      {value}
      <button
        type="button"
        className={cn(button, CONTROL_SCROLL_MARGIN)}
        aria-label={rupee ? "Make the rupee weaker" : `Raise the ${part.label} move`}
        aria-disabled={part.atLimit.high || undefined}
        onClick={() => !part.atLimit.high && m.nudge(part.key, 1)}
      >
        <Plus aria-hidden />
      </button>
    </span>
  );
}

/** The quiet text button at the top right of a card: "Change the moves" (→ Your own) or "Set all to zero". */
export function OwnAction({ m, className }: { m: BadYear; className?: string }) {
  const own = m.selected === OWN;
  return (
    <button
      type="button"
      onClick={own ? m.reset : () => m.choose(OWN)}
      className={cn(
        "-mr-2 inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-sm px-2 text-body-md font-semibold whitespace-nowrap text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring [&_svg]:size-4",
        CONTROL_SCROLL_MARGIN,
        className,
      )}
    >
      {own ? <RotateCcw aria-hidden /> : <SlidersHorizontal aria-hidden />}
      {own ? "Set all to zero" : "Change the moves"}
    </button>
  );
}

/**
 * The year, step by step (round 18h, replacing the waterfall): one row per market, in the order the maths runs.
 * Each row says what the move acts on ("₹50,000 of it"), the move, what it adds or takes away, and what you have
 * after it. Under each row a bar on one scale: the light track is what you started with, ink is what you have
 * after the step, the hatched piece is what this step took away and gold what it added, so the bars shrink (or
 * grow) row by row. The bars are decorative: every value is in the text, and the live region speaks.
 */
export function StepByStep({ m, className }: { m: BadYear; className?: string }) {
  const top = Math.max(m.amount, ...m.parts.map((p) => Math.max(p.from, p.to)));
  const w = (v: number) => `${(Math.max(0, v) / top) * 100}%`;
  const bar = "absolute inset-y-0 left-0 motion-safe:transition-[width] motion-safe:duration-500 motion-safe:ease-out";

  return (
    <section aria-labelledby="what-if-steps" className={cn("rounded-2xl border p-5 sm:p-6", className)}>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
        <h4 id="what-if-steps" className="type-subhead">
          How <span className="num whitespace-nowrap">{formatINR(m.amount)}</span> becomes{" "}
          <span className="num whitespace-nowrap">{m.value}</span>
        </h4>
        <OwnAction m={m} className="shrink-0" />
      </div>

      <ol className="mt-3">
        {m.parts.map((p) => (
          // Below 640: name and figures, the move under them, then the bar. From 640 the move sits between.
          <li
            key={p.key}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 border-t py-3 sm:grid-cols-[minmax(0,1fr)_11.5rem_7.5rem] sm:gap-y-1.5 sm:py-2.5"
          >
            {/* Every cell is placed explicitly: auto-placed cells would go round the ones given a row. */}
            <p className="col-start-1 row-start-1 min-w-0 text-body-md">
              <span className="block font-semibold text-foreground">{p.label}</span>
              <span className="block text-muted-foreground">{p.baseNote}</span>
            </p>
            <MoveControl
              m={m}
              part={p}
              className="col-span-2 col-start-1 row-start-2 justify-self-start sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:justify-self-center"
            />
            <p className="num col-start-2 row-start-1 text-right text-body-md sm:col-start-3">
              <span className="sr-only">Change: </span>
              <span className="block font-semibold text-foreground">
                {p.amount === 0 ? "₹0" : formatINR(p.amount, { signed: true })}
              </span>
              <span className="block whitespace-nowrap text-muted-foreground">{formatINR(p.to)} left</span>
            </p>
            <span aria-hidden className="relative col-span-full col-start-1 row-start-3 h-2 overflow-hidden rounded-full bg-background-alt sm:row-start-2">
              {p.amount < 0 ? (
                <>
                  <span className={cn(bar, "bg-hatch")} style={{ width: w(p.from) }} />
                  <span className={cn(bar, "bg-foreground")} style={{ width: w(p.to) }} />
                </>
              ) : (
                <>
                  <span className={cn(bar, "bg-brand")} style={{ width: w(p.to) }} />
                  <span className={cn(bar, "bg-foreground")} style={{ width: w(p.from) }} />
                </>
              )}
            </span>
          </li>
        ))}
      </ol>

      <p aria-hidden className="flex flex-wrap gap-x-4 gap-y-1 border-t pt-3 text-body-md text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-4 rounded-full bg-foreground" /> What you have
        </span>
        <span className="flex items-center gap-1.5">
          <span className="bg-hatch h-2 w-4 rounded-full" /> Lost in that step
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-4 rounded-full bg-brand" /> Gained in that step
        </span>
      </p>
    </section>
  );
}

/** The tile/pill look shared by the prototypes: Light, ink when checked. */
export const PICK =
  "border border-transparent bg-background-alt hover:border-input motion-safe:active:scale-97 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground forced-colors:border-[CanvasText]";
