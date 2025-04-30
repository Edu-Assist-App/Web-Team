// app/components/course/ChapterNavigation.tsx
"use client";

import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChapterNavigationProps {
  currentChapter: number;
  totalChapters: number;
  courseId: string;
}

export function ChapterNavigation({
  currentChapter,
  totalChapters,
  courseId,
}: ChapterNavigationProps) {
  const router = useRouter();

  const handleNavigation = (chapter: number) => {
    router.push(`/course/${courseId}/chapter/${chapter}`);
  };

  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={() => handleNavigation(currentChapter - 1)}
        disabled={currentChapter <= 1}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      <Button
        onClick={() => handleNavigation(currentChapter + 1)}
        disabled={currentChapter >= totalChapters}
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
