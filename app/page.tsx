// app/page.tsx
import Link from "next/link";
import InteractiveHeading from "./components/waveHeading";
import SubstackForm from "./components/SubstackForm";

// Hero inline links: override .page-content a (red in globals.css) with ! so gray wins
const subtleLink =
  "group inline-flex items-baseline !text-gray-600 hover:!text-gray-800 !font-medium hover:underline hover:decoration-gray-400 hover:underline-offset-2 transition-all duration-150 cursor-pointer";
const linkV4Arrow =
  "inline-block max-w-0 ml-0 overflow-hidden opacity-0 whitespace-nowrap align-baseline text-[0.65em] group-hover:max-w-[1.25em] group-hover:opacity-100 group-hover:ml-0.5 transition-all duration-150";
export default function Home() {
  return (
    <div className="page-content">
      <div className="hero">
        <h1 className="hero-heading">
          {" "}
          <span>
            <InteractiveHeading />
          </span>
        </h1>
        <p className="hero-subline">
          I&apos;m a 21 y/o in Toronto. I&apos;m currently obsessed with
          building myself a solid foundation for asymmetric outcomes. That
          starts with getting dangerous at full-stack dev, deeply understanding
          math & physics, and then building really great products.
        </p>
        <p>
          At UofT, I study physics & comp sci. On this site I park experiments,
          document my{" "}
          <Link href="/lore" className={subtleLink}>
            journey
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>
          , and dive into rabbit holes and{" "}
          <Link href="/sidequests" className={subtleLink}>
            sidequests
            <span className={linkV4Arrow} aria-hidden="true">
              ↗
            </span>
          </Link>
          . I&apos;ve previously worked on everything from research at Technion
          on decision theory during a war to running global hackathons and IG
          theme pages for selling keto books and bath bombs.
        </p>
        <p>
          I love running in different cities,{" "}
          <Link href="/writing" className={subtleLink}>
            writing
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
          , and doing hard things.
        </p>
        <p>
          I want to become the ultimate Swiss Army knife that can build useful
          products, understand users, and grow hack.
        </p>
        <p>Join my internal board of directors. Love to chat!</p>

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
          <span className="font-sans text-gray-500 ">
            God Bless the Hustle 🚢
          </span>

          <span className="opacity-20 select-none">|</span>

          <span>
            <a
              href="https://web.archive.org/web/20230404045813/https://alexshibu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="!text-gray-500 opacity-50 hover:!text-red-500 hover:underline transition-colors hover:opacity-100"
            >
              v1
            </a>
            <span className="mx-1 text-gray-300">,</span>
            <a
              href="https://personalsite-jfsmu01xm-alex-ss-projects-55e2bcbf.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="!text-gray-500 opacity-50 hover:!text-red-500 hover:underline transition-colors hover:opacity-100"
            >
              v2
            </a>
          </span>
          <span className="opacity-20 select-none">|</span>
          <a
            href="https://alexshibustats.vercel.app/share/tGdLEFmSbLfZxG6F"
            target="_blank"
            rel="noopener noreferrer"
            className="!text-gray-500 opacity-50 hover:!text-red-500 hover:underline transition-colors hover:opacity-100"
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
