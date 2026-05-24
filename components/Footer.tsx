import { site, social } from "@/data/social";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  const { copyright, imageNotice } = site.footer;

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>{social.brandName}</p>
        <nav className={styles.nav} aria-label="Footer social links">
          <a
            href={social.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <span className={styles.divider} aria-hidden="true">
            ·
          </span>
          <a
            href={social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>
        </nav>
        <p className={styles.copy}>
          © {year} {social.brandName}. {copyright}
        </p>
        <p className={styles.notice}>{imageNotice}</p>
      </div>
    </footer>
  );
}
