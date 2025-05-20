"use client";
import { StudyMaterialCard } from "@/app/[locale]/components/study-material-card";
import { useTranslations } from "next-intl";
import Link from "next/link";

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

export function StudyMaterialsSection() {
  const t = useTranslations("Dashboard");
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">{t("sections.studyMaterials")}</h2>
        <Link
          href="/study-materials"
          className="text-sm text-gray-700 underline hover:text-gray-900"
        >
          {t("studyMaterials.viewAll")}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {studyMaterials.map((material) => (
          <StudyMaterialCard
            key={material.id}
            id={material.id}
            title={material.title}
            description={material.description}
            image={material.image}
          />
        ))}
      </div>
    </div>
  );
}
