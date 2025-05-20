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
  PlusIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");
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

    if (segments.length > 0 && segments[0]) {
      const specialCases: Record<string, string> = {
        dashboard: t("pages.dashboard"),
        profile: t("pages.profile"),
        settings: t("pages.settings"),
      };

      if (specialCases[segments[0]]) {
        return specialCases[segments[0]];
      }

      return segments[0]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return t("brandName");
  };

  const pageTitle = getPageTitle();

  const navItems = [
    { name: t("navigation.home"), href: "#hero" },
    { name: t("navigation.features"), href: "#features" },
    { name: t("navigation.howItWorks"), href: "#how-it-works" },
    { name: t("navigation.testimonials"), href: "#testimonials" },
  ];

  const languages = [
    {
      code: "amh",
      name: t("language.amharic"),
      shortName: t("language.amharicShort"),
    },
    // {
    //   code: "tig",
    //   name: t("language.Tigrinya"),
    //   shortName: t("language.TigrinyaShort"),
    // },
    // {
    //   code: "afan",
    //   name: t("language.oromiffa"),
    //   shortName: t("language.oromiffaShort"),
    // },
    {
      code: "en",
      name: t("language.english"),
      shortName: t("language.englishShort"),
    },
    // {
    //   code: "fr",
    //   name: t("language.french"),
    //   shortName: t("language.frenchShort"),
    // },
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

  const sidebarNavItems = [
    {
      name: tSidebar("navItems.overview"),
      icon: <HomeIcon className="w-4 h-4" />,
      path: "/dashboard",
    },
    {
      name: tSidebar("navItems.studyMaterials"),
      icon: <BookOpenIcon className="w-4 h-4" />,
      path: "/resource",
    },
    {
      name: tSidebar("navItems.chats"),
      icon: <MessageSquareIcon className="w-4 h-4" />,
      path: "/chats",
    },
  ];

  const withLocale = (path: string) =>
    path.startsWith(`/${currentLocale}`) ? path : `/${currentLocale}${path}`;

  return (
    <>
      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Navbar */}
      <div className="flex flex-col w-full bg-white border border-solid border-[#f9f9f9] sticky top-0 z-50">
        <header className="flex items-center justify-between px-8 lg:px-12 lg:pr-[8%] py-6 w-full">
          {/* Logo - Only shown on mobile */}
          <div className="lg:hidden flex items-center">
            <div className="flex items-center gap-2 p-3 bg-[#1b19e514] rounded-[48px]">
              <img className="w-6 h-6" alt={t("logoAlt")} src="/logo.svg" />
            </div>
          </div>

          {/* Page Title - Hidden on mobile */}
          <div className="hidden lg:block font-medium text-[#040303] text-xl sm:text-[28px] font-['Ubuntu',Helvetica] tracking-[0]">
            {pageTitle}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-[0.5px] border-solid border-[#00000014] cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-center p-1 bg-[#155ddc1a] rounded-lg border border-solid border-[#00000003]">
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

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-[300px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col items-start gap-8 p-8`}
        >
          {/* Mobile Sidebar Header */}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2 p-3 bg-[#1b19e514] rounded-[48px] shadow-[0px_1.25px_31.25px_#1b19e51a]">
                <img
                  className="w-6 h-6"
                  alt={tSidebar("logoAlt")}
                  src="/logo.svg"
                />
              </div>
              <h1 className="font-medium text-[#040303] text-[28px] font-['Ubuntu',Helvetica] whitespace-nowrap">
                {tSidebar("brandName")}
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between w-full overflow-y-auto pr-2">
            {/* Mobile Navigation */}
            <nav className="flex flex-col items-start justify-center gap-2 p-0.5 w-full rounded">
              <Button
                onClick={() => router.push(withLocale("/materials"))}
                className="w-full bg-[#3800b3] rounded-[999px] text-white font-['Poppins',Helvetica] font-normal text-sm"
              >
                <div className="p-1 bg-[#ffffff33] rounded-[99px]">
                  <PlusIcon className="w-4 h-4" />
                </div>
                {tSidebar("buttons.newModule")}
              </Button>

              <div className="text-[#00000099] text-sm font-['Poppins',Helvetica] font-normal mt-4">
                {tSidebar("quickNav")}
              </div>

              <div className="gap-0.5 flex flex-col items-start w-full">
                {sidebarNavItems.map((item, index) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      className="w-full"
                      key={index}
                      href={withLocale(item.path)}
                      passHref
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className={`flex items-center gap-2 p-3 w-full justify-start ${
                          isActive
                            ? "bg-[#f9f9f9] rounded-[99px]"
                            : "rounded-xl"
                        }`}
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
                        <span
                          className={`font-['Poppins',Helvetica] font-normal text-base ${
                            isActive ? "text-black" : "text-[#00000099]"
                          }`}
                        >
                          {item.name}
                        </span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </nav>
            {/* Mobile Language Selector */}
            <div className="mt-4 w-full">
              <h3 className="font-medium text-sm text-gray-500 mb-2">
                {t("mobileMenu.languageLabel")}
              </h3>
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("language.searchPlaceholder")}
                  className="pl-8"
                  value={languageSearchTerm}
                  onChange={(e) => setLanguageSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                {filteredLanguages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`flex items-center justify-between px-4 py-2 rounded-lg ${
                      language.code === currentLocale
                        ? "bg-[#f0f0f0]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span>{language.name}</span>
                    {language.code === currentLocale && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Bottom Section */}
            <div className="flex flex-col items-start justify-end gap-2 p-0.5 mt-auto w-full rounded">
              <div className="bg-[#00000005] rounded-xl flex flex-col items-start w-full">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-3 w-full justify-start rounded-xl"
                >
                  <div className="flex items-center justify-center p-1 bg-[#0000000d] rounded-[28px] border border-solid border-[#00000003]">
                    <SettingsIcon className="w-4 h-4" />
                  </div>
                  <span className="font-['Poppins',Helvetica] font-normal text-black text-base">
                    {tSidebar("buttons.settings")}
                  </span>
                </Button>

                <Link
                  href={withLocale("/")}
                  className="flex items-center gap-2 p-3 w-full justify-start rounded-xl"
                >
                  <div className="flex items-center justify-center p-1 bg-[#0000000d] rounded-[28px] border border-solid border-[#00000003]">
                    <div className="relative w-4 h-4">
                      <img
                        className="absolute w-[13px] h-3 top-0.5 left-px"
                        alt={tSidebar("buttons.logout")}
                        src="/logout.svg"
                      />
                    </div>
                  </div>
                  <span className="font-['Poppins',Helvetica] font-normal text-black text-base">
                    {tSidebar("buttons.logout")}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
