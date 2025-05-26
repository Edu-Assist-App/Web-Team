"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CtaCard from "../cards/CtaCard";
import CardMaterial from "../cards/CardMaterial";
import ShimmerCta from "../cards/ShimmerCta";
import ChaptersShimmer from "../cards/ChaptersShimmer";
import ShimmerCard from "../cards/ShimmerCard";

export default function CoursePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [learningPath, setLearningPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState<
    Record<number, boolean>
  >({});

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
    setTimeout(() => {
      const mockData = [
        {
          materialTitle: "Introduction to Data Science with Python",
          materialDescription:
            "A beginner-focused guide to understanding the fundamentals of data science using Python, with real-world examples.",
          progress: 0,
          chapters: [
            {
              title: "Chapter 1: What is Data Science?",
              description:
                "Explore the foundations of data science, its role in the modern world, and how data is used to solve real-life problems.",
            },
            {
              title: "Chapter 2: Python Basics for Data Science",
              description:
                "Learn essential Python skills including variables, data types, and control flow — all tailored for data science beginners.",
            },
            {
              title: "Chapter 3: Data Wrangling & Cleaning",
              description:
                "Dive into the process of preparing messy data for analysis using libraries like Pandas and NumPy.",
            },
          ],
        },
      ];
      setLearningPath(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const cardData = [
    {
      title: "Note",
      description: "A beginner-focused ",
      imageUrl: "/note.svg",
      url: "/note",
      status: true,
    },
    {
      title: "Quize",
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
      {loading ? (
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
          {loading ? (
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-4 gap-4 snap-x scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-4 gap-4 snap-x scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {cardData.map((data, index) => (
                <CardMaterial key={index} {...data} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chapters Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Chapters {`(${!loading ? learningPath[0].chapters.length : 0})`}
        </h2>
        {loading ? (
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
