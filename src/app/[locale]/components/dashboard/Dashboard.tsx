"use client";
import React, { useEffect, useState } from "react";
import { StatsCard } from "../../components/dashboard/stats-card";
import { ActivityChart } from "../../components/dashboard/activity-chart";
import { StudyMaterialsSection } from "../../components/dashboard/study-materials-section";
import CtaCard from "@/app/[locale]/components/cards/CtaCard";
import { useTranslations } from "next-intl";
import ShimmerCourse from "../cards/ShimmerCourse";
import Link from "next/link";
import { listCourses } from "@/app/Services/api/course";
import { PieChart } from "recharts";

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
  const [isError, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchCourses = async () => {
      try {
        const data = await listCourses();
        console.log("Fetched courses:", data);
        setStudyMaterials(data);
      } catch (err) {
        setError("Failed to fetch courses");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []); // Dependency array is correctly placed here

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
          <PieChart />
        </div>
      </div>
      {/* Study Materials Section */}
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
          {Array.from({ length: 4 }).map((_, index) => (
            <ShimmerCourse key={index} />
          ))}
        </div>
      ) : (
        <StudyMaterialsSection studyMaterials={studyMaterials.slice(-4)} />
      )}
    </>
  );
}
