import React from "react";
import Head from "next/head";

// Mock data that would come from an API
const mockChapterContent = {
  title: "Chapter Overview",
  description:
    "Explore the foundations of data science, its impact across industries, and how data-driven decisions are transforming the modern world.",
  estimatedTime: "45 minutes",
  topics: [
    {
      title: "What is Data Science?",
      content:
        "Data science is the field that uses algorithms, data analysis, and machine learning to extract insights from structured and unstructured data. It bridges the gap between raw data and meaningful decisions.",
      bulletPoints: [
        "Data science is not just about working with data – it's about asking the right questions and using the right tools to find the answers.",
      ],
    },
    {
      title: "Why is Data Science Important?",
      content:
        "Data is generated every second – from social media, IoT devices, transactions, and more. Data science helps turn that massive volume of information into actionable insights. It powers:",
      bulletPoints: [
        "Product recommendations (Netflix, Amazon)",
        "Fraud detection (banks, FinTech)",
        "Medical diagnosis (healthcare AI)",
        "Smart assistants (Siri, Alexa)",
      ],
    },
    {
      title: "Key Components of the Data Science Process",
      content: "",
      bulletPoints: [
        "Data Collection – Gathering data from various sources (APIs, sensors, web scraping).",
        "Data Cleaning – Removing inconsistencies and handling missing values.",
        "Exploratory Data Analysis (EDA) – Understanding the data through statistics and visualizations.",
        "Modeling – Applying machine learning algorithms to make predictions.",
        "Evaluation & Deployment – Testing model performance and deploying it to real users.",
      ],
    },
  ],
  exampleCode: {
    language: "python",
    code: `import pandas as pd

# Load your dataset
df = pd.read_csv('https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv')

# Display the first 5 rows
print(df.head())

# Get basic information about the dataset
print(df.info())

# Summary statistics
print(df.describe())`,
  },
};

const RichTextChapter = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Head>
        <title>{mockChapterContent.title}</title>
        <meta name="description" content={mockChapterContent.description} />
      </Head>

      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {mockChapterContent.title}
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          {mockChapterContent.description}
        </p>

        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <p className="text-blue-800 font-medium">
            Estimated Time to Complete - {mockChapterContent.estimatedTime}
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Topics Covered
        </h2>

        <ul className="list-disc pl-6 mb-8 space-y-2">
          {mockChapterContent.topics.map((topic, index) => (
            <li key={index} className="text-gray-700">
              {topic.title}
            </li>
          ))}
        </ul>

        <hr className="my-8 border-gray-200" />

        {mockChapterContent.topics.map((topic, index) => (
          <section key={index} className="mb-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              {index + 1}. {topic.title}
            </h3>

            {topic.content && (
              <p className="text-gray-700 mb-4">{topic.content}</p>
            )}

            {topic.bulletPoints && topic.bulletPoints.length > 0 && (
              <ul className="list-disc pl-6 space-y-2 mb-4">
                {topic.bulletPoints.map((point, i) => (
                  <li key={i} className="text-gray-700">
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto mb-8">
          <pre className="text-sm sm:text-base text-gray-100">
            <code>{mockChapterContent.exampleCode.code}</code>
          </pre>
        </div>
      </article>
    </div>
  );
};

export default RichTextChapter;
