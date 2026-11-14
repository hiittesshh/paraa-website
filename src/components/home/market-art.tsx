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

function Gold() {
  // A pyramid of six bars: three on the floor, two on them, one on top.
  const bars = [
    { x: -15.2, z: 0 },
    { x: 0, z: 0 },
    { x: 15.2, z: 0 },
    { x: -7.6, z: 3.6 },
    { x: 7.6, z: 3.6 },
    { x: 0, z: 7.2 },
  ];
  return (
    <div className="m3 m3-gold" aria-hidden>
      <span className="m3-glow" />
      <div className="m3-scene">
        <div className="m3-world m3-stack">
          <span className="m3-shadow" />
          {bars.map((b, k) => (
            <span key={k} className="m3-bar" style={{ "--bx": `${b.x}em`, "--bz": `${b.z}em`, "--k": k % 3 } as Style}>
              <Box w={14.6} d={6.6} h={3.6} className="is-metal" />
            </span>
          ))}
        </div>
      </div>
      <Dust n={18} />
    </div>
  );
}

// Crude oil as barrels (owner, 14 Nov 2026: "make crude oil barrels there"): three steel drums stacked, "CRUDE OIL"
// stencilled on each, light sliding across them, and oil dripping from the top drum's tap into a pool that ripples.
function Barrel({ x, y, u, k }: { x: number; y: number; u: string; k: number }) {
  const W = 132;
  const H = 168;
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* the body: a cylinder, lit from the left */}
      <path d={`M0 14V${H - 14}A${W / 2} 14 0 0 0 ${W} ${H - 14}V14Z`} fill={`url(#m3-drum-${u})`} />
      {/* the rolling hoops */}
      {[0.33, 0.67].map((t) => (
        <g key={t}>
          <path d={`M0 ${H * t}A${W / 2} 14 0 0 0 ${W} ${H * t}`} fill="none" stroke="#0B0B0D" strokeWidth="7" />
          <path d={`M0 ${H * t - 4}A${W / 2} 14 0 0 0 ${W} ${H * t - 4}`} fill="none" stroke="#7D7F85" strokeOpacity=".55" strokeWidth="1.5" />
        </g>
      ))}
      {/* the stencil */}
      <text x={W / 2} y={H * 0.53} textAnchor="middle" fontSize="15" fontWeight="800" letterSpacing="2" fill="#F2F2F2" fillOpacity=".8">
        CRUDE OIL
      </text>
      {/* the lid, with its bung */}
      <ellipse cx={W / 2} cy="14" rx={W / 2} ry="14" fill={`url(#m3-lid-${u})`} stroke="#0B0B0D" strokeWidth="2" />
      <ellipse cx={W / 2} cy="14" rx={W / 2 - 8} ry="9" fill="none" stroke="#7D7F85" strokeOpacity=".5" />
      <ellipse cx={W * 0.72} cy="12" rx="7" ry="3" fill="#0B0B0D" />
      {/* light sliding across the drum */}
      <g clipPath={`url(#m3-drum-clip-${u})`}>
        <rect className="m3-drum-shine" x="-60" y="0" width="34" height={H} fill="#FFFFFF" fillOpacity=".16" style={{ animationDelay: `${k * 0.6}s` }} />
      </g>
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
            <stop offset="0" stopColor="#3D3F47" />
            <stop offset=".22" stopColor="#686A70" />
            <stop offset=".45" stopColor="#272A33" />
            <stop offset="1" stopColor="#0B0B0D" />
          </linearGradient>
          <linearGradient id={id("lid")} x1="0" x2="1">
            <stop offset="0" stopColor="#52555C" />
            <stop offset="1" stopColor="#1F2027" />
          </linearGradient>
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
  if (id === "gold") return <Gold />;
  return <Oil u={u} />;
}
