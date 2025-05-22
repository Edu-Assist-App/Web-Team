"use client";
import { RefreshCw } from "lucide-react";
import { Button } from "@/app/[locale]/components/ui/button";
import { Card, CardContent } from "@/app/[locale]/components/ui/card";
import { StudyMaterialCard } from "@/app/[locale]/components/study-material-card";
import CtaCard from "../cards/CtaCard";
import { useTranslations } from "next-intl";
import ShimmerCourse from "../cards/ShimmerCourse";
import { StudyMaterialsSection } from "../dashboard/study-materials-section";
import { useEffect, useState } from "react";

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
  const [studyMaterials, setStudyMaterials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setStudyMaterials([
        {
          id: 1,
          title: "Introduction to Machine Learning",
          description: "Understand the fundamentals of machine learning.",
          image: "/movie-card.png",
        },
        {
          id: 2,
          title: "Advanced Data Structures",
          description: "Explore complex data structures and algorithms.",
          image: "/movie-card-1.png",
        },
        {
          id: 3,
          title: "Web Development Basics",
          description: "Learn the basics of web development.",
          image: "/movie-card-2.png",
        },
        {
          id: 4,
          title: "Introduction to AI",
          description: "Discover the world of artificial intelligence.",
          image: "/movie-card-3.png",
        },
      ]);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {/* Study Materials header */}
      <CtaCard {...cardContent} />

      {/* Study Materials cards */}
      <div className="flex items-center justify-between px-3 py-0 w-full mb-4">
        <h2 className="text-xl font-medium">{t("sections.title1")}</h2>

        <button className="flex items-center gap-[6.62px] px-6 py-2 rounded-[99px] border-[1.5px] border-[#3800b3]">
          <RefreshCw className="w-4 h-4" />
          <span className="font-['Poppins',Helvetica] font-medium text-black text-xs">
            {t("buttons.refresh")}
          </span>
        </button>
      </div>
      {isLoading ? (
        <div className="flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-4 scrollbar-hide md:grid md:grid-cols-2 md:gap-6 md:space-x-0 md:pb-0 md:overflow-x-visible md:flex-wrap lg:grid-cols-2 xl:grid-cols-4">
          <ShimmerCourse />
          <ShimmerCourse />
          <ShimmerCourse />
          <ShimmerCourse />
        </div>
      ) : (
        <StudyMaterialsSection studyMaterials={studyMaterials} />
      )}

      {/* Load more button */}
      <div className="flex items-center justify-center w-full">
        <Button
          variant="outline"
          className="px-6 py-2 rounded-[99px] border-[1.5px] border-[#3800b3] font-['Poppins',Helvetica] font-medium text-xs"
        >
          {t("buttons.loadMore")}
        </Button>
      </div>
    </>
  );
}
