"use client";

import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [copied, setCopied] = useState(false);

  const bio = `Alex Shibu is a second-year student at the University of Toronto, majoring in Physics with minors in Computer Science and Economics. Alex is passionate about leveraging emerging technologies to drive impactful change. He has worked on startups and alongside organizations to build solutions and tools using AI for web3, healthcare, decision theory, nonprofits and EdTech. Alex also loves bringing together young people to drive change and has hosted experiences for over 600 students. In his spare time, he builds cool projects, takes on fitness challenges, and reviews cafes.`;

  const copyBio = () => {
    navigator.clipboard.writeText(bio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4">
        {/* Profile Picture */}
        <div className="flex-shrink-0" style={{ marginTop: "-1rem" }}>
          <Image
            src="/images/about/pfp.jpg"
            alt="Alex Shibu"
            width={280}
            height={280}
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full object-cover border-2 border-gray-200 mx-auto sm:mx-0"
            style={{ margin: "22px" }}
            priority
          />
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
        <p className="text-sm text-gray-500 mb-1">Q4 2025</p>
        <ul className="space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-gray-400 mt-1.5">•</span>
            <span className="text-gray-700">
              Building Avalonn - voice agents for SMBs
            </span>
          </li>
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

      {/* Work with me */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-2">
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
    </main>
  );
}
