// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import InteractiveHeading from "./components/waveHeading";
import SubstackForm from "./components/SubstackForm";
import {
  ALEX_PERSON,
  sectionMetadata,
  webpageJsonLd,
  websiteJsonLd,
} from "./lib/seo";

// Hero inline links: override .page-content a (red in globals.css) with ! so gray wins
const subtleLink =
  "group inline-flex items-baseline !text-black hover:!text-red-500 !font-medium hover:underline hover:decoration-red-300 hover:underline-offset-2 transition-all duration-150 cursor-pointer";
const linkV4Arrow =
  "inline-block max-w-0 ml-0 overflow-hidden opacity-0 whitespace-nowrap align-baseline text-[0.65em] group-hover:max-w-[1.25em] group-hover:opacity-100 group-hover:ml-0.5 transition-all duration-150";

export const metadata: Metadata = sectionMetadata(
  "Home",
  "Alex Shibu is a Toronto based developer, growth engineer, and student at University of Toronto sharing projects, writing, journey, books, and experiments.",
  "/",
);

export default function Home() {
  const homeWebPageJsonLd = webpageJsonLd(
    "Alex Shibu",
    "Personal website of Alex Shibu, a Toronto based developer, student at UofT sharing projects, writing, and journey in startups.",
    "/",
  );

  return (
    <div className="page-content">
      <div className="hero">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeWebPageJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ALEX_PERSON) }}
        />
        <InteractiveHeading />
        <p className="hero-subline">
          I&apos;m Alex Shibu. Currently obsessed with building a foundation for
          asymmetric outcomes. That starts with getting{" "}
          <Link href="/technical" className={subtleLink}>
            dangerous
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>{" "}
          at full-stack engineering, product growth, and math & physics for
          machine learning.
        </p>
        <p>
          On this site I park{" "}
          <Link href="/projects" className={subtleLink}>
            projects
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>
          , document my{" "}
          <Link href="/lore" className={subtleLink}>
            journey
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>
          , and dive into{" "}
          <Link href="/writing" className={subtleLink}>
            rabbit holes
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>{" "}
          and{" "}
          <Link href="/sidequests" className={subtleLink}>
            sidequests
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>
          . Past work includes everything from decision theory, organizing
          hackathons, selling keto books on Instagram, and bath bombs on
          Shopify. Currently building voice agents for SMBs or HR departments.
        </p>
        <p>
          I spend a lot of time{" "}
          <Link href="/run" className={subtleLink}>
            running
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>
          {""},{" "}
          <Link href="/books" className={subtleLink}>
            reading
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>
          , reviewing{" "}
          <Link href="/coffee" className={subtleLink}>
            coffee
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>
          , and doing{" "}
          <Link href="/experiments" className={subtleLink}>
            experiments
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>
          .
        </p>
        <p>
          In the pursuit of becoming the ultimate Swiss Army knife who can build
          great products, grow users, and create communities.
        </p>
        <p>
          Join my internal board of directors for occasional updates. Love to
          chat!
        </p>
        <div
          style={{
            margin: "1.5rem 0 0 0",
            display: "flex",
            justifyContent: "left",
          }}
        >
          <SubstackForm />
        </div>
      </div>

      <footer className="footer">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span className="font-sans text-gray-500 opacity-75">
            God Bless the Hustle 🚢
          </span>

          <span className="opacity-20 select-none">|</span>
          <a
            href="https://alexshibustats.vercel.app/share/tGdLEFmSbLfZxG6F?date=7day"
            target="_blank"
            rel="noopener noreferrer"
            className="!text-gray-500 opacity-75 hover:!text-red-500 hover:underline transition-colors hover:opacity-100"
          >
            Stats
          </a>
        </div>
      </footer>
      {/* 
      <div className="footer-right-corner">
        <span className="opacity-80 tracking-tight">
          Last edited <span className="italic tracking-tight">Dec 5, 2025</span>
        </span>
      </div> */}
    </div>
  );
}
