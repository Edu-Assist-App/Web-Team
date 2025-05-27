"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { getContentById } from "@/app/Services/api/content";

// Mock quiz data
const quizDatas = [
  {
    id: 1,
    question: "What is the first step in a data science project?",
    options: [
      { id: "A", text: "Modeling" },
      { id: "B", text: "Data Collection" },
      { id: "C", text: "Visualization" },
      { id: "D", text: "Reporting" },
    ],
    correctAnswer: "B",
  },
  {
    id: 2,
    question:
      "Which of the following is NOT a common Python library for data science?",
    options: [
      { id: "A", text: "NumPy" },
      { id: "B", text: "Pandas" },
      { id: "C", text: "JavaSpark" },
      { id: "D", text: "Matplotlib" },
    ],
    correctAnswer: "C",
  },
  {
    id: 3,
    question: "What does SQL stand for?",
    options: [
      { id: "A", text: "Structured Query Language" },
      { id: "B", text: "Simple Query Language" },
      { id: "C", text: "Standard Question Language" },
      { id: "D", text: "System Query Language" },
    ],
    correctAnswer: "A",
  },
  {
    id: 4,
    question:
      "Which technique is used to prevent overfitting in machine learning models?",
    options: [
      { id: "A", text: "Gradient Descent" },
      { id: "B", text: "Regularization" },
      { id: "C", text: "Backpropagation" },
      { id: "D", text: "Feature Engineering" },
    ],
    correctAnswer: "B",
  },
];

export default function QuizComponent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showScore, setShowScore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [score, setScore] = useState(0);
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

        console.log("Parsed quiz data:", parsed);
        setQuizData(parsed);
        // Check structure
      } catch (err) {
        console.error("Error fetching quiz data:", err);
        console.error("Flashcard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchCards();
  }, [id]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(userAnswers[currentQuestionIndex - 1] || null);
      setRevealAnswer(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(userAnswers[currentQuestionIndex + 1] || null);
      setRevealAnswer(false);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: optionId });
  };

  const handleRevealAnswer = () => {
    setRevealAnswer(true);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quizData.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    return correctAnswers;
  };

  const handleSubmit = () => {
    if (selectedOption) {
      // Save the current answer
      const updatedAnswers = {
        ...userAnswers,
        [currentQuestionIndex]: selectedOption,
      };
      setUserAnswers(updatedAnswers);

      // Calculate score
      const calculatedScore = calculateScore();
      setShowScore(true);

      // In a real app, you would submit answers to a backend here
      // console.log("User answers:", updatedAnswers);
      // console.log("Score:", calculatedScore);

      // Move to next question if available
      if (currentQuestionIndex < quizData.length - 1) {
        setTimeout(() => {
          setShowScore(false);
          handleNext();
        }, 2000);
      }
    } else {
      alert("Please select an answer before submitting");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading quiz data...
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

  const getOptionClass = (optionId: string) => {
    if (!revealAnswer) {
      return selectedOption === optionId
        ? "border-indigo-600 bg-indigo-50"
        : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50";
    } else {
      if (optionId === currentQuestion.correctAnswer) {
        return "border-green-600 bg-green-50";
      } else if (selectedOption === optionId) {
        return "border-red-600 bg-red-50";
      } else {
        return "border-gray-200";
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setRevealAnswer(false);
    setUserAnswers({});
    setShowScore(false);
    setScore(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {showScore ? (
        <div className="text-center">
          <div className="flex w-full items-center justify-center gap-3 mb-10">
            <div className="flex items-center justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                <Image
                  src="/quize.svg"
                  alt="Quiz icon"
                  width={40}
                  height={40}
                  className="text-pink-500"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center">Quiz Results</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4">
              Your Score: {score}/{quizData.length}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {score === quizData.length
                ? "Perfect! You got all questions right!"
                : score >= quizData.length / 2
                ? "Good job! You passed the quiz."
                : "Keep practicing! You'll do better next time."}
            </p>
          </div>

          <button
            onClick={handleRestartQuiz}
            className="px-6 py-3 rounded-full bg-[#3800b3] text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="flex w-full items-center justify-center gap-3 mb-10">
            <div className="flex items-center justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                <Image
                  src="/quize.svg"
                  alt="Quiz icon"
                  width={40}
                  height={40}
                  className="text-pink-500"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center">Quiz</h1>
          </div>

          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-2 rounded-full border border-indigo-600 text-indigo-600 font-medium
                ${
                  currentQuestionIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-50"
                }`}
            >
              Prev
            </button>

            <div className="flex-1 mx-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3800b3] rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === quizData.length - 1}
              className={`px-6 py-2 rounded-full border border-indigo-600 text-indigo-600 font-medium
                ${
                  currentQuestionIndex === quizData.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-50"
                }`}
            >
              Next
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-8">
              Q{currentQuestionIndex + 1}: {currentQuestion?.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion?.options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => !revealAnswer && handleOptionSelect(option.id)}
                  className={`
                    p-6 rounded-2xl border-2 cursor-pointer transition-all
                    ${getOptionClass(option.id)}
                  `}
                >
                  <p className="font-medium">
                    {option.id}. {option.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={handleRevealAnswer}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#3800b3] text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              <Eye className="w-5 h-5" />
              Reveal Answer
            </button>

            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`px-6 py-3 rounded-full bg-[#3800b3] text-white font-medium transition-colors
                ${
                  !selectedOption
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-700"
                }`}
            >
              {currentQuestionIndex === quizData.length - 1
                ? "Submit Quiz"
                : "Submit Answer"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
