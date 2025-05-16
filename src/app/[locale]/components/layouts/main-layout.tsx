"use client";

import { useState } from "react";
import { Navbar } from "@/app/[locale]/components/navbar";
import { Sidebar } from "@/app/[locale]/components/sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex relative bg-white w-full min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 md:ml-[300px]">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="pt-[84px]">{children}</main>
      </div>
    </div>
  );
}
