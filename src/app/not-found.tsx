"use client";

import { useTranslations, NextIntlClientProvider } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NotFoundPage() {
  const pathname = usePathname();
  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const pathLocale = pathname?.split("/")[1] || "en";
    setLocale(pathLocale);

    import(`../messages/${pathLocale}.json`)
      .then((mod) => setMessages(mod.default))
      .catch(() =>
        import(`../messages/en.json`).then((mod) => setMessages(mod.default))
      );
  }, [pathname]);

  if (!messages) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <PageContent />
    </NextIntlClientProvider>
  );
}

function PageContent() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <img
        className="w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
        src="/404.svg"
        alt=""
      />
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="text-gray-500 mt-2">{t("description")}</p>
      <Link
        href="/"
        className="mt-6 bg-[#3900B3] text-white px-6 py-2 rounded-full"
      >
        {t("goHome")}
      </Link>
    </div>
  );
}
