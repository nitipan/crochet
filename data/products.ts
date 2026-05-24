import productsData from "@/content/products.json";

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductCategory = {
  id: string;
  label: string;
  images: ProductImage[];
};

export const heroImage = productsData.hero;
export const craftStoryImage = productsData.craftStory;
export const studioImages = productsData.studio;
export const categories = productsData.categories;

export const allGalleryImages: ProductImage[] = categories.flatMap(
  (category) => category.images,
);
