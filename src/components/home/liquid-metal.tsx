"use client";

// Liquid metal (owner, 14 Nov 2026: "use motion graphics types for gold and crude oil, not static images"). A slow,
// flowing surface drawn on the GPU (the satin shader ported from site A, satin-shader.ts): molten gold for gold, glossy
// black crude with amber light rolling across it for oil. 30 fps at most, DPR at most 1.5. The context is created only
// when the scene first comes on screen, and it draws only while visible (on screen, not faded out, tab shown), so the
// stacked scenes that are faded out cost nothing. Reduced motion or no WebGL: the CSS gradient underneath stays.
import { useEffect, useRef, useState } from "react";
import { oklab } from "@/lib/oklab";
import { VERT1, VERT2, fragmentSource } from "./satin-shader";

export type MetalLook = {
  base: string;
  shadow: string;
  shadowScale?: number;
  sheenL: number;
  scale: number;
  angle: number;
  speed: number;
};

const FRAME_MS = 1000 / 30;
const dpr = () => Math.min(1.5, Math.max(1, devicePixelRatio || 1));

export function LiquidMetal({ look, className }: { look: MetalLook; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop = () => {};
    let started = false;
    let disposed = false;

    const init = () => {
      started = true;
      const gl2 = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
      const gl = (gl2 ?? canvas.getContext("webgl", { antialias: false, alpha: false })) as WebGLRenderingContext | null;
      if (!gl) return;
      const sh = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, gl2 ? VERT2 : VERT1));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fragmentSource(!!gl2)));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "a_pos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const u = (n: string) => gl.getUniformLocation(prog, n);
      const b = oklab(look.base);
      gl.uniform3f(u("u_base"), b[0], b[1], b[2]);
      gl.uniform1f(u("u_shadowL"), oklab(look.shadow)[0] * (look.shadowScale ?? 0.92));
      gl.uniform1f(u("u_sheenL"), look.sheenL);
      gl.uniform1f(u("u_scale"), look.scale);
      gl.uniform1f(u("u_angle"), look.angle);
      const uTime = u("u_time");
      const uRes = u("u_res");

      const size = () => {
        const r = canvas.getBoundingClientRect();
        const w = Math.max(1, Math.round(r.width * dpr()));
        const h = Math.max(1, Math.round(r.height * dpr()));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
          gl.uniform2f(uRes, w, h);
        }
      };
      size();
      const ro = new ResizeObserver(size);
      ro.observe(canvas);

      let clock = 1.3;
      let last = 0;
      let raf = 0;
      let first = true;
      // The scene around the canvas, not the canvas itself: the canvas stays transparent until its first frame.
      const host = canvas.parentElement ?? canvas;
      const visible = () =>
        inView && !document.hidden && (typeof host.checkVisibility !== "function" || host.checkVisibility({ opacityProperty: true }));
      const draw = (now: number) => {
        raf = 0;
        if (!visible()) {
          last = 0;
          return;
        }
        if (now - last >= FRAME_MS) {
          clock += Math.min(0.1, last ? (now - last) / 1000 : 0) * look.speed;
          last = now;
          gl.uniform1f(uTime, clock);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
          if (first) {
            first = false;
            setReady(true);
          }
        }
        raf = requestAnimationFrame(draw);
      };
      kick = () => {
        if (!raf && visible()) raf = requestAnimationFrame(draw);
      };
      // A faded-in scene (the step changed) gets picked up within a third of a second.
      const poll = setInterval(kick, 300);
      document.addEventListener("visibilitychange", kick);
      kick();
      stop = () => {
        if (raf) cancelAnimationFrame(raf);
        clearInterval(poll);
        ro.disconnect();
        document.removeEventListener("visibilitychange", kick);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    let inView = false;
    let kick = () => {};
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView && !started && !disposed) init();
      kick();
    });
    io.observe(canvas);
    return () => {
      disposed = true;
      io.disconnect();
      stop();
    };
  }, [look]);

  return <canvas ref={ref} aria-hidden className={className} data-ready={ready ? "" : undefined} />;
}
