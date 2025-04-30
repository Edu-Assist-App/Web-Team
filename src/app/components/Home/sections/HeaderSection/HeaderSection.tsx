"use client"
import { GlobeIcon, Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../ui/navigation-menu";

export const HeaderSection = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#faq" },
  ];

  return (
    <div className="flex flex-col w-full bg-white border border-solid border-[#f9f9f9] sticky top-0 z-50">
      <header className="flex items-center justify-between px-4 sm:px-8 lg:px-[120px] py-6 w-full">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center p-1.5 bg-[#3800b3] rounded-full shadow-[0px_1.25px_31.25px_#1b19e51a]">
            <img className="w-6 h-6" alt="EduAssist Logo" src="/frame.svg" />
          </div>
          <div className="font-medium text-[#040303] text-xl sm:text-[28px] font-['Ubuntu',Helvetica] tracking-[0]">
            EduAssist
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-[0.5px] border-solid border-[#00000014]">
              <div className="flex items-center justify-center p-1 bg-[#155ddc1a] rounded-lg border border-solid border-[#00000003]">
                <GlobeIcon className="w-4 h-4" />
              </div>
              <span className="font-['Ubuntu',Helvetica] font-normal text-black text-sm">
                Eng
              </span>
            </div>

            {/* Login Button */}
            <Button
              variant="outline"
              className="px-6 py-2 font-['Ubuntu',Helvetica] font-normal text-black text-base"
            >
              Login
            </Button>

            {/* Get Started Button */}
            <Button className="px-6 py-3 bg-[#3800b3] font-['Ubuntu',Helvetica] font-normal text-white text-sm">
              Get Started
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
          <div className="flex flex-col gap-4 mt-4">
            <Button
              variant="outline"
              className="w-full font-['Ubuntu',Helvetica] font-normal text-black text-base"
            >
              Login
            </Button>
            <Button className="w-full bg-[#3800b3] font-['Ubuntu',Helvetica] font-normal text-white text-sm">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};