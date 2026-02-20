import Link from "next/link";
import type { Book } from "./books-data";
import { formatDateOfFinishing } from "./books-data";
import { RatingPillTypography } from "./BookRatingDisplay";

/** True if the book has an essay (full review/notes) — title links to /essay/{notes}. */
function hasEssay(book: Book): boolean {
  return Boolean(book.notes);
}

export function BookCard({ book }: { book: Book }) {
  const formattedDate = formatDateOfFinishing(book.dateRead);

  return (
    <li className="pt-1.5 pb-1 border-b border-gray-100 last:border-b-0">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
          <div className="flex flex-wrap items-baseline gap-2 text-base text-black leading-snug">
            <div className="inline-flex items-baseline gap-1.5">
              {hasEssay(book) ? (
                <Link
                  href={`/essay/${book.notes}`}
                  className="group !text-black hover:!text-red-600 transition-colors"
                >
                  <span className="font-bold">{book.title}</span>{" "}
                  <span className="text-gray-500 group-hover:!text-red-600 transition-colors">
                    by
                  </span>{" "}
                  <span className="font-normal">{book.author}</span>
                </Link>
              ) : (
                <span className="cursor-default select-text">
                  <span className="font-bold">{book.title}</span>{" "}
                  <span className="text-gray-500">by</span>{" "}
                  <span className="font-normal">{book.author}</span>
                </span>
              )}
              {book.isAudiobook ? (
                <span
                  className="text-xs text-gray-400 select-none"
                  title="Audiobook"
                  aria-label="Audiobook"
                >
                  🎧
                </span>
              ) : null}
            </div>
            <span className="text-sm text-gray-600 tabular-nums">
              {formattedDate}
            </span>
          </div>

          <div className="flex justify-start md:justify-end">
            <RatingPillTypography rating={book.rating} ariaLabel={`${book.rating} out of 5`} />
          </div>
        </div>

        {book.summary ? (
          <p className="text-sm md:text-base text-gray-600 leading-relaxed !mb-[14px]">
            {book.summary}
          </p>
        ) : null}
      </div>
    </li>
  );
}
