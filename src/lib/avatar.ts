// Pal avatars, ported from Plane's Agent Avatar Lab (https://agents.plane.so).
// A pal is a coloured silhouette ("surface") with three translucent planes turning inside it and two eyes.
// drawAvatar is a pure function of (look, state, time), so every avatar on screen can share one clock.
// Everything is drawn in a 64×64 box and scaled to the canvas.

import type { Look, Surface } from "./look";

export type AvatarState = "idle" | "looking" | "thinking1" | "thinking2" | "working" | "happy" | "error1" | "error2" | "inactive";

type Rect = { cx: number; cy: number; w: number; h: number; r: number; rot?: number };
type Gaze = { t: number; L: [number, number]; R: [number, number]; ease?: (x: number) => number };
type Blink = { c: number; slow?: boolean; quick?: boolean };
type StateDef = {
  eyeCycle: number;
  eyeReps: number;
  planeRevs: number[];
  planeWarp?: (p: number) => number;
  planeRevsPerCycle?: number;
  bounce?: number;
  tilt?: number;
  foreshorten?: number;
  rock?: (p: number) => number;
  colorCycle?: (p: number, color: string) => string;
  eyePose?: (p: number, lift: number) => Rect[];
  bodyOffset?: (p: number) => [number, number];
  iconAlpha?: (p: number) => number;
  closed?: boolean;
  zzz?: boolean;
  follows?: boolean; // the eyes can follow the cursor
  gazeTrack: Gaze[];
  blinks: Blink[];
};

const PLANE_ALPHA = 0.3; // multiply @ 30%
const SURFACE_D = "M4 16C4 9.37258 9.37258 4 16 4H48C54.6274 4 60 9.37258 60 16V48C60 54.6274 54.6274 60 48 60H16C9.37258 60 4 54.6274 4 48V16Z";
const PLANE_D = [
  "M-14.7702 44.7589C-17.6585 41.9866 -17.7526 37.3978 -14.9804 34.5095L3.84311 14.8977C6.61536 12.0094 11.2042 11.9152 14.0925 14.6875L24.5521 24.7267C27.4405 27.499 27.5346 32.0878 24.7623 34.9761L5.93882 54.5879C3.16657 57.4762 -1.42225 57.5703 -4.31059 54.7981L-14.7702 44.7589Z",
  "M17.7429 21.7392C19.3532 18.0739 23.63 16.408 27.2954 18.0183L52.1829 28.9526C55.8482 30.563 57.5141 34.8397 55.9037 38.5051L50.0721 51.7784C48.4618 55.4437 44.185 57.1096 40.5196 55.4993L15.6322 44.565C11.9668 42.9547 10.3009 38.6779 11.9113 35.0125L17.7429 21.7392Z",
  "M41.2298 30.0909C38.3415 27.3186 38.2474 22.7298 41.0196 19.8415L59.8431 0.229733C62.6154 -2.65861 67.2042 -2.75272 70.0925 0.0195288L80.5521 10.0587C83.4405 12.831 83.5346 17.4198 80.7623 20.3081L61.9388 39.9199C59.1666 42.8082 54.5777 42.9023 51.6894 40.1301L41.2298 30.0909Z",
];
const PLANE_C = [[4.89, 34.75], [33.9, 36.76], [60.89, 20.08]];
const EYES = [{ cx: 22.333, cy: 43.5, w: 6.667, h: 10, r: 1.515 }, { cx: 41.333, cy: 44.0, w: 6.667, h: 10, r: 1.515 }];

/** Silhouettes other than the rounded square are unions of rounded rects: [width, height, radius, rotationDeg]. */
export const SURFACE_PARTS: Record<Exclude<Surface, "rounded">, [number, number, number, number][]> = {
  diagonal: [[42, 42, 9, 0], [42, 42, 9, 45]],
  diamond: [[42, 42, 9, 45]],
  octagon: [[52, 26, 3.7, 0], [52, 26, 3.7, 45], [52, 26, 3.7, 90], [52, 26, 3.7, 135]],
  burst: [[54, 15, 4, 0], [54, 15, 4, 45], [54, 15, 4, 90], [54, 15, 4, 135]],
};
/** Smaller silhouettes pull the face in (contentScale) and rest the eyes a little higher (eyeLift). */
const SURFACE_FIT: Record<Surface, { contentScale: number; eyeLift: number }> = {
  rounded: { contentScale: 1, eyeLift: 0 },
  diagonal: { contentScale: 0.85, eyeLift: -6 },
  diamond: { contentScale: 0.75, eyeLift: -3 },
  octagon: { contentScale: 0.88, eyeLift: -1 },
  burst: { contentScale: 0.6, eyeLift: -2 },
};

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeBack = (x: number) => {
  const c = 2.2;
  return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
};
const pwl = (p: number, pts: number[][]) => {
  for (let k = 0; k < pts.length - 1; k++) {
    if (p <= pts[k + 1][0]) {
      const [x0, y0] = pts[k], [x1, y1] = pts[k + 1];
      return y0 + (y1 - y0) * ((p - x0) / (x1 - x0 || 1));
    }
  }
  return pts[pts.length - 1][1];
};

/** Starting angles of the three planes, from the look's seed. */
function baseAngles(seed: number): number[] {
  let h = 2166136261;
  for (const ch of String(seed)) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return [0, 1, 2].map((i) => (((h >>> (i * 9)) & 511) / 511) * Math.PI * 2);
}

function gaze(track: Gaze[], p: number) {
  for (let k = 0; k < track.length - 1; k++) {
    const a = track[k], b = track[k + 1];
    if (p >= a.t && p <= b.t) {
      const e = (b.ease || easeInOut)(clamp((p - a.t) / (b.t - a.t || 1), 0, 1));
      return { L: [lerp(a.L[0], b.L[0], e), lerp(a.L[1], b.L[1], e)], R: [lerp(a.R[0], b.R[0], e), lerp(a.R[1], b.R[1], e)] };
    }
  }
  const z = track[track.length - 1];
  return { L: [...z.L], R: [...z.R] };
}

// Blink: smooth cosine both ways, closing a touch faster than opening. 1 open → 0 shut → 1 open.
function blinkOpen(d: number, cN: number, oN: number) {
  if (d < -cN || d > oN) return 1;
  if (d < 0) return 0.5 * (1 + Math.cos(Math.PI * ((d + cN) / cN)));
  return 0.5 * (1 - Math.cos(Math.PI * (d / oN)));
}
function openness(state: StateDef, p: number) {
  if (state.closed) return 0.05 + 0.02 * Math.sin(p * 2 * Math.PI);
  let o = 1;
  for (const b of state.blinks) {
    const m = b.slow ? 1.45 : b.quick ? 0.7 : 1;
    let d = p - b.c;
    if (d > 0.5) d -= 1;
    if (d < -0.5) d += 1;
    o = Math.min(o, blinkOpen(d, (0.09 * m) / state.eyeCycle, (0.14 * m) / state.eyeCycle));
  }
  return clamp(o, 0, 1);
}

// Planes turn continuously and finish whole revolutions per loop, so the animation never seams.
function planeAngle(state: StateDef, i: number, t: number, base: number[]) {
  if (state.planeWarp) {
    const dir = Math.sign(state.planeRevs[i] || 1);
    const cyc = Math.floor(t / state.eyeCycle), p = (t / state.eyeCycle) % 1;
    return base[i] + dir * 2 * Math.PI * (cyc * (state.planeRevsPerCycle ?? 1) + state.planeWarp(p));
  }
  return base[i] + (state.planeRevs[i] || 0) * 2 * Math.PI * (t / (state.eyeCycle * state.eyeReps));
}

// Planes speed up while thinking.
const t1Warp = (p: number) => pwl(p, [[0, 0], [0.32, 0.3], [0.82, 1.7], [1, 2.0]]);

const restEye = (idx: number, lift: number): Rect => ({ cx: EYES[idx].cx, cy: 44 + lift, w: 6.667, h: 10, r: 1.515 });
const mixRect = (a: Rect, b: Rect, u: number): Rect => ({ cx: lerp(a.cx, b.cx, u), cy: lerp(a.cy, b.cy, u), w: lerp(a.w, b.w, u), h: lerp(a.h, b.h, u), r: lerp(a.r, b.r, u) });

// Thinking: the eyes merge into one dot that bobs, then split back into eyes.
function mergeAmt(p: number) {
  if (p < 0.2) return 0;
  if (p < 0.32) return easeInOut((p - 0.2) / 0.12);
  if (p < 0.82) return 1;
  if (p < 0.96) return 1 - easeInOut((p - 0.82) / 0.14);
  return 0;
}
function thinkingEyePose(p: number, lift: number): Rect[] {
  const e = mergeAmt(p);
  const lp = clamp((p - 0.32) / 0.5, 0, 1);
  const dot: Rect = { cx: 32, cy: 32 + 12 * Math.sin(2 * Math.PI * 3 * lp), w: 7.8, h: 7.8, r: 3.9 };
  return [0, 1].map((idx) => mixRect(restEye(idx, lift), dot, e));
}

// Deep thinking: the eyes split into four dots that orbit the centre, then merge back.
function t2EyesAmt(p: number) {
  if (p < 0.22) return 1;
  if (p < 0.32) return 1 - easeInOut((p - 0.22) / 0.1);
  if (p < 0.86) return 0;
  if (p < 0.94) return easeInOut((p - 0.86) / 0.08);
  return 1;
}
function thinking2EyePose(p: number, lift: number): Rect[] {
  const m = easeInOut(1 - t2EyesAmt(p));
  const rot = p < 0.32 || p > 0.86 ? 0 : 2 * (2 * Math.PI) * easeInOut((p - 0.32) / 0.54);
  const corner = [Math.PI, Math.PI / 2, 0, -Math.PI / 2];
  return [0, 1, 2, 3].map((i) => {
    const a = corner[i] + rot;
    const dot: Rect = { cx: 32 + 18 * Math.cos(a), cy: 32 + 18 * Math.sin(a), w: 7.4, h: 7.4, r: 3.7 };
    return mixRect(restEye(i < 2 ? 0 : 1, lift), dot, m);
  });
}

// Failed: the eyes drop and bounce like weighted objects, turn into dizzy swirls, then spring back up.
function err1BounceH(u: number) {
  const r = 0.55, durs = [1];
  for (let k = 1; k <= 4; k++) durs.push(2 * Math.pow(r, k));
  const total = durs.reduce((a, b) => a + b, 0);
  const t = u * total;
  let acc = 0;
  for (let k = 0; k < durs.length; k++) {
    const d = durs[k];
    if (t <= acc + d) {
      const seg = (t - acc) / d;
      if (k === 0) return 1 - seg * seg;
      return Math.pow(r, 2 * k) * (1 - Math.pow(2 * seg - 1, 2));
    }
    acc += d;
  }
  return 0;
}
const E1_TOP = 44, E1_GND = 53, E1_DROP = 9;
function err1Y(p: number) {
  if (p < 0.14) return E1_TOP;
  if (p < 0.38) return E1_GND - err1BounceH((p - 0.14) / 0.24) * E1_DROP;
  if (p < 0.82) return E1_GND;
  if (p < 0.9) return lerp(E1_GND, E1_TOP, easeBack((p - 0.82) / 0.08));
  return E1_TOP;
}
function err1EyePose(p: number, lift: number): Rect[] {
  const yB = err1Y(p);
  const hn = clamp((E1_GND - yB) / E1_DROP, 0, 1);
  const cq = clamp(1 - hn / 0.1, 0, 1);
  const sy = lerp(1 + 0.3 * (1 - hn), 0.5, cq); // stretch in the air, squash on contact
  const w = 6.667 / Math.sqrt(sy), h = 10 * sy;
  return [0, 1].map((idx) => ({ cx: EYES[idx].cx, cy: yB + lift, w, h, r: Math.min(1.515, w / 2, h / 2) }));
}
function err1Body(p: number): [number, number] {
  const t0 = 0.215, d = 0.13;
  if (p < t0 || p > t0 + d) return [0, 0];
  const u = (p - t0) / d, dec = Math.pow(1 - u, 2);
  return [2.2 * 0.5 * dec * Math.sin(2 * Math.PI * 8 * u + 1), 2.2 * dec * Math.sin(2 * Math.PI * 9 * u)];
}
function err1Icon(p: number) {
  if (p < 0.37) return 0;
  if (p < 0.53) return easeInOut((p - 0.37) / 0.16);
  if (p < 0.72) return 1;
  if (p < 0.82) return 1 - easeInOut((p - 0.72) / 0.1);
  return 0;
}

// Invalid: the eyes close to lines and shake "no".
function err2Close(p: number) {
  if (p < 0.2) return 0;
  if (p < 0.27) return easeInOut((p - 0.2) / 0.07);
  if (p < 0.55) return 1;
  if (p < 0.63) return 1 - easeInOut((p - 0.55) / 0.08);
  return 0;
}
const err2Shake = (p: number) => (p < 0.27 || p > 0.55 ? 0 : Math.sin(2 * Math.PI * 3 * ((p - 0.27) / 0.28)));
function err2EyePose(p: number, lift: number): Rect[] {
  const c = err2Close(p), dx = 5 * err2Shake(p);
  return [0, 1].map((idx) => ({ ...restEye(idx, lift), cx: EYES[idx].cx + dx, h: lerp(10, 1.2, c) }));
}

// Done: rainbow colour cycle, a little rock, happy squinting eyes.
const RAINBOW = ["#C52C20", "#EF6546", "#F49724", "#FFCA26", "#D7D35E", "#008274", "#53B4AA", "#00CFFB", "#A959AB", "#F29CC2"];
function parseCol(c: string) {
  if (c[0] === "#") return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
  const m = c.match(/\d+/g) ?? ["0", "0", "0"];
  return [+m[0], +m[1], +m[2]];
}
function mixCol(a: string, b: string, u: number) {
  const A = parseCol(a), B = parseCol(b);
  return `rgb(${[0, 1, 2].map((i) => Math.round(A[i] + (B[i] - A[i]) * u)).join(",")})`;
}
function cycledColor(ph: number) {
  const n = RAINBOW.length, f = (((ph % 1) + 1) % 1) * n, i = Math.floor(f) % n;
  return mixCol(RAINBOW[i], RAINBOW[(i + 1) % n], f - Math.floor(f));
}
function wdCel(p: number) {
  if (p < 0.06) return p / 0.06;
  if (p < 0.65) return 1;
  if (p < 0.82) return 1 - easeInOut((p - 0.65) / 0.17);
  return 0;
}
function wdSquint(p: number) {
  if (p < 0.08) return 0;
  if (p < 0.16) return easeInOut((p - 0.08) / 0.08);
  if (p < 0.36) return 1;
  if (p < 0.5) return 1 - easeInOut((p - 0.36) / 0.14);
  return 0;
}
const wdColor = (p: number, color: string) => (wdCel(p) <= 0 ? color : mixCol(color, cycledColor(p * 2), wdCel(p)));
const wdRock = (p: number) => wdCel(p) * 12 * Math.sin(2 * Math.PI * 7 * p);
function happyEyePose(p: number): Rect[] {
  const cel = wdCel(p), slide = cel * 7 * Math.sin(2 * Math.PI * 7 * p), sq = wdSquint(p), up = cel * 15;
  return [0, 1].map((idx) => {
    const o = { cx: EYES[idx].cx, cy: 44, w: 6.667, h: 10, r: 1.515, rot: 0 };
    const z = { cx: EYES[idx].cx, cy: 43.5, w: 6.2, h: 2.4, r: 1.2, rot: idx ? 0.34 : -0.34 };
    return { ...mixRect(o, z, sq), cx: lerp(o.cx, z.cx, sq) + slide, cy: lerp(o.cy, z.cy, sq) - up, rot: lerp(o.rot, z.rot, sq) };
  });
}

// Working: the eyes scan left to right, row by row, top to bottom.
function workSweep(p: number) {
  const frac = (p * 3) % 1, A = 9;
  return frac < 0.82 ? -A + 2 * A * (frac / 0.82) : A - 2 * A * easeInOut((frac - 0.82) / 0.18);
}
const workTilt = (p: number) => -0.35 * workSweep(p);
function workEyePose(p: number): Rect[] {
  const N = 3, idx = Math.floor(p * N) % N, frac = (p * N) % 1, dx = workSweep(p);
  const rowDY = (i: number) => -10 + i * 8;
  const dy = frac < 0.82 ? rowDY(idx) : lerp(rowDY(idx), idx === N - 1 ? rowDY(0) : rowDY(idx + 1), easeInOut((frac - 0.82) / 0.18));
  return [0, 1].map((k) => ({ cx: EYES[k].cx + dx, cy: EYES[k].cy + dy, w: 6.667, h: 10, r: 1.515 }));
}

const STILL: Gaze[] = [{ t: 0, L: [0, 0], R: [0, 0] }, { t: 1, L: [0, 0], R: [0, 0] }];
const STATES: Record<AvatarState, StateDef> = {
  idle: {
    eyeCycle: 5.5, eyeReps: 2, planeRevs: [1, -1, 1], follows: true,
    gazeTrack: [{ t: 0, L: [0, 0], R: [0, 0] }, { t: 0.3, L: [1.6, -1.1], R: [1.3, -1.1] }, { t: 0.62, L: [-1.3, 0.6], R: [-1.6, 0.6] }, { t: 1, L: [0, 0], R: [0, 0] }],
    blinks: [{ c: 0.3 }, { c: 0.8 }],
  },
  looking: {
    eyeCycle: 6.51, eyeReps: 2, planeRevs: [1, -1, 1], tilt: 0.65, foreshorten: 0.3, follows: true,
    gazeTrack: [
      { t: 0, L: [0, 0], R: [0, 0] }, { t: 0.09, L: [0, 0], R: [0, 0] },
      { t: 0.17, L: [12, -16.5], R: [6.4, -16.4], ease: easeBack }, { t: 0.33, L: [12, -16.5], R: [6.4, -16.4] },
      { t: 0.44, L: [-7, -11.5], R: [-12.1, -11.6], ease: easeBack }, { t: 0.64, L: [-7, -11.5], R: [-12.1, -11.6] },
      { t: 0.72, L: [0, 0], R: [0, 0], ease: easeBack }, { t: 1, L: [0, 0], R: [0, 0] },
    ],
    blinks: [{ c: 0.135 }, { c: 0.455 }, { c: 0.735 }],
  },
  thinking1: { eyeCycle: 5.5, eyeReps: 1, planeRevs: [1, -1, 1], planeWarp: t1Warp, planeRevsPerCycle: 2, bounce: 1.2, eyePose: thinkingEyePose, gazeTrack: STILL, blinks: [{ c: 0.1 }] },
  thinking2: { eyeCycle: 9, eyeReps: 1, planeRevs: [1, -1, 1], eyePose: thinking2EyePose, gazeTrack: STILL, blinks: [{ c: 0.1 }] },
  working: { eyeCycle: 3.75, eyeReps: 1, planeRevs: [1, -1, 1], rock: workTilt, eyePose: workEyePose, gazeTrack: STILL, blinks: [{ c: 0.303, quick: true }, { c: 0.637, quick: true }, { c: 0.97, quick: true }] },
  happy: { eyeCycle: 3.2, eyeReps: 1, planeRevs: [1, -1, 1], colorCycle: wdColor, rock: wdRock, eyePose: happyEyePose, gazeTrack: STILL, blinks: [] },
  error1: { eyeCycle: 5.5, eyeReps: 1, planeRevs: [0, 0, 0], eyePose: err1EyePose, bodyOffset: err1Body, iconAlpha: err1Icon, gazeTrack: STILL, blinks: [{ c: 0.07 }] },
  error2: { eyeCycle: 4, eyeReps: 1, planeRevs: [0, 0, 0], eyePose: err2EyePose, bodyOffset: (p) => [2 * err2Shake(p), 0], gazeTrack: STILL, blinks: [{ c: 0.07 }] },
  inactive: { eyeCycle: 3.4, eyeReps: 1, planeRevs: [0, 0, 0], closed: true, zzz: true, gazeTrack: [{ t: 0, L: [0, 4], R: [0, 4] }, { t: 1, L: [0, 4], R: [0, 4] }], blinks: [] },
};
export const AVATAR_STATES = Object.keys(STATES) as AvatarState[];

// Path2D only exists in the browser, so build the shapes on first draw.
let paths: { surfaces: Record<Surface, Path2D>; planes: Path2D[] } | null = null;
function rrRect(W: number, H: number, r: number, deg: number) {
  const hw = W / 2, hh = H / 2, rp = new Path2D();
  rp.moveTo(-hw + r, -hh);
  rp.arcTo(hw, -hh, hw, hh, r);
  rp.arcTo(hw, hh, -hw, hh, r);
  rp.arcTo(-hw, hh, -hw, -hh, r);
  rp.arcTo(-hw, -hh, hw, -hh, r);
  rp.closePath();
  const p = new Path2D();
  p.addPath(rp, new DOMMatrix().translateSelf(32, 32).rotateSelf(deg));
  return p;
}
function getPaths() {
  if (!paths) {
    const union = (parts: [number, number, number, number][]) => {
      const p = new Path2D();
      for (const [W, H, r, d] of parts) p.addPath(rrRect(W, H, r, d));
      return p;
    };
    paths = {
      surfaces: {
        rounded: new Path2D(SURFACE_D),
        diagonal: union(SURFACE_PARTS.diagonal),
        diamond: union(SURFACE_PARTS.diamond),
        octagon: union(SURFACE_PARTS.octagon),
        burst: union(SURFACE_PARTS.burst),
      },
      planes: PLANE_D.map((d) => new Path2D(d)),
    };
  }
  return paths;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawZZZ(ctx: CanvasRenderingContext2D, p: number) {
  for (let k = 0; k < 3; k++) {
    const ph = (p + k / 3) % 1;
    const a = ph < 0.16 ? ph / 0.16 : ph > 0.72 ? (1 - ph) / 0.28 : 1;
    ctx.save();
    ctx.globalAlpha = clamp(a, 0, 1) * 0.92;
    ctx.fillStyle = "#fff";
    ctx.font = `700 ${6 + ph * 4}px ui-sans-serif,system-ui,sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("z", 45 + ph * 6, 39 - ph * 18);
    ctx.restore();
  }
}

// Dizzy swirl eye: grows outward from the centre while it spins in.
function drawSwirl(ctx: CanvasRenderingContext2D, color: string, cx: number, cy: number, R: number, dir: number, grow: number, rot: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.85;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  const n = 36, turns = 2.3;
  for (let i = 0; i <= n; i++) {
    const f = (i / n) * grow, th = dir * turns * 2 * Math.PI * f + rot, r = R * f;
    if (i) ctx.lineTo(r * Math.cos(th), r * Math.sin(th));
    else ctx.moveTo(r * Math.cos(th), r * Math.sin(th));
  }
  ctx.stroke();
  ctx.restore();
}

/** Where the cursor is relative to the avatar: a direction (each axis -1..1) and how much to look at it (0..1). */
export type Follow = { x: number; y: number; k: number };

/** Draw one frame of a pal's avatar onto a square canvas `px` pixels wide, at `t` seconds into its animation. */
export function drawAvatar(ctx: CanvasRenderingContext2D, px: number, look: Look, stateKey: AvatarState, t: number, follow?: Follow) {
  const state = STATES[stateKey];
  const { surfaces, planes } = getPaths();
  const { contentScale: cs, eyeLift: lift } = SURFACE_FIT[look.surface];
  const base = baseAngles(look.seed);
  const p = (t / state.eyeCycle) % 1;

  let bx = 0, by = 0;
  if (state.bounce) {
    const lp = clamp((p - 0.32) / 0.5, 0, 1);
    if (lp > 0 && lp < 1) by += state.bounce * Math.sin(2 * Math.PI * 3 * lp);
  }
  if (state.bodyOffset) {
    const [mx, my] = state.bodyOffset(p);
    bx += mx;
    by += my;
  }
  let tilt = 0;
  if (state.tilt) {
    const g = gaze(state.gazeTrack, p);
    tilt = -((g.L[0] + g.R[0]) / 2) * state.tilt;
  }
  if (state.rock) tilt += state.rock(p);
  const k = state.follows && follow ? clamp(follow.k, 0, 1) : 0;
  tilt += k * 4 * (follow?.x ?? 0); // lean toward the cursor

  const o = openness(state, p);
  const sx = 1 + 0.05 * (1 - o), sy = 0.08 + 0.92 * o;
  let poses: Rect[];
  if (state.eyePose) poses = state.eyePose(p, lift);
  else {
    const g = gaze(state.gazeTrack, p);
    if (k && follow) {
      // Blend the idle glances toward the cursor.
      const fx = follow.x * 7, fy = follow.y * 6;
      g.L = [lerp(g.L[0], fx, k), lerp(g.L[1], fy, k)];
      g.R = [lerp(g.R[0], fx, k), lerp(g.R[1], fy, k)];
    }
    let fwL = 1, fwR = 1;
    if (state.foreshorten) {
      const ax = (g.L[0] + g.R[0]) / 2, amt = clamp(Math.abs(ax) / 9.5, 0, 1) * state.foreshorten;
      if (ax > 0) fwR = 1 - amt;
      else if (ax < 0) fwL = 1 - amt;
    }
    poses = [
      { cx: EYES[0].cx + g.L[0], cy: EYES[0].cy + g.L[1] + lift, w: EYES[0].w * fwL, h: EYES[0].h, r: EYES[0].r },
      { cx: EYES[1].cx + g.R[0], cy: EYES[1].cy + g.R[1] + lift, w: EYES[1].w * fwR, h: EYES[1].h, r: EYES[1].r },
    ];
  }
  // Scale the face inward for smaller silhouettes.
  let eyes = poses.map((e) => {
    const cx = 32 + (e.cx - 32) * cs, cy = 32 + (e.cy - 32) * cs, w = e.w * cs * sx, h = e.h * cs * sy;
    return { cx, cy, w, h, r: Math.min(e.r * cs * sx, w / 2, e.r * cs * sy, h / 2), rot: e.rot ?? 0 };
  });

  let eyeAlpha = 1;
  let swirl: { alpha: number; grow: number; rot: number; centres: { cx: number; cy: number }[] } | null = null;
  const mz = state.iconAlpha?.(p) ?? 0;
  if (mz > 0.001) {
    const grow = clamp((mz - 0.12) / 0.88, 0, 1);
    const shrink = clamp(1 - mz * 1.3, 0, 1); // the eye collapses to a point first
    swirl = { alpha: clamp(mz * 2.5, 0, 1), grow: grow * grow * (3 - 2 * grow), rot: 1.75 * 2 * Math.PI * Math.pow(1 - mz, 3), centres: eyes.map((e) => ({ cx: e.cx, cy: e.cy })) };
    eyeAlpha = clamp(1 - mz * 1.6, 0, 1);
    eyes = eyes.map((e) => ({ ...e, w: e.w * shrink, h: e.h * shrink, r: e.r * shrink }));
  }

  const s = px / 64;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, px, px);
  ctx.setTransform(s, 0, 0, s, 0, 0);
  ctx.save();
  ctx.translate(bx, by);
  if (tilt) {
    ctx.translate(32, 32);
    ctx.rotate((tilt * Math.PI) / 180);
    ctx.translate(-32, -32);
  }

  const color = state.colorCycle ? state.colorCycle(p, look.color) : look.color;
  ctx.save();
  ctx.clip(surfaces[look.surface]);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 64, 64);
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = PLANE_ALPHA;
  for (let i = 0; i < 3; i++) {
    const [cx, cy] = PLANE_C[i];
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(planeAngle(state, i, t, base));
    ctx.translate(-cx, -cy);
    ctx.fill(planes[i]);
    ctx.restore();
  }
  ctx.restore();

  ctx.fillStyle = look.eyeColor;
  ctx.globalAlpha = eyeAlpha;
  for (const e of eyes) {
    ctx.save();
    ctx.translate(e.cx, e.cy);
    if (e.rot) ctx.rotate(e.rot);
    roundRect(ctx, -e.w / 2, -e.h / 2, e.w, e.h, e.r);
    ctx.fill();
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  if (swirl) {
    ctx.globalAlpha = swirl.alpha;
    swirl.centres.forEach((c, i) => drawSwirl(ctx, look.eyeColor, c.cx, c.cy, 3.6 * cs, i ? 1 : -1, swirl.grow, swirl.rot));
    ctx.globalAlpha = 1;
  }
  if (state.zzz) drawZZZ(ctx, p);
  ctx.restore();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
