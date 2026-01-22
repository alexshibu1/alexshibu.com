import Link from "next/link";
import type { Book } from "./books-data";

// Convert 10-point rating to 5-point and generate emoji display
function getRatingDisplay(rating: number): { full: number; hasHalf: boolean } {
  const rating5 = Math.round((rating / 10) * 5 * 2) / 2; // Round to nearest 0.5
  const fullRating = Math.floor(rating5);
  const hasHalf = rating5 % 1 !== 0;
  
  return { full: fullRating, hasHalf };
}

// Format date to clean DD.MM.YYYY format
function formatDate(dateRead: string): string {
  // If it's already in DD.MM.YYYY format, return as is
  if (dateRead.includes(".")) {
    return dateRead;
  }
  
  // If it's just a year (e.g., "2024"), default to 01.01.YYYY
  if (/^\d{4}$/.test(dateRead)) {
    return `01.01.${dateRead}`;
  }
  
  // Try to parse other date formats
  const date = new Date(dateRead);
  if (!isNaN(date.getTime())) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
  
  // Fallback: return as is
  return dateRead;
}

export function BookCard({ book }: { book: Book }) {
  const { full, hasHalf } = getRatingDisplay(book.rating);
  const formattedDate = formatDate(book.dateRead);
  
  return (
    <li className="pt-1.5 pb-1 border-b border-gray-100 last:border-b-0">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
          <div className="flex flex-wrap items-baseline gap-2 text-base text-black leading-snug">
            <div>
              {book.notes ? (
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
                <>
                  <span className="font-bold">{book.title}</span>{" "}
                  <span className="text-gray-500">by</span>{" "}
                  <span className="font-normal">{book.author}</span>
                </>
              )}
            </div>
            <span className="text-sm text-gray-600 tabular-nums">
              {formattedDate}
            </span>
          </div>

          {/* Rating on the right - left-aligned with invisible placeholders */}
          <div className="text-gray-900 text-base leading-none md:justify-end">
            <span className="inline-flex">
              {"🥔".repeat(full)}
              {hasHalf && "✨"}
              <span className="opacity-0" aria-hidden="true">
                {"🥔".repeat(5 - full - (hasHalf ? 1 : 0))}
              </span>
            </span>
          </div>
        </div>

        {book.description ? (
          <p className="text-sm md:text-base text-gray-600 leading-relaxed !mb-[14px]">
            {book.description}
          </p>
        ) : null}
      </div>
    </li>
  );
}

