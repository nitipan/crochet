import type { Metadata } from "next";
import { Noto_Serif_JP, Zen_Kaku_Gothic_New } from "next/font/google";
import { site, social } from "@/data/social";
import "./globals.css";

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-serif",
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-zen-kaku",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.domain),
  title: {
    default: social.brandName,
    template: `%s | ${social.brandName}`,
  },
  description: site.seo.description,
  keywords: site.seo.keywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: social.brandName,
    title: `${social.brandName} — Handcrafted Crochet`,
    description: site.seo.ogDescription,
    images: [
      {
        url: `/products/${site.seo.ogImage}`,
        width: 1200,
        height: 630,
        alt: `Handmade amigurumi doll by ${social.brandName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${social.brandName} — Handcrafted Crochet`,
    description: site.seo.ogDescription,
    images: [`/products/${site.seo.ogImage}`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${zenKaku.variable}`}>
      <body>{children}</body>
    </html>
  );
}
