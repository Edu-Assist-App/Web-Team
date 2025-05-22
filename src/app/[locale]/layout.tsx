import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";
import { supportedLocales } from "@/middleware";
import { SessionsProvider } from "@/lib/redux/provider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
} & { params: any }) {
  // Add this type assertion
  const { locale } = await params;

  if (!supportedLocales.includes(locale)) notFound();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body data-new-gr-c-s-check-loaded="14.1235.0" data-gr-ext-installed="">
        <SessionsProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </SessionsProvider>
      </body>
    </html>
  );
}
