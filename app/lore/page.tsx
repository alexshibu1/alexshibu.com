import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";
import LoreClient from "./LoreClient";

export const metadata: Metadata = sectionMetadata(
  "Lore",
  "Timeline of life milestones, events, and experiences by Alex Shibu.",
  "/lore",
);

export default function LorePage() {
  return (
    <main className="page-content">
      <LoreClient />
    </main>
  );
}
