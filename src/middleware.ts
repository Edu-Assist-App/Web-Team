import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List all supported locales
export const supportedLocales = [
  "amh",
  "oro",
  "tig",
  "en",
  "fr",
  "es",
  "ar",
  "zh",
];

// Define protected routes (without locale prefix)
// const protectedRoutes = [];
const protectedRoutes = ["/dashboards", "/materialss"];

const intlMiddleware = createIntlMiddleware({
  locales: supportedLocales,
  defaultLocale: "en",
  localePrefix: "always",
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const response = intlMiddleware(request);

  const localeMatch = pathname.match(/^\/(amh|oro|tig|en|fr|es|ar|zh)(\/|$)/);
  const locale = localeMatch?.[1];

  const pathWithoutLocale = pathname.replace(
    /^\/(amh|oro|tig|en|fr|es|ar|zh)/,
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

    // console.log("Token in middleware:", token);

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
