"use client";

import { useMemo, useCallback, memo, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  BookOpenIcon,
  HomeIcon,
  MessageSquareIcon,
  PlusIcon,
  SettingsIcon,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  GlobeIcon,
  ChevronDown,
  Search,
  Check,
} from "lucide-react";
import { Button } from "@/app/[locale]/components/ui/button";
import { signOut } from "next-auth/react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  icon: JSX.Element;
  path: string;
  matchPattern: string;
}

export const Sidebar = memo(function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const locale = useLocale();
  const t = useTranslations("Sidebar");
  const s = useTranslations("Header");
  const [collapsed, setCollapsed] = useState(false);
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  // Remove locale prefix from current path for language switching
  const pathWithoutLocale = pathname.startsWith(`/${currentLocale}`)
    ? pathname.slice(currentLocale.length + 1) || "/"
    : pathname || "/";

  // Memoize the locale path helper
  const withLocale = useCallback(
    (path: string) =>
      path.startsWith(`/${locale}`) ? path : `/${locale}${path}`,
    [locale]
  );
  const languages = [
    {
      code: "amh",
      name: s("language.amharic"),
      shortName: s("language.amharicShort"),
    },
    {
      code: "en",
      name: s("language.english"),
      shortName: s("language.englishShort"),
    },
  ];
  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(languageSearchTerm.toLowerCase()) ||
      lang.shortName.toLowerCase().includes(languageSearchTerm.toLowerCase())
  );

  const handleLanguageChange = (newLocale: string) => {
    const url = new URL(window.location.href);
    const searchParams = url.search;
    const hash = url.hash;

    const newPath = `/${newLocale}${
      pathWithoutLocale === "/" ? "" : pathWithoutLocale
    }`;

    router.push(newPath + searchParams + hash);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  // Memoize the collapse toggle
  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  // Memoize navigation items
  const navItems = useMemo<NavItem[]>(
    () => [
      {
        name: t("navItems.dashboard"),
        icon: <HomeIcon className="w-[18px] h-[18px]" />,
        path: "/dashboard",
        matchPattern: "/dashboard",
      },
      {
        name: t("navItems.materials"),
        icon: <BookOpenIcon className="w-[18px] h-[18px]" />,
        path: "/resources",
        matchPattern: "/resource",
      },
      {
        name: t("navItems.youtube-chat"),
        icon: <MessageSquareIcon className="w-[18px] h-[18px]" />,
        path: "/youtube-chat",
        matchPattern: "/youtube-chat",
      },
      {
        name: t("navItems.settings"),
        icon: <SettingsIcon className="w-[18px] h-[18px]" />,
        path: "/settings",
        matchPattern: "/settings",
      },
      {
        name: t("navItems.logout"),
        icon: <LogOut className="w-[18px] h-[18px]" />,
        path: "/logout",
        matchPattern: "/logout",
      },
    ],
    [t]
  );

  // Optimized active path check
  const isActive = useCallback(
    (matchPattern: string) => {
      const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "");
      return pathWithoutLocale.startsWith(matchPattern);
    },
    [pathname, locale]
  );

  // Memoize the new module button click handler
  const handleNewModuleClick = useCallback(() => {
    router.push(withLocale("/materials"));
  }, [router, withLocale]);

  // Memoize rendered navigation items
  const renderedNavItems = useMemo(
    () =>
      navItems.map((item) => (
        <NavItemComponent
          key={item.path}
          item={item}
          isActive={isActive(item.matchPattern)}
          collapsed={isClient ? collapsed : false}
          withLocale={withLocale}
        />
      )),
    [navItems, isActive, collapsed, withLocale, isClient]
  );

  if (!isClient) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`absolute z-[52] lg:sticky top-0 lg:flex flex-col h-screen items-start gap-8 p-8 ${
          isClient && collapsed ? "px-4" : "px-8"
        } bg-white border-r border-gray-100 z-50 transition-all duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ width: isClient && collapsed ? "80px" : "300px" }}
      >
        {/* <MobileCloseButton onClose={onClose} t={t} /> */}

        <LogoSection
          collapsed={isClient ? collapsed : false}
          t={t}
          toggleCollapse={toggleCollapse}
        />

        <Button
          onClick={handleNewModuleClick}
          className={`w-full bg-gradient-to-r p-5 from-purple-600 to-[#3800b3] hover:bg-indigo-800 rounded-full text-white font-medium text-sm ${
            isClient && collapsed ? "justify-center" : ""
          }`}
        >
          <div className="p-1 bg-white/20 rounded-full">
            <PlusIcon className="w-4 h-4" />
          </div>
          {!(isClient && collapsed) && t("buttons.newModule")}
        </Button>

        <nav className="flex flex-col items-start justify-center gap-2 w-full rounded">
          {!isClient && collapsed && (
            <div className="text-gray-500 text-sm font-medium mt-4">
              {t("quickNav")}
            </div>
          )}
          <div className="flex flex-col gap-1 items-start w-full rounded-lg">
            {renderedNavItems}
          </div>
        </nav>
      </aside>
    </>
  );
});

// Extracted NavItem component for better memoization
export const NavItemComponent = memo(function NavItemComponent({
  item,
  isActive,
  collapsed,
  withLocale,
}: {
  item: NavItem;
  isActive: boolean;
  collapsed: boolean;
  withLocale: (path: string) => string;
  isClient?: boolean;
}) {
  const router = useRouter();
  // console.log("item", item.path);
  return item.path != "/logout" ? (
    <Link
      prefetch={true}
      className={`w-full flex items-center gap-3 p-2 font-light rounded-[99px] transition-colors hover:bg-gray-50 ${
        isActive ? "bg-gray-100 shadow-sm" : "text-gray-600"
      } ${collapsed ? "justify-center" : "justify-start"}`}
      href={withLocale(item.path)}
      passHref
    >
      <div
        className={`flex items-center justify-center rounded-full p-2 ${
          isActive ? "bg-white border" : ""
        }`}
      >
        {item.icon}
      </div>
      {!collapsed && <span className="font-medium text-base">{item.name}</span>}
    </Link>
  ) : (
    <button
      onClick={() => {
        signOut({ callbackUrl: withLocale("/") });
        return;
      }}
      className={`w-full flex items-center gap-3 p-2 font-light rounded-[99px] transition-colors hover:bg-gray-50 ${
        isActive ? "bg-gray-100 shadow-sm" : "text-gray-600"
      } ${collapsed ? "justify-center" : "justify-start"}`}
    >
      <div
        className={`flex items-center justify-center rounded-full p-2 ${
          isActive ? "bg-white border" : ""
        }`}
      >
        {item.icon}
      </div>
      {!collapsed && <span className="font-medium text-base">{item.name}</span>}
    </button>
  );
});

// Extracted MobileCloseButton component
const MobileCloseButton = memo(function MobileCloseButton({
  onClose,
  t,
}: {
  onClose: () => void;
  t: any;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-6 right-6 md:hidden"
      onClick={onClose}
      aria-label={t("ariaLabels.close")}
    >
      <X className="h-5 w-5" />
    </Button>
  );
});

// Extracted LogoSection component
const LogoSection = memo(function LogoSection({
  collapsed,
  t,
  toggleCollapse,
}: {
  collapsed: boolean;
  t: any;
  toggleCollapse: () => void;
}) {
  return (
    <div className="flex-col justify-center gap-3 w-full flex items-center">
      <div
        className={`flex ${
          collapsed ? "flex-col" : ""
        } items-center justify-center gap-3`}
      >
        <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-full">
          <img
            className="min-w-6 min-h-6"
            alt={t("logoAlt")}
            src="/logo.svg"
            loading="lazy"
          />
        </div>
        <h1
          className={`${
            collapsed ? "hidden" : ""
          } font-medium text-gray-900 text-[28px] font-['Ubuntu',Helvetica] whitespace-nowrap`}
        >
          {t("brandName")}
        </h1>

        <Button
          variant="ghost"
          size="icon"
          className={`hidden md:flex bg-white border border-gray-200 hover:bg-gray-50 rounded-full ${
            !collapsed ? "p-[2px] mr-[-2px]" : "p-1"
          }`}
          onClick={toggleCollapse}
          aria-label={t("ariaLabels.collapse")}
        >
          {collapsed ? (
            <ChevronRight className={`${collapsed ? "h-4 w-4" : "h-2 w-2"}`} />
          ) : (
            <ChevronLeft className={`${collapsed ? "h-4 w-4" : "h-2 w-2"}`} />
          )}
        </Button>
      </div>
    </div>
  );
});
