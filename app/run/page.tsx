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
    title: "Exploring Bangalore at Night",
    dateTime: "Sep 7, 2025 · 7:51 PM",
    location: "Bengaluru, India",
    stravaEmbedId: "15733574092",
    activityType: "Walk",
    distance: "5.29 km",
    note: "Fun City, did a film Festival in Koramangala.",
  },
  {
    title: "Running toward Tea",
    dateTime: "Sep 19, 2025 · 8:08 AM",
    location: "Thodupuzha, India",
    stravaEmbedId: "15860933804",
    activityType: "Run",
    distance: "4.20 km",
    note: "I ran a lot Thodupuzha. Small town but chaotic place to run.",
  },
  {
    title: "Thrissur Pulikalli",
    dateTime: "Sep 8, 2025 · 12:05 AM",
    location: "Thrissur, India",
    stravaEmbedId: "15737966702",
    activityType: "Walk",
    distance: "4.19 km",
    note: "Everyone put tiger body paint on.",
  },

  {
    title: "High altitude village Run",
    dateTime: "Aug 24, 2025 · 9:12 AM",
    location: "Mannarkad, India",
    stravaEmbedId: "15577844246",
    activityType: "Run",
    distance: "3.02 km",
    note: "Uncles looking at me like I'm running from elephants.",
  },
  {
    title: "Running in Hyderabad",
    dateTime: "Aug 16, 2025 · 7:23 AM",
    location: "Hyderabad, India",
    stravaEmbedId: "15473989541",
    activityType: "Run",
    distance: "6.85 km",
    note: "Nice running paths along the main roads. Lots of people running on the roads.",
  },
  {
    title: "Hike in the mountains",
    dateTime: "Aug 9, 2025 · 8:27 AM",
    location: "Ollon, Switzerland",
    stravaEmbedId: "15397163156",
    activityType: "Hike",
    distance: "5.06 km",
    note: "Water inside the mountains.",
  },
  {
    title: "Walking around Veytaux",
    dateTime: "Aug 9, 2025 · 2:06 PM",
    location: "Veytaux, Switzerland",
    stravaEmbedId: "15399538231",
    activityType: "Walk",
    distance: "4.19 km",
    note: "nice little town.",
  },
  {
    title: "Hiking the mountains",
    dateTime: "Aug 6, 2025 · 7:08 AM",
    location: "Villars-sur-Ollon, Switzerland",
    stravaEmbedId: "15366251610",
    activityType: "Hike",
    distance: "3.46 km",
    note: "nice view at the top.",
  },
  {
    title: "Run Club at Villars",
    dateTime: "Aug 4, 2025 · 6:22 AM",
    location: "Villars-sur-Ollon, Switzerland",
    stravaEmbedId: "15337162885",
    activityType: "Run",
    distance: "2.23 km",
    note: "Started a run club at Villars Institute.Breathing this much fresh air is difficult.",
  },
  {
    title: "Exploring Geneva",
    dateTime: "Aug 3, 2025 · 8:14 AM",
    location: "Geneva, Switzerland",
    stravaEmbedId: "15329737832",
    activityType: "Run",
    distance: "6.32 km",
    note: "One of the nicest places i've run.",
  },
  {
    title: "Berlin at Night",
    dateTime: "July 20, 2025 · 10:27 AM",
    location: "Berlin, Germany",
    stravaEmbedId: "15181666326",
    activityType: "Run",
    distance: "5.02 km",
    note: "I went to a football game.",
  },
  {
    title: "Running in Warsaw",
    dateTime: "Jul 19, 2025 · 10:12 PM",
    location: "Warsaw, Poland",
    stravaEmbedId: "15177655787",
    activityType: "Run",
    distance: "3.65 km",
    note: "I missed my bus to Berlin.",
  },
  {
    title: "Middle of Nowhere Run",
    dateTime: "Jul 18, 2025 · 7:31 AM",
    location: "gmina Trąbki Wielkie, Poland",
    stravaEmbedId: "15153424026",
    activityType: "Run",
    distance: "5.40 km",
  },
  {
    title: "Morning run in a Polish village",
    dateTime: "Jul 11, 2025 · 7:04 AM",
    location: "gmina Leśnica, Poland",
    stravaEmbedId: "15075724006",
    activityType: "Run",
    distance: "5.20 km",
  },
  {
    title: "4 AM Run in Kraków",
    dateTime: "Jul 6, 2025 · 4:58 AM",
    location: "Krakow, Poland",
    stravaEmbedId: "15032810445",
    activityType: "Run",
    distance: "5.66 km",
    note: "So much to see",
  },
  {
    title: "Exploring New York at Midnight",
    dateTime: "Jun 29, 2025 · 11:29 PM",
    location: "New York, USA",
    stravaEmbedId: "14958750764",
    activityType: "Run",
    distance: "3.33 km",
    note: "It really is 24/7 in New York.",
  },
  {
    title: "Morning Run in the National Mall",
    dateTime: "Jun 29, 2025 · 6:18 AM",
    location: "Washington DC, USA",
    stravaEmbedId: "14952488266",
    activityType: "Run",
    distance: "5.47 km",
    note: "So much to see.",
  },
  {
    title: "Running in San Francisco",
    dateTime: "Jun 19, 2025 · 10:01 AM",
    location: "San Francisco, USA",
    stravaEmbedId: "14852815234",
    activityType: "Run",
    distance: "6.54 km",
    note: "Beautiful city, lots of hills.",
  },
  {
    title: "Running at Meta's Campus",
    dateTime: "Jun 18, 2025 · 9:34 PM",
    location: "Palo Alto, USA",
    stravaEmbedId: "14845873684",
    activityType: "Walk",
    distance: "0.86 km",
    note: "Inside the 1 Hacker Way at night",
  },
  {
    title: "Half Murph Challenge",
    dateTime: "May 26, 2025 · 6:38 PM",
    location: "Toronto, Canada",
    stravaEmbedId: "14605641640",
    activityType: "Run",
    distance: "2.53 km",
    note: "Lot's of pain",
  },
  {
    title: "Across Toronto on Bike Share",
    dateTime: "Oct 21, 2024 · 7:52 AM",
    location: "Toronto, Ontario",
    stravaEmbedId: "12711370594",
    activityType: "Ride",
    distance: "50.15 km",
    note: "First 50K 💪 Beautiful views",
  },
  {
    title: "Hike with friends in Haifa",
    dateTime: "Jul 6, 2024 · 1:34 PM",
    location: "Haifa, Israel",
    stravaEmbedId: "11821742885",
    activityType: "Hike",
    distance: "5 km",
    note: "GPS is Jammed",
  },
  {
    title: "First run with UofT run club",
    dateTime: "Sep 18, 2024 · 7:15 PM",
    location: "Toronto, Canada",
    stravaEmbedId: "12446369376",
    activityType: "Run",
    distance: "5.20 km",
  },
  {
    title: "Bimbo 10K",
    dateTime: "Sep 29, 2024 · 8:06 AM",
    location: "Toronto, Canada",
    stravaEmbedId: "11532392645",
    activityType: "Run",
    distance: "10 km",
    note: "First 10K",
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
