"use client";

// "Why USD" (built on Concept B, B5.2), a dark band: a gold line that draws as you scroll while a
// big rupee figure counts up beside it, quiet bands for the years the rupee got stronger, axis text
// at 12px or more. Scroll-linked, so it moves only as you scroll and scrolling is never taken over;
// with reduced motion it's simply complete. The rupee's own record carries the section, with both
// directions stated at the same size directly under the chart (R2), then three short reasons.
// Client component because the chart measures its own width (so labels stay a real 12px on a
// 375px phone, audit B3) and has a hover / keyboard readout. Data and maths: @/lib/rupee.
import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import NumberFlow from "@number-flow/react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal, RevealGroup, RevealItem, Section, SectionHead } from "@/components/paraa/primitives";
import { Mark } from "@/components/paraa/mark";
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
    title: "The rupee usually weakens",
    body: `On average it lost about ${formatPct(SLIDE, { digits: 0, signed: false })} a year against the dollar over the last ${TO - FROM} years.`,
  },
  {
    title: "Big costs are in dollars",
    body: "Studying abroad, foreign travel and imports like oil are all priced in dollars.",
  },
  {
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
    <Section id="why-usd" labelledBy="rupee-title" className="surface-ink">
      <SectionHead
        id="rupee-title"
        className="[&_p]:text-grey-300"
        title={
          <>
            Why invest in <Mark>US dollars?</Mark>
          </>
        }
        lede={`In ${FROM}, one dollar cost about ₹${Math.round(ROWS[0].rate)}. Today it costs about ₹${Math.round(ROWS[ROWS.length - 1].rate)}.`}
      />

      <Reveal>
        <figure className="m-0">
          <h3 className="type-h6">
            Rupees for one US dollar, {FROM}&ndash;{TO}
          </h3>
          <RupeeChart />
          <figcaption className="mt-6 grid gap-x-16 gap-y-4 text-body-md text-grey-300 lg:grid-cols-2">
            <span className="block text-body-lg font-semibold text-primary-foreground">
              When the rupee weakens, your investment is worth more in rupees. When it strengthens, it&rsquo;s worth less.
            </span>
            <span className="block space-y-2">
              <span className="flex items-start gap-2">
                <span aria-hidden className="mt-1 inline-block size-4 shrink-0 rounded-xs border border-ink-3 bg-ink-2" />
                <span>
                  Shaded years: the rupee got stronger ({listYears(STRONG)}). In those years, dollars bought fewer rupees.
                </span>
              </span>
              <span className="block text-body-sm text-grey-400">Approximate yearly averages. Past moves don&rsquo;t predict future ones.</span>
            </span>
          </figcaption>
        </figure>
      </Reveal>

      <RevealGroup as="ul" className="mt-16 grid gap-8 border-t border-ink-2 pt-8 md:grid-cols-3 md:gap-12">
        {REASONS.map(({ title, body }) => (
          <RevealItem as="li" key={title}>
            <h3 className="type-h6">{title}</h3>
            <p className="mt-2 text-body-lg text-grey-300">{body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ------------------------------------------------------------------------------------------ */

const MIN_RATE = 40;
const MAX_RATE = 90;
const WHOLE_RUPEES = { style: "currency", currency: "INR", maximumFractionDigits: 0 } as const;

// true only after hydration (same pattern as hero.tsx): the server renders the finished chart.
const noop = () => () => {};
const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);

function RupeeChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const live = useHydrated() && !reduce;

  // 0 as the chart enters the screen, 1 once its middle is a little above the centre.
  const { scrollYProgress: drawn } = useScroll({ target: wrapRef, offset: ["start 90%", "center 55%"] });
  const areaOpacity = useTransform(drawn, [0.85, 1], [0, 1]);
  const [count, setCount] = useState(ROWS[ROWS.length - 1].rate);
  useMotionValueEvent(drawn, "change", (p) => {
    if (live) setCount(ROWS[0].rate + (ROWS[ROWS.length - 1].rate - ROWS[0].rate) * p);
  });

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
  const area = `${path} L${x(TO).toFixed(1)} ${bottom} L${x(FROM).toFixed(1)} ${bottom} Z`;
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
      <span aria-hidden className="block type-h1 text-secondary num">
        <NumberFlow value={Math.round(activeRow ? activeRow.rate : count)} locales="en-IN" format={WHOLE_RUPEES} />
      </span>
      <p
        aria-live="polite"
        className="num flex min-h-11 items-center text-body-sm text-grey-300 sm:text-body-md"
      >
        {active !== null ? (
          <span className="text-primary-foreground">{readout(active)}</span>
        ) : (
          <span>
            Today: <span className="text-primary-foreground">{rateLabel(last.rate)} per US$</span>. Hover, tap or use the arrow
            keys to read each year.
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
          <defs>
            <linearGradient id="rupee-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--color-gold-500)" stopOpacity={0.35} />
              <stop offset="1" stopColor="var(--color-gold-500)" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* rupee-strengthened bands: from the previous year to the year itself, where the line dips */}
          {STRONG.map((yr) => (
            <g key={yr}>
              <rect x={x(yr - 1)} y={top} width={step} height={bottom - top} fill="var(--color-ink-2)" />
              <text
                x={x(yr - 1) + step / 2}
                y={top - 10}
                textAnchor="middle"
                fontSize={12}
                fontWeight={700}
                fill="var(--color-grey-300)"
              >
                {phone ? `’${String(yr).slice(2)}` : yr}
              </text>
            </g>
          ))}

          {/* grid + y axis, above the bands so the lines stay continuous */}
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={padL} x2={width - padR} y1={y(t)} y2={y(t)} stroke="var(--color-ink-2)" strokeWidth={1} />
              <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize={12} fill="var(--color-grey-400)">
                ₹{t}
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
              stroke="var(--color-grey-400)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}

          <motion.path d={area} fill="url(#rupee-area)" style={live ? { opacity: areaOpacity } : undefined} />
          <motion.path
            d={path}
            fill="none"
            stroke="var(--color-gold-500)"
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            style={live ? { pathLength: drawn } : undefined}
          />

          {/* markers on the strengthened years, ringed with the card surface */}
          {ROWS.filter((r) => r.stronger).map((r) => (
            <circle
              key={r.year}
              cx={x(r.year)}
              cy={y(r.rate)}
              r={4.5}
              fill="var(--color-ink)"
              stroke="var(--color-error)"
              strokeWidth={2}
            />
          ))}

          {activeRow && (
            <circle
              cx={x(activeRow.year)}
              cy={y(activeRow.rate)}
              r={5}
              fill="var(--color-gold-500)"
              stroke="var(--color-ink)"
              strokeWidth={2}
            />
          )}

          {/* end label sits above the line end, in the empty corner, so it never covers it */}
          <text
            x={x(TO)}
            y={y(last.rate) - 12}
            textAnchor="end"
            fontSize={14}
            fontWeight={700}
            fill="var(--primary-foreground)"
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
              fill="var(--color-grey-400)"
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
