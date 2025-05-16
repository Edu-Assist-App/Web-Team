"use client";

import { Menu, Search, ChevronLeft } from "lucide-react";
import { Button } from "@/app/[locale]/components/ui/button";
import { Input } from "@/app/[locale]/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  onMenuClick: () => void;
}

const languages = [
  { code: "en", name: "English", flag: "/flags/us.svg" },
  { code: "fr", name: "Français", flag: "/flags/fr.svg" },
];

export function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = useLocale();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get path without locale
  const pathWithoutLocale =
    segments.length > 1 ? segments.slice(1).join("/") : "";

  const handleLanguageChange = (newLocale: string) => {
    const newPath = `/${newLocale}${
      pathWithoutLocale ? `/${pathWithoutLocale}` : ""
    }`;
    router.push(newPath);
    setIsDropdownOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <header className="w-full gap-4 md:gap-12 px-4 md:px-12 py-4 fixed top-0 right-0 md:w-[calc(100%-300px)] bg-white border-b-[0.5px] border-[#0000001a] flex items-center z-50">
      {/* ... (your existing header content) ... */}

      <div className="flex items-center ml-auto gap-4">
        <div className="relative">
          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-[99px] border-[0.5px] border-[#1a18e41a]"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src={currentLanguage?.flag}
              alt={currentLanguage?.name}
              className="w-5 h-5"
            />
            <span className="font-['Poppins',Helvetica] font-normal text-black text-base">
              {currentLanguage?.name}
            </span>
          </Button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 ${
                    language.code === currentLocale ? "bg-blue-50" : ""
                  }`}
                >
                  <img
                    src={language.flag}
                    alt={language.name}
                    className="w-5 h-5"
                  />
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <img
          className="w-[42.55px] h-[42.55px] rounded-full object-cover"
          alt="User profile"
          src="/ellipse-22.png"
        />
      </div>
    </header>
  );
}
