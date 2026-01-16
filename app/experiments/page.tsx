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
          {/* Top Row: Status Pill + Icon Button */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              In Progress
            </span>
            <button className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors">
              <span className="text-sm">🏃‍♂️</span>
            </button>
          </div>

          {/* Title + Subtext */}
          <div className="mb-1.5">
            <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight">
              Can I complete a full marathon?
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
          {/* Top Row: Status Pill + Icon Button */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              In Progress
            </span>
            <button className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors">
              <span className="text-sm">💊</span>
            </button>
          </div>

          {/* Title + Subtext */}
          <div className="mb-1.5">
            <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight">
              Does vitamin D help hair growth?
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
          {/* Top Row: Status Pill + Icon Button */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
              In Progress
            </span>
            <button className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors">
              <span className="text-sm">😴</span>
            </button>
          </div>

          {/* Title + Subtext */}
          <div className="mb-1.5">
            <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight">
              How can I sleep earlier and wake earlier?
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
          {/* Top Row: Status Pill + Icon Button */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
              In Progress
            </span>
            <button className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors">
              <span className="text-sm">💪</span>
            </button>
          </div>

          {/* Title + Subtext */}
          <div className="mb-1.5">
            <h3 className="text-lg font-bold text-gray-900 mb-0.5 leading-tight">
              Can I lower my body fat to under 20%?
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
      </div>
    </main>
  );
}
