/**
 * Add your best pics to public/photos/ and list filenames here.
 * Order = display order. Use square-ish images for the grid.
 */
export const PHOTOS = [
  "54707227403_9a84891072_k.jpg",
] as const;

const BASE = "/photos";

export function getPhotoSrc(filename: string): string {
  return `${BASE}/${filename}`;
}
