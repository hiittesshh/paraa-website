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
// On the front row (indices 20-24), so nothing stands in front of their signed walls.
const TICKERS: Record<number, string> = {
  20: "NVDA",
  21: "AAPL",
  22: "MSFT",
  23: "AMZN",
  24: "TSLA",
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
                  "--hw": TICKERS[i] ? "2.2em" : "1.6em",
                } as Style
              }
            >
              <span className="m3-col-in">
                <Box w={TICKERS[i] ? 4.4 : 3.2} d={3.2} h={11} />
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

// Crude oil as barrels (owner, 14 Nov 2026: "make crude oil barrels there"): three steel drums stacked, "CRUDE OIL"
// stencilled on each, light sliding across them, and oil dripping from the top drum's tap into a pool that ripples.
function Barrel({ x, y, u }: { x: number; y: number; u: string; k?: number }) {
  const W = 132;
  const H = 168;
  const R = 14; // the ellipse's half-height: how much of the top we see
  const g = (n: string) => `url(#m3-${n}-${u})`;
  // A raised rolling hoop at height t (0 top, 1 bottom): a band with a lit top edge and a shadow under it.
  const hoop = (t: number) => {
    const yy = H * t;
    return (
      <g key={t}>
        <path d={`M-1 ${yy - 5}A${W / 2 + 1} ${R} 0 0 0 ${W + 1} ${yy - 5}V${yy + 3}A${W / 2 + 1} ${R} 0 0 1 -1 ${yy + 3}Z`} fill={g("hoop")} />
        <path d={`M-1 ${yy - 5}A${W / 2 + 1} ${R} 0 0 0 ${W + 1} ${yy - 5}`} fill="none" stroke="#C9CACD" strokeOpacity=".75" strokeWidth="1.2" />
        <path d={`M0 ${yy + 5}A${W / 2} ${R} 0 0 0 ${W} ${yy + 5}`} fill="none" stroke="#000000" strokeOpacity=".55" strokeWidth="2.5" />
      </g>
    );
  };
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* the body: a steel cylinder, a broad highlight on the left and a sharper one on the right */}
      <path d={`M0 ${R}V${H - R}A${W / 2} ${R} 0 0 0 ${W} ${H - R}V${R}Z`} fill={g("drum")} />
      <path d={`M0 ${R}V${H - R}A${W / 2} ${R} 0 0 0 ${W} ${H - R}V${R}Z`} fill={g("drum-gloss")} />
      {/* the painted label band, with its stencil */}
      <path d={`M0 ${H * 0.42}A${W / 2} ${R} 0 0 0 ${W} ${H * 0.42}V${H * 0.6}A${W / 2} ${R} 0 0 1 0 ${H * 0.6}Z`} fill={g("band")} />
      <text x={W / 2} y={H * 0.555} textAnchor="middle" fontSize="13.5" fontWeight="800" letterSpacing="2.4" fill="#FFFFFF" fillOpacity=".88">
        CRUDE OIL
      </text>
      {hoop(0.25)}
      {hoop(0.78)}
      {/* the rim and the lid, with two bung caps */}
      <ellipse cx={W / 2} cy={R} rx={W / 2} ry={R} fill={g("rim")} />
      <ellipse cx={W / 2} cy={R + 1} rx={W / 2 - 6} ry={R - 4} fill={g("lid")} />
      <ellipse cx={W / 2} cy={R + 1} rx={W / 2 - 6} ry={R - 4} fill="none" stroke="#000000" strokeOpacity=".5" />
      <ellipse cx={W * 0.73} cy={R} rx="8" ry="3.4" fill="#2B2D34" stroke="#A9AAAD" strokeOpacity=".7" />
      <ellipse cx={W * 0.3} cy={R + 2} rx="5" ry="2.4" fill="#2B2D34" stroke="#A9AAAD" strokeOpacity=".6" />
      {/* the base rim */}
      <path d={`M0 ${H - R - 4}A${W / 2} ${R} 0 0 0 ${W} ${H - R - 4}`} fill="none" stroke="#000000" strokeOpacity=".6" strokeWidth="3" />
    </g>
  );
}

function Oil({ u }: { u: string }) {
  const id = (n: string) => `m3-${n}-${u}`;
  return (
    <div className="m3 m3-oil" aria-hidden>
      <span className="m3-glow" />
      <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" className="m3-svg">
        <defs>
          <linearGradient id={id("drum")} x1="0" x2="1">
            <stop offset="0" stopColor="#15161A" />
            <stop offset=".1" stopColor="#3D3F47" />
            <stop offset=".24" stopColor="#8A8C93" />
            <stop offset=".34" stopColor="#4C4E57" />
            <stop offset=".62" stopColor="#23252C" />
            <stop offset=".8" stopColor="#3D3F47" />
            <stop offset=".88" stopColor="#686A70" />
            <stop offset="1" stopColor="#0B0B0D" />
          </linearGradient>
          <linearGradient id={id("drum-gloss")} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity=".1" />
            <stop offset=".5" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="1" stopColor="#000000" stopOpacity=".35" />
          </linearGradient>
          <linearGradient id={id("band")} x1="0" x2="1">
            <stop offset="0" stopColor="#3A1A10" />
            <stop offset=".25" stopColor="#8E3B1F" />
            <stop offset=".6" stopColor="#5E2614" />
            <stop offset="1" stopColor="#2A120B" />
          </linearGradient>
          <linearGradient id={id("hoop")} x1="0" x2="1">
            <stop offset="0" stopColor="#1F2027" />
            <stop offset=".24" stopColor="#A9AAAD" />
            <stop offset=".4" stopColor="#52555C" />
            <stop offset=".85" stopColor="#686A70" />
            <stop offset="1" stopColor="#151517" />
          </linearGradient>
          <linearGradient id={id("rim")} x1="0" x2="1">
            <stop offset="0" stopColor="#52555C" />
            <stop offset=".3" stopColor="#C9CACD" />
            <stop offset="1" stopColor="#3D3F47" />
          </linearGradient>
          <radialGradient id={id("lid")} cx="40%" cy="40%" r="70%">
            <stop offset="0" stopColor="#686A70" />
            <stop offset="1" stopColor="#272A33" />
          </radialGradient>
          <clipPath id={id("drum-clip")}>
            <rect x="0" y="0" width="132" height="168" rx="14" />
          </clipPath>
          <radialGradient id={id("pool")} cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor="#2B2D34" />
            <stop offset=".7" stopColor="#0B0B0D" />
            <stop offset="1" stopColor="#050506" />
          </radialGradient>
        </defs>
        <ellipse cx="300" cy="512" rx="240" ry="22" fill="#000000" fillOpacity=".45" />
        {/* the pool under the tap */}
        <ellipse cx="480" cy="524" rx="62" ry="12" fill={`url(#${id("pool")})`} />
        {[0, 1].map((i) => (
          <ellipse key={i} className="m3-ring" cx="480" cy="524" rx="26" ry="6" fill="none" stroke="#A9AAAD" strokeWidth="1.5" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
        {/* where the top drum rests on the two below */}
        <ellipse cx="301" cy="336" rx="70" ry="10" fill="#000000" fillOpacity=".55" />
        {/* the stack: two drums on the floor, one on top */}
        <Barrel x={160} y={330} u={u} k={0} />
        <Barrel x={310} y={330} u={u} k={1} />
        <Barrel x={235} y={176} u={u} k={2} />
        {/* the tap on the bottom-right drum, and the drip into the pool */}
        <path d="M440 452H498V464H486V474H474V464H440Z" fill="#3D3F47" stroke="#0B0B0D" strokeWidth="2" />
        <g className="m3-drop">
          <path d="M480 476C480 476 473 486 473 490C473 494 476 497 480 497C484 497 487 494 487 490C487 486 480 476 480 476Z" fill="#050506" stroke="#7D7F85" strokeOpacity=".6" />
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
