"use client";
import CtaCard from "@/app/components/cards/CtaCard";
import RichTextChapter from "@/app/components/course/RichText";
import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

// Complete mock data for all chapters
const courseData = {
  title: "Introduction to Data Science",
  totalChapters: 3,
  chapters: [
    {
      id: 1,
      title: "What is Data Science?",
      description:
        "Explore the foundations of data science and its applications in the modern world.",
      imageUrl: "/chapter1.svg",
      content: {
        title: "Chapter 1 Overview",
        description:
          "Learn the core concepts of data science and why it's transforming industries.",
        estimatedTime: "45 minutes",
        topics: [
          {
            title: "Data Science Fundamentals",
            content:
              "Data science combines statistics, programming, and domain expertise to extract insights from data.",
            bulletPoints: [
              "Interdisciplinary field combining math, statistics, and computer science",
              "Used for predictive analytics, pattern recognition, and decision making",
              "Applications in healthcare, finance, marketing, and more",
            ],
          },
          {
            title: "Key Technologies",
            content: "Modern data science relies on several core technologies:",
            bulletPoints: [
              "Python and R programming languages",
              "Machine learning frameworks like TensorFlow and PyTorch",
              "Big data tools like Hadoop and Spark",
            ],
          },
        ],
        exampleCode: {
          language: "python",
          code: `# Simple data analysis example
import pandas as pd

data = {'Name': ['Alice', 'Bob', 'Charlie'], 'Age': [25, 30, 35]}
df = pd.DataFrame(data)
print(df.describe())`,
        },
      },
    },
    {
      id: 2,
      title: "Python for Data Analysis",
      description:
        "Master Python fundamentals for data manipulation and visualization.",
      imageUrl: "/chapter2.svg",
      content: {
        title: "Chapter 2 Overview",
        description:
          "Learn how to use Python for effective data analysis and visualization.",
        estimatedTime: "60 minutes",
        topics: [
          {
            title: "Essential Libraries",
            content:
              "Python's data science ecosystem includes powerful libraries:",
            bulletPoints: [
              "NumPy for numerical computing",
              "Pandas for data manipulation",
              "Matplotlib and Seaborn for visualization",
            ],
          },
          {
            title: "Data Cleaning Techniques",
            content: "Real-world data requires cleaning before analysis:",
            bulletPoints: [
              "Handling missing values",
              "Removing duplicates",
              "Normalizing data formats",
            ],
          },
        ],
        exampleCode: {
          language: "python",
          code: `# Data cleaning example
import pandas as pd
import numpy as np

data = {'A': [1, 2, np.nan], 'B': [5, np.nan, np.nan]}
df = pd.DataFrame(data)
clean_df = df.fillna(df.mean())
print(clean_df)`,
        },
      },
    },
    {
      id: 3,
      title: "Machine Learning Basics",
      description: "Introduction to machine learning concepts and algorithms.",
      imageUrl: "/chapter3.svg",
      content: {
        title: "Chapter 3 Overview",
        description:
          "Understand the fundamentals of machine learning and its applications.",
        estimatedTime: "50 minutes",
        topics: [
          {
            title: "Types of Machine Learning",
            content:
              "Machine learning can be categorized into three main types:",
            bulletPoints: [
              "Supervised learning (labeled data)",
              "Unsupervised learning (unlabeled data)",
              "Reinforcement learning (reward-based)",
            ],
          },
          {
            title: "Common Algorithms",
            content: "Popular machine learning algorithms include:",
            bulletPoints: [
              "Linear Regression for predictions",
              "Decision Trees for classification",
              "K-Means for clustering",
            ],
          },
        ],
        exampleCode: {
          language: "python",
          code: `# Simple linear regression example
from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1], [2], [3]])
y = np.array([1, 3, 5])
model = LinearRegression().fit(X, y)
print(model.predict([[4]]))`,
        },
      },
    },
  ],
};

export default function Page() {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [progress, setProgress] = useState(0);
  const currentChapterData = courseData.chapters.find(
    (ch) => ch.id === currentChapter
  );

  // Scroll to top whenever chapter changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentChapter]);

  const calculateProgress = (chapter) => {
    // Chapter 1: 0%, Chapter 2: 33%, Chapter 3: 66%, Completion: 100%
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
      // Update progress based on the new chapter
      setProgress(
        Math.round(((newChapter - 1) / courseData.totalChapters) * 100)
      );
    } else {
      // When completing the last chapter, set progress to 100%
      setProgress(100);
    }
  };

  const handlePrevious = () => {
    if (currentChapter > 1) {
      const newChapter = currentChapter - 1;
      setCurrentChapter(newChapter);
      // Update progress based on the new chapter
      setProgress(
        Math.round(((newChapter - 1) / courseData.totalChapters) * 100)
      );
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <CtaCard {...cardContent} />

        {currentChapterData?.content && (
          <RichTextChapter {...currentChapterData.content} />
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
      </div>
    </div>
  );
}
