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
      const month = when === "early" ? 2 : when === "mid" ? 6 : /* late */ 12;
      return yyyy * 10000 + month * 100;
    }
  }

  // Supported inputs:
  // - "MM.DD.YYYY" or "MM.DD.YY" (e.g. 12.18.25)
  // - "MM.YYYY" (e.g. 07.2024)
  // - "YYYY" (e.g. 2012)
  const parts = normalized
    .split(".")
    .map((p) => p.trim())
    .filter(Boolean);

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
    id: "learned-drive-motorcycle-2025-09",
    date: "09.2025",
    line: "Learned to drive manuel and ride motorcycle",
    more: "Learned to drive manuel on a Toyota Innova and a KIA while in India and 100 cc motorcycle Yamaha Rx 100. Nothing more fun! Got my actual Indian 4-wheeler motor license too, in a pretty sus way tho.",
  },
  {
    id: "shopify-vanauley-2022-04",
    date: "04.2022",
    line: "First dollar on Shopify selling bath bombs",
    more: "Launched a Shopify storefront for bath bomb fundraising for the Vanauley homeless shelter, promoted via Instagram theme pages. Had around 600 followers. Learned e-commerce + order fulfillment and marketing.",
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
    line: "Created, led and fundraised 8K for EasyHacks",
    more: "Hackathon for Rejects on easyhacks.org. Started from an accidental rejection email thread from UBC nwhacks. Turned into a 10 person team with 170+ beginners from 7+ countries and about $8K in prizes.",
    links: [
      {
        label: "easyhacks.org",
        url: "https://archive.ph/2mqxj",
      },
    ],
  },
  {
    id: "tks-2022-09",
    date: "09.2022",
    line: "Joined The Knowledge Society (TKS)",
    more: "A community that opened my eyes to what’s really possible. Pitched and built tech with 200+ innovators, shipped and explored 30+ conferences around the world. Presented projects at Microsoft HQ, Interac, and Sensei Labs. This is where I met some of my best friends and learned to pitch and ship.",
  },
  {
    id: "nfts-2021-05",
    date: "05.2021",
    line: "Turned $3K into $100K in NFTs then lost it all",
    more: "Got super into NFTs cuz of Gary Vee. Took my YMCA internship money, about $3K, and went all in. Flipped Veefriends and World of Women, did some DeFi farming, lived in Discord. Ran the portfolio up to around $100K then the market crashed and I lost it all. I did once so I can do it again! :)",
    links: [
      {
        label: "Some of my NFTs",
        url: "https://zapper.xyz/bundle/0xa141a92144f926ae25e740875aefd8f99012c1f4,0x5bd7829b7f120fc75e3b57089838e7df4932bc35,0x40f8425e7804e6595647efef935fffa33957b6d8,0x17161ba8ca6829d1fea60ee49299a8ffcd3f5dbc,0x0d2ce0f6fd1df570bd151d295368784bb7265ca5,0x400ce51986840f5c096033a6a70dc26152edbbea?label=Wallets&id=0x54f1961c9482b65e088967b4013c52917db01bdf&tab=nft",
      },
    ],
  },
  {
    id: "circus-clownz-2021-09",
    date: "09.2021",
    line: "Created Circus Clownz NFT project ",
    more: "Led a 4 person team for the Circus Clownz NFT project and learned Solidity. Started building a whole ecosystem around it with token (circus penutz) and linktree tool (bio blox). At the end of the day no product market fit and launch failed.",
    links: [
      {
        label: "Circus Clownz (archive)",
        url: "https://web.archive.org/web/20220128132945/https://circusclownz.com/",
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
    more: "I shared my experience with the YMCA  and how it gave me the confidence and opportunity to help make a change the world.  Big thank you to the donors and staff who make programs like this possible.",
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
    more: "A year to do cool shit, explore, travel, and learn outside school. I said yes to everything. I travel to new cities and visited family in India.",
  },
  {
    id: "uatx-forbidden-courses-2023-07",
    date: "07.2023",
    line: "Joined UATX Forbidden Courses",
    more: "Massive Validation of my path so far. Invited to Forbidden Courses prior to it become a university. Completed the pre-course work, but couldn’t join the in-person seminar due to visa constraints. With Harvard and MIT kids",
  },
  {
    id: "york-university-2023-09",
    date: "08.2023",
    line: "Started comp eng at York University",
    more: "I joined the Computer Engineering program at York University. I had fun at engineering frosh and went to 2 weeks of classes before dropping out. Still have many friends there. ",
  },
  {
    id: "villars-2025-08",
    date: "08.2025",
    line: "Villars fellowship in Switzerland",
    more: "Immersive global fellowship on Systems Thinking and Ecopreneurship in the Swiss Alps to develop scalable impact ventures. Met some of my best friends and learned systems thinking. Swiszzerland is expensive but probly the most beautiful place I've ever been alongside San Francisco.",
  },
  {
    id: "poland-2025-07",
    date: "07.2025",
    line: "Went to Poland to teach tech and English",
    more: "It was a traveling circus across Krakow and Warsaw. Led daily conversations, group sessions and activities for 80+ students. I mainly taught frameworks and pitching while helping teenagers build English confidence.",
  },
  {
    id: "half-murph-2025-05",
    date: "05.2025",
    line: "Did the Half Murph challenge",
    more: "Me and my friend did a half Murph in Toronto. 1.34 hours for 2.53 km, 150 squats, 100 pushups and 50 pullups. I was sore for a week.",
    links: [
      {
        label: "Youtube Video",
        url: "https://youtu.be/eGbw5Yj34qM?si=BdD4A3wOUBUDw4TB",
      },
    ],
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
    line: "Joined VERITAS at the Thomistic Institute",
    more: "Some of the smartest catholics I've met. Engaged with scholars and explored foundational questions and philosophical thought though aquinas lens. Inspired me to take my faith more seriously. First time in washington DC.",
  },
  {
    id: "india-ai-film-family-2025-09",
    date: "09.2025",
    line: "Joined AI film festival",
    more: "Travelled to Kerala, Bangalore, Hyderabad, and Wayanad and did an AI film festival and visited family.",
  },
  {
    id: "first-book-finished-2025-11",
    date: "11.2025",
    line: "Read my first book",
    more: "In November 2025 finished reading my first full book cover to cover. Atomic Habits by James Clear. I've carried it across almost 20 flights for the past 2 years.",
  },
  {
    id: "programming-serious-2025-12",
    date: "12.2025",
    line: "Started shipping daily to GitHub",
    more: "Dec 2025 I decided to take programming seriously and started shipping code to GitHub every day. I felt like a fraud of a developer.",
  },
  {
    id: "missing-relic-film-2026-01",
    date: "01.2026",
    line: "Got 50K+ views on a film about our missing relic",
    more: "I spent five straight days in January 2026 making my first film in a long time, documenting the story of the missing relic at our church. The footage looks saucey and got over 50K views on Instagram.",
    links: [
      {
        label: "Film",
        url: "https://www.instagram.com/p/DUB6-6hjtkp/",
      },
    ],
  },
  {
    id: "italy-24hr-no-internet-2024-08",
    date: "08.2024",
    line: "24 hours in Italy without internet",
    more: "Survived an insane 24 hours in Italy without internet, relying on the kindness of strangers to get around.",
  },
  {
    id: "yakov-research-2024-07",
    date: "07.2024",
    line: "Worked on Decision theory in Israel",
    more: "Worked with Professor Yakov on info-gap decision theory. Optimizing for windfall while increasing robustness under severe uncertainty. One of the most intense and challenging experiences of my life. Transformed my thinking, traveled across Israel and met some of my best friends. All during a war.",
  },
  {
    id: "bike-rides-2024-11",
    date: "11.2024",
    line: "50km on bike share to downtown Toronto",
    more: "Did a 50km bike ride from Scarborough to downtown Toronto for fun. All on the Toronto bike share system. Probably the first person to do it. Switched bikes 13 times in the span of 6 hours.",
    links: [
      {
        label: "Strava",
        url: "https://strava.app.link/R9CRcto25Zb",
      },
    ],
  },
  {
    id: "first-10k-2024-10",
    date: "10.2024",
    line: "Ran my first 10K",
    more: "Oct 2024 did my first 10K after 2 weeks of running with uoft running club",
    links: [
      {
        label: "Strava",
        url: "https://strava.app.link/bfdpyqTA5Zb",
      },
    ],
  },
  {
    id: "cold-plunge-2024-01",
    date: "01.2025",
    line: "Cold plunge at Woodbine Beach, Toronto",
    more: "Jan 1st, 2025 — did a cold plunge with Jack.org at Woodbine Beach in Toronto.",
  },
  {
    id: "3d-printing-2020-10",
    date: "10.2020",
    line: "Got into 3D printing",
    more: "I used to 3D print a lot of things from the Toronto Public library. I would go to every workshop and learn modelling and Maya. I even got an embroidery certification.",
  },
  {
    id: "monitor-flip-2024",
    date: "03.2024",
    line: "Flipped free monitors to fund my startup",
    more: "Carried free monitors from benchsci's old office across Toronto to resell and fund my voice agents project",
  },
  {
    id: "dji-mavic-2020-07",
    date: "07.2020",
    line: "Received Transport Canada basic Flight license",
    more: "I got a DJI Mavic. Since it was the early days for drone stuff, I got the Transport Canada basic Flight license.",
  },
  {
    id: "online-money-2020-05",
    date: "05.2020",
    line: "My first dollar online selling keto books",
    more: " I made my first dollar online, selling keto books to women in Nebraska. I've built mutiple theme pages for gaming, health keto and other stuff and sold a clickbank product.",
    links: [
      {
        label: "Screenshot",
        url: "/projects/keto.png",
      },
      {
        label: "Youtube Video",
        url: "https://youtu.be/Lw3WRJgAT5M?si=pobcTDrmK0c8BoP3",
      },
    ],
  },
  {
    id: "sony-a7-iii-2021-06",
    date: "06.2021",
    line: "Bought Sony A7 III with crypto profits",
    more: "Took some of the crypto money and cashed out to buy a Sony A7 III for around $2k. I wanted to take film seriously and this was my first camera. I love it!",
    links: [
      {
        label: "photo gallery",
        url: "https://photos.app.goo.gl/hQHRSkBeNKmKsgMP7",
      },
    ],
  },
  {
    id: "scholarship-workflow-2021",
    date: "06.2021",
    line: "Built a scholarship workflow and raised $8k+",
    more: "Learned millions of dollars are left on the table. I experimented with early GPT-2 fine-tuning to speed up applications. Learned how incentives really work in education and nonprofits.",
  },
  {
    id: "cube-2-shutdown-late-2021",
    date: "11.2021",
    line: "Launched Cube Runner 2.0 but got taken down",
    more: "I was a child who built my first game with unity but few weeks after release and 30 users. Project got taken down by Google for violating user privacy and got a legal email from them.",
    links: [
      {
        label: "Screenshot",
        url: "/projects/cube.png",
      },
      {
        label: "Instagram post",
        url: "https://www.instagram.com/p/BwTdbmtjkZD/",
      },
      {
        label: "photo gallery",
        url: "https://photos.app.goo.gl/dqKq7rCJyfKLBj688",
      },
    ],
  },
  {
    id: "mckinnon-2020-02",
    date: "02.2020",
    line: "Fell in love with filmmaking",
    more: "Deeply influenced by creators like Peter McKinnon, potato and got into filmmaking. Did over 10+ videos, short films entered into short film competions. Won a few thousand dollars for corporate vids. It's now a passion of mine.",
    links: [
      {
        label: "mars rover",
        url: "https://youtu.be/vQcW4T5JnPU?si=txlOTA6LekbJNyPI",
      },
      {
        label: "my rode reel (short film)",
        url: "https://youtu.be/lFMXM3H3K1I?si=0fx5mwu6zfClNrro",
      },
      {
        label: "photo gallery",
        url: "https://photos.app.goo.gl/hQHRSkBeNKmKsgMP7",
      },
    ],
  },
  {
    id: "easter-seals-2019-11",
    date: "11.2019",
    line: "Built a real time OCR glasses for visually impaired",
    more: "Built and shipped real time Raspberry Pi glasses to help visually impaired folks read what is in front of them. Used OCR and wired it up to Google Assistant and Alexa. First shipped hardware project at 15. I was the youngest presentor at the easter seals canada innovation night. Thanks Ms. Chan for the opportunity.",
    links: [
      {
        label: "Easter Seals",
        url: "https://photos.app.goo.gl/dqKq7rCJyfKLBj688",
      },
    ],
  },
  {
    id: "bible-companion-2019-09",
    date: "09.2019",
    line: "Built a Actions on Google and got 10K in cloud",
    more: "Received 10K in cloud credits to work on Actions on Google, plus free merch. Created Bible Companion. A google assistant bible study skill that allows users to ask questions about scripture, receive daily verses on google assistant. It was a pivotal moment of validation. Realizing that emerging tech could be this cool and that the scale of (even fake) cloud-credit money could be so large. This is when i started to take software seriously.",
    links: [
      {
        label: "Actions on Google",
        url: "public/projects/actions on google 2.png",
      },
      {
        label: "screenshot",
        url: "public/projects/actions on google.png",
      },
    ],
  },
  {
    id: "church-logo-2019-06",
    date: "06.2019",
    line: "Won church logo competition and got $100",
    more: "I made the first logo for the St. Thomas Syro Malabar Forane Church. I won the competition and got $100 from the bishop in front of everyone. This started my pursuit of money.",
  },
  {
    id: "first-yt-2018",
    date: "03.2018",
    line: "Started my first YouTube channel",
    more: "Started my first YouTube channel and made my first videos. Even though I only had 50 subscribers, I was still able to everything from 3d printers, driving wheels, parts and lot's of microphones from Fifine. Over time I received ~$400 in free products/cash across channels through sponsorships. There was a whole shady side, along the lines of me -> parkistan -> china -> amazon. Ask me in person :)",
    links: [
      {
        label: "3d printer",
        url: "https://youtu.be/ljdU0ozsyL0?si=8PyQfuKFo_yTZqIg",
      },
      {
        label: "microphone",
        url: "https://youtu.be/gP5NFGZgsek?si=AIVCuFfjRTPWL8rd",
      },
      {
        label: "first video",
        url: "https://youtu.be/ShW01SDJI0c",
      },
    ],
  },
  {
    id: "photography-competitions-2020",
    date: "08.2020",
    line: "Started winning photography competitions",
    more: "Started winning photography competitions. I would sign up for everything. One of my photographs was even featured in a local gallery showcase. Won around one thousand dollars in total.",
    links: [
      {
        label: "photo gallery",
        url: "https://photos.app.goo.gl/hQHRSkBeNKmKsgMP7",
      },
    ],
  },

  {
    id: "first-app-2018",
    date: "06.2018",
    line: "Launched my first Android app",
    more: "A simple calculator app written in Kotlin. Made a clean UI, basic operations (add/subtract/multiply/divide), and a straightforward keypad layout. It was written in Kotlin and launched on the Google Play Store.",
    links: [
      {
        label: "photo gallery",
        url: "https://photos.app.goo.gl/dqKq7rCJyfKLBj688",
      },
    ],
  },
  {
    id: "first-pc-2017",
    date: "06.2017",
    line: "Built my first PC",
    more: "Inspired by linus tech tips and dave2d. I built my first PC. This started my whole journey of building things and tech. Then this became my thing. I'd build PCs for everyone from random parts and CPU's from Value Village. I loved it.",
  },
  {
    id: "arduino-2015-2016",
    date: "11.2018",
    line: "Obsession with Arduino and robots",
    more: "Begged my parents for random Arduino tech. And started building random things bluetooth controlled RC cars and open source OTTO project. Even prior to this I luv breaking apart RC cars from value village ",
    links: [
      {
        label: "photo gallery",
        url: "https://photos.app.goo.gl/dqKq7rCJyfKLBj688",
      },
    ],
  },
  {
    id: "moved-canada-2012",
    date: "09.2012",
    line: "Moved to Canada at 9",
    more: "Big shift. Joined ESL at school.",
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
  isExpanded,
  onHover,
  onPin,
  onToggleExpand,
}: {
  item: LoreItem;
  isActive: boolean;
  isPinned: boolean;
  isExpanded: boolean;
  onHover: () => void;
  onPin: () => void;
  onToggleExpand: () => void;
}) {
  const panelId = `lore-panel-${item.id}`;
  const toggleId = `lore-toggle-${item.id}`;

  return (
    <li>
      {/* Mobile: tap to expand inline (accordion) */}
      <button
        type="button"
        onClick={onToggleExpand}
        className={[
          "group",
          "w-full text-left",
          "grid grid-cols-[90px_1fr] gap-6 items-baseline",
          "py-2.5 rounded-md",
          "transition-colors",
          "md:hidden",
          isExpanded
            ? "bg-red-50/70"
            : "active:bg-red-50/50 hover:bg-red-50/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        ].join(" ")}
        id={toggleId}
        aria-expanded={isExpanded}
        aria-controls={panelId}
      >
        <span className="text-sm text-gray-400 tabular-nums leading-snug group-hover:text-gray-500">
          {item.date}
        </span>

        <span className="min-w-0">
          <span className="block text-sm text-gray-900 leading-snug truncate group-hover:underline group-hover:decoration-red-200 group-hover:underline-offset-4">
            {item.line}
          </span>
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={toggleId}
        hidden={!isExpanded}
        className="md:hidden"
      >
        <div className="grid grid-cols-[90px_1fr] gap-6">
          <span aria-hidden="true" />
          <div className="pb-2">
            {item.more ? (
              <>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  {item.more}
                </p>
                {item.links?.length ? (
                  <div className="mt-3 flex flex-col gap-1">
                    {item.links.map((link) => (
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
              <p className="text-sm text-gray-500 mt-2">
                No extra context yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onMouseEnter={onHover}
        onFocus={onHover}
        onClick={onPin}
        className={[
          "group",
          "w-full text-left",
          "hidden md:grid grid-cols-[90px_1fr] gap-6 items-baseline",
          "py-1 rounded-md",
          "transition-colors",
          isActive ? "bg-red-50/70" : "hover:bg-red-50/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        ].join(" ")}
        aria-current={isPinned ? "true" : undefined}
      >
        <span className="text-sm text-gray-400 tabular-nums leading-snug group-hover:text-gray-500">
          {item.date}
        </span>

        <span className="min-w-0">
          <span className="block text-sm text-gray-900 leading-snug truncate group-hover:underline group-hover:decoration-red-200 group-hover:underline-offset-4">
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
        setExpandedId(null);
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
          <span className="hidden md:inline">
            A timeline of moments that shaped my life. Hover for details.
          </span>
          <span className="md:hidden">
            A timeline of moments that shaped my life. Tap to expand.
          </span>
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1.35fr_0.65fr]">
        {/* Timeline */}
        <div>
          <ul className="space-y-0">
            {items.map((item) => {
              const isPinned = pinnedId === item.id;
              const isActive = activeId === item.id;
              const isExpanded = expandedId === item.id;
              return (
                <LoreListRow
                  key={item.id}
                  item={item}
                  isActive={isActive}
                  isPinned={isPinned}
                  isExpanded={isExpanded}
                  onHover={() => setHoverId(item.id)}
                  onPin={() =>
                    setPinnedId((prev) => (prev === item.id ? null : item.id))
                  }
                  onToggleExpand={() =>
                    setExpandedId((prev) => (prev === item.id ? null : item.id))
                  }
                />
              );
            })}
          </ul>
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
