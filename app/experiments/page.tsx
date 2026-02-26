"use client";

import Link from "next/link";

const EXPERIMENTS = [
  {
    emoji: "🏃‍♂️",
    title: "Can I complete a full marathon?",
    detail: "Toronto Marathon 2026 · base mileage",
    progress: 15,
    meta: "Jan 2026",
    color: "#3b82f6",
  },
  {
    emoji: "💊",
    title: "Does vitamin D help hair growth?",
    detail: "2000 IU daily · hair thickness",
    progress: 40,
    meta: "Jan 2026",
    color: "#22c55e",
  },
  {
    emoji: "😴",
    title: "Sleep earlier, wake earlier?",
    detail: "10:30 PM → 6:30 AM · light therapy",
    progress: 25,
    meta: "Jan 2026",
    color: "#a855f7",
  },
  {
    emoji: "🧠",
    title: "Can I become technically dangerous in 6 months?",
    detail: "Deep work on CS, systems, and real shipped projects",
    progress: 10,
    meta: "Dec 2025",
    color: "#6366f1",
    planHref: "/technical",
  },
  {
    emoji: "💪",
    title: "Body fat under 25%?",
    detail: "Calorie deficit + strength training",
    progress: 30,
    meta: "Jan 2026",
    color: "#f97316",
    planHref: "/essay/body",
  },
];

export default function ExperimentsPage() {
  return (
    <main className="page-content">
      <h1 className="hero-heading" style={{ marginBottom: "0" }}>
        experiments 🧪
      </h1>

      <p
        className="text-gray-500 text-sm mb-6"
        style={{ marginBottom: "1.5rem" }}
      >
        Ongoing self-experiments. Tracking what works.
      </p>

      {/* In-progress list */}
      <div className="mb-4">
        {EXPERIMENTS.map((exp, i) => (
          <div
            key={exp.title}
            className={`flex items-center gap-3 py-2 ${i < EXPERIMENTS.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <div
              className="w-1 self-stretch rounded-full shrink-0"
              style={{ backgroundColor: exp.color }}
            />
            <span className="text-base leading-none">{exp.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-semibold text-gray-900 truncate">
                  {exp.title}
                </span>
                <span
                  className="text-[13px] font-bold tabular-nums shrink-0"
                  style={{ color: exp.color }}
                >
                  {exp.progress}%
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[11px] text-gray-400 truncate">
                  {exp.detail}
                </span>
                <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                  {exp.meta}
                </span>
              </div>
              {"planHref" in exp && exp.planHref ? (
                <div className="mt-1 flex justify-between items-center">
                  <span className="text-[10px] text-gray-300">
                    notes &amp; details
                  </span>
                  <Link
                    href={exp.planHref}
                    className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <span aria-hidden="true">📝</span>
                    <span>read plan</span>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Completed: 20 Pushups a Day */}
      <div className="relative overflow-hidden rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/30 p-3">
        <div
          className="absolute top-0 left-0 w-full h-0.5"
          style={{
            background: "linear-gradient(90deg, #059669, #34d399, #059669)",
          }}
        />

        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">🏋️‍♂️</span>
            <span className="text-[15px] font-bold text-gray-900">
              Can 20 pushups a day change my life?
            </span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
            DONE
          </span>
        </div>

        <p className="text-[9px] text-gray-400 leading-tight mb-2 ml-7">
          Every morning, no decisions. Full reps when possible, knees to keep
          the streak.
        </p>

        {/* Stats row */}
        <div className="flex items-end gap-4 ml-7 mb-2">
          <div>
            <div className="text-[9px] text-gray-400 uppercase tracking-wider">
              consistency
            </div>
            <div className="text-lg font-bold text-gray-900 leading-none">
              92%
            </div>
          </div>
          <div>
            <div className="text-[9px] text-gray-400 uppercase tracking-wider">
              total
            </div>
            <div className="text-lg font-bold text-gray-900 leading-none">
              7,300+
            </div>
          </div>
          <div>
            <div className="text-[9px] text-gray-400 uppercase tracking-wider">
              by end
            </div>
            <div className="text-lg font-bold text-gray-900 leading-none">
              ~15 <span className="text-[11px] text-gray-400">straight</span>
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-[10px] text-gray-400">Jan → Dec 2024</div>
            <div className="text-[11px] font-semibold text-emerald-600">
              365 days
            </div>
          </div>
        </div>

        {/* Outcome */}
        <div className="ml-7 pt-1.5 border-t border-emerald-100">
          <span className="text-[11px] font-semibold text-gray-900">
            Outcome: Yes — massively.
          </span>
          <span className="text-[10px] text-gray-400 ml-1">
            Weight loss, body image, mental toughness, confidence. Plan to
            continue.
          </span>
        </div>
      </div>
    </main>
  );
}
