export type Book = {
  title: string;
  author: string;
  rating: number; // out of 10
  dateRead: string;
  notes?: string; // slug of the essay with notes, or undefined if no notes
  description?: string; // one-liner description
};

// Quick-to-edit single number for now.
export const READING_HOURS_ESTIMATE = 110;

export const books: Book[] = [
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

