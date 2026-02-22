import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import RejectionStats from "./RejectionStats";
import { sectionMetadata } from "../lib/seo";

const TARGET_CONVERSION_RATE = 35; // (applications sent - rejections) / applications sent

export const metadata: Metadata = sectionMetadata(
  "Rejected",
  "Alex Shibu's rejection log and learning loops from applying to 100+ jobs, startups, and fellowships.",
  "/rejected",
);

/** Count screenshot images in markdown (lines matching ![...](...) ). */
function countScreenshotsInMarkdown(content: string | null): number {
  if (!content) return 0;
  const matches = content.match(/!\[[^\]]*\]\([^)]+\)/g);
  return matches ? matches.length : 0;
}

/** Read rejection log from app/rejected/rejection-log.md. Strips the "Alex's Rejections" heading so it isn't shown. */
function getRejectionMarkdown(): string | null {
  const filePath = path.join(
    process.cwd(),
    "app",
    "rejected",
    "rejection-log.md",
  );
  if (!fs.existsSync(filePath)) return null;
  let content = fs.readFileSync(filePath, "utf8");
  // Remove the first line if it's the title heading (handles straight and curly apostrophe)
  content = content.replace(/^#\s*Alex['\u2019]s\s+Rejections\s*\n\n?/i, "");
  return content;
}

export default function RejectedPage() {
  const rejectionContent = getRejectionMarkdown();
  const rejectionsLogged = countScreenshotsInMarkdown(rejectionContent);
  // applications sent so conversion rate = target: (sent - rejections) / sent => sent = rejections / (1 - rate)
  const applicationsSent =
    rejectionsLogged > 0
      ? Math.round(rejectionsLogged / (1 - TARGET_CONVERSION_RATE / 100))
      : 400;
  const conversionRate = `~${TARGET_CONVERSION_RATE}%`;

  return (
    <main className="page-content">
      <h1 className="hero-heading">rejected</h1>
      <p className="hero-subline">
        Running log of my rejections. Throwing enough potatoes at the wall.
      </p>

      <p className="mb-4 sm:mb-6">
        Although it may seem like only a small portion of the attempts convert,
        the ones that do at the right time, are tremendously more meaningful in
        creating the types of outcomes I&apos;m looking for. I&apos;d like to
        think it&apos;s God work. But great things come to people in motion.
      </p>

      <RejectionStats
        rejectionsLogged={rejectionsLogged}
        applicationsSentComputed={applicationsSent}
        conversionRate={conversionRate}
      />

      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mt-6 sm:mt-10 mb-2 sm:mb-3">
        <div className="flex flex-col gap-3 sm:gap-4 sm:max-w-[240px] shrink-0">
          <p className="text-sm sm:text-base text-neutral-600 italic tracking-tight pl-3 sm:pl-4 border-l-2 border-neutral-200 leading-relaxed">
            Best experienced while listening to this playlist ❤️
          </p>
          <a
            href="https://alexshibu.notion.site/Alex-s-Rejections-1a1305d8d2448059bc5dd5e6c499d0f5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-md border border-neutral-300 bg-neutral-50 text-neutral-700 font-medium hover:bg-neutral-100 hover:border-neutral-400 active:scale-[0.98] transition-colors touch-manipulation w-fit"
          >
            View the full rejection log
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
        <div className="w-full sm:max-w-[420px] sm:ml-auto flex flex-col gap-1.5">
          <div className="overflow-hidden rounded-xl bg-neutral-100 shadow-sm ring-1 ring-neutral-200/80">
            <iframe
              title="YouTube playlist – soundtrack for reading"
              className="h-[200px] sm:h-[220px] w-full"
              src="https://www.youtube.com/embed/videoseries?list=PLc6O3DtZGf8SDGl7pU9Dq2qcbE7sBlrM2"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p
            className="text-center text-neutral-500 py-0.5"
            style={{ fontSize: "10px" }}
          >
            <a
              href="https://open.spotify.com/playlist/6IWoTmIKn5lCE3LdBSqW2D?si=3pTOy2HgQ1Ko6GKNtyXYwA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-700 underline underline-offset-1"
              style={{ fontSize: "14px" }}
            >
              Spotify
            </a>
            {" · "}
            <a
              href="https://music.youtube.com/playlist?list=PLc6O3DtZGf8SDGl7pU9Dq2qcbE7sBlrM2&si=A5pzK6oC_nfphkna"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-700 underline underline-offset-1"
              style={{ fontSize: "14px" }}
            >
              YouTube
            </a>
          </p>
        </div>
      </div>

      {/* Rejection essay + screenshots from app/essay/rejection/*.md */}
      {rejectionContent && (
        <section
          className="mt-2 pt-2 sm:mt-6 sm:pt-8 border-t border-neutral-200 rejection-markdown"
          aria-label="Rejection log screenshots"
        >
          <ReactMarkdown
            components={{
              img: ({ src, alt }) => (
                // eslint-disable-next-line @next/next/no-img-element -- markdown images: dynamic src, no known dimensions
                <img
                  src={src ?? ""}
                  alt={alt ?? ""}
                  className="w-full max-w-full h-auto rounded-lg my-3 sm:my-4 pointer-events-none select-none"
                  draggable={false}
                  loading="lazy"
                />
              ),
              p: ({ children }) => {
                const getTextContent = (node: ReactNode): string => {
                  if (node == null) return "";
                  if (typeof node === "string") return node;
                  if (typeof node === "number") return String(node);
                  if (Array.isArray(node))
                    return node.map(getTextContent).join("");
                  if (typeof node === "object" && "props" in node) {
                    const props = (node as { props: { children?: ReactNode } })
                      .props;
                    if (props?.children != null)
                      return getTextContent(props.children);
                  }
                  return "";
                };

                const text = getTextContent(children).trim();

                // Comments are standalone text lines that:
                // - Are not empty
                // - Don't start with markdown image syntax (handled by img component)
                // - Don't start with heading markers
                // - Are likely personal commentary (short standalone thoughts)
                // Exclude very long paragraphs (likely actual content, not comments)
                const isComment =
                  text &&
                  text.length > 0 &&
                  text.length < 200 && // Comments are typically short
                  !text.match(/^#+\s/) && // Not a heading
                  !text.match(/^Screenshot \d{4}-\d{2}-\d{2}/); // Not image alt text pattern

                if (isComment) {
                  return (
                    <div className="my-3 sm:my-4 px-3 sm:px-4 py-0.5 bg-neutral-100 border-l-4 border-neutral-300 rounded-r-lg text-neutral-600 italic text-sm leading-tight">
                      {children}
                    </div>
                  );
                }
                return <p className="mb-3 sm:mb-4">{children}</p>;
              },
            }}
          >
            {rejectionContent}
          </ReactMarkdown>
        </section>
      )}
    </main>
  );
}
