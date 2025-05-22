import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List all supported locales
const supportedLocales = [
  "en",
  "fr",
  "amh",
  "tig",
  "oro", // Your custom ones
  "es",
  "ar",
  "zh",
  "hi",
  "pt",
  "ru",
  "ja",
  "de", // Common languages
];

// Define protected routes (without locale prefix)
// const protectedRoutes = [];
const protectedRoutes = ["/dashboard", "/materials"];

const intlMiddleware = createIntlMiddleware({
  locales: supportedLocales,
  defaultLocale: "en",
  localePrefix: "always",
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const response = intlMiddleware(request);

  const localeMatch = pathname.match(
    /^\/(en|fr|amh|tig|afan|es|ar|zh|hi|pt|ru|ja|de)(\/|$)/
  );
  const locale = localeMatch?.[1];

  const pathWithoutLocale = pathname.replace(
    /^\/(en|fr|amh|tig|afan|es|ar|zh|hi|pt|ru|ja|de)/,
    ""
  );

  const isProtected = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  if (isProtected) {
    const token = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
    });

    console.log("Token in middleware:", token);

    if (!token) {
      const loginUrl = new URL(`/${locale || "en"}/auth/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"], // Match all pages except static and API
};
