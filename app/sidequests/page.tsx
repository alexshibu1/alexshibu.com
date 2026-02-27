import Link from "next/link";
import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";

export const metadata: Metadata = sectionMetadata(
  "Sidequests",
  "Alex Shibu's sidequests projects like coffee reviews website, rejection log, technical masterplan, and cold email templates.",
  "/sidequests",
);

export default function SidequestsPage() {
  return (
    <main className="page-content">
      <h1 className="hero-heading" style={{ marginBottom: "0.25rem" }}>
        sidequests
      </h1>
      <p className="text-base text-gray-600">
        Side quests and projects just for fun.
      </p>

      <div className="mt-4 divide-y divide-gray-100 border-t border-b border-gray-100 rounded-md bg-white/60">
        <Link
          href="/coffee"
          className="group block px-4 py-3 sm:px-3 sm:py-2 hover:bg-red-50/40 transition-colors min-h-[44px] sm:min-h-0 flex items-center"
          style={{ textDecoration: "none" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 w-full min-w-0 transition-transform group-hover:translate-x-[1px]">
            <div className="min-w-0 flex flex-col gap-0.5 sm:flex-row sm:items-baseline">
              <div className="flex items-center gap-1.5 sm:contents">
                <span className="text-base font-semibold text-gray-900 group-hover:text-red-700">
                  coffee reviews
                </span>
                <span
                  className="text-xs text-gray-400 flex-shrink-0 sm:hidden transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
              <span className="text-sm text-gray-500 sm:ml-2 sm:truncate group-hover:text-gray-700">
                Reviewing 60+ downtown Toronto cafes.
              </span>
            </div>
            <span
              className="hidden sm:inline text-xs text-gray-400 flex-shrink-0 transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </Link>

        <Link
          href="/rejected"
          className="group block px-4 py-3 sm:px-3 sm:py-2 hover:bg-red-50/40 transition-colors min-h-[44px] sm:min-h-0 flex items-center"
          style={{ textDecoration: "none" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 w-full min-w-0 transition-transform group-hover:translate-x-[1px]">
            <div className="min-w-0 flex flex-col gap-0.5 sm:flex-row sm:items-baseline">
              <div className="flex items-center gap-1.5 sm:contents">
                <span className="text-base font-semibold text-gray-900 group-hover:text-red-700">
                  rejected
                </span>
                <span
                  className="text-xs text-gray-400 flex-shrink-0 sm:hidden transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
              <span className="text-sm text-gray-500 sm:ml-2 sm:truncate group-hover:text-gray-700">
                A log of my rejections. Throwing enough potatoes at the wall for
                greatnesses.
              </span>
            </div>
            <span
              className="hidden sm:inline text-xs text-gray-400 flex-shrink-0 transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </Link>

        <Link
          href="/technical"
          className="group block px-4 py-3 sm:px-3 sm:py-2 hover:bg-red-50/40 transition-colors min-h-[44px] sm:min-h-0 flex items-center"
          style={{ textDecoration: "none" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 w-full min-w-0 transition-transform group-hover:translate-x-[1px]">
            <div className="min-w-0 flex flex-col gap-0.5 sm:flex-row sm:items-baseline">
              <div className="flex items-center gap-1.5 sm:contents">
                <span className="text-base font-semibold text-gray-900 group-hover:text-red-700">
                  technical
                </span>
                <span
                  className="text-xs text-gray-400 flex-shrink-0 sm:hidden transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
              <span className="text-sm text-gray-500 sm:ml-2 sm:truncate group-hover:text-gray-700">
                Mapping my journey to becoming technically dangerous.
              </span>
            </div>
            <span
              className="hidden sm:inline text-xs text-gray-400 flex-shrink-0 transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </Link>

        <Link
          href="/email"
          className="group block px-4 py-3 sm:px-3 sm:py-2 hover:bg-red-50/40 transition-colors min-h-[44px] sm:min-h-0 flex items-center"
          style={{ textDecoration: "none" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 w-full min-w-0 transition-transform group-hover:translate-x-[1px]">
            <div className="min-w-0 flex flex-col gap-0.5 sm:flex-row sm:items-baseline">
              <div className="flex items-center gap-1.5 sm:contents">
                <span className="text-base font-semibold text-gray-900 group-hover:text-red-700">
                  email
                </span>
                <span
                  className="text-xs text-gray-400 flex-shrink-0 sm:hidden transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
              <span className="text-sm text-gray-500 sm:ml-2 sm:truncate group-hover:text-gray-700">
                Best cold emails I&apos;ve tried and sent.
              </span>
            </div>
            <span
              className="hidden sm:inline text-xs text-gray-400 flex-shrink-0 transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </Link>

        <Link
          href="/run"
          className="group block px-4 py-3 sm:px-3 sm:py-2 hover:bg-red-50/40 transition-colors min-h-[44px] sm:min-h-0 flex items-center"
          style={{ textDecoration: "none" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 w-full min-w-0 transition-transform group-hover:translate-x-[1px]">
            <div className="min-w-0 flex flex-col gap-0.5 sm:flex-row sm:items-baseline">
              <div className="flex items-center gap-1.5 sm:contents">
                <span className="text-base font-semibold text-gray-900 group-hover:text-red-700">
                  running log
                </span>
                <span
                  className="text-xs text-gray-400 flex-shrink-0 sm:hidden transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
              <span className="text-sm text-gray-500 sm:ml-2 sm:truncate group-hover:text-gray-700">
                Runs, walks, hikes, and rides across cities.
              </span>
            </div>
            <span
              className="hidden sm:inline text-xs text-gray-400 flex-shrink-0 transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </Link>
      </div>
    </main>
  );
}
