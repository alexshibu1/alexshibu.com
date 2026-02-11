"use client";

import Link from "next/link";

export default function EmailPage() {
  return (
    <main className="page-content">
      <p className="mb-4">
        <Link
          href="/sidequests"
          className="text-gray-500 hover:text-red-600 hover:underline transition-colors"
        >
          ← sidequests
        </Link>
      </p>

      <h1 className="hero-heading" style={{ marginBottom: "0.5rem" }}>
        email
      </h1>
      <p className="text-base text-gray-600 mb-4">
        Best cold emails I&apos;ve tried and sent — and why they worked.
      </p>

      <p className="text-sm text-gray-700">
        I&apos;ll add my favorite cold email templates and breakdowns here:
        the exact messages I sent, the responses I got, and how I refine the
        playbook over time.
      </p>
    </main>
  );
}

