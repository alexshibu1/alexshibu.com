/**
 * Add your best pics to public/photos/ and list filenames here.
 * Order = display order.
 */
export const PHOTOS = [
  "india1.jpg",
  "sf1.jpg",
  "sf2.jpg",
  "sf3.jpg",
  "swiss.jpg",
  "swiss1.jpg",
  "swiss2.jpg",
  "swiss3.jpg",
] as const;

/** Portrait pics shown in one row: sf1, sf3, swiss. */
export const PORTRAIT_PHOTOS = ["sf1.jpg", "sf3.jpg", "swiss.jpg"] as const;

/** Rest of the pics for the grid (excludes portrait row). */
export const GRID_PHOTOS = PHOTOS.filter(
  (f) => !PORTRAIT_PHOTOS.includes(f),
) as (typeof PHOTOS)[number][];

const BASE = "/photos";

export function getPhotoSrc(filename: string): string {
  return `${BASE}/${filename}`;
}
