import React from "react";
import { Card, CardContent } from "../../ui/card";
import { useTranslations } from "next-intl";

export const Features = (): JSX.Element => {
  const t = useTranslations("HomePage.FeaturesSection");

  const features = [
    {
      id: 1,
      title: t("features.aiChatbot.title"),
      description: t("features.aiChatbot.description"),
      iconSrc: "/frame-3.svg",
      accentColor: "from-blue-100 to-blue-50", // Soft blue gradient
      borderColor: "border-blue-200",
    },
    {
      id: 2,
      title: t("features.fileManagement.title"),
      description: t("features.fileManagement.description"),
      iconSrc: "/frame-3.svg",
      accentColor: "from-purple-100 to-purple-50", // Soft purple gradient
      borderColor: "border-purple-200",
    },
    {
      id: 3,
      title: t("features.aiMaterials.title"),
      description: t("features.aiMaterials.description"),
      iconSrc: "/frame-3.svg",
      accentColor: "from-teal-100 to-teal-50", // Soft teal gradient
      borderColor: "border-teal-200",
    },
    {
      id: 4,
      title: t("features.learningPaths.title"),
      description: t("features.learningPaths.description"),
      iconSrc: "/frame-3.svg",
      accentColor: "from-amber-100 to-amber-50", // Soft amber gradient
      borderColor: "border-amber-200",
    },
    {
      id: 5,
      title: t("features.progressTracking.title"),
      description: t("features.progressTracking.description"),
      iconSrc: "/frame-3.svg",
      accentColor: "from-indigo-100 to-indigo-50", // Soft indigo gradient
      borderColor: "border-indigo-200",
    },
  ];

  return (
    <section className="w-full px-4 py-16 sm:px-8 sm:py-24 lg:px-16 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-medium text-center mb-12 sm:mb-16 text-gray-900">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className={`rounded-xl border ${feature.borderColor} bg-white backdrop-blur-sm transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden group`}
          >
            <CardContent className="p-6 flex flex-col items-center h-full">
              <div
                className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.accentColor} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}
              >
                <img
                  className="w-6 h-6"
                  alt="Feature icon"
                  src={feature.iconSrc}
                />
              </div>

              <div className="text-center space-y-3">
                <h3 className="text-xl font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
