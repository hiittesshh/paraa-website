// The three markets as 3D motion scenes (owner, 14 Nov 2026: photographs "too bad", flat drawings "not professional
// and not attention grabbing"; the owner chose a premium 3D-render look, built in code with no AI images). Real CSS
// 3D: boxes built from lit faces in a perspective scene, moving by transform and opacity only, so the GPU composites
// every frame. Decorative (aria-hidden): each step's own text says what the market is. Paused when the market isn't on
// screen; still under reduced motion (market-art.css).
//
// US stocks: a skyline of 25 lit columns on a glowing grid, each rising and falling on its own clock (both directions,
// no figures, no trend), with company signs and logos on top. Gold and crude oil: liquid metal (see below).
import type { SleeveId } from "@/lib/basket";
import { TICKER_MARKS } from "./ticker-marks";
import { LiquidMetal, type MetalLook } from "./liquid-metal";
import "./market-art.css";

type Style = React.CSSProperties & Record<`--${string}`, string | number>;

/** Gold dust drifting up through every scene. Fixed positions, so the page renders the same every time. */
function Dust({ n = 14 }: { n?: number }) {
  return (
    <span className="m3-dust" aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <i
          key={i}
          style={
            {
              "--x": `${(i * 37) % 100}%`,
              "--s": `${0.25 + ((i * 7) % 5) / 10}em`,
              "--d": `${6 + ((i * 3) % 6)}s`,
              "--w": `${-((i * 11) % 9)}s`,
            } as Style
          }
        />
      ))}
    </span>
  );
}

/** A box of lit faces in the scene: base `w` × `d`, height `h` (all em), its top and four sides. */
export function Box({ w, d, h, className }: { w: number; d: number; h: number; className?: string }) {
  return (
    <span className={`m3-box ${className ?? ""}`} style={{ "--bw": `${w}em`, "--bd": `${d}em`, "--bh": `${h}em` } as Style}>
      <span className="m3-f m3-top" />
      <span className="m3-f m3-front" />
      <span className="m3-f m3-right" />
      <span className="m3-f m3-left" />
      <span className="m3-f m3-back" />
    </span>
  );
}

// Owner, 14 Nov 2026: "show details like the stock name ... on the buildings". Familiar US names as signs on a few
// buildings, so the city reads as the US market. Illustrative only: not the basket's holdings.
const TICKERS: Record<number, string> = {
  2: "NVDA",
  8: "AAPL",
  10: "MSFT",
  14: "AMZN",
  16: "TSLA",
  22: "S&P 500",
};

/** The brand mark beside a ticker (see ticker-marks.ts). */
function TickerMark({ ticker }: { ticker: string }) {
  const mark = TICKER_MARKS[ticker];
  if (ticker === "MSFT")
    return (
      <svg viewBox="0 0 24 24" className="m3-mark" aria-hidden>
        <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
        <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00" />
        <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
        <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
      </svg>
    );
  if (mark?.path)
    return (
      <svg viewBox="0 0 24 24" className="m3-mark" aria-hidden>
        <path d={mark.path} fill={mark.fill} />
      </svg>
    );
  // The S&P 500: an index, no product logo; a small rising-and-falling line.
  return (
    <svg viewBox="0 0 24 24" className="m3-mark" aria-hidden>
      <path d="M2 17L8 11L12 14L18 6L22 9" fill="none" stroke="#FDC037" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Stocks() {
  const cols = Array.from({ length: 25 }, (_, i) => ({
    gx: i % 5,
    gy: Math.floor(i / 5),
    lo: 0.25 + ((i * 17) % 30) / 100,
    hi: 0.7 + ((i * 29) % 30) / 100,
    dur: 2.4 + ((i * 7) % 12) / 4,
    delay: -((i * 13) % 25) / 5,
    gold: i % 6 === 2,
  }));
  return (
    <div className="m3 m3-us" aria-hidden>
      <span className="m3-glow" />
      <div className="m3-scene">
        <div className="m3-world m3-city">
          <span className="m3-floor" />
          {cols.map((c, i) => (
            <span
              key={i}
              className={`m3-col ${c.gold ? "is-gold" : ""}`}
              style={{ "--gx": c.gx, "--gy": c.gy, "--lo": c.lo, "--hi": c.hi, "--dur": `${c.dur}s`, "--delay": `${c.delay}s` } as Style}
            >
              <span className="m3-col-in">
                <Box w={3.2} d={3.2} h={11} />
              </span>
              {TICKERS[i] && (
                <span className="m3-tick">
                  <span>
                    <TickerMark ticker={TICKERS[i]} />
                    {TICKERS[i]}
                  </span>
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
      <Dust n={10} />
    </div>
  );
}

// Gold and crude oil as liquid metal (owner, 14 Nov 2026: "motion graphics types for gold and crude oil, not static
// images"). A slow flowing surface on the GPU (liquid-metal.tsx): molten gold, and glossy black crude with amber light
// rolling across it. Gold dust drifts over both. Under reduced motion or without WebGL the CSS gradient stays.
const GOLD_LOOK: MetalLook = { base: "#FDC037", shadow: "#8C6612", shadowScale: 0.8, sheenL: 0.97, scale: 0.7, angle: 28, speed: 0.05 };
const OIL_LOOK: MetalLook = { base: "#2A1D0B", shadow: "#050505", shadowScale: 0.6, sheenL: 0.74, scale: 0.75, angle: -22, speed: 0.07 };

function Gold() {
  return (
    <div className="m3 m3-liquid m3-liquid-gold" aria-hidden>
      <LiquidMetal look={GOLD_LOOK} className="m3-liquid-canvas" />
      <span className="m3-liquid-shade" />
      <Dust n={14} />
    </div>
  );
}

function Oil() {
  return (
    <div className="m3 m3-liquid m3-liquid-oil" aria-hidden>
      <LiquidMetal look={OIL_LOOK} className="m3-liquid-canvas" />
      <span className="m3-liquid-shade" />
      <Dust n={6} />
    </div>
  );
}

/** `u` keeps the oil scene's gradient ids unique: the page holds two of each scene (the live frame and the static
 * row, one of them hidden), and an id that resolves into a hidden copy draws nothing. */
export function MarketArt({ id }: { id: SleeveId; u?: string }) {
  if (id === "us") return <Stocks />;
  if (id === "gold") return <Gold />;
  return <Oil />;
}
