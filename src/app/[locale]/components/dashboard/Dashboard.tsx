"use client";
import React, { useEffect, useState } from "react";
import { StatsCard } from "../../components/dashboard/stats-card";
import { ActivityChart } from "../../components/dashboard/activity-chart";
import { StudyMaterialsSection } from "../../components/dashboard/study-materials-section";
import CtaCard from "@/app/[locale]/components/cards/CtaCard";
import { useTranslations } from "next-intl";
import ShimmerCourse from "../cards/ShimmerCourse";
import Link from "next/link";

export default function Dashboard() {
  const t = useTranslations("Dashboard");

  const cardContent = {
    title: t("ctaCard.title"),
    description: t("ctaCard.description"),
    imageUrl: "/graduation-cap.png",
    haveProgress: false,
    noChapter: false,
    chapters: 0,
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
      {/* Hero Section */}
      <CtaCard {...cardContent} />
      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard value="20+" label={t("stats.resourcesGenerated") || ""} />
        <StatsCard value="13+" label={t("stats.quizzesGenerated")} />
        <StatsCard value="10+" label={t("stats.flashcardsGenerated")} />
        <StatsCard value="28" label={t("stats.daysActive")} />
      </div>
      {/* Activities Section */}
      <div>
        <h2 className="text-xl font-medium mb-4">{t("sections.activities")}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityChart />
          <ActivityChart />
        </div>
      </div>
      {/* {/* Study Materials Section */}
      <div className="flex items-center justify-between px-3 py-0 w-full mb-4">
        <h2 className="text-xl font-medium">{t("sections.studyMaterials")}</h2>

        <Link
          href="/resources"
          className="text-sm text-gray-700 underline hover:text-gray-900"
        >
          {t("studyMaterials.viewAll")}
        </Link>
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
    </>
  );
}
