import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";
import { ReduxProvider } from "@/lib/redux/provider";
import { supportedLocales } from "@/middleware";

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
        <ReduxProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
