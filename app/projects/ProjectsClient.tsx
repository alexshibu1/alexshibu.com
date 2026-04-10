"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const INITIAL_PRIORITY_COUNT = 4;
const TARGET_ACTIVE_VIDEO_COUNT = 6;
const TRANSITION_ACTIVE_ALLOWANCE = 2;
const MAX_ACTIVE_VIDEO_COUNT =
  TARGET_ACTIVE_VIDEO_COUNT + TRANSITION_ACTIVE_ALLOWANCE;
const OBSERVER_THRESHOLDS = [0, 0.01, 0.08, 0.2, 0.4, 0.6, 1];
const OBSERVER_ROOT_MARGIN = "800px 0px 800px 0px";

type Project = {
  name: string;
  description: string;
  link: string;
  date: string;
  /** YouTube etc. — 🎥 icon links here */
  video?: string;
  /** Second YouTube etc. — extra 🎥 icon */
  videoSecondary?: string;
  /** Local MP4/WebM for looping card preview (optional; else `video` if it’s a /path) */
  previewVideoLocal?: string;
  /** Where the big preview (image/video) links; defaults to `link` */
  cardMediaLink?: string;
  /** Scale local preview video (1.2 ≈ 20% zoom-in; crops edges) */
  previewVideoScale?: number;
  /** CSS object-position for video preview (e.g. "bottom" to show lower crop) */
  previewVideoObjectPosition?: string;
  /** Playback speed for local preview (e.g. 2 = 2×) */
  previewPlaybackRate?: number;
  repo?: string;
  /** Second repo (e.g. umbrella / archive) — extra 💻 */
  repoSecondary?: string;
  writeup?: string;
  /** Second write-up — extra ✍️ */
  writeupSecondary?: string;
  /** Slides deck (e.g. Google Slides) — extra 📊 */
  slides?: string;
  featured?: boolean;
  isWork?: boolean;
  isCommunity?: boolean;
  image?: string;
  images?: string[];
  /** CSS object-position for image preview (e.g. "top" to show top crop) */
  previewImageObjectPosition?: string;
  /** Scale image preview (1.1 = 10% zoom; clipped to tile) */
  previewImageScale?: number;
  /** If true, use taller preview band (same as video cards) for this image */
  previewImageTall?: boolean;
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
              y: 0,
              opacity: 1,
            }
          : {
              width: 5,
              height: 5,
              borderRadius: 999,
              y: -0.25,
              opacity: 0.6,
            }
      }
      className="flex items-center justify-center"
      initial={false}
      style={{
        background: "#ff3a3a",
        display: "inline-block",
        alignSelf: "center",
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
                y: 0,
              }
            : {
                width: 5,
                height: 5,
                borderRadius: 999,
                y: -1,
              }
        }
        initial={false}
        style={{
          background: isActive ? "#ff3a3a" : isHovered ? "#ff3a3a" : "#ff3a3a",
          display: "inline-block",
          alignSelf: "center",
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
        {isActive ? "Featured" : "Featured"}
      </span>
    </motion.button>
  );
}

function WorkProjectButton({
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
        backgroundColor: isActive ? "rgba(79, 124, 255, 0.1)" : "transparent",
      }}
      whileHover={{
        backgroundColor: isActive
          ? "rgba(79, 124, 255, 0.15)"
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
                y: 0,
              }
            : {
                width: 5,
                height: 5,
                borderRadius: 999,
                y: -1,
              }
        }
        initial={false}
        style={{
          background: "#4f7cff",
          display: "inline-block",
          alignSelf: "center",
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
          color: isActive ? "#4f7cff" : "#666",
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 400,
          transition: "color 0.2s ease",
        }}
      >
        {isActive ? "Work" : "Work"}
      </span>
    </motion.button>
  );
}

function CommunityProjectButton({
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
        backgroundColor: isActive ? "rgba(34, 197, 94, 0.1)" : "transparent",
      }}
      whileHover={{
        backgroundColor: isActive
          ? "rgba(34, 197, 94, 0.15)"
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
                y: 0,
              }
            : {
                width: 5,
                height: 5,
                borderRadius: 999,
                y: -1,
              }
        }
        initial={false}
        style={{
          background: "#22c55e",
          display: "inline-block",
          alignSelf: "center",
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
          color: isActive ? "#22c55e" : "#666",
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 400,
          transition: "color 0.2s ease",
        }}
      >
        {isActive ? "Community" : "Community"}
      </span>
    </motion.button>
  );
}

function ProjectItem({
  project,
  index,
  onMount,
  shouldActivateVideo,
  shouldPrimeVideo,
  shouldLoadImmediately,
  onHoverChange,
}: {
  project: Project;
  index: number;
  onMount?: (index: number, el: HTMLLIElement | null) => void;
  shouldActivateVideo: boolean;
  shouldPrimeVideo: boolean;
  shouldLoadImmediately: boolean;
  onHoverChange?: (index: number | null) => void;
}) {
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const liRef = useRef<HTMLLIElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);
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
  const previewVideoType = localPreviewVideo?.toLowerCase().endsWith(".webm")
    ? "video/webm"
    : localPreviewVideo?.toLowerCase().endsWith(".mov")
      ? "video/quicktime"
      : "video/mp4";
  const primaryLink = isUsableLink(project.link)
    ? project.link
    : previewMedia && isUsableLink(previewMedia)
      ? previewMedia
      : "";
  const mediaLink = isUsableLink(project.cardMediaLink)
    ? project.cardMediaLink!
    : primaryLink;
  const isoDate = (() => {
    const [mm, yyyy] = project.date.split(".");
    if (!mm || !yyyy) return undefined;
    return `${yyyy}-${mm.padStart(2, "0")}`;
  })();
  /**
   * Keep previews silent + clean: muted autoplay with no controls.
   * The entire preview surface can then be a single click target.
   */
  const zoom = project.previewVideoScale ?? 1;
  const playbackRate = project.previewPlaybackRate ?? 1;
  const videoStyle: CSSProperties = {
    ...(project.previewVideoObjectPosition && {
      objectPosition: project.previewVideoObjectPosition,
    }),
    ...(zoom !== 1 && {
      transform: `scale(${zoom})`,
      transformOrigin:
        project.previewVideoObjectPosition === "bottom"
          ? "center bottom"
          : project.previewVideoObjectPosition === "top right" ||
              project.previewVideoObjectPosition === "bottom right"
            ? project.previewVideoObjectPosition
            : "center center",
    }),
  };

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || (!shouldPrimeVideo && !shouldLoadImmediately)) return;

    // Force the browser to begin fetching/decoding near-viewport previews.
    if (videoEl.networkState === HTMLMediaElement.NETWORK_EMPTY) {
      videoEl.load();
    }
  }, [shouldPrimeVideo, shouldLoadImmediately]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    // When a row instance receives a different local preview source (e.g. after
    // fast filter/category switches), force a media reset so old frames don't linger.
    videoEl.pause();
    videoEl.currentTime = 0;
    videoEl.load();
  }, [localPreviewVideo]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (pauseTimeoutRef.current !== null) {
      window.clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }

    if (playbackRate !== 1) {
      videoEl.playbackRate = playbackRate;
    }

    if (shouldActivateVideo) {
      if (videoEl.networkState === HTMLMediaElement.NETWORK_EMPTY) {
        videoEl.load();
      }
      const playPromise = videoEl.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Silent fail: autoplay can be blocked in some contexts.
        });
      }
      return;
    }
    // Small grace period prevents play/pause thrash during quick scrolling.
    pauseTimeoutRef.current = window.setTimeout(() => {
      videoEl.pause();
      pauseTimeoutRef.current = null;
    }, 180);

    return () => {
      if (pauseTimeoutRef.current !== null) {
        window.clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    };
  }, [shouldActivateVideo, playbackRate]);

  useEffect(() => {
    if (onMount) onMount(index, liRef.current);
    return () => {
      if (onMount) onMount(index, null);
    };
  }, [index, onMount]);

  const videoNode = (
    <video
      ref={videoRef}
      className="project-media project-media-video"
      autoPlay={shouldActivateVideo}
      muted
      loop
      playsInline
      preload={
        shouldLoadImmediately || shouldPrimeVideo || shouldActivateVideo
          ? "auto"
          : "none"
      }
      aria-label={`${project.name} preview`}
      onCanPlay={() => {
        const videoEl = videoRef.current;
        if (!videoEl || !shouldActivateVideo) return;
        const playPromise = videoEl.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            // Silent fail: autoplay can be blocked in some contexts.
          });
        }
      }}
      style={Object.keys(videoStyle).length ? videoStyle : undefined}
    >
      <source src={localPreviewVideo!} type={previewVideoType} />
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
    <li
      ref={liRef}
      data-project-index={index}
      className={`project-card${project.featured ? " project-card--featured" : ""}${project.isWork ? " project-card--work" : ""}${project.isCommunity ? " project-card--community" : ""}`}
      onMouseEnter={() => onHoverChange?.(index)}
      onMouseLeave={() => onHoverChange?.(null)}
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      {localPreviewVideo ? (
        mediaLink ? (
          <a
            href={mediaLink}
            className="project-media-link project-media-shell project-media-shell--video"
            target="_blank"
            rel="noopener noreferrer"
            itemProp="url"
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
              priority={shouldLoadImmediately}
              loading={shouldLoadImmediately ? "eager" : "lazy"}
              fetchPriority={shouldLoadImmediately ? "high" : "auto"}
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
          const tallClass = project.previewImageTall
            ? " project-media--tall"
            : "";
          return primaryLink ? (
            <a
              href={primaryLink}
              className={`project-media-link${tallClass}`}
              target="_blank"
              rel="noopener noreferrer"
              itemProp="url"
            >
              {wrapped}
            </a>
          ) : (
            <div className={`project-media-shell${tallClass}`}>{wrapped}</div>
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
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                lineHeight: 1,
              }}
            >
              <FeaturedIndicator isHovered={isTitleHovered} />
            </span>
          )}
          {primaryLink ? (
            <a
              href={primaryLink}
              className="project-title"
              target="_blank"
              rel="noopener noreferrer"
              itemProp="url"
            >
              <span itemProp="name">{project.name}</span>
              <span className="project-arrow">↗</span>
            </a>
          ) : (
            <span
              className="project-title"
              style={{ cursor: "default" }}
              itemProp="name"
            >
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
              {project.writeupSecondary && project.writeupSecondary !== "" && (
                <a
                  href={project.writeupSecondary}
                  className="project-link-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Write-up"
                >
                  ✍️
                </a>
              )}
              {project.slides && project.slides !== "" && (
                <a
                  href={project.slides}
                  className="project-link-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Slides deck"
                >
                  📊
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
              {project.videoSecondary &&
                project.videoSecondary !== "" &&
                /^https?:\/\//i.test(project.videoSecondary) && (
                  <a
                    href={project.videoSecondary}
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
            <time
              className="project-date"
              dateTime={isoDate}
              itemProp="dateCreated"
            >
              {project.date}
            </time>
          </div>
        </div>
        <span className="project-desc" itemProp="description">
          {project.description}
        </span>
      </div>
    </li>
  );
}

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState<
    "featured" | "work" | "community" | null
  >(null);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(
    null,
  );
  const [secondaryHoveredProjectIndex, setSecondaryHoveredProjectIndex] =
    useState<number | null>(null);
  const hoverGraceTimeoutRef = useRef<number | null>(null);
  const secondaryHoverGraceTimeoutRef = useRef<number | null>(null);
  const hoveredProjectIndexRef = useRef<number | null>(null);
  const secondaryHoveredProjectIndexRef = useRef<number | null>(null);
  const [intersectionMap, setIntersectionMap] = useState<
    Record<
      number,
      { ratio: number; top: number; bottom: number; isIntersecting: boolean }
    >
  >({});
  const cardRefs = useRef<Record<number, HTMLLIElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const projects = [
    {
      name: "Y4E Film – YMCA x Desjardins",
      description:
        "Won first place nationally in the Y4E competition with a film on why young people should build. Led to an invite from Desjardins for Dream the Impossible in Montreal. I later emceed the event the next year.",
      link: "https://www.ymcagta.org/blog/congratulations-to-the-winners-of-the-youth-for-entrepreneurship-media-contest-powered-by-desjardins", // Add link later
      date: "02.2025",
      video: "https://www.youtube.com/watch?v=mHKDR622pCM", // Add video link later
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20gala.mp4",
      previewPlaybackRate: 0.9,
      cardMediaLink:
        "https://www.ymcagta.org/blog/congratulations-to-the-winners-of-the-youth-for-entrepreneurship-media-contest-2025",
      writeup:
        "https://www.ymcagta.org/blog/congratulations-to-the-winners-of-the-youth-for-entrepreneurship-media-contest-2025",
      images: [
        "https://www.linkedin.com/posts/alexshibu_dreamtheimpossible-reverlimpossible-activity-7077475467871600640-FrKP/",
      ],
      isCommunity: true,
    },
    {
      name: "Youth Advisory @ YMCA",
      description:
        "On the Youth Advisory Committee providing strategic advice to YMCA of Greater Toronto's Board of Directors, championing youth voices and emerging tech in community programming.",
      link: "https://www.ymcagta.org/about-us/youth-advisory-committee",
      date: "03.2025",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/placeholders/project%20YAC.png",
      previewImageObjectPosition: "bottom",
      previewImageScale: 1.2,
      previewImageTall: true,
      cardMediaLink:
        "https://www.ymcagta.org/about-us/youth-advisory-committee",
      images: [
        "https://www.linkedin.com/posts/alexshibu_youthleadership-activity-7338411863904309249-frCZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAACk8q9ABrmBqQ4wz9R3Ev5JU1iATl26x-5M",
      ],
      isCommunity: true,
    },
    {
      name: "Apathy Is Boring Roundtable",
      description:
        "Hosted a national Zoom roundtable for 20+ Canadian students on youth-led innovation. We mapped local barriers (resources, policy roadblocks, mentorship gaps) and turned them into practical action paths aligned with building solutions people actually want. Inspired by @buildcanada.",
      link: "https://www.apathyisboring.com/rtt_rsvp_youth_innnovation",
      date: "03.2025",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/apathy-workshop.png?v=20260326",
      previewImageObjectPosition: "top",
      previewImageScale: 1.2,
      previewImageTall: true,
      cardMediaLink:
        "https://www.apathyisboring.com/rtt_rsvp_youth_innnovation",
      isCommunity: true,
    },
    {
      name: "Breakthrough Junior Challenge",
      description:
        "Top 14% global finalist. Produced two science explainer videos: quantum computing fundamentals (superposition, entanglement, Bell's Theorem) and Mars rover RTG power systems.",
      link: "https://youtu.be/xuL75NnIcks?si=oU-N7jkcPdNaFPm7",
      date: "06.2021",
      video: "https://www.youtube.com/watch?v=vQcW4T5JnPU",
      videoSecondary: "https://youtu.be/xuL75NnIcks?si=oU-N7jkcPdNaFPm7",
      repo: "",
      writeup: "",
      previewVideoLocal: "/projects/placeholders/project%20quantum.mp4",
      previewVideoScale: 1.1,
      cardMediaLink: "https://www.youtube.com/watch?v=vQcW4T5JnPU",
    },
    {
      name: "STEM Fellowship Data Team",
      description:
        "Ran monthly analytics for STEM Fellowship using Google Ads, Analytics, and Plerdy. We analyzed everything including website, cross-platform social, Ads campaigns, and calculated every possible metric to derive conversion insights",
      link: "#",
      date: "02.2022",
      repo: "",
      image: "/projects/placeholders/project%20stem.png",
      previewImageScale: 1.1,
      previewImageTall: true,
      video: "",
      writeup: "",
      isCommunity: true,
    },
    {
      name: "Young Canadians Parliament",
      description:
        "Developed a youth mental health policy brief for the Canadian government with Children First Canada. Ending with proposing a funded mental health app, app regulation standards, and provider certification.",
      link: "https://childrenfirstcanada.org/wp-content/uploads/2025/08/Raising-Canada-Report-2025-UPDATED.pdf",
      date: "04.2023",
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
      isCommunity: true,
    },
    {
      name: "Recover the Relic Campaign",
      description:
        "Led end-to-end production and campaign strategy for a church passion project after months off from film. Drove 80K+ cumulative views across platforms. Passion project after months of not not working on films.",
      link: "https://www.instagram.com/reel/DUB6-6hjtkp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      date: "01.2026",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20relic.mp4",
      previewVideoScale: 1.1,
      previewVideoObjectPosition: "top right",
      cardMediaLink:
        "https://www.instagram.com/reel/DUB6-6hjtkp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      video:
        "https://www.instagram.com/reel/DUB6-6hjtkp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      writeup: "",
      isCommunity: true,
    },
    {
      name: "Wager – Polymarket for Focus",
      description:
        "A command terminal for deep work. Open a position on a task, add liquidity, and execute. To-dos with real stakes, a portfolio dashboard, and a marketplace to see friends' bets.",
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
      name: "EasyHacks x Perplexity",
      description:
        "Campus Strategist w/Perplexity AI. Ran EasyHacks, a hackathon that grew from UBC Hacks rejection thread into a 20-person operation with 170+ participants, $6K in prizes, and 300+ students onboarded.",
      link: "https://archive.ph/2mqxj",
      date: "03.2025",
      repo: "",
      previewVideoLocal: "/projects/placeholders/easyhacks.mp4",
      previewVideoScale: 1.4,
      cardMediaLink: "https://archive.ph/2mqxj",
      video: "https://www.youtube.com/watch?v=BUFH1s5iUtw&t=55s",
      writeup: "https://www.sprint.dev/hackathons/easyhacks",
      featured: true,
      isCommunity: true,
    },
    {
      name: "LUMA – AI Meditations [Hack]",
      description:
        "Built a generative AI meditation app at a hackathon that creates personalized audio experiences based on user state. Stack: React, Flask, Cohere, Google Cloud TTS, pydub.",
      link: "https://devpost.com/software/luma-luminous-understanding-through-mindful-ai",
      date: "05.2025",
      repo: "https://github.com/e-ndorfin/luma",
      previewVideoLocal: "/projects/placeholders/project%20luma.mp4",
      previewVideoScale: 1.2,
      previewVideoObjectPosition: "bottom",
      previewPlaybackRate: 3.6,
      cardMediaLink:
        "https://devpost.com/software/luma-luminous-understanding-through-mindful-ai",
      video: "https://www.youtube.com/watch?v=neO-K2qJo6Y&t=20s",
      writeup: "",
    },
    {
      name: "PhiDrillSim – Drilling Physics",
      description:
        "Mentored by founder Dr. Etjaie at PhiDrillSim. Creating simulation tools for oilfield drilling including vibration, torque/drag, and well control analysis in MATLAB. Built a VR/XR adoption map across energy and manufacturing for pilot proposals and partner identification.",
      link: "https://www.linkedin.com/company/phidrillsim/",
      date: "06.2025",
      repo: "",
      previewVideoLocal: "/projects/placeholders/phidrillsim.mp4",
      previewVideoScale: 1.05,
      video: "",
      writeup:
        "https://alexshibu.notion.site/VR-Applications-in-the-Canadian-Energy-Sector-231305d8d24480198f6cc3a98d059b29?pvs=74",
      writeupSecondary:
        "https://alexshibu.notion.site/Virtual-Reality-Adoption-Across-Mining-Oil-Gas-Energy-and-Manufacturing-257305d8d2448038ae50eacc3c01986c?pvs=74",
      slides:
        "https://docs.google.com/presentation/d/1ueNBfU5aKFael_EIqafkclWBiBFRkylgIdgG3wOgkq4/edit?usp=sharing",
      isWork: true,
    },
    {
      name: "Research @ Technion",
      description:
        "Worked with Prof. Yakov Ben-Haim on info-gap decision theory. Foucused on economic and financial decision-making using robustness and opportuneness to make decisions under deep uncertainty with the lack of probabilistic data. Built uncertainty models and applied them to VC startup evaluation, projecting 15% lift for high-risk investments.",
      link: "https://www.facebook.com/share/p/1Dmh3huqbC/",
      date: "06.2024",
      repo: "",
      image: "/projects/placeholders/Israel.png",
      previewImageObjectPosition: "top",
      previewImageTall: true,
      previewImageScale: 1.05,
      video: "",
      writeup:
        "https://www.linkedin.com/posts/faculty-of-mechanical-engineering-technion_ackacwacjacxadgacuacraclacwacladgachacoacracwacpaclacv-activity-7225789866289045504-W_SO?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACk8q9ABrmBqQ4wz9R3Ev5JU1iATl26x-5M",
      isWork: true,
    },
    {
      name: "BenchBot - Slack Bot for BenchSci",
      description:
        "Built a Slack bot prototype to automate HR and onboarding at BenchSci. Modeled $4.5M in annual savings as headcount doubled from 200 to 400+ and repetitive queries surged. Productivity loss due to repetitive queries is estimated to be up to 104,000 hours annually at BenchSci.",
      link: "https://docs.google.com/presentation/d/1cwFMnute4f_i65IaNJsnTHUXk0QaryH_FKPFqDETxKM/edit?usp=sharing",
      date: "06.2023",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20benchsci.mp4",
      cardMediaLink:
        "https://docs.google.com/presentation/d/1cwFMnute4f_i65IaNJsnTHUXk0QaryH_FKPFqDETxKM/edit?usp=sharing",
      video: "https://www.youtube.com/watch?v=Mqb1hEqly_Y",
      writeup: "",
      isWork: true,
    },
    {
      name: "BridgeWorks – YouthfulCities",
      description:
        "Worked with YouthfulCities to build a project to increase youth employment opportunities in underserved communities called BridgeWorks Fellowship. Developed and received initial cohort signups.",
      link: "/projects/bridgeworks.pdf",
      date: "05.2024",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20bridgeworks.mp4",
      cardMediaLink: "/projects/bridgeworks.pdf",
      video: "https://www.youtube.com/watch?v=Jz48kAlGy3o&t=25s",
      writeup:
        "https://www.notion.so/alexshibu/BridgeWorks-Fellowship-5e86599a42f048d391033e171a9497f9?source=copy_link",
      isCommunity: true,
    },
    {
      name: "Avalonn – Voice Agents",
      description:
        "Voice agent for SMBs that answers inquiries, books jobs, estimates quotes, and escalates emergencies. Targets the ~$78 lost per missed call. Got $25K AWS credits, joined DMZ Basecamp, UofT Center for Entrepreneurship. Found early stage traction through customer interviews, live demos and onboarding local service businesses in plumbing and HVAC integrating into their existing workflows. ",
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
      name: "CoachMi.co - AI Coach",
      description:
        "AI coaching platform with 50+ decision-making frameworks and custom virtual boardrooms. Built with a Canadian Gap Year Association fellowship and traveled to Bangalore for PMF validation.",
      link: "https://web.archive.org/web/20240924161229/http://www.coachmi.co/",
      date: "09.2024",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20coachmi.mp4",
      previewPlaybackRate: 1.5,
      cardMediaLink:
        "https://web.archive.org/web/20240924161229/http://www.coachmi.co/",
      video: "https://www.youtube.com/watch?v=xWqw_l3Nh2M",
      writeup:
        "https://docs.google.com/presentation/d/1kiCEzGCJV-VriZXeSeexSCXZerS3k28HrKrysDQ4vbE/edit?slide=id.g26767847792_2_120#slide=id.g26767847792_2_120",
    },
    {
      name: "Potato Chips Animation",
      description:
        "Built and produced a short animated film end-to-end. Concept, storyboard, art, and final render done solo. Using Adobe After Effects and Character Animator.",
      link: "https://www.youtube.com/watch?v=POYhP8TYyBM",
      date: "06.2021",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20animation.mp4",
      previewPlaybackRate: 1.5,
      cardMediaLink: "https://www.youtube.com/watch?v=POYhP8TYyBM",
      video: "https://www.youtube.com/watch?v=POYhP8TYyBM",
      writeup:
        "https://docs.google.com/presentation/d/1xEkuHC_e85UgQhgjzB8BNU3o2OEnrZvOwOvjBP2nhiA/edit?usp=sharing",
    },
    {
      name: "Circus Clownz NFT",
      description:
        "Built the brand, hired two people, created the art, and launched a Discord community. Didn't ship due to long term utility and the 2022 market crash.",
      link: "/essay/circusclownz",
      date: "04.2021",
      repo: "https://github.com/alexshibu1/CircusClownz",
      repoSecondary: "https://github.com/alexshibu1/dAPPS",
      previewVideoLocal: "/projects/placeholders/Clownz.mp4",
      cardMediaLink: "/essay/circusclownz",
      video: "https://youtu.be/_ycxR8aP980?si=oeGxGrFIYkKJ_gkC",
      writeup:
        "https://docs.google.com/presentation/d/1EGrDyCZGxc3NRiDLo3721Ev--xtsH0U9p3JEGijZNIs/edit?slide=id.p#slide=id.p",
      images: [
        "https://drive.google.com/file/d/1GdstHAo_J6shml5zO7uMGuMrhWa8OGyF/view?usp=sharing",
      ],
      featured: true,
    },
    {
      name: "ASL Glasses [Hack]",
      description:
        "Designed AR glasses that translate sign language to text in real time using transformers and OCR. Demoed a working prototype at a hackathon.",
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
      name: "Bible Companion – Google",
      description:
        "Built a Bible study app on Google Assistant where users ask questions about scripture and get daily verses. Won $10K in cloud credits. Stack: Actions SDK, Dialogflow, TensorFlow.",
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
      name: "Bioblox - AI Profile Pics",
      description:
        "2-click system for professional AI-generated profile pictures using Stable Diffusion, fine-tuned on 10-12 personal samples. Served 50+ users.",
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
      name: "Cuddle – AI Sleep Music [Hack]",
      description:
        "Built an AI sleep-music generator using K-means clustering to personalize audio based on sleep routines and music preferences. Hackathon finalist.",
      link: "https://www.figma.com/design/WJ7zap2lEOHglmLiuYWH2K/Cyberpunk-Music-App--Community-?node-id=0-1&t=dGlw3IO6XB8Jvufx-1",
      date: "04.2023",
      repo: "",
      previewVideoLocal: "/projects/placeholders/cuddle.mp4",
      previewVideoScale: 1.1,
      cardMediaLink:
        "https://www.figma.com/design/WJ7zap2lEOHglmLiuYWH2K/Cyberpunk-Music-App--Community-?node-id=0-1&t=dGlw3IO6XB8Jvufx-1",
      video: "",
      writeup:
        "https://docs.google.com/presentation/d/1-uXNfIXqmT1l2TJIfoq779bCx94CTdyN9aVPQfNiW5E/edit?usp=sharing",
    },
    {
      name: "CIBC Rewards [TKS]",
      description:
        "Designed a consulting prototype for CIBC Rewards in Figma targeting Gen Z user retention. Modeled a 77% increase in adoption and $4.5M annual savings through user testing and survey analysis.",
      link: "https://www.figma.com/file/X8pq2OGANVnQhQkyE5bTzR/CIBC-Rewards-Design",
      date: "12.2022",
      repo: "",
      previewVideoLocal: "/projects/placeholders/projectCIBC.mp4",
      cardMediaLink:
        "https://www.figma.com/file/X8pq2OGANVnQhQkyE5bTzR/CIBC-Rewards-Design",
      video: "",
      writeup: "",
      isWork: true,
    },
    {
      name: "AI Essay Feedback",
      description:
        "Built a tool that delivers personalized essay feedback framed by top minds in your field. Paste content and get instant expert-style critique.",
      link: "https://x.com/AlexShibu2/status/1642946139723841548",
      date: "08.2023",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20feedback.mp4",
      cardMediaLink: "https://x.com/AlexShibu2/status/1642946139723841548",
      video: "https://www.youtube.com/watch?v=FVZCkDxriFI",
      writeup: "",
      slides:
        "https://docs.google.com/presentation/d/1Zxh80gdlRTKp2EOR8gcBFxL5u5b73cF2jKdU1IbcCtQ/edit?usp=sharing",
    },
    {
      name: "Family Guy Text Adventure",
      description:
        "Python text adventure set in the Griffin house with room navigation, directional commands, trivia challenges, and a multi-type scoring system. First game I shipped.",
      link: "https://github.com/alexshibu1/family-guy",
      date: "10.2021",
      repo: "https://github.com/alexshibu1/family-guy",
      video: "",
      writeup: "",
      image: "/projects/placeholders/family%20guy.jpg",
      previewImageScale: 1.1,
      previewImageTall: true,
    },
    {
      name: "Web3 Message Board",
      description:
        "Wallet-gated message wall where users connect their wallet to post publicly on an open board. Buildspace project using nextjs and solidity.",
      link: "#", // Add link later
      date: "11.2021",
      repo: "https://github.com/alexshibu1/web3-message-board",
      image: "/projects/placeholders/project%20Web3.png",
      hideImageLink: true,
      previewImageScale: 1.1,
      previewImageTall: true,
      video: "",
      writeup: "",
    },
    {
      name: "Legacy iPhone 4 Revival",
      description:
        "Engineered a downgrade from iOS 7 to iOS 6 with a jailbreak to restore full usability to abandoned devices. Fully documented for the community. Used iOS 6, Jailbreak, and Cydia tools.",
      link: "https://x.com/AlexShibu2/status/2032561523973882195?s=20",
      date: "11.2025",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20iphone%204.mp4",
      cardMediaLink: "https://x.com/AlexShibu2/status/2032561523973882195?s=20",
      video: "https://www.youtube.com/watch?v=mIjrcIrA4IM",
      writeup: "",
    },
    {
      name: "Instagram Theme Pages",
      description:
        "Built and grew three Instagram theme pages to 600-740 followers each. Earned ~$500 in free products through brand partnerships and sponsorships.",
      link: "https://www.instagram.com/gaminglynxe/",
      date: "05.2020",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/gaming.png?v=20260324",
      previewImageObjectPosition: "top",
      previewImageScale: 1.1,
      previewImageTall: true,
    },
    {
      name: "Bath Bombs for Vanauley",
      description:
        "Launched a Shopify fundraising storefront for bath bombs benefiting the Vanauley homeless shelter. Learned e-commerce, order fulfillment, and Instagram marketing end-to-end. This was as a YMCA Intern.",
      link: "https://www.linkedin.com/in/alexshibu/details/experience/1753015047/multiple-media-viewer/?profileId=ACoAACk8q9ABrmBqQ4wz9R3Ev5JU1iATl26x-5M&treasuryMediaId=1719025718914/",
      date: "05.2020",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/bathbombs.png",
      previewImageObjectPosition: "top",
      previewImageScale: 1.2,
      previewImageTall: true,
      isWork: true,
    },
    {
      name: "A-EYE Glasses",
      description:
        "ABuilt an affordable AI wearable for the visually impaired under $100 using a Raspberry Pi. Features OCR, voice assistant, and object recognition targeting 2.2B people affected by vision loss.",
      link: "https://docs.google.com/presentation/d/1G8_XCaV8Ci9-GXH43l-Am_w0zsiiAKNf1AF1uaB9FtE/edit?usp=sharing",
      date: "02.2020",
      repo: "",
      video: "",
      writeup: "",
      image: "/projects/a-eye%20glasses.jpg",
      images: ["/projects/a-eye%20glasses%202.jpg"],
      previewImageObjectPosition: "top",
      previewImageScale: 1.1,
      previewImageTall: true,
    },
    {
      name: "Cube Runner2",
      description:
        "First Unity game. An impossible cube runner with randomly generated levels designed to test reaction time.",
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
        "First published Android app, written in Kotlin. Clean calculator with basic operations, compatible with 82% of devices.",
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
        "Developed an agri-center model projecting 5.6M jobs and 285% profit growth for Ethiopian farmers by 2030. Addressed market access, farming efficiency, and lending gaps for 10M smallholders. Validated initiative with over 20 stakeholders in the coffee industry in Ethiopia.",
      link: "https://www.linkedin.com/in/alexshibu/details/projects/1635528864697/single-media-viewer?type=DOCUMENT",
      date: "05.2023",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20Ethiopian.mp4",
      previewVideoScale: 1.1,
      cardMediaLink:
        "https://www.linkedin.com/in/alexshibu/details/projects/1635528864697/single-media-viewer?type=DOCUMENT",
      video: "",
      writeup: "",
      isWork: true,
      featured: true,
    },
    {
      name: "Diabetes Diagnostics w/ AI",
      description:
        "Built and trained an ML model to diagnose and predict diabetes progression from patient data. Published a writeup on how machine learning is reshaping medical diagnostics.",
      link: "https://alexshibu.medium.com/trasforming-the-world-with-machine-learnnig-3467389abb0a",
      date: "02.2023",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20diabities.mp4",
      previewVideoScale: 1.1,
      previewPlaybackRate: 0.9,
      cardMediaLink:
        "https://alexshibu.medium.com/trasforming-the-world-with-machine-learnnig-3467389abb0a",
      video: "",
      writeup: "",
    },
    {
      name: "Ethereum Trend Analysis",
      description:
        "Deep-dive technical analysis on Ethereum price trends. Built regression models, published insights, and recorded a full public walkthrough video.",
      link: "#",
      date: "12.2021",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20eth.mp4",
      cardMediaLink: "https://youtu.be/JaFX-dkkLl0?si=5XxSh6zqk1TdqF7P",
      video: "https://youtu.be/JaFX-dkkLl0?si=5XxSh6zqk1TdqF7P",
      writeup: "",
    },
    {
      name: "Helpa – SMS AI Tool",
      description:
        "Built an SMS-based Q&A system using Twilio and OpenAI that delivers personalized academic feedback to students directly via mobile. It's for students in developing countries to use llms with limited internet access.",
      link: "https://sms.teleporthq.app/",
      date: "01.2023",
      repo: "",
      previewVideoLocal: "/projects/placeholders/project%20helpa.mp4",
      cardMediaLink: "https://sms.teleporthq.app/",
      video: "https://www.youtube.com/watch?v=kNTfCxXBre4",
      writeup: "https://www.youtube.com/watch?v=zuGTUhnynEg",
    },
  ];

  // Single-select filters: Featured OR Work (or none).
  const filteredProjects =
    activeFilter === "featured"
      ? projects.filter((p) => p.featured)
      : activeFilter === "work"
        ? projects.filter((p) => p.isWork)
        : activeFilter === "community"
          ? projects.filter((p) => p.isCommunity)
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
  const workCount = projects.filter((p) => p.isWork).length;
  const communityCount = projects.filter((p) => p.isCommunity).length;

  const hasLocalPreviewVideo = (project: Project) =>
    Boolean(
      (project.previewVideoLocal &&
        project.previewVideoLocal.startsWith("/") &&
        /\.(mp4|webm|mov)$/i.test(project.previewVideoLocal)) ||
      (project.video &&
        project.video.startsWith("/") &&
        /\.(mp4|webm|mov)$/i.test(project.video)),
    );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIntersectionMap((prev) => {
          const next = { ...prev };
          for (const entry of entries) {
            const target = entry.target as HTMLElement;
            const index = Number(target.dataset.projectIndex);
            if (!Number.isFinite(index)) continue;
            next[index] = {
              ratio: entry.isIntersecting ? entry.intersectionRatio : 0,
              top: entry.boundingClientRect.top,
              bottom: entry.boundingClientRect.bottom,
              isIntersecting: entry.isIntersecting,
            };
          }
          return next;
        });
      },
      {
        threshold: OBSERVER_THRESHOLDS,
        // Observe a bit ahead of viewport so upcoming videos can be primed.
        rootMargin: OBSERVER_ROOT_MARGIN,
      },
    );
    observerRef.current = observer;

    Object.values(cardRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [sortedProjects.length, activeFilter]);

  const activeVideoIndexes = useMemo(() => {
    if (Object.keys(intersectionMap).length === 0) {
      const firstVisibleBudget = sortedProjects
        .map((project, index) => ({ project, index }))
        .filter(({ project }) => hasLocalPreviewVideo(project))
        .slice(0, TARGET_ACTIVE_VIDEO_COUNT)
        .map(({ index }) => index);
      return new Set(firstVisibleBudget);
    }

    const viewportHeight =
      typeof window !== "undefined"
        ? window.innerHeight
        : Number.POSITIVE_INFINITY;

    const candidates = Object.entries(intersectionMap)
      .map(([indexStr, entry]) => ({
        index: Number(indexStr),
        ...entry,
        inViewport: entry.top < viewportHeight && entry.bottom > 0,
        distanceToViewport:
          entry.top >= 0
            ? entry.top
            : entry.bottom <= 0
              ? Math.abs(entry.bottom)
              : 0,
      }))
      .filter(
        ({ index, isIntersecting }) =>
          isIntersecting &&
          Boolean(sortedProjects[index]) &&
          hasLocalPreviewVideo(sortedProjects[index]),
      )
      .sort((a, b) => {
        if (a.inViewport !== b.inViewport) return a.inViewport ? -1 : 1;
        if (a.ratio !== b.ratio) return b.ratio - a.ratio;
        if (a.distanceToViewport !== b.distanceToViewport) {
          return a.distanceToViewport - b.distanceToViewport;
        }
        return a.top - b.top;
      });

    const inViewport = candidates
      .filter((c) => c.inViewport)
      .map(({ index }) => index);
    const nearViewport = candidates
      .filter((c) => !c.inViewport)
      .map(({ index }) => index);

    const base = inViewport.slice(0, TARGET_ACTIVE_VIDEO_COUNT);
    if (base.length < TARGET_ACTIVE_VIDEO_COUNT) {
      base.push(
        ...nearViewport.slice(0, TARGET_ACTIVE_VIDEO_COUNT - base.length),
      );
    }

    const transition = nearViewport.slice(0, TRANSITION_ACTIVE_ALLOWANCE);
    let activeWithTransition = Array.from(
      new Set([...base, ...transition]),
    ).slice(0, MAX_ACTIVE_VIDEO_COUNT);

    // Hovered card is absolute priority for active playback.
    const hoverPriorityIndexes: number[] = [];
    if (
      hoveredProjectIndex !== null &&
      sortedProjects[hoveredProjectIndex] &&
      hasLocalPreviewVideo(sortedProjects[hoveredProjectIndex])
    ) {
      hoverPriorityIndexes.push(hoveredProjectIndex);
    }
    if (
      secondaryHoveredProjectIndex !== null &&
      sortedProjects[secondaryHoveredProjectIndex] &&
      hasLocalPreviewVideo(sortedProjects[secondaryHoveredProjectIndex]) &&
      secondaryHoveredProjectIndex !== hoveredProjectIndex
    ) {
      hoverPriorityIndexes.push(secondaryHoveredProjectIndex);
    }
    if (hoverPriorityIndexes.length > 0) {
      activeWithTransition = [
        ...hoverPriorityIndexes,
        ...activeWithTransition.filter(
          (i) => !hoverPriorityIndexes.includes(i),
        ),
      ].slice(0, MAX_ACTIVE_VIDEO_COUNT);
    }

    return new Set(activeWithTransition);
  }, [
    hoveredProjectIndex,
    secondaryHoveredProjectIndex,
    intersectionMap,
    sortedProjects,
  ]);

  const primedVideoIndexes = useMemo(() => {
    if (Object.keys(intersectionMap).length === 0) {
      const firstVisibleBudget = sortedProjects
        .map((project, index) => ({ project, index }))
        .filter(({ project }) => hasLocalPreviewVideo(project))
        .slice(0, TARGET_ACTIVE_VIDEO_COUNT)
        .map(({ index }) => index);
      return new Set(firstVisibleBudget);
    }

    const candidates = Object.entries(intersectionMap)
      .map(([indexStr, entry]) => ({ index: Number(indexStr), ...entry }))
      .filter(
        ({ index, isIntersecting }) =>
          isIntersecting &&
          Boolean(sortedProjects[index]) &&
          hasLocalPreviewVideo(sortedProjects[index]),
      )
      .map(({ index }) => index);

    // Hovered card is absolute priority for priming as well.
    const primedPriorityIndexes: number[] = [];
    if (
      hoveredProjectIndex !== null &&
      sortedProjects[hoveredProjectIndex] &&
      hasLocalPreviewVideo(sortedProjects[hoveredProjectIndex])
    ) {
      primedPriorityIndexes.push(hoveredProjectIndex);
    }
    if (
      secondaryHoveredProjectIndex !== null &&
      sortedProjects[secondaryHoveredProjectIndex] &&
      hasLocalPreviewVideo(sortedProjects[secondaryHoveredProjectIndex]) &&
      secondaryHoveredProjectIndex !== hoveredProjectIndex
    ) {
      primedPriorityIndexes.push(secondaryHoveredProjectIndex);
    }

    return new Set([...primedPriorityIndexes, ...candidates]);
  }, [
    hoveredProjectIndex,
    secondaryHoveredProjectIndex,
    intersectionMap,
    sortedProjects,
  ]);

  const setProjectRef = useCallback(
    (index: number, node: HTMLLIElement | null) => {
      const prevNode = cardRefs.current[index];
      if (prevNode && observerRef.current) {
        observerRef.current.unobserve(prevNode);
      }

      cardRefs.current[index] = node;

      if (node && observerRef.current) {
        observerRef.current.observe(node);
      }
    },
    [],
  );

  const handleHoverChange = (index: number | null) => {
    if (hoverGraceTimeoutRef.current !== null) {
      window.clearTimeout(hoverGraceTimeoutRef.current);
      hoverGraceTimeoutRef.current = null;
    }

    // Enter: promote immediately.
    if (index !== null) {
      const currentPrimary = hoveredProjectIndexRef.current;
      if (
        currentPrimary !== null &&
        currentPrimary !== index &&
        sortedProjects[currentPrimary] &&
        hasLocalPreviewVideo(sortedProjects[currentPrimary])
      ) {
        if (secondaryHoverGraceTimeoutRef.current !== null) {
          window.clearTimeout(secondaryHoverGraceTimeoutRef.current);
          secondaryHoverGraceTimeoutRef.current = null;
        }
        secondaryHoveredProjectIndexRef.current = currentPrimary;
        setSecondaryHoveredProjectIndex(currentPrimary);
        secondaryHoverGraceTimeoutRef.current = window.setTimeout(() => {
          if (secondaryHoveredProjectIndexRef.current === currentPrimary) {
            secondaryHoveredProjectIndexRef.current = null;
            setSecondaryHoveredProjectIndex(null);
          }
          secondaryHoverGraceTimeoutRef.current = null;
        }, 10000);
      }
      hoveredProjectIndexRef.current = index;
      setHoveredProjectIndex(index);
      return;
    }

    // Leave: keep hovered priority alive for 10s.
    if (hoveredProjectIndexRef.current !== null) {
      const lockedIndex = hoveredProjectIndexRef.current;
      hoverGraceTimeoutRef.current = window.setTimeout(() => {
        if (hoveredProjectIndexRef.current === lockedIndex) {
          hoveredProjectIndexRef.current = null;
          setHoveredProjectIndex(null);
        }
        hoverGraceTimeoutRef.current = null;
      }, 10000);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverGraceTimeoutRef.current !== null) {
        window.clearTimeout(hoverGraceTimeoutRef.current);
      }
      if (secondaryHoverGraceTimeoutRef.current !== null) {
        window.clearTimeout(secondaryHoverGraceTimeoutRef.current);
      }
    };
  }, []);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://alexshibu.com/projects#itemlist",
    name: "Alex Shibu Projects",
    numberOfItems: sortedProjects.length,
    itemListElement: sortedProjects.map((project, index) => {
      const url =
        project.cardMediaLink && project.cardMediaLink !== "#"
          ? project.cardMediaLink
          : project.link && project.link !== "#"
            ? project.link
            : "https://alexshibu.com/projects";
      const absoluteUrl = url.startsWith("/")
        ? `https://alexshibu.com${url}`
        : url;
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          description: project.description,
          url: absoluteUrl,
        },
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <h1 className="hero-heading">projects</h1>
        {(featuredCount > 0 || workCount > 0 || communityCount > 0) && (
          <div style={{ display: "inline-flex", gap: "0.35rem" }}>
            {featuredCount > 0 && (
              <BigProjectButton
                isActive={activeFilter === "featured"}
                onClick={() =>
                  setActiveFilter((prev) =>
                    prev === "featured" ? null : "featured",
                  )
                }
              />
            )}
            {workCount > 0 && (
              <WorkProjectButton
                isActive={activeFilter === "work"}
                onClick={() =>
                  setActiveFilter((prev) => (prev === "work" ? null : "work"))
                }
              />
            )}
            {communityCount > 0 && (
              <CommunityProjectButton
                isActive={activeFilter === "community"}
                onClick={() =>
                  setActiveFilter((prev) =>
                    prev === "community" ? null : "community",
                  )
                }
              />
            )}
          </div>
        )}
      </div>
      <p className="hero-subline">
        a collection of my experiences, work, and projects i&apos;ve built and
        shipped.
      </p>

      <ul className="projects-list">
        {sortedProjects.map((project, i) => (
          <ProjectItem
            key={`${project.name}-${project.date}`}
            index={i}
            project={project}
            onMount={setProjectRef}
            shouldActivateVideo={activeVideoIndexes.has(i)}
            shouldPrimeVideo={primedVideoIndexes.has(i)}
            shouldLoadImmediately={i < INITIAL_PRIORITY_COUNT}
            onHoverChange={handleHoverChange}
          />
        ))}
      </ul>
    </>
  );
}
