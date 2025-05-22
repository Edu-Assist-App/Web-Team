"use client";
import { StudyMaterialCard } from "@/app/[locale]/components/study-material-card";
import { RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface StudyMaterial {
  id: number;
  title: string;
  description: string;
  image: string;
}

export function StudyMaterialsSection({
  studyMaterials,
}: {
  studyMaterials: StudyMaterial[];
}) {
  return (
    <div>
      <div
        className="flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-4 scrollbar-hide md:grid md:grid-cols-2 md:gap-6 md:space-x-0 md:pb-0 md:overflow-x-visible md:flex-wrap lg:grid-cols-2 xl:grid-cols-4"
        role="region"
        aria-label="Study materials carousel"
      >
        {studyMaterials.map((material, index) => (
          <div
            key={index}
            className="flex-none min-w-[250px] snap-center md:min-w-0 md:w-full"
          >
            <StudyMaterialCard
              title={material.title || ""}
              description={material.description || ""}
              image={material.image || ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
