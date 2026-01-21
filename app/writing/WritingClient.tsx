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
    filter: "all" | "essay" | "thought" | "book" | "project"
  ) => void;
}) {
  const filters = [
    { key: "all" as const, label: "All", emoji: "" },
    { key: "essay" as const, label: "Essays", emoji: "📝" },
    { key: "thought" as const, label: "Dumb Thoughts", emoji: "💭" },
    { key: "book" as const, label: "Books", emoji: "📚" },
    { key: "project" as const, label: "Projects", emoji: "🚀" },
  ];

  return (
    <>
      {/* Mobile: horizontally scrollable filter chips */}
      <div
        className="md:hidden writing-filter-scroll -mx-5 px-5 mb-4 pb-1 overflow-x-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex gap-2 w-max">
          {filters.map(({ key, label, emoji }) => {
            const isActive = activeFilter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onFilterChange(key)}
                aria-pressed={isActive}
                className={[
                  "shrink-0",
                  "inline-flex items-center gap-2",
                  "h-11 px-4",
                  "rounded-full border",
                  "text-sm font-medium",
                  "transition-colors",
                  isActive
                    ? "border-red-600 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                ].join(" ")}
              >
                {emoji ? <span aria-hidden="true">{emoji}</span> : null}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: keep existing look */}
      <div
        className="hidden md:flex"
        style={{ gap: "0.5rem", marginBottom: "1rem" }}
      >
        {filters.map(({ key, label, emoji }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "1px solid",
              borderColor: activeFilter === key ? "#dc2626" : "#e5e7eb",
              backgroundColor: activeFilter === key ? "#fef2f2" : "white",
              color: activeFilter === key ? "#dc2626" : "#6b7280",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: activeFilter === key ? "600" : "500",
              transition: "all 0.2s ease",
            }}
          >
            <span>{emoji}</span>
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
      : "all"
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

      <ul className="writing-list">
        {filteredEssays.map((e) => (
          <li key={e.slug} className="essay-item ">
            <span className="date ">{e.date ?? ""}</span>
            <Link href={`/essay/${e.slug}`}>{e.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
