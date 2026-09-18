import type { MetadataRoute } from "next";
import { sessions } from "@/content/sessions";
import { intervenants } from "@/content/intervenants";
import { site } from "@/content/site";

/**
 * Sitemap généré depuis les données : impossible d'y laisser traîner une page
 * « copie-de- » comme celle que Google indexait sur l'ancien site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();

  const pages: { url: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { url: "/", priority: 1, changeFrequency: "weekly" },
    { url: "/formations", priority: 0.9, changeFrequency: "weekly" },
    { url: "/intervenants", priority: 0.7, changeFrequency: "monthly" },
    { url: "/financement", priority: 0.8, changeFrequency: "monthly" },
    { url: "/l-ecole", priority: 0.6, changeFrequency: "yearly" },
    { url: "/temoignages", priority: 0.5, changeFrequency: "monthly" },
    { url: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { url: "/contact", priority: 0.5, changeFrequency: "yearly" },
    { url: "/candidater", priority: 0.8, changeFrequency: "monthly" },
    { url: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
    { url: "/cgv", priority: 0.2, changeFrequency: "yearly" },
    { url: "/confidentialite", priority: 0.2, changeFrequency: "yearly" },
    { url: "/accessibilite", priority: 0.2, changeFrequency: "yearly" },
    { url: "/reclamations", priority: 0.3, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((page) => ({
      url: `${site.url}${page.url}`,
      lastModified: maintenant,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...sessions.map((session) => ({
      url: `${site.url}/formations/${session.slug}`,
      lastModified: maintenant,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...intervenants.map((personne) => ({
      url: `${site.url}/intervenants/${personne.slug}`,
      lastModified: maintenant,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
