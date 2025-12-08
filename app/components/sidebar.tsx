import Link from "next/link";

export default function Sidebar() {
  const linkClassName = "nav-link";

  return (
    <div className="sidebar">
      <div className="nav-links">
        <Link href="/" className={linkClassName}>
          home
        </Link>
        <Link href="/projects" className={linkClassName}>
          projects
        </Link>
        <Link href="/writing" className={linkClassName}>
          writing
        </Link>
        <Link href="/read" className={linkClassName}>
          reading
        </Link>
        <Link href="/experiments" className={linkClassName}>
          experiments
        </Link>
        <Link href="/sidequest" className={linkClassName}>
          side quests
        </Link>
        <Link href="/content" className={linkClassName}>
          content
        </Link>
        <Link href="/lore" className={linkClassName}>
          lore
        </Link>
        <Link href="/coffee" className={linkClassName}>
          coffee reviews ☕
        </Link>
        <Link href="/life" className={linkClassName}>
          life story
        </Link>
      </div>

      <div className="social-links mt-12">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          x
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          github
        </a>
        <a
          href="https://linkedin.com/in/alexshibu"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin
        </a>
        <a
          href="https://instagram.com/alexshibu1"
          target="_blank"
          rel="noopener noreferrer"
        >
          instagram
        </a>
      </div>
    </div>
  );
}
