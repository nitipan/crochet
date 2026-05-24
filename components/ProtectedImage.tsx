"use client";

import type { ReactNode, DragEvent, MouseEvent } from "react";
import styles from "./ProtectedImage.module.css";

type ProtectedImageProps = {
  children: ReactNode;
  className?: string;
};

export function ProtectedImage({ children, className }: ProtectedImageProps) {
  const block = (event: MouseEvent | DragEvent) => {
    event.preventDefault();
  };

  return (
    <div
      className={`${styles.wrap} ${className ?? ""}`.trim()}
      onContextMenu={block}
      onDragStart={block}
    >
      {children}
      <span className={styles.shield} aria-hidden="true" />
      <span className={styles.watermark} aria-hidden="true">
        FB: Tosaporn Pompan
      </span>
    </div>
  );
}
