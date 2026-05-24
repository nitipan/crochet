import { SocialBar } from "@/components/SocialBar";
import { Hero } from "@/components/Hero";
import { CraftStory } from "@/components/CraftStory";
import { Gallery } from "@/components/Gallery";
import { Studio } from "@/components/Studio";
import { FollowCta } from "@/components/FollowCta";
import { Footer } from "@/components/Footer";
import { site, social } from "@/data/social";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: social.brandName,
  description: site.seo.description,
  url: site.seo.domain,
  sameAs: [social.facebook, social.tiktok],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SocialBar />
      <main>
        <Hero />
        <CraftStory />
        <Gallery />
        <Studio />
        <FollowCta />
      </main>
      <Footer />
    </>
  );
}
