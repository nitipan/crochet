import Image from "next/image";
import { studioImages } from "@/data/products";
import { site } from "@/data/social";
import { ScrollReveal } from "./ScrollReveal";
import styles from "./Studio.module.css";

export function Studio() {
  const { studio: copy } = site.sections;

  return (
    <section
      id="studio"
      className={`section ${styles.section}`}
      aria-labelledby="studio-title"
    >
      <div className="container">
        <ScrollReveal>
          <p className="sectionLabel">{copy.label}</p>
          <h2 id="studio-title" className="sectionTitle">
            {copy.title}
          </h2>
          <p className={`sectionIntro ${styles.intro}`}>{copy.intro}</p>
        </ScrollReveal>

        <div className={styles.grid}>
          {studioImages.map((image, i) => (
            <ScrollReveal key={image.src} delay={i * 100}>
              <figure className={styles.figure}>
                <div className={styles.imageWrap}>
                  <Image
                    src={`/products/${image.src}`}
                    alt={image.alt}
                    width={700}
                    height={500}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.image}
                    loading="lazy"
                  />
                </div>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
