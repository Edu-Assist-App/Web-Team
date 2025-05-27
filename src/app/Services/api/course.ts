import axiosInstance from "./axiosInstance";

interface Course {
  id: string;
  title: string;
  sub_title: string | null;
  description: string;
  creator_id: string;
  created_at: string;
  updated_at: string;
}

interface CourseCreatePayload {
  prompt: string;
  title: string;
  sub_title: string;
  description: string;
}

interface CourseUpdatePayload {
  prompt?: string;
  title?: string;
  sub_title?: string;
  description?: string;
}

// List all courses
export async function listCourses(): Promise<Course[]> {
  const { data } = await axiosInstance.get<Course[]>("/api/v1/courses/");
  return data;
}

// Create a new course
export async function createCourse(
  payload: CourseCreatePayload
): Promise<Course> {
  const { data } = await axiosInstance.post<Course>(
    "/api/v1/courses/",
    payload
  );
  return data;
}

// Get a specific course by ID
export async function getCourse(courseId: string): Promise<Course> {
  const { data } = await axiosInstance.get<Course>(
    `/api/v1/courses/${courseId}`
  );
  return data;
}

// Update a specific course by ID
export async function updateCourse(
  courseId: string,
  payload: CourseUpdatePayload
): Promise<Course> {
  const { data } = await axiosInstance.put<Course>(
    `/api/v1/courses/${courseId}`,
    payload
  );
  return data;
}

// Delete a specific course by ID
export async function deleteCourse(courseId: string): Promise<void> {
  await axiosInstance.delete(`/api/v1/courses/${courseId}`);
}
