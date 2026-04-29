"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

type EssayMeta = {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  type?: "essay" | "thought" | "book" | "project";
};

function FilterButtons({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: "all" | "essay" | "thought" | "book" | "project";
  onFilterChange: (
    filter: "all" | "essay" | "thought" | "book" | "project",
  ) => void;
}) {
  const filters = [
    { key: "all" as const, label: "All", emoji: "" },
    { key: "essay" as const, label: "Essays", emoji: "📝" },
    { key: "thought" as const, label: "Blog", emoji: "💭" },
    { key: "book" as const, label: "Books", emoji: "📚" },
    { key: "project" as const, label: "Projects", emoji: "🚀" },
  ];

  return (
    <>
      {/* Mobile: horizontally scrollable filter chips */}
      <div
        className="md:hidden writing-filter-scroll -mx-5 px-5 !mb-0 pb-1 overflow-x-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="writing-filter-bar writing-filter-bar--mobile">
          {filters.map(({ key, label, emoji }) => {
            const isActive = activeFilter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onFilterChange(key)}
                aria-pressed={isActive}
                className={[
                  "writing-filter-chip",
                  isActive ? "is-active" : "",
                ].join(" ")}
              >
                {emoji ? (
                  <span aria-hidden="true" className="writing-filter-chip-emoji">
                    {emoji}
                  </span>
                ) : null}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: same visual system as mobile for consistency */}
      <div className="hidden md:flex writing-filter-bar">
        {filters.map(({ key, label, emoji }) => (
          <button
            key={key}
            type="button"
            onClick={() => onFilterChange(key)}
            aria-pressed={activeFilter === key}
            className={[
              "writing-filter-chip",
              activeFilter === key ? "is-active" : "",
            ].join(" ")}
          >
            <span aria-hidden="true" className="writing-filter-chip-emoji">
              {emoji}
            </span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default function WritingClient({ essays }: { essays: EssayMeta[] }) {
  const searchParams = useSearchParams();
  const urlFilter = searchParams.get("filter");

  const [activeFilter, setActiveFilter] = useState<
    "all" | "essay" | "thought" | "book" | "project"
  >(
    urlFilter === "book"
      ? "book"
      : urlFilter === "essay"
        ? "essay"
        : urlFilter === "thought"
          ? "thought"
          : urlFilter === "project"
            ? "project"
            : "all",
  );

  // Filter essays based on active filter
  const filteredEssays = essays.filter((essay) => {
    if (activeFilter === "all") return true;
    return essay.type === activeFilter;
  });

  return (
    <>
      <FilterButtons
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <ul className="writing-list writing-list--layout-2a">
        {filteredEssays.map((e) => (
          <li key={e.slug} className="essay-item">
            <span className="date">{e.date ?? ""}</span>
            <Link href={`/essay/${e.slug}`}>{e.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
