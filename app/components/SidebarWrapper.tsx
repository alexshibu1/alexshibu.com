"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

/** Renders sidebar on all routes except /photos (full-page layout). */
export default function SidebarWrapper() {
  const pathname = usePathname();
  if (pathname === "/photos") return null;
  return <Sidebar />;
}
