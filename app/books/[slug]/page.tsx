import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBookBySlug,
  getBooksWithLongReview,
  formatDateOfFinishing,
  LONG_REVIEW_MIN_LENGTH,
} from "../books-data";
import { RatingPillTypography } from "../BookRatingDisplay";

export function generateStaticParams() {
  return getBooksWithLongReview().map((b) => ({ slug: b.slug! }));
}

export default function BookReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const book = getBookBySlug(params.slug);
  if (!book || !book.review || book.review.length < LONG_REVIEW_MIN_LENGTH)
    notFound();

  const formattedDate = formatDateOfFinishing(book.dateRead);
  const formattedStarted = book.dateStarted
    ? formatDateOfFinishing(book.dateStarted)
    : null;

  return (
    <main className="page-content">
      <p className="mb-4">
        <Link
          href="/books"
          className="text-gray-500 hover:text-gray-800 hover:underline transition-colors"
        >
          ← books
        </Link>
      </p>
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <h1 className="hero-heading">{book.title}</h1>
          {book.isAudiobook ? (
            <span
              className="text-sm text-gray-400"
              title="Audiobook"
              aria-label="Audiobook"
            >
              🎧
            </span>
          ) : null}
        </div>
        <p className="text-gray-600">
          <span className="font-medium text-black">{book.author}</span>
          <span className="mx-2 text-gray-400">·</span>
          {formattedStarted ? (
            <span className="tabular-nums">
              Started {formattedStarted} · Finished {formattedDate}
            </span>
          ) : (
            <span className="tabular-nums">{formattedDate}</span>
          )}
          <span className="mx-2 text-gray-400">·</span>
          <RatingPillTypography ratingOutOf10={book.rating} ariaLabel={`${book.rating} out of 10`} />
        </p>
        <div className="mt-2 prose prose-gray max-w-none">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {book.review}
          </p>
        </div>
        {book.notes ? (
          <p className="mt-6">
            <Link
              href={`/essay/${book.notes}`}
              className="text-gray-500 hover:text-red-600 hover:underline transition-colors"
            >
              Read my notes ↗
            </Link>
          </p>
        ) : null}
      </div>
    </main>
  );
}
