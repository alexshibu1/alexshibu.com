import type { Metadata } from "next";
import { sectionMetadata, webpageJsonLd } from "../lib/seo";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = sectionMetadata(
  "Projects",
  "Projects, jobs, and experiences Alex Shibu has built and shipped across AI, product, web3, and more.",
  "/projects",
);

export default function ProjectsPage() {
  const projectsWebPageJsonLd = webpageJsonLd(
    "Projects | Alex Shibu",
    "Projects, jobs, and experiences Alex Shibu has built and shipped across AI, product, web3, and more.",
    "/projects",
  );

  return (
    <main className="page-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsWebPageJsonLd),
        }}
      />
      <ProjectsClient />
    </main>
  );
}
