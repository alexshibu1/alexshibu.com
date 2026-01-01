"use client";

import Link from "next/link";

type Book = {
  title: string;
  author: string;
  rating: number; // out of 10
  dateRead: string;
  notes?: string; // slug of the essay with notes, or null if no notes
  description?: string; // one-liner description
};

const books: Book[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    rating: 10,
    dateRead: "2024",
    notes: "atomic-habits-notes",
    description: "set up the perfect habits that last",
  },
  {
    title: "Naval's Almanack",
    author: "Eric Jorgenson",
    rating: 10,
    dateRead: "2024",
    notes: "naval-almanack-notes",
    description: "formulas and thoughts /his outlook on life",
  },
  {
    title: "How to Make Your Bed",
    author: "Admiral William H. McRaven",
    rating: 8,
    dateRead: "2024",
    notes: "make-your-bed-notes",
    description: "somthing tiny impacts your life in many ways",
  },
  {
    title: "The War of Art",
    author: "Steven Pressfield",
    rating: 10,
    dateRead: "2024",
    notes: "war-of-art-notes",
    description:
      "converting procrastination into a war against a force of nature",
  },
];

function BookItem({ book }: { book: Book }) {
  return (
    <li className="book-item">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4 flex-1">
          <div className="text-base text-black leading-tight">
            {book.notes ? (
              <Link
                href={`/essay/${book.notes}`}
                className="!text-black hover:!text-red-600 transition-colors"
              >
                <span className="font-bold">{book.title}</span> by{" "}
                <span className="font-normal">{book.author}</span>
              </Link>
            ) : (
              <>
                <span className="font-bold">{book.title}</span> by{" "}
                <span className="font-normal">{book.author}</span>
              </>
            )}
          </div>
          <span className="text-sm text-gray-500">
            Finished: {book.dateRead}
          </span>
        </div>
        <span className="text-sm text-gray-600">Rating: {book.rating}/10</span>
      </div>
      {book.description && (
        <p className="text-base text-gray-600 mt-2 leading-relaxed w-3/4">
          {book.description}
        </p>
      )}
    </li>
  );
}

export default function ReadingPage() {
  return (
    <main className="page-content">
      <div className="flex items-end justify-between mb-1">
        <h1 className="hero-heading">books</h1>
        <a
          href="https://www.goodreads.com/user/show/162066297-alex-shibu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-3 text-base text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
        >
          📚 Goodreads
        </a>
      </div>

      <p className="hero-subline">
        where I track the books I&apos;ve read and what I think
      </p>

      <ul className="books-list mt-6">
        {books.map((book, index) => (
          <BookItem key={index} book={book} />
        ))}
      </ul>
    </main>
  );
}
