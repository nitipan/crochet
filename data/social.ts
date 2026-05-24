import siteData from "@/content/site.json";

export const social = {
  brandName: siteData.brandName,
  tagline: siteData.tagline,
  facebook: siteData.social.facebook,
  tiktok: siteData.social.tiktok,
} as const;

export const site = siteData;
