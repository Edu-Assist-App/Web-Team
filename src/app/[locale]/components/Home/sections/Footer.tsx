import React from "react";
import { Separator } from "../../ui/separator";
import { useTranslations } from "next-intl";

export const Footer = (): JSX.Element => {
  const t = useTranslations("HomePage.Footer");

  const socialIcons = [
    { icon: "/group.png", background: "bg-white", border: true },
    { icon: "/group-1.png", background: "bg-[#c77dff]", border: false },
    { icon: "/group-2.png", background: "bg-white", border: true },
    { icon: "/group-3.png", background: "bg-white", border: true },
  ];

  return (
    <footer className="flex flex-col gap-6 px-4 sm:px-8 lg:px-[120px] py-12 sm:py-20 w-full bg-gradient-to-b from-[#10002B] via-[#240046] to-[#3C096C] text-white">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0 w-full">
        {/* Company Info */}
        <div className="flex flex-col w-full lg:w-[360px] items-start gap-6">
          <div className="inline-flex items-center gap-2">
            <div className="inline-flex items-center px-2 py-1 bg-[#c77dff] rounded-full shadow-md">
              <img className="w-4 h-4" alt="Frame" src="/frame.svg" />
            </div>
            <div className="font-medium text-white text-lg tracking-wide">
              {t("companyInfo.name")}
            </div>
          </div>

          <p className="text-sm text-purple-100 leading-relaxed">
            {t("companyInfo.tagline")}
          </p>

          <a
            href="#"
            className="text-[#f0c0ff] underline hover:text-white transition-colors"
          >
            {t("companyInfo.learnMore")}
          </a>
        </div>

        {/* Links + Socials */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full lg:w-auto">
          <div className="flex flex-col items-start gap-6">
            <h3 className="uppercase tracking-widest text-purple-300 font-medium text-sm">
              {t("navigation.title")}
            </h3>
            <nav className="flex flex-col gap-4 text-sm">
              {t.raw("navigation.links").map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-purple-100 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-start gap-6">
            <h3 className="uppercase tracking-widest text-purple-300 font-medium text-sm">
              {t("social.title")}
            </h3>
            <div className="flex items-center gap-3">
              {socialIcons.map((social, index) => (
                <div
                  key={index}
                  className={`relative w-8 h-8 ${
                    social.background
                  } rounded-full flex items-center justify-center ${
                    social.border ? "border border-[#c77dff]" : ""
                  } shadow-md`}
                >
                  <img
                    src={social.icon}
                    alt={t(`social.icons.${index}.alt`)}
                    className="w-4 h-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className="w-full h-px bg-purple-900/50 my-6" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-purple-200">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center px-2 py-1 bg-[#c77dff] rounded-full shadow-md">
            <img className="w-4 h-4" alt="Frame" src="/frame-5.svg" />
          </div>
          <span>{t("companyInfo.name")}</span>
        </div>
        <div className="text-center sm:text-right">{t("copyright.text")}</div>
      </div>
    </footer>
  );
};
