import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...sectionMetadata(
    "Technical",
    "Technical roadmap for Alex Shibu becoming technically dangerous at full-stack product building.",
    "/technical",
  ),
  robots: {
    index: false,
    follow: false,
  },
};

export default function TechnicalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

