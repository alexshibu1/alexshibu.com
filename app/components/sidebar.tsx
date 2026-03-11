"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const linkClassName = "nav-link";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close menu on Escape; lock body scroll when open (mobile)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button - visible on mobile only */}
      <button
        type="button"
        className={`hamburger-button ${isOpen ? "hamburger-open" : ""}`}
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Overlay - appears when menu is open on mobile; tap to close */}
      {isOpen && <div className="menu-overlay" onClick={closeMenu} />}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        {/* Brand/Header Block */}
        <div className="sidebar-brand">
          <Link href="/" className="brand-link" onClick={closeMenu}>
            <h1 className="brand-name">Alex</h1>
          </Link>
        </div>

        <div className="nav-links">
          <Link href="/about" className={linkClassName} onClick={closeMenu}>
            about
          </Link>
          <Link href="/projects" className={linkClassName} onClick={closeMenu}>
            projects
          </Link>
          <Link href="/writing" className={linkClassName} onClick={closeMenu}>
            writing
          </Link>
          <Link href="/books" className={linkClassName} onClick={closeMenu}>
            books
          </Link>
          <Link
            href="/experiments"
            className={linkClassName}
            onClick={closeMenu}
          >
            experiments
          </Link>
          <Link href="/lore" className={linkClassName} onClick={closeMenu}>
            lore
          </Link>
          <Link
            href="/sidequests"
            className={linkClassName}
            onClick={closeMenu}
          >
            sidequests
          </Link>
        </div>

        <div className="social-links mt-12">
          <a
            href="https://x.com/alexshibu2"
            target="_blank"
            rel="noopener noreferrer"
          >
            x
          </a>
          <a
            href="https://github.com/alexshibu1"
            target="_blank"
            rel="noopener noreferrer"
          >
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
    </>
  );
}
