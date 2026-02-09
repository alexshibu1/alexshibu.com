import Link from "next/link";

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
          href="/photos"
          className="group block px-3 py-2 hover:bg-red-50/40 transition-colors"
          style={{ textDecoration: "none" }}
        >
          <div className="flex items-center justify-between gap-2 transition-transform group-hover:translate-x-[1px]">
            <div className="min-w-0">
              <span className="text-base font-semibold text-gray-900 group-hover:text-red-700">
                photos
              </span>
              <span className="ml-2 text-sm text-gray-500 truncate group-hover:text-gray-700">
                Some of my best pics.
              </span>
            </div>
            <span
              className="text-xs text-gray-400 flex-shrink-0 transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </Link>

        <Link
          href="/coffee"
          className="group block px-3 py-2 hover:bg-red-50/40 transition-colors"
          style={{ textDecoration: "none" }}
        >
          <div className="flex items-center justify-between gap-2 transition-transform group-hover:translate-x-[1px]">
            <div className="min-w-0">
              <span className="text-base font-semibold text-gray-900 group-hover:text-red-700">
                coffee reviews
              </span>
              <span className="ml-2 text-sm text-gray-500 truncate group-hover:text-gray-700">
                Reviewing 60+ downtown Toronto cafes.
              </span>
            </div>
            <span
              className="text-xs text-gray-400 flex-shrink-0 transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </Link>

        <Link
          href="/rejected"
          className="group block px-3 py-2 hover:bg-red-50/40 transition-colors"
          style={{ textDecoration: "none" }}
        >
          <div className="flex items-center justify-between gap-2 transition-transform group-hover:translate-x-[1px]">
            <div className="min-w-0">
              <span className="text-base font-semibold text-gray-900 group-hover:text-red-700">
                rejected
              </span>
              <span className="ml-2 text-sm text-gray-500 truncate group-hover:text-gray-700">
                A log of my rejections. Throwing enough potatoes at the wall for
                greatnesses.
              </span>
            </div>
            <span
              className="text-xs text-gray-400 flex-shrink-0 transition-transform group-hover:translate-x-[1px] group-hover:text-red-500"
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
