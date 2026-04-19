import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

function gitLastModified(absPath: string): Date | null {
  try {
    const relPath = path.relative(process.cwd(), absPath);
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", relPath],
      { cwd: process.cwd(), encoding: "utf8" },
    ).trim();
    if (!iso) return null;
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

function fileMtime(absPath: string): Date | null {
  try {
    return fs.statSync(absPath).mtime;
  } catch {
    return null;
  }
}

function lastModifiedForSource(absPath: string): Date {
  return gitLastModified(absPath) ?? fileMtime(absPath) ?? new Date();
}

function essayEntries(): Array<{ route: string; sourcePath: string }> {
  const essaysDir = path.join(process.cwd(), "app", "essay");
  if (!fs.existsSync(essaysDir)) return [];

  return fs
    .readdirSync(essaysDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .map((slug) => ({
      slug,
      absPath: path.join(essaysDir, slug, "page.mdx"),
    }))
    .filter(({ absPath }) => fs.existsSync(absPath))
    .map(({ slug, absPath }) => ({
      route: `/essay/${slug}`,
      sourcePath: absPath,
    }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), "app");

  const staticEntries: Array<{
    route: string;
    sourcePath: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    {
      route: "/",
      sourcePath: path.join(appDir, "page.tsx"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      route: "/about",
      sourcePath: path.join(appDir, "about", "page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      route: "/projects",
      sourcePath: path.join(appDir, "projects", "page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      route: "/writing",
      sourcePath: path.join(appDir, "writing", "page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      route: "/books",
      sourcePath: path.join(appDir, "books", "page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      route: "/coffee",
      sourcePath: path.join(appDir, "coffee", "page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      route: "/experiments",
      sourcePath: path.join(appDir, "experiments", "page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      route: "/lore",
      sourcePath: path.join(appDir, "lore", "page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      route: "/sidequests",
      sourcePath: path.join(appDir, "sidequests", "page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      route: "/rejected",
      sourcePath: path.join(appDir, "rejected", "page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      route: "/run",
      sourcePath: path.join(appDir, "run", "page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      route: "/technical",
      sourcePath: path.join(appDir, "technical", "page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const entries = [
    ...staticEntries,
    ...essayEntries().map((e) => ({
      ...e,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return entries.map((entry) => ({
    url: `${SITE_URL}${entry.route}`,
    lastModified: lastModifiedForSource(entry.sourcePath),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
