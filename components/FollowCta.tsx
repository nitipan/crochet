import { site, social } from "@/data/social";
import { ScrollReveal } from "./ScrollReveal";
import { SocialButtons } from "./SocialButtons";
import styles from "./FollowCta.module.css";

export function FollowCta() {
  const { follow: copy } = site.sections;

  return (
    <section
      id="follow"
      className={`section ${styles.section}`}
      aria-labelledby="follow-title"
    >
      <div className="container">
        <ScrollReveal>
          <div className={styles.card}>
            <div className={styles.sign} aria-hidden="true">
              <div className={styles.signIcon}>
                <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
                  <circle cx="24" cy="28" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M18 18c2-6 8-10 14-8M30 14c4 2 6 8 4 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line x1="24" y1="14" x2="24" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="20" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className={styles.signHandmade}>Handmade</p>
              <p className={styles.signBrand}>{social.brandName}</p>
            </div>

            <div className={styles.content}>
              <h2 id="follow-title" className={styles.title}>
                {copy.title}
              </h2>
              <p className={styles.subtext}>{copy.subtext}</p>
              <SocialButtons size="large" variant="luxury" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
