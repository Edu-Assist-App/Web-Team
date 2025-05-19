"use client";

import CtaCard from "@/app/[locale]/components/cards/CtaCard";
import { NewMaterialForm } from "../new-material/new-material-form";
import { useTranslations } from "next-intl";

export default function Materials() {
  const t = useTranslations("Materials"); // Using Resource translations from your JSON

  const cardContent = {
    title: t("ctaCard.title"), // "Own Your Progress. Dominate Your Goals"
    description: t("ctaCard.description"), // "Keep up the momentum! Continue your learning journey..."
    imageUrl: "/puzzle.svg",
    haveProgress: false,
    chapters: 3,
    progress: 0,
  };

  return (
    <div className="container w-[70%] mx-auto p-12 max-w-4xl flex flex-col gap-6">
      {/* Header Section */}
      <CtaCard {...cardContent} />

      {/* Form Section */}
      <NewMaterialForm
      // title={t("buttons.newModule")} // "New Module" from Sidebar translations
      // Add any other translations needed for the form
      />
    </div>
  );
}
