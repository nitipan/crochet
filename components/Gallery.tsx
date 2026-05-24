import { categories } from "@/data/products";
import { site } from "@/data/social";
import { ScrollReveal } from "./ScrollReveal";
import { GalleryGrid } from "./GalleryGrid";
import styles from "./Gallery.module.css";

export function Gallery() {
  const { gallery: copy } = site.sections;

  return (
    <section
      id="gallery"
      className={`section sectionDark ${styles.section}`}
      aria-labelledby="gallery-title"
    >
      <div className="container">
        <ScrollReveal>
          <p className="sectionLabel">{copy.label}</p>
          <h2 id="gallery-title" className="sectionTitle">
            {copy.title}
          </h2>
          <p className="sectionIntro">{copy.intro}</p>
        </ScrollReveal>

        <div className={styles.categories}>
          {categories.map((category, i) => (
            <ScrollReveal key={category.id} delay={i * 80}>
              <div className={styles.category}>
                <h3 className={styles.categoryTitle}>{category.label}</h3>
                <GalleryGrid
                  images={category.images}
                  categoryLabel={category.label}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
