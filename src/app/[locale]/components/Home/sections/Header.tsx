"use client";
import { GlobeIcon, Menu, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl"; // Add useLocale here
import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

export const Header = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

<<<<<<< HEAD
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
=======
    {
      code: "tig",
      name: t("language.Tigrinya"),
      shortName: t("language.TigrinyaShort"),
    },
    {
      code: "afan",
      name: t("language.oromiffa"),
      shortName: t("language.oromiffaShort"),
    },
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
    {
      code: "en",
      name: t("language.english"),
      shortName: t("language.englishShort"),
    },
<<<<<<< HEAD
    // {
    //   code: "fr",
    //   name: t("language.french"),
    //   shortName: t("language.frenchShort"),
    // },
=======
    {
      code: "fr",
      name: t("language.french"),
      shortName: t("language.frenchShort"),
    },
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
  ];

  const handleLanguageChange = (newLocale: string) => {
    const newPath = `/${newLocale}${
      pathWithoutLocale === "/" ? "" : pathWithoutLocale
    }`;
    router.push(newPath);
    setIsMenuOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <div className="flex flex-col w-full bg-white border border-solid border-[#f9f9f9] sticky top-0 z-50">
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
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-6">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <Link href={item.href} passHref legacyBehavior>
                    <NavigationMenuLink className="font-['Ubuntu',Helvetica] font-normal text-[#040303] text-base cursor-pointer">
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

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

            <Button
              variant="outline"
              className="px-6 py-2 font-['Ubuntu',Helvetica] font-normal text-black text-base"
            >
              {t("buttons.login")}
            </Button>

            <Button className="px-6 py-3 bg-[#3800b3] font-['Ubuntu',Helvetica] font-normal text-white text-sm">
              {t("buttons.getStarted")}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col w-full bg-white border-t border-[#f9f9f9] px-4 py-4">
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
          <div className="mt-4">
            <div className="mb-4">
              <h3 className="font-medium text-sm text-gray-500 mb-2">
                {t("mobileMenu.languageLabel")}
              </h3>
              <div className="flex flex-col gap-2">
                {languages.map((language) => (
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
            <Button
              variant="outline"
              className="w-full font-['Ubuntu',Helvetica] font-normal text-black text-base mb-2"
            >
              {t("buttons.login")}
            </Button>
            <Button className="w-full bg-[#3800b3] font-['Ubuntu',Helvetica] font-normal text-white text-sm">
              {t("buttons.getStarted")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
