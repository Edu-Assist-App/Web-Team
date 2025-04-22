import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StudyMaterialCard } from "@/components/study-material-card";

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

export function ResourcePage() {
  return (
    <div className="flex flex-col items-start gap-6 px-4 md:pl-9 md:pr-24 py-9 w-full">
      {/* Banner */}
      <Card className="flex flex-col md:flex-row items-center gap-8 p-4 md:p-8 w-full bg-[#f9f9f9] rounded-xl">
        <div className="flex items-center justify-center gap-2 px-6 py-[22px] bg-white rounded-[99px]">
          <img
            className="w-12 md:w-16 h-12 md:h-16 object-cover"
            alt="Puzzle"
            src="/puzzle-1.png"
          />
        </div>

        <CardContent className="flex flex-col items-start gap-2 p-0 flex-1 text-center md:text-left">
          <h2 className="font-['Ubuntu',Helvetica] font-medium text-[#090218] text-2xl md:text-[28px]">
            Unlock Your Full Learning Potential
          </h2>
          <p className="font-['Poppins',Helvetica] font-normal text-[#090218] text-sm">
            Access your notes, flashcards, and quizzes—all in one place. Stay
            organized, learn smarter, and track your progress effortlessly.
          </p>
        </CardContent>
      </Card>

      {/* Study Materials header */}
      <div className="flex items-center justify-between px-3 py-0 w-full">
        <h3 className="font-['Ubuntu',Helvetica] font-medium text-[#040303] text-lg">
          Your Study Materials
        </h3>

        <Button
          variant="outline"
          className="flex items-center gap-[6.62px] px-6 py-2 rounded-[99px] border-[1.5px] border-[#3800b3]"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="font-['Poppins',Helvetica] font-medium text-black text-xs">
            Refresh
          </span>
        </Button>
      </div>

      {/* Study Materials cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-8 p-2 w-full">
        {studyMaterials.map((material) => (
          <StudyMaterialCard key={material.id} {...material} />
        ))}
      </div>

      {/* Load more button */}
      <div className="flex items-center justify-center w-full">
        <Button
          variant="outline"
          className="px-6 py-2 rounded-[99px] border-[1.5px] border-[#3800b3] font-['Poppins',Helvetica] font-medium text-xs"
        >
          Load more
        </Button>
      </div>
    </div>
  );
}