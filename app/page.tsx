// app/page.tsx
export default function Home() {
  return (
    <div className="page-content">
      <div className="hero">
        <h1 className="hero-heading">Hey, I&apos;m Alex.</h1>
        <p className="hero-subline">
          i’m a 21-year-old builder in Toronto, trying to go from “ideas guy” to
          “actually ships things.” right now i’m on a self-designed “builder
          year” to get dangerous at full-stack dev + AI, deeply understand
          physics and math, and start throwing potatoes at the wall.
        </p>
        <p>
          this site is where i park experiments, side quests, document my
          journey, and thoughts going down rabbit holes I&apos;m obsessed with.
          A lot of people tell me I have insane amount of lore. I&apos;ve done a
          lot of things. From during reasearch in Israel during a war to running
          a whole amazon review talent mangment system for chinese companies.
          Excited to learn and share my journey with you.
        </p>
      </div>

      <footer className="footer mt-auto">
        {/* <p>
          Last edited {new Date().toLocaleDateString()} – God bless the hustle.
          Made with ❤️ Alex Shibu
        </p> */}
      </footer>
    </div>
  );
}
