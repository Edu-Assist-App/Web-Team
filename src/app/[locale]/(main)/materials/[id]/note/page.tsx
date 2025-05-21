"use client";
import CtaCard from "@/app/[locale]/components/cards/CtaCard";
import RichTextChapter from "@/app/[locale]/components/course/RichTextChapter";
import { Button } from "@/app/[locale]/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import AIChatBox from "@/app/components/course/AIChatBox";
import { MdOutlineSmartToy } from "react-icons/md";

// Dynamically import DOMPurify on the client side only
import dynamic from "next/dynamic";
const DOMPurify = dynamic(() => import("dompurify"), { ssr: false });

const courseData = {
  title: "Introduction to Data Science",
  totalChapters: 3,
  chapters: [
    {
      id: 1,
      title: "What is Data Science?",
      description: "Explore the foundations of data science.",
      imageUrl: "/chapter1.svg",
    },
    {
      id: 2,
      title: "Python for Data Analysis",
      description: "Master Python fundamentals for data analysis.",
      imageUrl: "/chapter2.svg",
    },
    {
      id: 3,
      title: "Machine Learning Basics",
      description: "Introduction to machine learning concepts.",
      imageUrl: "/chapter3.svg",
    },
  ],
};

export default function Page() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [progress, setProgress] = useState(0);
  const currentChapterData = courseData.chapters.find(
    (ch) => ch.id === currentChapter
  );
  const richTextRef = useRef<any>(null);
  const [content, setContent] = useState<string>(`
    <h2>Hi there,</h2>
    <p>This is a <em>basic</em> example of <strong>TipTap</strong>.</p>
    <iframe style="width: 100%; max-width: 560px; aspect-ratio: 560/315; border: 0;" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
  `);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentChapter]);

  const calculateProgress = (chapter: number) => {
    return Math.round(((chapter - 1) / courseData.totalChapters) * 100);
  };

  const cardContent = {
    title: `Chapter ${currentChapter}: ${currentChapterData?.title || ""}`,
    description: currentChapterData?.description || "",
    imageUrl: "/chapter.svg",
    noChapter: false,
    chapters: courseData.totalChapters,
    progress: progress,
    haveProgress: true,
  };

  const handleNext = () => {
    if (currentChapter < courseData.totalChapters) {
      const newChapter = currentChapter + 1;
      setCurrentChapter(newChapter);
      setProgress(calculateProgress(newChapter));
    } else {
      setProgress(100);
    }
  };

  const handlePrevious = () => {
    if (currentChapter > 1) {
      const newChapter = currentChapter - 1;
      setCurrentChapter(newChapter);
      setProgress(calculateProgress(newChapter));
    }
  };

  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSendPrompt = async (prompt: string): Promise<string> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = `<p>AI Response to "${prompt}": This is a sample response.</p>`;
    setIsLoading(false);
    return response;
  };

  const handleAIResponse = async (prompt: string) => {
    const response = await handleSendPrompt(prompt);
    if (isEditing && richTextRef.current) {
      const editor = richTextRef.current.editor;
      if (editor) {
        editor.chain().focus().insertContent(response).run();
        setContent(editor.getHTML());
      }
    } else {
      setContent((prev) => prev + response);
    }
    return response;
  };

  const toggleEditMode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsEditing(!isEditing);
      setIsLoading(false);
    }, 300);
  };

  // Sanitize content only on the client side
  const [sanitizedContent, setSanitizedContent] = useState(content);
  useEffect(() => {
    if (typeof window !== "undefined" && DOMPurify.sanitize) {
      const cleaned = DOMPurify.sanitize(content, {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "src"],
      });
      setSanitizedContent(cleaned);
    } else {
      setSanitizedContent(content); // Fallback for SSR
    }
  }, [content]);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <CtaCard {...cardContent} />

        <div className="flex justify-end">
          <Button onClick={toggleEditMode}>
            {isEditing ? "Save & Exit" : "Edit"}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : isEditing ? (
          <RichTextChapter
            ref={richTextRef}
            content={content}
            setContent={setContent}
            onSendPrompt={handleAIResponse}
          />
        ) : (
          <div
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentChapter === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentChapter === courseData.totalChapters}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-1 right-1 w-12 h-12 bg-[#3900b3] text-white rounded-full flex items-center justify-center shadow-lg z-40"
          title="Toggle AI Assistant"
        >
          <MdOutlineSmartToy size={24} />
        </button>

        <AIChatBox
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onSendPrompt={handleAIResponse}
        />
      </div>
    </div>
  );
}
