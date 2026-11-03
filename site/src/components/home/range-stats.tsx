// A5.4 "Both ends of the range": rule R8 made visible. The strongest and weakest month sit
// side by side at the same size; every figure is computed from the dataset, not typed in.
import { Card, Illustrative, Reveal, Section, SectionHead } from "@/components/paraa/primitives";
import { headline } from "@/lib/calc";
import { formatPct, monthLabel } from "@/lib/format";
import { INCEPTION_LABEL, NAV_DATA } from "@/lib/nav-data";
import { cn } from "@/lib/utils";

export function RangeStats() {
  const h = headline();
  const span = `${monthLabel(NAV_DATA[0][0])} to ${monthLabel(h.latestMonth)}`;

  const tiles = [
    {
      label: "Strongest month",
      value: formatPct(h.strongest),
      tone: "text-positive",
      source: `${monthLabel(h.strongestMonth)} · Basket 1 · in USD · net of fees`,
    },
    {
      label: "Weakest month",
      value: formatPct(h.weakest),
      tone: "text-negative",
      source: `${monthLabel(h.weakestMonth)} · Basket 1 · in USD · net of fees`,
    },
    {
      label: "Longest time underwater",
      value: h.underwaterMonths === null ? "Not yet recovered" : `${h.underwaterMonths} months`,
      tone: "",
      source: h.recoverMonth
        ? `${monthLabel(h.peakMonth)} → ${monthLabel(h.recoverMonth)}, back above the previous high`
        : `since ${monthLabel(h.peakMonth)}, still below the previous high`,
    },
    {
      label: "Months with a loss",
      value: `${h.negCount} of ${h.negTotal}`,
      tone: "",
      source: `${span} · Basket 1`,
    },
  ];

  return (
    <Section id="range" tone="alt" size="sm" labelledBy="range-title">
      <SectionHead id="range-title" eyebrow="Both ends of the range" title="The good month and the bad month, side by side" />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t, i) => (
          <Reveal as="li" key={t.label} delay={i + 1}>
            <Card className="flex h-full flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <span className="text-body-md font-semibold text-muted-foreground">{t.label}</span>
                <Illustrative />
              </div>
              <span className={cn("num type-h3", t.tone)}>{t.value}</span>
              <span className="mt-auto text-body-sm text-faint">{t.source}</span>
            </Card>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-10 max-w-[720px] border-l-2 border-border-strong pl-5">
        <p className="text-body-xl text-pretty">
          If a <span className="num font-bold">{formatPct(h.weakest)}</span> month would make you sell, this basket isn&apos;t for you. Better
          to know that now.
        </p>
        <p className="mt-2 text-body-sm text-muted-foreground">
          Basket 1, month-end NAV in US$, since {INCEPTION_LABEL}, net of fees. Time underwater runs from a high to the first month-end back above
          it. Illustrative.
        </p>
      </Reveal>
    </Section>
  );
}
