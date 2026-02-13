import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...sectionMetadata(
    "Email",
    "Best cold emails Alex Shibu has tried, sent, is stocking to try with examples and learnings.",
    "/email",
  ),
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
