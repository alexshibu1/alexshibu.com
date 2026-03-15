import type { Metadata } from "next";
import { absoluteUrl, sectionMetadata } from "../lib/seo";

const title = "Projects";
const description =
  "Projects, jobs, and experiences Alex Shibu has built and shipped across AI, product, web3, and more.";

export const metadata: Metadata = {
  ...sectionMetadata(title, description, "/projects"),
  keywords: [
    "Alex Shibu projects",
    "full-stack projects",
    "AI projects",
    "startup projects",
    "web3 projects",
    "portfolio",
  ],
  category: "technology",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    ...sectionMetadata(title, description, "/projects").openGraph,
    type: "website",
    url: absoluteUrl("/projects"),
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
