"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, RotateCw } from "lucide-react";
import { getContentById } from "@/app/Services/api/content";
import { useSearchParams } from "next/navigation";

export default function FlashcardComponent() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flashcardData, setFlashcardData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState("");

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    setIsLoading(true);
    const fetchCards = async () => {
      try {
        const data = await getContentById(id);
        const rawContent = data?.content ?? "";

        // Remove ```json and ``` from content
        const cleaned = rawContent.replace(/```json|```/g, "").trim();

        // Try parsing JSON
        const parsed = JSON.parse(cleaned);

        // Check structure
        if (
          Array.isArray(parsed) &&
          parsed.every((card) => card.front && card.back)
        ) {
          setFlashcardData(parsed);
        } else {
          throw new Error("Invalid flashcard format.");
        }
      } catch (err) {
        setError("Failed to fetch flashcards.");
        console.error("Flashcard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchCards();
  }, [id]);

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < flashcardData.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const currentCard = flashcardData[currentCardIndex] || {
    front: "No question available.",
    back: "No answer available.",
  };

  const progress = ((currentCardIndex + 1) / flashcardData.length) * 100;

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading flashcards...
      </div>
    );
  }

  if (isError || flashcardData.length === 0) {
    return (
      <div className="text-center py-20 text-red-500">
        {isError || "No flashcards found for this content."}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="flex w-full items-center justify-center gap-3 mb-10">
        <div className="flex items-center justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
            <Image
              src="/flashcard.svg"
              alt="Quiz icon"
              width={40}
              height={40}
              className="text-pink-500"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center">FlashCards</h1>
      </div>

      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handlePrevious}
          disabled={currentCardIndex === 0}
          className={`px-6 py-2 rounded-full border border-indigo-600 text-indigo-600 font-medium
            ${
              currentCardIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-50"
            }`}
        >
          Prev
        </button>

        <div className="flex-1 mx-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentCardIndex === flashcardData.length - 1}
          className={`px-6 py-2 rounded-full border border-indigo-600 text-indigo-600 font-medium
            ${
              currentCardIndex === flashcardData.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-50"
            }`}
        >
          Next
        </button>
      </div>

      <div className="flex justify-center mb-8">
        <div
          className="relative w-full max-w-md h-64 md:h-80 lg:h-96 perspective-1000 cursor-pointer"
          onClick={handleFlip}
          aria-label={
            isFlipped ? "Click to see question" : "Click to see answer"
          }
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <div className="absolute w-full h-full bg-indigo-700 rounded-2xl flex flex-col items-center justify-center p-8 backface-hidden shadow-xl">
              <div className="absolute top-4 left-4 text-white/70 text-sm">
                Question
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                {currentCard.front}
              </h2>
              <div className="absolute bottom-4 text-white/50 text-sm">
                Click to reveal answer
              </div>
            </div>

            {/* Back */}
            <div className="absolute w-full h-full bg-white border-2 border-indigo-700 rounded-2xl flex flex-col items-center justify-center p-8 rotate-y-180 backface-hidden shadow-xl">
              <div className="absolute top-4 left-4 text-indigo-700/70 text-sm">
                Answer
              </div>
              <p className="text-lg md:text-xl text-gray-800 text-center">
                {currentCard.back}
              </p>
              <div className="absolute bottom-4 text-indigo-700/50 text-sm">
                Click to see question
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleFlip}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
        >
          {isFlipped ? (
            <>
              <RotateCw className="w-5 h-5" />
              Show Question
            </>
          ) : (
            <>
              <Eye className="w-5 h-5" />
              Show Answer
            </>
          )}
        </button>

        {currentCardIndex === flashcardData.length - 1 && (
          <button
            onClick={handleRestart}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors"
          >
            <RotateCw className="w-5 h-5" />
            Restart
          </button>
        )}
      </div>
    </div>
  );
}
