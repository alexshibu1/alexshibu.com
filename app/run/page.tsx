"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ActivityType = "Run" | "Walk" | "Hike" | "Ride";

type Activity = {
  title: string;
  dateTime: string;
  location: string;
  stravaEmbedId: string;
  activityType: ActivityType;
  distance?: string;
  note?: string;
};

const ACTIVITIES: Activity[] = [
  {
    title: "Night Walk in the City",
    dateTime: "Sep 7, 2025 · 7:51 PM",
    location: "Bengaluru, India",
    stravaEmbedId: "15733574092",
    activityType: "Walk",
    distance: "5.29 km",
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
    distance: "5 km",
    note: "Steep sections and sunshine. A compact but memorable climb.",
  },
  {
    title: "First run with UofT run club",
    dateTime: "2024",
    location: "Toronto, Canada",
    stravaEmbedId: "12446369376",
    activityType: "Run",
    note: "First time running with a crew. Different energy entirely.",
  },
  {
    title: "Bimbo 10K",
    dateTime: "Sep 29, 2024 · 8:06 AM",
    location: "Toronto, Canada",
    stravaEmbedId: "11532392645",
    activityType: "Run",
    distance: "10 km",
    note: "With the homies, almost got cooked, but made it out alive.",
  },
];

const ACTIVE_RED = "#ef4444";

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

  // IntersectionObserver: track active dot + fade-in (stable, low-jitter)
  useEffect(() => {
    const articles = articleRefs.current.filter(Boolean) as HTMLElement[];
    if (articles.length === 0) return;

    const visibilityByIndex = new Map<number, number>();
    let frame: number | null = null;

    const updateActiveFromRatios = () => {
      let bestIndex = 0;
      let bestRatio = -1;
      visibilityByIndex.forEach((ratio, idx) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestIndex = idx;
        }
      });
      if (bestRatio >= 0) {
        setActiveIndex((prev) => (prev === bestIndex ? prev : bestIndex));
      }
    };

    // Fallback during smooth scrolling: choose card nearest anchor.
    const updateActiveFromScroll = () => {
      const anchorY = window.innerHeight * 0.28;
      let bestIdx = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      articles.forEach((el, idx) => {
        const distance = Math.abs(el.getBoundingClientRect().top - anchorY);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIdx = idx;
        }
      });
      setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));
    };

    const onScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        updateActiveFromScroll();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (!Number.isFinite(idx)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setVisibleSet((prev) => new Set(prev).add(idx));
          }
          visibilityByIndex.set(idx, entry.intersectionRatio);
        });
        updateActiveFromRatios();
      },
      {
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9],
        rootMargin: "-12% 0px -38% 0px",
      },
    );

    articles.forEach((el) => observer.observe(el));
    updateActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
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
        {/* Left: sticky timeline nav — 20% bigger, city on top */}
        <aside className="hidden sm:flex flex-col sticky top-8 pt-1 shrink-0 w-[168px]">
          <div className="relative flex flex-col">
            <div className="absolute top-3 bottom-3 left-[5px] w-px bg-gray-200" />

            {ACTIVITIES.map((activity, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={activity.stravaEmbedId}
                  onClick={() => scrollTo(index)}
                  title={activity.title}
                  className="relative z-10 flex items-start gap-3 py-[14px] group focus:outline-none text-left"
                  aria-label={`Scroll to ${activity.title}`}
                >
                  <span
                    className={`mt-[3px] w-[11px] h-[11px] rounded-full shrink-0 transition-all duration-300 ${
                      isActive
                        ? "bg-red-400 scale-110 shadow-sm"
                        : "bg-gray-200 group-hover:bg-gray-400"
                    }`}
                  />
                  <span className="flex flex-col leading-tight">
                    {/* City — primary, bold */}
                    <span
                      className={`text-[13px] font-semibold transition-colors duration-200 ${
                        isActive
                          ? "text-gray-900"
                          : "text-gray-400 group-hover:text-gray-700"
                      }`}
                    >
                      {activity.location.split(",")[0]}
                    </span>
                    {/* Date — secondary */}
                    <span
                      className={`text-[11px] transition-colors duration-200 ${
                        isActive
                          ? "text-gray-400"
                          : "text-gray-300 group-hover:text-gray-400"
                      }`}
                    >
                      {activity.dateTime.split("·")[0].trim()}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right: activity cards — narrowed to max-w-sm so embed is ~40% smaller */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          {ACTIVITIES.map((activity, index) => (
            <article
              key={activity.stravaEmbedId}
              id={`activity-${activity.stravaEmbedId}`}
              data-idx={index}
              ref={(el) => {
                articleRefs.current[index] = el;
              }}
              className={`scroll-mt-8 transition-all duration-700 ease-out max-w-[480px] ${
                visibleSet.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
            >
              <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                {/* Top stripe — red on active card, gray otherwise */}
                <div
                  className="h-[3px] transition-colors duration-500"
                  style={{
                    background: activeIndex === index ? ACTIVE_RED : "#e5e7eb",
                  }}
                />

                <div className="p-3">
                  {/* Row 1: Title + Distance */}
                  <div className="flex items-start justify-between gap-3 mb-px">
                    <h2 className="text-[16px] font-semibold text-gray-900 leading-tight flex-1 !m-0">
                      {activity.title}
                    </h2>
                    {activity.distance && (
                      <span className="flex items-baseline gap-0.5 shrink-0">
                        <span className="text-[18px] font-bold tabular-nums leading-none text-gray-900">
                          {activity.distance.replace(" km", "")}
                        </span>
                        <span className="text-[10px] text-gray-400 font-normal">
                          km
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Row 2: City · date + Distance */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[13px] font-medium text-gray-600 truncate">
                      {activity.location}
                    </span>
                    <span className="text-[11px] text-gray-300">·</span>
                    <span className="text-[12px] text-gray-400 shrink-0">
                      {activity.dateTime.split("·")[0].trim()}
                    </span>
                  </div>

                  {/* Caption */}
                  {activity.note && (
                    <p className="!text-[14px] text-gray-400 italic leading-relaxed !mb-3">
                      {activity.note}
                    </p>
                  )}

                  {/* Embed */}
                  <div
                    className="rounded-lg overflow-hidden border border-gray-100"
                    style={{ zoom: 0.95 }}
                  >
                    <div
                      className="strava-embed-placeholder"
                      data-embed-type="activity"
                      data-embed-id={activity.stravaEmbedId}
                      data-style="standard"
                      data-from-embed="false"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
