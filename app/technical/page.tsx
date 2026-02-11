"use client";

import Link from "next/link";

export default function TechnicalPage() {
  return (
    <main className="page-content">
      <h1 className="hero-heading" style={{ marginBottom: "0.5rem" }}>
        technical
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

        {/* 1. Foundations */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            1. Foundations
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              CS + math foundations: algorithms, data structures, complexity.
            </li>
            <li>
              How computers actually work: CPU, memory, storage, networks,
              operating systems.
            </li>
            <li>Git, Unix, and tooling fluency.</li>
          </ul>
        </section>

        {/* 2. Core stack */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            2. Core stack
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Frontend: React/Next.js, TypeScript, modern CSS and design
              systems.
            </li>
            <li>Backend: APIs, databases, auth, queues, background jobs.</li>
            <li>
              DevOps: deploy, observe, and scale (logging, metrics, error
              tracking).
            </li>
          </ul>
        </section>

        {/* 3. Depth lanes */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            3. Depth lanes
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Performance: profiling, caching, SQL tuning, front‑end perf.
            </li>
            <li>
              Security & reliability: auth flows, rate limiting, testing, CI.
            </li>
            <li>
              Systems & infra: containers, cloud primitives, networking basics.
            </li>
          </ul>
        </section>

        {/* 4. Projects & feedback */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            4. Projects & feedback
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Ship small products fast; iterate based on real users.</li>
            <li>
              Deliberate practice: clone apps, rebuild features, refactor.
            </li>
            <li>
              Get code reviews and pair programming reps with stronger
              engineers.
            </li>
          </ul>
        </section>

        {/* 5. Map in progress */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            5. Map in progress
          </h2>
          <p>
            This page will evolve into a proper mind map with concrete
            milestones, resources, and artifacts (notes, repos, write‑ups) as I
            go. For now, it&apos;s the backbone of how I&apos;m thinking about
            becoming technically dangerous.
          </p>
        </section>
      </div>
    </main>
  );
}
