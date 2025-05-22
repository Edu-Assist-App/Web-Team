"use client";
import { GlobeIcon, Menu, ChevronDown, Check, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Input } from "../../ui/input";

export const Header = (): JSX.Element => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false); // State for collapsible language section
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations("Header");

  const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";

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

  const onMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
    setIsLanguageOpen(false); // Close language section when toggling menu
  };

  const handleLanguageChange = (newLocale: string) => {
    const newPath = `/${newLocale}${
      pathWithoutLocale === "/" ? "" : pathWithoutLocale
    }`;
    router.push(newPath);
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <div className="flex flex-col w-full max-h-screen bg-white border border-solid border-[#f9f9f9] sticky top-0  z-50 overflow-y-auto">
      <header className="flex items-center justify-between px-4 sm:px-8 lg:px-[120px] py-6 w-full">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center p-1.5 bg-[#3800b3] rounded-full shadow-[0px_1.25px_31.25px_#1b19e51a]">
            <img className="w-6 h-6" alt={t("logoAlt")} src="/frame.svg" />
          </div>
          <div className="font-medium text-[#040303] text-xl sm:text-[28px] font-['Ubuntu',Helvetica] tracking-[0]">
            {t("brandName")}
          </div>
        </Link>

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

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="font-['Ubuntu',Helvetica] font-normal text-[#040303] text-base cursor-pointer"
                passHref
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
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
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((language) => (
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
              </DropdownMenuContent>
            </DropdownMenu>
            {session && (
              <>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="px-6 py-3 bg-[#3800b3] font-['Ubuntu',Helvetica] font-normal text-white text-sm"
                >
                  {t("buttons.dashboard")}
                </Button>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="px-6 py-2 font-['Ubuntu',Helvetica] font-normal text-black text-base"
                >
                  {t("buttons.logout")}
                </Button>
              </>
            )}
            {!session && (
              <>
                <Button
                  onClick={() => router.push("auth/login")}
                  variant="outline"
                  className="px-6 py-2 font-['Ubuntu',Helvetica] font-normal text-black text-base"
                >
                  {t("buttons.login")}
                </Button>
                <Button
                  onClick={() => router.push("/auth/register")}
                  className="px-6 py-3 bg-[#3800b3] font-['Ubuntu',Helvetica] font-normal text-white text-sm"
                >
                  {t("buttons.getStarted")}
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu - Expanded when hamburger menu is clicked */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-start gap-2 px-4 py-4 bg-white border-t border-solid border-[#f9f9f9]">
          <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="font-['Ubuntu',Helvetica] font-normal text-[#040303] text-base py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {session && (
            <>
              <Button
                onClick={() => router.push("/dashboard")}
                className="px-6 py-3 bg-[#3800b3] font-['Ubuntu',Helvetica] font-normal text-white text-sm w-full"
              >
                {t("buttons.dashboard")}
              </Button>
              <Button
                onClick={() => signOut()}
                variant="outline"
                className="px-6 py-2 font-['Ubuntu',Helvetica] font-normal text-black text-base w-full"
              >
                {t("buttons.logout")}
              </Button>
            </>
          )}
          {!session && (
            <>
              <Button
                onClick={() => router.push("auth/login")}
                variant="outline"
                className="px-6 py-2 font-['Ubuntu',Helvetica] font-normal text-black text-base w-full"
              >
                {t("buttons.login")}
              </Button>
              <Button
                onClick={() => router.push("/auth/register")}
                className="px-6 py-3 bg-[#3800b3] font-['Ubuntu',Helvetica] font-normal text-white text-sm w-full"
              >
                {t("buttons.getStarted")}
              </Button>
            </>
          )}

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
                isLanguageOpen ? "h-full pb-4 opacity-100" : "max-h-0 opacity-0"
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
  );
};
