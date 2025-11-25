import Link from "next/link";

export default function Sidebar() {
  const linkClassName = "block hover:bg-gray-100 transition-colors";

  return (
    <div className="sidebar">
      <div className="nav-links">
        <Link href="/" className={linkClassName}>
          HOME
        </Link>
        <Link href="/write" className={linkClassName}>
          WRITING
        </Link>
        <Link href="/read" className={linkClassName}>
          READING
        </Link>
        <Link href="/experiments" className={linkClassName}>
          EXPERIMENTS
        </Link>
        <Link href="/sidequest" className={linkClassName}>
          SIDE QUESTS
        </Link>
        <Link href="/photos" className={linkClassName}>
          PHOTOS
        </Link>
        <Link href="/coffee" className={linkClassName}>
          COFFEE REVIEWS ☕
        </Link>
        <Link href="/submitreview" className={linkClassName}>
          SUBMIT A REVIEW ☕
        </Link>
        <Link href="/work" className={linkClassName}>
          WORK
        </Link>
      </div>

      <div className="social-links mt-8">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/alexshibu"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://instagram.com/alexshibu1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </div>
  );
}
