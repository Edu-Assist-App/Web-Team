import { StudyMaterialCard } from "@/app/components/study-material-card"
import Link from "next/link"

const studyMaterials = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of machine learning.",
    image: "/study-materials/google-analytics.png",
  },
  {
    id: 2,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of machine learning.",
    image: "/study-materials/data-literacy.png",
  },
  {
    id: 3,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of machine learning.",
    image: "/study-materials/excel-chart.png",
  },
  {
    id: 4,
    title: "Introduction to Machine Learning",
    description: "Understand the fundamentals of machine learning.",
    image: "/study-materials/machine-learning.png",
  },
]

export function StudyMaterialsSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Study Materials</h2>
        <Link href="/study-materials" className="text-sm text-gray-600 hover:underline">
          View All
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
  )
}
