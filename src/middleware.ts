// src/middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
<<<<<<< HEAD
  locales: ["en", "fr", "amh", "tig", "afan"], // Supported locales
=======
  locales: ["en", "fr", "amh", "tig", , "afan"], // Supported locales
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34
  defaultLocale: "en",
  localePrefix: "always", // Ensures URLs always include the locale
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
