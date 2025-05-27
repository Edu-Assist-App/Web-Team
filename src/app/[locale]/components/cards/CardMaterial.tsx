"use client";

import React, { useState } from "react";
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

  const [isLoading, setIsLoading] = useState(false);

  const goTo = async () => {
    if (isLoading) return; // prevent double clicks
    setIsLoading(true);

    try {
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

      let data: GeneratedContent | undefined;
      let targetUrl: string = "";

      if (id === 1) {
        data = await generateContent(quizParameters);
        targetUrl = "quiz";
      } else if (id === 2) {
        data = await generateContent(flashcardParameters);
        targetUrl = "flashcards";
      }

      if (data?.id) {
        router.push(`/materials/${params.id}/${targetUrl}?id=${data.id}`);
      } else {
        // Handle missing data id scenario if needed
        alert("Failed to generate content. Please try again.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      // alert("An error occurred while generating content.");
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 bg-[#3900B3] hover:bg-indigo-800 text-white rounded-full px-6 py-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {status ? (
                "View"
              ) : isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                "Generate Now"
              )}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
