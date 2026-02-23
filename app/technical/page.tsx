"use client";

import Link from "next/link";

export default function TechnicalPage() {
  return (
    <main className="page-content">
      <h1 className="hero-heading" style={{ marginBottom: "0.5rem" }}>
        technical [page in progress]
      </h1>
      <p className="text-base text-gray-600 mb-4">
        Mind‑mapping my plan to become technically dangerous — from first
        principles to shipping real products.
      </p>

      <div className="space-y-4 text-sm text-gray-700">
        {/* 0. Goal */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            0. Phase 1 - Get good at frontend
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>ship to get github every day </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
