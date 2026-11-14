"use client";

// Gold and crude oil as creative motion scenes (owner, 14 Nov 2026: "each should be something creative ... implement
// all, will select one of them"). Four for each, switchable with the review bar (ScenePicker) and kept in the URL
// (?gold=, ?oil=). SVG drawn in the brand's ink and gold; motion is CSS (market-scenes.css), transform and opacity
// only, still under reduced motion. Decorative: each market's own text says what it is.
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { PumpjackScene, VaultScene } from "./scene-hero";
import "./market-scenes.css";
import "./scene-hero.css";

export const GOLD_SCENES = [
  { id: "brick", label: "Gold brick" },
  { id: "vault", label: "Vault door" },
  { id: "pour", label: "Molten pour" },
  { id: "coins", label: "Coin rain" },
  { id: "ingot", label: "Floating ingot" },
] as const;
export const OIL_SCENES = [
  { id: "barrels", label: "Barrels" },
  { id: "pumpjack", label: "Pumpjack" },
  { id: "splash", label: "Oil splash" },
  { id: "pipeline", label: "Pipeline" },
  { id: "rig", label: "Offshore rig" },
] as const;

// ── The choice: in the URL, shared by every scene on the page ──
const EVENT = "paraa-scene";
const subscribe = (cb: () => void) => {
  addEventListener(EVENT, cb);
  return () => removeEventListener(EVENT, cb);
};
const read = (key: "gold" | "oil", fallback: string) => () => new URLSearchParams(location.search).get(key) ?? fallback;
function useChoice(key: "gold" | "oil", fallback: string) {
  return useSyncExternalStore(subscribe, read(key, fallback), () => fallback);
}
function choose(key: "gold" | "oil", id: string) {
  const url = new URL(location.href);
  url.searchParams.set(key, id);
  history.replaceState(history.state, "", url);
  dispatchEvent(new Event(EVENT));
}

function Frame({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <div className={`ms ${className}`} aria-hidden>
      <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" className="ms-svg">
        {children}
      </svg>
    </div>
  );
}

const sparkle = (x: number, y: number, s = 10) =>
  `M${x} ${y - s}L${x + s * 0.18} ${y - s * 0.18}L${x + s} ${y}L${x + s * 0.18} ${y + s * 0.18}L${x} ${y + s}L${x - s * 0.18} ${y + s * 0.18}L${x - s} ${y}L${x - s * 0.18} ${y - s * 0.18}Z`;

/** A gold bar seen from the front-right: top, front, side. */

function GoldDefs({ u }: { u: string }) {
  return (
    <defs>
      <linearGradient id={`g-front-${u}`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#FFE9A6" />
        <stop offset=".3" stopColor="#F6B92B" />
        <stop offset=".75" stopColor="#B4770C" />
        <stop offset="1" stopColor="#6E4508" />
      </linearGradient>
      <linearGradient id={`g-top-${u}`} x1="0" x2="1">
        <stop offset="0" stopColor="#E9A821" />
        <stop offset=".45" stopColor="#FFF4CF" />
        <stop offset="1" stopColor="#F4B02A" />
      </linearGradient>
      <linearGradient id={`g-side-${u}`} x1="0" x2="1">
        <stop offset="0" stopColor="#B07410" />
        <stop offset="1" stopColor="#5A3806" />
      </linearGradient>
      <radialGradient id={`g-glow-${u}`}>
        <stop offset="0" stopColor="#FFD764" stopOpacity=".55" />
        <stop offset="1" stopColor="#FFD764" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`g-steel-${u}`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#C9CACD" />
        <stop offset=".45" stopColor="#686A70" />
        <stop offset="1" stopColor="#2B2D34" />
      </linearGradient>
      <radialGradient id={`g-coin-${u}`} cx="38%" cy="32%" r="75%">
        <stop offset="0" stopColor="#FFF6D5" />
        <stop offset=".45" stopColor="#FDC037" />
        <stop offset="1" stopColor="#9A640A" />
      </radialGradient>
      <linearGradient id={`g-molten-${u}`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#FFFBEA" />
        <stop offset=".4" stopColor="#FFC24A" />
        <stop offset="1" stopColor="#FF8A1F" />
      </linearGradient>
    </defs>
  );
}

// ── Simple (owner, 14 Nov 2026: "make gold and crude oil simplistic: barrels for crude oil, a gold brick for gold, just
// animate them simply"). The defaults. ──
function SimpleGold({ u }: { u: string }) {
  // One brick (front A-B-C-D, top D-C-E-F, side B-G-E-C), with a chamfer, a stamped panel and a floor reflection.
  const front = "M0 110H300L262 12H38Z";
  const top = "M38 12H262L300 -30H76Z";
  const side = "M300 110L338 68L300 -30L262 12Z";
  const brick = (
    <>
      <path d={front} fill={`url(#sg-front-${u})`} />
      <path d={side} fill={`url(#sg-side-${u})`} />
      <path d={top} fill={`url(#sg-top-${u})`} />
      {/* the chamfer along the top's front edge, and the bright edge on the side */}
      <path d="M38 12H262L267 6H43Z" fill="#FFF8DE" />
      <path d="M262 12L300 -30L303 -24L267 6Z" fill="#FFE7A0" opacity=".8" />
      <path d="M2 109H298" stroke="#5A3806" strokeWidth="2" opacity=".7" />
      {/* the stamped panel on top */}
      <g transform="translate(76 -30) matrix(1 0 -0.905 1 0 0)">
        <rect x="58" y="10" width="110" height="24" rx="3" fill="#C98A14" fillOpacity=".35" stroke="#8C5A08" strokeOpacity=".55" />
        <rect x="58.6" y="10.6" width="108.8" height="1.4" fill="#FFF4CC" fillOpacity=".8" />
      </g>
      <text x="168" y="-6" textAnchor="middle" fontSize="15" fontWeight="800" letterSpacing="3" fill="#7A4B07" fillOpacity=".75" transform="skewX(-38) translate(4 0)">
        999.9
      </text>
    </>
  );
  return (
    <Frame className="ms-simple">
      <defs>
        <linearGradient id={`sg-front-${u}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFE9A6" />
          <stop offset=".18" stopColor="#FDC037" />
          <stop offset=".55" stopColor="#D08A10" />
          <stop offset=".8" stopColor="#F1B232" />
          <stop offset="1" stopColor="#8C5A08" />
        </linearGradient>
        <linearGradient id={`sg-top-${u}`} x1="0" x2="1" y1="1" y2="0">
          <stop offset="0" stopColor="#E9A821" />
          <stop offset=".4" stopColor="#FFE38A" />
          <stop offset=".52" stopColor="#FFFBEA" />
          <stop offset=".64" stopColor="#FFD764" />
          <stop offset="1" stopColor="#E9A821" />
        </linearGradient>
        <linearGradient id={`sg-side-${u}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#D08A10" />
          <stop offset=".6" stopColor="#8C5A08" />
          <stop offset="1" stopColor="#4A2B02" />
        </linearGradient>
        <radialGradient id={`sg-glow-${u}`}>
          <stop offset="0" stopColor="#FDC037" stopOpacity=".34" />
          <stop offset="1" stopColor="#FDC037" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`sg-fade-${u}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".32" />
          <stop offset=".7" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <mask id={`sg-mask-${u}`}>
          <rect x="0" y="380" width="600" height="140" fill={`url(#sg-fade-${u})`} />
        </mask>
        <clipPath id={`sg-clip-${u}`}>
          <path d={`${front} ${top} ${side}`} />
        </clipPath>
      </defs>
      <circle cx="300" cy="300" r="230" fill={`url(#sg-glow-${u})`} />
      {/* the glossy floor and the brick's reflection in it */}
      <ellipse className="ms-s-shadow" cx="318" cy="384" rx="170" ry="12" fill="#000000" opacity=".6" />
      <g mask={`url(#sg-mask-${u})`}>
        <g transform="translate(150 768) scale(1 -1)">{brick}</g>
      </g>
      <g className="ms-s-float">
        <g transform="translate(150 274)">
          {brick}
          <g clipPath={`url(#sg-clip-${u})`}>
            <rect className="ms-sweep" x="-140" y="-60" width="70" height="220" fill="#FFFFFF" opacity=".42" transform="skewX(-20)" />
          </g>
        </g>
        <path className="ms-spark" d={sparkle(452, 244, 15)} fill="#FFFFFF" />
      </g>
    </Frame>
  );
}

/** A steel drum, front view: curved top and base, raised hoops, a rimmed lid with a bung. */
function SimpleBarrel({ x, y, s = 1, u, k }: { x: number; y: number; s?: number; u: string; k: number }) {
  const W = 128;
  const H = 172;
  const r = 14;
  const hoop = (t: number) => {
    const yy = H * t;
    return (
      <g key={t}>
        <path d={`M0 ${yy}A${W / 2} ${r} 0 0 0 ${W} ${yy}V${yy + 7}A${W / 2} ${r} 0 0 1 0 ${yy + 7}Z`} fill={`url(#sb-hoop-${u})`} />
        <path d={`M0 ${yy}A${W / 2} ${r} 0 0 0 ${W} ${yy}`} fill="none" stroke="#FFE7A0" strokeOpacity=".8" strokeWidth="1.2" />
      </g>
    );
  };
  return (
    <g className="ms-s-barrel" style={{ animationDelay: `${k * 0.6}s` }}>
      <g transform={`translate(${x - (W * s) / 2} ${y}) scale(${s})`}>
        <path d={`M0 ${r}V${H - r}A${W / 2} ${r} 0 0 0 ${W} ${H - r}V${r}Z`} fill={`url(#sb-body-${u})`} />
        {hoop(0.3)}
        {hoop(0.68)}
        {/* the lid: rim, recess, bung */}
        <ellipse cx={W / 2} cy={r} rx={W / 2} ry={r} fill={`url(#sb-rim-${u})`} />
        <ellipse cx={W / 2} cy={r + 1.5} rx={W / 2 - 7} ry={r - 4.5} fill="#1F2027" />
        <ellipse cx={W * 0.7} cy={r + 1} rx="7" ry="2.6" fill="#0B0B0D" stroke="#FDC037" strokeOpacity=".7" />
        {/* the base rim */}
        <path d={`M0 ${H - r - 3}A${W / 2} ${r} 0 0 0 ${W} ${H - r - 3}`} fill="none" stroke="#000000" strokeOpacity=".55" strokeWidth="3" />
        {k === 2 && (
          <>
            {/* a thin line of oil running down from the lid */}
            <path className="ms-s-drip" d={`M${W * 0.78} ${r + 8}C${W * 0.79} ${H * 0.35} ${W * 0.76} ${H * 0.6} ${W * 0.78} ${H - r}`} fill="none" stroke="#050505" strokeWidth="5" strokeLinecap="round" />
            <path className="ms-s-drip" d={`M${W * 0.78 + 1} ${r + 10}C${W * 0.79 + 1} ${H * 0.35} ${W * 0.76 + 1} ${H * 0.6} ${W * 0.78 + 1} ${H - r}`} fill="none" stroke="#FDC037" strokeOpacity=".5" strokeWidth="1.2" strokeLinecap="round" />
          </>
        )}
      </g>
    </g>
  );
}

function SimpleOil({ u }: { u: string }) {
  return (
    <Frame className="ms-simple">
      <defs>
        <linearGradient id={`sb-body-${u}`} x1="0" x2="1">
          <stop offset="0" stopColor="#0B0B0D" />
          <stop offset=".18" stopColor="#3D3F47" />
          <stop offset=".3" stopColor="#8A8C93" />
          <stop offset=".42" stopColor="#3D3F47" />
          <stop offset=".75" stopColor="#1F2027" />
          <stop offset=".9" stopColor="#3D3F47" />
          <stop offset="1" stopColor="#0B0B0D" />
        </linearGradient>
        <linearGradient id={`sb-hoop-${u}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8C5A08" />
          <stop offset=".3" stopColor="#FFE7A0" />
          <stop offset=".5" stopColor="#FDC037" />
          <stop offset="1" stopColor="#6E4508" />
        </linearGradient>
        <linearGradient id={`sb-rim-${u}`} x1="0" x2="1">
          <stop offset="0" stopColor="#52555C" />
          <stop offset=".35" stopColor="#C9CACD" />
          <stop offset="1" stopColor="#3D3F47" />
        </linearGradient>
        <radialGradient id={`sb-glow-${u}`}>
          <stop offset="0" stopColor="#FDC037" stopOpacity=".24" />
          <stop offset="1" stopColor="#FDC037" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`sb-pool-${u}`} cx="45%" cy="40%" r="70%">
          <stop offset="0" stopColor="#3D3F47" />
          <stop offset=".6" stopColor="#0B0B0D" />
          <stop offset="1" stopColor="#020203" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="240" fill={`url(#sb-glow-${u})`} />
      <ellipse cx="300" cy="420" rx="250" ry="16" fill="#000000" opacity=".55" />
      {/* back barrel first, then the two in front */}
      <SimpleBarrel x={300} y={228} s={0.9} u={u} k={1} />
      <SimpleBarrel x={196} y={252} u={u} k={0} />
      <SimpleBarrel x={404} y={252} u={u} k={2} />
      {/* the puddle under the drip */}
      <ellipse className="ms-s-pool" cx="440" cy="428" rx="44" ry="7" fill={`url(#sb-pool-${u})`} />
      <ellipse className="ms-s-pool" cx="440" cy="427" rx="38" ry="5" fill="none" stroke="#FDC037" strokeOpacity=".35" />
    </Frame>
  );
}

// ── Gold 2: the molten pour ──
function Pour({ u }: { u: string }) {
  return (
    <Frame className="ms-pour">
      <GoldDefs u={u} />
      <ellipse cx="300" cy="470" rx="220" ry="26" fill="#000000" opacity=".5" />
      <circle className="ms-pour-glow" cx="300" cy="360" r="180" fill={`url(#g-glow-${u})`} />
      {/* the crucible, tipping */}
      <g className="ms-pour-crucible">
        <path d="M210 70H330L318 170H222Z" fill={`url(#g-steel-${u})`} stroke="#151517" strokeWidth="3" />
        <path d="M216 80H324" stroke="#FFC24A" strokeWidth="6" opacity=".9" />
        <path d="M330 72L352 90" stroke="#C9CACD" strokeWidth="8" strokeLinecap="round" />
      </g>
      {/* the stream */}
      <rect className="ms-pour-stream" x="344" y="96" width="14" height="300" rx="7" fill={`url(#g-molten-${u})`} />
      {/* the mould and the bar filling it */}
      <path d="M180 470H420L400 400H200Z" fill="#1F2027" stroke="#52555C" strokeWidth="3" />
      <g className="ms-pour-fill">
        <path d="M196 466H404L388 412H212Z" fill={`url(#g-molten-${u})`} />
      </g>
      <g className="ms-pour-cool">
        <path d="M196 466H404L388 412H212Z" fill={`url(#g-front-${u})`} />
        <path d="M214 414H386" stroke="#FFF7DC" strokeWidth="2" />
      </g>
      <path className="ms-spark" d={sparkle(372, 420, 16)} fill="#FFFFFF" />
    </Frame>
  );
}

// ── Gold 3: the coin rain ──
function Coins({ u }: { u: string }) {
  const falling = [
    { x: 110, d: 0, s: 0.55 },
    { x: 470, d: 1.1, s: 0.5 },
    { x: 200, d: 2.2, s: 0.4 },
    { x: 400, d: 0.6, s: 0.45 },
    { x: 520, d: 2.8, s: 0.35 },
    { x: 70, d: 1.8, s: 0.38 },
  ];
  return (
    <Frame className="ms-coins">
      <GoldDefs u={u} />
      <circle cx="300" cy="300" r="230" fill={`url(#g-glow-${u})`} />
      {falling.map((c, i) => (
        <g key={i} className="ms-fall" style={{ animationDelay: `${c.d}s` }}>
          <g transform={`translate(${c.x} 0) scale(${c.s})`}>
            <g className="ms-tumble" style={{ animationDelay: `${c.d}s` }}>
              <circle r="60" fill={`url(#g-coin-${u})`} stroke="#8C6612" strokeWidth="4" />
              <circle r="46" fill="none" stroke="#FFF1C2" strokeOpacity=".6" strokeWidth="3" />
            </g>
          </g>
        </g>
      ))}
      {/* the big coin, spinning */}
      <g transform="translate(300 300)">
        <g className="ms-spin">
          <circle r="130" fill="#8C6612" transform="translate(6 6)" />
          <circle r="130" fill={`url(#g-coin-${u})`} stroke="#B97210" strokeWidth="6" />
          <circle r="104" fill="none" stroke="#FFF1C2" strokeOpacity=".7" strokeWidth="4" />
          {Array.from({ length: 36 }, (_, i) => (
            <rect key={i} x="-2" y="-128" width="4" height="10" fill="#9A640A" transform={`rotate(${i * 10})`} />
          ))}
          <text y="34" textAnchor="middle" fontSize="96" fontWeight="800" fill="#9A640A" fillOpacity=".85">
            Au
          </text>
        </g>
      </g>
      {[
        [160, 180],
        [450, 220],
        [420, 450],
        [180, 430],
      ].map(([x, y], i) => (
        <path key={i} className="ms-spark" style={{ animationDelay: `${i * 0.7}s` }} d={sparkle(x, y, 14)} fill="#FFFFFF" />
      ))}
    </Frame>
  );
}

// ── Gold 4: the floating ingot ──
function Ingot({ u }: { u: string }) {
  return (
    <Frame className="ms-ingot">
      <GoldDefs u={u} />
      <circle cx="300" cy="290" r="210" fill={`url(#g-glow-${u})`} />
      <ellipse className="ms-ingot-shadow" cx="300" cy="470" rx="150" ry="16" fill="#000000" opacity=".55" />
      <g className="ms-ingot-float">
        <g transform="translate(150 250)">
          <path d="M40 0H260L300 -42H80Z" fill={`url(#g-top-${u})`} />
          <path d="M0 110H300L260 0H40Z" fill={`url(#g-front-${u})`} />
          <path d="M300 110L340 70L300 -42L260 0Z" fill={`url(#g-side-${u})`} />
          <path d="M40 0H260" stroke="#FFF7DC" strokeWidth="2.5" />
          <text x="150" y="70" textAnchor="middle" fontSize="30" fontWeight="800" letterSpacing="4" fill="#7A4B07" fillOpacity=".7">
            FINE GOLD
          </text>
          <text x="150" y="98" textAnchor="middle" fontSize="20" fontWeight="800" letterSpacing="5" fill="#7A4B07" fillOpacity=".6">
            999.9
          </text>
          <clipPath id={`g-ingot-clip-${u}`}>
            <path d="M0 110H300L260 0L300 -42H80L40 0Z M300 110L340 70L300 -42L260 0Z" />
          </clipPath>
          <g clipPath={`url(#g-ingot-clip-${u})`}>
            <rect className="ms-sweep" x="-120" y="-60" width="70" height="200" fill="#FFFFFF" opacity=".45" transform="skewX(-20)" />
          </g>
        </g>
      </g>
      <path className="ms-spark" d={sparkle(430, 214, 16)} fill="#FFFFFF" />
    </Frame>
  );
}

// ── Oil 2: the drop and the crown splash ──
function Splash({ u }: { u: string }) {
  const crown = [-1, -0.6, -0.25, 0.25, 0.6, 1];
  return (
    <Frame className="ms-splash">
      <defs>
        <radialGradient id={`o-drop-${u}`} cx="35%" cy="35%" r="75%">
          <stop offset="0" stopColor="#6E7079" />
          <stop offset=".45" stopColor="#151517" />
          <stop offset="1" stopColor="#020203" />
        </radialGradient>
        <radialGradient id={`o-pool-${u}`} cx="50%" cy="35%" r="65%">
          <stop offset="0" stopColor="#3D3F47" />
          <stop offset=".6" stopColor="#0B0B0D" />
          <stop offset="1" stopColor="#020203" />
        </radialGradient>
      </defs>
      <ellipse cx="300" cy="430" rx="250" ry="60" fill={`url(#o-pool-${u})`} />
      <ellipse cx="300" cy="420" rx="230" ry="44" fill="none" stroke="#FDC037" strokeOpacity=".35" strokeWidth="2" />
      {[0, 1, 2].map((i) => (
        <ellipse key={i} className="ms-ring" style={{ animationDelay: `${i * 0.2}s` }} cx="300" cy="430" rx="70" ry="14" fill="none" stroke="#FDC037" strokeWidth="2.5" />
      ))}
      {/* the crown */}
      <g className="ms-crown">
        {crown.map((k, i) => (
          <g key={i} transform={`translate(${300 + k * 70} 420)`}>
            <path d={`M-8 0Q${k * 14} -70 ${k * 26} -110L${k * 26 + 8} -106Q${k * 14 + 12} -66 8 0Z`} fill="#0B0B0D" stroke="#FDC037" strokeOpacity=".55" strokeWidth="1.5" />
            <circle cx={k * 28} cy="-122" r="9" fill={`url(#o-drop-${u})`} stroke="#FDC037" strokeOpacity=".5" />
          </g>
        ))}
      </g>
      {/* the drop */}
      <g className="ms-drop">
        <path d="M300 60C300 60 262 118 262 146C262 168 279 184 300 184C321 184 338 168 338 146C338 118 300 60 300 60Z" fill={`url(#o-drop-${u})`} stroke="#FDC037" strokeOpacity=".6" strokeWidth="2" />
        <path d="M282 140C284 124 290 110 297 100" stroke="#FFFFFF" strokeOpacity=".6" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    </Frame>
  );
}

// ── Oil 3: the pipeline ──
function Pipeline({ u }: { u: string }) {
  const route = "M-20 170H180Q220 170 220 210V330Q220 370 260 370H420Q460 370 460 410V620";
  const route2 = "M620 120H470Q430 120 430 160V250Q430 290 390 290H260";
  return (
    <Frame className="ms-pipe">
      <defs>
        <linearGradient id={`o-pipe-${u}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#7D7F85" />
          <stop offset=".5" stopColor="#2B2D34" />
          <stop offset="1" stopColor="#0B0B0D" />
        </linearGradient>
      </defs>
      {[route, route2].map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="#050505" strokeWidth="46" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#3D3F47" strokeWidth="38" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#7D7F85" strokeOpacity=".5" strokeWidth="4" strokeLinecap="round" transform="translate(0 -12)" />
          {/* oil pulses running through */}
          <path className="ms-flow" style={{ animationDelay: `${i * 0.7}s` }} d={d} fill="none" stroke="#FDC037" strokeWidth="10" strokeLinecap="round" strokeDasharray="40 220" />
        </g>
      ))}
      {/* flanges */}
      {[
        [120, 170],
        [220, 270],
        [340, 370],
        [530, 120],
        [430, 210],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 6} y={y - 30} width="12" height="60" rx="3" fill="#686A70" transform={i === 1 || i === 4 ? `rotate(90 ${x} ${y})` : undefined} />
      ))}
      {/* valves with turning wheels */}
      {[
        [300, 370],
        [470, 120],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 22} y={y - 34} width="44" height="68" rx="8" fill="#272A33" stroke="#FDC037" strokeWidth="2" />
          <rect x={x - 4} y={y - 70} width="8" height="40" fill="#52555C" />
          <g className="ms-valve" style={{ transformOrigin: `${x}px ${y - 74}px` }}>
            <ellipse cx={x} cy={y - 74} rx="30" ry="10" fill="none" stroke="#FDC037" strokeWidth="5" />
            <path d={`M${x - 30} ${y - 74}H${x + 30}`} stroke="#FDC037" strokeWidth="3" />
          </g>
        </g>
      ))}
      {/* a storage tank at the end */}
      <g>
        <rect x="130" y="250" width="140" height="80" fill={`url(#o-pipe-${u})`} />
        <ellipse cx="200" cy="250" rx="70" ry="16" fill="#52555C" stroke="#FDC037" strokeOpacity=".7" strokeWidth="2" />
        <text x="200" y="300" textAnchor="middle" fontSize="16" fontWeight="800" letterSpacing="3" fill="#FDC037" fillOpacity=".85">
          CRUDE
        </text>
      </g>
    </Frame>
  );
}

// ── Oil 4: the offshore rig ──
function Rig({ u }: { u: string }) {
  return (
    <Frame className="ms-rig">
      <defs>
        <linearGradient id={`o-night-${u}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0B0B0D" />
          <stop offset=".7" stopColor="#2A1D0B" />
          <stop offset="1" stopColor="#6B3F0A" />
        </linearGradient>
        <radialGradient id={`o-flare-${u}`}>
          <stop offset="0" stopColor="#FFF6D5" />
          <stop offset=".4" stopColor="#FDC037" />
          <stop offset="1" stopColor="#FF8A1F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="600" height="400" fill={`url(#o-night-${u})`} />
      <circle cx="470" cy="120" r="34" fill="#F2F2F2" opacity=".14" />
      {/* the platform */}
      <g fill="#050505">
        {[190, 250, 350, 410].map((x) => (
          <rect key={x} x={x} y="300" width="12" height="160" />
        ))}
        <path d="M190 330L262 380M262 330L190 380M350 330L422 380M422 330L350 380" stroke="#050505" strokeWidth="5" />
        <rect x="160" y="270" width="290" height="34" />
        <rect x="180" y="226" width="120" height="44" />
        <rect x="330" y="240" width="90" height="30" />
        {/* the derrick */}
        <path d="M232 226L262 90L292 226Z" fill="none" stroke="#050505" strokeWidth="6" />
        <path d="M240 190H284M246 160H278M252 130H272" stroke="#050505" strokeWidth="4" />
        {/* the crane */}
        <path d="M400 240L470 170" stroke="#050505" strokeWidth="6" />
        {/* the flare boom */}
        <path d="M450 280L530 210" stroke="#050505" strokeWidth="6" />
      </g>
      <g className="ms-flare" style={{ transformOrigin: "532px 206px" }}>
        <ellipse cx="534" cy="186" rx="18" ry="34" fill={`url(#o-flare-${u})`} />
      </g>
      {[
        [262, 92],
        [470, 170],
        [200, 268],
        [420, 268],
      ].map(([x, y], i) => (
        <circle key={i} className="ms-blink" style={{ animationDelay: `${i * 0.5}s` }} cx={x} cy={y} r="4" fill="#FDC037" />
      ))}
      {/* the sea, waves sliding */}
      <rect x="0" y="400" width="600" height="200" fill="#050505" />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          className="ms-wave"
          style={{ animationDuration: `${7 + i * 3}s` }}
          d={`M-600 ${420 + i * 40}Q-525 ${410 + i * 40} -450 ${420 + i * 40}T-300 ${420 + i * 40}T-150 ${420 + i * 40}T0 ${420 + i * 40}T150 ${420 + i * 40}T300 ${420 + i * 40}T450 ${420 + i * 40}T600 ${420 + i * 40}`}
          fill="none"
          stroke="#FDC037"
          strokeOpacity={0.35 - i * 0.08}
          strokeWidth="2"
        />
      ))}
    </Frame>
  );
}

export function GoldScene({ u }: { u: string }) {
  const choice = useChoice("gold", "brick");
  if (choice === "vault") return <VaultScene u={u} />;
  if (choice === "pour") return <Pour u={u} />;
  if (choice === "coins") return <Coins u={u} />;
  if (choice === "ingot") return <Ingot u={u} />;
  return <SimpleGold u={u} />;
}

export function OilScene({ u }: { u: string }) {
  const choice = useChoice("oil", "barrels");
  if (choice === "pumpjack") return <PumpjackScene u={u} />;
  if (choice === "splash") return <Splash u={u} />;
  if (choice === "pipeline") return <Pipeline u={u} />;
  if (choice === "rig") return <Rig u={u} />;
  return <SimpleOil u={u} />;
}

/** Review only: a small bar fixed to the bottom of the screen while "What you're buying" is on it. */
export function ScenePicker() {
  const gold = useChoice("gold", "brick");
  const oil = useChoice("oil", "barrels");
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Live, the vault and the pumpjack are the scenes; the switcher shows only with ?scenes in the address.
    if (!new URLSearchParams(location.search).has("scenes")) return;
    const el = document.getElementById("basket");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  if (!show) return null;
  const group = (key: "gold" | "oil", label: string, list: readonly { id: string; label: string }[], value: string) => (
    <div role="group" aria-label={`${label} scene`} className="ms-pick-group">
      <span className="ms-pick-label">{label}</span>
      {list.map((s, i) => (
        <button key={s.id} type="button" aria-pressed={value === s.id} onClick={() => choose(key, s.id)} className="ms-pick-btn">
          <span className="ms-pick-n">{i + 1}</span>
          {s.label}
        </button>
      ))}
    </div>
  );
  return createPortal(
    <div className="ms-pick">
      {group("gold", "Gold", GOLD_SCENES, gold)}
      {group("oil", "Oil", OIL_SCENES, oil)}
    </div>,
    document.body,
  );
}
