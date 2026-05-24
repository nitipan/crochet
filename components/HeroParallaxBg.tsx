"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

type HeroParallaxBgProps = {
  src: string;
};

const MAX_SHIFT = 18;
const MAX_ROT = 2.5;
const LERP = 0.08;

export function HeroParallaxBg({ src }: HeroParallaxBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const baselineRef = useRef<{ gamma: number; beta: number } | null>(null);
  const targetRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const currentRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    if (reducedMotion || !mobile) return;

    let enabled = false;

    const applyTransform = () => {
      const c = currentRef.current;
      el.style.setProperty("--parallax-x", `${c.x.toFixed(2)}px`);
      el.style.setProperty("--parallax-y", `${c.y.toFixed(2)}px`);
      el.style.setProperty("--parallax-rx", `${c.rx.toFixed(3)}deg`);
      el.style.setProperty("--parallax-ry", `${c.ry.toFixed(3)}deg`);
    };

    const tick = () => {
      if (!activeRef.current) return;

      const t = targetRef.current;
      const c = currentRef.current;
      c.x += (t.x - c.x) * LERP;
      c.y += (t.y - c.y) * LERP;
      c.rx += (t.rx - c.rx) * LERP;
      c.ry += (t.ry - c.ry) * LERP;
      applyTransform();
      rafRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (activeRef.current) return;
      activeRef.current = true;
      el.classList.add(styles.bgImageParallax);
      el.closest("section")?.classList.add(styles.heroParallax);
      rafRef.current = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      activeRef.current = false;
      cancelAnimationFrame(rafRef.current);
      targetRef.current = { x: 0, y: 0, rx: 0, ry: 0 };
      currentRef.current = { x: 0, y: 0, rx: 0, ry: 0 };
      el.classList.remove(styles.bgImageParallax);
      el.closest("section")?.classList.remove(styles.heroParallax);
      el.style.removeProperty("--parallax-x");
      el.style.removeProperty("--parallax-y");
      el.style.removeProperty("--parallax-rx");
      el.style.removeProperty("--parallax-ry");
    };

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (!enabled) return;
      if (event.gamma == null || event.beta == null) return;

      if (!baselineRef.current) {
        baselineRef.current = { gamma: event.gamma, beta: event.beta };
      }

      const { gamma, beta } = baselineRef.current;
      const dx = event.gamma - gamma;
      const dy = event.beta - beta;

      const nx = Math.max(-1, Math.min(1, dx / 25));
      const ny = Math.max(-1, Math.min(1, dy / 25));

      targetRef.current = {
        x: nx * MAX_SHIFT,
        y: ny * MAX_SHIFT * 0.6,
        rx: -ny * MAX_ROT,
        ry: nx * MAX_ROT,
      };
    };

    const enableOrientation = () => {
      enabled = true;
      window.addEventListener("deviceorientation", onOrientation, {
        passive: true,
      });
      startLoop();
    };

    const requestAccess = async () => {
      const orientationEvent = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<"granted" | "denied" | "default">;
      };

      if (typeof orientationEvent.requestPermission === "function") {
        try {
          const state = await orientationEvent.requestPermission();
          if (state === "granted") enableOrientation();
        } catch {
          /* permission denied or unavailable */
        }
        return;
      }

      if ("DeviceOrientationEvent" in window) {
        enableOrientation();
      }
    };

    const hero = el.closest("section");
    const onFirstTouch = () => {
      void requestAccess();
      hero?.removeEventListener("touchstart", onFirstTouch);
    };

    hero?.addEventListener("touchstart", onFirstTouch, { passive: true });

    if ("DeviceOrientationEvent" in window) {
      const orientationEvent = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<"granted" | "denied" | "default">;
      };
      if (typeof orientationEvent.requestPermission !== "function") {
        enableOrientation();
      }
    }

    return () => {
      hero?.removeEventListener("touchstart", onFirstTouch);
      window.removeEventListener("deviceorientation", onOrientation);
      stopLoop();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.bgImage} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.bgPhoto}
      />
    </div>
  );
}
