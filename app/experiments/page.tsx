"use client";

export default function ExperimentsPage() {
  return (
    <main className="page-content">
      <h1 className="hero-heading" style={{ marginBottom: "0" }}>
        experiments 🧪
      </h1>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed text-sm">
          My ongoing experiments and self-improvement projects. Tracking
          progress, testing hypotheses, and learning through experimentation.
        </p>
      </div>

      {/* Experiments Grid */}
      <div className="flex flex-col gap-2">
        {/* Marathon 2026 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-3">
          {/* Top Row: Status Pill */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              In Progress
            </span>
          </div>

          {/* Title + Subtext */}
          <div className="mb-1.5">
            <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight flex items-center gap-2">
              <span>🏃‍♂️</span>
              <span>Can I complete a full marathon?</span>
            </h3>
            <p className="text-xs text-gray-500 leading-tight">
              Building base mileage for Toronto Marathon 2026
            </p>
          </div>

          {/* Progress Section */}
          <div className="mb-1.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Progress</span>
              <span className="text-xs font-semibold text-blue-600">15%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: "15%" }}
              ></div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-1.5 border-t border-gray-100">
            <span>Started: Jan 2025</span>
            <span>Training Phase</span>
          </div>
        </div>

        {/* Vitamin D Hair Growth */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-3">
          {/* Top Row: Status Pill */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              In Progress
            </span>
          </div>

          {/* Title + Subtext */}
          <div className="mb-1.5">
            <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight flex items-center gap-2">
              <span>💊</span>
              <span>Does vitamin D help hair growth?</span>
            </h3>
            <p className="text-xs text-gray-500 leading-tight">
              Testing 2000 IU daily supplementation for hair thickness
            </p>
          </div>

          {/* Progress Section */}
          <div className="mb-1.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Progress</span>
              <span className="text-xs font-semibold text-green-600">40%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: "40%" }}
              ></div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-1.5 border-t border-gray-100">
            <span>Started: Nov 2024</span>
            <span>Month 2/3</span>
          </div>
        </div>

        {/* Sleep Optimization */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-3">
          {/* Top Row: Status Pill */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
              In Progress
            </span>
          </div>

          {/* Title + Subtext */}
          <div className="mb-1.5">
            <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight flex items-center gap-2">
              <span>😴</span>
              <span>How can I sleep earlier and wake earlier?</span>
            </h3>
            <p className="text-xs text-gray-500 leading-tight">
              Optimizing sleep schedule to 10:30 PM - 6:30 AM with light therapy
            </p>
          </div>

          {/* Progress Section */}
          <div className="mb-1.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Progress</span>
              <span className="text-xs font-semibold text-purple-600">25%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: "25%" }}
              ></div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-1.5 border-t border-gray-100">
            <span>Target: 10:30 PM - 6:30 AM</span>
            <span>Week 3/8</span>
          </div>
        </div>

        {/* Body Fat Reduction */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-3">
          {/* Top Row: Status Pill */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
              In Progress
            </span>
          </div>

          {/* Title + Subtext */}
          <div className="mb-1.5">
            <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight flex items-center gap-2">
              <span>💪</span>
              <span>Can I lower my body fat to under 20%?</span>
            </h3>
            <p className="text-xs text-gray-500 leading-tight">
              Reducing body fat through calorie deficit and strength training
            </p>
          </div>

          {/* Progress Section */}
          <div className="mb-1.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Progress</span>
              <span className="text-xs font-semibold text-orange-600">30%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-1.5 border-t border-gray-100">
            <span>Goal: Under 20% body fat</span>
            <span>In Progress</span>
          </div>
        </div>

        {/* 20 Pushups a Day */}
        <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
          {/* Top Row: Status Pill */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
              Completed ✅
            </span>
          </div>

          {/* Title + Subtext */}
          <div className="mb-2">
            <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight flex items-center gap-2">
              <span>🏋️‍♂️</span>
              <span>Can 20 pushups a day change my life?</span>
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              First thing every morning (no decisions). Aimed for strict reps
              (no knees), but often used knee pushups to keep the streak alive.
            </p>
          </div>

          {/* Key Stats (compact) */}
          <div className="mb-2">
            <div className="text-[11px] font-semibold text-gray-500 mb-1">
              STATS
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-emerald-200 px-2.5 py-0.5 text-xs leading-none text-gray-700 shadow-sm">
                <span className="text-gray-500 font-medium">Consistency</span>
                <span className="font-semibold text-gray-900">92%</span>
                <span className="w-14 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <span
                    className="block bg-emerald-600 h-1.5 rounded-full"
                    style={{ width: "92%" }}
                  />
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-emerald-200 px-2.5 py-0.5 text-xs leading-none text-gray-700 shadow-sm">
                <span className="text-gray-500 font-medium">Total</span>
                <span className="font-semibold text-gray-900">7,300+</span>
                <span className="text-gray-500">pushups</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-emerald-200 px-2.5 py-0.5 text-xs leading-none text-gray-700 shadow-sm">
                <span className="text-gray-500 font-medium">By the end</span>
                <span className="font-semibold text-gray-900">~15</span>
                <span className="text-gray-500">strict unbroken</span>
              </span>
            </div>
          </div>

          {/* Completed Bar */}
          <div className="mb-2 pt-2 border-t border-emerald-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Dec 31, 2024</span>
              <span className="font-semibold text-emerald-700">100%</span>
            </div>
            <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-2 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* Result (sentence) */}
          <p className="text-xs text-gray-700 leading-relaxed mb-2">
            <span className="font-semibold text-emerald-900">Result:</span>{" "}
            <span className="font-semibold text-gray-900">
              Yes — massively.
            </span>{" "}
            Weight loss, better body image, mental toughness, confidence, and
            consistency.
          </p>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-1.5 border-t border-gray-100">
            <span>Outcome: Yes — massively</span>
            <span className="text-emerald-700 font-medium">
              Built the habit
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
