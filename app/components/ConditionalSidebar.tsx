"use client";

import Sidebar from "./sidebar";
import { ThemeProvider } from "@/app/context/ThemeContext";

export default function ConditionalSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Sidebar />
      {children}
    </ThemeProvider>
  );
}
