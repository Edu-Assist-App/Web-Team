// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface User {
//   id: string;
//   email: string;
//   username: string;
//   full_name: string;
// }

// interface AuthResponse {
//   user: User;
//   access_token: string; // Changed from token to access_token
//   token_type: string;
// }

// interface RegisterRequest {
//   email: string;
//   username: string;
//   password: string;
//   full_name: string;
// }

// interface LoginRequest {
//   email: string;
//   password: string;
// }

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://eduassist-6uef.onrender.com/api/v1/",
//     prepareHeaders: (headers, { getState }) => {
//       // Get token from state if available
//       const token = (getState() as any).auth?.token;
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (
//     builder: import("@reduxjs/toolkit/query/react").EndpointBuilder<
//       any,
//       any,
//       any
//     >
//   ) => ({
//     register: builder.mutation<AuthResponse, RegisterRequest>({
//       query: (
//         credentials: RegisterRequest
//       ): import("@reduxjs/toolkit/query").FetchArgs => ({
//         url: "auth/register",
//         method: "POST",
//         body: credentials,
//       }),
//       transformResponse: (response: any): AuthResponse => {
//         return {
//           user: response.user,
//           access_token: response.access_token,
//           token_type: response.token_type,
//         };
//       },
//     }),
//     login: builder.mutation<AuthResponse, LoginRequest>({
//       query: (credentials) => ({
//         url: "auth/login",
//         method: "POST",
//         body: credentials,
//       }),
//       transformResponse: (response: any) => {
//         return {
//           user: response.user,
//           access_token: response.access_token,
//           token_type: response.token_type,
//         };
//       },
//     }),
//   }),
// });

// export const { useRegisterMutation, useLoginMutation } = authApi;
