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
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 mb-4">
        {/* Profile Picture */}
        <div className="flex-shrink-0 flex flex-col items-center sm:items-start mt-0 sm:mt-[-1rem]">
          <Image
            src="/images/about/pfp.jpg"
            alt="Alex Shibu"
            width={280}
            height={280}
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full object-cover border-2 border-gray-200 mx-auto sm:m-[22px] sm:mb-0"
            priority
          />
          <button
            onClick={copyEmail}
            type="button"
            className="mt-0 p-1 text-gray-700 hover:text-gray-900 text-sm sm:text-base leading-relaxed cursor-pointer bg-transparent border-0 select-text text-center sm:text-left sm:pl-[54px]"
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
        <h2 className="pt-10 text-2xl md:text-4xl font-black mb-3 uppercase text-gray-900">
          <span className="inline-flex items-center gap-2 sm:gap-3 tracking-[0.18em] sm:tracking-[0.28em]">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              OPERATION
            </span>
            <span className="px-2 py-0.5 rounded-md border border-gray-300 bg-gray-50 text-gray-800 shadow-sm">
              FORGE
            </span>
          </span>
          <span className="block mt-2 h-[2px] w-24 bg-gradient-to-r from-gray-900 via-gray-600 to-transparent"></span>
        </h2>
        <button
          onClick={() => setIsQ4Open(!isQ4Open)}
          className="group relative flex items-center justify-between w-full gap-3 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold text-gray-900 transition-all duration-200 cursor-pointer rounded-xl sm:rounded-2xl border border-gray-300/70 border-l-4 border-l-gray-900/80 bg-gradient-to-r from-gray-50 via-white to-gray-50 shadow-md ring-1 ring-gray-200/40 hover:shadow-lg hover:-translate-y-0.5"
          style={{ marginBottom: "1rem" }}
        >
          <span className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
              Q1 2026
            </span>
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
            className={`transition-transform duration-200 text-gray-500 group-hover:text-gray-700 ${
              isQ4Open ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <ul
          className={`transition-all duration-300 ease-in-out rounded-xl sm:rounded-2xl border border-gray-200/70 bg-white/90 shadow-md ring-1 ring-gray-200/40 divide-y divide-gray-200/60 ${
            isQ4Open ? "opacity-100 max-h-[1400px]" : "opacity-0 max-h-0"
          }`}
          style={{ overflow: "hidden" }}
        >
          <li className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-50 via-white to-gray-50 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-600">
            Ops Brief
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
              Q1 2026
            </span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-1 transition-colors hover:bg-gray-50/70">
            <span className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
              Obj 01
            </span>
            <span className="text-gray-800">
              Ship code to GitHub 6 days/week
            </span>
            <span className="sm:ml-auto inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
              Executing
            </span>
          </li>
          <li className="px-3 py-0 pb-[5px] bg-gradient-to-b from-white to-gray-50/40">
            <div className="flex justify-center sm:justify-end">
              <img
                src="https://ghchart.rshah.org/0e4429/alexshibu1"
                alt="GitHub contribution chart"
                className="w-full max-w-[700px]"
                style={{
                  borderRadius: "4px",
                  border: "1px solid rgba(229, 231, 235, 0.8)",
                  padding: "4px",
                  background: "rgba(255, 255, 255, 0.8)",
                  marginTop: "0px",
                  marginBottom: "0px",
                }}
              />
            </div>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-1 transition-colors hover:bg-gray-50/70">
            <span className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
              Obj 02
            </span>
            <span className="text-gray-800">Finish Marc Lou + CS50x</span>
            <span className="sm:ml-auto inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
              Executing
            </span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-1 transition-colors hover:bg-gray-50/70">
            <span className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
              Obj 03
            </span>
            <span className="text-gray-800">
              Build physics + math fundamentals
            </span>
            <span className="sm:ml-auto inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
              Executing
            </span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-1 transition-colors hover:bg-gray-50/70">
            <span className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
              Obj 04
            </span>
            <span className="text-gray-800">Ship one public project</span>
            <span className="sm:ml-auto inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
              Executing
            </span>
          </li>
          <li className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-50 via-white to-gray-50 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-600">
            Mind
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
              Discipline
            </span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-1 transition-colors hover:bg-gray-50/70">
            <span className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
              Obj 05
            </span>
            <span className="text-gray-800">Read 3 books</span>
            <span className="sm:ml-auto inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
              Executing
            </span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-1 transition-colors hover:bg-gray-50/70">
            <span className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
              Obj 06
            </span>
            <span className="text-gray-800">
              Two 90-minute deep-work blocks, 3x/week
            </span>
            <span className="sm:ml-auto inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
              Executing
            </span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-1 transition-colors hover:bg-gray-50/70">
            <span className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
              Obj 07
            </span>
            <span className="text-gray-800">
              Keep YouTube under 20 hours/week
            </span>
            <span className="sm:ml-auto inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
              Executing
            </span>
          </li>
          <li className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-50 via-white to-gray-50 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-600">
            Body
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
              Conditioning
            </span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-1 transition-colors hover:bg-gray-50/70">
            <span className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
              Obj 08
            </span>
            <span className="text-gray-800">Run once per week</span>
            <span className="sm:ml-auto inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
              Executing
            </span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-1 transition-colors hover:bg-gray-50/70">
            <span className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
              Obj 09
            </span>
            <span className="text-gray-800">Lift 3x per week</span>
            <span className="sm:ml-auto inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
              Executing
            </span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-1 transition-colors hover:bg-gray-50/70">
            <span className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
              Obj 10
            </span>
            <span className="text-gray-800">
              Sleep by 11:30pm at least 85% of nights
            </span>
            <span className="sm:ml-auto inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
              Executing
            </span>
          </li>
          <li className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-50 via-white to-gray-50 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-600">
            Q1 Outcome
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
              TBD
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
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Work with me</h2>
        <p className="text-gray-700 leading-relaxed">
          Right now I&apos;m looking for internships at cool companies or
          startups, and would like to collaborate with people with similar
          values. If you&apos;re building something interesting or have an
          opportunity that aligns, let&apos;s connect.
        </p>
        <a
          href="/resume/AlexShibu_2025_General.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto"
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
      </section>

      {/* Featured In - Upgraded Compact Tags */}
      <section style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <h2 className="text-base font-semibold mb-3 text-gray-900">
          Featured In
        </h2>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://www.aiacanada.com/about-us/annual-reports/2022-2/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 rounded-lg cursor-pointer transition-all duration-200 text-xs"
          >
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-900 hover:text-gray-800">
                AIA Canada
              </span>
              <span className="text-gray-600 hover:text-gray-700">
                Annual Report 2022
              </span>
            </div>
          </a>
          <a
            href="https://www.ymcagta.org/about-us/organizational-structure/youth-advisory-committee"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 rounded-lg cursor-pointer transition-all duration-200 text-xs"
          >
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-900 hover:text-gray-800">
                YMCA of Greater Toronto
              </span>
              <span className="text-gray-600 hover:text-gray-700">
                Youth Advisory Committee (YAC) Members
              </span>
            </div>
          </a>
          <a
            href="https://www.ymcagta.org/blog/congratulations-to-the-winners-of-the-youth-for-entrepreneurship-media-contest-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 rounded-lg cursor-pointer transition-all duration-200 text-xs"
          >
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-900 hover:text-gray-800">
                YMCA
              </span>
              <span className="text-gray-600 hover:text-gray-700">
                Youth Entrepreneurship Winner
              </span>
            </div>
          </a>
          <a
            href="https://www.ymca.int/enhesa-and-ymca-support-young-people-in-toronto/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 rounded-lg cursor-pointer transition-all duration-200 text-xs"
          >
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-900 hover:text-gray-800">
                YMCA World
              </span>
              <span className="text-gray-600 hover:text-gray-700">
                Event Emcee
              </span>
            </div>
          </a>
          <a
            href="https://www.youtube.com/watch?v=2z1HoLVZZOY"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 rounded-lg cursor-pointer transition-all duration-200 text-xs"
          >
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-900 hover:text-gray-800">
                YMCA Video
              </span>
              <span className="text-gray-600 hover:text-gray-700">
                Youth Newcomer Feature
              </span>
            </div>
          </a>
          <a
            href="https://www.entrepreneurship.artsci.utoronto.ca/news/we-asked-7-founders-what-sparked-your-startup-idea"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 rounded-lg cursor-pointer transition-all duration-200 text-xs"
          >
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-900 hover:text-gray-800">
                UofT Entrepreneurship
              </span>
              <span className="text-gray-600 hover:text-gray-700">
                Founders Interview
              </span>
            </div>
          </a>
          <a
            href="https://www.instagram.com/reels/DTPr8Waks1J/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 rounded-lg cursor-pointer transition-all duration-200 text-xs"
          >
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-900 hover:text-gray-800">
                UofT Video
              </span>
              <span className="text-gray-600 hover:text-gray-700">
                Student Spotlight
              </span>
            </div>
          </a>
          <a
            href="http://sportsandrec.ca/photo2020.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 rounded-lg cursor-pointer transition-all duration-200 text-xs"
          >
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-900 hover:text-gray-800">
                West Rouge Sports
              </span>
              <span className="text-gray-600 hover:text-gray-700">
                Photo Contest Winner
              </span>
            </div>
          </a>
          <a
            href="https://childrenfirstcanada.org/wp-content/uploads/2025/08/Raising-Canada-Report-2025-FINAL_WEB.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 rounded-lg cursor-pointer transition-all duration-200 text-xs"
          >
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-900 hover:text-gray-800">
                Children First Canada
              </span>
              <span className="text-gray-600 hover:text-gray-700">
                Raising Canada Report
              </span>
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
          className={`space-y-0.5 transition-all duration-300 ease-in-out ${
            is2025Open ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
          }`}
          style={{ overflow: "hidden" }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-2 px-1 hover:bg-gray-50/50 rounded-md transition-colors text-base">
            <span className="font-medium">🏃‍♂️ Strava/Running Stats</span>
            <span className="text-gray-700 font-medium sm:text-right sm:whitespace-nowrap">
              52 runs | 190km | 12 cities
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-2 px-1 hover:bg-gray-50/50 rounded-md transition-colors text-base">
            <span className="font-medium">🚴 Biking Stats</span>
            <span className="text-gray-700 font-medium sm:text-right sm:whitespace-nowrap">
              675 rides | 1100km | 92 hrs
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-2 px-1 hover:bg-gray-50/50 rounded-md transition-colors text-base">
            <span className="font-medium">💻 Become Technical Weapon</span>
            <span className="text-gray-700 font-medium sm:text-right sm:whitespace-nowrap">
              25% completed | 54 hours
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-2 px-1 hover:bg-gray-50/50 rounded-md transition-colors text-base">
            <span className="font-medium">🏃‍♂️ Half Marathon</span>
            <span className="text-gray-700 font-medium sm:text-right sm:whitespace-nowrap">
              Incomplete
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-2 px-1 hover:bg-gray-50/50 rounded-md transition-colors text-base">
            <span className="font-medium">🏋️‍♂️ Weightlifting</span>
            <span className="text-gray-700 font-medium sm:text-right sm:whitespace-nowrap">
              1000lbs | 33 workouts
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-2 px-1 hover:bg-gray-50/50 rounded-md transition-colors text-base">
            <span className="font-medium">👥 Hours in Meetings</span>
            <span className="text-gray-700 font-medium sm:text-right sm:whitespace-nowrap">
              307 hours
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-2 px-1 hover:bg-gray-50/50 rounded-md transition-colors text-base">
            <span className="font-medium">🤝 People Met</span>
            <span className="text-gray-700 font-medium sm:text-right sm:whitespace-nowrap">
              381 different people
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
