// src/middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fr", "amh", "tig", "afan"], // Supported locales
  defaultLocale: "en",
  localePrefix: "always", // Ensures URLs always include the locale
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
