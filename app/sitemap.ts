import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  return [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/notices` },
    { url: `${base}/results` },
    { url: `${base}/news` },
    { url: `${base}/districts` },
    { url: `${base}/contact` },
  ];
}


