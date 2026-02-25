import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

function essayRoutes(): string[] {
  const essaysDir = path.join(process.cwd(), "app", "essay");
  if (!fs.existsSync(essaysDir)) return [];

  const EXCLUDED_ESSAY_SLUGS = new Set(["naval-almanack"]);

  return fs
    .readdirSync(essaysDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => !EXCLUDED_ESSAY_SLUGS.has(slug))
    .filter((slug) => fs.existsSync(path.join(essaysDir, slug, "page.mdx")))
    .map((slug) => `/essay/${slug}`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "/",
    "/about",
    "/projects",
    "/writing",
    "/books",
    "/coffee",
    "/email",
    "/experiments",
    "/lore",
    "/sidequests",
    "/rejected",
    "/run",
  ];

  const routes = [...staticRoutes, ...essayRoutes()];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
