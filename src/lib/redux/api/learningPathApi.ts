// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type {
//   LearningPath,
//   LearningPathCreate,
//   LearningPathUpdate,
//   LearningPathStep,
//   LearningPathStepCreate,
//   ContentItem,
//   ContentItemCreate,
//   UserProgress,
//   UserProgressCreate,
// } from "../../types/learning-path";

// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL ||
//   "https://eduassist-6uef.onrender.com/api/v1";

// export const learningPathsApi = createApi({
//   reducerPath: "learningPathsApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: API_BASE_URL,
//     prepareHeaders: (headers, { getState }) => {
//       // Get token from state
//       const token = (getState() as any).auth?.token;
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["LearningPath", "LearningPathStep", "ContentItem", "UserProgress"],
//   endpoints: (builder) => ({
//     // Learning Paths
//     getLearningPaths: builder.query<LearningPath[], void>({
//       query: () => "/learning-paths",
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ id }) => ({
//                 type: "LearningPath" as const,
//                 id,
//               })),
//               { type: "LearningPath", id: "LIST" },
//             ]
//           : [{ type: "LearningPath", id: "LIST" }],
//     }),

//     getMyLearningPaths: builder.query<LearningPath[], void>({
//       query: () => "/learning-paths/my",
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ id }) => ({
//                 type: "LearningPath" as const,
//                 id,
//               })),
//               { type: "LearningPath", id: "MY" },
//             ]
//           : [{ type: "LearningPath", id: "MY" }],
//     }),

//     getPublicLearningPaths: builder.query<LearningPath[], void>({
//       query: () => "/learning-paths/public",
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ id }) => ({
//                 type: "LearningPath" as const,
//                 id,
//               })),
//               { type: "LearningPath", id: "PUBLIC" },
//             ]
//           : [{ type: "LearningPath", id: "PUBLIC" }],
//     }),

//     getLearningPathById: builder.query<LearningPath, string>({
//       query: (pathId) => `/learning-paths/${pathId}`,
//       providesTags: (result, error, id) => [{ type: "LearningPath", id }],
//     }),

//     createLearningPath: builder.mutation<LearningPath, LearningPathCreate>({
//       query: (learningPath) => ({
//         url: "/learning-paths",
//         method: "POST",
//         body: learningPath,
//       }),
//       invalidatesTags: [
//         { type: "LearningPath", id: "LIST" },
//         { type: "LearningPath", id: "MY" },
//       ],
//     }),

//     updateLearningPath: builder.mutation<
//       LearningPath,
//       { pathId: string; learningPath: LearningPathUpdate }
//     >({
//       query: ({ pathId, learningPath }) => ({
//         url: `/learning-paths/${pathId}`,
//         method: "PUT",
//         body: learningPath,
//       }),
//       invalidatesTags: (result, error, { pathId }) => [
//         { type: "LearningPath", id: pathId },
//         { type: "LearningPath", id: "LIST" },
//         { type: "LearningPath", id: "MY" },
//         { type: "LearningPath", id: "PUBLIC" },
//       ],
//     }),

//     deleteLearningPath: builder.mutation<void, string>({
//       query: (pathId) => ({
//         url: `/learning-paths/${pathId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, pathId) => [
//         { type: "LearningPath", id: pathId },
//         { type: "LearningPath", id: "LIST" },
//         { type: "LearningPath", id: "MY" },
//         { type: "LearningPath", id: "PUBLIC" },
//       ],
//     }),

//     // Learning Path Steps
//     getLearningPathSteps: builder.query<LearningPathStep[], string>({
//       query: (pathId) => `/learning-paths/${pathId}/steps`,
//       providesTags: (result, error, pathId) =>
//         result
//           ? [
//               ...result.map(({ id }) => ({
//                 type: "LearningPathStep" as const,
//                 id,
//               })),
//               { type: "LearningPathStep", id: pathId },
//             ]
//           : [{ type: "LearningPathStep", id: pathId }],
//     }),

//     createLearningPathStep: builder.mutation<
//       LearningPathStep,
//       { pathId: string; step: LearningPathStepCreate }
//     >({
//       query: ({ pathId, step }) => ({
//         url: `/learning-paths/${pathId}/steps`,
//         method: "POST",
//         body: step,
//       }),
//       invalidatesTags: (result, error, { pathId }) => [
//         { type: "LearningPathStep", id: pathId },
//       ],
//     }),

//     // Content Items
//     createContentItem: builder.mutation<ContentItem, ContentItemCreate>({
//       query: (contentItem) => ({
//         url: "/learning-paths/content",
//         method: "POST",
//         body: contentItem,
//       }),
//       invalidatesTags: (result) => [
//         { type: "ContentItem", id: result?.step_id },
//       ],
//     }),

//     // User Progress
//     getUserProgress: builder.query<UserProgress[], string>({
//       query: (pathId) => `/learning-paths/progress/${pathId}`,
//       providesTags: (result, error, pathId) => [
//         { type: "UserProgress", id: pathId },
//       ],
//     }),

//     createUserProgress: builder.mutation<UserProgress, UserProgressCreate>({
//       query: (progress) => ({
//         url: "/learning-paths/progress",
//         method: "POST",
//         body: progress,
//       }),
//       invalidatesTags: (result) => [
//         { type: "UserProgress", id: result?.path_id },
//       ],
//     }),
//   }),
// });

// export const {
//   useGetLearningPathsQuery,
//   useGetMyLearningPathsQuery,
//   useGetPublicLearningPathsQuery,
//   useGetLearningPathByIdQuery,
//   useCreateLearningPathMutation,
//   useUpdateLearningPathMutation,
//   useDeleteLearningPathMutation,
//   useGetLearningPathStepsQuery,
//   useCreateLearningPathStepMutation,
//   useCreateContentItemMutation,
//   useGetUserProgressQuery,
//   useCreateUserProgressMutation,
// } = learningPathsApi;
