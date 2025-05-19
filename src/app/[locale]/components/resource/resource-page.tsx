"use client";
import { RefreshCw } from "lucide-react";
import { Button } from "@/app/[locale]/components/ui/button";
import { Card, CardContent } from "@/app/[locale]/components/ui/card";
import { StudyMaterialCard } from "@/app/[locale]/components/study-material-card";
<<<<<<< HEAD
import CtaCard from "../cards/CtaCard";
import { useTranslations } from "next-intl";
=======
>>>>>>> c4b22272a75778879fd429e93145139fe4286b34

const studyMaterials = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of machine learning,",
    image: "/movie-card.png",
  },
  {
    id: 2,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of machine learning,",
    image: "/movie-card-1.png",
  },
  {
    id: 3,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of machine learning,",
    image: "/movie-card-2.png",
  },
  {
    id: 4,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of machine learning,",
    image: "/movie-card-3.png",
  },
];

export function ResourcePage() {
  const t = useTranslations("Resources"); // Using Resource translations from your JSON

  const cardContent = {
    title: t("ctaCard.title"), // "Own Your Progress. Dominate Your Goals"
    description: t("ctaCard.description"), // "Keep up the momentum! Continue your learning journey..."
    imageUrl: "/puzzle.svg",
    haveProgress: false,
    chapters: 3,
    progress: 0,
  };
  return (
    <div className="flex flex-col items-start gap-6 px-4 md:pl-9 md:pr-24 py-9 w-full">
      {/* Study Materials header */}
      <CtaCard {...cardContent} />
      <div className="flex items-center justify-between px-3 py-0 w-full">
        <h3 className="font-['Ubuntu',Helvetica] font-medium text-[#040303] text-lg">
          {t("sections.title1")}
        </h3>

        <Button
          variant="outline"
          className="flex items-center gap-[6.62px] px-6 py-2 rounded-[99px] border-[1.5px] border-[#3800b3]"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="font-['Poppins',Helvetica] font-medium text-black text-xs">
            {t("buttons.refresh")}
          </span>
        </Button>
      </div>

      {/* Study Materials cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-8 p-2 w-full">
        {studyMaterials.map((material) => (
          <StudyMaterialCard key={material.id} {...material} />
        ))}
      </div>

      {/* Load more button */}
      <div className="flex items-center justify-center w-full">
        <Button
          variant="outline"
          className="px-6 py-2 rounded-[99px] border-[1.5px] border-[#3800b3] font-['Poppins',Helvetica] font-medium text-xs"
        >
          {t("buttons.loadMore")}
        </Button>
      </div>
    </div>
  );
}
