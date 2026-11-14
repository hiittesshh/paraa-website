"use client";

// Prototype "3D basket" (owner, 14 Nov 2026: "3D money basket", switchable with the Story). Your money as three glowing
// 3D blocks on a platform, sized by the example mix (US stocks 50, gold 30, crude oil 20). A scenario makes each block
// shrink or grow to its new value; what's lost stays as a ghost outline at the old height. The rupee is a dial beside
// it, its needle swinging to "stronger" or "weaker". Same model and maths as the other prototypes (model.ts).
// The scene is decorative: the labels under each block and the result carry every figure.
import { Box } from "../market-art";
import { Disclosure } from "@/components/ui/disclosure";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Choices } from "./choices";
import { RUPEE_RANGE, type BadYear } from "./model";
import "./basket3d.css";

type Style = React.CSSProperties & Record<`--${string}`, string | number>;

// Footprints on the platform (em): width ∝ the example weight, one depth, one starting height.
const BLOCK = {
  us: { w: 12, x: -14.5 },
  gold: { w: 7.2, x: -1.3 },
  oil: { w: 4.8, x: 7.1 },
} as const;
const DEPTH = 8;
const HEIGHT = 13;

function plain(key: string, v: number) {
  if (v === 0) return "Didn’t move";
  if (key === "rupee") return `Got ${Math.abs(v)}% ${v > 0 ? "weaker" : "stronger"}`;
  return `${v < 0 ? "Fell" : "Rose"} ${Math.abs(v)}%`;
}

export function Basket3DPrototype({ m }: { m: BadYear }) {
  const end = Math.round(m.r.inrValue);
  const diff = end - m.amount;
  const markets = m.parts.filter((p) => p.key !== "rupee");
  const rupee = m.parts.find((p) => p.key === "rupee")!;
  // The needle: −90° (15% stronger, less for you) to +90° (15% weaker, more for you).
  const angle = (m.rupee / RUPEE_RANGE) * 90;

  return (
    <div className="mt-6">
      <Choices m={m} />

      <div className="theme-ink mt-6 grid overflow-hidden rounded-2xl lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* The basket. */}
        <div className="relative">
          <div aria-hidden className="b3 h-[300px] sm:h-[360px] lg:h-[400px]">
            <span className="b3-glow" />
            <div className="b3-scene">
              <div className="b3-world">
                <span className="b3-platform" />
                {markets.map((p) => {
                  const b = BLOCK[p.key as keyof typeof BLOCK];
                  const s = Math.max(0.02, 1 + p.value / 100);
                  return (
                    <span key={p.key} className={cn("b3-block", `is-${p.key}`)} style={{ "--x": `${b.x}em`, "--s": s } as Style}>
                      {/* the ghost: where it started */}
                      <Box w={b.w} d={DEPTH} h={HEIGHT} className="b3-ghost" />
                      {/* the block now */}
                      <span className="b3-grow">
                        <Box w={b.w} d={DEPTH} h={HEIGHT} className="b3-solid" />
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Each block's label. */}
          <ul className="grid grid-cols-3 gap-2 border-t px-4 py-4 sm:px-6" style={{ borderColor: "rgb(255 255 255 / .1)" }}>
            {markets.map((p) => (
              <li key={p.key} className="min-w-0">
                <p className="text-body-md font-semibold">{p.label}</p>
                <p className="text-body-md text-muted-foreground">{plain(p.key, p.value)}</p>
                <p className={cn("num mt-1 text-body-lg font-bold", p.amount > 0 && "text-brand")}>
                  {p.amount === 0 ? "₹0" : formatINR(p.amount, { signed: true })}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* The result and the rupee dial. */}
        <div className="flex flex-col gap-6 border-t p-6 sm:p-7 lg:border-t-0 lg:border-l" style={{ borderColor: "rgb(255 255 255 / .1)" }}>
          <div>
            <p className="text-body-md text-muted-foreground">Your {formatINR(m.amount)} after one year</p>
            <p className="num mt-1 text-[3rem] leading-none font-bold tracking-[-0.04em] text-brand sm:text-[3.5rem]">{m.value}</p>
            <p className="num mt-3 text-body-lg font-semibold">
              {diff === 0 ? "No change" : diff < 0 ? `${formatINR(-diff)} less than you put in` : `${formatINR(diff)} more than you put in`}{" "}
              <span className="text-muted-foreground">({m.change})</span>
            </p>
          </div>

          <div className="rounded-xl p-4" style={{ background: "rgb(255 255 255 / .05)", boxShadow: "inset 0 0 0 1px rgb(255 255 255 / .08)" }}>
            <p className="text-body-md font-semibold">The rupee</p>
            <svg viewBox="0 0 200 116" className="mx-auto mt-2 block w-full max-w-[260px]" aria-hidden>
              <defs>
                <linearGradient id="b3-dial" x1="0" x2="1">
                  <stop offset="0" stopColor="#7D7F85" />
                  <stop offset=".5" stopColor="#F2F2F2" stopOpacity=".5" />
                  <stop offset="1" stopColor="#FDC037" />
                </linearGradient>
              </defs>
              <path d="M20 100A80 80 0 0 1 180 100" fill="none" stroke="url(#b3-dial)" strokeWidth="10" strokeLinecap="round" />
              {[-90, -45, 0, 45, 90].map((a) => (
                <line key={a} x1="100" y1="30" x2="100" y2="38" stroke="#F2F2F2" strokeOpacity=".5" strokeWidth="2" transform={`rotate(${a} 100 100)`} />
              ))}
              <g className="b3-needle" style={{ transform: `rotate(${angle}deg)` }}>
                <line x1="100" y1="100" x2="100" y2="34" stroke="#FDC037" strokeWidth="3.5" strokeLinecap="round" />
              </g>
              <circle cx="100" cy="100" r="8" fill="#FDC037" />
              <text x="16" y="114" fontSize="11" fill="#A9AAAD">Stronger</text>
              <text x="184" y="114" fontSize="11" fill="#A9AAAD" textAnchor="end">Weaker</text>
            </svg>
            <p className="mt-1 flex items-baseline justify-between gap-3 text-body-md">
              <span className="text-muted-foreground">{plain("rupee", m.rupee)}</span>
              <span className={cn("num font-bold", rupee.amount > 0 && "text-brand")}>
                {rupee.amount === 0 ? "₹0" : formatINR(rupee.amount, { signed: true })}
              </span>
            </p>
          </div>

          <Disclosure id="rupee-both-v1" as="p" className="mt-auto text-body-md text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
