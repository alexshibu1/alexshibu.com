import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";

export const metadata: Metadata = sectionMetadata(
  "Moving",
  "Runs, walks, hikes, and rides across cities with Strava highlights, notes, and timeline snapshots.",
  "/run",
);

export default function RunLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
