"use client";

// The tax estimator: a year's profit (or loss) from the basket and your slab rate in, tax out.
// Maths: lib/tax estimateTax() (tested). Deliberately simple and says so: no surcharge, rebate or
// regime maths, because those depend on the rest of your income. The starting point is a ₹1 lakh
// profit at the 30% slab, the case that shows the most tax, so it never flatters (R5).
import { useState, type ReactNode } from "react";
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

  return (
    <article aria-labelledby="tax-est-title" className="rounded-xl border bg-card p-5 shadow-card sm:p-7">
      <h3 id="tax-est-title" className="type-h6">
        Tax calculator
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

      <fieldset className="mt-6 min-w-0 border-0 p-0">
        <legend className="mb-3 p-0 text-body-md font-semibold text-foreground">Your income tax slab</legend>
        <div className="flex flex-wrap gap-2">
          {SLAB_RATES.map((r) => (
            <label
              key={r}
              className={cn(
                "inline-flex min-h-11 min-w-14 cursor-pointer items-center justify-center rounded-full border px-4 text-body-md font-semibold num transition-colors duration-200 ease-out-soft",
                "has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-ring",
                slab === r ? "border-ink bg-ink text-primary-foreground" : "border-border-strong bg-card hover:border-ink",
              )}
            >
              <input type="radio" name="slab" value={r} checked={slab === r} onChange={() => setSlab(r)} className="sr-only" />
              {formatPct(r, { digits: 0, signed: false })}
            </label>
          ))}
        </div>
      </fieldset>

      <dl className="mt-6 divide-y divide-dashed divide-border-strong border-t border-dashed border-border-strong">
        <Row label="Tax when you invest" value={formatINR(0)} />
        {loss ? (
          <>
            <Row label="Tax on a loss" value={formatINR(0)} />
            <Row label="Loss you can carry forward" value={<Money value={t.lossCarried} />} />
          </>
        ) : (
          <Row
            label={`Tax on profit (${formatPct(slab, { digits: 0, signed: false })} + 4% cess)`}
            value={<Money value={t.tax} />}
          />
        )}
      </dl>

      {!loss && (
        <div className="mt-4 flex items-baseline justify-between gap-4 rounded-lg bg-ink px-5 py-4 text-primary-foreground">
          <span className="text-body-lg font-bold">You keep</span>
          <Money value={t.keep} className="type-h4 num" />
        </div>
      )}

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {loss
          ? `No tax. A loss of ${formatINR(t.lossCarried)} can be carried forward.`
          : `Tax ${formatINR(t.tax)} on a profit of ${formatINR(profit)} at the ${formatPct(slab, { digits: 0, signed: false })} slab. You keep ${formatINR(t.keep)}.`}
      </p>

      <p className="mt-5 text-body-sm text-muted-foreground">Estimate only. Doesn&rsquo;t include surcharge or rebates.</p>
    </article>
  );
}

function Row({ label, value, note }: { label: string; value: ReactNode; note?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="min-w-0 text-body-md text-muted-foreground">
        {label}
        {note && <span className="mt-0.5 block text-body-sm text-faint">{note}</span>}
      </dt>
      <dd className="shrink-0 text-right text-body-lg font-bold text-foreground num">{value}</dd>
    </div>
  );
}
