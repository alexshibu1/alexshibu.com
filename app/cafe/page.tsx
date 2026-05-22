import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";
import CoffeeClient from "./CoffeeClient";

export const metadata: Metadata = sectionMetadata(
  "Cafe Reviews",
  "Cafe reviews from Toronto and beyond — ratings, drinks, and notes from Alex Shibu.",
  "/cafe",
);

export default function CoffeePage() {
  return (
    <main className="page-content coffee-page">
      <CoffeeClient />
    </main>
  );
}
