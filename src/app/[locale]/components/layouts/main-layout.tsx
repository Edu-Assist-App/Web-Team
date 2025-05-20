"use client";

import { useState } from "react";
import { Navbar } from "@/app/[locale]/components/navbar";
import { Sidebar } from "@/app/[locale]/components/sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex relative bg-white w-full min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-col w-full">
        <Navbar />
        <main className="p-6 md:p-0">{children}</main>
      </div>
    </div>
  );
}
