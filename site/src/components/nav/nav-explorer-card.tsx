"use client";

// The NAV explorer card used on the homepage (A5.3) and on /nav (A6.3): basket tabs, the
// date-range presets (Since inception · Calendar years · Custom; deliberately no "pick the good year"
// preset), From/To months, the chart, and the stats for the selected range.
import { useId, useMemo, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { Illustrative, ToConfirm } from "@/components/paraa/primitives";
import { DiscreteTabs } from "@/components/watermelon/discrete-tabs";
import { annualise, calendarYears, drawdown, navs, negativeMonths, rangeReturn, yearRange } from "@/lib/calc";
import { clampRange, sinceLabel } from "@/lib/chart-scale";
import { formatPct, monthLabel } from "@/lib/format";
import { NAV_DATA, SHOW_PERFORMANCE } from "@/lib/nav-data";
import { cn } from "@/lib/utils";
import { DownloadCsvButton } from "./download-csv-button";
import { NavChart } from "./nav-chart";
import { signTone } from "@/lib/tone";

type Preset = "inception" | "years" | "custom";
const PRESETS: { value: Preset; label: string }[] = [
  { value: "inception", label: "Since inception" },
  { value: "years", label: "Calendar years" },
  { value: "custom", label: "Custom" },
];

const LAST = NAV_DATA.length - 1;
const V = navs(NAV_DATA);
const YEARS = calendarYears(NAV_DATA);

const fieldLabel = "mb-2 block text-body-md font-semibold";
const select =
  "h-11 w-full min-w-0 cursor-pointer rounded-md border border-border-strong bg-card px-3 text-body-md text-foreground num hover:border-muted-foreground";

export function NavExplorerCard() {
  return (
    <DiscreteTabs
      label="Choose a basket"
      labels="all"
      tabs={[
        { id: "b1", label: "Basket 1", icon: <BasketNo n={1} />, content: <Basket1Explorer /> },
        { id: "b2", label: "Basket 2", icon: <BasketNo n={2} />, content: <InPreparation name="Basket 2 — USD Balanced" /> },
        { id: "b3", label: "Basket 3", icon: <BasketNo n={3} />, content: <InPreparation name="Basket 3 — USD Growth" /> },
      ]}
    />
  );
}

function BasketNo({ n }: { n: number }) {
  return <span className="num flex size-5 items-center justify-center text-body-md font-extrabold">{n}</span>;
}

function InPreparation({ name }: { name: string }) {
  return (
    <div className="flex min-h-64 flex-col items-start justify-center gap-3 rounded-lg border border-dashed border-border-strong bg-card p-6 md:p-8">
      <h3 className="type-h5">
        {name} <ToConfirm>name TO CONFIRM</ToConfirm>
      </h3>
      <p className="text-body-md text-muted-foreground">
        No history to show yet. We won&apos;t draw a line for a basket that hasn&apos;t published a NAV.
      </p>
      <ToConfirm>Data in preparation</ToConfirm>
    </div>
  );
}

function Basket1Explorer() {
  const id = useId();
  const [range, setRange] = useState({ from: 0, to: LAST });
  const [preset, setPreset] = useState<Preset>("inception");
  const [year, setYear] = useState(YEARS[YEARS.length - 1].year);
  const { from, to } = range;

  const stats = useMemo(() => {
    const R = rangeReturn(V, from, to);
    const months = to - from;
    return { R, months, ann: annualise(R, months), dd: drawdown(V, from, to), neg: negativeMonths(V, from, to) };
  }, [from, to]);

  const choosePreset = (p: Preset) => {
    setPreset(p);
    if (p === "inception") setRange({ from: 0, to: LAST });
    if (p === "years") setRange(yearRange(NAV_DATA, year));
  };
  const chooseYear = (y: number) => {
    setYear(y);
    setRange(yearRange(NAV_DATA, y));
  };
  const moveEnd = (which: "from" | "to", value: number) => {
    setPreset("custom");
    const next = which === "from" ? { from: value, to } : { from, to: value };
    setRange(clampRange(next.from, next.to, LAST, which));
  };

  const since = sinceLabel(NAV_DATA, from);
  const sourceLine = (
    <>
      {since} · in USD · net of fees · vs USD cash <ToConfirm /> · Illustrative
    </>
  );

  return (
    <div className="rounded-lg border bg-card p-4 sm:p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="type-h5">Basket 1 — USD Core</h3>
        <ToConfirm>name TO CONFIRM</ToConfirm>
        <Illustrative />
      </div>

      <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-8">
        <fieldset>
          <legend className={fieldLabel}>Date range</legend>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <label
                key={p.value}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-body-md font-semibold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
                  preset === p.value
                    ? "border-foreground bg-foreground text-background"
                    : "border-border-strong text-foreground hover:border-muted-foreground",
                )}
              >
                <input
                  type="radio"
                  name={`${id}-preset`}
                  value={p.value}
                  checked={preset === p.value}
                  onChange={() => choosePreset(p.value)}
                  className="sr-only"
                />
                {preset === p.value && <Check aria-hidden className="size-4" strokeWidth={3} />}
                {p.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(3,minmax(0,1fr))_auto] sm:items-end">
          {preset === "years" ? (
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor={`${id}-year`} className={fieldLabel}>
                Year
              </label>
              <select id={`${id}-year`} className={select} value={year} onChange={(e) => chooseYear(Number(e.target.value))}>
                {YEARS.map((r) => (
                  <option key={r.year} value={r.year}>
                    {r.year}
                    {r.partial ? " (part year)" : ""}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div aria-hidden className="hidden sm:block" />
          )}
          <div>
            <label htmlFor={`${id}-from`} className={fieldLabel}>
              From
            </label>
            <select id={`${id}-from`} className={select} value={from} onChange={(e) => moveEnd("from", Number(e.target.value))}>
              {NAV_DATA.map((d, i) => (
                <option key={d[0]} value={i}>
                  {monthLabel(d[0])}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-to`} className={fieldLabel}>
              To
            </label>
            <select id={`${id}-to`} className={select} value={to} onChange={(e) => moveEnd("to", Number(e.target.value))}>
              {NAV_DATA.map((d, i) => (
                <option key={d[0]} value={i}>
                  {monthLabel(d[0])}
                </option>
              ))}
            </select>
          </div>
          <DownloadCsvButton className="col-span-2 sm:col-span-1" />
        </div>
      </div>

      <figure className="mt-8">
        <NavChart from={from} to={to} />
        <figcaption className="mt-3 text-body-sm text-muted-foreground">
          Hover, tap or focus the chart and use the arrow keys to read each month. The shaded band is the largest fall from a high inside the
          range you picked.
        </figcaption>
      </figure>

      <div
        aria-live="polite"
        aria-atomic="true"
        className={cn("mt-8 grid gap-px overflow-hidden rounded-md border bg-border", SHOW_PERFORMANCE ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2")}
      >
        {SHOW_PERFORMANCE && (
          <>
            <Stat label="Return over range" value={formatPct(stats.R)} tone={signTone(stats.R)} source={sourceLine} />
            <Stat
              label="Annualised"
              value={stats.ann === null ? "Not annualised" : formatPct(stats.ann)}
              note={stats.ann === null ? "Under 12 months" : undefined}
              tone={signTone(stats.ann)}
              source={sourceLine}
            />
          </>
        )}
        <Stat
          label="Max drawdown in range"
          value={formatPct(stats.dd.max)}
          tone={signTone(stats.dd.max)}
          source={
            stats.dd.max < 0
              ? `${monthLabel(NAV_DATA[stats.dd.peakIdx][0])} → ${monthLabel(NAV_DATA[stats.dd.troughIdx][0])} · largest fall from a high · Illustrative`
              : "no fall from a high in this range · Illustrative"
          }
        />
        <Stat
          label="Negative months in range"
          value={`${stats.neg.count} of ${stats.neg.total}`}
          source={`${monthLabel(NAV_DATA[from][0])} to ${monthLabel(NAV_DATA[to][0])}, ${stats.months} ${stats.months === 1 ? "month" : "months"} · Illustrative`}
        />
      </div>

      <p className="mt-4 text-body-sm text-muted-foreground">
        Comparison benchmark: USD cash <ToConfirm /> · NAV source: fund administrator <ToConfirm />
      </p>
    </div>
  );
}

function Stat({ label, value, note, tone, source }: { label: string; value: string; note?: string; tone?: string; source: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 bg-card p-4 md:p-5">
      <span className="text-body-sm font-semibold text-muted-foreground">{label}</span>
      <span className={cn("num type-h4", tone)}>
        {value}
        {note && <span className="ml-2 text-body-sm font-semibold text-muted-foreground">{note}</span>}
      </span>
      <span className="text-body-sm text-faint">{source}</span>
    </div>
  );
}
