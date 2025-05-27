import axiosInstance from "./axiosInstance";

export interface LearningPathStep {
  id: string;
  learning_path_id: string;
  title: string;
  description: string;
  order: number;
  content_type: string;
  content_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  is_public: boolean;
  difficulty_level: string;
  estimated_duration: number;
  tags: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
  steps: LearningPathStep[];
}

export interface UserProgress {
  id: string;
  user_id: string;
  learning_path_id: string;
  step_id: string;
  completed: boolean;
  completed_at: string;
  created_at: string;
  updated_at: string;
}

// 1. Get Learning Path by course ID
export async function getLearningPathByCourseId(
  courseId: string
): Promise<LearningPath> {
  const { data } = await axiosInstance.get<LearningPath>(
    `/api/v1/learning-paths/course/${courseId}`
  );
  return data;
}

// 2. Generate a new learning path outline for a course (POST)
export async function generateLearningPathOutline(
  courseId: string
): Promise<{}> {
  const { data } = await axiosInstance.post(
    `/api/v1/learning-paths/generate-outline?course_id=${courseId}`
  );
  return data;
}

// 3. Get course learning path outline (GET)
export async function getCourseLearningPathOutline(
  courseId: string
): Promise<{}> {
  const { data } = await axiosInstance.get(
    `/api/v1/learning-paths/course/${courseId}/outline`
  );
  return data;
}

// 4. Create learning path from outline (POST)
export async function createLearningPathFromOutline(
  courseId: string
): Promise<LearningPath> {
  const { data } = await axiosInstance.post<LearningPath>(
    `/api/v1/learning-paths/course/${courseId}/create-from-outline`
  );
  return data;
}

// 5. Get user progress for a specific learning path (GET)
export async function getUserProgressByPathId(
  pathId: string
): Promise<UserProgress[]> {
  const { data } = await axiosInstance.get<UserProgress[]>(
    `/api/v1/learning-paths/progress/${pathId}`
  );
  return data;
}
