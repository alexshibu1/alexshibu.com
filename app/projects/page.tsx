"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, type CSSProperties } from "react";

type Project = {
  name: string;
  description: string;
  link: string;
  date: string;
  /** YouTube etc. — 🎥 icon links here */
  video?: string;
  /** Local MP4/WebM for looping card preview (optional; else `video` if it’s a /path) */
  previewVideoLocal?: string;
  /** Where the big preview (image/video) links; defaults to `link` */
  cardMediaLink?: string;
  /** Scale local preview video (1.2 ≈ 20% zoom-in; crops edges) */
  previewVideoScale?: number;
  /** Playback speed for local preview (e.g. 2 = 2×) */
  previewPlaybackRate?: number;
  repo?: string;
  /** Second repo (e.g. umbrella / archive) — extra 💻 */
  repoSecondary?: string;
  writeup?: string;
  featured?: boolean;
  image?: string;
  images?: string[];
  /** CSS object-position for image preview (e.g. "top" to show top crop) */
  previewImageObjectPosition?: string;
  /** Scale image preview (1.1 = 10% zoom; clipped to tile) */
  previewImageScale?: number;
  /** If true, do not show the 📷 link for the main image */
  hideImageLink?: boolean;
};

function FeaturedIndicator({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.span
      animate={
        isHovered
          ? {
              width: 4,
              height: 12,
              borderRadius: 999,
              opacity: 1,
            }
          : {
              width: 5,
              height: 5,
              borderRadius: 999,
              opacity: 0.6,
            }
      }
      className="flex items-center justify-center"
      initial={false}
      style={{
        background: "#ff3a3a",
        display: "inline-block",
      }}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 22,
      }}
    />
  );
}

function BigProjectButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.4rem 0.8rem",
        borderRadius: "6px",
        cursor: "pointer",
        border: "none",
        background: "transparent",
        transition: "background-color 0.2s ease",
        backgroundColor: isActive ? "rgba(255, 58, 58, 0.1)" : "transparent",
      }}
      whileHover={{
        backgroundColor: isActive
          ? "rgba(255, 58, 58, 0.15)"
          : "rgba(0, 0, 0, 0.02)",
      }}
    >
      <motion.span
        animate={
          isHovered
            ? {
                width: 4,
                height: 12,
                borderRadius: 999,
              }
            : {
                width: 5,
                height: 5,
                borderRadius: 999,
              }
        }
        initial={false}
        style={{
          background: isActive ? "#ff3a3a" : isHovered ? "#ff3a3a" : "#ff3a3a",
          display: "inline-block",
          opacity: isActive ? 1 : isHovered ? 1 : 0.6,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 22,
        }}
      />
      <span
        style={{
          fontSize: "14px",
          color: isActive ? "#ff3a3a" : "#666",
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 400,
          transition: "color 0.2s ease",
        }}
      >
        {isActive ? "Featured Projects" : "Featured Projects"}
      </span>
    </motion.button>
  );
}

function ProjectItem({ project }: { project: Project }) {
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const imageExtensionPattern = /\.(png|jpe?g|webp|gif|avif|svg)$/i;
  const isUsableLink = (url?: string) =>
    Boolean(url && url.trim() !== "" && url.trim() !== "#");
  const isLocalHostedMedia = (url?: string) =>
    Boolean(url && url.startsWith("/"));

  const imageCandidates = [
    project.image,
    ...(project.images ?? []),
    project.link && imageExtensionPattern.test(project.link)
      ? project.link
      : "",
  ];

  const previewMedia = imageCandidates.find((candidate) =>
    isLocalHostedMedia(candidate),
  );
  const localPreviewVideo =
    (project.previewVideoLocal &&
      isLocalHostedMedia(project.previewVideoLocal) &&
      /\.(mp4|webm|mov)$/i.test(project.previewVideoLocal) &&
      project.previewVideoLocal) ||
    (project.video &&
      isLocalHostedMedia(project.video) &&
      /\.(mp4|webm|mov)$/i.test(project.video) &&
      project.video) ||
    null;
  const primaryLink = isUsableLink(project.link)
    ? project.link
    : previewMedia && isUsableLink(previewMedia)
      ? previewMedia
      : "";
  const mediaLink = isUsableLink(project.cardMediaLink)
    ? project.cardMediaLink!
    : primaryLink;
  /**
   * Keep previews silent + clean: muted autoplay with no controls.
   * The entire preview surface can then be a single click target.
   */
  const zoom = project.previewVideoScale ?? 1;
  const playbackRate = project.previewPlaybackRate ?? 1;
  const videoNode = (
    <video
      className="project-media project-media-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`${project.name} preview`}
      style={
        zoom !== 1
          ? {
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
            }
          : undefined
      }
      onLoadedMetadata={(e) => {
        if (playbackRate !== 1) {
          (e.target as HTMLVideoElement).playbackRate = playbackRate;
        }
      }}
    >
      <source src={localPreviewVideo!} type="video/mp4" />
    </video>
  );
  /** Wrapper keeps tile size fixed while scale() crops edges (same dimensions as other cards). */
  const previewVideoEl =
    zoom !== 1 ? (
      <div className="project-video-zoom-shell">{videoNode}</div>
    ) : (
      videoNode
    );

  return (
    <li className="project-card">
      {localPreviewVideo ? (
        mediaLink ? (
          <a
            href={mediaLink}
            className="project-media-link project-media-shell project-media-shell--video"
            target="_blank"
            rel="noopener noreferrer"
          >
            {previewVideoEl}
          </a>
        ) : (
          <div className="project-media-shell project-media-shell--video">
            {previewVideoEl}
          </div>
        )
      ) : previewMedia ? (
        (() => {
          const imgScale = project.previewImageScale ?? 1;
          const imageStyle: CSSProperties = {
            ...(project.previewImageObjectPosition && {
              objectPosition: project.previewImageObjectPosition,
            }),
            ...(imgScale !== 1 && {
              transform: `scale(${imgScale})`,
              transformOrigin:
                project.previewImageObjectPosition === "top"
                  ? "center top"
                  : "center center",
            }),
          };
          const imageEl = (
            <Image
              src={previewMedia}
              alt={`${project.name} preview`}
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
              className="project-media"
              style={Object.keys(imageStyle).length ? imageStyle : undefined}
            />
          );
          const wrapped =
            imgScale !== 1 ? (
              <div className="project-video-zoom-shell">{imageEl}</div>
            ) : (
              imageEl
            );
          return primaryLink ? (
            <a
              href={primaryLink}
              className="project-media-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {wrapped}
            </a>
          ) : (
            <div className="project-media-shell">{wrapped}</div>
          );
        })()
      ) : primaryLink ? (
        <a
          href={primaryLink}
          className="project-media-placeholder"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="project-media-placeholder-title">
            {project.name}
          </span>
          <span className="project-media-placeholder-meta">
            add gif/video/screenshot later
          </span>
        </a>
      ) : (
        <div className="project-media-placeholder">
          <span className="project-media-placeholder-title">
            {project.name}
          </span>
          <span className="project-media-placeholder-meta">
            add gif/video/screenshot later
          </span>
        </div>
      )}

      <div className="project-card-content">
        <div
          className="project-title-wrapper"
          onMouseEnter={() => setIsTitleHovered(true)}
          onMouseLeave={() => setIsTitleHovered(false)}
        >
          {project.featured && (
            <span style={{ verticalAlign: "middle" }}>
              <FeaturedIndicator isHovered={isTitleHovered} />
            </span>
          )}
          {primaryLink ? (
            <a
              href={primaryLink}
              className="project-title"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
              <span className="project-arrow">↗</span>
            </a>
          ) : (
            <span className="project-title" style={{ cursor: "default" }}>
              {project.name}
            </span>
          )}
          <div className="project-meta-trail">
            <div className="project-actions">
              {project.repo && project.repo !== "" && (
                <a
                  href={project.repo}
                  className="project-link-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Repository"
                >
                  💻
                </a>
              )}
              {project.repoSecondary && project.repoSecondary !== "" && (
                <a
                  href={project.repoSecondary}
                  className="project-link-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="dAPPS (minting + engines)"
                >
                  💻
                </a>
              )}
              {project.writeup && project.writeup !== "" && (
                <a
                  href={project.writeup}
                  className="project-link-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Write-up"
                >
                  ✍️
                </a>
              )}
              {project.video &&
                project.video !== "" &&
                /^https?:\/\//i.test(project.video) && (
                  <a
                    href={project.video}
                    className="project-link-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Video"
                  >
                    🎥
                  </a>
                )}
              {project.image &&
                project.image !== "" &&
                !project.hideImageLink && (
                  <a
                    href={project.image}
                    className="project-link-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Image"
                  >
                    📷
                  </a>
                )}
              {project.images &&
                project.images.length > 0 &&
                project.images.map((img, index) => (
                  <a
                    key={index}
                    href={img}
                    className="project-link-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`View Image ${index + 1}`}
                  >
                    📷
                  </a>
                ))}
            </div>
            <span className="project-date">{project.date}</span>
          </div>
        </div>
        <span className="project-desc">{project.description}</span>
      </div>
    </li>
  );
}

export default function WorkIndex() {
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);

  const projects = [
    {
      name: "Youth 4 Entrepreneurship Desjardins x YMCA",
      description:
        "Created a film on why young people should build and won first place in a nationwide competition. Led to invite from Desjardins Dream the Impossible event in Montreal.I also emceed the event the year after.",
      link: "https://www.ymcagta.org/blog/congratulations-to-the-winners-of-the-youth-for-entrepreneurship-media-contest-powered-by-desjardins", // Add link later
      date: "03.2022",
      video: "https://www.youtube.com/watch?v=mHKDR622pCM", // Add video link later
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20gala.mp4",
      cardMediaLink:
        "https://www.ymcagta.org/blog/congratulations-to-the-winners-of-the-youth-for-entrepreneurship-media-contest-2025",
      writeup:
        "https://www.ymcagta.org/blog/congratulations-to-the-winners-of-the-youth-for-entrepreneurship-media-contest-2025",
      images: [
        "https://www.linkedin.com/posts/alexshibu_dreamtheimpossible-reverlimpossible-activity-7077475467871600640-FrKP/",
        "/projects/placeholders/project%20chips.mp4",
      ],
    },
    {
      name: "Youth Advisory Committee",
      description:
        "Working with the Youth Advisory Committee to provide strategic advice to the YMCA of Greater Toronto's Board of Directors, championing youth voices and strengthening community engagement for young people in the GTA. Grounded in creative problem-solving and emerging technology.",
      link: "https://www.ymcagta.org/about-us/youth-advisory-committee",
      date: "03.2025",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/placeholders/project%20YAC.png",
      previewImageObjectPosition: "bottom",
      previewImageScale: 1.1,
      cardMediaLink:
        "https://www.ymcagta.org/about-us/youth-advisory-committee",
      images: [
        "https://www.linkedin.com/posts/alexshibu_youthleadership-activity-7338411863904309249-frCZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAACk8q9ABrmBqQ4wz9R3Ev5JU1iATl26x-5M",
      ],
    },
    {
      name: "Breakthrough Junior Challenge",
      description:
        "Top 14% global finalist for the challenge, explaining quantum computing fundamentals, superposition, entanglement, and John Bell's Theorem. Built a video explaining Radioisotope thermoelectric generators that ranked globally among thousands of entries.",
      link: "https://www.youtube.com/watch?v=vQcW4T5JnPU",
      date: "06.2021",
      video: "https://www.youtube.com/watch?v=vQcW4T5JnPU",
      repo: "",
      writeup: "",
      previewVideoLocal: "/projects/placeholders/project%20quantum.mp4",
      previewVideoScale: 1.1,
    },
    {
      name: "Google Ads & Analytics Team",
      description:
        "STEM Fellowship (Feb 2022). Wrote monthly SC reports using Google Ads and Google Analytics data, including conclusions from statistical testing; monthly social media reports with statistical comparisons across platforms; used Plerdy to analyze the SF website for optimization and SEO.",
      link: "#",
      date: "02.2022",
      repo: "",
      image: "/projects/placeholders/project%20stem.png",
      video: "",
      writeup: "",
    },
    {
      name: "Young Canadians Parliament Member",
      description:
        "Children First Canada (Sep 2022 – Jul 2023). Developed a policy brief on youth mental health crises with actionable recommendations for the Canadian government; advocated for a government-funded mental health app; proposed regulations for non-scientific mental health apps (aligned with over-the-counter drug standards); conceptualized a certification for sub-specialist mental health providers.",
      link: "https://childrenfirstcanada.org/wp-content/uploads/2025/08/Raising-Canada-Report-2025-UPDATED.pdf",
      date: "09.2022",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20children.mp4",
      previewVideoScale: 2,
      cardMediaLink:
        "https://childrenfirstcanada.org/wp-content/uploads/2025/08/Raising-Canada-Report-2025-UPDATED.pdf",
      video: "",
      writeup: "",
      images: [
        "https://www.linkedin.com/in/alexshibu/details/volunteering-experiences/1749446429/multiple-media-viewer/?profileId=ACoAACk8q9ABrmBqQ4wz9R3Ev5JU1iATl26x-5M&treasuryMediaId=1719252984259&type=DOCUMENT",
        "https://www.linkedin.com/in/alexshibu/details/volunteering-experiences/1749446429/multiple-media-viewer/?profileId=ACoAACk8q9ABrmBqQ4wz9R3Ev5JU1iATl26x-5M&treasuryMediaId=1719252984260&type=DOCUMENT",
      ],
    },
    {
      name: "WagerAI",
      description:
        "The Polymarket for focus. A command terminal for deep work. Open a position task, add liquidity, and execute. To-dos with real stakes, a dashboard of portfolio and earnings, and a marketplace to see friends' positions.",
      link: "https://wagerai.vercel.app",
      date: "12.2025",
      repo: "https://github.com/alexshibu1/wagerai",
      previewVideoLocal: "/projects/placeholders/Project%20Wager.mp4",
      previewPlaybackRate: 2,
      cardMediaLink: "https://x.com/AlexShibu2/status/1998972302046707852?s=20",
      video: "https://youtu.be/Kd5UmGPF9lA?si=xTIPaNNNE4rpaO0o",
      writeup: "",
      featured: true,
    },
    {
      name: "PerplexityAI - easyhacks.org",
      description:
        "Created and led EasyHacks, a hackathon rejects. It started in an email thread from UBC nwhacks. It transformed into a 20 person operation, from military veterans to high school students in Nepal, with 170+ participants and $8K in prizes raised from sponsors.",
      link: "https://archive.ph/2mqxj",
      date: "01.2025",
      repo: "",
      previewVideoLocal: "/projects/placeholders/easyhacks.mp4",
      previewVideoScale: 1.4,
      cardMediaLink: "https://archive.ph/2mqxj",
      video: "https://www.youtube.com/watch?v=BUFH1s5iUtw&t=55s",
      writeup: "https://www.sprint.dev/hackathons/easyhacks",
      featured: true,
    },
    {
      name: "LUMA - AI Meditations [hackathon]",
      description:
        "LUMA uses generative AI to create a unique, personalized meditation experience, addressing the global mental health crisis with personalized meditations practices for everyone. Built with React, Flask, Cohere, Google Cloud TTS, and pydub.",
      link: "https://devpost.com/software/luma-luminous-understanding-through-mindful-ai",
      date: "05.2025",
      repo: "https://github.com/e-ndorfin/luma",
      previewVideoLocal: "/projects/placeholders/project%20luma.mp4",
      previewVideoScale: 1.2,
      previewPlaybackRate: 4,
      cardMediaLink:
        "https://devpost.com/software/luma-luminous-understanding-through-mindful-ai",
      video: "https://www.youtube.com/watch?v=neO-K2qJo6Y&t=20s",
      writeup: "",
    },
    {
      name: "BenchBot - Internal Slack AI for BenchSci",
      description:
        "Built an internal Slack AI (BenchBot) prototype to streamline HR/business communications and modeled a $4.5M annual savings scenario.  BenchSci's team size doubled from 200 to 400+ employees in 2022, repetition of common administrative, onboarding, HR, and technical questions asked by new and existing employees have surged. Repetitive queries and information overload are hindering BenchSci's productivity up to 104,000 hours annually.",
      link: "https://docs.google.com/presentation/d/1cwFMnute4f_i65IaNJsnTHUXk0QaryH_FKPFqDETxKM/edit?usp=sharing",
      date: "12.2022",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20benchsci.mp4",
      cardMediaLink:
        "https://docs.google.com/presentation/d/1cwFMnute4f_i65IaNJsnTHUXk0QaryH_FKPFqDETxKM/edit?usp=sharing",
      video: "https://www.youtube.com/watch?v=Mqb1hEqly_Y",
      writeup: "",
    },
    {
      name: "BridgeWorks Fellowship - Increase Youth Employment",
      description:
        "Pitch for BridgeWorks Fellowship focused on increasing youth employment opportunities.",
      link: "/projects/bridgeworks.pdf",
      date: "05.2024",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20bridgeworks.mp4",
      cardMediaLink: "/projects/bridgeworks.pdf",
      video: "https://www.youtube.com/watch?v=Jz48kAlGy3o&t=25s",
      writeup: "",
    },
    {
      name: "Avalonn - Voice Agents for SMBs",
      description:
        "Avalonn is voice agent that answers common inquiries, books jobs, estimate quotes, and escalates emergencies, helping small businesses recover roughly $78 per missed call on average.  Found early stage traction through customer interviews, live demos and onboarding local service businesses in plumbing and HVAC integrating into their existing workflows. Received $25k in AWS credits, participated in DMZ Basecamp and featured in UofT Centre for Entrepreneurship founder showcases. Built using React + Flask + ElevenLabs + OpenAI + Twilio.",
      link: "https://www.youtube.com/watch?v=qsD2kOopCK4",
      date: "06.2025",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20avalonn.mp4",
      previewVideoScale: 1.1,
      cardMediaLink: "https://www.youtube.com/watch?v=qsD2kOopCK4",
      video: "https://www.youtube.com/watch?v=dnusNHRDGMo",
      writeup:
        "https://www.entrepreneurship.artsci.utoronto.ca/news/we-asked-7-founders-what-sparked-your-startup-idea",
      featured: true,
    },
    {
      name: "CoachMi.co",
      description:
        "Forge your path with Titans, an AI-powered mentorship platform that provides guidance from industry giants. Features custom virtual boardrooms, optimized action roadmaps, and 50+ decision-making frameworks.",
      link: "https://web.archive.org/web/20240924161229/http://www.coachmi.co/",
      date: "09.2024",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20coachmi.mp4",
      previewPlaybackRate: 2,
      cardMediaLink:
        "https://web.archive.org/web/20240924161229/http://www.coachmi.co/",
      video: "https://www.youtube.com/watch?v=xWqw_l3Nh2M",
      writeup:
        "https://docs.google.com/presentation/d/1kiCEzGCJV-VriZXeSeexSCXZerS3k28HrKrysDQ4vbE/edit?slide=id.g26767847792_2_120#slide=id.g26767847792_2_120",
    },
    {
      name: "Circus Clownz NFT",
      description:
        "Hired 2 people, created nfts, social media, and discord community, but did not launch due to the lack of long term utility and the massive market crash of 2022.",
      link: "/essay/circusclownz",
      date: "04.2021",
      repo: "https://github.com/alexshibu1/CircusClownz",
      repoSecondary: "https://github.com/alexshibu1/dAPPS",
      previewVideoLocal: "/projects/placeholders/project%20clownz.mp4",
      cardMediaLink: "/essay/circusclownz",
      video: "https://youtu.be/_ycxR8aP980?si=oeGxGrFIYkKJ_gkC",
      writeup:
        "https://docs.google.com/presentation/d/1EGrDyCZGxc3NRiDLo3721Ev--xtsH0U9p3JEGijZNIs/edit?slide=id.p#slide=id.p",
      images: [
        "/projects/placeholders/Clownz.mov",
        "https://drive.google.com/file/d/1GdstHAo_J6shml5zO7uMGuMrhWa8OGyF/view?usp=sharing",
      ],
      featured: true,
    },
    {
      name: "ASL Glasses [Hackathon]",
      description:
        "Designed AR glasses translating sign language to text using transformers and OCR, demoed prototype.",
      link: "https://firebasestorage.googleapis.com/v0/b/tks-life-prod.appspot.com/o/items%2FZnFxCGk9nXYoiuJ37ArrGUjiBDB2%2FExplore%20Hackathon%20-%20ASL.pdf?alt=media&token=7d19ef3d-7d77-4059-8bd0-526fef256322",
      date: "11.2022",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20aslo.mp4",
      cardMediaLink:
        "https://firebasestorage.googleapis.com/v0/b/tks-life-prod.appspot.com/o/items%2FZnFxCGk9nXYoiuJ37ArrGUjiBDB2%2FExplore%20Hackathon%20-%20ASL.pdf?alt=media&token=7d19ef3d-7d77-4059-8bd0-526fef256322",
      video: "https://www.youtube.com/watch?v=1n0SDjeV7Ao",
      writeup: "",
    },

    {
      name: "Actions on Google - Bible Companion",
      description:
        "Received 10k in cloud credits to work on Actions on Google + free merch. Created Bible Companion, a Bible study application that allows users to ask questions about scripture and receive daily verses on Google Assistant. Built using Google's Actions SDK, Dialogflow, and TensorFlow.",
      link: "#", // Add link later
      date: "11.2019",
      video: "",
      repo: "",
      writeup: "",
      previewImageObjectPosition: "top",
      images: [
        "/projects/actions on google.png",
        "/projects/actions on google 2.png",
      ],
    },
    {
      name: "Bioblox - AI Profile Pictures ",
      description:
        "Developed a 2-click AI system for professional-quality profile images using Stable Diffusion, serving 50+ users and fine-tuned on 10-12 samples. Transform your profiles with AI generated images for a standout professional presence",
      link: "https://web.archive.org/web/20230722063459/https://bioblox.xyz/",
      date: "05.2023",
      repo: "https://github.com/alexshibu1/photoBloxAI",
      previewVideoLocal: "/projects/placeholders/project%20bioblox.mp4",
      cardMediaLink:
        "https://web.archive.org/web/20230722063459/https://bioblox.xyz/",
      video: "https://www.youtube.com/watch?v=BjR4rSWL9y4",
      writeup: "",
    },
    {
      name: "Cuddle - AI Sleep Music [hackathon]",
      description:
        "Built an AI-powered sleep-music generator using K-means clustering for personalized audio. The app uses artificial intelligence and K-means clustering to create personalized music for insomniacs, based on their sleep routines and music preferences. Hackathon finalist.",
      link: "https://www.figma.com/design/WJ7zap2lEOHglmLiuYWH2K/Cyberpunk-Music-App--Community-?node-id=0-1&t=dGlw3IO6XB8Jvufx-1",
      date: "04.2024",
      repo: "",
      previewVideoLocal: "/projects/placeholders/cuddle.mp4",
      cardMediaLink:
        "https://www.figma.com/design/WJ7zap2lEOHglmLiuYWH2K/Cyberpunk-Music-App--Community-?node-id=0-1&t=dGlw3IO6XB8Jvufx-1",
      video: "",
      writeup:
        "https://docs.google.com/presentation/d/1-uXNfIXqmT1l2TJIfoq779bCx94CTdyN9aVPQfNiW5E/edit?usp=sharing",
    },
    {
      name: "CIBC Rewards - UX Design [TKS]",
      description:
        "Designed a consulting prototype for CIBC Rewards using Figma, modeling user engagement and projecting lift. Solved the problem of Gen Z customers switching banks, with only 50% remaining loyal to their parents bank. Worked to increase Gen Z adoption of CIBC projecting up to 77% increase in Gen Z adoption through prototype user testing and survey analysis. Projected to save CIBC $4.5M annually.",
      link: "https://www.figma.com/file/X8pq2OGANVnQhQkyE5bTzR/CIBC-Rewards-Design",
      date: "03.2023",
      repo: "",
      previewVideoLocal: "/projects/placeholders/projectCIBC.mp4",
      cardMediaLink:
        "https://www.figma.com/file/X8pq2OGANVnQhQkyE5bTzR/CIBC-Rewards-Design",
      video: "",
      writeup: "",
    },
    {
      name: "AI-Powered Personalized Feedback",
      description:
        "The AI-Powered Personalized Feedback Tool is a transformative technology that offers feedback from the greatest minds in your field. Simply paste your content on the website and receive personalized feedback. The tool aims to break down barriers in education, inspired by the video of Bill Gates and Kevin Scott explaining the challenges many students face in the current system.",
      link: "https://x.com/AlexShibu2/status/1642946139723841548",
      date: "08.2023",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20feedback.mp4",
      cardMediaLink: "https://x.com/AlexShibu2/status/1642946139723841548",
      video: "https://www.youtube.com/watch?v=FVZCkDxriFI",
      writeup: "",
    },
    {
      name: "Family Guy - Quest for Survival",
      description:
        "Family Guy - Quest for Survival is an interactive text-based adventure game set in the Griffin family's house. I built this Python project using a room-based navigation system with directional commands. Challenges that test players' Family Guy knowledge, with a scoring system that tracks points across multiple puzzle types.",
      link: "https://github.com/alexshibu1/family-guy",
      date: "10.2021",
      repo: "https://github.com/alexshibu1/family-guy",
      video: "",
      writeup: "",
      image: "/projects/placeholders/family%20guy.jpg",
    },
    {
      name: "Web3 Message Board",
      description:
        "Wallet-gated message wall for authenticated messages and posts. Connect your wallet and say something on our open message board. Buildspace project.",
      link: "#", // Add link later
      date: "11.2021",
      repo: "https://github.com/alexshibu1/web3-message-board",
      image: "/projects/placeholders/project%20web3.png",
      hideImageLink: true,
      video: "",
      writeup: "",
    },
    {
      name: "Legacy iPhone 4 Revival",
      description:
        "Restored full usability to iOS 7 devices by engineering a downgrade/jailbreak to iOS 6, fully documented for the community. Used iOS 6, Jailbreak, and Cydia tools.",
      link: "https://x.com/AlexShibu2/status/2032561523973882195?s=20",
      date: "10.2025",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20iphone%204.mp4",
      cardMediaLink: "https://x.com/AlexShibu2/status/2032561523973882195?s=20",
      video: "https://www.youtube.com/watch?v=mIjrcIrA4IM",
      writeup: "",
    },
    {
      name: "Instagram Theme Pages ",
      description:
        "Built and grew multiple Instagram theme pages including Bath Bombs For Vanauley (595 followers), Healthy Life Tips (621 followers), and Game Lynxe (739 followers). Received around $500 in free products across channels through partnerships and sponsorships.",
      link: "https://www.instagram.com/bath.bombs.for.vanauley/",
      date: "05.2020",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/gaming.png",
      previewImageObjectPosition: "top",
      previewImageScale: 1.1,
    },
    {
      name: "Bath Bombs for Vanauley",
      description:
        "Launched a Shopify storefront for bath bomb fundraising for the Vanauley homeless shelter with Instagram while learning e-commerce and order fulfillment workflows. Built using Shopify, Marketing, and Frontend development.",
      link: "https://www.linkedin.com/in/alexshibu/details/experience/1753015047/multiple-media-viewer/?profileId=ACoAACk8q9ABrmBqQ4wz9R3Ev5JU1iATl26x-5M&treasuryMediaId=1719025718914/",
      date: "05.2020",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/bathbombs.png",
      previewImageObjectPosition: "top",
      previewImageScale: 1.2,
    },
    {
      name: "Cube Runner2",
      description:
        "Made a impossible cube runner game with radomly generated  levels designed to increase test  reaction times. First Unity game of mine.",
      link: "/projects/cube.png",
      date: "08.2019",
      repo: "",
      video: "",
      writeup: "/essay/cuberunner",
      image: "/projects/cube.png",
    },
    {
      name: "Calculator App 1.1",
      description:
        "Simple calculator app written in Kotlin for quick calculations. Features a clean design with basic operations: addition, subtraction, multiplication, and division. Simple keypad layout that's quick and easy to use, compatible with 82.1% of devices. My first published Android app.",
      link: "/projects/cal link.png",
      date: "07.2018",
      repo: "",
      video: "",
      writeup: "/essay/calculator",
      image: "/projects/cal main.png",
    },
    {
      name: "Ethiopian Coffee Strategy [TKS]",
      description:
        "Developed agri-center model projecting 5.6M jobs and a 285% profit increase for Ethiopian farmers by 2030 based on export and yield data. Worked with a 4-person team to develop strategic solutions to problems faced by 10 million Ethiopian coffee farmers, proposing 5.6M jobs based on agricultural data and stakeholder input. 10 million smallholder coffee farmers in Ethiopia face issues with access to international markets, inefficient farming practices, and inadequate lending options.",
      link: "https://www.linkedin.com/in/alexshibu/details/projects/1635528864697/single-media-viewer?type=DOCUMENT",
      date: "05.2023",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20Ethiopian.mp4",
      cardMediaLink:
        "https://www.linkedin.com/in/alexshibu/details/projects/1635528864697/single-media-viewer?type=DOCUMENT",
      video: "",
      writeup: "",
    },
    {
      name: "Fixing diabetes diagnostics with linear regression models",
      description:
        "I wrote about how machine learning is transforming diabetes diagnostics. Built and trained a model to analyze large amounts of patient data to accurately diagnose and predict the progression of diabetes. ",
      link: "https://alexshibu.medium.com/trasforming-the-world-with-machine-learnnig-3467389abb0a",
      date: "02.2023",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20diabities.mp4",
      previewVideoScale: 1.1,
      cardMediaLink:
        "https://alexshibu.medium.com/trasforming-the-world-with-machine-learnnig-3467389abb0a",
      video: "",
      writeup: "",
    },
    {
      name: "Ethereum Trend Analysis",
      description:
        "Ran deep-dive technical analysis on Ethereum price trends, built sheets & regression models, published insights and project video for public walkthrough. Full-stack Web3 project with technical analysis.",
      link: "#",
      date: "12.2021",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20eth.mp4",
      cardMediaLink: "https://youtu.be/JaFX-dkkLl0?si=5XxSh6zqk1TdqF7P",
      video: "https://youtu.be/JaFX-dkkLl0?si=5XxSh6zqk1TdqF7P",
      writeup: "",
    },
    {
      name: "Helpa - SMS AI Tool",
      description:
        "Developed a mobile Q&A system using Twilio and OpenAI providing personalized feedback for students. The AI-powered SMS system provides an effective and efficient way for students to learn and improve their skills through mobile devices.",
      link: "https://sms.teleporthq.app/",
      date: "01.2023",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20helpa.mp4",
      cardMediaLink: "https://sms.teleporthq.app/",
      video: "https://www.youtube.com/watch?v=kNTfCxXBre4",
      writeup: "https://www.youtube.com/watch?v=zuGTUhnynEg",
    },
  ];

  // Filter projects if showing only featured
  const filteredProjects = showOnlyFeatured
    ? projects.filter((p) => p.featured)
    : projects;

  // Sort projects by date (newest first). Date format: MM.YYYY
  const parseDate = (d: string) => {
    const [mm, yyyy] = d.split(".").map(Number);
    return { month: mm, year: yyyy };
  };
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const pa = parseDate(a.date);
    const pb = parseDate(b.date);
    if (pa.year !== pb.year) return pb.year - pa.year;
    return pb.month - pa.month;
  });

  // Count featured projects
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <main className="page-content">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <h1 className="hero-heading">projects</h1>
        {featuredCount > 0 && (
          <BigProjectButton
            isActive={showOnlyFeatured}
            onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
          />
        )}
      </div>
      <p className="hero-subline">
        a collection of my experience and projects i&apos;ve built and shipped.
      </p>

      <ul className="projects-list">
        {sortedProjects.map((project, i) => (
          <ProjectItem key={i} project={project} />
        ))}
      </ul>
    </main>
  );
}
