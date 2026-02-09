"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

/** Renders Sidebar only when not on /photos (photos page is full-bleed, no sidebar). */
export default function ConditionalSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPhotosPage = pathname === "/photos";

  if (isPhotosPage) {
    return <>{children}</>;
  }
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
