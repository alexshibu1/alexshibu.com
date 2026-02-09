import Image from "next/image";
import Link from "next/link";
import { PHOTOS, getPhotoSrc } from "./photos-data";

export default function PhotosPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-full max-w-5xl mx-auto px-4 pt-6 pb-16 sm:px-6">
        <Link
          href="/sidequests"
          className="inline-block text-sm text-gray-500 hover:text-red-600 hover:underline transition-colors mb-6"
        >
          ← sidequests
        </Link>
        <h1
          className="font-semibold text-2xl tracking-tight text-gray-900"
          style={{ fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" }}
        >
          photos
        </h1>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 mt-8 w-full">
          {PHOTOS.map((filename) => (
            <div
              key={filename}
              className="relative aspect-square w-full overflow-hidden bg-gray-100"
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
