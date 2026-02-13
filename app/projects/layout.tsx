import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";

export const metadata: Metadata = sectionMetadata(
  "Projects",
  "Projects, jobs, and experiences Alex Shibu has built and shipped across AI, product, web3, and more.",
  "/projects",
);

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
