"use client";

import { useState } from "react";

const APPLICATIONS_SENT = 315;
const TOOLTIP_TEXT = "The majority were ghosted.";

export default function RejectionStats({
  rejectionsLogged,
  conversionRate,
}: {
  rejectionsLogged: number;
  applicationsSentComputed: number;
  conversionRate: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section
      className="grid grid-cols-3 gap-px rounded-xl bg-neutral-100 overflow-visible mb-6 mt-4 sm:mb-8 sm:mt-6 shadow-sm"
      aria-label="Rejection log stats"
    >
      <div className="bg-white rounded-l-xl rounded-r-none px-2 py-2 sm:px-6 sm:py-5 flex flex-row sm:flex-col gap-1.5 sm:gap-0.5 justify-center items-center sm:items-start min-w-0">
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide sm:tracking-widest text-neutral-500 shrink-0 whitespace-nowrap sm:hidden">
          Rej.
        </span>
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide sm:tracking-widest text-neutral-500 shrink-0 hidden sm:block">
          Rejections logged
        </span>
        <span className="text-sm sm:text-3xl font-bold tabular-nums text-neutral-900 tracking-tight truncate">
          {rejectionsLogged}
        </span>
      </div>
      <div className="bg-white rounded-none px-2 py-2 sm:px-6 sm:py-5 flex flex-row sm:flex-col gap-1.5 sm:gap-0.5 justify-center items-center sm:items-start min-w-0">
        <span className="flex items-center gap-0.5 shrink-0">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide sm:tracking-widest text-neutral-500 whitespace-nowrap sm:hidden">
            Sent
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide sm:tracking-widest text-neutral-500 hidden sm:inline">
            Applications sent
          </span>
          <span className="relative inline-flex">
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
              className="shrink-0 p-0.5 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300 touch-manipulation"
              aria-label={TOOLTIP_TEXT}
            >
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            {showTooltip && (
              <span
                className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 text-xs font-medium text-white bg-neutral-800 rounded shadow-lg whitespace-nowrap z-10 pointer-events-none"
                role="tooltip"
              >
                {TOOLTIP_TEXT}
              </span>
            )}
          </span>
        </span>
        <span className="text-sm sm:text-3xl font-bold tabular-nums text-neutral-900 tracking-tight truncate">
          {APPLICATIONS_SENT}
        </span>
      </div>
      <div className="bg-white rounded-r-xl rounded-l-none px-2 py-2 sm:px-6 sm:py-5 flex flex-row sm:flex-col gap-1.5 sm:gap-0.5 justify-center items-center sm:items-start min-w-0">
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide sm:tracking-widest text-neutral-500 shrink-0 whitespace-nowrap sm:hidden">
          Conv.
        </span>
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide sm:tracking-widest text-neutral-500 shrink-0 hidden sm:block">
          Conversion rate
        </span>
        <span className="text-sm sm:text-3xl font-bold tabular-nums text-neutral-900 tracking-tight truncate">
          {conversionRate}
        </span>
      </div>
    </section>
  );
}
