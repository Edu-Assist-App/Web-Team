"use client";
import CtaCard from "@/app/[locale]/components/cards/CtaCard";
import RichTextChapter from "@/app/[locale]/components/course/RichTextChapter";
import { Button } from "@/app/[locale]/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import AIChatBox from "@/app/[locale]/components/course/AIChatBox";
import { AiOutlineRobot } from "react-icons/ai";

// Dynamically import DOMPurify on the client side only
// import dynamic from "next/dynamic";
// const DOMPurify = dynamic(() => import("dompurify") as any, { ssr: false }) as any;

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
  const [content, setContent] = useState<any>({
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": { "level": 2 },
        "content": [{ "type": "text", "text": "What is Data Science?" }]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "marks": [{ "type": "bold" }],
            "text": "Data Science"
          },
          {
            "type": "text",
            "text": " is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data. It combines aspects of statistics, computer science, and domain expertise to turn raw data into actionable insights."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": { "level": 3 },
        "content": [{ "type": "text", "text": "Key Components of Data Science" }]
      },
      {
        "type": "bulletList",
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  { "type": "text", "marks": [{ "type": "bold" }], "text": "Data Collection:" },
                  { "type": "text", "text": " Gathering raw data from various sources such as databases, web scraping, sensors, or user input." }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  { "type": "text", "marks": [{ "type": "bold" }], "text": "Data Cleaning:" },
                  { "type": "text", "text": " Removing inconsistencies, handling missing values, and preparing data for analysis." }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  { "type": "text", "marks": [{ "type": "bold" }], "text": "Exploratory Data Analysis (EDA):" },
                  { "type": "text", "text": " Visualizing and summarizing data to understand patterns and relationships." }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  { "type": "text", "marks": [{ "type": "bold" }], "text": "Modeling:" },
                  { "type": "text", "text": " Applying statistical and machine learning models to make predictions or classify data." }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  { "type": "text", "marks": [{ "type": "bold" }], "text": "Interpretation:" },
                  { "type": "text", "text": " Translating model results into actionable business or research insights." }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": { "level": 3 },
        "content": [{ "type": "text", "text": "Common Tools & Languages" }]
      },
      {
        "type": "bulletList",
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  { "type": "text", "text": "Python (with libraries like " },
                  { "type": "text", "marks": [{ "type": "code" }], "text": "pandas" },
                  { "type": "text", "text": ", " },
                  { "type": "text", "marks": [{ "type": "code" }], "text": "numpy" },
                  { "type": "text", "text": ", " },
                  { "type": "text", "marks": [{ "type": "code" }], "text": "scikit-learn" },
                  { "type": "text", "text": ")" }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [{ "type": "text", "text": "R" }]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [{ "type": "text", "text": "SQL" }]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [{ "type": "text", "text": "Jupyter Notebooks" }]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  { "type": "text", "text": "Visualization tools (e.g., " },
                  { "type": "text", "marks": [{ "type": "code" }], "text": "matplotlib" },
                  { "type": "text", "text": ", " },
                  { "type": "text", "marks": [{ "type": "code" }], "text": "seaborn" },
                  { "type": "text", "text": ", " },
                  { "type": "text", "marks": [{ "type": "code" }], "text": "Tableau" },
                  { "type": "text", "text": ")" }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": { "level": 3 },
        "content": [{ "type": "text", "text": "Sample Python Code: Loading and Summarizing Data" }]
      },
      {
        "type": "codeBlock",
        "attrs": { "language": "python" },
        "content": [
          {
            "type": "text",
            "text": "import pandas as pd\n\n# Load a CSV file\ndf = pd.read_csv('data.csv')\n\n# Show the first 5 rows\nprint(df.head())\n\n# Get summary statistics\nprint(df.describe())"
          }
        ]
      },
      {
        "type": "heading",
        "attrs": { "level": 3 },
        "content": [{ "type": "text", "text": "Applications of Data Science" }]
      },
      {
        "type": "bulletList",
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [{ "type": "text", "text": "Healthcare: Predicting disease outbreaks, personalized medicine" }]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [{ "type": "text", "text": "Finance: Fraud detection, risk assessment" }]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [{ "type": "text", "text": "Retail: Recommendation systems, inventory management" }]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [{ "type": "text", "text": "Transportation: Route optimization, demand forecasting" }]
              }
            ]
          }
        ]
      },
      {
        "type": "blockquote",
        "content": [
          {
            "type": "paragraph",
            "content": [
              { "type": "text", "marks": [{ "type": "bold" }], "text": "Did you know?" },
              { "type": "text", "text": " Data Science is one of the fastest-growing fields, with applications in almost every industry!" }
            ]
          }
        ]
      }
    ]
  });
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
    // For now, AI responses from the general chatbot won't insert into the editor directly.
    // This can be revisited if interaction with the main editor in read-only mode is desired.
    // if (richTextRef.current) {
    //   const editor = richTextRef.current.editor;
    //   if (editor) {
    //     editor.chain().focus().insertContent(response).run();
    //     // Assuming setContent expects JSON, and response is HTML string.
    //     // This part needs to be handled carefully based on how Tiptap converts HTML to JSON.
    //     // For simplicity, if direct insertion is needed, ensure 'response' is valid Tiptap JSON or use appropriate conversion.
    //     // setContent(editor.getJSON()); // Update: Use getJSON()
    //   }
    // }
    return response; // Return for chatbox display
  };

  const toggleEditMode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsEditing(!isEditing);
      setIsLoading(false);
    }, 300);
  };

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
        ) : (
          <RichTextChapter
            ref={richTextRef}
            content={content}
            setContent={setContent}
            onSendPrompt={isEditing ? handleAIResponse : undefined}
            isEditable={isEditing}
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
