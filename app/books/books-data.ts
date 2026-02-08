export type Book = {
  title: string;
  author: string;
  rating: number; // out of 10
  dateRead: string; // month and year of finishing, use BOOK_DATE_FORMAT (e.g. "12.2025")
  /** Month and year started (MM.YYYY), optional. */
  dateStarted?: string;
  notes?: string; // slug of the essay with notes, or undefined if no notes
  /** One-liner summary for the books list (only when book has a full review). */
  summary?: string;
  /** Full review text for the dedicated /books/[slug] page (only when book has a review). */
  review?: string;
  /** URL slug for /books/[slug] (only when book has a review). */
  slug?: string;
  /** True if consumed as audiobook (shows small indicator beside title). */
  isAudiobook?: boolean;
};

/** Date format for "finished" display: month and year only (MM.YYYY). */
export const BOOK_DATE_FORMAT = "MM.YYYY";

// Quick-to-edit single number for now.
export const READING_HOURS_ESTIMATE = 110;

export const books: Book[] = [
  {
    title: "Make Your Bed",
    author: "William H. McRaven",
    rating: 8,
    dateRead: "01.2026",
    notes: "make-your-bed-notes",
    slug: "make-your-bed",
    summary:
      "Repetitive but solid; the idea of starting your day with a completed task is powerful.",
    review:
      "Pretty repetitive advice, but if you like the general Navy Seals hard life stuff, it's great. I liked it. But nothing new.\n\nThe idea of starting your day with a completed task, even if small is powerful. It makes you feel good and in motion.\n\nSome of his stories are awesome, but are not even relevant to the advice.",
  },
  {
    title: "Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    rating: 10,
    dateRead: "11.2025",
    notes: "naval-almanack-notes",
    slug: "almanack-of-naval-ravikant",
    summary: "Good book.",
    review: "Good book",
  },
  {
    title: "Will",
    author: "Will Smith",
    rating: 8.5,
    dateRead: "03.2025",
    slug: "will",
    isAudiobook: true,
    summary: "Good when I read; had a clue he was a bit off before the slap.",
    review:
      "it was good when I read. I had clues this guy was a bit off. but the slap didn't seem out of the ordinary.",
  },
  {
    title: "The Ride of a Lifetime",
    author: "Robert Iger",
    rating: 8.8,
    dateRead: "03.2025",
    slug: "the-ride-of-a-lifetime",
    isAudiobook: true,
    summary: "Beginning was awesome; not much value beyond that.",
    review:
      "no value really. Thanks for telling me you saved the company. The beginning was really awesome.",
  },
  {
    title: "The War of Art",
    author: "Steven Pressfield",
    rating: 10,
    dateRead: "12.2025",
    notes: "war-of-art-notes",
    slug: "the-war-of-art",
    summary: "Converting procrastination into a war against a force of nature.",
    review: "converting procrastination into a war against a force of nature",
  },
  {
    title: "The Third Door",
    author: "Alex Banayan",
    rating: 8.3,
    dateStarted: "01.2024",
    dateRead: "02.2024",
    notes: "the-third-door",
    slug: "the-third-door",
    isAudiobook: true,
    summary:
      "Bias to action and finding the alternative route; break the perceived limit of access.",
    review:
      'One of the biggest takeaways was about having a bias to action.\n\nFind the alternative route to getting what you want.\n\nThis makes me want to ask ppl for help, when it truly matters.\n\nThe degrees of connection you may have to the coolest ppl is incredible.\n\nBreak the perceived limit of access you have to the greatest minds. It just takes some "hustle".',
  },
  {
    title: "Why We Sleep",
    author: "Matthew Walker",
    rating: 8.7,
    dateRead: "01.2024",
    notes: "why-we-sleep",
    slug: "why-we-sleep",
    isAudiobook: true,
    summary:
      "Mid self-improvement read; the main part scares you about how lack of sleep is killing you.",
    review:
      "Mid book for self-improvement imo\n\nThe main part of the book scares you about how the lack of sleep is literally killing you. This makes me want to tell everyone about the ideas.\n\nNot much more than the basic stuff on how to improve sleep quality.\n\nMind you I'm an average 19 year old with normal sleep patterns, I think? I was basically trying to sleep early to be honest and not at 1am and feel tired at 6.\n\nWe'll see if this worked. Andrew Huberman has more tips on specific stuff.\n\nI listened to the audio book then read the summary.",
  },
  {
    title: "What Successful People Do Before Breakfast",
    author: "Laura Vanderkam",
    rating: 6.8,
    dateRead: "01.2024",
    slug: "what-the-most-successful-people-do-before-breakfast",
    isAudiobook: true,
    summary:
      "Pretty good value; will power in the morning, auto pilot at night.",
    review:
      "Pretty good value.\n\nI read the summary so the main takeaways come from\n- will power is higher in the morning so do things that take more determination.\n- spend time on building important relationships\n- do auto pilot things at nights\n\nMore repetitive stuff after this.",
  },
  {
    title: "The 5 Second Rule",
    author: "Mel Robbins",
    rating: 7.7,
    dateRead: "01.2024",
    slug: "the-5-second-rule",
    isAudiobook: true,
    summary:
      "The 5-4-3-2-1 idea is good; in action it's harder to get your mind to do it.",
    review:
      "The idea of 5, 4, 3, 2, 1 sounds good but in action it's harder to get your mind to do it. I read the summary of this book and that's what it's worth. This one idea.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    rating: 10,
    dateRead: "11.2025",
    dateStarted: "03.2023",
    notes: "atomic-habits-notes",
    slug: "atomic-habits",
    summary:
      "First book I finished; make habits easy, attractive, obvious, and satisfying.",
    review:
      "I really enjoyed this book and it's pretty much the first book I finished. I'm gonna write an actual review for my website. but 1 basic thing I learned: make any habit easy, attractive, obvious, and satisfying.",
  },
];

/** Get book by slug (for /books/[slug] pages). Returns undefined if not found. */
export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

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

/** Min length for a review to get its own essay page (under /essay/book-review/[slug]). */
export const LONG_REVIEW_MIN_LENGTH = 200;

/** True if the book has a long review and should have an essay page. */
export function hasLongReview(book: Book): boolean {
  return Boolean(book.slug && book.review && book.review.length >= LONG_REVIEW_MIN_LENGTH);
}

/** Books that have long reviews (for essay page static params). */
export function getBooksWithLongReview(): Book[] {
  return books.filter(hasLongReview);
}
