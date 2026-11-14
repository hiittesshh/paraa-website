// The three markets as 3D motion scenes (owner, 14 Nov 2026: photographs "too bad", flat drawings "not professional
// and not attention grabbing"; the owner chose a premium 3D-render look, built in code with no AI images). Real CSS
// 3D: boxes built from lit faces in a perspective scene, moving by transform and opacity only, so the GPU composites
// every frame. Decorative (aria-hidden): each step's own text says what the market is. Paused when the market isn't on
// screen; still under reduced motion (market-art.css).
//
// US stocks: a skyline of 25 lit columns on a glowing grid, each rising and falling on its own clock (both directions,
// no figures, no trend), the city swaying slowly. Gold: three solid bars stacked, turning slowly, light gliding over
// the metal, gold dust rising. Crude oil: a glossy drop falls into a dark pool, splashes and sends rings of light out.
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
// Along the city's left edge (owner, 14 Nov 2026: "I wanted company names here, in this left side"): the first
// column, gx = 0 (indices 0, 5, 10, 15, 20), whose outer walls face the viewer's left with nothing in front.
const TICKERS: Record<number, string> = {
  20: "NVDA",
  15: "AAPL",
  10: "MSFT",
  5: "AMZN",
  0: "TSLA",
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
    // A building with a sign never shrinks below the sign on its wall.
    lo: TICKERS[i] ? Math.max(0.45, 0.25 + ((i * 17) % 30) / 100) : 0.25 + ((i * 17) % 30) / 100,
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
              style={
                {
                  "--gx": c.gx,
                  "--gy": c.gy,
                  "--lo": c.lo,
                  "--hi": c.hi,
                  "--dur": `${c.dur}s`,
                  "--delay": `${c.delay}s`,
                  "--hd": TICKERS[i] ? "2.2em" : "1.6em",
                } as Style
              }
            >
              <span className="m3-col-in">
                <Box w={3.2} d={TICKERS[i] ? 4.4 : 3.2} h={11} />
              </span>
              {/* The sign on the building's left wall (owner, 14 Nov 2026: "rather than on top, on the left side"). */}
              {TICKERS[i] && (
                <span className="m3-plate">
                  <TickerMark ticker={TICKERS[i]} />
                  <span>{TICKERS[i]}</span>
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

// Gold, as cast bullion (owner, 14 Nov 2026, second pass: "gold still doesn't seem good"). Six tapered ingots in a
// pyramid, seen from higher so their tops show. Each has a chamfered top edge, a recessed panel engraved "FINE GOLD
// 999.9", and polished faces lit the way metal is: a white-hot highlight, rich amber, and dark brown where the faces
// reflect the dark around them. A light sweep, glints and a floor reflection finish it.
//
// One ingot, in its own space (front-left of its base at 0,90): base A(0,90) B(220,90) C(260,54); top D(18,44)
// E(202,44) F(234,8) G(50,8). Faces: front A-B-E-D, side B-C-F-E, top D-E-F-G.
const INGOT = {
  front: "M0 90L220 90L202 44L18 44Z",
  side: "M220 90L260 54L234 8L202 44Z",
  top: "M18 44L202 44L234 8L50 8Z",
};
const INGOTS = [
  [20, 420],
  [260, 420],
  [500, 420],
  [156, 356],
  [396, 356],
  [292, 292],
] as const;

function Ingot({ u }: { u: string }) {
  const g = (n: string) => `url(#au-${n}-${u})`;
  return (
    <>
      <path d={INGOT.front} fill={g("front")} />
      {/* the front's reflection band: dark where it mirrors the room */}
      <path d="M6 74L214 74L209 62L11 62Z" fill="#5A3204" fillOpacity=".38" />
      <path d={INGOT.side} fill={g("side")} />
      <path d={INGOT.top} fill={g("top")} />
      {/* the chamfer: a thin bright strip along the top's front edge, a darker one along its right */}
      <path d="M18 44L202 44L206 39L23 39Z" fill="#FFF6D8" fillOpacity=".95" />
      <path d="M202 44L234 8L230 6L206 39Z" fill="#C9850F" fillOpacity=".8" />
      {/* the engraved panel on the top */}
      <g transform="translate(50 8) matrix(1.84 0 -0.8 0.9 0 0)">
        <rect x="14" y="6" width="72" height="28" rx="3" fill="#B97A10" fillOpacity=".35" stroke="#7A4B07" strokeOpacity=".55" strokeWidth=".6" />
        <rect x="14.6" y="6.6" width="70.8" height="1.2" fill="#FFF4CC" fillOpacity=".7" />
        <text x="50" y="18" textAnchor="middle" fontSize="7.5" fontWeight="800" letterSpacing="1.4" fill="#6B4206" fillOpacity=".9">
          FINE GOLD
        </text>
        <text x="50" y="29" textAnchor="middle" fontSize="7.5" fontWeight="800" letterSpacing="1.4" fill="#6B4206" fillOpacity=".9">
          999.9
        </text>
      </g>
      {/* hard base edge */}
      <path d="M2 89H218" stroke="#3B2203" strokeWidth="1.5" opacity=".8" />
    </>
  );
}

function Ingots({ u }: { u: string }) {
  return (
    <>
      {INGOTS.map(([x, y], k) => (
        <g key={k} transform={`translate(${x} ${y})`}>
          <Ingot u={u} />
        </g>
      ))}
    </>
  );
}

function Gold({ u }: { u: string }) {
  const id = (n: string) => `au-${n}-${u}`;
  return (
    <div className="m3 m3-gold" aria-hidden>
      <span className="m3-glow" />
      <svg viewBox="0 200 800 420" preserveAspectRatio="xMidYMid meet" className="m3-svg">
        <defs>
          <linearGradient id={id("front")} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FFEDB0" />
            <stop offset=".12" stopColor="#FFC93C" />
            <stop offset=".4" stopColor="#E89A12" />
            <stop offset=".62" stopColor="#9C5A05" />
            <stop offset=".82" stopColor="#D18A12" />
            <stop offset="1" stopColor="#6A3C03" />
          </linearGradient>
          <linearGradient id={id("side")} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#E7A021" />
            <stop offset=".45" stopColor="#9A5C06" />
            <stop offset="1" stopColor="#3F2402" />
          </linearGradient>
          <linearGradient id={id("top")} x1="0" x2="1" y1="1" y2="0">
            <stop offset="0" stopColor="#D88B0E" />
            <stop offset=".28" stopColor="#FFC93C" />
            <stop offset=".44" stopColor="#FFF8DC" />
            <stop offset=".56" stopColor="#FFD764" />
            <stop offset=".8" stopColor="#F0A519" />
            <stop offset="1" stopColor="#B97210" />
          </linearGradient>
          <linearGradient id={id("floor")} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity=".28" />
            <stop offset=".6" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <mask id={id("fade")}>
            <rect x="0" y="510" width="800" height="110" fill={`url(#${id("floor")})`} />
          </mask>
          <linearGradient id={id("sweep")} x1="0" x2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset=".5" stopColor="#FFFFFF" stopOpacity=".65" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <clipPath id={id("clip")}>
            {INGOTS.map(([x, y], k) => (
              <path key={k} transform={`translate(${x} ${y})`} d={`${INGOT.front} ${INGOT.side} ${INGOT.top}`} />
            ))}
          </clipPath>
        </defs>

        {/* the floor, its shadow and the stack's reflection */}
        <ellipse cx="400" cy="512" rx="350" ry="24" fill="#000000" fillOpacity=".6" />
        <g mask={`url(#${id("fade")})`}>
          <g transform="translate(0 1022) scale(1 -1)">
            <Ingots u={`${u}`} />
          </g>
        </g>

        <g className="au-stack">
          <Ingots u={u} />
          <g clipPath={`url(#${id("clip")})`}>
            <rect className="au-sweep" x="-160" y="280" width="110" height="260" fill={`url(#${id("sweep")})`} transform="skewX(-22)" />
          </g>
        </g>

        {[
          [526, 300],
          [420, 364],
          [758, 430],
          [64, 476],
        ].map(([x, y], i) => (
          <path
            key={i}
            className="au-glint"
            d={`M${x} ${y - 16}L${x + 3} ${y - 3}L${x + 16} ${y}L${x + 3} ${y + 3}L${x} ${y + 16}L${x - 3} ${y + 3}L${x - 16} ${y}L${x - 3} ${y - 3}Z`}
            fill="#FFFFFF"
            style={{ animationDelay: `${i * 0.9}s` }}
          />
        ))}
      </svg>
      <Dust n={14} />
    </div>
  );
}

// Crude oil (owner, 14 Nov 2026, third pass: "barrels are still not that good"). The most recognisable picture of oil:
// a pyramid of steel drums lying on their sides, 3-2-1, their round ends towards you. Each end has a thick rolled rim,
// embossed rings and two bung caps, with the drum's body visible behind it; oil drips from a bung into a pool.
const DRUM_R = 76;
const DRUMS = [
  [176, 440],
  [336, 440],
  [496, 440],
  [256, 306],
  [416, 306],
  [336, 172],
] as const;
const DEPTH = { x: 34, y: -22 };

function DrumBody({ cx, cy, u }: { cx: number; cy: number; u: string }) {
  const r = DRUM_R;
  // The cylinder's side, seen behind the end: from the end circle to the back circle.
  const bx = cx + DEPTH.x;
  const by = cy + DEPTH.y;
  return (
    <g>
      <path
        d={`M${cx - r * 0.55} ${cy - r * 0.83}L${bx - r * 0.55} ${by - r * 0.83}A${r} ${r} 0 0 1 ${bx + r} ${by}L${cx + r} ${cy}Z`}
        fill={`url(#m3-side-${u})`}
      />
      <path d={`M${cx - r * 0.55} ${cy - r * 0.83}L${bx - r * 0.55} ${by - r * 0.83}`} stroke="#A9AAAD" strokeOpacity=".35" />
    </g>
  );
}

function DrumEnd({ cx, cy, u, tap }: { cx: number; cy: number; u: string; tap?: boolean }) {
  const r = DRUM_R;
  const g = (n: string) => `url(#m3-${n}-${u})`;
  return (
    <g>
      {/* the rolled rim (chime) */}
      <circle cx={cx} cy={cy} r={r} fill={g("chime")} />
      <circle cx={cx} cy={cy} r={r - 7} fill={g("end")} />
      <circle cx={cx} cy={cy} r={r - 7} fill="none" stroke="#000000" strokeOpacity=".6" strokeWidth="2" />
      {/* embossed rings: a light edge over a dark one */}
      {[0.72, 0.46].map((k) => (
        <g key={k}>
          <circle cx={cx} cy={cy} r={r * k} fill="none" stroke="#000000" strokeOpacity=".45" strokeWidth="3" />
          <circle cx={cx - 0.8} cy={cy - 0.8} r={r * k} fill="none" stroke="#C9CACD" strokeOpacity=".22" strokeWidth="1.2" />
        </g>
      ))}
      {/* bung caps */}
      <g>
        <circle cx={cx + r * 0.42} cy={cy - r * 0.42} r="11" fill={g("bung")} stroke="#0B0B0D" strokeWidth="1.5" />
        <path d={`M${cx + r * 0.42 - 6} ${cy - r * 0.42}H${cx + r * 0.42 + 6}`} stroke="#0B0B0D" strokeWidth="2" />
        <circle cx={cx - r * 0.44} cy={cy + (tap ? r * 0.5 : -r * 0.4)} r="7" fill={g("bung")} stroke="#0B0B0D" strokeWidth="1.2" />
      </g>
      {/* the stencil */}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="2" fill="#F2F2F2" fillOpacity=".75">
        CRUDE OIL
      </text>
      {/* the gloss on the rim, top left */}
      <path d={`M${cx - r * 0.86} ${cy - r * 0.2}A${r - 3} ${r - 3} 0 0 1 ${cx - r * 0.1} ${cy - r * 0.93}`} fill="none" stroke="#FFFFFF" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Oil({ u }: { u: string }) {
  const id = (n: string) => `m3-${n}-${u}`;
  const tap = DRUMS[2];
  const tx = tap[0] - DRUM_R * 0.44;
  const ty = tap[1] + DRUM_R * 0.5;
  return (
    <div className="m3 m3-oil" aria-hidden>
      <span className="m3-glow" />
      <svg viewBox="70 60 560 480" preserveAspectRatio="xMidYMid meet" className="m3-svg">
        <defs>
          <radialGradient id={id("end")} cx="38%" cy="34%" r="80%">
            <stop offset="0" stopColor="#4C4E57" />
            <stop offset=".55" stopColor="#23252C" />
            <stop offset="1" stopColor="#0B0B0D" />
          </radialGradient>
          <linearGradient id={id("chime")} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#D9DADC" />
            <stop offset=".3" stopColor="#7D7F85" />
            <stop offset=".7" stopColor="#2B2D34" />
            <stop offset="1" stopColor="#686A70" />
          </linearGradient>
          <linearGradient id={id("side")} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#686A70" />
            <stop offset=".35" stopColor="#2B2D34" />
            <stop offset="1" stopColor="#0B0B0D" />
          </linearGradient>
          <radialGradient id={id("bung")} cx="35%" cy="35%" r="70%">
            <stop offset="0" stopColor="#C9CACD" />
            <stop offset="1" stopColor="#3D3F47" />
          </radialGradient>
          <radialGradient id={id("pool")} cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor="#2B2D34" />
            <stop offset=".7" stopColor="#0B0B0D" />
            <stop offset="1" stopColor="#050506" />
          </radialGradient>
        </defs>

        <ellipse cx="350" cy="520" rx="260" ry="20" fill="#000000" fillOpacity=".55" />
        {/* the pool under the bung */}
        <ellipse cx={tx} cy="532" rx="58" ry="10" fill={`url(#${id("pool")})`} />
        {[0, 1].map((i) => (
          <ellipse key={i} className="m3-ring" cx={tx} cy="532" rx="24" ry="5" fill="none" stroke="#A9AAAD" strokeWidth="1.5" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}

        {/* bodies first (top row first), then the round ends in front */}
        {[...DRUMS].reverse().map(([cx, cy], k) => (
          <DrumBody key={k} cx={cx} cy={cy} u={u} />
        ))}
        {DRUMS.map(([cx, cy], k) => (
          <DrumEnd key={k} cx={cx} cy={cy} u={u} tap={k === 2} />
        ))}

        {/* the drip from the bottom-right drum's lower bung */}
        <g className="m3-drop m3-drip2" style={{ "--fall": `${532 - ty - 6}px` } as Style}>
          <path d={`M${tx} ${ty + 6}C${tx} ${ty + 6} ${tx - 6} ${ty + 15} ${tx - 6} ${ty + 19}C${tx - 6} ${ty + 23} ${tx - 3} ${ty + 25} ${tx} ${ty + 25}C${tx + 3} ${ty + 25} ${tx + 6} ${ty + 23} ${tx + 6} ${ty + 19}C${tx + 6} ${ty + 15} ${tx} ${ty + 6} ${tx} ${ty + 6}Z`} fill="#050506" stroke="#7D7F85" strokeOpacity=".6" />
        </g>
      </svg>
      <Dust n={6} />
    </div>
  );
}

/** `u` keeps the oil scene's gradient ids unique: the page holds two of each scene (the live frame and the static
 * row, one of them hidden), and an id that resolves into a hidden copy draws nothing. */
export function MarketArt({ id, u }: { id: SleeveId; u: string }) {
  if (id === "us") return <Stocks />;
  if (id === "gold") return <Gold u={u} />;
  return <Oil u={u} />;
}
