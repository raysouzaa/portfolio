import type { MetadataRoute } from "next";
import { seo } from "@/content/perfil";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: seo.url, changeFrequency: "monthly", priority: 1 }];
}
