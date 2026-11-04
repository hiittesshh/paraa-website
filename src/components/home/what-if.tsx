"use client";

// "See how your money could move": pick how each part of the basket and the rupee move over a
// year and see what an amount becomes, in rupees, part by part. Maths: lib/basket scenario()
// (tested). Everything starts at zero (R5). The presets are real calendar-year market moves
// (labelled as such, never as the basket's returns) plus one made-up bad year, so the downside
// is one tap away (R8). Each breakdown row is a signed ₹ amount; the bar is only a second signal.
// Everything you change is on the left and the answer is one dark panel on the right, which
// stays in view while you move the sliders.
import { useState } from "react";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { Reveal, Section, SectionHead } from "@/components/paraa/primitives";
import { Mark } from "@/components/paraa/mark";
import { Money } from "@/components/paraa/money";
import { AdaptiveSlider } from "@/components/watermelon/adaptive-slider";
import { NO_MOVES, PRESETS, SLEEVES, scenario, type Moves, type SleeveId } from "@/lib/basket";
import { formatINR, formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";
import { SLEEVE_INFO } from "./sleeve-info";

const AMOUNTS = [
  { value: 50_000, label: "₹50,000" },
  { value: 1_00_000, label: "₹1 lakh" },
  { value: 5_00_000, label: "₹5 lakh" },
  { value: 10_00_000, label: "₹10 lakh" },
];
const RANGE: Record<SleeveId, number> = { us: 40, gold: 30, oil: 60 };
const RUPEE_RANGE = 15;

const move = (v: number) => (v === 0 ? "No change" : formatPct(v / 100, { digits: 0 }));
const rupeeWords = (v: number) =>
  v === 0 ? "Unchanged" : `${formatPct(Math.abs(v) / 100, { digits: 0, signed: false })} ${v > 0 ? "weaker" : "stronger"}`;

export function WhatIf() {
  const [amount, setAmount] = useState(1_00_000);
  const [moves, setMoves] = useState<Moves>(NO_MOVES); // whole percents
  const [rupee, setRupee] = useState(0); // whole percent; + = rupee weaker

  const asFractions: Moves = { us: moves.us / 100, gold: moves.gold / 100, oil: moves.oil / 100 };
  const r = scenario(amount, asFractions, rupee / 100);
  const presetOn = PRESETS.find(
    (p) => SLEEVES.every((s) => Math.round(p.moves[s.id] * 100) === moves[s.id]) && Math.round(p.rupee * 100) === rupee,
  )?.id;

  function apply(id: string) {
    const p = PRESETS.find((x) => x.id === id)!;
    setMoves({ us: Math.round(p.moves.us * 100), gold: Math.round(p.moves.gold * 100), oil: Math.round(p.moves.oil * 100) });
    setRupee(Math.round(p.rupee * 100));
  }
  function reset() {
    setMoves(NO_MOVES);
    setRupee(0);
  }

  const press = "cursor-pointer transition-[background-color,border-color,color,transform] duration-150 ease-out-soft active:scale-[0.97]";
  const chip = (on: boolean) =>
    cn(
      "inline-flex min-h-11 flex-col items-start justify-center rounded-md border px-4 py-2 text-left",
      press,
      on ? "border-secondary bg-secondary text-ink" : "border-border-strong bg-card text-foreground hover:border-ink",
    );

  // Breakdown rows: what each part added or took away, in rupees.
  const rows: { label: string; detail: string; value: number; swatch?: string }[] = [
    ...SLEEVES.map((s) => ({
      label: s.name,
      detail: moves[s.id] === 0 ? "no change" : `${formatPct(moves[s.id] / 100, { digits: 0 })} on its share`,
      value: amount * r.contributions[s.id],
      swatch: SLEEVE_INFO[s.id].swatchOnInk,
    })),
    { label: "Rupee vs dollar", detail: rupeeWords(rupee).toLowerCase(), value: amount * r.rupeeEffect },
  ];
  const scale = Math.max(amount * 0.1, ...rows.map((x) => Math.abs(x.value)));

  return (
    <Section id="what-if" tone="alt" labelledBy="what-if-title">
      <SectionHead
        id="what-if-title"
        title={
          <>
            See how your money <Mark>could move</Mark>
          </>
        }
        lede="Pick a past year, or move the sliders yourself. It's an example, not a forecast."
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
        <Reveal className="space-y-8">
          <div>
            <p className="mb-3 text-body-md font-semibold text-foreground">If you invest</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Starting amount">
              {AMOUNTS.map((a) => (
                <button
                  key={a.value}
                  type="button"
                  aria-pressed={amount === a.value}
                  onClick={() => setAmount(a.value)}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full border px-4 text-body-md font-semibold num",
                    press,
                    amount === a.value ? "border-secondary bg-secondary text-ink" : "border-border-strong bg-card hover:border-ink",
                  )}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-body-md font-semibold text-foreground">Pick a year</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Example years">
              {PRESETS.map((p) => (
                <button key={p.id} type="button" aria-pressed={presetOn === p.id} onClick={() => apply(p.id)} className={chip(presetOn === p.id)}>
                  <span className="type-h5">{p.label}</span>
                  <span className={cn("text-body-sm", presetOn === p.id ? "text-ink" : "text-faint")}>{p.note}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-body-sm text-muted-foreground">
              Uses how the markets actually moved that year, rounded. Not the basket&rsquo;s past returns.
            </p>
          </div>

          <div className="space-y-4">
            {SLEEVES.map((s) => (
              <AdaptiveSlider
                key={s.id}
                label={s.name}
                min={-RANGE[s.id]}
                max={RANGE[s.id]}
                step={1}
                value={moves[s.id]}
                onChange={(v) => setMoves((m) => ({ ...m, [s.id]: v }))}
                format={move}
              />
            ))}

            <AdaptiveSlider
              label="Rupee vs dollar"
              min={-RUPEE_RANGE}
              max={RUPEE_RANGE}
              step={1}
              value={rupee}
              onChange={setRupee}
              format={rupeeWords}
              hint="A weaker rupee raises your value in rupees. A stronger rupee lowers it."
            />
          </div>

          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-1 text-body-md font-bold text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-150 hover:decoration-foreground"
          >
            <RotateCcw aria-hidden className="size-4" />
            Set everything back to zero
          </button>
        </Reveal>

        <Reveal delay={1} className="lg:sticky lg:top-24 lg:self-start">
          <article aria-labelledby="what-if-result" className="surface-ink rounded-xl p-6 shadow-lift sm:p-8">
            <h3 id="what-if-result" className="type-h6">
              After one year
            </h3>

            <p className="mt-6 text-body-md font-semibold text-grey-300">You would have</p>
            <Money value={r.inrValue} className="mt-1 block type-h1 text-secondary num" />
            <p className="mt-1 text-body-lg font-semibold num">
              <Money value={r.inrValue - amount} signed /> ({formatPct(r.inrChange)})
            </p>

            <Columns from={amount} to={r.inrValue} />

            <p className="mt-8 text-body-sm font-semibold text-grey-300">Where the change came from</p>
            <ul className="mt-1 divide-y divide-ink-2">
              {rows.map((row) => (
                <li key={row.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 py-3">
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-body-md font-bold">
                      {row.swatch && <span aria-hidden className={cn("size-2.5 shrink-0 rounded-full", row.swatch)} />}
                      {row.label}
                    </span>
                    <span className="block text-body-sm text-grey-300 num">{row.detail}</span>
                  </span>
                  <span className="text-right text-body-md font-bold num">{formatINR(row.value, { signed: true })}</span>
                  <Bar value={row.value} scale={scale} />
                </li>
              ))}
            </ul>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {formatINR(amount)} would become {formatINR(r.inrValue)}, {formatPct(r.inrChange)}. Example only.
            </p>

            <p className="mt-4 border-t border-ink-2 pt-4 text-body-sm text-grey-300">
              Example only, before fees and tax. You can lose money.
            </p>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}

/** What you put in beside what you'd have, drawn to the same scale. A second signal, so hidden from screen readers. */
function Columns({ from, to }: { from: number; to: number }) {
  const tallest = Math.max(from, to);
  const column = (value: number, tone: string, label: string) => (
    <div className="flex h-full flex-1 flex-col justify-end">
      <motion.div
        className={cn("rounded-t-md", tone)}
        initial={false}
        animate={{ height: `${(value / tallest) * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 34 }}
      />
      <span className="border-t border-ink-3 pt-2 text-body-sm text-grey-300">{label}</span>
    </div>
  );
  return (
    <div aria-hidden className="mt-6 flex h-40 gap-3">
      {column(from, "bg-grey-400", "If you invest")}
      {column(to, "bg-secondary", "You would have")}
    </div>
  );
}

/** A diverging bar from the centre: right and green for a gain, left and red for a loss. */
function Bar({ value, scale }: { value: number; scale: number }) {
  const w = `${Math.min(1, Math.abs(value) / scale) * 50}%`;
  return (
    <span aria-hidden className="relative col-span-2 block h-1 rounded-full bg-ink-2">
      <span className="absolute inset-y-[-2px] left-1/2 w-px bg-ink-4" />
      <span
        className={cn(
          "absolute inset-y-0 rounded-full transition-[width,left] duration-200 ease-out-soft",
          value >= 0 ? "left-1/2 bg-success" : "bg-error",
        )}
        style={value >= 0 ? { width: w } : { width: w, left: `calc(50% - ${w})` }}
      />
    </span>
  );
}
