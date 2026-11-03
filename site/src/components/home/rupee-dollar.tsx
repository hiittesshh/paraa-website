"use client";

// Section 5: "The rupee, honestly" (Concept B, B5.2), on the light theme: Main 3 gold line, error-tinted bands for
// the years the rupee got stronger, Greyscale 500/600 axis text at 12px or more.
// Client component because the chart measures its own width (so labels stay a real 12px on a
// 375px phone, audit B3) and has a hover / keyboard readout. Data and maths: @/lib/rupee.
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CalendarClock, TrendingDown, TrendingUp } from "lucide-react";
import { Card, Illustrative, Reveal, RevealGroup, RevealItem, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";
import { formatINR, formatPct, formatUSD, roundHalfUp } from "@/lib/format";
import { birthYearResult, seriesWindow } from "@/lib/rupee";

const FROM = 2006;
const TO = 2026;
const ROWS = seriesWindow(FROM, TO);
const STRONG = ROWS.filter((r) => r.stronger).map((r) => r.year);
const SAMPLE = birthYearResult(1995);
const AMOUNT = 100000;
const MOVE = 0.05;

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
    <Section id="rupee" tone="alt" labelledBy="rupee-title">
      <SectionHead
        id="rupee-title"
        eyebrow="Both directions"
        title="Mostly one way. Not always."
        lede={
          <>
            Since {FROM}, the rupee has mostly weakened against the dollar. But it strengthened in {listYears(STRONG)}. If
            you&rsquo;d needed rupees in one of those years, dollars bought fewer of them.
          </>
        }
      />

      <Reveal>
        <figure className="m-0 rounded-lg border bg-card p-4 shadow-card sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="type-h6">
              Rupees per US dollar, annual average, {FROM}&ndash;{TO}
            </h3>
            <Illustrative />
          </div>
          <RupeeChart />
          <figcaption className="mt-4 space-y-2 text-body-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span aria-hidden className="inline-block size-4 shrink-0 rounded-xs border border-error/40 bg-error/10" />
              Shaded: a year the rupee got stronger (fewer rupees per dollar). Unshaded: a year it got weaker.
            </span>
            <span className="block text-faint">
              Illustrative annual averages · live: RBI/FBIL reference rate <ToConfirm /> · past movements don&rsquo;t predict
              future ones.
            </span>
          </figcaption>
        </figure>
      </Reveal>

      <RevealGroup className="mt-6 grid gap-4 md:grid-cols-2">
        <RevealItem className="h-full">
          <Card className="h-full border-l-4 border-l-success">
            <p className="flex items-center gap-3 text-body-md font-bold text-foreground">
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-success/15 text-ink">
                <TrendingUp className="size-5" />
              </span>
              When it helps
              <Illustrative className="ml-auto" />
            </p>
            <p className="mt-3 text-body-lg text-muted-foreground">
              If you invest {formatINR(AMOUNT)} and the rupee weakens {formatPct(MOVE, { digits: 0, signed: false })}, your
              holding is worth about <strong className="num text-foreground">{formatINR(AMOUNT * (1 + MOVE))}</strong> before
              any investment gain or loss.
            </p>
          </Card>
        </RevealItem>
        <RevealItem className="h-full">
          <Card className="h-full border-l-4 border-l-error">
            <p className="flex items-center gap-3 text-body-md font-bold text-foreground">
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-error/10 text-ink">
                <TrendingDown className="size-5" />
              </span>
              When it hurts
              <Illustrative className="ml-auto" />
            </p>
            <p className="mt-3 text-body-lg text-muted-foreground">
              If the rupee strengthens {formatPct(MOVE, { digits: 0, signed: false })}, the same holding is worth about{" "}
              <strong className="num text-foreground">{formatINR(AMOUNT * (1 - MOVE))}</strong>, even if the investment
              didn&rsquo;t move.
            </p>
          </Card>
        </RevealItem>
      </RevealGroup>

      {/* B3's birth-year calculator is not part of B5.2, so it is only previewed here, with its sample year. */}
      <Reveal className="mt-4">
        <div className="flex flex-col gap-4 rounded-lg border border-dashed border-border-strong bg-card p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6">
          <span className="grid size-11 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground" aria-hidden>
            <CalendarClock className="size-5" />
          </span>
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-body-lg font-bold">What has the rupee done since you were born?</p>
              <span className="rounded-full border border-border-strong px-2.5 py-0.5 text-body-sm font-bold text-muted-foreground">
                Calculator coming soon
              </span>
            </div>
            <p className="text-body-md text-muted-foreground">
              Example, {SAMPLE.year}: {formatINR(1000)} bought{" "}
              <strong className="num text-foreground">{formatUSD(SAMPLE.usdThen, { cents: true })}</strong>. Those same dollars
              buy <strong className="num text-foreground">{formatINR(SAMPLE.inrToday)}</strong> today.
            </p>
            <p className="text-body-md text-muted-foreground">
              But in{" "}
              <strong className="text-foreground">
                {SAMPLE.strongYrs} of the {SAMPLE.yearsSince} years
              </strong>{" "}
              since, the rupee got stronger. The worst was{" "}
              <strong className="num text-foreground">
                {SAMPLE.worstYr}: {formatPct(SAMPLE.worstPct!)}
              </strong>{" "}
              for anyone holding dollars.
            </p>
            <p className="flex flex-wrap items-center gap-2 text-body-sm text-faint">
              This is the currency alone, not an investment. Part of the rupee&rsquo;s fall reflects India&rsquo;s higher
              inflation, so prices here rose too.
              <Illustrative />
            </p>
          </div>
        </div>
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

      {/* Visually hidden data table for screen readers (BUILD-BRIEF accessibility rule). */}
      <div className="sr-only"><table>
        <caption>
          Illustrative annual average rupees per US dollar, {FROM} to {TO}, and the direction of each year&rsquo;s move
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
