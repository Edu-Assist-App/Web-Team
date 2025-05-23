"use client";

import { useState } from "react";
import { Navbar } from "@/app/[locale]/components/navbar";
import { Sidebar } from "@/app/[locale]/components/sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex relative w-full min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-col w-full">
        <Navbar />
        <main
          className="container mx-0 p-6 lg:p-12 lg:pr-[8%] space-y-8
        "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
