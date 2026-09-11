"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useAnimationControls, useReducedMotion, type Variants } from "motion/react";
import { usePageEntrance, entranceTransition as transition } from "@/components/common/usePageEntrance";

const makeVariants = (y: number, scale = 1): Variants => ({
  hidden: { opacity: 0, y, scale },
  visible: { opacity: 1, y: 0, scale: 1, transition },
});
export const eyebrowVariants = makeVariants(12);
export const headingVariants = makeVariants(35);
export const descriptionVariants = makeVariants(18);
export const buttonVariants = makeVariants(16, 0.96);
export const featureRowVariants = makeVariants(12);
export const trustCardVariants = makeVariants(20, 0.98);
const entranceDelays = [0.12, 0.35, 0.60, 0.85, 1.15, 1.45, 1.75, 1.85, 1.95, 2.05, 1.75];
const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function useHeroVideoAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const startedAt = usePageEntrance();
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const [failed, setFailed] = useState(false);
  const eyebrow = useAnimationControls();
  const line1 = useAnimationControls();
  const line2 = useAnimationControls();
  const line3 = useAnimationControls();
  const description = useAnimationControls();
  const buttons = useAnimationControls();
  const feature1 = useAnimationControls();
  const feature2 = useAnimationControls();
  const feature3 = useAnimationControls();
  const feature4 = useAnimationControls();
  const trustCard = useAnimationControls();
  const groups = useMemo(() => [eyebrow, line1, line2, line3, description, buttons, feature1, feature2, feature3, feature4, trustCard],
    [eyebrow, line1, line2, line3, description, buttons, feature1, feature2, feature3, feature4, trustCard]);
  const showVideo = hydrated && reducedMotion === false && !failed;

  // One entrance per mount, independent of media loading, looping, and tab changes.
  useEffect(() => {
    if (reducedMotion !== false) {
      groups.forEach(control => { control.stop(); control.set({ opacity: 1, y: 0, scale: 1 }); });
      return;
    }
    if (startedAt === null) {
      groups.forEach(control => control.set("hidden"));
      return;
    }
    const elapsed = (performance.now() - startedAt) / 1000;
    groups.forEach((control, index) => {
      const delay = entranceDelays[index] - elapsed;
      if (delay <= -transition.duration) {
        control.set("visible");
        return;
      }
      control.set("hidden");
      void control.start({ opacity: 1, y: 0, scale: 1, transition: { ...transition, delay: Math.max(0, delay), duration: Math.min(transition.duration, transition.duration + delay) } });
    });
    return () => groups.forEach(control => control.stop());
  }, [groups, startedAt, reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!showVideo || !video) return;
    let disposed = false;
    const fallback = () => {
      if (disposed) return;
      video.pause();
      setFailed(true);
    };
    const play = () => {
      if (!disposed && !document.hidden) void video.play().catch(fallback);
    };
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else play();
    };
    video.addEventListener("canplay", play);
    video.addEventListener("error", fallback);
    document.addEventListener("visibilitychange", onVisibility);
    if (video.error) fallback();
    else if (video.readyState >= 3) play();
    return () => {
      disposed = true;
      video.removeEventListener("canplay", play);
      video.removeEventListener("error", fallback);
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, [showVideo]);

  return { videoRef, showVideo, eyebrow, lines: [line1, line2, line3], description, buttons, features: [feature1, feature2, feature3, feature4], trustCard };
}
