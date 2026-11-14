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

type Sign = { label: string; mark: "brand" | "bar" | "drop" | "index" };

/** A small mark for the gold and oil signs: a gold bar, an oil drop. */
function SignMark({ sign }: { sign: Sign }) {
  if (sign.mark === "brand" || sign.mark === "index") return <TickerMark ticker={sign.label} />;
  if (sign.mark === "bar")
    return (
      <svg viewBox="0 0 24 24" className="m3-mark" aria-hidden>
        <path d="M6 8H18L22 18H2Z" fill="#E5A920" />
        <path d="M6 8H18L19 10.5H5Z" fill="#FED987" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="m3-mark" aria-hidden>
      <path d="M12 2C12 2 5 11 5 15.5C5 19.6 8.1 22 12 22C15.9 22 19 19.6 19 15.5C19 11 12 2 12 2Z" fill="#151517" stroke="#FDC037" strokeWidth="1.8" />
      <path d="M9 15C9.3 12.8 10.3 11 11.3 9.6" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/**
 * The market as a lit 3D city (owner, 14 Nov 2026: the US stocks city "is too good", so gold and crude oil use the same
 * language). 25 columns on a glowing grid, each rising and falling on its own clock (both directions, no figures, no
 * trend), signs on top. `variant` sets the materials: white and gold for US stocks, all gold for gold, glossy black with
 * amber tops for crude oil. Illustrative only: the signs are not the basket's holdings or prices.
 */
function City({ variant, signs, accent }: { variant: "us" | "gold" | "oil"; signs: Record<number, Sign>; accent: (i: number) => boolean }) {
  const cols = Array.from({ length: 25 }, (_, i) => ({
    gx: i % 5,
    gy: Math.floor(i / 5),
    lo: 0.25 + ((i * 17) % 30) / 100,
    hi: 0.7 + ((i * 29) % 30) / 100,
    dur: 2.4 + ((i * 7) % 12) / 4,
    delay: -((i * 13) % 25) / 5,
  }));
  return (
    <div className={`m3 m3-us m3-city-${variant}`} aria-hidden>
      <span className="m3-glow" />
      <div className="m3-scene">
        <div className="m3-world m3-city">
          <span className="m3-floor" />
          {cols.map((c, i) => (
            <span
              key={i}
              className={`m3-col ${accent(i) ? "is-gold" : ""}`}
              style={{ "--gx": c.gx, "--gy": c.gy, "--lo": c.lo, "--hi": c.hi, "--dur": `${c.dur}s`, "--delay": `${c.delay}s` } as Style}
            >
              <span className="m3-col-in">
                <Box w={3.2} d={3.2} h={11} />
              </span>
              {signs[i] && (
                <span className="m3-tick">
                  <span>
                    <SignMark sign={signs[i]} />
                    {signs[i].label}
                  </span>
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
      <Dust n={variant === "gold" ? 16 : 10} />
    </div>
  );
}

const US_SIGNS: Record<number, Sign> = Object.fromEntries(
  Object.entries(TICKERS).map(([i, t]) => [i, { label: t, mark: t === "S&P 500" ? "index" : "brand" }]),
);
const GOLD_SIGNS: Record<number, Sign> = {
  2: { label: "XAU", mark: "bar" },
  8: { label: "LBMA", mark: "bar" },
  10: { label: "999.9", mark: "bar" },
  14: { label: "1 KG", mark: "bar" },
  16: { label: "COMEX", mark: "bar" },
  22: { label: "FINE GOLD", mark: "bar" },
};
const OIL_SIGNS: Record<number, Sign> = {
  2: { label: "WTI", mark: "drop" },
  8: { label: "BRENT", mark: "drop" },
  10: { label: "OPEC", mark: "drop" },
  14: { label: "DUBAI", mark: "drop" },
  16: { label: "NYMEX", mark: "drop" },
  22: { label: "CRUDE", mark: "drop" },
};

const Stocks = () => <City variant="us" signs={US_SIGNS} accent={(i) => i % 6 === 2} />;
const Gold = () => <City variant="gold" signs={GOLD_SIGNS} accent={(i) => i % 4 === 1} />;
const Oil = () => <City variant="oil" signs={OIL_SIGNS} accent={(i) => i % 5 === 3} />;

/** `u` keeps the oil scene's gradient ids unique: the page holds two of each scene (the live frame and the static
 * row, one of them hidden), and an id that resolves into a hidden copy draws nothing. */
export function MarketArt({ id }: { id: SleeveId; u?: string }) {
  if (id === "us") return <Stocks />;
  if (id === "gold") return <Gold />;
  return <Oil />;
}
