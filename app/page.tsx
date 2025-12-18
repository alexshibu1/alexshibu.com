// app/page.tsx
import InteractiveHeading from "./components/waveHeading";
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
          I&apos;m a 21 y/o in Toronto, going from &quot;ideas guy&quot; to
          shipping cool shit. Right now I&apos;m obsessed with getting dangerous
          at full-stack dev, deeply understanding math & physics, and then
          building really great products.
        </p>
        <p>
          At UofT I study physics & comp sci. On this site I park experiments,
          document my journey, and thoughts from rabbit holes. Previously
          I&apos;ve done a lot of random side quests, from research in Israel
          during a war to running a bunch of IG theme pages: keto, bath bombs,
          and gaming. Excited to learn and share my journey with you.
        </p>
        <p>
          Currently running in different cities, becoming healthy, throwing
          potatoes at the wall, and documenting the mess in between.
        </p>
        <p>
          I will soon become the ultimate Swiss Army knife that can understand
          users, build, and growth hack extremely useful things.
        </p>
        <p>Join my internal board of directors.</p>
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
