"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ActivityType = "Run" | "Walk" | "Hike" | "Ride";

type Activity = {
  title: string;
  dateTime: string;
  location: string;
  stravaEmbedId: string;
  activityType: ActivityType;
  note?: string;
};

const ACTIVITIES: Activity[] = [
  {
    title: "Back at it",
    dateTime: "Feb 22, 2026",
    location: "Toronto, Canada",
    stravaEmbedId: "12532392645",
    activityType: "Run",
    note: "Simple comeback run. No heroics, just momentum.",
  },
  {
    title: "Night Walk in the City",
    dateTime: "Sep 7, 2025 · 7:51 PM",
    location: "Bengaluru, India",
    stravaEmbedId: "15733574092",
    activityType: "Walk",
    note: "Late-night city energy, clear head, long walk home.",
  },
  {
    title: "Closed on Sunday",
    dateTime: "Aug 24, 2025 · 9:12 AM",
    location: "Mannarkad, India",
    stravaEmbedId: "15577844246",
    activityType: "Run",
    note: "Uncles looking at me like I'm running from elephants.",
  },
  {
    title: "Running from the FEDs",
    dateTime: "Aug 16, 2025 · 7:23 AM",
    location: "Hyderabad, India",
    stravaEmbedId: "15473989541",
    activityType: "Run",
    note: "Half of this was me trying to cross the road. It's me, uncles, and stray dogs.",
  },
  {
    title: "Hike on Rocks",
    dateTime: "Aug 9, 2025 · 8:27 AM",
    location: "Ollon, Switzerland",
    stravaEmbedId: "15397163156",
    activityType: "Hike",
    note: "Sharp air, rough terrain, and one of the best views of the year.",
  },
  {
    title: "Stroll",
    dateTime: "Aug 9, 2025 · 2:06 PM",
    location: "Veytaux, Switzerland",
    stravaEmbedId: "15399538231",
    activityType: "Walk",
    note: "Slow pace, scenic route, pure presence.",
  },
  {
    title: "Around the World: Toronto on a City Bike",
    dateTime: "2025",
    location: "Toronto, Canada",
    stravaEmbedId: "12711370594",
    activityType: "Ride",
    note: "A city ride that reminds me movement is also exploration.",
  },
  {
    title: "5K Hike Haifa",
    dateTime: "2025",
    location: "Haifa, Israel",
    stravaEmbedId: "11821742885",
    activityType: "Hike",
    note: "Steep sections and sunshine. A compact but memorable climb.",
  },
  {
    title: "Bimbo 10K",
    dateTime: "Sep 29, 2024 · 8:06 AM",
    location: "Toronto, Canada",
    stravaEmbedId: "12532392645",
    activityType: "Run",
    note: "With the homies, almost got cooked, but made it out alive.",
  },
];

const TYPE_STYLES: Record<ActivityType, string> = {
  Run: "text-orange-600 bg-orange-50 border border-orange-100",
  Walk: "text-blue-600 bg-blue-50 border border-blue-100",
  Hike: "text-emerald-600 bg-emerald-50 border border-emerald-100",
  Ride: "text-purple-600 bg-purple-50 border border-purple-100",
};

export default function RunPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());
  const articleRefs = useRef<(HTMLElement | null)[]>([]);

  // Load Strava embed script once
  useEffect(() => {
    const scriptId = "strava-embed-script";
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://strava-embeds.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // IntersectionObserver: track active dot + fade-in
  useEffect(() => {
    const articles = articleRefs.current.filter(Boolean) as HTMLElement[];
    if (articles.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (!Number.isFinite(idx)) return;
          if (entry.isIntersecting) {
            setActiveIndex(idx);
            setVisibleSet((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.2 },
    );

    articles.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const uniqueCities = useMemo(
    () => new Set(ACTIVITIES.map((a) => a.location)).size,
    [],
  );

  const scrollTo = (index: number) => {
    articleRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="page-content">
      {/* Header */}
      <h1 className="hero-heading" style={{ marginBottom: "0.25rem" }}>
        Alex&apos;s Running logs
      </h1>

      <div className="flex items-center gap-3 flex-wrap mb-1">
        <p className="text-sm text-gray-500 m-0">
          A log of my favorite runs, walks, hikes, and rides. Running is my
          favorite way to explore new cities.
        </p>
        <a
          href="https://www.strava.com/athletes/113105752"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors group"
        >
          <span>Strava</span>
          <span className="text-gray-300 group-hover:text-red-400 transition-colors">
            ↗
          </span>
        </a>
      </div>

      <p className="text-[11px] text-gray-400 mb-6">
        {uniqueCities} cities · {ACTIVITIES.length} highlights
      </p>

      {/* Two-column layout */}
      <div className="flex gap-8 items-start">
        {/* Left: sticky timeline nav */}
        <aside className="hidden sm:flex flex-col sticky top-8 pt-1 shrink-0 w-[130px]">
          <div className="relative flex flex-col">
            {/* Vertical line — sits behind the dots */}
            <div className="absolute top-3 bottom-3 left-[7px] w-px bg-gray-200" />

            {ACTIVITIES.map((activity, index) => (
              <button
                key={activity.stravaEmbedId}
                onClick={() => scrollTo(index)}
                title={activity.title}
                className="relative z-10 flex items-start gap-2.5 py-[11px] group focus:outline-none text-left"
                aria-label={`Scroll to ${activity.title}`}
              >
                {/* Dot */}
                <span
                  className={`mt-[3px] w-[7px] h-[7px] rounded-full shrink-0 transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-gray-900 scale-125 shadow-sm"
                      : "bg-gray-300 group-hover:bg-gray-500"
                  }`}
                />
                {/* Date + city */}
                <span className="flex flex-col leading-tight">
                  <span
                    className={`text-[11px] font-medium transition-colors duration-200 ${
                      activeIndex === index
                        ? "text-gray-900"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {activity.dateTime.split("·")[0].trim()}
                  </span>
                  <span
                    className={`text-[10px] transition-colors duration-200 ${
                      activeIndex === index
                        ? "text-gray-500"
                        : "text-gray-300 group-hover:text-gray-400"
                    }`}
                  >
                    {activity.location.split(",")[0]}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Right: activity cards */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {ACTIVITIES.map((activity, index) => (
            <article
              key={activity.stravaEmbedId}
              id={`activity-${activity.stravaEmbedId}`}
              data-idx={index}
              ref={(el) => {
                articleRefs.current[index] = el;
              }}
              className={`scroll-mt-8 transition-all duration-700 ease-out ${
                visibleSet.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
            >
              {/* Card */}
              <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                {/* Card header */}
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-50/60 border-b border-gray-100">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                        {activity.location}
                      </span>
                      <span className="text-[10px] text-gray-300">·</span>
                      <span className="text-[11px] text-gray-400">
                        {activity.dateTime}
                      </span>
                    </div>
                    <h2 className="text-[15px] font-semibold text-gray-900 leading-snug mt-0.5">
                      {activity.title}
                    </h2>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.1em] ${TYPE_STYLES[activity.activityType]}`}
                  >
                    {activity.activityType}
                  </span>
                </div>

                {/* Embed area */}
                <div className="px-4 py-3">
                  <div className="rounded-lg overflow-hidden border border-gray-100">
                    <div
                      className="strava-embed-placeholder"
                      data-embed-type="activity"
                      data-embed-id={activity.stravaEmbedId}
                      data-style="standard"
                      data-from-embed="false"
                    />
                  </div>
                </div>

                {/* Card footer / note */}
                {activity.note ? (
                  <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/40">
                    <p className="text-[11px] text-gray-500 italic leading-relaxed m-0">
                      {activity.note}
                    </p>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
