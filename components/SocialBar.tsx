"use client";

import { useEffect, useState } from "react";
import { social } from "@/data/social";
import { SocialButtons } from "./SocialButtons";
import styles from "./SocialBar.module.css";

export function SocialBar() {
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    const onResize = () => setCompact(window.innerWidth < 640);

    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      className={`${styles.bar} ${scrolled ? styles.barScrolled : ""}`}
      role="banner"
    >
      <div className={styles.inner}>
        <a href="#" className={styles.brand}>
          {social.brandName}
        </a>
        <nav className={styles.nav} aria-label="Social links">
          <SocialButtons compact={compact} />
        </nav>
      </div>
    </header>
  );
}
