import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";
import RunClient from "./RunClient";

export const metadata: Metadata = sectionMetadata(
  "Running",
  "Strava activity log — runs, walks, hikes, and rides from Alex Shibu across Toronto, India, Switzerland, and beyond.",
  "/run",
);

export default function RunPage() {
  return (
    <main className="page-content">
      <RunClient />
    </main>
  );
}
