import React from "react";
import Head from "next/head";

interface Topic {
  title: string;
  content?: string;
  bulletPoints?: string[];
}

interface ExampleCode {
  language: string;
  code: string;
}

interface RichTextChapterProps {
  title: string;
  description: string;
  estimatedTime: string;
  topics: Topic[];
  exampleCode: ExampleCode;
}

const RichTextChapter: React.FC<RichTextChapterProps> = ({
  title,
  description,
  estimatedTime,
  topics,
  exampleCode,
}) => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>

        <p className="text-lg text-gray-600 mb-6">{description}</p>

        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <p className="text-blue-800 font-medium">
            Estimated Time to Complete - {estimatedTime}
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Topics Covered
        </h2>

        <ul className="list-disc pl-6 mb-8 space-y-2">
          {topics.map((topic, index) => (
            <li key={index} className="text-gray-700">
              {topic.title}
            </li>
          ))}
        </ul>

        <hr className="my-8 border-gray-200" />

        {topics.map((topic, index) => (
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

        {exampleCode && (
          <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto mb-8">
            <pre className="text-sm sm:text-base text-gray-100">
              <code>{exampleCode.code}</code>
            </pre>
          </div>
        )}
      </article>
    </div>
  );
};

export default RichTextChapter;
