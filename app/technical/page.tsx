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
