"use client";
import CtaCard from "@/app/[locale]/components/cards/CtaCard";
import RichTextChapter from "@/app/[locale]/components/course/RichTextChapter";
import { Button } from "@/app/[locale]/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import AIChatBox from "@/app/[locale]/components/course/AIChatBox";
import { AiOutlineRobot } from "react-icons/ai";
import type { ContentChapter, ContentChapterSection } from "@/app/Services/api/content"; // Import interfaces

// Dynamically import DOMPurify on the client side only
// import dynamic from "next/dynamic";
// const DOMPurify = dynamic(() => import("dompurify") as any, { ssr: false }) as any;

const AiOutlineRobotIcon = (AiOutlineRobot as any);

// Helper function to transform our chapter structure to Tiptap JSON
const transformChapterToTiptapJSON = (chapter: ContentChapter | undefined): any => {
  if (!chapter) {
    return { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Chapter content not available." }] }] };
  }

  const tiptapContent: any[] = [];

  // Chapter Title
  tiptapContent.push({
    type: "heading",
    attrs: { level: 1 }, // Main chapter title as H1
    content: [{ type: "text", text: chapter.title }],
  });

  chapter.sections.forEach((section: ContentChapterSection) => {
    // Section Title
    tiptapContent.push({
      type: "heading",
      attrs: { level: 2 }, // Section titles as H2
      content: [{ type: "text", text: section.title }],
    });

    // Section Content
    // Simple paragraph for section content. For more complex HTML, parsing would be needed.
    tiptapContent.push({
      type: "paragraph",
      content: [{ type: "text", text: section.content }],
    });

    // Key Points
    if (section.key_points && section.key_points.length > 0) {
      tiptapContent.push({
        type: "heading",
        attrs: { level: 3 }, // "Key Points" as H3
        content: [{ type: "text", text: "Key Points" }],
      });
      tiptapContent.push({
        type: "bulletList",
        content: section.key_points.map(point => ({
          type: "listItem",
          content: [{ type: "paragraph", content: [{ type: "text", text: point }] }],
        })),
      });
    }

    // Examples
    if (section.examples && section.examples.length > 0) {
      tiptapContent.push({
        type: "heading",
        attrs: { level: 3 }, // "Examples" as H3
        content: [{ type: "text", text: "Examples" }],
      });
      section.examples.forEach(example => {
        // Assuming examples are code, use codeBlock. Otherwise, use paragraph.
        // For now, let's treat them as preformatted text within a paragraph,
        // or ideally a codeBlock if syntax highlighting is configured in Tiptap.
        tiptapContent.push({
          type: "codeBlock", // Or "paragraph" if codeBlock is not well-styled/supported yet
          // attrs: { language: 'plaintext' }, // Optional: specify language for codeBlock
          content: [{ type: "text", text: example }],
        });
      });
    }
  });

  return { type: "doc", content: tiptapContent };
};

export default function Page() {
  const [fetchedChapters, setFetchedChapters] = useState<ContentChapter[]>([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const richTextRef = useRef<any>(null);
  
  const [content, setContent] = useState<any>({ type: "doc", content: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true); 
    const storedContentData = sessionStorage.getItem('generatedNoteContent');
    if (storedContentData) {
      try {
        const parsedContentData = JSON.parse(storedContentData) as { chapters: ContentChapter[] };
        if (parsedContentData && parsedContentData.chapters && parsedContentData.chapters.length > 0) {
          setFetchedChapters(parsedContentData.chapters);
        } else {
          setFetchedChapters([]); 
        }
      } catch (error) {
        console.error("Failed to parse generated content from sessionStorage:", error);
        setFetchedChapters([]); 
      }
    } else {
        setFetchedChapters([]); 
    }
    // setIsLoading(false); // Moved to the effect that sets content
  }, []); 

  useEffect(() => {
    if (fetchedChapters.length > 0 && currentChapterIndex < fetchedChapters.length) {
      const currentDisplayChapter = fetchedChapters[currentChapterIndex];
      const tiptapJson = transformChapterToTiptapJSON(currentDisplayChapter);
      setContent(tiptapJson);
      setIsLoading(false); 
    } else if (fetchedChapters.length === 0) {
      // This case handles when no chapters are fetched or available initially.
      setContent(transformChapterToTiptapJSON(undefined)); 
      setIsLoading(false);
    }
  }, [currentChapterIndex, fetchedChapters]);

  useEffect(() => {
    if (fetchedChapters.length > 0) {
      const newProgress = ((currentChapterIndex + 1) / fetchedChapters.length) * 100;
      setProgress(newProgress);
    } else {
      setProgress(0);
    }
  }, [currentChapterIndex, fetchedChapters]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentChapterIndex]);

  // Construct cardTitle separately to avoid complex inline ternaries that might cause syntax issues
  let chapterTitleDisplay = "Loading Chapter...";
  if (!isLoading && fetchedChapters.length > 0 && fetchedChapters[currentChapterIndex]) {
    chapterTitleDisplay = `Chapter ${currentChapterIndex + 1}: ${fetchedChapters[currentChapterIndex].title}`;
  } else if (!isLoading) {
    chapterTitleDisplay = "Chapter Not Available";
  }

  const cardContent = {
    title: chapterTitleDisplay, // Corrected: Use the pre-constructed title
    description: fetchedChapters[currentChapterIndex]?.sections?.[0]?.title || "Review the content of this chapter.",
    imageUrl: "/chapter.svg",
    noChapter: !isLoading && fetchedChapters.length === 0,
    chapters: fetchedChapters.length,
    progress: progress,
    haveProgress: true,
  };

  const handleNext = () => {
    if (currentChapterIndex < fetchedChapters.length - 1) {
      setIsLoading(true); 
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentChapterIndex > 0) {
      setIsLoading(true); 
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };  

  // Ensured async functions explicitly return their promised type
  const handleSendPrompt = async (prompt: string): Promise<string> => {
    console.log("Sending prompt:", prompt); // Added log
    // setIsLoading(true); // Consider if this isLoading should be separate for chat
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = `<p>AI Response to \"${prompt}\": This is a sample response.</p>`;
    // setIsLoading(false);
    return response;
  };

  const handleAIResponse = async (prompt: string): Promise<string> => {
    const response = await handleSendPrompt(prompt);
    return response;
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing); 
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <CtaCard {...cardContent} />

        <div className="flex justify-end">
          {fetchedChapters.length > 0 && !isLoading && (
            <Button onClick={toggleEditMode}>
              {isEditing ? "Save & View" : "Edit Content"}
            </Button>
          )}
        </div>

        {/* Main loading state: shown when initially fetching chapters from session storage and not yet processed */}
        {isLoading && fetchedChapters.length === 0 && (!content || !content.content || content.content.length === 0) ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-lg">Loading Note Content...</p>
          </div>
        ) : !isLoading && fetchedChapters.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold mb-4">No Content Available</h2>
            <p>No note content was found or generated. Try generating it from the course materials page.</p>
          </div>
        ) : ( 
          <>
            {/* Per-chapter loading state: shown when navigating between chapters already fetched */}
            {isLoading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 inline-block"></div>
                <span className="ml-2">Loading chapter details...</span>
              </div>
            )}
            {!isLoading && fetchedChapters.length > 0 && fetchedChapters[currentChapterIndex] && content && content.content && (
                 <RichTextChapter
                    ref={richTextRef}
                    content={content} 
                    setContent={isEditing ? setContent : undefined} 
                    isEditable={isEditing}
                 />
            )}
          </>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentChapterIndex === 0 || isLoading}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={isLoading || currentChapterIndex === fetchedChapters.length - 1 || fetchedChapters.length === 0}
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
          <AiOutlineRobotIcon size={24} />
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
