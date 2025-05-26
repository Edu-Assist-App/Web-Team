"use client";
import CtaCard from "@/app/[locale]/components/cards/CtaCard";
import RichTextChapter from "@/app/[locale]/components/course/RichTextChapter";
import { Button } from "@/app/[locale]/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import AIChatBox from "@/app/[locale]/components/course/AIChatBox";
import { AiOutlineRobot } from "react-icons/ai";

// Dynamically import DOMPurify on the client side only
import dynamic from "next/dynamic";
const DOMPurify = dynamic(() => import("dompurify") as any, { ssr: false }) as any;

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

const AiOutlineRobotIcon = (AiOutlineRobot as any);

export default function Page() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [progress, setProgress] = useState(0);
  const currentChapterData = courseData.chapters.find(
    (ch) => ch.id === currentChapter
  );
  const richTextRef = useRef<any>(null);
  // ...existing code...
  const [content, setContent] = useState<string>(`
  <h2>What is Data Science?</h2>
  <p>
    <strong>Data Science</strong> is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data. It combines aspects of statistics, computer science, and domain expertise to turn raw data into actionable insights.
  </p>
  <h3>Key Components of Data Science</h3>
  <ul>
    <li><strong>Data Collection:</strong> Gathering raw data from various sources such as databases, web scraping, sensors, or user input.</li>
    <li><strong>Data Cleaning:</strong> Removing inconsistencies, handling missing values, and preparing data for analysis.</li>
    <li><strong>Exploratory Data Analysis (EDA):</strong> Visualizing and summarizing data to understand patterns and relationships.</li>
    <li><strong>Modeling:</strong> Applying statistical and machine learning models to make predictions or classify data.</li>
    <li><strong>Interpretation:</strong> Translating model results into actionable business or research insights.</li>
  </ul>
  <h3>Common Tools & Languages</h3>
  <ul>
    <li>Python (with libraries like <code>pandas</code>, <code>numpy</code>, <code>scikit-learn</code>)</li>
    <li>R</li>
    <li>SQL</li>
    <li>Jupyter Notebooks</li>
    <li>Visualization tools (e.g., <code>matplotlib</code>, <code>seaborn</code>, <code>Tableau</code>)</li>
  </ul>
  <h3>Sample Python Code: Loading and Summarizing Data</h3>
  <pre><code class="language-python">
import pandas as pd

# Load a CSV file
df = pd.read_csv('data.csv')

# Show the first 5 rows
print(df.head())

# Get summary statistics
print(df.describe())
  </code></pre>
  <h3>Applications of Data Science</h3>
  <ul>
    <li>Healthcare: Predicting disease outbreaks, personalized medicine</li>
    <li>Finance: Fraud detection, risk assessment</li>
    <li>Retail: Recommendation systems, inventory management</li>
    <li>Transportation: Route optimization, demand forecasting</li>
  </ul>
  <blockquote>
    <strong>Did you know?</strong> Data Science is one of the fastest-growing fields, with applications in almost every industry!
  </blockquote>
`);
  // ...existing code...
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
            className="tiptap prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto overflow-x-auto"
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
