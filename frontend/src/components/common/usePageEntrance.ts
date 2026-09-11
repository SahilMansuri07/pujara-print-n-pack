"use client";

import { useSyncExternalStore } from "react";

export const entranceTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

// One clock for the navbar and hero, retained across client navigation.
// A full reload creates a new clock. Late hydration catches up to this origin.
let startedAt: number | null = null;
let frame: number | null = null;
const listeners = new Set<() => void>();
const start = () => {
  if (startedAt !== null || frame !== null) return;
  frame = requestAnimationFrame(() => {
    frame = null;
    startedAt = performance.now();
    listeners.forEach(notify => notify());
  });
};
const subscribe = (notify: () => void) => {
  listeners.add(notify);
  if (startedAt === null) {
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }
  return () => {
    listeners.delete(notify);
    if (!listeners.size) {
      window.removeEventListener("load", start);
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    }
  };
};
const snapshot = () => startedAt;
const serverSnapshot = () => null;

export function usePageEntrance() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
