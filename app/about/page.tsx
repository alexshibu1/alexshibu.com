import type { Metadata } from "next";
import { ALEX_PERSON, sectionMetadata, webpageJsonLd } from "../lib/seo";
import AboutClient from "./AboutClient";

export const metadata: Metadata = sectionMetadata(
  "About",
  "About Alex Shibu, a Toronto based full-stack developer and growth engineer studying Physics and Computer Science at the University of Toronto.",
  "/about",
);

export default function AboutPage() {
  const aboutWebPageJsonLd = webpageJsonLd(
    "About Alex Shibu",
    "About Alex Shibu, a Toronto based full-stack developer and growth engineer.",
    "/about",
  );

  return (
    <main className="page-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ALEX_PERSON) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutWebPageJsonLd) }}
      />
      <AboutClient />
    </main>
  );
}
