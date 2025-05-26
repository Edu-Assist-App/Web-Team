"use client";
import { RefreshCw } from "lucide-react";
import { Button } from "@/app/[locale]/components/ui/button";
import { StudyMaterialCard } from "@/app/[locale]/components/study-material-card";
import CtaCard from "../cards/CtaCard";
import { useTranslations } from "next-intl";
import ShimmerCourse from "../cards/ShimmerCourse";
import { StudyMaterialsSection } from "../dashboard/study-materials-section";
import { useEffect, useState } from "react";
import { listCourses } from "@/app/Services/api/course";

export function ResourcePage() {
  const t = useTranslations("Resources");

  const cardContent = {
    title: t("ctaCard.title"),
    description: t("ctaCard.description"),
    imageUrl: "/puzzle.svg",
    haveProgress: false,
    chapters: 3,
    progress: 0,
  };

  const [studyMaterials, setStudyMaterials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const fetchCourses = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await listCourses();
      // Sort by most recent (assuming data has a 'createdAt' or 'id')
      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setStudyMaterials(sorted);
    } catch (err) {
      setError("Failed to fetch courses");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleRefresh = () => {
    setPage(1);
    fetchCourses();
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const paginatedMaterials = studyMaterials.slice(0, page * itemsPerPage);

  return (
    <>
      <CtaCard {...cardContent} />

      {/* Header with Refresh */}
      <div className="flex items-center justify-between px-3 py-0 w-full mb-4">
        <h2 className="text-xl font-medium">{t("sections.title1")}</h2>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-[6.62px] px-6 py-2 rounded-[99px] border-[1.5px] border-[#3800b3]"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="font-['Poppins',Helvetica] font-medium text-black text-xs">
            {t("buttons.refresh")}
          </span>
        </button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ShimmerCourse key={index} />
          ))}
        </div>
      ) : (
        <StudyMaterialsSection studyMaterials={paginatedMaterials} />
      )}

      {/* Load More button */}
      {!isLoading && paginatedMaterials.length < studyMaterials.length && (
        <div className="flex items-center justify-center w-full mt-6">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="px-6 py-2 rounded-[99px] border-[1.5px] border-[#3800b3] font-['Poppins',Helvetica] font-medium text-xs"
          >
            {t("buttons.loadMore")}
          </Button>
        </div>
      )}
    </>
  );
}
