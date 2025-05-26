import { StudyMaterialCard } from "@/app/[locale]/components/study-material-card";

const recommendedMaterials = [
  {
    id: 5,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of machine learning.",
    image: "/study-materials/google-analytics.png",
  },
  {
    id: 6,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of machine learning.",
    image: "/study-materials/data-literacy.png",
  },
  {
    id: 7,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of machine learning.",
    image: "/study-materials/excel-chart.png",
  },
  {
    id: 8,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of machine learning.",
    image: "/study-materials/machine-learning.png",
  },
];

export function RecommendedSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recommended For You</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {recommendedMaterials.map((material) => (
          <StudyMaterialCard
            key={material.id}
            id={material.id.toString()}
            title={material.title}
            description={material.description}
            image={material.image}
          />
        ))}
      </div>
    </div>
  );
}
