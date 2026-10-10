"use client";

import { useEffect, useRef } from "react";
import { drawAvatar, type AvatarState, type Follow } from "@/lib/avatar";
import type { Look, PalStatus } from "@/lib/look";

// What each pal status looks like: ready blinks and glances, working scans, needing you looks around, paused sleeps.
const FOR_STATUS: Record<PalStatus, AvatarState> = { idle: "idle", working: "working", waiting: "looking", paused: "inactive" };

// One animation clock for every avatar on screen, at ~30fps (they're small and move slowly).
const frames = new Set<(t: number) => void>();
let raf = 0;
let last = 0;
function tick(now: number) {
  raf = requestAnimationFrame(tick);
  if (now - last < 32) return;
  last = now;
  for (const draw of frames) draw(now / 1000);
}
function onFrame(draw: (t: number) => void) {
  frames.add(draw);
  if (!raf) raf = requestAnimationFrame(tick);
  return () => {
    frames.delete(draw);
    if (!frames.size) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}

// Where the cursor is, shared by every avatar so their eyes can follow it.
const pointer = { x: 0, y: 0, at: -Infinity };
let tracking = false;
function trackPointer() {
  if (tracking) return;
  tracking = true;
  window.addEventListener("pointermove", (e) => Object.assign(pointer, { x: e.clientX, y: e.clientY, at: performance.now() }), { passive: true });
  document.documentElement.addEventListener("pointerleave", () => (pointer.at = -Infinity));
}

type Props = { look: Look; status?: PalStatus; state?: AvatarState; size?: number; className?: string };

/** A pal's animated avatar. `state` overrides the pose that `status` picks. */
export default function PalAvatar({ look, status = "idle", state, size = 36, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pose = state ?? FOR_STATUS[status];

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const px = Math.round(size * Math.min(window.devicePixelRatio || 1, 2));
    canvas.width = canvas.height = px;
    // Offset each pal's clock by its seed so a list of them doesn't blink in unison.
    const offset = (look.seed % 800) / 100;
    // Eyes turn toward the cursor while it moves, easing back to their own glances a few seconds after it stops.
    const follow: Follow = { x: 0, y: 0, k: 0 };
    const draw = (t: number) => {
      const active = performance.now() - pointer.at < 3000;
      let tx = 0, ty = 0;
      if (active) {
        const r = canvas.getBoundingClientRect();
        const dx = pointer.x - (r.left + r.width / 2), dy = pointer.y - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) + 80; // softer near the avatar, full turn from a distance
        tx = dx / d;
        ty = dy / d;
      }
      follow.x += (tx - follow.x) * 0.2;
      follow.y += (ty - follow.y) * 0.2;
      follow.k += ((active ? 1 : 0) - follow.k) * 0.12;
      drawAvatar(ctx, px, look, pose, t + offset, follow);
    };

    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (still.matches) {
      draw(0);
      return;
    }
    trackPointer();
    draw(performance.now() / 1000);
    let stop: (() => void) | null = null;
    // Only animate while on screen.
    const seen = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) stop ??= onFrame(draw);
      else {
        stop?.();
        stop = null;
      }
    });
    seen.observe(canvas);
    return () => {
      seen.disconnect();
      stop?.();
    };
  }, [look, pose, size]);

  return <canvas ref={ref} aria-hidden className={className} style={{ width: size, height: size }} />;
}

/** A larger avatar for hero spots: keeps a square `size` box with the avatar centred in it, leaving room around it. */
export function PalStage({ size = 160, className, ...props }: Props) {
  return (
    <div className={className} style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <PalAvatar {...props} size={Math.round(size * 0.62)} />
    </div>
  );
}
