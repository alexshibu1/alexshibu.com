import { BookCard } from "./BookCard";
import { books, TOTAL_BOOKS, TOTAL_HOURS } from "./books-data";

/** Sort by date finished (MM.YYYY), most recent first. */
function sortByDateRead(a: { dateRead: string }, b: { dateRead: string }) {
  const [ma, ya] = a.dateRead.split(".").map(Number);
  const [mb, yb] = b.dateRead.split(".").map(Number);
  if (ya !== yb) return yb - ya;
  return mb - ma;
}

export default function ReadingPage() {
  const sortedBooks = [...books].sort(sortByDateRead);

  return (
    <main className="page-content">
      <div className="flex flex-col gap-3 mb-1 md:grid md:grid-cols-[1fr_auto] md:gap-x-6 md:items-start">
        <div className="md:col-start-1 md:row-span-2">
          <h1 className="hero-heading">books</h1>
          <p className="hero-subline">
            where I track the books I&apos;ve read and what I think
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-3 gap-2 items-stretch md:mt-10 md:flex md:flex-col md:items-end md:col-start-2 md:row-start-1 md:self-start">
          <a
            href="https://www.goodreads.com/user/show/162066297-alex-shibu"
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 md:h-auto inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm md:px-4 md:py-2.5 md:text-base text-gray-700 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <span className="hidden md:inline" aria-hidden="true">
              📚
            </span>
            <span>Goodreads</span>
          </a>

          {/* Mobile: 3 boxes in one row */}
          <div className="md:hidden h-11 rounded-lg border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
            <div className="text-[11px] text-gray-500 uppercase tracking-wide leading-none">
              Books
            </div>
            <div className="text-base text-gray-900 font-semibold tabular-nums leading-tight">
              {TOTAL_BOOKS}
            </div>
          </div>
          <div className="md:hidden h-11 rounded-lg border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
            <div className="text-[11px] text-gray-500 uppercase tracking-wide leading-none">
              Hours
            </div>
            <div className="text-base text-gray-900 font-semibold tabular-nums leading-tight">
              {TOTAL_HOURS}
            </div>
          </div>

          {/* Desktop/tablet: combined stats box under Goodreads */}
          <div className="hidden md:flex w-full md:w-auto rounded-lg border border-gray-200 bg-gray-50 divide-x divide-gray-200 overflow-hidden">
            <div className="flex-1 px-3 py-2 flex flex-col items-center justify-center text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Books
              </div>
              <div className="text-base text-gray-900 font-semibold tabular-nums leading-tight">
                {TOTAL_BOOKS}
              </div>
            </div>
            <div className="flex-1 px-3 py-2 flex flex-col items-center justify-center text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Hours
              </div>
              <div className="text-base text-gray-900 font-semibold tabular-nums leading-tight">
                {TOTAL_HOURS}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="mt-6">
        {sortedBooks.map((book) => (
          <BookCard key={`${book.title}-${book.author}`} book={book} />
        ))}
      </ul>
    </main>
  );
}
