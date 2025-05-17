import { StatsCard } from "../../components/dashboard/stats-card";
import { ActivityChart } from "../../components/dashboard/activity-chart";
import { StudyMaterialsSection } from "../../components/dashboard/study-materials-section";
import { RecommendedSection } from "../../components/dashboard/recommended-section";
import { SearchBar } from "../../components/dashboard/search-bar";
import CtaCard from "@/app/[locale]/components/cards/CtaCard";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
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
  console.log("Card Content:", cardContent);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Hero Section */}
      <CtaCard {...cardContent} />

      {/* Stats Section
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard value="20+" label={t("stats.resourcesGenerated") || ""} />
        <StatsCard value="13+" label={t("stats.quizzesGenerated")} />
        <StatsCard value="10+" label={t("stats.flashcardsGenerated")} />
        <StatsCard value="28" label={t("stats.daysActive")} />
      </div> */}

      {/* Activities Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">{t("sections.activities")}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityChart />
          <div className="bg-white rounded-lg border p-6">
            {/* Empty chart placeholder */}
          </div>
        </div>
      </div>

      {/* Study Materials Section
      <StudyMaterialsSection
        recentTitle={t("studyMaterials.recent") || ""}
        savedTitle={t("studyMaterials.saved")}
        viewAllText={t("studyMaterials.viewAll")}
      />

      {/* Search Bar */}
      {/* <SearchBar placeholder={t("search.placeholder")} /> */}

      {/* Recommended Section */}
      {/* <RecommendedSection
        basedOnActivity={t("recommended.basedOnActivity")}
        newResources={t("recommended.newResources")}
      />  */}

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
          {t("buttons.loadMore")}
        </button>
      </div>
    </div>
  );
}
