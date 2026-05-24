import { heroImage } from "@/data/products";
import { social } from "@/data/social";
import { HeroParallaxBg } from "./HeroParallaxBg";
import { SocialButtons } from "./SocialButtons";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HeroParallaxBg src={`/products/${heroImage.src}`} />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.accent}>手作り</p>
        <h1 id="hero-title" className={styles.title}>
          {social.brandName}
        </h1>
        <div className={styles.titleRule} aria-hidden="true" />
        <p className={styles.tagline}>{social.tagline}</p>
        <div className={styles.cta}>
          <SocialButtons size="large" variant="luxury" />
        </div>
      </div>

      <a href="#craft-story" className={styles.scrollHint}>
        <span className={styles.scrollHintInner}>
          <span>Discover our work</span>
          <span className={styles.scrollArrow} aria-hidden="true">
            ↓
          </span>
        </span>
      </a>
    </section>
  );
}
