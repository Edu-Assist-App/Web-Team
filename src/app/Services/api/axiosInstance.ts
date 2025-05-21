import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // next/navigation for client

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL || "https://eduassist-6uef.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token from NextAuth client session
axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to catch 401 and redirect
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Cannot use useRouter() here directly, so use window.location:
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
