import styles from "./ImageWatermark.module.css";

export function ImageWatermark() {
  return (
    <span className={styles.watermark} aria-hidden="true">
      FB: Tosaporn Pompan
    </span>
  );
}
