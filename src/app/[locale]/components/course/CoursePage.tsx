"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import CtaCard from "../cards/CtaCard";
import CardMaterial from "../cards/CardMaterial";
import ShimmerCta from "../cards/ShimmerCta";
import ChaptersShimmer from "../cards/ChaptersShimmer";
import ShimmerCard from "../cards/ShimmerCard";
import {
  getCourseLearningPathOutline,
  getLearningPathByCourseId,
} from "@/app/Services/api/learningPath";

export default function CoursePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [learningPath, setLearningPath] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState<
    Record<number, boolean>
  >({});

  const { id } = useParams() as { id: string }; // ✅ Extract from URL

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  const toggleChapter = (index: number) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await getCourseLearningPathOutline(id);
        console.log("Materials  Data:", data);
        setLearningPath([data]);
      } catch (error) {
        console.error("Failed to fetch learning path:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const cardData = [
    {
      title: "Note",
      description: "A beginner-focused ",
      imageUrl: "/note.svg",
      url: "/note",
      status: false,
    },
    {
      title: "Quiz",
      description: "A beginner-focused ",
      imageUrl: "/quize.svg",
      url: "/quiz",
      status: false,
    },
    {
      title: "FlashCards",
      description: "A beginner-focused ",
      imageUrl: "/flashcard.svg",
      url: "/flashcards",
      status: false,
    },
    {
      title: "Q&A",
      description: "A beginner-focused ",
      imageUrl: "/q&a.svg",
      url: "/",
      status: false,
    },
  ];

  return (
    <>
      {/* Header */}
      {loading || !learningPath[0] ? (
        <ShimmerCta />
      ) : (
        <CtaCard
          title={learningPath[0].materialTitle}
          description={learningPath[0].materialDescription}
          imageUrl="/educate.svg"
          haveProgress={true}
          chapters={learningPath[0].chapters.length}
          progress={learningPath[0].progress}
        />
      )}

      {/* Study Materials */}
      <div>
        <h2 className="text-xl font-bold mb-4">Materials</h2>
        <div className="relative">
          <div className="md:hidden flex justify-between absolute -top-10 right-0 space-x-2">
            <button
              onClick={scrollLeft}
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              ←
            </button>
            <button
              onClick={scrollRight}
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              →
            </button>
          </div>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 gap-4 snap-x scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading
              ? [1, 2, 3, 4].map((i) => <ShimmerCard key={i} />)
              : cardData.map((data, index) => (
                  <CardMaterial
                    key={index}
                    id={index}
                    {...data}
                    courseData={learningPath}
                  />
                ))}
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Chapters (
          {!loading && learningPath[0] ? learningPath[0].chapters.length : 0})
        </h2>
        {loading || !learningPath[0] ? (
          <ChaptersShimmer />
        ) : (
          <div>
            {learningPath[0].chapters.map((chapter, index) => {
              const isOpen = expandedChapters[index];

              return (
                <div
                  key={index}
                  className="bg-[#f8f8f8] rounded-xl p-4 shadow-sm mb-4"
                >
                  <button
                    onClick={() => toggleChapter(index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-semibold">
                      {chapter.title}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="mt-2 text-gray-600">
                      {chapter.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
