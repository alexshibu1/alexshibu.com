import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";

export const metadata: Metadata = sectionMetadata(
  "Email",
  "Best cold emails Alex Shibu has tried, sent, and examples with learnings.",
  "/email",
);

export default function EmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
