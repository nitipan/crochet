"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/data/products";
import { ImageWatermark } from "./ImageWatermark";
import styles from "./GalleryGrid.module.css";

type GalleryGridProps = {
  images: ProductImage[];
  categoryLabel: string;
};

export function GalleryGrid({ images, categoryLabel }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, close, goPrev, goNext]);

  let touchStartX = 0;

  return (
    <>
      <ul className={styles.grid} role="list">
        {images.map((image, index) => (
          <li key={`${categoryLabel}-${image.src}-${index}`} className={styles.item}>
            <button
              type="button"
              className={styles.thumbBtn}
              onClick={() => setLightboxIndex(index)}
              aria-label={`View ${image.alt}`}
            >
              <span className={styles.thumbInner}>
                <Image
                  src={`/products/${image.src}`}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={styles.thumb}
                />
                <ImageWatermark />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {lightboxIndex !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${categoryLabel} gallery viewer`}
          onClick={close}
        >
          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchStartX = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const diff = e.changedTouches[0].clientX - touchStartX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) goPrev();
                else goNext();
              }
            }}
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={close}
              aria-label="Close gallery"
            >
              ×
            </button>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={goPrev}
              aria-label="Previous image"
            >
              ‹
            </button>
            <figure className={styles.lightboxFigure}>
              <div className={styles.lightboxMedia}>
                <Image
                  src={`/products/${images[lightboxIndex].src}`}
                  alt={images[lightboxIndex].alt}
                  width={900}
                  height={1200}
                  sizes="90vw"
                  className={styles.lightboxImage}
                  priority
                />
                <ImageWatermark />
              </div>
              <figcaption className={styles.lightboxCaption}>
                {images[lightboxIndex].alt}
              </figcaption>
            </figure>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={goNext}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
