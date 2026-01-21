import Link from "next/link";
import type { Book } from "./books-data";

export function BookCard({ book }: { book: Book }) {
  return (
    <li className="py-1.5 border-b border-gray-100 last:border-b-0">
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
          <div className="text-base text-black leading-snug">
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

          {/* Desktop: keep meta aligned on the right (date + rating) */}
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 md:justify-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 tabular-nums">
              <span className="text-gray-500 text-xs uppercase tracking-wide">
                Finished
              </span>
              <span className="text-gray-900 font-semibold tabular-nums">
                {book.dateRead}
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 tabular-nums">
              <span className="text-gray-500 text-xs uppercase tracking-wide">
                Rating
              </span>
              <span className="text-gray-900 font-semibold tabular-nums">
                {book.rating}/10
              </span>
            </span>
          </div>
        </div>

        {book.description ? (
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {book.description}
          </p>
        ) : null}
      </div>
    </li>
  );
}

