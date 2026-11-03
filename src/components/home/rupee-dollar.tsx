"use client";

// "Why USD" (built on Concept B, B5.2), on the light theme: Main 3 gold line, error-tinted bands
// for the years the rupee got stronger, Greyscale 500/600 axis text at 12px or more.
// Three short reasons, then the rupee's own record, with both directions stated at the same size
// directly under the chart (R2).
// Client component because the chart measures its own width (so labels stay a real 12px on a
// 375px phone, audit B3) and has a hover / keyboard readout. Data and maths: @/lib/rupee.
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Globe, Plane, TrendingUp } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, Section, SectionHead } from "@/components/paraa/primitives";
import { formatPct, roundHalfUp } from "@/lib/format";
import { seriesWindow } from "@/lib/rupee";

const FROM = 2006;
const TO = 2026;
const ROWS = seriesWindow(FROM, TO);
const STRONG = ROWS.filter((r) => r.stronger).map((r) => r.year);
// Average yearly change in ₹ per US$ across the chart window: derived, not typed.
const SLIDE = (ROWS[ROWS.length - 1].rate / ROWS[0].rate) ** (1 / (TO - FROM)) - 1;

const REASONS = [
  {
    icon: TrendingUp,
    title: "The rupee usually weakens",
    body: `On average it lost about ${formatPct(SLIDE, { digits: 0, signed: false })} a year against the dollar over the last ${TO - FROM} years.`,
  },
  {
    icon: Plane,
    title: "Big costs are in dollars",
    body: "Studying abroad, foreign travel and imports like oil are all priced in dollars.",
  },
  {
    icon: Globe,
    title: "Don't keep it all in India",
    body: "Money held abroad isn't tied to how one country's economy does.",
  },
];

function listYears(ys: number[]): string {
  return ys.length < 2 ? ys.join("") : `${ys.slice(0, -1).join(", ")} and ${ys[ys.length - 1]}`;
}

function rateLabel(r: number): string {
  return "₹" + roundHalfUp(r, 2).toFixed(2);
}

function readout(year: number): string {
  const row = ROWS.find((r) => r.year === year)!;
  const pct = formatPct(Math.abs(row.change), { signed: false });
  return `${year}: ${rateLabel(row.rate)} per US$ · rupee ${pct} ${row.stronger ? "stronger" : "weaker"} than ${year - 1}`;
}

export function RupeeDollar() {
  return (
    <Section id="why-usd" labelledBy="rupee-title">
      <SectionHead
        id="rupee-title"
        eyebrow="Why USD"
        title="Why invest in US dollars?"
        lede={`In ${FROM}, one dollar cost about ₹${Math.round(ROWS[0].rate)}. Today it costs about ₹${Math.round(ROWS[ROWS.length - 1].rate)}.`}
      />

      <RevealGroup as="ul" className="mb-10 grid gap-4 md:grid-cols-3">
        {REASONS.map(({ icon: Icon, title, body }) => (
          <RevealItem as="li" key={title} className="flex gap-4 rounded-lg border bg-card p-5 shadow-card">
            <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-50 text-ink">
              <Icon className="size-5" />
            </span>
            <span>
              <span className="block type-h6">{title}</span>
              <span className="mt-1 block text-body-md text-muted-foreground">{body}</span>
            </span>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal>
        <figure className="m-0 rounded-lg border bg-card p-4 shadow-card sm:p-6">
          <h3 className="type-h6">
            Rupees for one US dollar, {FROM}&ndash;{TO}
          </h3>
          <RupeeChart />
          <figcaption className="mt-4 space-y-3 text-body-md text-muted-foreground">
            <span className="flex items-start gap-2">
              <span aria-hidden className="mt-1 inline-block size-4 shrink-0 rounded-xs border border-error/40 bg-error/10" />
              <span>
                Shaded years: the rupee got stronger ({listYears(STRONG)}). In those years, dollars bought fewer rupees.
              </span>
            </span>
            <span className="block rounded-md bg-background-alt p-3 text-foreground">
              When the rupee weakens, your investment is worth more in rupees. When it strengthens, it&rsquo;s worth less.
            </span>
            <span className="block text-body-sm text-faint">Approximate yearly averages. Past moves don&rsquo;t predict future ones.</span>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------------------------------ */

const MIN_RATE = 40;
const MAX_RATE = 90;

function RupeeChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(260, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const phone = width < 480;
  const H = phone ? 240 : 300;
  const padL = phone ? 40 : 48;
  const padR = phone ? 12 : 16;
  const top = 30;
  const bottom = H - 30;
  const step = (width - padL - padR) / (TO - FROM);
  const x = (y: number) => padL + (y - FROM) * step;
  const y = (r: number) => bottom - ((r - MIN_RATE) / (MAX_RATE - MIN_RATE)) * (bottom - top);

  const yTicks = phone ? [40, 60, 80] : [40, 50, 60, 70, 80, 90];
  const xTicks = phone ? [2006, 2010, 2018, 2026] : [2006, 2010, 2014, 2018, 2022, 2026];
  const path = ROWS.map((r, i) => `${i ? "L" : "M"}${x(r.year).toFixed(1)} ${y(r.rate).toFixed(1)}`).join(" ");
  const last = ROWS[ROWS.length - 1];

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const cur = active ?? TO;
    let next: number | null = null;
    if (e.key === "ArrowLeft") next = Math.max(FROM, cur - 1);
    else if (e.key === "ArrowRight") next = Math.min(TO, cur + 1);
    else if (e.key === "Home") next = FROM;
    else if (e.key === "End") next = TO;
    else if (e.key === "Escape") return setActive(null);
    if (next !== null) {
      e.preventDefault();
      setActive(next);
    }
  }

  const activeRow = active !== null ? ROWS.find((r) => r.year === active) : undefined;

  return (
    <div className="mt-4">
      <p
        aria-live="polite"
        className="num flex min-h-11 items-center rounded-md bg-muted px-3 text-body-sm text-muted-foreground sm:text-body-md"
      >
        {active !== null ? (
          <span className="text-foreground">{readout(active)}</span>
        ) : (
          <span>
            Today: <span className="text-foreground">{rateLabel(last.rate)} per US$</span>. Hover, tap or use the arrow keys
            to read each year.
          </span>
        )}
      </p>

      <div
        ref={wrapRef}
        tabIndex={0}
        role="group"
        aria-label="Rupee chart explorer. Use the left and right arrow keys to read each year."
        onKeyDown={onKey}
        onFocus={() => setActive((a) => a ?? TO)}
        onBlur={() => setActive(null)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
        className="mt-3 touch-pan-y rounded-md"
      >
        <svg
          width={width}
          height={H}
          viewBox={`0 0 ${width} ${H}`}
          role="img"
          aria-label={`Line chart of rupees per US dollar from ${FROM} to ${TO}, rising from about ${Math.round(ROWS[0].rate)} to ${Math.round(last.rate)}. The rupee strengthened in ${listYears(STRONG)}, shown as shaded bands where the line dips. In every other year it weakened.`}
          className="block h-auto max-w-full overflow-visible"
        >
          {/* grid + y axis */}
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={padL} x2={width - padR} y1={y(t)} y2={y(t)} stroke="var(--border)" strokeWidth={1} />
              <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize={12} fill="var(--faint)">
                ₹{t}
              </text>
            </g>
          ))}

          {/* rupee-strengthened bands: from the previous year to the year itself, where the line dips */}
          {STRONG.map((yr) => (
            <g key={yr}>
              <rect
                x={x(yr - 1)}
                y={top}
                width={step}
                height={bottom - top}
                fill="var(--color-error)"
                fillOpacity={0.1}
              />
              <text
                x={x(yr - 1) + step / 2}
                y={top - 10}
                textAnchor="middle"
                fontSize={12}
                fontWeight={700}
                fill="var(--muted-foreground)"
              >
                {phone ? `’${String(yr).slice(2)}` : yr}
              </text>
            </g>
          ))}

          {/* crosshair */}
          {activeRow && (
            <line
              x1={x(activeRow.year)}
              x2={x(activeRow.year)}
              y1={top}
              y2={bottom}
              stroke="var(--border-strong)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}

          <path
            d={path}
            fill="none"
            stroke="var(--chart-1)"
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* markers on the strengthened years, ringed with the card surface */}
          {ROWS.filter((r) => r.stronger).map((r) => (
            <circle
              key={r.year}
              cx={x(r.year)}
              cy={y(r.rate)}
              r={4.5}
              fill="var(--card)"
              stroke="var(--color-error)"
              strokeWidth={2}
            />
          ))}

          {activeRow && (
            <circle
              cx={x(activeRow.year)}
              cy={y(activeRow.rate)}
              r={5}
              fill="var(--chart-1)"
              stroke="var(--card)"
              strokeWidth={2}
            />
          )}

          {/* end label sits below the line end so it never covers it */}
          <text
            x={x(TO)}
            y={y(last.rate) + 22}
            textAnchor="end"
            fontSize={14}
            fontWeight={700}
            fill="var(--foreground)"
          >
            {rateLabel(last.rate)}
          </text>

          {/* x axis (thinned on phones) */}
          {xTicks.map((t, i) => (
            <text
              key={t}
              x={x(t)}
              y={H - 8}
              textAnchor={i === 0 ? "start" : i === xTicks.length - 1 ? "end" : "middle"}
              fontSize={12}
              fill="var(--faint)"
            >
              {t}
            </text>
          ))}

          {/* hit targets: one full-height column per year, wider than the mark */}
          {ROWS.map((r) => (
            <rect
              key={r.year}
              x={x(r.year) - step / 2}
              y={top}
              width={step}
              height={bottom - top}
              fill="transparent"
              onPointerEnter={() => setActive(r.year)}
              onPointerDown={() => setActive(r.year)}
            />
          ))}
        </svg>
      </div>

      {/* Visually hidden data table for screen readers (docs/build-brief.md accessibility rule). */}
      <div className="sr-only"><table>
        <caption>
          Approximate yearly average rupees per US dollar, {FROM} to {TO}, and the direction of each year&rsquo;s move
        </caption>
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Rupees per US$</th>
            <th scope="col">Change from the year before</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.year}>
              <th scope="row">{r.year}</th>
              <td>{rateLabel(r.rate)}</td>
              <td>
                Rupee {formatPct(Math.abs(r.change), { signed: false })} {r.stronger ? "stronger" : "weaker"}
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  );
}
