export type Book = {
  title: string;
  author: string;
  rating: number; // out of 5
  dateRead: string; // month and year of finishing, use BOOK_DATE_FORMAT (e.g. "12.2025")
  /** Month and year started (MM.YYYY), optional. */
  dateStarted?: string;
  notes?: string; // slug of the essay (full review/notes) — title links to /essay/{notes}
  /** One-liner summary for the books list. */
  summary?: string;
  /** True if consumed as audiobook (shows small indicator beside title). */
  isAudiobook?: boolean;
  /** Audiobook: total listening time in hours. Used for total-hours calculation. */
  durationHours?: number;
  /** Print/ebook: total word count. Used with READING_WPM for total-hours calculation. */
  wordCount?: number;
};

/** Date format for "finished" display: month and year only (MM.YYYY). */
export const BOOK_DATE_FORMAT = "MM.YYYY";

/** Reading speed for print/ebook: words per minute (just below average ~238 for non-fiction). */
export const READING_WPM = 200;

export const books: Book[] = [
  {
    title: "Make Your Bed",
    author: "William H. McRaven",
    rating: 3.5,
    dateRead: "01.2026",
    notes: "make-your-bed",
    wordCount: 25_000,
    summary:
      "Basic advice, but if you like the general Navy Seals hard life stuff, it's great. But nothing new.",
  },
  {
    title: "Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    rating: 4.8,
    dateStarted: "11.2025",
    dateRead: "12.2025",
    notes: "naval-almanack",
    wordCount: 60_000,
    summary: "Significantly changed my outlook on success",
  },
  {
    title: "Will",
    author: "Will Smith",
    rating: 3,
    dateRead: "03.2025",
    isAudiobook: true,
    durationHours: 16 + 16 / 60,
    summary: "Good when I read; had a clue he was a bit off before the slap.",
  },
  {
    title: "The Ride of a Lifetime",
    author: "Robert Iger",
    rating: 4.4,
    dateRead: "03.2025",
    isAudiobook: true,
    durationHours: 8 + 45 / 60,
    summary: "Beginning was awesome; not much value beyond that.",
  },
  {
    title: "The War of Art",
    author: "Steven Pressfield",
    rating: 5,
    dateRead: "12.2025",
    notes: "war-of-art",
    wordCount: 35_000,
    summary: "Converting procrastination into a war against a force of nature.",
  },
  {
    title: "The Third Door",
    author: "Alex Banayan",
    rating: 4.2,
    dateStarted: "01.2024",
    dateRead: "02.2024",
    notes: "the-third-door",
    isAudiobook: true,
    durationHours: 9.5,
    summary:
      "Bias to action and finding the alternative route; break the perceived limit of access.",
  },
  {
    title: "Why We Sleep",
    author: "Matthew Walker",
    rating: 3.5,
    dateStarted: "12.2023",
    dateRead: "01.2024",
    notes: "why-we-sleep",
    isAudiobook: true,
    durationHours: 13 + 52 / 60,
    summary:
      "Mid self-improvement read; the main part scares you about how lack of sleep is killing you.",
  },
  {
    title: "What Successful People Do Before Breakfast",
    author: "Laura Vanderkam",
    rating: 3.4,
    dateRead: "01.2024",
    isAudiobook: true,
    durationHours: 4.5,
    summary:
      "Pretty good value; will power in the morning, auto pilot at night.",
  },
  {
    title: "The 5 Second Rule",
    author: "Mel Robbins",
    rating: 3.9,
    dateRead: "01.2024",
    isAudiobook: true,
    durationHours: 7.5,
    summary:
      "The 5-4-3-2-1 idea is good. In action it's harder to get your mind to do it. If you break it, it's harder to get back on track.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.5,
    dateRead: "11.2025",
    dateStarted: "03.2023",
    notes: "atomic-habits",
    wordCount: 90_000,
    summary:
      "First book I finished; make habits easy, attractive, obvious, and satisfying.",
  },
];

/** Hours for one book: audiobook → durationHours; print/ebook → wordCount / (READING_WPM × 60). */
function hoursForBook(book: Book): number {
  if (book.isAudiobook && book.durationHours != null) return book.durationHours;
  if (book.wordCount != null) return book.wordCount / (READING_WPM * 60);
  return 0;
}

/** Total number of books. */
export const TOTAL_BOOKS = books.length;

/** Total hours reading/listening: audiobooks by duration, print/ebook by wordCount at READING_WPM. */
export const TOTAL_HOURS = Math.round(
  books.reduce((sum, b) => sum + hoursForBook(b), 0),
);

/** Format date of finishing to match BOOK_DATE_FORMAT (e.g. MM.YYYY). */
export function formatDateOfFinishing(dateRead: string): string {
  if (BOOK_DATE_FORMAT !== "MM.YYYY") return dateRead;
  if (/^\d{1,2}\.\d{4}$/.test(dateRead)) {
    const [m, y] = dateRead.split(".");
    return `${m.padStart(2, "0")}.${y}`;
  }
  if (/^\d{4}$/.test(dateRead)) return `01.${dateRead}`;
  return dateRead;
}
