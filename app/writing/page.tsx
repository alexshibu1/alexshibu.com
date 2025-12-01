import Link from "next/link";

const essays = [
  {
    slug: "gap-year",
    title: "My Builder Gap Year",
    date: "January 20, 2025",
  },
  {
    slug: "ethereum",
    title: "predictive outlook at Ethereum price 2022",
    date: "December 1, 2021",
  },
];

export default function WritingPage() {
  return (
    <main className="page-content">
      <h1 className="hero-heading">writing</h1>
      <p className="hero-subline">
        essays, logs, and experiments from the builder gap year.
      </p>

      <ul style={{ marginTop: "2rem" }}>
        {essays.map((essay) => (
          <li key={essay.slug} className="essay-item">
            <span className="date">{essay.date}</span>
            <Link href={`/essay/${essay.slug}`}>{essay.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
