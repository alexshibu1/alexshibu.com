import Image from "next/image";
import Link from "next/link";
import { PORTRAIT_PHOTOS, GRID_PHOTOS, getPhotoSrc } from "./photos-data";
import type { Metadata } from "next";
import { sectionMetadata } from "../lib/seo";

export const metadata: Metadata = sectionMetadata(
  "Photos",
  "Alex Shibu's favorite photos from his journey as a builder.",
  "/photos",
);

export default function PhotosPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-full max-w-6xl mx-auto px-5 pt-8 pb-20 sm:px-8 md:px-10">
        <Link
          href="/sidequests"
          className="inline-block text-sm text-gray-500 hover:text-red-600 hover:underline transition-colors mb-3"
        >
          ← sidequests
        </Link>
        <h1
          className="font-semibold text-2xl tracking-tight text-gray-900"
          style={{
            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
          }}
        >
          photos
        </h1>

        {/* Portrait row: same-size cells, crop to fill */}
        <div className="grid grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-6 w-full">
          {PORTRAIT_PHOTOS.map((filename) => (
            <div
              key={filename}
              className="relative aspect-[3/4] w-full overflow-hidden bg-white"
            >
              <Image
                src={getPhotoSrc(filename)}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Landscape grid: same-size square cells, crop to fill */}
        <div className="grid grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-6 w-full">
          {GRID_PHOTOS.map((filename) => (
            <div
              key={filename}
              className="relative aspect-square w-full overflow-hidden bg-white"
            >
              <Image
                src={getPhotoSrc(filename)}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
