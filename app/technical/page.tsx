import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";

export const metadata: Metadata = sectionMetadata(
  "Operation Forge",
  "Alex Shibu's 6-month plan to become technically dangerous — from first principles to shipping real products.",
  "/technical",
);

export default function TechnicalPage() {
  return (
    <main className="page-content">
      <h1 className="hero-heading" style={{ marginBottom: "0.5rem" }}>
        Operation Forge
      </h1>
      <p className="text-base text-gray-600 mb-0">
        Operation Forge is my masterplan for becoming technically dangerous,
        from first principles learning to shipping real products. From years of
        half-assed self-taught attempts to taking every possible CS class
        everywhere. I kept switching frameworks, languages, hardware to
        software. Always struggling with one thing:{" "}
        <span className="font-medium text-gray-700 italic underline">
          consistency
        </span>
        .
      </p>
      <p className="text-base text-gray-600 mb-8">
        This journey is about building the foundation over the next 6 months
        that can accelerate every other aspect of my life. Begin with the art of
        building, then shipping useful products, and finally sales or joining
        startups to accelerate growth.
      </p>

      {/* Phase 1 */}
      <section className="mb-10">
        <div className="flex flex-row items-center justify-between gap-3 mb-4">
          <h2 className="text-base font-semibold text-gray-900 m-0">
            Understand the fundamentals of web development
          </h2>
          <span className="text-[14px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full shrink-0">
            Phase 1
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          Step one is to learn core JavaScript properly, so I can use React and
          Next.js the right way: making real API calls, managing state, and
          building end-to-end applications. No more copy-pasting without
          understanding. By the end of this phase I need to{" "}
          <strong className="text-gray-800">ship 1 personal project</strong>.
        </p>

        {/* Resources */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Resources
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="https://codefast.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
              style={{ textDecoration: "none" }}
            >
              <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700">
                CodeFast
              </span>
              <span className="text-xs text-gray-500">course</span>
              <span className="text-[11px] text-gray-400 mt-1">
                codefast.ai ↗
              </span>
            </a>

            <a
              href="https://roadmap.sh/r/my-coding-roadmap-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
              style={{ textDecoration: "none" }}
            >
              <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700">
                roadmap.sh
              </span>
              <span className="text-xs text-gray-500">
                My personal coding roadmap
              </span>
              <span className="text-[11px] text-gray-400 mt-1">
                roadmap.sh ↗
              </span>
            </a>

            <a
              href="https://fireship.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
              style={{ textDecoration: "none" }}
            >
              <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700">
                Fireship JS
              </span>
              <span className="text-xs text-gray-500">
                Fast, dense JavaScript lessons
              </span>
              <span className="text-[11px] text-gray-400 mt-1">
                fireship.dev ↗
              </span>
            </a>
          </div>
        </div>

        {/* Goals */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Goals
          </p>
          <ul className="list-none space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              Learn core JavaScript from first principles — types, closures,
              async/await, fetch
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              Use React and Next.js properly — components, hooks, server vs
              client, routing
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              Build and deploy end-to-end apps with real API calls and a
              database
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              Ship code to{" "}
              <a
                href="https://github.com/alexshibu1"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 hover:underline"
              >
                GitHub
              </a>{" "}
              6 days a week — no zero days
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              <strong className="text-gray-800">Ship 1 personal project</strong>{" "}
              by end of phase
            </li>
          </ul>
        </div>

        {/* GitHub contribution chart */}
        <div className="mb-2">
          <div className="text-[14px] font-semibold uppercase tracking-widest text-gray-400">
            Streak
          </div>
          <div className="flex justify-center sm:justify-start">
            <img
              src="https://ghchart.rshah.org/0e4429/alexshibu1"
              alt="GitHub contribution chart"
              className="w-full max-w-[700px]"
              style={{
                borderRadius: "4px",
                border: "1px solid rgba(229, 231, 235, 0.8)",
                padding: "4px",
                background: "rgba(255, 255, 255, 0.8)",
              }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Updated daily via{" "}
            <a
              href="https://github.com/alexshibu1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/alexshibu1
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
