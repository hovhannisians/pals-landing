"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A little scene that plays only while you hover its card. At rest it shows its last step, so every card reads as a
 * finished story; hovering replays it from the start, and leaving puts it back.
 */
export type Scene = {
  step: number;
  playing: boolean;
  bind: {
    onPointerEnter: (e: React.PointerEvent) => void;
    onPointerLeave: (e: React.PointerEvent) => void;
    onClick: () => void;
  };
};

/** With a mouse a scene plays while hovered. On touch screens a tap plays it through once, and another tap stops it. */
export function useScene(count: number, ms: number): Scene {
  const [step, setStep] = useState(count - 1);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastPointer = useRef<string>("mouse");
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
    setStep(count - 1);
  };
  const play = (once: boolean) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (timer.current) clearInterval(timer.current);
    setPlaying(true);
    setStep(0);
    let n = 0;
    timer.current = setInterval(() => {
      n += 1;
      if (once && n >= count - 1) {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
        setStep(count - 1);
        setTimeout(() => setPlaying(false), ms);
        return;
      }
      setStep((s) => (s + 1) % count);
    }, ms);
  };
  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);
  return {
    step,
    playing,
    bind: {
      onPointerEnter: (e) => {
        lastPointer.current = e.pointerType;
        if (e.pointerType === "mouse") play(false);
      },
      onPointerLeave: (e) => {
        if (e.pointerType === "mouse") stop();
      },
      onClick: () => {
        if (lastPointer.current === "mouse") return;
        if (timer.current) stop();
        else play(true);
      },
    },
  };
}

/**
 * A scene that plays by itself: it starts when at least a third of it is on screen, loops while it stays there (holding
 * its finished state for a moment each time round), and
 * pauses (back on its finished state) when it scrolls away. Reduced motion keeps it on the finished state.
 */
export function useAutoScene(count: number, ms: number, hold = 4) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(count - 1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (timer) return;
      setPlaying(true);
      setStep(0);
      // Count ticks past the last step, so the finished state stays up for `hold` beats before it starts over.
      let tick = 0;
      timer = setInterval(() => {
        tick = (tick + 1) % (count + hold);
        setStep(Math.min(tick, count - 1));
      }, ms);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
      setPlaying(false);
      setStep(count - 1);
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.35 });
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [count, ms, hold]);

  return { ref, step, playing };
}
