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
import { Button } from "@/app/[locale]/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Sidebar");
  const withLocale = (path: string) =>
    path.startsWith(`/${locale}`) ? path : `/${locale}${path}`;
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    {
      name: t("navItems.overview"),
<<<<<<< HEAD
      icon: <HomeIcon className="w-5 h-5" />,
      path: "/dashboard",
      matchPattern: "/dashboard",
    },
    {
      name: t("navItems.studyMaterials"),
      icon: <BookOpenIcon className="w-5 h-5" />,
      path: "/resource",
      matchPattern: "/resource",
    },
    {
      name: t("navItems.chats"),
      icon: <MessageSquareIcon className="w-5 h-5" />,
      path: "/chats",
      matchPattern: "/chats",
    },
  ];

  const isActive = (path: string, matchPattern: string) => {
    // Remove locale prefix if present
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "");
    return pathWithoutLocale.startsWith(matchPattern);
  };

=======
      icon: <HomeIcon className="w-4 h-4" />,
      path: "/dashboard",
    },
    {
      name: t("navItems.studyMaterials"),
      icon: <BookOpenIcon className="w-4 h-4" />,
      path: "/resource",
    },
    {
      name: t("navItems.chats"),
      icon: <MessageSquareIcon className="w-4 h-4" />,
      path: "/chats",
    },
  ];

>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />
      <aside
<<<<<<< HEAD
        className={`flex flex-col w-[300px] h-screen items-start gap-8 p-8 fixed top-0 left-0 bg-white border-r border-gray-100 z-50 transition-all duration-300 ${
=======
        className={`flex flex-col w-[300px] h-screen items-start gap-8 p-8 fixed top-0 left-0 bg-white border-r-[0.5px] border-[#0000001a] z-50 transition-transform duration-300 ${
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ width: collapsed ? "80px" : "300px" }}
      >
        {/* Collapse button */}
        <Button
          variant="ghost"
          size="icon"
<<<<<<< HEAD
          className="absolute -right-3 top-6 hidden md:flex bg-white border border-gray-200 hover:bg-gray-50 rounded-full p-1"
=======
          className="absolute top-4 right-4 hidden md:flex"
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
          onClick={toggleCollapse}
          aria-label={t("ariaLabels.collapse")}
        >
          {collapsed ? (
<<<<<<< HEAD
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
=======
            <ChevronRight className="h-6 w-6" />
          ) : (
            <ChevronLeft className="h-6 w-6" />
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
          )}
        </Button>

        {/* Close button (mobile only) */}
        <Button
          variant="ghost"
          size="icon"
<<<<<<< HEAD
          className="absolute top-6 right-6 md:hidden"
          onClick={onClose}
          aria-label={t("ariaLabels.close")}
        >
          <X className="h-5 w-5" />
=======
          className="absolute top-4 right-4 md:hidden"
          onClick={onClose}
          aria-label={t("ariaLabels.close")}
        >
          <X className="h-6 w-6" />
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
        </Button>

        {/* Logo section */}
        <div className="flex-col justify-center gap-3 w-full flex items-center">
<<<<<<< HEAD
          {!collapsed && (
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-full">
                <img className="w-6 h-6" alt={t("logoAlt")} src="/logo.svg" />
              </div>
              <h1 className="font-medium text-gray-900 text-[28px] font-['Ubuntu',Helvetica] whitespace-nowrap">
=======
          <div className="flex items-center justify-end gap-2 p-[3px] w-full">
            {/* Optional collapse button could go here */}
          </div>

          {!collapsed && (
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2 p-3 bg-[#1b19e514] rounded-[48px] shadow-[0px_1.25px_31.25px_#1b19e51a]">
                <img className="w-6 h-6" alt={t("logoAlt")} src="/logo.svg" />
              </div>
              <h1 className="font-medium text-[#040303] text-[28px] font-['Ubuntu',Helvetica] whitespace-nowrap">
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
                {t("brandName")}
              </h1>
            </div>
          )}
          {collapsed && (
<<<<<<< HEAD
            <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-full">
=======
            <div className="flex items-center gap-2 p-3 bg-[#1b19e514] rounded-[48px] shadow-[0px_1.25px_31.25px_#1b19e51a]">
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
              <img className="w-6 h-6" alt={t("logoAlt")} src="/logo.svg" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-start justify-center gap-2 p-0.5 w-full rounded">
          <Button
            onClick={() => router.push(withLocale("/materials"))}
<<<<<<< HEAD
            className={`w-full bg-gradient-to-r from-purple-600 to-[#3800b3] hover:bg-indigo-800 rounded-full text-white font-medium text-sm ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="p-1 bg-white/20 rounded-full">
              <PlusIcon className="w-5 h-5" />
=======
            className={`w-full bg-[#3800b3] rounded-[999px] text-white font-['Poppins',Helvetica] font-normal text-sm ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="p-1 bg-[#ffffff33] rounded-[99px]">
              <PlusIcon className="w-4 h-4" />
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
            </div>
            {!collapsed && t("buttons.newModule")}
          </Button>

          {!collapsed && (
<<<<<<< HEAD
            <div className="text-gray-500 text-sm font-medium mt-4">
=======
            <div className="text-[#00000099] text-sm font-['Poppins',Helvetica] font-normal mt-4">
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
              {t("quickNav")}
            </div>
          )}

<<<<<<< HEAD
          <div className="flex flex-col gap-1 items-start w-full rounded-lg p-1">
            {navItems.map((item, index) => {
              const active = isActive(pathname, item.matchPattern);
=======
          <div className="gap-0.5 flex flex-col items-start w-full">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
              return (
                <Link
                  className="w-full"
                  key={index}
                  href={withLocale(item.path)}
                  passHref
                >
                  <Button
                    variant="ghost"
<<<<<<< HEAD
                    className={`flex items-center gap-3 w-full  rounded-[99px] justify-start transition-all ${
                      active
                        ? "bg-white shadow-sm border border-purple-100"
                        : ""
                    } ${collapsed ? "justify-center" : "px-4"} h-12`}
                  >
                    <div
                      className={`flex items-center justify-center rounded-full p-2 ${
                        active ? "bg-purple-100 text-[#3800b3] " : ""
=======
                    className={`flex items-center gap-2 p-3 w-full justify-start ${
                      isActive ? "bg-[#f9f9f9] rounded-[99px]" : "rounded-xl"
                    } ${collapsed ? "justify-center" : ""}`}
                  >
                    <div
                      className={`flex items-center justify-center p-${
                        isActive ? "2" : "1"
                      } rounded-[28px] border border-solid border-[#00000003] ${
                        isActive ? "bg-[#1a18e41a]" : "bg-[#0000000d]"
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
                      }`}
                    >
                      {item.icon}
                    </div>
                    {!collapsed && (
                      <span
<<<<<<< HEAD
                        className={`font-medium text-base ${
                          active ? "text-[#3800b3]" : "text-gray-700"
=======
                        className={`font-['Poppins',Helvetica] font-normal text-base ${
                          isActive ? "text-black" : "text-[#00000099]"
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
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
<<<<<<< HEAD
          <div className="bg-gray-50 rounded-xl flex flex-col items-start w-full p-1 gap-1">
            <Button
              variant="ghost"
              className={`flex items-center gap-3 w-full justify-start rounded-lg h-12 ${
                collapsed ? "justify-center" : "px-4"
              } hover:bg-gray-100`}
            >
              <div className="flex items-center justify-center p-2 bg-gray-200 rounded-full text-gray-600">
                <SettingsIcon className="w-5 h-5" />
              </div>
              {!collapsed && (
                <span className="font-medium text-gray-700">
=======
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
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
                  {t("buttons.settings")}
                </span>
              )}
            </Button>

<<<<<<< HEAD
            <Button
              variant="ghost"
              className={`flex items-center gap-3 w-full justify-start rounded-lg h-12 ${
                collapsed ? "justify-center" : "px-4"
              } hover:bg-gray-100`}
            >
              <div className="flex items-center justify-center p-2 bg-gray-200 rounded-full text-gray-600">
                <div className="relative w-5 h-5">
                  <img
                    className="absolute w-[16px] h-4 top-0.5 left-0.5"
=======
            <Link
              href={withLocale("/")}
              className={`flex items-center gap-2 p-3 w-full justify-start rounded-xl ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <div className="flex items-center justify-center p-1 bg-[#0000000d] rounded-[28px] border border-solid border-[#00000003]">
                <div className="relative w-4 h-4">
                  <img
                    className="absolute w-[13px] h-3 top-0.5 left-px"
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
                    alt={t("buttons.logout")}
                    src="/logout.svg"
                  />
                </div>
              </div>
              {!collapsed && (
<<<<<<< HEAD
                <span className="font-medium text-gray-700">
                  {t("buttons.logout")}
                </span>
              )}
            </Button>
=======
                <span className="font-['Poppins',Helvetica] font-normal text-black text-base">
                  {t("buttons.logout")}
                </span>
              )}
            </Link>
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
          </div>
        </div>
      </aside>
    </>
  );
}
