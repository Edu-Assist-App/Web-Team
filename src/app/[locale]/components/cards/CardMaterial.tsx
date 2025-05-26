"use client";

import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  generateContent,
  GenerateContentPayload,
  GeneratedContent,
} from "@/app/Services/api/content";

type CardMaterial = {
  id?: number;
  status?: boolean;
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  courseData: any; // ideally should be properly typed
};

export default function CardMaterial({
  id,
  status = false,
  title = "Create your first study material now!",
  description = "Create your first study material now!",
  imageUrl = "/puzzle-icon.png",
  url = "/",
  courseData,
}: CardMaterial) {
  const router = useRouter();
  const params = useParams();

  const goTo = async () => {
    const quizParameters: GenerateContentPayload = {
      content_type: "quiz",
      parameters: {
        topic: courseData.materialTitle,
        difficulty: "beginner",
        num_questions: 5,
        question_types: ["multiple_choice", "true_false"],
      },
      provider: "gemini",
    };

    const flashcardParameters: GenerateContentPayload = {
      content_type: "flashcard",
      parameters: {
        topic: courseData.materialTitle,
        num_cards: 10,
        difficulty: "intermediate",
        include_examples: true,
      },
      provider: "gemini",
    };

    let data: GeneratedContent;
    let url: string;

    if (id === 1) {
      data = await generateContent(quizParameters);
      url = "quiz";
    } else if (id === 2) {
      data = await generateContent(flashcardParameters);
      url = "flashcards";
    }

    console.log("Generated Content:", data);
    router.push(`/materials/${params.id}/${url}?id=${data.id}`);
  };

  return (
    <div className="min-w-[calc(50%-8px)] sm:min-w-[calc(50%-8px)] md:min-w-[calc(33.333%-16px)] lg:min-w-[calc(25%-16px)] snap-start">
      <Card className="relative overflow-hidden border border-gray-200 h-full">
        <div className="absolute top-2 left-2 rounded-full">
          <span
            className={`${
              status ? "bg-green-500" : "bg-gray-50"
            } text-xs px-3 py-2 rounded-md ${
              status ? "text-white" : "text-black"
            }`}
          >
            {status ? "Ready" : "Not Generated"}
          </span>
        </div>
        <div className="p-6 pt-10 flex flex-col items-center text-center h-full">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <Image
              src={imageUrl}
              alt="Material Icon"
              width={64}
              height={64}
              priority
            />
          </div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="mt-auto">
            <button
              onClick={goTo}
              className="bg-[#3900B3] hover:bg-indigo-800 text-white rounded-full px-6 py-2 transition-colors"
            >
              {status ? "View" : "Generate Now"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
