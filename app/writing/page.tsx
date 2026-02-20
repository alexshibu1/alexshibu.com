import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import WritingClient from "./WritingClient";
import { sectionMetadata } from "../lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = sectionMetadata(
  "Writing",
  "Essays, logs, blogs, and experiments by Alex Shibu.",
  "/writing",
);

type EssayMeta = {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  type?: "essay" | "thought" | "book" | "project";
};

function readAllEssayMeta(): EssayMeta[] {
  const essaysDir = path.join(process.cwd(), "app", "essay");
  if (!fs.existsSync(essaysDir)) return [];

  const EXCLUDED_WRITING_SLUGS = new Set(["naval-almanack"]);
  const entries = fs.readdirSync(essaysDir, { withFileTypes: true });

  const metas: EssayMeta[] = entries
    .filter(
      (e) =>
        e.isDirectory() &&
        e.name !== "rejection" &&
        !EXCLUDED_WRITING_SLUGS.has(e.name),
    )
    .map((dir) => {
      const mdxPath = path.join(essaysDir, dir.name, "page.mdx");
      if (!fs.existsSync(mdxPath)) return null;
      const raw = fs.readFileSync(mdxPath, "utf8");

      // Parse metadata manually since it's in JS export, not YAML frontmatter
      let title = dir.name;
      let date = undefined;
      let description = undefined;
      let type: "essay" | "thought" | "book" | undefined = undefined;

      // 1. Try to extract title/desc/date from export const metadata
      // Relaxed regex: matches export const metadata = { ... } (ignoring trailing semicolon/whitespace)
      const metadataMatch = raw.match(/export const metadata = \{([\s\S]*?)\}/);
      if (metadataMatch) {
        const content = metadataMatch[1];

        // Match title: "..." or title: '...'
        const titleMatch = content.match(/title:\s*["']([^"']*)["']/);
        if (titleMatch) title = titleMatch[1];

        // Match description: "..." or description: '...'
        const descMatch = content.match(/description:\s*["']([^"']*)["']/);
        if (descMatch) description = descMatch[1];

        // Match date: "..." or date: '...'
        const dateMatch = content.match(/date:\s*["']([^"']*)["']/);
        if (dateMatch) date = dateMatch[1];

        // Match type: "..." or type: '...'
        const typeMatch = content.match(/type:\s*["']([^"']*)["']/);
        if (typeMatch) type = typeMatch[1] as "essay" | "thought" | "book";
      }

      if (!date) {
        // Matches date="..." inside EssayHeader tag
        const headerMatch = raw.match(/<EssayHeader[^>]*date=["']([^"']*)["']/);
        if (headerMatch) {
          date = headerMatch[1];
        }
      }

      // 3. Fallback: if title is in EssayHeader but not metadata
      if (title === dir.name) {
        const headerTitleMatch = raw.match(
          /<EssayHeader[^>]*title=["']([^"']*)["']/,
        );
        if (headerTitleMatch) {
          title = headerTitleMatch[1];
        }
      }

      // 4. Fallback: try to find # Title in markdown content
      if (title === dir.name) {
        const h1Match = raw.match(/^#\s+(.+)$/m);
        if (h1Match) {
          title = h1Match[1];
        }
      }

      console.log(
        `Parsed essay: ${dir.name}, Title: ${title}, Date: ${date}, Type: ${type}`,
      );

      return {
        slug: dir.name,
        title,
        date,
        description,
        type: type, // Only use explicit type from metadata
      } as EssayMeta;
    })
    .filter(Boolean) as EssayMeta[];

  // sort: newest first (if date present)
  metas.sort((a, b) => {
    if (a.date && b.date) return +new Date(b.date) - +new Date(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return a.slug.localeCompare(b.slug);
  });

  return metas;
}

export default function WritingIndex() {
  const essays = readAllEssayMeta();

  return (
    <main className="page-content writing-page">
      <h1 className="hero-heading">writing</h1>
      <p className="hero-subline">
        essays, logs, and experiments from the builder gap year.
      </p>

      <WritingClient essays={essays} />
    </main>
  );
}
