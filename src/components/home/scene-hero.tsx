"use client";

// The refined vault and pumpjack (owner, 14 Nov 2026: "vault door is kinda good, but feels buggy and not attention
// grabbing; same for pumpjack"). The vault door now swings on its hinge in real 3D (CSS perspective) with its thickness
// showing, after its bolts draw back and its wheel turns; a burst of gold light and turning rays spill out over glowing
// bullion. The pumpjack is a real linkage solved every frame: the crank turns, the pitman arm drives the walking beam,
// the horse head lifts the rod in step; two smaller jacks work in the distance against a large sunset.
// Both pause off screen; still under reduced motion.
import { useEffect, useRef } from "react";

// ── The vault ──
export function VaultScene({ u }: { u: string }) {
  const bolts = Array.from({ length: 10 }, (_, i) => (i * 360) / 10);
  return (
    <div className="vx" aria-hidden>
      <span className="vx-floorglow" />
      {/* behind the door: the strongroom */}
      <div className="vx-room">
        <svg viewBox="0 0 400 400" className="vx-room-svg">
          <defs>
            <radialGradient id={`vx-in-${u}`} cx="50%" cy="55%" r="55%">
              <stop offset="0" stopColor="#FFE7A0" />
              <stop offset=".35" stopColor="#E09A16" />
              <stop offset=".75" stopColor="#5A3806" />
              <stop offset="1" stopColor="#1A1206" />
            </radialGradient>
            <linearGradient id={`vx-bar-${u}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#FFF4CF" />
              <stop offset=".35" stopColor="#FDC037" />
              <stop offset="1" stopColor="#8C5A08" />
            </linearGradient>
            <linearGradient id={`vx-bartop-${u}`} x1="0" x2="1">
              <stop offset="0" stopColor="#F4B02A" />
              <stop offset=".5" stopColor="#FFFBEA" />
              <stop offset="1" stopColor="#F6C24A" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="170" fill={`url(#vx-in-${u})`} />
          {/* bullion, stacked in rows */}
          {[
            [110, 250],
            [200, 250],
            [290, 250],
            [155, 222],
            [245, 222],
            [200, 194],
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x - 44} ${y})`}>
              <path d="M8 0H80L88 -10H16Z" fill={`url(#vx-bartop-${u})`} />
              <path d="M0 26H88L80 0H8Z" fill={`url(#vx-bar-${u})`} />
            </g>
          ))}
        </svg>
        <span className="vx-rays" />
        <span className="vx-burst" />
      </div>

      {/* the door frame */}
      <span className="vx-frame" />

      {/* the door: face + thickness, hinged on its left edge */}
      <div className="vx-door">
        <span className="vx-edge" />
        <svg viewBox="0 0 400 400" className="vx-face">
          <defs>
            <radialGradient id={`vx-steel-${u}`} cx="35%" cy="30%" r="80%">
              <stop offset="0" stopColor="#D9DADC" />
              <stop offset=".45" stopColor="#7D7F85" />
              <stop offset="1" stopColor="#272A33" />
            </radialGradient>
            <radialGradient id={`vx-plate-${u}`} cx="40%" cy="35%" r="80%">
              <stop offset="0" stopColor="#52555C" />
              <stop offset="1" stopColor="#15161A" />
            </radialGradient>
            <linearGradient id={`vx-gold-${u}`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#FFF4CF" />
              <stop offset=".4" stopColor="#FDC037" />
              <stop offset="1" stopColor="#8C6612" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="196" fill={`url(#vx-steel-${u})`} />
          <circle cx="200" cy="200" r="168" fill={`url(#vx-plate-${u})`} stroke="#9A9CA2" strokeWidth="3" />
          {[150, 118, 86].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#FDC037" strokeOpacity={r === 150 ? 0.8 : 0.35} strokeWidth={r === 150 ? 3 : 1.5} />
          ))}
          {/* the bolts round the rim: they slide inward before it opens */}
          {bolts.map((a) => (
            <g key={a} transform={`rotate(${a} 200 200)`}>
              <g className="vx-bolt">
                <rect x="190" y="14" width="20" height="30" rx="4" fill={`url(#vx-gold-${u})`} stroke="#5F440C" />
              </g>
            </g>
          ))}
          {/* the wheel */}
          <g className="vx-wheel">
            {[0, 60, 120].map((a) => (
              <g key={a} transform={`rotate(${a} 200 200)`}>
                <rect x="193" y="96" width="14" height="208" rx="7" fill={`url(#vx-gold-${u})`} stroke="#5F440C" strokeWidth="1.5" />
                <circle cx="200" cy="96" r="13" fill={`url(#vx-gold-${u})`} stroke="#5F440C" strokeWidth="1.5" />
                <circle cx="200" cy="304" r="13" fill={`url(#vx-gold-${u})`} stroke="#5F440C" strokeWidth="1.5" />
              </g>
            ))}
            <circle cx="200" cy="200" r="36" fill={`url(#vx-gold-${u})`} stroke="#5F440C" strokeWidth="3" />
            <circle cx="200" cy="200" r="14" fill="#5F440C" />
          </g>
          {/* the brand plate */}
          <text x="200" y="378" textAnchor="middle" fontSize="13" fontWeight="800" letterSpacing="4" fill="#FDC037" fillOpacity=".8">
            PARAA
          </text>
        </svg>
        {/* the light catching the steel as it moves */}
        <span className="vx-sheen" />
      </div>
      <span className="vx-dust" />
    </div>
  );
}

// ── The pumpjack: a linkage solved every frame ──
type Jack = { px: number; py: number; L1: number; L2: number; cx: number; cy: number; r: number; s: number; phase: number };

/** Draw one jack in SVG coordinates. Beam pivots at (px, py) on the samson post; the horse head is L1 to its left, the
 * pitman joint L2 to its right; the crank turns about (cx, cy) with radius r. */
function jackPaths(j: Jack, t: number) {
  const phi = t * 2 * Math.PI * 0.25 + j.phase; // one stroke every 4 s
  const pin = { x: j.cx + j.r * Math.cos(phi), y: j.cy + j.r * Math.sin(phi) };
  // the beam's angle follows the crank pin's height through the pitman arm (small-angle solution)
  const theta = Math.asin(Math.max(-0.9, Math.min(0.9, ((pin.y - j.cy) / j.L2) * 0.9)));
  const head = { x: j.px - j.L1 * Math.cos(theta), y: j.py - j.L1 * Math.sin(theta) };
  const tail = { x: j.px + j.L2 * Math.cos(theta), y: j.py + j.L2 * Math.sin(theta) };
  return { phi, pin, theta, head, tail };
}

export function PumpjackScene({ u }: { u: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const jacks: Jack[] = [
    { px: 300, py: 262, L1: 150, L2: 120, cx: 420, cy: 372, r: 30, s: 1, phase: 0 },
    { px: 96, py: 368, L1: 42, L2: 34, cx: 130, cy: 398, r: 9, s: 0.3, phase: 1.7 },
    { px: 520, py: 376, L1: 36, L2: 30, cx: 549, cy: 402, r: 8, s: 0.26, phase: 3.1 },
  ];

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const draw = (t: number) => {
      jacks.forEach((j, k) => {
        const g = svg.querySelector<SVGGElement>(`[data-jack="${k}"]`);
        if (!g) return;
        const { pin, theta, head, tail } = jackPaths(j, t);
        g.querySelector("[data-beam]")!.setAttribute("transform", `rotate(${(theta * 180) / Math.PI} ${j.px} ${j.py})`);
        g.querySelector("[data-crank]")!.setAttribute("transform", `rotate(${(Math.atan2(pin.y - j.cy, pin.x - j.cx) * 180) / Math.PI} ${j.cx} ${j.cy})`);
        const pit = g.querySelector("[data-pitman]")!;
        pit.setAttribute("x1", String(tail.x));
        pit.setAttribute("y1", String(tail.y));
        pit.setAttribute("x2", String(pin.x));
        pit.setAttribute("y2", String(pin.y));
        const rod = g.querySelector("[data-rod]")!;
        rod.setAttribute("x1", String(head.x - 4 * j.s));
        rod.setAttribute("y1", String(head.y + 26 * j.s));
        rod.setAttribute("x2", String(head.x - 4 * j.s));
        rod.setAttribute("y2", String(j.cy + 40 * j.s + 26));
      });
    };
    draw(0);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let start = 0;
    let visible = false;
    const tick = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      if (!start) start = now;
      draw((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && (typeof svg.checkVisibility !== "function" || svg.checkVisibility({ opacityProperty: true }));
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(svg);
    const poll = setInterval(() => {
      const v = typeof svg.checkVisibility !== "function" || svg.checkVisibility({ opacityProperty: true });
      if (v !== visible) {
        visible = v;
        if (visible && !raf) raf = requestAnimationFrame(tick);
      }
    }, 400);
    return () => {
      io.disconnect();
      clearInterval(poll);
      if (raf) cancelAnimationFrame(raf);
    };
    // the jacks are constants
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px" aria-hidden>
      <svg ref={ref} viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" className="px-svg">
        <defs>
          <linearGradient id={`px-sky-${u}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#0B0B0D" />
            <stop offset=".35" stopColor="#2A1606" />
            <stop offset=".62" stopColor="#9A4E08" />
            <stop offset=".78" stopColor="#F0A417" />
            <stop offset=".9" stopColor="#FFE3A0" />
          </linearGradient>
          <radialGradient id={`px-sun-${u}`}>
            <stop offset="0" stopColor="#FFFBEA" />
            <stop offset=".35" stopColor="#FFE3A0" />
            <stop offset="1" stopColor="#FDC037" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`px-rim-${u}`} x1="1" x2="0">
            <stop offset="0" stopColor="#FFC24A" />
            <stop offset=".25" stopColor="#050505" />
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill={`url(#px-sky-${u})`} />
        <circle className="px-sun" cx="330" cy="410" r="150" fill={`url(#px-sun-${u})`} />
        <circle cx="330" cy="410" r="62" fill="#FFF6D5" />
        {/* distant hills */}
        <path d="M0 420C80 396 150 404 230 412S400 392 470 402S560 410 600 400V600H0Z" fill="#1A0F05" opacity=".85" />
        {/* the ground */}
        <path d="M0 438C140 428 260 440 380 432S540 426 600 434V600H0Z" fill="#050505" />
        <path d="M0 438C140 428 260 440 380 432S540 426 600 434" fill="none" stroke="#FFC24A" strokeOpacity=".5" strokeWidth="1.5" />

        {jacks.map((j, k) => {
          const s = j.s;
          const fill = k === 0 ? "#050505" : "#140B04";
          return (
            <g key={k} data-jack={k}>
              {/* samson post (A-frame) */}
              <path d={`M${j.px - 46 * s} ${j.cy + 62 * s}L${j.px} ${j.py}L${j.px + 46 * s} ${j.cy + 62 * s}`} fill="none" stroke={fill} strokeWidth={12 * s + 2} strokeLinejoin="round" />
              <path d={`M${j.px - 30 * s} ${j.py + 100 * s}H${j.px + 30 * s}`} stroke={fill} strokeWidth={7 * s + 1} />
              {/* gearbox */}
              <rect x={j.cx - 24 * s} y={j.cy} width={48 * s} height={62 * s} fill={fill} />
              {/* base skid */}
              <rect x={j.px - (j.L1 + 30) * s} y={j.cy + 60 * s} width={(j.L1 + j.L2 + 120) * s} height={10 * s} fill={fill} />
              {/* crank arm and counterweight */}
              <g data-crank="">
                <path d={`M${j.cx} ${j.cy}H${j.cx + j.r + 22 * s}`} stroke={fill} strokeWidth={16 * s + 2} strokeLinecap="round" />
                <circle cx={j.cx + j.r + 10 * s} cy={j.cy} r={24 * s + 2} fill={fill} />
              </g>
              {/* pitman arm, solved each frame */}
              <line data-pitman="" stroke={fill} strokeWidth={8 * s + 2} strokeLinecap="round" />
              {/* walking beam with its horse head */}
              <g data-beam="">
                <rect x={j.px - j.L1} y={j.py - 10 * s} width={j.L1 + j.L2 + 10 * s} height={20 * s + 1} rx={3} fill={k === 0 ? `url(#px-rim-${u})` : fill} />
                <path
                  d={`M${j.px - j.L1 + 6 * s} ${j.py - 30 * s}Q${j.px - j.L1 - 34 * s} ${j.py - 10 * s} ${j.px - j.L1 - 18 * s} ${j.py + 46 * s}L${j.px - j.L1 + 12 * s} ${j.py + 40 * s}Z`}
                  fill={k === 0 ? `url(#px-rim-${u})` : fill}
                />
              </g>
              {/* the polished rod, hanging from the horse head */}
              <line data-rod="" stroke={fill} strokeWidth={4 * s + 1.5} />
              {/* the wellhead */}
              <rect x={j.px - j.L1 - 16 * s} y={j.cy + 30 * s} width={16 * s} height={32 * s} fill={fill} />
            </g>
          );
        })}
        {/* heat shimmer of dust in the low light */}
        {Array.from({ length: 14 }, (_, i) => (
          <circle key={i} className="px-mote" style={{ animationDelay: `${-i * 0.7}s` }} cx={(i * 47) % 600} cy={440 + ((i * 13) % 30)} r={1 + (i % 3) * 0.6} fill="#FFD764" />
        ))}
      </svg>
    </div>
  );
}
