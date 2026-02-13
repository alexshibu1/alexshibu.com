import type { Metadata } from "next";

export const SITE_URL = "https://alexshibu.com";
export const DEFAULT_OG_IMAGE = "/images/about/banner3.png";

export const ALEX_PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#alexshibu`,
  name: "Alex Shibu",
  alternateName: "alexshibu",
  url: SITE_URL,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  description:
    "Alex Shibu is a Toronto based full-stack developer, growth engineer, and student at University of Toronto becoming technically dangerous through shipping startups fast.",
  jobTitle: "Full-Stack Developer and Growth Engineer",
  homeLocation: "Toronto, Canada",
  sameAs: [
    "https://github.com/alexshibu1",
    "https://linkedin.com/in/alexshibu",
    "https://instagram.com/alexshibu1",
    "https://x.com/alexshibu2",
  ],
  knowsAbout: [
    "Full-stack development",
    "Next.js",
    "Startups",
    "TypeScript",
    "Growth engineering",
    "AI tooling",
    "Founder journey",
    "Product",
  ],
} as const;

export function absoluteUrl(pathname = "/"): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalized}`;
}

export function sectionMetadata(
  title: string,
  description: string,
  pathname: string,
): Metadata {
  const canonical = absoluteUrl(pathname);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Alex Shibu",
      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 630,
          alt: "Alex Shibu",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Alex Shibu",
    alternateName: "alexshibu.com",
    publisher: { "@id": `${SITE_URL}/about#alexshibu` },
  };
}

export function webpageJsonLd(
  name: string,
  description: string,
  pathname = "/",
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(pathname)}#webpage`,
    url: absoluteUrl(pathname),
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/about#alexshibu` },
  };
}

export function articleJsonLd(input: {
  headline: string;
  description?: string;
  pathname: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}) {
  const canonical = absoluteUrl(input.pathname);
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    mainEntityOfPage: {
      "@type": "WebPage" as const,
      "@id": `${canonical}#webpage`,
    },
    headline: input.headline,
    description: input.description ?? input.headline,
    author: { "@id": `${SITE_URL}/about#alexshibu` },
    publisher: { "@id": `${SITE_URL}/about#alexshibu` },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    url: canonical,
  };
  if (input.image) jsonLd.image = absoluteUrl(input.image);
  return jsonLd;
}
