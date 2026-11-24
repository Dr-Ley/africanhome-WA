import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { loadSafariCatalog } from "@/lib/safari/catalog";

const routes = [
  "",
  "/destinations",
  "/maasai-mara",
  "/safaris",
  "/plan-safari",
  "/vehicle-hire",
  "/kenya-diani-beach",
  "/fly-in-safaris",
  "/photography-safaris",
  "/luxury-budget-safaris",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = routes.map((path) => ({
    url: `${SITE.domain}${path || "/"}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const packages = (await loadSafariCatalog()).map((item) => ({
    url: `${SITE.domain}/safaris/${item.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...staticRoutes, ...packages];
}
