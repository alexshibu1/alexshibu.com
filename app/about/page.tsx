"use client";

import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isQ4Open, setIsQ4Open] = useState(true);
  const [is2025Open, setIs2025Open] = useState(false);

  const bio = `Alex Shibu is a student at the University of Toronto, majoring in Physics and Computer Science. Passionate about leveraging emerging technologies to drive impactful change. Alex has worked on startups and larger organizations to build tools and solutions using AI, web3, healthcare, decision theory. Alex also loves bringing together young people to and has hosted experiences for over 600 folks. In his spare time, he ships intresting sidequests, takes on fitness challenges, and reviews cafes.`;

  const copyBio = () => {
    navigator.clipboard.writeText(bio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("alexshibu@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <main className="page-content">
      <h1 className="hero-heading" style={{ marginBottom: "0" }}>
        about ✌️
      </h1>

      {/* Banner Image */}
      <div
        className="-mx-2 sm:-mx-0"
        style={{ marginTop: "-0.5rem", marginBottom: "-1rem" }}
      >
        <Image
          src="/images/about/banner3.png"
          alt="Banner"
          width={1200}
          height={400}
          className="w-full h-auto rounded-lg sm:rounded-lg object-cover"
          priority
        />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row  mb-4">
        {/* Profile Picture */}
        <div className="flex-shrink-0" style={{ marginTop: "-1rem" }}>
          <Image
            src="/images/about/pfp.jpg"
            alt="Alex Shibu"
            width={280}
            height={280}
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full object-cover border-2 border-gray-200 mx-auto sm:mx-0"
            style={{ margin: "22px", marginBottom: "0" }}
            priority
          />
          <button
            onClick={copyEmail}
            style={{
              marginBottom: "0",
              marginTop: "0",
              padding: "4px",
              paddingLeft: "54px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              color: "#374151",
              fontSize: "1rem",
              lineHeight: "1.5",
              fontFamily: "inherit",
              userSelect: "text",
              WebkitUserSelect: "text",
            }}
            title="Click to copy email"
          >
            Email: {emailCopied ? "Copied!" : "alexshibu[at]gmail.com"}
          </button>
        </div>

        {/* Bio with Copy Button */}
        <div className="flex-1">
          <div className="mb-4">
            <p
              className="text-gray-700 leading-relaxed"
              style={{ marginBottom: "0" }}
            >
              {bio}
            </p>
            <button
              onClick={copyBio}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "background-color 0.2s",
                backgroundColor: "rgba(0, 0, 0, 0)",
                border: "none",
                marginLeft: "0",
                marginTop: "0.5rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0)";
              }}
              title="Copy bio"
            >
              <span
                style={{
                  fontSize: "14px",
                  color: "#666",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 400,
                  transition: "color 0.2s ease",
                }}
              >
                {copied ? (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        marginRight: "0.25rem",
                      }}
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        marginRight: "0.25rem",
                      }}
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy bio
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Current Focus */}
      <section
        className="about-current-focus"
        style={{ marginTop: "-2rem", marginBottom: "-20px" }}
      >
        <h2 className="text-xl font-semibold mb-1 text-gray-900">
          Current Focus
        </h2>
        <button
          onClick={() => setIsQ4Open(!isQ4Open)}
          className="flex items-center justify-between w-full gap-3 px-4 py-3 text-base font-medium text-gray-800 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md"
          style={{ marginBottom: "1rem" }}
        >
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Q4 2025
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 text-gray-500 ${
              isQ4Open ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <ul
          className={`space-y-1 transition-all duration-300 ease-in-out ${
            isQ4Open ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
          }`}
          style={{ overflow: "hidden" }}
        >
          <li className="flex items-start gap-2">
            <span className="text-gray-400 mt-1.5">•</span>
            <span className="text-gray-700">Commit to Github everyday</span>
          </li>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "-1.5rem",
            }}
          >
            <img
              src="https://ghchart.rshah.org/0e4429/alexshibu1"
              alt="GitHub contribution chart"
              style={{ maxWidth: "700px" }}
            />
          </div>

          <li className="flex items-start gap-2">
            <span className="text-gray-400 mt-1.5">•</span>
            <span className="text-gray-700">
              Exploring AI applications in healthcare and decision theory
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400 mt-1.5">•</span>
            <span className="text-gray-700">
              Completing my builder gap year with 12 projects in 12 months
            </span>
          </li>
        </ul>
      </section>

      {/* Organizations & Fellowships */}
      <section style={{ marginTop: "0rem", marginBottom: "2rem" }}>
        <h2 className="text-lg font-semibold mb-2 text-gray-900">
          Organizations & Fellowships
        </h2>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 bg-gray-50 !text-black rounded-md text-sm font-medium border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:rounded-full hover:!text-red-600 transition-all duration-200">
            Canadian Gap Year Association
          </span>
          <span className="px-3 py-1.5 bg-gray-50 !text-black rounded-md text-sm font-medium border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:rounded-full hover:!text-red-600 transition-all duration-200">
            The Knowledge Society
          </span>
          <span className="px-3 py-1.5 bg-gray-50 !text-black rounded-md text-sm font-medium border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:rounded-full hover:!text-red-600 transition-all duration-200">
            YC AI Startup School
          </span>
          <span className="px-3 py-1.5 bg-gray-50 !text-black rounded-md text-sm font-medium border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:rounded-full hover:!text-red-600 transition-all duration-200">
            YMCA Youth Advisory Committee (YAC)
          </span>
          <span className="px-3 py-1.5 bg-gray-50 !text-black rounded-md text-sm font-medium border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:rounded-full hover:!text-red-600 transition-all duration-200">
            UofT Centre for Entrepreneurship
          </span>
          <a
            href="https://www.apathyisboring.com/rtt_9_rsvp_youth_innovators"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-gray-50 !text-black rounded-md text-sm font-medium border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:rounded-full hover:!text-red-600 transition-all duration-200 cursor-pointer"
          >
            Apathy is Boring
          </a>
        </div>
      </section>

      {/* Work with me */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 sm:gap-4 mb-2">
          <h2 className="text-xl font-semibold text-gray-900">Work with me</h2>
          <a
            href="/resume/AlexShibu_2025_General.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors sm:flex-shrink-0 w-full sm:w-auto"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Resume PDF
          </a>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Right now I&apos;m looking for internships at cool companies or YC
          companies, and would like to collaborate with people with similar
          values. If you&apos;re building something interesting or have an
          opportunity that aligns, let&apos;s connect.
        </p>
      </section>

      {/* Featured In */}
      <section style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          Featured In
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <a
            href="#"
            className="group bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">🏛️</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-800">University of Toronto</h3>
                <p className="text-xs text-blue-700">Featured Student Innovator</p>
              </div>
            </div>
          </a>

          <a
            href="#"
            className="group bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 group-hover:text-purple-800">YC Startup School</h3>
                <p className="text-xs text-purple-700">AI Cohort Graduate</p>
              </div>
            </div>
          </a>

          <a
            href="#"
            className="group bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">📰</span>
              </div>
              <div>
                <h3 className="font-semibold text-green-900 group-hover:text-green-800">TechCrunch</h3>
                <p className="text-xs text-green-700">Startup Spotlight</p>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* 2025 Year Review */}
      <section style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <h2 className="text-xl font-semibold mb-1 text-gray-900">
          Year Review
        </h2>
        <button
          onClick={() => setIs2025Open(!is2025Open)}
          className="flex items-center justify-between w-full gap-3 px-4 py-3 text-base font-medium text-gray-800 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md"
          style={{ marginBottom: "1rem" }}
        >
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
            2025
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 text-gray-500 ${
              is2025Open ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300 ease-in-out ${
            is2025Open ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
          }`}
          style={{ overflow: "hidden" }}
        >
          {/* Strava Stats */}
          <div className="group bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 border border-emerald-200 rounded-xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">🏃‍♂️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-900">Strava Stats</h3>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1"></div>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-emerald-800 font-medium text-lg">52 runs</p>
              <p className="text-emerald-700 text-sm">190km ran • 12 cities</p>
            </div>
          </div>

          {/* Coding Progress */}
          <div className="group bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border border-blue-200 rounded-xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">💻</span>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Learning to Code</h3>
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-blue-800 font-medium text-lg">25% completed</p>
            </div>
          </div>

          {/* Coding Hours */}
          <div className="group bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100 border border-cyan-200 rounded-xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">⌨️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-cyan-900">Hours Coded</h3>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-1"></div>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-cyan-800 font-medium text-lg">54 hours</p>
            </div>
          </div>

          {/* Half Marathon */}
          <div className="group bg-gradient-to-br from-red-50 via-rose-50 to-red-100 border border-red-200 rounded-xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">🏃‍♂️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-red-900">Half Marathon</h3>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mt-1"></div>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-red-800 font-medium text-lg">Incomplete</p>
            </div>
          </div>

          {/* Weightlifting */}
          <div className="group bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 border border-purple-200 rounded-xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">🏋️‍♂️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900">Weightlifting</h3>
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1"></div>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-purple-800 font-medium text-lg">1000lbs volume</p>
              <p className="text-purple-700 text-sm">over 33 workouts</p>
            </div>
          </div>

          {/* Hours in Meetings */}
          <div className="group bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border border-amber-200 rounded-xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">👥</span>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900">Hours in Meetings</h3>
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-1"></div>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-amber-800 font-medium text-lg">307 hours</p>
            </div>
          </div>

          {/* People Met */}
          <div className="group bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border border-yellow-200 rounded-xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer sm:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">🤝</span>
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-900">People Met</h3>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1"></div>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-yellow-800 font-medium text-lg">381 different people</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
