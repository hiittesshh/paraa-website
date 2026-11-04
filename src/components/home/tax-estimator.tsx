"use client";

// The tax estimator: a year's profit (or loss) from the basket and your slab rate in, tax out. It
// assumes profit is business income at your slab, which still needs a CA's sign-off.
// Maths: lib/tax estimateTax() (tested). Deliberately simple and says so: no surcharge, rebate or
// regime maths, because those depend on the rest of your income. The starting point is a ₹1 lakh
// profit at the 30% slab, the case that shows the most tax, so it never flatters (R5).
// A dark panel with the answer as the biggest thing on it, and a bar that splits the profit into
// what you keep and what goes in tax (a second signal; the figures carry the meaning).
import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Money } from "@/components/paraa/money";
import { AdaptiveSlider } from "@/components/watermelon/adaptive-slider";
import { formatINR, formatPct } from "@/lib/format";
import { SLAB_RATES, estimateTax } from "@/lib/tax";
import { cn } from "@/lib/utils";

const MIN = -5_00_000;
const MAX = 20_00_000;
const STEP = 10_000;

export function TaxEstimator() {
  const [profit, setProfit] = useState(1_00_000);
  const [slab, setSlab] = useState(0.3);
  const t = estimateTax(profit, slab);
  const loss = profit < 0;
  const keptShare = profit > 0 ? (t.keep / profit) * 100 : 100;

  return (
    <article aria-labelledby="tax-est-title" className="surface-ink rounded-xl p-6 shadow-lift sm:p-8">
      <h3 id="tax-est-title" className="type-h6">
        Tax estimate
      </h3>

      <AdaptiveSlider
        className="mt-5"
        label="Your profit or loss in a year"
        min={MIN}
        max={MAX}
        step={STEP}
        value={profit}
        onChange={setProfit}
        format={(v) => formatINR(v, { signed: true })}
      />

      <fieldset className="mt-5 min-w-0 border-0 p-0">
        <legend className="mb-3 p-0 text-body-md font-semibold">Your income tax slab</legend>
        <div className="flex flex-wrap gap-2">
          {SLAB_RATES.map((r) => (
            <label
              key={r}
              className={cn(
                "inline-flex min-h-11 min-w-14 cursor-pointer items-center justify-center rounded-full border px-4 text-body-md font-semibold num transition-[background-color,border-color,color,transform] duration-150 ease-out-soft active:scale-[0.97]",
                "has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-ring",
                slab === r ? "border-secondary bg-secondary text-ink" : "border-ink-4 hover:border-grey-300",
              )}
            >
              <input type="radio" name="slab" value={r} checked={slab === r} onChange={() => setSlab(r)} className="sr-only" />
              {formatPct(r, { digits: 0, signed: false })}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 border-t border-ink-3 pt-6">
        <p className="text-body-md font-semibold text-grey-300">{loss ? "Your loss for the year" : "You'd keep"}</p>
        <Money value={loss ? t.lossCarried : t.keep} className="mt-1 block type-h1 text-secondary num" />
      </div>

      <div aria-hidden className="mt-4 flex h-3 gap-0.5 overflow-hidden rounded-full bg-ink-3">
        <motion.div
          className="bg-secondary"
          initial={false}
          animate={{ width: `${keptShare}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 34 }}
        />
        <div className="flex-1 bg-grey-400" />
      </div>

      <dl className="mt-4 divide-y divide-ink-3">
        {loss ? (
          <Row label="Tax on a loss" value={formatINR(0)} />
        ) : (
          <Row
            label={`Tax on profit (${formatPct(slab, { digits: 0, signed: false })} + 4% cess, an add-on to income tax)`}
            value={<Money value={t.tax} />}
          />
        )}
      </dl>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {loss
          ? `No tax on a loss of ${formatINR(t.lossCarried)}. Whether it can be carried forward depends on how this income is classified.`
          : `Tax ${formatINR(t.tax)} on a profit of ${formatINR(profit)} at the ${formatPct(slab, { digits: 0, signed: false })} slab. You'd keep ${formatINR(t.keep)}.`}
      </p>

      <p className="mt-3 text-body-sm text-grey-300">Estimate only. It assumes profit is taxed as business income at your slab, and leaves out surcharge and rebates. If the basket counts as a virtual digital asset, tax is a flat 30% plus cess, whatever your slab. A CA can confirm your own tax.</p>
    </article>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="min-w-0 text-body-md text-grey-300">{label}</dt>
      <dd className="shrink-0 text-right text-body-lg font-bold num">{value}</dd>
    </div>
  );
}
