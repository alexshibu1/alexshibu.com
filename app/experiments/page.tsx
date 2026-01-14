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
      <div className="flex flex-col gap-3">
        {/* Marathon 2026 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <span className="text-xl">🏃‍♂️</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              Marathon 2026
            </h3>
          </div>
          <p className="text-gray-600 mb-2 font-medium text-sm">
            Can I complete a full marathon?
          </p>
          <div className="mb-2">
            <div className="w-full bg-gray-100 rounded-full h-2 mb-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: "15%" }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-medium text-gray-700 mb-2">
              <span>Training Phase</span>
              <span className="text-blue-600">15%</span>
            </div>
          </div>
          <div className="space-y-1 text-xs text-gray-600 border-t border-gray-100 pt-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Started:</span>
              <span className="font-medium">Jan 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Goal:</span>
              <span className="font-medium">Toronto Marathon 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="font-medium">Building base mileage</span>
            </div>
          </div>
        </div>

        {/* Vitamin D Hair Growth */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <span className="text-xl">💊</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              Vitamin D Hair
            </h3>
          </div>
          <p className="text-gray-600 mb-2 font-medium text-sm">
            Does vitamin D help hair growth?
          </p>
          <div className="mb-2">
            <div className="w-full bg-gray-100 rounded-full h-2 mb-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: "40%" }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-medium text-gray-700 mb-2">
              <span>Month 2/3</span>
              <span className="text-green-600">40%</span>
            </div>
          </div>
          <div className="space-y-1 text-xs text-gray-600 border-t border-gray-100 pt-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Started:</span>
              <span className="font-medium">Nov 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Dosage:</span>
              <span className="font-medium">2000 IU daily</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tracking:</span>
              <span className="font-medium">Hair thickness, growth rate</span>
            </div>
          </div>
        </div>

        {/* Sleep Optimization */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
              <span className="text-xl">😴</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              Sleep Optimization
            </h3>
          </div>
          <p className="text-gray-600 mb-2 font-medium text-sm">
            How can I sleep earlier and wake earlier?
          </p>
          <div className="mb-2">
            <div className="w-full bg-gray-100 rounded-full h-2 mb-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: "25%" }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-medium text-gray-700 mb-2">
              <span>Week 3/8</span>
              <span className="text-purple-600">25%</span>
            </div>
          </div>
          <div className="space-y-1 text-xs text-gray-600 border-t border-gray-100 pt-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Target:</span>
              <span className="font-medium">10:30 PM - 6:30 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Methods:</span>
              <span className="font-medium text-right">
                Light therapy, no screens
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tools:</span>
              <span className="font-medium">Sleep tracking app</span>
            </div>
          </div>
        </div>

        {/* Body Fat Reduction */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors">
              <span className="text-xl">💪</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              Body Fat Reduction
            </h3>
          </div>
          <p className="text-gray-600 mb-2 font-medium text-sm">
            Can I lower my body fat to under 20%?
          </p>
          <div className="mb-2">
            <div className="w-full bg-gray-100 rounded-full h-2 mb-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                style={{ width: "30%" }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-medium text-gray-700 mb-2">
              <span>In Progress</span>
              <span className="text-orange-600">30%</span>
            </div>
          </div>
          <div className="space-y-1 text-xs text-gray-600 border-t border-gray-100 pt-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Goal:</span>
              <span className="font-medium">Under 20% body fat</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Methods:</span>
              <span className="font-medium text-right">
                Calorie deficit, strength training
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tracking:</span>
              <span className="font-medium">Weekly measurements</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
