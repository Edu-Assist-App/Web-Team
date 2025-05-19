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

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />
      <aside
        className={`flex flex-col w-[300px] h-screen items-start gap-8 p-8 fixed top-0 left-0 bg-white border-r border-gray-100 z-50 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ width: collapsed ? "80px" : "300px" }}
      >
        {/* Collapse button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 hidden md:flex bg-white border border-gray-200 hover:bg-gray-50 rounded-full p-1"
          onClick={toggleCollapse}
          aria-label={t("ariaLabels.collapse")}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        {/* Close button (mobile only) */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-6 right-6 md:hidden"
          onClick={onClose}
          aria-label={t("ariaLabels.close")}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Logo section */}
        <div className="flex-col justify-center gap-3 w-full flex items-center">
          {!collapsed && (
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-full">
                <img className="w-6 h-6" alt={t("logoAlt")} src="/logo.svg" />
              </div>
              <h1 className="font-medium text-gray-900 text-[28px] font-['Ubuntu',Helvetica] whitespace-nowrap">
                {t("brandName")}
              </h1>
            </div>
          )}
          {collapsed && (
            <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-full">
              <img className="w-6 h-6" alt={t("logoAlt")} src="/logo.svg" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-start justify-center gap-2 p-0.5 w-full rounded">
          <Button
            onClick={() => router.push(withLocale("/materials"))}
            className={`w-full bg-gradient-to-r from-purple-600 to-[#3800b3] hover:bg-indigo-800 rounded-full text-white font-medium text-sm ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="p-1 bg-white/20 rounded-full">
              <PlusIcon className="w-5 h-5" />
            </div>
            {!collapsed && t("buttons.newModule")}
          </Button>

          {!collapsed && (
            <div className="text-gray-500 text-sm font-medium mt-4">
              {t("quickNav")}
            </div>
          )}

          <div className="flex flex-col gap-1 items-start w-full rounded-lg p-1">
            {navItems.map((item, index) => {
              const active = isActive(pathname, item.matchPattern);
              return (
                <Link
                  className="w-full"
                  key={index}
                  href={withLocale(item.path)}
                  passHref
                >
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-3 w-full  rounded-[99px] justify-start transition-all ${
                      active
                        ? "bg-white shadow-sm border border-purple-100 bg-[#f6f2ff"
                        : ""
                    } ${collapsed ? "justify-center" : "px-4"} h-12`}
                  >
                    <div
                      className={`flex items-center justify-center rounded-full p-2 ${
                        active ? "bg-purple-100 text-[#3800b3] " : ""
                      }`}
                    >
                      {item.icon}
                    </div>
                    {!collapsed && (
                      <span
                        className={`font-medium text-base ${
                          active ? "text-[#3800b3]" : "text-gray-700"
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
                  {t("buttons.settings")}
                </span>
              )}
            </Button>

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
                    alt={t("buttons.logout")}
                    src="/logout.svg"
                  />
                </div>
              </div>
              {!collapsed && (
                <span className="font-medium text-gray-700">
                  {t("buttons.logout")}
                </span>
              )}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
