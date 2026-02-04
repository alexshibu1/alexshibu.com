// app/page.tsx
import Link from "next/link";
import InteractiveHeading from "./components/waveHeading";

const subtleLink =
  "text-gray-500 hover:text-gray-800 transition-colors duration-150 cursor-pointer";
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
          At UofT I study physics & comp sci. On this site I park experiments,
          document my{" "}
          <Link href="/lore" className={subtleLink}>
            journey
          </Link>
          , and dive into rabbit holes and{" "}
          <Link href="/sidequests" className={subtleLink}>
            sidequests
          </Link>
          . I&apos;ve previously worked on everyhting from research at Technion on
          decision theory during a war to running global hackathons and IG theme
          pages for selling keto books and bath bombs.
        </p>
        <p>
          You can find me running in different cities, writing awful coffee
          reviews, and throwing potatoes at the wall.
        </p>
        <p>
          I will soon become the ultimate Swiss Army knife that can build useful
          products,understand users, and scale with growth hacking.
        </p>
        <p>Join my internal board of directors, I would love to chat!</p>
        <p>Would love to chat!</p>
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
