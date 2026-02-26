import type { Metadata } from "next";
import { sectionMetadata } from "../../lib/seo";

export const metadata: Metadata = sectionMetadata(
  "Alex's Fitness Master Plan",
  "My working plan to get body fat under 25%: training split, KPIs, supplements, recovery protocol, and guardrails. Tracked with Whoop.",
  "/essay/body",
);

export default function BodyEssayLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
