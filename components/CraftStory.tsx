import Image from "next/image";
import { craftStoryImage } from "@/data/products";
import { site } from "@/data/social";
import { ProtectedImage } from "./ProtectedImage";
import { ScrollReveal } from "./ScrollReveal";
import styles from "./CraftStory.module.css";

export function CraftStory() {
  const { craftStory: copy } = site.sections;

  return (
    <section
      id="craft-story"
      className={`section ${styles.section}`}
      aria-labelledby="craft-story-title"
    >
      <div className="container">
        <ScrollReveal>
          <p className="sectionLabel">{copy.label}</p>
          <h2 id="craft-story-title" className="sectionTitle">
            {copy.title}
          </h2>
        </ScrollReveal>

        <div className={styles.grid}>
          <ScrollReveal className={styles.text} delay={100}>
            {copy.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <blockquote className={styles.quote}>
              &ldquo;{copy.quote}&rdquo;
            </blockquote>
            {copy.outro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </ScrollReveal>

          <ScrollReveal className={styles.imageCol} delay={200}>
            <figure className={styles.figure}>
              <div className={styles.frame}>
                <ProtectedImage className={styles.imageWrap}>
                  <Image
                    src={`/products/${craftStoryImage.src}`}
                    alt={craftStoryImage.alt}
                    width={600}
                    height={750}
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className={styles.image}
                    draggable={false}
                  />
                </ProtectedImage>
              </div>
              <figcaption className={styles.caption}>
                手作り — made by hand
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
