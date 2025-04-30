import CtaCard from "@/app/components/cards/CtaCard";
import RichTextChapter from "@/app/components/course/RichText";
import React from "react";

export default function page() {
  const cardContent = {
    title: "Chapter 1: What is Data Science?",
    description:
      "Explore the foundations of data science, its role in the modern world, and how data is used to solve real-life problems.",
    imageUrl: "/chapter.svg",
    noChapter: false,
    chapters: 5,
    progress: 75,
    haveProgress: true,
  };
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Course Header */}
        <CtaCard {...cardContent} />

        <RichTextChapter />
      </div>
    </div>
  );
}
