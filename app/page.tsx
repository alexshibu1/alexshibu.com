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
          I’m a 21 y/o in Toronto, going from “ideas guy” to shipping cool shit.
          Right now i&apos;m obsessed with getting dangerous at full-stack dev,
          deeply understaning math & physics, and then build really great
          products.
        </p>
        <p>
          At UofT I study physics & com sci. on this site i park experiments,
          document my journey, and thoughts going down rabbit holes. previously
          I&apos;ve done a lot of randome side quests, from reasearch in Israel
          during a war to running a whole bunch of ig theme pages keto, bath
          bombs and gaming. Excited to learn and share my journey with you.
        </p>
        <p>
          currently running in different cities, becoming healthy, throwing
          potatoes at the wall, and documenting the mess in between.
        </p>
        <p>
          I will soon become the ultimate swiss-army knife that can understand
          users, build, and growth hack extremely useful things.
        </p>
        <p>Join my internal board of directors</p>
        <p>would love to chat!</p>
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
