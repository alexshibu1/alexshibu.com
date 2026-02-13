import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";

export const metadata: Metadata = sectionMetadata(
  "Coffee Reviews",
  "Coffee reviews by Alex Shibu who visits 60+ cafes across Toronto to find the best coffee and environments.",
  "/coffee",
);

export default function CoffeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
