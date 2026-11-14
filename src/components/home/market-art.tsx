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

function Oil({ u }: { u: string }) {
  const id = (n: string) => `m3-${n}-${u}`;
  return (
    <div className="m3 m3-oil" aria-hidden>
      <span className="m3-glow" />
      <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" className="m3-svg">
        <defs>
          <radialGradient id={id("drop")} cx="36%" cy="38%" r="72%">
            <stop offset="0" stopColor="#5A5D66" />
            <stop offset=".45" stopColor="#16171B" />
            <stop offset="1" stopColor="#020203" />
          </radialGradient>
          <radialGradient id={id("pool")} cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor="#2B2D34" />
            <stop offset=".7" stopColor="#0B0B0D" />
            <stop offset="1" stopColor="#050506" />
          </radialGradient>
          <linearGradient id={id("rim")} x1="0" x2="1">
            <stop offset="0" stopColor="#FDC037" stopOpacity="0" />
            <stop offset=".5" stopColor="#FDC037" stopOpacity=".9" />
            <stop offset="1" stopColor="#FDC037" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* the pool: a dark lens with a gold horizon on its far edge */}
        <ellipse cx="300" cy="430" rx="230" ry="46" fill={`url(#${id("pool")})`} />
        <ellipse cx="300" cy="420" rx="200" ry="30" fill="none" stroke={`url(#${id("rim")})`} strokeWidth="2" opacity=".8" />
        {[0, 1, 2].map((i) => (
          <ellipse
            key={i}
            className="m3-ring"
            cx="300"
            cy="430"
            rx="60"
            ry="12"
            fill="none"
            stroke="#FDC037"
            strokeWidth="2"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
        {/* the splash: three droplets thrown up and falling back */}
        {[-1, 0, 1].map((k) => (
          <circle
            key={k}
            className="m3-spray"
            cx="300"
            cy="424"
            r={k === 0 ? 7 : 5}
            fill="#16171B"
            stroke="#FDC037"
            strokeOpacity=".5"
            style={{ "--dx": `${k * 46}px`, "--dy": `${k === 0 ? -96 : -64}px` } as Style}
          />
        ))}
        {/* the drop */}
        <g className="m3-drop">
          <path
            d="M300 250C300 250 252 318 252 350C252 378 274 400 300 400C326 400 348 378 348 350C348 318 300 250 300 250Z"
            fill={`url(#${id("drop")})`}
            stroke="#FDC037"
            strokeOpacity=".55"
            strokeWidth="1.5"
          />
          <path d="M276 336C279 318 288 302 296 290" stroke="#FFFFFF" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" fill="none" />
          <ellipse cx="282" cy="372" rx="6" ry="9" fill="#FFFFFF" fillOpacity=".1" />
        </g>
      </svg>
      <Dust n={8} />
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
