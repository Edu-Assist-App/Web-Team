import React from "react";
import { Separator } from "../../ui/separator";

export const Footer = (): JSX.Element => {
  const navigationLinks = [
    "Home",
    "Features",
    "How It Works",
    "Testimonials",
    "Contact",
  ];

  const socialIcons = [
    { icon: "/group.png", background: "bg-white", border: true },
    { icon: "/group-1.png", background: "bg-[#3800b3]", border: false },
    { icon: "/group-2.png", background: "bg-white", border: true },
    { icon: "/group-3.png", background: "bg-white", border: true },
  ];

  return (
    <footer className="flex flex-col gap-3 px-4 sm:px-8 lg:px-[120px] py-8 sm:py-16 w-full border-t border-[#f9f9f9]">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0 w-full">
        {/* Company Info Section */}
        <div className="flex flex-col w-full lg:w-[360px] items-start gap-[26px]">
          <div className="inline-flex items-center gap-[5.33px]">
            <div className="inline-flex items-center px-2 py-1 bg-[#3800b3] rounded-[32px] shadow-[0px_0.83px_20.83px_#1b19e51a]">
              <img className="w-4 h-4" alt="Frame" src="/frame.svg" />
            </div>
            <div className="font-medium text-[#040303] text-[18.7px] [font-family:'Ubuntu',Helvetica] tracking-[0] leading-normal whitespace-nowrap">
              EduAssist
            </div>
          </div>

          <p className="self-stretch text-[#00000099] leading-6 [font-family:'Ubuntu',Helvetica] font-normal text-base tracking-[0]">
            We offer a wide range of products to make shopping easy, convenient,
            and enjoyable. Quality and customer satisfaction are our top
            priorities.
          </p>

          <a
            href="#"
            className="self-stretch text-[#3800b3] leading-6 underline [font-family:'Ubuntu',Helvetica] font-normal text-base tracking-[0]"
          >
            Learn More →
          </a>
        </div>

        {/* Links Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full lg:w-auto">
          {/* First Links Section */}
          <div className="inline-flex flex-col items-start gap-[26px]">
            <h3 className="w-fit mt-[-1.00px] [font-family:'Ubuntu',Helvetica] font-medium text-black text-base tracking-[3.00px] leading-[18px] whitespace-nowrap">
              Links
            </h3>

            <nav className="flex flex-col items-start justify-center gap-6 w-full">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-fit text-[#00000099] leading-[19px] whitespace-nowrap [font-family:'Ubuntu',Helvetica] font-normal text-base tracking-[0]"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Second Links Section */}
          <div className="inline-flex flex-col items-start gap-[26px]">
            <h3 className="w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-black text-base tracking-[3.00px] leading-[18px] whitespace-nowrap">
              Links
            </h3>

            <nav className="flex flex-col items-start justify-center gap-6 w-full">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-fit text-[#00000099] leading-[19px] whitespace-nowrap [font-family:'Ubuntu',Helvetica] font-normal text-base tracking-[0]"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Media Section */}
          <div className="inline-flex flex-col items-start gap-[26px]">
            <h3 className="w-fit mt-[-1.00px] [font-family:'Ubuntu',Helvetica] font-medium text-black text-base tracking-[3.00px] leading-[18px] whitespace-nowrap">
              Social
            </h3>

            <div className="flex items-center gap-3 py-2 w-full">
              {socialIcons.map((social, index) => (
                <div
                  key={index}
                  className={`relative w-7 h-7 ${
                    social.background
                  } rounded-[14px] ${
                    social.border ? "border border-solid border-[#3800b3]" : ""
                  }`}
                >
                  <img
                    src={social.icon}
                    alt={`Social icon ${index + 1}`}
                    className={`absolute ${
                      index === 0
                        ? "w-[11px] h-[9px] top-[9px] left-2"
                        : index === 1
                        ? "w-1.5 h-3 top-2 left-[11px]"
                        : index === 2
                        ? "w-3.5 h-3.5 top-1.5 left-1.5"
                        : "w-[13px] h-[13px] top-1.5 left-[7px]"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className="w-full h-px my-4" />

      {/* Copyright Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 w-full">
        <div className="inline-flex items-center gap-[4.13px]">
          <div className="inline-flex items-center px-[6.19px] py-[3.1px] bg-[#3800b3] rounded-[24.78px] shadow-[0px_0.65px_16.13px_#1b19e51a]">
            <img
              className="w-[12.39px] h-[12.39px]"
              alt="Frame"
              src="/frame-5.svg"
            />
          </div>
          <div className="font-normal text-[#00000099] text-[14.5px] [font-family:'Ubuntu',Helvetica] tracking-[0] leading-normal whitespace-nowrap">
            EduAssist
          </div>
        </div>

        <div className="[font-family:'Ubuntu',Helvetica] font-normal text-[#00000099] text-sm text-center sm:text-right tracking-[0] leading-normal whitespace-nowrap">
          ©2025, All Rights Reserved
        </div>
      </div>
    </footer>
  );
};
