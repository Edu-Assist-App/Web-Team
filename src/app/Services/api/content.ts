import axiosInstance from "./axiosInstance";

// Define content types
export type ContentType =
  | "quiz"
  | "summary"
  | "flashcard"
  | "youtube_suggestions"
  | "course"
  | "exercises"
  | "code_examples"
  | "learning_path";

// Shared parameter types
interface QuizParameters {
  topic: string;
  difficulty: string;
  num_questions: number;
  question_types: string[];
}

interface SummaryParameters {
  text: string;
  max_length: number;
  focus_points: string[];
}

interface FlashcardParameters {
  topic: string;
  num_cards: number;
  difficulty: string;
  include_examples: boolean;
}

interface YoutubeSuggestionsParameters {
  topic: string;
  num_suggestions: number;
  difficulty: string;
  include_description: boolean;
}

interface CourseContentParameters {
  topic: string;
  level: string;
  duration: string;
  include_prerequisites: boolean;
  include_learning_objectives: boolean;
}

interface ExerciseParameters {
  topic: string;
  difficulty: string;
  num_exercises: number;
  include_solutions: boolean;
  include_hints: boolean;
}

interface CodeExamplesParameters {
  language: string;
  concept: string;
  num_examples: number;
  include_comments: boolean;
  include_explanations: boolean;
}

interface LearningPathParameters {
  topic: string;
  level: string;
  duration: string;
  include_resources: boolean;
  include_milestones: boolean;
}

// Union of all generation payloads
type GenerateParameters =
  | QuizParameters
  | SummaryParameters
  | FlashcardParameters
  | YoutubeSuggestionsParameters
  | CourseContentParameters
  | ExerciseParameters
  | CodeExamplesParameters
  | LearningPathParameters;

export interface GenerateContentPayload {
  content_type: ContentType;
  parameters: GenerateParameters;
  provider: string; // e.g., "openai", "anthropic"
}

// API response
export interface GeneratedContent {
  id: string;
  title: string;
  content: string;
  content_type: ContentType;
  description: string;
  course_id: string;
  meta: Record<string, any>;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// 🔥 Main utility function
export async function generateContent(
  payload: GenerateContentPayload
): Promise<GeneratedContent> {
  const { data } = await axiosInstance.post<GeneratedContent>(
    "/api/v1/content/generate",
    payload
  );
  return data;
}
