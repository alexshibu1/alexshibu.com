"use client";

import Sidebar from "./sidebar";

export default function ConditionalSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
