"use client";
import {
  GlobeIcon,
  Menu,
  ChevronDown,
  Check,
  Search,
  User,
  X,
  HomeIcon,
  BookOpenIcon,
  MessageSquareIcon,
  SettingsIcon,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React, { useCallback, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

export const Navbar = (): JSX.Element => {
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false); // State for collapsible language section

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations("Header");
  const tSidebar = useTranslations("Sidebar");

  // Remove locale prefix from current path for language switching
  const pathWithoutLocale = pathname.startsWith(`/${currentLocale}`)
    ? pathname.slice(currentLocale.length + 1) || "/"
    : pathname || "/";

  // Get the current page title from URL
  const getPageTitle = () => {
    const segments = pathWithoutLocale.replace(/^\/|\/$/g, "").split("/");
    return segments[0];
  };

  const pageTitle = getPageTitle();
  const onMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navItems = [
    {
      name: tSidebar("navItems.dashboard"),
      icon: <HomeIcon className="w-4 h-4" />,
      path: "/dashboard",
      matchPattern: "/dashboard",
    },
    {
      name: tSidebar("navItems.materials"),
      icon: <BookOpenIcon className="w-4 h-4" />,
      path: "/resource",
      matchPattern: "/resource",
    },
    {
      name: tSidebar("navItems.youtube-chat"),
      icon: <MessageSquareIcon className="w-4 h-4" />,
      path: "/youtube-chat",
      matchPattern: "/youtube-chat",
    },
    {
      name: tSidebar("navItems.settings"),
      icon: <SettingsIcon className="w-4 h-4" />,
      path: "/settings",
      matchPattern: "/settings",
    },
    {
      name: tSidebar("navItems.logout"),
      icon: <LogOut className="w-4 h-4" />,
      path: "/logout",
      matchPattern: "/logout",
    },
  ];

  const languages = [
    {
      code: "amh",
      name: t("language.amharic"),
      shortName: t("language.amharicShort"),
    },
    {
      code: "tig",
      name: t("language.tigrinya"),
      shortName: t("language.tigrinyaShort"),
    },
    {
      code: "oro",
      name: t("language.oromiffa"),
      shortName: t("language.oromiffaShort"),
    },
    {
      code: "en",
      name: t("language.english"),
      shortName: t("language.englishShort"),
    },
    {
      code: "es",
      name: t("language.spanish"),
      shortName: t("language.spanishShort"),
    },
    {
      code: "fr",
      name: t("language.french"),
      shortName: t("language.frenchShort"),
    },
    {
      code: "ar",
      name: t("language.arabic"),
      shortName: t("language.arabicShort"),
    },
    {
      code: "zh",
      name: t("language.chinese"),
      shortName: t("language.chineseShort"),
    },
  ];

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(languageSearchTerm.toLowerCase()) ||
      lang.shortName.toLowerCase().includes(languageSearchTerm.toLowerCase())
  );

  const handleLanguageChange = (newLocale: string) => {
    const url = new URL(window.location.href);
    const searchParams = url.search;
    const hash = url.hash;

    const newPath = `/${newLocale}${
      pathWithoutLocale === "/" ? "" : pathWithoutLocale
    }`;

    router.push(newPath + searchParams + hash);
    setIsMenuOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  // Optimized active path check
  const isActive = useCallback(
    (matchPattern: string) => {
      const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "");
      return pathWithoutLocale.startsWith(matchPattern);
    },
    [pathname, locale]
  );

  const withLocale = (path: string) =>
    path.startsWith(`/${currentLocale}`) ? path : `/${currentLocale}${path}`;

  return (
    <>
      {/* Navbar */}
      <div className="flex flex-col w-full max-h-screen bg-white border border-solid border-[#f9f9f9] sticky top-0 z-50 overflow-y-auto">
        <header className="flex items-center justify-between px-4 lg:px-12 lg:pr-[8%] py-4 lg:py-6 w-full">
          {/* Mobile Logo and Navigation */}
          <div className="lg:hidden flex items-center gap-4">
            <div className="flex items-center gap-2 p-3 bg-[#1b19e514] rounded-[48px]">
              <img className="w-6 h-6" alt={t("logoAlt")} src="/logo.svg" />
            </div>
          </div>

          {/* Page Title - Hidden on mobile */}
          <div className="hidden lg:block font-medium text-[#040303] text-xl sm:text-[28px] font-['Ubuntu',Helvetica] tracking-[0]">
            {tSidebar(`navItems.${pageTitle}`)}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Language and Profile */}
          <div className="hidden lg:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-[99px] border-[0.5px] border-solid border-[#1c19e51f] cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-center p-1 bg-[#bf99f839] text-[#3900B3]  rounded-full border border-solid border-[#00000003]">
                    <GlobeIcon className="w-4 h-4" />
                  </div>
                  <span className="font-['Ubuntu',Helvetica] font-normal text-black text-sm">
                    {currentLanguage?.shortName}
                  </span>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="px-2 py-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t("language.searchPlaceholder")}
                      className="pl-8"
                      value={languageSearchTerm}
                      onChange={(e) => setLanguageSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="max-h-60 overflow-y-auto">
                  {filteredLanguages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className="cursor-pointer flex justify-between"
                    >
                      <span>{language.name}</span>
                      {language.code === currentLocale && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300 transition-colors">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer">
                  {t("profile.myAccount")}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  {t("profile.settings")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  {t("profile.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Mobile Menu - Expanded when hamburger menu is clicked */}
        {isMenuOpen && (
          <div className="lg:hidden flex flex-col items-start gap-2 px-4 py-4 bg-white border-t border-solid border-[#f9f9f9]">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={withLocale(item.path)}
                className={`flex items-center gap-3 w-full p-2 ${
                  isActive(item.matchPattern) ? "bg-gray-100" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            {/* Collapsible Language Selector for Mobile */}
            <div className="w-full flex flex-col max-h-[300px]">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                aria-expanded={isLanguageOpen}
                aria-controls="language-collapse"
              >
                <div className="flex items-center justify-center p-1 bg-[#155ddc1a] rounded-lg">
                  <GlobeIcon className="w-4 h-4" />
                </div>
                <span>{currentLanguage?.shortName}</span>
                <ChevronDown
                  className={`ml-auto h-4 w-4 opacity-50 transition-transform ${
                    isLanguageOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
              <div
                id="language-collapse"
                className={`overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${
                  isLanguageOpen
                    ? "h-full pb-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-2 py-2 border-t border-solid border-[#f9f9f9]">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t("language.searchPlaceholder")}
                      className="pl-8"
                      value={languageSearchTerm}
                      onChange={(e) => setLanguageSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredLanguages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className="w-full flex justify-between items-center px-4 py-2 text-left text-sm font-['Ubuntu',Helvetica] font-normal text-[#040303] hover:bg-gray-50"
                    >
                      <span>{language.name}</span>
                      {language.code === currentLocale && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  ))}
                  {filteredLanguages.length === 0 && (
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      {t("language.noResults")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
