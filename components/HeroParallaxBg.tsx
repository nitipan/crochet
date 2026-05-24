"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

type HeroParallaxBgProps = {
  src: string;
};

const MAX_SHIFT = 24;
const MAX_ROT = 3.5;
const LERP = 0.1;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function shouldUseParallax() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return (
    window.matchMedia("(max-width: 640px)").matches ||
    window.matchMedia("(hover: none) and (pointer: coarse)").matches
  );
}

export function HeroParallaxBg({ src }: HeroParallaxBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !shouldUseParallax()) return;

    const hero = el.closest("section");
    if (!hero) return;

    el.classList.add(styles.bgImageParallax);
    hero.classList.add(styles.heroParallax);

    const pointerRef = { x: 0, y: 0 };
    const scrollRef = { y: 0 };
    const targetRef = { x: 0, y: 0, rx: 0, ry: 0 };
    const currentRef = { x: 0, y: 0, rx: 0, ry: 0 };
    let idlePhase = 0;
    let raf = 0;

    const applyTransform = () => {
      const c = currentRef;
      el.style.transform = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0) rotateX(${c.rx.toFixed(3)}deg) rotateY(${c.ry.toFixed(3)}deg)`;
    };

    const updateScroll = () => {
      const rect = hero.getBoundingClientRect();
      scrollRef.y = clamp(-rect.top / rect.height, -0.2, 0.35);
    };

    const updatePointerFromEvent = (clientX: number, clientY: number) => {
      const rect = hero.getBoundingClientRect();
      pointerRef.x = clamp(((clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      pointerRef.y = clamp(((clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
    };

    const tick = () => {
      idlePhase += 0.012;
      const idleX = Math.sin(idlePhase) * 0.12;
      const idleY = Math.cos(idlePhase * 0.85) * 0.08;

      const nx = pointerRef.x + idleX;
      const ny = pointerRef.y + idleY + scrollRef.y * 1.4;

      targetRef.x = nx * MAX_SHIFT;
      targetRef.y = ny * MAX_SHIFT;
      targetRef.rx = -ny * MAX_ROT;
      targetRef.ry = nx * MAX_ROT;

      currentRef.x += (targetRef.x - currentRef.x) * LERP;
      currentRef.y += (targetRef.y - currentRef.y) * LERP;
      currentRef.rx += (targetRef.rx - currentRef.rx) * LERP;
      currentRef.ry += (targetRef.ry - currentRef.ry) * LERP;

      applyTransform();
      raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      updatePointerFromEvent(event.clientX, event.clientY);
    };

    const onPointerLeave = () => {
      pointerRef.x = 0;
      pointerRef.y = 0;
    };

    const onScroll = () => updateScroll();

    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerdown", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });

    updateScroll();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerdown", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScroll);
      el.classList.remove(styles.bgImageParallax);
      hero.classList.remove(styles.heroParallax);
      el.style.removeProperty("transform");
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
