"use client";

import { Menu, Search } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="w-full gap-4 md:gap-12 px-4 md:px-12 py-4 fixed top-0 right-0 md:w-[calc(100%-300px)] bg-white border-b-[0.5px] border-[#0000001a] flex items-center z-50">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <h1 className="font-['Ubuntu',Helvetica] font-medium text-[#040303] text-xl md:text-2xl">
        Resources
      </h1>

      <div className="hidden md:flex items-center gap-2 pl-6 pr-[50px] py-4 flex-1 bg-[#00000003] rounded-3xl">
        <Search className="w-6 h-6" />
        <Input
          className="border-none bg-transparent font-['Poppins',Helvetica] font-normal text-[#090039] text-base shadow-none focus-visible:ring-0"
          placeholder="Search"
        />
      </div>

      <div className="flex items-center ml-auto gap-4">
        <Button
          variant="outline"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-[99px] border-[0.5px] border-[#1a18e41a]"
        >
          <div className="p-1 bg-[#5e10d21a] rounded-[28px] border border-solid border-[#00000003]">
            <img className="w-4 h-4" alt="Language icon" src="/frame-5.svg" />
          </div>
          <span className="font-['Poppins',Helvetica] font-normal text-black text-base">
            English
          </span>
        </Button>

        <img
          className="w-[42.55px] h-[42.55px] rounded-full object-cover"
          alt="User profile"
          src="/ellipse-22.png"
        />
      </div>
    </header>
  );
}
