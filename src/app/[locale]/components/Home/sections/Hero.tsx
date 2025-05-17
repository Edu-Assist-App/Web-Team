import React from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { useTranslations } from "next-intl";

export const Hero = (): JSX.Element => {
  const t = useTranslations("HomePage.HeroSection");
  const features = [
    {
      icon: "/frame-3.svg",
      title: t("cards.card1.title"),
      gradient: "from-purple-500 to-blue-500",
    },
    {
      icon: "/frame-18.svg",
      title: t("cards.card2.title"),
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: "/frame-10.svg",
      title: t("cards.card3.title"),
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: "/frame-15.svg",
      title: t("cards.card4.title"),
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden ">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl mix-blend-multiply animate-pulse-slow" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl mix-blend-multiply animate-pulse-slow delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl mix-blend-multiply animate-pulse-slow delay-2000" />
      </div>

      <div className="relative flex flex-col items-center justify-center w-full gap-8 py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Hero content */}
        <div className="flex flex-col w-full lg:w-[833px] items-center justify-center gap-6 z-10">
          {/* Badge */}
          <Badge className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm hover:bg-white transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
              <span className="text-xs font-medium text-gray-800">
                {t("topTag")}
              </span>
            </div>
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-900 leading-tight">
            {t.rich("headline", {
              span1: (children) => (
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-[#3800b3]">
                  {children}
                </span>
              ),
              span2: (children) => (
                <span className="text-gray-900">{children}</span>
              ),
            })}
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-center text-gray-600 max-w-2xl">
            {t("subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button className="px-8 py-4 rounded-full bg-gradient-to-r  from-purple-500 to-[#3800b3] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
              {t("cta1")} →
            </Button>

            <Button
              variant="outline"
              className="px-6 py-3.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <img
                    className="w-3 h-3"
                    alt="Demo icon"
                    src="/frame-29.svg"
                  />
                </div>
                <span className="font-medium text-gray-800">{t("cta2")}</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Features grid - Visible on tablet and desktop */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mt-12 z-10">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
              />
              <CardContent className="p-6 flex flex-col items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-sm`}
                >
                  <img
                    className="w-6 h-6"
                    alt={feature.title}
                    src={feature.icon}
                  />
                </div>
                <h3 className="text-lg font-medium text-center text-gray-800">
                  {feature.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Features List */}
        <div className="grid grid-cols-2 gap-4 md:hidden w-full z-10">
          {features.map((feature, index) => (
            <Card
              key={`mobile-${index}`}
              className="relative overflow-hidden rounded-xl border border-gray-200/50 bg-white/90 backdrop-blur-sm"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10`}
              />
              <CardContent className="p-4 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                >
                  <img
                    className="w-4 h-4"
                    alt={feature.title}
                    src={feature.icon}
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  {feature.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
