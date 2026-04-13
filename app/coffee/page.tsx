import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";
import CoffeeClient from "./CoffeeClient";

export const metadata: Metadata = sectionMetadata(
  "Coffee Reviews",
  "Cafe reviews from Toronto and beyond — ratings, drinks, and notes from Alex Shibu.",
  "/coffee",
);

export default function CoffeePage() {
  return (
    <main className="page-content coffee-page">
      <CoffeeClient />
    </main>
  );
}
