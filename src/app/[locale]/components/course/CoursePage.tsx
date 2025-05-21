"use client";

import { useRef } from "react";
import { Clock, Lock } from "lucide-react";
import { Card } from "@/app/[locale]/components/ui/card";
import { Progress } from "@/app/[locale]/components/ui/progress";
import { Button } from "@/app/[locale]/components/ui/button";
import CtaCard from "../cards/CtaCard";
import CardMaterial from "../cards/CardMaterial";
import Link from "next/link";

export default function CoursePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  const cardContent = {
    title: "Introduction to Data Science with Python",
    description:
      "A beginner-focused guide to understanding the fundamentals of data science using Python, with real-world examples.",
    imageUrl: "/educate.svg",
    haveProgress: true,
    chapters: 3,
    progress: 0,
  };
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
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Course Header */}
        <CtaCard {...cardContent} />

        {/* Study Materials */}
        <div>
          <h2 className="text-xl font-bold mb-4">Study Materials</h2>

          <div className="relative">
            {/* Mobile scroll buttons */}
            <div className="md:hidden flex justify-between absolute -top-10 right-0 space-x-2">
              <button
                onClick={scrollLeft}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Scrollable container */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-4 gap-4 snap-x scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {cardData.map((data, index) => (
                <CardMaterial key={index} {...data} />
              ))}
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div>
          <h2 className="text-xl font-bold mb-4">Chapters (3)</h2>

          {/* Chapter 1 */}
          <div className="bg-[#f8f8f8] rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 mb-4">
            <div className="bg-white rounded-full p-4 h-20 w-20 flex items-center justify-center flex-shrink-0">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="8"
                  y="4"
                  width="24"
                  height="32"
                  rx="2"
                  fill="#DBEAFE"
                />
                <path
                  d="M12 10H28M12 16H24M12 22H28M12 28H20"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect
                  x="4"
                  y="10"
                  width="4"
                  height="20"
                  rx="1"
                  fill="#3B82F6"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">
                Chapter 1: What is Data Science?
              </h2>
              <p className="text-gray-600 mb-4">
                Explore the foundations of data science, its role in the modern
                world, and how data is used to solve real-life problems.
              </p>

              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Estimated Time: ~45 minutes</span>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Progress</div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={100}
                    className="h-2 flex-1"
                    indicatorColor="bg-[#3900B3]"
                  />
                  <span className="text-sm font-medium">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="bg-[#f8f8f8] rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 mb-4">
            <div className="bg-white rounded-full p-4 h-20 w-20 flex items-center justify-center flex-shrink-0">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="8"
                  y="4"
                  width="24"
                  height="32"
                  rx="2"
                  fill="#DBEAFE"
                />
                <path
                  d="M12 10H28M12 16H24M12 22H28M12 28H20"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect
                  x="4"
                  y="10"
                  width="4"
                  height="20"
                  rx="1"
                  fill="#3B82F6"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">
                Chapter 2: Python Basics for Data Science
              </h2>
              <p className="text-gray-600 mb-4">
                Learn essential Python skills including variables, data types,
                and control flow — all tailored for data science beginners.
              </p>

              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Estimated Time: ~60 minutes</span>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Progress</div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={80}
                    className="h-2 flex-1"
                    indicatorColor="bg-[#3900B3]"
                  />
                  <span className="text-sm font-medium">80%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 3 (Locked) */}
          <div className="bg-gray-800 text-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
            <div className="bg-gray-700 rounded-full p-4 h-20 w-20 flex items-center justify-center flex-shrink-0">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="8"
                  y="4"
                  width="24"
                  height="32"
                  rx="2"
                  fill="#1F2937"
                />
                <path
                  d="M12 10H28M12 16H24M12 22H28M12 28H20"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect
                  x="4"
                  y="10"
                  width="4"
                  height="20"
                  rx="1"
                  fill="#9CA3AF"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">
                Chapter 3: Data Wrangling & Cleaning
              </h2>
              <p className="text-gray-400 mb-4">
                Dive into the process of preparing messy data for analysis using
                libraries like Pandas and NumPy.
              </p>

              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  Estimated Time: ~70 minutes
                </span>
              </div>

              <div className="relative">
                <div className="absolute -right-2 -top-10 md:right-0 md:top-1/2 md:-translate-y-1/2 z-10">
                  <div className="bg-white rounded-full p-4 shadow-lg">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="10"
                        y="10"
                        width="20"
                        height="20"
                        rx="10"
                        fill="#FEF08A"
                      />
                      <path
                        d="M15 20H25M20 15V25"
                        stroke="#EAB308"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <Lock className="h-4 w-4" />
                  <span>Locked (Unlocks after completing Chapter 2)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
