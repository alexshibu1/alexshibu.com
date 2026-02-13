import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";

export const metadata: Metadata = sectionMetadata(
  "Experiments",
  "Ongoing self-improvement experiments by Alex Shibu in health, fitness, and productivity.",
  "/experiments",
);

export default function ExperimentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
