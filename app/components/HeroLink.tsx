"use client";

import Link from "next/link";
import React from "react";

const arrowClass =
  "inline-block max-w-0 ml-0 overflow-hidden opacity-0 whitespace-nowrap align-baseline text-[0.65em] group-hover:max-w-[1.25em] group-hover:opacity-100 group-hover:ml-0.5 transition-all duration-150";

export default function HeroLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isExternal = /^https?:\/\//i.test(href);

  if (isExternal) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
        <span className={arrowClass} aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
      <span className={arrowClass} aria-hidden="true">↗</span>
    </Link>
  );
}
