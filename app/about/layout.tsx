import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";

export const metadata: Metadata = sectionMetadata(
  "About",
  "About Alex Shibu: full-stack developer, growth engineer, and a student founder in Toronto.",
  "/about",
);

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
