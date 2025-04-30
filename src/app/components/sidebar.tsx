"use client";

import {
  BookOpenIcon,
  HomeIcon,
  MessageSquareIcon,
  PlusIcon,
  SettingsIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    name: "Overview",
    icon: <HomeIcon className="w-4 h-4" />,
    path: "/dashboard",
  },
  {
    name: "Study Materials",
    icon: <BookOpenIcon className="w-4 h-4" />,
    path: "/resource",
  },
  {
    name: "Chats",
    icon: <MessageSquareIcon className="w-4 h-4" />,
    path: "/chats",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />
      <aside
        className={`flex flex-col w-[300px] h-screen items-start gap-8 p-8 fixed top-0 left-0 bg-white border-r-[0.5px] border-[#0000001a] z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ width: collapsed ? "80px" : "300px" }}
      >
        {/* Collapse button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 hidden md:flex"
          onClick={toggleCollapse}
        >
          {collapsed ? (
            <ChevronRight className="h-6 w-6" />
          ) : (
            <ChevronLeft className="h-6 w-6" />
          )}
        </Button>

        {/* Close button (mobile only) */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 md:hidden"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Logo section */}
        <div className="flex-col justify-center gap-3 w-full flex items-center">
          <div className="flex items-center justify-end gap-2 p-[3px] w-full">
            {/* <button onClick={toggleCollapse} className="relative w-4 h-4">
              <img
                className="absolute w-[18px] h-[18px] -top-px -left-px"
                alt="Collapse icon"
                src="/collapse-icon.svg"
              />
            </button> */}
          </div>

          {!collapsed && (
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2 p-3 bg-[#1b19e514] rounded-[48px] shadow-[0px_1.25px_31.25px_#1b19e51a]">
                <img className="w-6 h-6" alt="Logo" src="/logo.svg" />
              </div>
              <h1 className="font-medium text-[#040303] text-[28px] font-['Ubuntu',Helvetica] whitespace-nowrap">
                EduAssist
              </h1>
            </div>
          )}
          {collapsed && (
            <div className="flex items-center gap-2 p-3 bg-[#1b19e514] rounded-[48px] shadow-[0px_1.25px_31.25px_#1b19e51a]">
              <img className="w-6 h-6" alt="Logo" src="/logo.svg" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-start justify-center gap-2 p-0.5 w-full rounded">
          <Button
            onClick={() => router.push("/materials")}
            className={`w-full bg-[#3800b3] rounded-[999px] text-white font-['Poppins',Helvetica] font-normal text-sm ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="p-1 bg-[#ffffff33] rounded-[99px]">
              <PlusIcon className="w-4 h-4" />
            </div>
            {!collapsed && "New Module"}
          </Button>

          {!collapsed && (
            <div className="text-[#00000099] text-sm font-['Poppins',Helvetica] font-normal mt-4">
              Quick Nav
            </div>
          )}

          <div className="gap-0.5 flex flex-col items-start w-full">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link className="w-full" key={index} href={item.path} passHref>
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 p-3 w-full justify-start ${
                      isActive ? "bg-[#f9f9f9] rounded-[99px]" : "rounded-xl"
                    } ${collapsed ? "justify-center" : ""}`}
                  >
                    <div
                      className={`flex items-center justify-center p-${
                        isActive ? "2" : "1"
                      } rounded-[28px] border border-solid border-[#00000003] ${
                        isActive ? "bg-[#1a18e41a]" : "bg-[#0000000d]"
                      }`}
                    >
                      {item.icon}
                    </div>
                    {!collapsed && (
                      <span
                        className={`font-['Poppins',Helvetica] font-normal text-base ${
                          isActive ? "text-black" : "text-[#00000099]"
                        }`}
                      >
                        {item.name}
                      </span>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="flex flex-col items-start justify-end gap-2 p-0.5 mt-auto w-full rounded">
          <div className="bg-[#00000005] rounded-xl flex flex-col items-start w-full">
            <Button
              variant="ghost"
              className={`flex items-center gap-2 p-3 w-full justify-start rounded-xl ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <div className="flex items-center justify-center p-1 bg-[#0000000d] rounded-[28px] border border-solid border-[#00000003]">
                <SettingsIcon className="w-4 h-4" />
              </div>
              {!collapsed && (
                <span className="font-['Poppins',Helvetica] font-normal text-black text-base">
                  Settings
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              className={`flex items-center gap-2 p-3 w-full justify-start rounded-xl ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <div className="flex items-center justify-center p-1 bg-[#0000000d] rounded-[28px] border border-solid border-[#00000003]">
                <div className="relative w-4 h-4">
                  <img
                    className="absolute w-[13px] h-3 top-0.5 left-px"
                    alt="Logout icon"
                    src="/logout.svg"
                  />
                </div>
              </div>
              {!collapsed && (
                <span className="font-['Poppins',Helvetica] font-normal text-black text-base">
                  Logout
                </span>
              )}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
