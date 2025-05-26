import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
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
    <SessionsProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </SessionsProvider>
  );
}
