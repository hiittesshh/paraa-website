"use client";

// A5.5 Fee receipt: a specimen of the statement you'd get, recalculated for your amount.
// All maths is feeReceipt() in lib/calc (tested: ₹1,00,000 × 12 months × 0% → ₹2,472, 2.47%).
// Rule R5: the assumed return defaults to 0%, so the first thing you see is fees alone.
import { useState, type ReactNode } from "react";
import { Illustrative, Reveal, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";
import { AdaptiveSlider } from "@/components/watermelon/adaptive-slider";
import { Stepper } from "@/components/watermelon/stepper";
import { AMOUNT_MAX, AMOUNT_MIN, AMOUNT_STEPS, amountAt, positionFor } from "@/lib/amount-steps";
import { feeReceipt } from "@/lib/calc";
import { formatINR, formatPct } from "@/lib/format";
import { FEES } from "@/lib/nav-data";
import { cn } from "@/lib/utils";

const AMOUNT_PICKS = [
  { value: 50_000, label: "₹50,000" },
  { value: 1_00_000, label: "₹1 lakh" },
  { value: 5_00_000, label: "₹5 lakh" },
  { value: 10_00_000, label: "₹10 lakh" },
];
const MONTH_PICKS = [6, 12, 36, 60];
const MONTHS_MIN = 1;
const MONTHS_MAX = 60;

const rate = (f: number) => formatPct(f, { digits: 2, signed: false });
const months = (n: number) => `${n} ${n === 1 ? "month" : "months"}`;
const yearly = (pct: number) => `${formatPct(pct / 100)} a year`;

export function FeeReceipt() {
  const [pos, setPos] = useState(positionFor(1_00_000));
  const [t, setT] = useState(12);
  const [r, setR] = useState(0); // % a year
  const A = amountAt(pos);
  const res = feeReceipt(A, t, r / 100);
  const exitApplies = t < FEES.exitUnderMonths;

  const lines: { label: ReactNode; note?: string; amount: ReactNode; muted?: boolean }[] = [
    { label: `Currency conversion in (${rate(FEES.fxIn)})`, amount: formatINR(res.fxIn) },
    { label: `Entry fee (${rate(FEES.entry)})`, amount: formatINR(res.entry) },
    { label: `Management fee (${rate(FEES.mgmt)} a year, charged monthly)`, amount: formatINR(res.mgmt) },
    {
      label: (
        <>
          Performance fee: <ToConfirm />
        </>
      ),
      amount: "not included",
      muted: true,
    },
    {
      label: `Exit fee (${rate(FEES.exit)} if under ${FEES.exitUnderMonths} months)`,
      note: exitApplies ? `applies: held under ${FEES.exitUnderMonths} months` : `not charged: held ${FEES.exitUnderMonths} months or more`,
      amount: formatINR(res.exit),
    },
    { label: `Currency conversion out (${rate(FEES.fxOut)})`, amount: formatINR(res.fxOut) },
  ];

  const chip = (on: boolean) =>
    cn(
      "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-body-md font-semibold num transition-colors",
      on ? "border-foreground bg-foreground text-background" : "border-border-strong text-foreground hover:border-muted-foreground",
    );

  return (
    <Section id="fees" labelledBy="fees-title">
      <SectionHead
        id="fees-title"
        eyebrow="Fees, in rupees"
        title="Your fee receipt, before you invest"
        lede="This is the statement you'd get, for an amount you choose. Assumed return starts at zero, so you see what fees alone do to your money."
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
        <Reveal className="space-y-8">
          <div>
            <AdaptiveSlider
              label="Amount you invest"
              min={0}
              max={AMOUNT_STEPS.length - 1}
              step={1}
              value={pos}
              onChange={setPos}
              format={(p) => formatINR(amountAt(p))}
              hint={`${formatINR(AMOUNT_MIN)} to ${formatINR(AMOUNT_MAX)}. Steps of ₹5,000 up to ₹1 lakh, ₹25,000 up to ₹10 lakh, then ₹2.5 lakh.`}
            />
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Quick amounts">
              {AMOUNT_PICKS.map((p) => (
                <button key={p.value} type="button" aria-pressed={A === p.value} onClick={() => setPos(positionFor(p.value))} className={chip(A === p.value)}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Stepper label="How long you hold it" unit={(n) => (n === 1 ? "month" : "months")} value={t} min={MONTHS_MIN} max={MONTHS_MAX} onChange={setT} />
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Quick holding periods">
              {MONTH_PICKS.map((m) => (
                <button key={m} type="button" aria-pressed={t === m} onClick={() => setT(m)} className={chip(t === m)}>
                  {months(m)}
                </button>
              ))}
            </div>
            <p className="mt-2 text-body-sm text-muted-foreground">
              {MONTHS_MIN} to {MONTHS_MAX} months. Under {FEES.exitUnderMonths} months, an exit fee applies.
            </p>
          </div>

          <AdaptiveSlider
            label="Assumed return in USD"
            min={-20}
            max={20}
            step={0.5}
            value={r}
            onChange={setR}
            format={yearly}
            hint="−20% to +20% a year. Starts at 0%, so only fees move. Illustrative, not a forecast."
          />

          <div className="rounded-md border border-border bg-muted p-4 text-body-md">
            <p>
              <strong>
                Tax collected at source (<abbr title="tax collected at source">TCS</abbr>):
              </strong>{" "}
              <ToConfirm />. TCS is not a fee. It is tax collected upfront that you may be able to claim back when you file. Ask your CA.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <article aria-labelledby="receipt-title" className="rounded-lg border border-border-strong bg-card p-5 sm:p-8">
            <header className="mb-5 space-y-3 border-b border-border pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 id="receipt-title" className="type-h6">
                  Specimen fee statement
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Illustrative />
                  <ToConfirm>Fee rates TO CONFIRM</ToConfirm>
                </div>
              </div>
              <p className="text-body-sm text-muted-foreground">
                Amount invested <span className="num font-semibold text-foreground">{formatINR(A)}</span> · held{" "}
                <span className="num font-semibold text-foreground">{months(t)}</span> · assumed return{" "}
                <span className="num font-semibold text-foreground">{yearly(r)}</span>
              </p>
            </header>

            <ul className="divide-y divide-dashed divide-border-strong">
              {lines.map((l, i) => (
                <li key={i} className="flex items-baseline justify-between gap-4 py-3 text-body-md">
                  <span className="min-w-0">
                    {l.label}
                    {l.note && <span className="block text-body-sm text-muted-foreground">{l.note}</span>}
                  </span>
                  <span className={cn("num shrink-0 text-right font-semibold", l.muted && "font-normal text-muted-foreground")}>{l.amount}</span>
                </li>
              ))}
            </ul>

            <div className="mt-2 border-t-2 border-foreground/80 pt-4">
              <div className="flex items-baseline justify-between gap-4 text-body-lg font-bold">
                <span>Total paid to us and our partners</span>
                <span className="num shrink-0 text-right">
                  {formatINR(res.total)} <span className="text-muted-foreground">({rate(res.costPct)})</span>
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4 rounded-md bg-muted px-4 py-3">
                <span className="text-body-lg font-bold">You receive</span>
                <span className="num type-h4 shrink-0 text-right">{formatINR(res.net)}</span>
              </div>
            </div>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              On {formatINR(A)} for {months(t)} at an assumed {yearly(r)}, you would pay {formatINR(res.total)} in fees ({rate(res.costPct)}) and
              receive {formatINR(res.net)}. Illustrative.
            </p>

            <div className="mt-6 space-y-2 border-t border-dashed border-border-strong pt-4 text-body-sm text-muted-foreground">
              <p>
                Specimen · Illustrative fees · Exchange rate fixed at ₹88.00 per US$ so only fees move. In real life, the rate moves too: a
                weaker rupee raises your rupee value; a stronger rupee lowers it.
              </p>
              <p>Lines are rounded to the nearest rupee; the total is added up before rounding, so the lines may not sum to it exactly.</p>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
