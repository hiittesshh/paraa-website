"use client";

// Hand-built responsive SVG NAV chart (no chart library), ported from the prototype's
// renderChart() in concept-a/concept.js and finished:
// - the SVG is drawn at the container's real pixel width, so 12px text stays 12px on a phone;
// - x labels thin to calendar boundaries (every 1/2/3/6/12 months) so they never collide;
// - the deepest peak→trough stretch inside the range is always shaded (spec A5 §3);
// - one crosshair + tooltip, driven by pointer (snaps to the nearest month) and by keyboard
//   (roving-tabindex point buttons, arrow keys / Home / End), showing the same details;
// - a visually hidden table carries every value for screen readers.
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { drawdown, monthEndISO, monthlyReturns, navs, rangeReturn } from "@/lib/calc";
import { nearestIndex, niceTicks, xLabelIndices, xLabelStep } from "@/lib/chart-scale";
import { dateLabel, formatPct, formatUSD, monthLabel } from "@/lib/format";
import { NAV_DATA, SHOW_PERFORMANCE, type NavPoint } from "@/lib/nav-data";
import { signTone } from "@/lib/tone";
import { cn } from "@/lib/utils";

const PAD = { l: 52, r: 16, t: 30, b: 34 };
const usd = (v: number) => formatUSD(v, { short: true, cents: true });

export function NavChart({
  from,
  to,
  data = NAV_DATA,
  basket = "Basket 1",
  className,
}: {
  from: number;
  to: number;
  data?: readonly NavPoint[];
  basket?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef(new Map<number, HTMLButtonElement>());
  const [width, setWidth] = useState(720);
  const [hover, setHover] = useState<number | null>(null);
  const [focusIdx, setFocusIdx] = useState<number | null>(null);
  const [roving, setRoving] = useState<number | null>(null);

  // Redraw at the container's real width. A chart inside a hidden tab reports 0: keep the last width.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const V = useMemo(() => navs(data), [data]);
  const MR = useMemo(() => monthlyReturns(V), [V]);

  const W = Math.max(280, width);
  const H = W < 480 ? 248 : Math.round(Math.min(340, Math.max(270, W * 0.38)));
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const n = to - from;

  const slice = V.slice(from, to + 1);
  const { lo, hi, ticks } = niceTicks(Math.min(...slice), Math.max(...slice), 5);
  const x = (i: number) => PAD.l + (n === 0 ? plotW / 2 : ((i - from) / n) * plotW);
  const y = (v: number) => PAD.t + (1 - (v - lo) / (hi - lo)) * plotH;

  const dd = drawdown(V, from, to);
  const ret = rangeReturn(V, from, to);
  const labelIdx = xLabelIndices(data, from, to, xLabelStep(n === 0 ? plotW : plotW / n));

  const path = slice.map((v, k) => `${k === 0 ? "M" : "L"}${x(from + k).toFixed(1)} ${y(v).toFixed(1)}`).join("");

  // One active month for crosshair + tooltip: keyboard focus wins over the pointer.
  const active = focusIdx ?? hover;
  const tabStop = roving !== null && roving >= from && roving <= to ? roving : to;

  const pointLabel = (i: number) =>
    `${monthLabel(data[i][0])}, NAV ${V[i].toFixed(2)}, ${MR[i] === null ? "inception" : formatPct(MR[i]!)}`;

  const ddLabel = `Largest fall ${formatPct(dd.max)}`;
  const ddLabelW = ddLabel.length * 7;
  const ddLeft = x(dd.peakIdx);
  const ddRight = x(dd.troughIdx);
  const ddAnchorEnd = ddLeft + 6 + ddLabelW > W - PAD.r;

  const ariaLabel =
    `${basket} NAV in US dollars, ${monthLabel(data[from][0])} to ${monthLabel(data[to][0])}.` +
    (SHOW_PERFORMANCE ? ` Return ${formatPct(ret)}.` : "") +
    ` Largest fall ${formatPct(dd.max)}` +
    (dd.max < 0 ? `, ${monthLabel(data[dd.peakIdx][0])} to ${monthLabel(data[dd.troughIdx][0])}` : "") +
    ". Illustrative.";

  const onPointer = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHover(nearestIndex(e.clientX - rect.left, PAD.l, plotW, from, to));
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = {
      ArrowRight: Math.min(to, i + 1),
      ArrowUp: Math.min(to, i + 1),
      ArrowLeft: Math.max(from, i - 1),
      ArrowDown: Math.max(from, i - 1),
      Home: from,
      End: to,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setRoving(next);
    pointRefs.current.get(next)?.focus();
  };

  // Tooltip position: above the point, flipped below near the top, clamped inside the card.
  const tipLeft = active === null ? 0 : Math.min(W - 96, Math.max(96, x(active)));
  const tipBelow = active !== null && y(V[active]) < 110;
  const ddAtActive = active === null ? 0 : dd.series[active - from];

  return (
    <div className={cn("relative", className)}>
      <div
        ref={wrapRef}
        className="relative w-full touch-pan-y select-none"
        onPointerMove={onPointer}
        onPointerDown={onPointer}
        onPointerLeave={() => setHover(null)}
      >
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={ariaLabel}
          className="block h-auto max-w-full overflow-visible"
        >
          {/* drawdown shade (peak → trough), behind everything */}
          {dd.max < 0 && (
            <g>
              <rect
                x={ddLeft}
                y={PAD.t}
                width={Math.max(2, ddRight - ddLeft)}
                height={plotH}
                fill="var(--negative)"
                fillOpacity={0.12}
              />
              <line x1={ddLeft} x2={ddLeft} y1={PAD.t} y2={PAD.t + plotH} stroke="var(--negative)" strokeOpacity={0.45} strokeDasharray="3 3" />
              <line x1={ddRight} x2={ddRight} y1={PAD.t} y2={PAD.t + plotH} stroke="var(--negative)" strokeOpacity={0.45} strokeDasharray="3 3" />
              <text
                x={ddAnchorEnd ? ddRight - 6 : ddLeft + 6}
                y={PAD.t - 10}
                textAnchor={ddAnchorEnd ? "end" : "start"}
                fill="var(--foreground)"
                className="num text-[12px] font-semibold"
              >
                {ddLabel}
              </text>
            </g>
          )}

          {/* y grid + ticks (recessive) */}
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="var(--border)" strokeWidth={1} />
              <text x={PAD.l - 8} y={y(t) + 4} textAnchor="end" fill="var(--muted-foreground)" className="num text-[12px]">
                {usd(t)}
              </text>
            </g>
          ))}

          {/* x labels, thinned to calendar boundaries */}
          {labelIdx.map((i) => {
            const px = x(i);
            const anchor = px - 30 < PAD.l - 8 ? "start" : px + 30 > W ? "end" : "middle";
            return (
              <text key={i} x={px} y={H - 10} textAnchor={anchor} fill="var(--muted-foreground)" className="num text-[12px]">
                {monthLabel(data[i][0])}
              </text>
            );
          })}

          {/* crosshair */}
          {active !== null && (
            <line x1={x(active)} x2={x(active)} y1={PAD.t} y2={PAD.t + plotH} stroke="var(--border-strong)" strokeWidth={1} />
          )}

          {/* the NAV line: gold, 2px (spec A5 §3 / A8) */}
          <path d={path} fill="none" stroke="var(--chart-1)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          {/* end point, directly labelled */}
          <circle cx={x(to)} cy={y(V[to])} r={4} fill="var(--chart-1)" stroke="var(--card)" strokeWidth={2} />
          {active === null && (
            <text x={x(to) - 8} y={y(V[to]) - 10} textAnchor="end" fill="var(--foreground)" className="num text-[12px] font-bold">
              {usd(V[to])}
            </text>
          )}

          {active !== null && (
            <circle cx={x(active)} cy={y(V[active])} r={5} fill="var(--chart-1)" stroke="var(--card)" strokeWidth={2} />
          )}
        </svg>

        {/* Keyboard layer: one tab stop, arrows move between months. Pointer handled above. */}
        <div
          role="group"
          aria-label="Monthly NAV points. Use the arrow keys to move between months."
          className="pointer-events-none absolute inset-0"
        >
          {Array.from({ length: n + 1 }, (_, k) => {
            const i = from + k;
            return (
              <button
                key={i}
                ref={(el) => {
                  if (el) pointRefs.current.set(i, el);
                  else pointRefs.current.delete(i);
                }}
                type="button"
                tabIndex={i === tabStop ? 0 : -1}
                aria-label={`${pointLabel(i)}. Illustrative.`}
                onFocus={() => {
                  setFocusIdx(i);
                  setRoving(i);
                }}
                onBlur={() => setFocusIdx(null)}
                onKeyDown={(e) => onKey(e, i)}
                className="absolute size-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent outline-none focus-visible:outline-3 focus-visible:outline-offset-0 focus-visible:outline-ring"
                style={{ left: x(i), top: y(V[i]) }}
              />
            );
          })}
        </div>

        {active !== null && (
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute z-10 w-44 -translate-x-1/2 rounded-md border border-border-strong bg-popover px-3 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
              tipBelow ? "translate-y-4" : "-translate-y-[calc(100%+16px)]",
            )}
            style={{ left: tipLeft, top: y(V[active]) }}
          >
            <p className="text-body-sm text-muted-foreground">{dateLabel(monthEndISO(data[active][0]))}</p>
            <p className="num text-body-xl leading-tight font-extrabold">{usd(V[active])}</p>
            <dl className="mt-1.5 space-y-0.5 text-body-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Month</dt>
                <dd className={cn("num font-bold", signTone(MR[active]))}>{MR[active] === null ? "Inception" : formatPct(MR[active]!)}</dd>
              </div>
              {ddAtActive < 0 && (
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Below high</dt>
                  <dd className="num font-bold text-negative">{formatPct(ddAtActive)}</dd>
                </div>
              )}
            </dl>
            <p className="mt-1.5 text-body-sm text-faint">Illustrative</p>
          </div>
        )}
      </div>

      <div className="sr-only"><table>
        <caption>
          {basket} month-end NAV in US dollars, {monthLabel(data[from][0])} to {monthLabel(data[to][0])}, with the change on the month. Illustrative.
        </caption>
        <thead>
          <tr>
            <th scope="col">Month-end</th>
            <th scope="col">NAV (US$)</th>
            <th scope="col">Change on month</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((v, k) => {
            const i = from + k;
            return (
              <tr key={i}>
                <th scope="row">{dateLabel(monthEndISO(data[i][0]))}</th>
                <td>{v.toFixed(2)}</td>
                <td>{MR[i] === null ? "Inception" : formatPct(MR[i]!)}</td>
              </tr>
            );
          })}
        </tbody>
      </table></div>
    </div>
  );
}
