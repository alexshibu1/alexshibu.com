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

const homeDescription =
  "Alex Shibu is a Toronto based developer, growth engineer, and student at University of Toronto sharing projects, writing, journey, books, and experiments.";

export const metadata: Metadata = {
  ...sectionMetadata("Alex Shibu", homeDescription, "/"),
  // Bypass root layout template ("%s | Alex Shibu") so the tab title is not "Alex Shibu | Alex Shibu"
  title: { absolute: "Alex Shibu" },
};

export default function Home() {
  const homeWebPageJsonLd = webpageJsonLd(
    "Alex Shibu",
    "Personal website of Alex Shibu, a Toronto based developer, student at UofT sharing projects, writing, and journey in startups.",
    "/",
  );

  return (
    <div className="page-content home-page">
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

        {/* Intro */}
        <p className="hero-subline">
          I&apos;m Alex Shibu, from Toronto. Currently obsessed with building a
          foundation for asymmetric outcomes. Starting with getting{" "}
          <Link href="/technical" className={subtleLink}>
            dangerous
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>{" "}
          at full-stack engineering, product growth, and math & physics for
          machine learning.
        </p>
        <p className="home-current-build">
          Building voice agents for plumbers and SMBs, documenting with content,
          thoughts on{" "}
          <a
            href="https://x.com/alexshibu2"
            className={subtleLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </a>
          , and now increasingly pulled into drones and hardware projects.
        </p>
        <div className="home-previously-block">
          <p>Previously, I...</p>
          <ul>
            <li>Turned $3K into $100K in NFTs, then lost it all</li>
            <li>Worked on info gap decision theory at Technion</li>
            <li>Taught 100+ young people tech and English in Poland</li>
            <li>
              Led EasyHacks w/Perplexity AI with 170+ participants from 13
              countries with $4K in prizes
            </li>

            <li>
              Made my first dollars selling bath bombs and keto ebooks on
              Shopify and IG
            </li>
          </ul>
        </div>
        <p className="home-on-this-site">
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
          . Outside of that you&apos;ll find me{" "}
          <Link href="/run" className={subtleLink}>
            running
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>{" "}
          in different cities,{" "}
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
          , and doing fun{" "}
          <Link href="/experiments" className={subtleLink}>
            experiments
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>
          .
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

      {/* <div className="footer-right-corner">
        <span className="block opacity-50 tracking-tight text-right footer-last-edited-date">
          Last edited{" "}
          <span className="footer-last-edited-date italic tracking-tight">
            Apr 14, 2026
          </span>
        </span>
      </div> */}
    </div>
  );
}
