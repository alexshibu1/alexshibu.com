import Image from "next/image";
import { PHOTOS, getPhotoSrc } from "./photos-data";

export default function PhotosPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <h1
        className="hero-heading pt-8 pb-6 px-6 md:px-10"
        style={{ marginBottom: 0, marginTop: 0 }}
      >
        photos
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10 px-6 md:px-10 pb-12 md:pb-16 max-w-6xl">
        {PHOTOS.map((filename) => (
          <div
            key={filename}
            className="relative aspect-square overflow-hidden bg-gray-100"
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
    </main>
  );
}
