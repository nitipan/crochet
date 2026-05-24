"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

type HeroParallaxBgProps = {
  src: string;
};

const MAX_SHIFT = 22;
const MAX_ROT = 3;
const LERP = 0.1;

type OrientationEventCtor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState>;
};

function isParallaxDevice() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return (
    window.matchMedia("(max-width: 640px)").matches ||
    window.matchMedia("(hover: none) and (pointer: coarse)").matches
  );
}

function needsMotionPermission() {
  const ctor = DeviceOrientationEvent as OrientationEventCtor;
  return typeof ctor.requestPermission === "function";
}

export function HeroParallaxBg({ src }: HeroParallaxBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const enabledRef = useRef(false);
  const baselineRef = useRef<{ gamma: number; beta: number } | null>(null);
  const targetRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const currentRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const rafRef = useRef(0);
  const enableRef = useRef<(() => void) | null>(null);
  const [showMotionHint, setShowMotionHint] = useState(false);

  const requestMotionAccess = useCallback(() => {
    const ctor = DeviceOrientationEvent as OrientationEventCtor;

    if (typeof ctor.requestPermission === "function") {
      ctor
        .requestPermission()
        .then((state) => {
          if (state === "granted") enableRef.current?.();
        })
        .catch(() => {
          /* denied */
        });
      return;
    }

    enableRef.current?.();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!isParallaxDevice()) return;

    const hero = el.closest("section");

    const applyTransform = () => {
      const c = currentRef.current;
      el.style.transform = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0) rotateX(${c.rx.toFixed(3)}deg) rotateY(${c.ry.toFixed(3)}deg)`;
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
      hero?.classList.add(styles.heroParallax);
      setShowMotionHint(false);
      rafRef.current = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      activeRef.current = false;
      enabledRef.current = false;
      cancelAnimationFrame(rafRef.current);
      targetRef.current = { x: 0, y: 0, rx: 0, ry: 0 };
      currentRef.current = { x: 0, y: 0, rx: 0, ry: 0 };
      baselineRef.current = null;
      el.classList.remove(styles.bgImageParallax);
      hero?.classList.remove(styles.heroParallax);
      el.style.removeProperty("transform");
    };

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (!enabledRef.current) return;
      if (event.gamma == null || event.beta == null) return;

      if (!baselineRef.current) {
        baselineRef.current = { gamma: event.gamma, beta: event.beta };
      }

      const { gamma, beta } = baselineRef.current;
      const dx = event.gamma - gamma;
      const dy = event.beta - beta;

      const nx = Math.max(-1, Math.min(1, dx / 20));
      const ny = Math.max(-1, Math.min(1, dy / 20));

      targetRef.current = {
        x: nx * MAX_SHIFT,
        y: ny * MAX_SHIFT * 0.65,
        rx: -ny * MAX_ROT,
        ry: nx * MAX_ROT,
      };

      if (!activeRef.current) startLoop();
    };

    const enableOrientation = () => {
      if (enabledRef.current) return;
      enabledRef.current = true;
      window.addEventListener("deviceorientation", onOrientation, {
        passive: true,
      });
      startLoop();
    };

    enableRef.current = enableOrientation;

    if (needsMotionPermission()) {
      setShowMotionHint(true);
    } else if ("DeviceOrientationEvent" in window) {
      enableOrientation();
    }

    const onOrientationChange = () => {
      baselineRef.current = null;
    };
    window.addEventListener("orientationchange", onOrientationChange);

    return () => {
      enableRef.current = null;
      window.removeEventListener("deviceorientation", onOrientation);
      window.removeEventListener("orientationchange", onOrientationChange);
      stopLoop();
    };
  }, []);

  return (
    <>
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
      {showMotionHint ? (
        <button
          type="button"
          className={styles.motionHint}
          onClick={requestMotionAccess}
        >
          Tap to enable motion
        </button>
      ) : null}
    </>
  );
}
