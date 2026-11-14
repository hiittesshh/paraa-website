// The gold satin's fragment shader (M1b), refined from c1's silk-folds effect (D:\paraa-concepts\c1\assets\effects\
// silk-folds\effect.js, fx.js GLSL_LIB). Two or three large soft folds: a few low sines across a rotated axis whose
// spacing and phase bend with slow noise, an anisotropic satin sheen along the crests, shading done in OKLab so the
// cloth keeps gold's hue from the gold-800 shadows to the near-white sheen (c1's version capped the lightness at 0.5 on
// a dark page, which is what made it read muddy brown). Grain and a one-step dither stop banding.
// Written for GLSL ES 3.00 (WebGL2) and 1.00 (WebGL1).

export const VERT2 = "#version 300 es\nin vec2 a_pos;\nvoid main() { gl_Position = vec4(a_pos, 0.0, 1.0); }";
export const VERT1 = "attribute vec2 a_pos;\nvoid main() { gl_Position = vec4(a_pos, 0.0, 1.0); }";

const PRELUDE = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform float u_time;
uniform vec2 u_res;
uniform vec3 u_base;
uniform float u_shadowL;
uniform float u_sheenL;
uniform float u_scale;
uniform float u_angle;
#if __VERSION__ >= 300
out vec4 fxColor;
uint fx_u32(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float fx_hash(vec2 p) {
  uvec2 q = uvec2(ivec2(floor(p)) + ivec2(8192));
  return float(fx_u32(q.x + fx_u32(q.y + fx_u32(38u)))) * (1.0 / 4294967295.0);
}
#else
#define fxColor gl_FragColor
float fx_hash(vec2 p) {
  p = mod(floor(p), 1024.0);
  vec3 q = fract(vec3(p.x, p.y, p.x + p.y) * vec3(0.1031, 0.11369, 0.13787) + 0.27);
  q += dot(q, q.yzx + 31.32);
  return fract((q.x + q.y) * q.z);
}
#endif
const float TAU = 6.28318530718;
vec2 fx_grad(vec2 i) { float a = fx_hash(i) * TAU; return vec2(cos(a), sin(a)); }
float fx_ign(vec2 px) { return fract(52.9829189 * fract(dot(px, vec2(0.06711056, 0.00583715)))); }
float fx_grain(vec2 px, float frame) {
  vec2 o = vec2(frame * 41.0, frame * 73.0);
  return fx_hash(px + o) + fx_hash(px + o + vec2(1913.0, 2741.0)) - 1.0;
}
vec3 fx_srgb(vec3 c) { c = clamp(c, 0.0, 1.0); return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c)); }
vec3 fx_dither(vec3 c) { float n = fx_hash(gl_FragCoord.xy + vec2(3.0, 7.0)) + fx_ign(gl_FragCoord.xy) - 1.0; return c + n / 255.0; }
`;

const BODY = /* glsl */ `
// gradient noise with its analytic derivative: (value, d/dx, d/dy)
vec3 nd(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  vec2 du = 30.0 * f * f * (f * (f - 2.0) + 1.0);
  vec2 ga = fx_grad(i), gb = fx_grad(i + vec2(1.0, 0.0)), gc = fx_grad(i + vec2(0.0, 1.0)), gd = fx_grad(i + vec2(1.0, 1.0));
  float va = dot(ga, f), vb = dot(gb, f - vec2(1.0, 0.0)), vc = dot(gc, f - vec2(0.0, 1.0)), vd = dot(gd, f - vec2(1.0, 1.0));
  float k4 = va - vb - vc + vd;
  float v = va + u.x * (vb - va) + u.y * (vc - va) + u.x * u.y * k4;
  vec2 d = ga + u.x * (gb - ga) + u.y * (gc - ga) + u.x * u.y * (ga - gb - gc + gd) + du * (u.yx * k4 + vec2(vb, vc) - va);
  return vec3(v, d);
}
vec3 labLin(vec3 lab) {
  vec3 lms = vec3(lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z,
                  lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z,
                  lab.x - 0.0894841775 * lab.y - 1.2914855480 * lab.z);
  lms = lms * lms * lms;
  return vec3(dot(lms, vec3(4.0767416621, -3.3077115913, 0.2309699292)),
              dot(lms, vec3(-1.2684380046, 2.6097574011, -0.3413193965)),
              dot(lms, vec3(-0.0041960863, -0.7034186147, 1.7076147010)));
}
bool inside(vec3 c) { return all(greaterThanEqual(c, vec3(-0.001))) && all(lessThanEqual(c, vec3(1.001))); }
// OKLab -> sRGB keeping lightness and hue: chroma is reduced until the colour fits
vec3 toRGB(vec3 lab) {
  lab.x = clamp(lab.x, 0.0, 1.0);
  vec3 c = labLin(lab);
  if (!inside(c)) {
    float lo = 0.0, hi = 1.0;
    for (int i = 0; i < 7; i++) {
      float k = 0.5 * (lo + hi);
      if (inside(labLin(vec3(lab.x, lab.yz * k)))) lo = k; else hi = k;
    }
    c = labLin(vec3(lab.x, lab.yz * lo));
  }
  return fx_srgb(c);
}

void main() {
  vec2 uv = vec2(gl_FragCoord.x / u_res.x, 1.0 - gl_FragCoord.y / u_res.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y / u_scale;
  float t = u_time;

  float ang = radians(u_angle);
  vec2 T = vec2(sin(ang), cos(ang));
  vec2 A = vec2(T.y, -T.x);
  float a = dot(p, A), b = dot(p, T);
  float depth = 0.41;

  vec3 wv = nd(vec2(a * 0.9 + 5.0, b * 0.35 - t * 0.6));
  float aw = a + 0.2 * wv.x;
  float dawA = 1.0 + 0.18 * wv.y, dawB = 0.07 * wv.z;
  float fan = 1.0 + 0.36 * b;
  float af = aw * fan;
  vec2 dAF = vec2(fan * dawA, fan * dawB + 0.36 * aw);

  vec3 w1 = nd(vec2(b * 0.75 + 3.1, a * 0.3 + t * 2.0));
  vec3 w2 = nd(vec2(b * 1.1 - 7.3, a * 0.45 - t * 1.6 + 5.0));
  float ph1 = 2.1 * w1.x, ph2 = 2.4 * w2.x;
  vec2 dph1 = 2.1 * vec2(0.3 * w1.z, 0.75 * w1.y);
  vec2 dph2 = 2.4 * vec2(0.45 * w2.z, 1.1 * w2.y);

  float f1 = 7.4, f2 = 12.9, f3 = 3.9;
  float s1 = f1 * af + ph1 + t * 1.7;
  float s2 = f2 * af + ph2 - t * 1.2 + 1.3;
  float s3 = f3 * af + 0.8 * ph2 + 2.2;
  float k2 = 0.22 + 0.3 * (0.5 + 0.5 * w1.x);
  float h = sin(s1) + k2 * sin(s2) + 0.6 * sin(s3);
  vec2 dh = cos(s1) * (f1 * dAF + dph1) + k2 * cos(s2) * (f2 * dAF + dph2) + 0.6 * cos(s3) * (f3 * dAF + 0.8 * dph2);
  float hs = h - 0.12 * h * h;
  dh *= 1.0 - 0.24 * h;

  vec2 g = (A * dh.x + T * dh.y) * depth / 4.6;
  vec3 n = normalize(vec3(-g, 1.0));
  vec3 L = normalize(vec3(-0.5, 0.62, 0.6));
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float diff = clamp((dot(n, L) + 0.25) / 1.25, 0.0, 1.0);
  diff = diff * diff * (3.0 - 2.0 * diff);

  vec3 X = normalize(vec3(A, 0.0) - n * dot(vec3(A, 0.0), n));
  vec3 Y = normalize(cross(n, X));
  float hx = dot(H, X), hy = dot(H, Y), hn = max(dot(H, n), 0.05);
  float spec = exp(-(hx * hx / 0.034 + hy * hy / 0.9) / (hn * hn));
  float broad = exp(-(hx * hx / 0.14 + hy * hy / 1.8) / (hn * hn));
  float ao = 0.82 + 0.18 * smoothstep(-1.4, 0.8, hs);

  // Lightness runs from the gold-800 shadow (u_shadowL) to the gold itself; chroma stays high through the mid tones,
  // so the cloth reads as metal, not brown. The sheen lifts lightness toward u_sheenL and gives up some chroma at the
  // same hue, like light on satin.
  float I = clamp(diff * ao, 0.0, 1.0);
  float Lc = mix(u_shadowL, u_base.x * 1.02, I);
  vec2 ab = u_base.yz * mix(0.86, 1.0, I);
  float sh = clamp(spec * 0.6 + broad * 0.3, 0.0, 1.0);
  Lc += (u_sheenL - Lc) * sh;
  ab *= 1.0 - 0.5 * sh;
  // a quiet falloff toward the lower left, where the app window sits, and at the edges: depth, not a vignette ring
  float fall = smoothstep(1.25, 0.15, length((uv - vec2(0.62, 0.32)) * vec2(1.15, 1.0)));
  Lc *= mix(0.84, 1.0, fall);
  vec3 col = toRGB(vec3(Lc, ab));
  col += fx_grain(gl_FragCoord.xy, floor(u_time * 24.0)) * 0.006;
  fxColor = vec4(fx_dither(col), 1.0);
}
`;

export const fragmentSource = (gl2: boolean) => (gl2 ? "#version 300 es\n" : "") + PRELUDE + BODY;
