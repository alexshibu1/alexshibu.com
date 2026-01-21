import { BookCard } from "./BookCard";
import { books, READING_HOURS_ESTIMATE } from "./books-data";

export default function ReadingPage() {
  const totalBooks = books.length;
  const totalHours = READING_HOURS_ESTIMATE;

  return (
    <main className="page-content">
      <div className="flex flex-col gap-3 mb-1 md:flex-row md:items-end md:justify-between">
        <h1 className="hero-heading">books</h1>
        <div className="flex flex-col gap-1 w-full md:w-auto md:items-end">
          <a
            href="https://www.goodreads.com/user/show/162066297-alex-shibu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2.5 text-base text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            📚 Goodreads
          </a>
          <div className="w-full md:w-auto rounded-lg border border-gray-200 bg-gray-50 divide-x divide-gray-200 flex overflow-hidden">
            <div className="flex-1 px-3 py-2 text-center md:text-right">
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Books
              </div>
              <div className="text-base text-gray-900 font-semibold tabular-nums leading-tight">
                {totalBooks}
              </div>
            </div>
            <div className="flex-1 px-3 py-2 text-center md:text-right">
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Hours
              </div>
              <div className="text-base text-gray-900 font-semibold tabular-nums leading-tight">
                {totalHours}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="hero-subline">
        where I track the books I&apos;ve read and what I think
      </p>

      <ul className="mt-6">
        {books.map((book) => (
          <BookCard key={`${book.title}-${book.author}`} book={book} />
        ))}
      </ul>
    </main>
  );
}
