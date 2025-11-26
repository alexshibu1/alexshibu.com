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
          this site is where i park the experiments: small web apps, AI tools,
          and random rabbit holes that went too far.
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
