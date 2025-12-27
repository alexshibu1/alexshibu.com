"use client";

import Link from "next/link";
import { useState } from "react";

type EssayMeta = {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  type?: "essay" | "thought" | "book";
};

function FilterButtons({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: "all" | "essay" | "thought" | "book";
  onFilterChange: (filter: "all" | "essay" | "thought" | "book") => void;
}) {
  const filters = [
    { key: "all" as const, label: "All", emoji: "" },
    { key: "essay" as const, label: "Essays", emoji: "📝" },
    { key: "thought" as const, label: "Dumb Thoughts", emoji: "💭" },
    { key: "book" as const, label: "Books", emoji: "📚" },
  ];

  return (
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
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
  );
}

export default function WritingClient({ essays }: { essays: EssayMeta[] }) {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "essay" | "thought" | "book"
  >("all");

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
