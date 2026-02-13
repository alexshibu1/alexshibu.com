import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";

export const metadata: Metadata = sectionMetadata(
  "Lore",
  "Timeline of moments that shaped Alex Shibu's life and journey as a builder.",
  "/lore",
);

export default function LoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
