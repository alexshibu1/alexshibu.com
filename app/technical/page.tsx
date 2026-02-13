"use client";

import Link from "next/link";

export default function TechnicalPage() {
  return (
    <main className="page-content">
      <h1 className="hero-heading" style={{ marginBottom: "0.5rem" }}>
        technical [page in progress]
      </h1>
      <p className="text-base text-gray-600 mb-4">
        Mind‑mapping how I become technically dangerous — from first principles
        to shipping real products.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        This map ties directly to my{" "}
        <Link href="/projects" className="text-gray-700 hover:text-red-600 hover:underline">
          projects
        </Link>
        ,{" "}
        <Link href="/writing" className="text-gray-700 hover:text-red-600 hover:underline">
          writing
        </Link>
        , and{" "}
        <Link href="/lore" className="text-gray-700 hover:text-red-600 hover:underline">
          lore
        </Link>{" "}
        as I build toward a founder-minded profile.
      </p>

      <div className="space-y-4 text-sm text-gray-700">
        {/* 0. Goal */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            0. Goal
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Become{" "}
              <span className="font-semibold">technically dangerous</span> at
              full‑stack product building.
            </li>
            <li>
              Can design, build, deploy, and debug real products end‑to‑end.
            </li>
            <li>
              Can reason from first principles about systems, performance, and
              trade‑offs.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
