"use client";

import { useEffect, useMemo, useState } from "react";

type LoreItem = {
  id: string;
  /** Displayed on the left (keep short, like 07.2024 or 2012) */
  date: string;
  /** One-line visible headline */
  line: string;
  /** Optional details (shown in a clean side pane) */
  more?: string;
  /** Optional external links shown in the details pane */
  links?: { label: string; url: string }[];
  /**
   * Optional manual sort override (bigger = newer).
   * If omitted, we infer it from `date` so new entries auto-slot correctly.
   */
  sort?: number;
};

function inferSortKey(date: string): number {
  const raw = date.trim();
  const normalized = raw.replaceAll("–", "-"); // handle en-dash ranges like 2012–2014

  // Ranges like "2012-2014" or "2018–2019" → sort by the end of the range.
  if (normalized.includes("-")) {
    const [aRaw, bRaw] = normalized.split("-").map((s) => s.trim());
    const a = Number(aRaw);
    const b = Number(bRaw);
    if (Number.isFinite(a) && Number.isFinite(b)) {
      return Math.max(a, b) * 10000 + 1200; // bias toward "late" in that end year
    }
  }

  // Phrases like "late 2021" / "mid 2021" / "early 2021"
  {
    const m = normalized.match(/^(early|mid|late)\s+(\d{4})$/i);
    if (m) {
      const [, whenRaw, yyyyRaw] = m;
      const yyyy = Number(yyyyRaw);
      const when = whenRaw.toLowerCase();
      const month =
        when === "early" ? 2 : when === "mid" ? 6 : /* late */ 12;
      return yyyy * 10000 + month * 100;
    }
  }

  // Supported inputs:
  // - "MM.DD.YYYY" or "MM.DD.YY" (e.g. 12.18.25)
  // - "MM.YYYY" (e.g. 07.2024)
  // - "YYYY" (e.g. 2012)
  const parts = normalized.split(".").map((p) => p.trim()).filter(Boolean);

  // "MM.DD.YYYY" or "MM.DD.YY"
  if (parts.length === 3) {
    const [mmRaw, ddRaw, yyRaw] = parts;
    const mm = Number(mmRaw);
    const dd = Number(ddRaw);
    const yy = Number(yyRaw);
    const yyyy = yyRaw.length === 2 ? 2000 + yy : yy;
    if (Number.isFinite(mm) && Number.isFinite(dd) && Number.isFinite(yyyy)) {
      return yyyy * 10000 + mm * 100 + dd;
    }
  }

  // "MM.YYYY"
  if (parts.length === 2) {
    const [mmRaw, yyyyRaw] = parts;
    const mm = Number(mmRaw);
    const yyyy = Number(yyyyRaw);
    if (Number.isFinite(mm) && Number.isFinite(yyyy)) {
      return yyyy * 10000 + mm * 100;
    }
  }

  // "YYYY"
  if (parts.length === 1) {
    const yyyy = Number(parts[0]);
    if (Number.isFinite(yyyy)) return yyyy * 10000;
  }

  return 0;
}

const LORE: LoreItem[] = [
  {
    id: "shopify-vanauley-2022-04",
    date: "04.2022",
    line: "First dollars on Shopify selling bath bombs",
    more: "Launched a Shopify storefront for bath bomb fundraising for the Vanauley homeless shelter, promoted via Instagram theme pages. Had around 600 folloewers. Learned e-commerce + order fulfillment and marketing.",
    links: [
      {
        label: "Screenshot",
        url: "/projects/bathbombs.png",
      },
      
    ],
  },
  {
    id: "easyhacks-2025-03",
    date: "03.2025",
    line: "Started EasyHacks",
    more: "Hackathon for Rejects on easyhacks.org. It started from an accidental rejection email thread from UBC nwhacks. Turned into a 10 person team with 170+ beginners from 7+ countries and about $8K in prizes.",
    links: [
      {
        label: "easyhacks.org",
        url: "https://easyhacks.org",
      },
    ],
  },
  {
    id: "tks-2022-09",
    date: "09.2022",
    line: "Joined The Knowledge Society (TKS)",
    more: "Joined TKS — a community that opened my eyes to what’s really possible. Pitched and built tech with 200+ innovators, shipped and showcased impact, and explored 30+ conferences around the world. Projects at Microsoft HQ, Interac, and Sensei Labs.",
  },
  {
    id: "nfts-2021-05",
    date: "05.2021",
    line: "Turned $3K into $100K in NFTs then lost it",
    more: "Got super into NFTs. Took my YMCA internship money, about $3K, and went all in. Flipped Veefriends and World of Women, did some DeFi farming, lived in Discord. Ran it up to around $100K then the market crashed and I lost it all. But I did it once and I can do it again.",
    links: [
      {
        label: "Screenshots",
        url: "/images/nft/image1.png",
      },
    ],
  },
  {
    id: "circus-clounz-2021-09",
    date: "09.2021",
    line: "Led the Circus Clounz NFT team",
    more: "Led a 4 person team. Partnered and dropped NFTs, learned Solidity, and got way more crypto native. Missed product market fit, still learned a lot.",
    links: [
      {
        label: "Circus Clounz (archive)",
        url: "https://web.archive.org/web/20220128132945/https://circusclownz.com/",
      },
      {
        label: "Screenshots",
        url: "/images/nft/image2.png",
      },
    ],
  },
  {
    id: "cangap-scholarship-2023-10",
    date: "10.2023",
    line: "Won the CanGap Scholarship",
    more: "Canadian Gap Year Association helped fund my trip on my gap year across Bangalore, Kerala, and Colombo. Thank you CanGap ❤️",
  },
  {
    id: "ymca-y-story-2023-10",
    date: "10.2023",
    line: "YMCA did a Y Story about me",
    more: "I shared my experience with the YMCA Newcomer Youth Leadership Development Program and how it gave me the confidence and opportunity to help make a change in my community. Big thank you to the donors who make programs like this possible.",
    links: [
      {
        label: "Watch on Instagram",
        url: "https://www.instagram.com/p/Cyi95HKKV2d/",
      },
    ],
  },
  {
    id: "gap-year-2023-09",
    date: "09.2023",
    line: "Started my gap year",
    more: "A year to do cool shit, explore, travel, and learn outside school. I said yes to everything",
  },
  {
    id: "uatx-forbidden-courses-2023-07",
    date: "07.2023",
    line: "UATX Forbidden Courses (Science and Christianity)",
    more: "University of Austin (UATX) — Forbidden Courses (2023): focus in “Science and Christianity.” Completed the pre-course work, but couldn’t join the in-person seminar due to visa constraints. With Harvard and MIT kids",
  },
  {
    id: "york-university-2023-09",
    date: "08.2023",
    line: "Started comp eng at York University",
    more: "I joined the Computer Engineering program at York University. I did frosh and 2 weeks of classes before dropping out.",
  },
  {
    id: "villars-2025-08",
    date: "08.2025",
    line: "Villars reset in Switzerland",
    more: "A month of fresh air, big walks, and a reset in the mountains.",
  },
  {
    id: "poland-2025-07",
    date: "07.2025",
    line: "Teaching in Poland",
    more: "Learned by teaching: explaining ideas forced clarity and patience.",
  },
  {
    id: "half-murph-2025-05",
    date: "05.2025",
    line: "Half Murph challenge",
    more: "May 2025 — did a half Murph challenge",
  },
  {
    id: "yc-ai-school-2025-06",
    date: "06.2025",
    line: "YC AI Startup School",
    more: "Two-day intensive workshop in San Francisco on building and shipping with AI, alongside ~2,000 top CS undergrads and grad students. Absorbed founder lessons: talk to users, ship fast, and iterate.",
  },
  {
    id: "veritas-2025-06",
    date: "06.2025",
    line: "Invited to VERITAS (Thomistic Institute) in DC",
    more: "Invited participant at the VERITAS conference in Washington, DC (Thomistic Institute, 2025). Engaged with scholars and explored foundational questions and philosophical thought.",
  },
  {
    id: "yakov-research-2024-07",
    date: "07.2024",
    line: "Decision theory research in Haifa, Israel",
    more: "Research work with Professor Yakov, focused on info-gap decision theory: making robust choices under severe uncertainty.",
  },
  {
    id: "bike-rides-2024-11",
    date: "11.2024",
    line: "50km Scarborough → downtown bike rides",
    more: "Nov 2024 — did 50km Scarborough → downtown bike rides",
  },
  {
    id: "first-10k-2024-10",
    date: "10.2024",
    line: "Ran my first 10K",
    more: "Oct 2024 did my first 10K",
    links: [
      {
        label: "Strava",
        url: "https://strava.app.link/bfdpyqTA5Zb",
      },
    ],
  },
  {
    id: "cold-plunge-2024-01",
    date: "01.2024",
    line: "Cold plunge at Woodbine Beach, Toronto",
    more: "Jan 1st, 2024 — did a cold plunge with Jack.org at Woodbine Beach in Toronto.",
  },
  {
    id: "monitor-flip-2024",
    date: "03.2024",
    line: "Flipped free monitors to fund my startup",
    more: "Carried free monitors across Toronto from the Beach Sci office to resell and fund my startup",
  },
  {
    id: "covid-online-systems-2020",
    date: "04.2020",
    line: "Went deep on online systems during COVID",
    more: "Goes deep on online systems during lockdown. Begins scholarship + grant experimentation. Learns to reuse essays aggressively. Discovers nonprofit + COVID loopholes.",
  },
  {
    id: "online-money-2020-05",
    date: "05.2020",
    line: "First dollar online (affiliate pages)",
    more: "Started experimenting with online money by building themed affiliate pages (keto products). First taste of leverage: write once, earn repeatedly (sometimes).",
    links: [
      {
        label: "Screenshot",
        url: "/projects/keto.png",
      },
    ],
  },
  {
    id: "scholarship-workflow-2021",
    date: "06.2021",
    line: "Built a scholarship workflow and raised $8k+",
    more: "Builds a scholarship/grant workflow. Experiments with early GPT-2 fine-tuning to speed up applications. Raises $8k+ through scholarships, grants, and honorariums. Takes acquisition-style cuts on opportunities. Learns how incentives really work in education + nonprofits.",
  },
  {
    id: "cube-2-shutdown-late-2021",
    date: "11.2021",
    line: "Shut down Cube 2.0 after a legal threat",
    more: "Builds Cube 2.0, a game storing user info. Project grows fast enough to attract attention. Almost sued by Google (credible legal threat). Shuts it down.",
  },
  {
    id: "mckinnon-2020-02",
    date: "02.2020",
    line: "Got into filmmaking",
    more: "Deeply influenced by creators like Peter McKinnon. Studied pacing (what to cut), story beats (why it matters), and how visuals support emotion.",
  },
  {
    id: "cube-runner-2019",
    date: "08.2019",
    line: "Released Cube Runner (my first game)",
    more: "Built and shipped a Unity mobile game at 15. Cube Runner was an impossible levels kind of game, all reaction time. It got taken down by Google for privacy reasons. First real lesson in platform risk",
    links: [
      {
        label: "Screenshot",
        url: "/projects/cube.png",
      },
      {
        label: "Instagram post",
        url: "https://www.instagram.com/p/BwTdbmtjkZD/",
      },
    ],
  },
  {
    id: "easter-seals-2019-11",
    date: "11.2019",
    line: "Shipped Raspberry Pi OCR glasses (Easter Seals)",
    more: "Built and shipped real time Raspberry Pi glasses to help visually impaired folks read what is in front of them. Used OCR and wired it up to Google Assistant and Alexa. First shipped hardware project at 15.",
  },
  {
    id: "first-yt-2018",
    date: "03.2018",
    line: "Started my first YouTube channel",
    more: "Started my first YouTube channel and made my first videos. Over time I received ~ $500 in free products across channels through partnerships and sponsorships — a real early lesson in distribution and leverage.",
  },
  {
    id: "first-app-2018",
    date: "06.2018",
    line: "Launched my first Android app (Kotlin calculator)",
    more: "A simple calculator app written in Kotlin: clean UI, basic operations (add/subtract/multiply/divide), and a straightforward keypad layout. It was built to be helpful for quick calculations, and I asked users for feedback to improve it.",
  },
  {
    id: "internet-money-2018-2019",
    date: "11.2018",
    line: "Internet money experiments begin",
    more: "First exposure to internet money: ran Instagram pages and experimented with ClickBank affiliate offers (keto niche). Wrote Amazon product reviews → eventually banned. Lesson logged: platforms reward edge-pushing until they don’t.",
  },
  {
    id: "first-pc-2017",
    date: "07.2017",
    line: "Built my first PC",
    more: "Shift from consumer → builder mindset. Learned hardware constraints the hard way and started seeing tech as something I could build and debug.",
  },
  {
    id: "arduino-2015-2016",
    date: "03.2016",
    line: "Arduino obsession and robot builds",
    more: "Arduino obsession begins. Attempts at robot builds (mostly failed, learned electronics basics). First exposure to “I can build things that move.”",
  },
  {
    id: "rc-cars-2012-2014",
    date: "06.2013",
    line: "Negotiated for tech access and tore down RC cars",
    more: "Persistently negotiated with parents for tech access (laptop, RC cars). Took apart RC cars to understand internals. Early pattern: obsession + persistence > permission.",
  },
  {
    id: "moved-canada-2012",
    date: "09.2012",
    line: "Moved to Canada at 9",
    more: "Big identity shift: new country, new norms, and learning to adapt fast.",
  },
  {
    id: "born-2004-05",
    date: "05.2004",
    line: "Born",
  },
];

function LoreListRow({
  item,
  isActive,
  isPinned,
  onHover,
  onPin,
}: {
  item: LoreItem;
  isActive: boolean;
  isPinned: boolean;
  onHover: () => void;
  onPin: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onMouseEnter={onHover}
        onFocus={onHover}
        onClick={onPin}
        className={[
          "group",
          "w-full text-left",
          "grid grid-cols-[90px_1fr] gap-6 items-baseline",
          "py-1 rounded-md",
          "transition-colors",
          isActive ? "bg-gray-50" : "hover:bg-gray-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        ].join(" ")}
        aria-current={isPinned ? "true" : undefined}
      >
        <span className="text-sm text-gray-400 tabular-nums leading-snug group-hover:text-gray-500">
          {item.date}
        </span>

        <span className="min-w-0">
          <span className="block text-sm text-gray-900 leading-snug truncate group-hover:underline group-hover:decoration-gray-200 group-hover:underline-offset-4">
            {item.line}
          </span>
        </span>
      </button>
    </li>
  );
}

export default function LorePage() {
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const items = useMemo(() => {
    return [...LORE].sort((a, b) => {
      const aKey = a.sort ?? inferSortKey(a.date);
      const bKey = b.sort ?? inferSortKey(b.date);
      if (bKey !== aKey) return bKey - aKey;
      // Deterministic tie-breaker for identical dates
      return a.id.localeCompare(b.id);
    });
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPinnedId(null);
        setHoverId(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const activeId = hoverId ?? pinnedId ?? items[0]?.id ?? null;
  const active = activeId ? items.find((i) => i.id === activeId) : null;

  return (
    <main className="page-content">
      <h1 className="hero-heading" style={{ marginBottom: "0" }}>
        lore
      </h1>

      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed text-sm">
          Reverse-chronological moments that shaped me. One line each. Hover to
          preview details, click to pin.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1.35fr_0.65fr]">
        {/* Timeline */}
        <div>
          <ul className="space-y-0">
            {items.map((item) => {
              const isPinned = pinnedId === item.id;
              const isActive = activeId === item.id;
              return (
                <LoreListRow
                  key={item.id}
                  item={item}
                  isActive={isActive}
                  isPinned={isPinned}
                  onHover={() => setHoverId(item.id)}
                  onPin={() =>
                    setPinnedId((prev) => (prev === item.id ? null : item.id))
                  }
                />
              );
            })}
          </ul>

          {/* Mobile details */}
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
            {active?.more ? (
              <>
                <div className="text-xs text-gray-400 tabular-nums">
                  {active.date}
                </div>
                <div className="text-sm font-semibold text-gray-900 mt-1">
                  {active.line}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  {active.more}
                </p>
                {active.links?.length ? (
                  <div className="mt-3 flex flex-col gap-1">
                    {active.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-gray-900 underline decoration-gray-200 underline-offset-4 hover:decoration-gray-400"
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Pick a moment to see more context.
              </p>
            )}
          </div>
        </div>

        {/* Desktop details pane */}
        <aside className="hidden md:block">
          <div className="sticky top-24 border-l border-gray-100 pl-6">
            {active?.more ? (
              <>
                <div className="text-xs text-gray-400 tabular-nums">
                  {active.date}
                </div>
                <div className="text-sm font-semibold text-gray-900 mt-1">
                  {active.line}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  {active.more}
                </p>
                {active.links?.length ? (
                  <div className="mt-3 flex flex-col gap-1">
                    {active.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-gray-900 underline decoration-gray-200 underline-offset-4 hover:decoration-gray-400"
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Hover or click a moment to see more context.
              </p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

