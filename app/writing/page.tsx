import Link from "next/link";

const essays = [
  {
    slug: "ethereum",
    title: "predictive outlook at Ethereum price 2022",
    date: "December 1, 2021",
  },
  {
    slug: "profs",
    title: "profs need coaches",
    date: "February 25, 2024",
  },
  {
    slug: "gapyear",
    title: "My Builder Gap Year",
    date: "January 20, 2025",
  },
];

export default function WritingPage() {
  return (
    <main className="page-content">
      <h1 className="hero-heading">writing</h1>
      <p className="hero-subline">
        essays, logs, and experiments from the builder gap year.
      </p>
      <ul className="writing-list">
        {/* Change this line: */}
        {essays
          .slice()
          .reverse()
          .map((essay) => (
            <li key={essay.slug} className="essay-item">
              <Link href={`/essay/${essay.slug}`}>{essay.title}</Link>
              <span className="date">{essay.date}</span>
            </li>
          ))}
      </ul>{" "}
    </main>
  );
}
