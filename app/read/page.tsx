"use client";

import Link from "next/link";

type Book = {
  title: string;
  author: string;
  rating: number; // out of 5
  dateRead: string;
  notes?: string; // slug of the essay with notes, or null if no notes
};

const books: Book[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    rating: 5,
    dateRead: "2024",
    notes: "atomic-habits-notes",
  },
  {
    title: "Naval's Almanack",
    author: "Eric Jorgenson",
    rating: 5,
    dateRead: "2024",
    notes: "naval-almanack-notes",
  },
  {
    title: "How to Make Your Bed",
    author: "Admiral William H. McRaven",
    rating: 4,
    dateRead: "2024",
    notes: "make-your-bed-notes",
  },
  {
    title: "The War of Art",
    author: "Steven Pressfield",
    rating: 5,
    dateRead: "2024",
    notes: "war-of-art-notes",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-xs ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
      <span className="ml-0.5 text-xs text-gray-500">{rating}/5</span>
    </div>
  );
}

function BookItem({ book }: { book: Book }) {
  return (
    <li className="book-item">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 leading-tight">
            {book.title}
          </h3>
          <p className="text-xs text-gray-600 leading-tight -mt-0.5">
            by {book.author}
          </p>
        </div>
        <div className="text-right ml-3">
          <StarRating rating={book.rating} />
          <p className="text-xs text-gray-500">{book.dateRead}</p>
        </div>
      </div>
      {book.notes && (
        <Link
          href={`/essay/${book.notes}`}
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          📝 Notes
        </Link>
      )}
    </li>
  );
}

export default function ReadingPage() {
  return (
    <main className="page-content">
      <div className="flex items-center justify-between mb-1">
        <h1 className="hero-heading">books</h1>
        <a
          href="https://www.goodreads.com/user/show/162066297-alex-shibu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          📚 Goodreads
        </a>
      </div>

      <ul className="books-list mt-1">
        {books.map((book, index) => (
          <BookItem key={index} book={book} />
        ))}
      </ul>
    </main>
  );
}
