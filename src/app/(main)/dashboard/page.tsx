import { StatsCard } from "../../components/dashboard/stats-card";
import { ActivityChart } from "../../components/dashboard/activity-chart";
import { StudyMaterialsSection } from "../../components/dashboard/study-materials-section";
import { RecommendedSection } from "../../components/dashboard/recommended-section";
import { SearchBar } from "../../components/dashboard/search-bar";
import CtaCard from "@/app/components/cards/CtaCard";

export default function DashboardPage() {
  const cardContent = {
    title: "Own Your Progress. Dominate Your Goals",
    description:
      "Keep up the momentum! Continue your learning journey by finishing the resources you’ve started.",
    imageUrl: "/graduation-cap.png",
  };
  return (
    <div className="container mx-auto px-12 py-12 space-y-8">
      {/* Hero Section */}

      <CtaCard {...cardContent} />

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard value="20+" label="Resources Generated" />
        <StatsCard value="13+" label="Quizzes Generated" />
        <StatsCard value="10+" label="Flashcards Generated" />
        <StatsCard value="28" label="Days Active" />
      </div>

      {/* Activities Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Activities</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityChart />
          <div className="bg-white rounded-lg border p-6">
            {/* Empty chart placeholder for second activity chart */}
          </div>
        </div>
      </div>

      {/* Study Materials Section */}
      <StudyMaterialsSection />

      {/* Search Bar */}
      <SearchBar />

      {/* Recommended Section */}
      <RecommendedSection />

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
          LoadMore
        </button>
      </div>
    </div>
  );
}
