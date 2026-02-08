import Link from "next/link";
import type { Book } from "./books-data";
import { formatDateOfFinishing, hasLongReview } from "./books-data";

/** True if the book has a dedicated page (essay notes or long review). */
function hasReviewPage(book: Book): boolean {
  return Boolean(book.notes || (book.slug && book.review && hasLongReview(book)));
}

function getRatingDisplay(rating: number): { full: number; hasHalf: boolean } {
  const rating5 = Math.round((rating / 10) * 5 * 2) / 2;
  const fullRating = Math.floor(rating5);
  const hasHalf = rating5 % 1 !== 0;
  return { full: fullRating, hasHalf };
}

export function BookCard({ book }: { book: Book }) {
  const { full, hasHalf } = getRatingDisplay(book.rating);
  const formattedDate = formatDateOfFinishing(book.dateRead);

  return (
    <li className="pt-1.5 pb-1 border-b border-gray-100 last:border-b-0">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
          <div className="flex flex-wrap items-baseline gap-2 text-base text-black leading-snug">
            <div className="inline-flex items-baseline gap-1.5">
              {hasReviewPage(book) ? (
                <Link
                  href={
                    book.notes
                      ? `/essay/${book.notes}`
                      : `/essay/book-review/${book.slug!}`
                  }
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

          {/* Rating: fixed width so potatoes align left in same place (4 or 5) */}
          <div className="text-gray-900 text-base leading-none flex justify-start md:justify-end">
            <span
              className="inline-flex justify-start min-w-[5.5rem]"
              style={{ width: "5.5rem" }}
              aria-label={`${book.rating} out of 10`}
            >
              {"🥔".repeat(full)}
              <span className="opacity-0" aria-hidden="true">
                {"🥔".repeat(5 - full - (hasHalf ? 1 : 0))}
              </span>
            </span>
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
