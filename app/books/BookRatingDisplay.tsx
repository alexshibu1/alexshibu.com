"use client";

/** Convert rating out of 10 to display value out of 5 (0.5 steps). */
export function getRating5(ratingOutOf10: number): {
  full: number;
  hasHalf: boolean;
  value: number;
} {
  const value = Math.round((ratingOutOf10 / 10) * 5 * 2) / 2;
  const full = Math.floor(value);
  const hasHalf = value % 1 !== 0;
  return { full, hasHalf, value };
}

type RatingDisplayProps = { ratingOutOf10: number; ariaLabel?: string };

/** Shared pill wrapper: same look for every rating option, font-medium throughout. */
const PILL_CLASS =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1 text-sm font-medium tabular-nums bg-gray-100 text-gray-800 border border-gray-200/80";

/** Option 1: Stars inside pill — ★★★★½ */
export function RatingStars({ ratingOutOf10, ariaLabel }: RatingDisplayProps) {
  const { full, hasHalf } = getRating5(ratingOutOf10);
  const label = ariaLabel ?? `${ratingOutOf10} out of 10`;
  return (
    <span
      className={PILL_CLASS}
      aria-label={label}
      title={`${(ratingOutOf10 / 2).toFixed(1)} / 5`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full)
          return (
            <span key={i} className="text-amber-500" aria-hidden>
              ★
            </span>
          );
        if (i === full && hasHalf)
          return (
            <span key={i} className="text-amber-500 opacity-70" aria-hidden>
              ★
            </span>
          );
        return (
          <span key={i} className="text-gray-300" aria-hidden>
            ★
          </span>
        );
      })}
      <span>/ 5</span>
    </span>
  );
}

/** Option 2: Pill + typography — "4.5 / 5" inside one pill, same font weight. */
export function RatingPillTypography({
  ratingOutOf10,
  ariaLabel,
}: RatingDisplayProps) {
  const { value } = getRating5(ratingOutOf10);
  const label = ariaLabel ?? `${ratingOutOf10} out of 10`;
  return (
    <span
      className={PILL_CLASS}
      aria-label={label}
      title={`${value} / 5`}
    >
      <span>{value}</span>
      <span>/ 5</span>
    </span>
  );
}

/** Option 3: Bar inside pill — segments + "/ 5" */
export function RatingBar({ ratingOutOf10, ariaLabel }: RatingDisplayProps) {
  const { full, hasHalf } = getRating5(ratingOutOf10);
  const label = ariaLabel ?? `${ratingOutOf10} out of 10`;
  return (
    <span
      className={PILL_CLASS}
      aria-label={label}
      title={`${(ratingOutOf10 / 2).toFixed(1)} / 5`}
    >
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < full;
          const half = i === full && hasHalf;
          return (
            <span
              key={i}
              className="h-1.5 w-3 rounded-sm overflow-hidden bg-gray-200 flex-shrink-0"
              aria-hidden
            >
              {filled ? (
                <span className="block h-full w-full bg-amber-500 rounded-sm" />
              ) : half ? (
                <span className="block h-full w-1/2 bg-amber-500 rounded-l-sm" />
              ) : null}
            </span>
          );
        })}
      </span>
      <span>/ 5</span>
    </span>
  );
}

/** Option 4: Dots inside pill — ●●●●○ + "/ 5" */
export function RatingDots({ ratingOutOf10, ariaLabel }: RatingDisplayProps) {
  const { full, hasHalf } = getRating5(ratingOutOf10);
  const label = ariaLabel ?? `${ratingOutOf10} out of 10`;
  return (
    <span
      className={PILL_CLASS}
      aria-label={label}
      title={`${(ratingOutOf10 / 2).toFixed(1)} / 5`}
    >
      <span className="inline-flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => {
          if (i < full)
            return (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-700" aria-hidden />
            );
          if (i === full && hasHalf)
            return (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full border-2 border-gray-700 bg-gray-400"
                aria-hidden
              />
            );
          return (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full border border-gray-300 bg-transparent"
              aria-hidden
            />
          );
        })}
      </span>
      <span>/ 5</span>
    </span>
  );
}

/** All variants for preview; pass rating out of 10. */
export const RATING_OPTIONS = [
  { id: "stars", label: "Stars", Component: RatingStars },
  { id: "pill-typography", label: "Pill + Typography", Component: RatingPillTypography },
  { id: "bar", label: "Bar", Component: RatingBar },
  { id: "dots", label: "Dots", Component: RatingDots },
] as const;
