import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // next/navigation for client

const axiosInstance = axios.create({
  baseURL:
    process.env.BACKEND_URL ||
    "https://nearby-stevana-yosephshemelesbirru-43fccccb.koyeb.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000000, // 10 second timeout
});

// Request interceptor to add token from NextAuth client session
axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("Making request to:", config.url);
    console.log("Full config:", config);
    
    if (typeof window !== "undefined") {
      const session = await getSession();
      console.log("Session in axios interceptor:", session);
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to catch 401 and redirect
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status);
    return response;
  },
  (error) => {
    console.error("Response error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: error.config
    });
    
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
