"use client";

import { useState } from "react";
import { Button } from "@/app/[locale]/components/ui/button";
import { Card } from "@/app/[locale]/components/ui/card";
import { Textarea } from "../ui/Textarea";
import { FileUp, YoutubeIcon, Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CourseCreator() {
  const [description, setDescription] = useState("");
  const route = useRouter();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="bg-gray-50 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white rounded-full p-6 flex-shrink-0">
            <div className="w-16 h-16 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect
                  x="10"
                  y="10"
                  width="35"
                  height="35"
                  rx="5"
                  fill="#e74c3c"
                />
                <rect
                  x="55"
                  y="10"
                  width="35"
                  height="35"
                  rx="5"
                  fill="#f1c40f"
                />
                <rect
                  x="10"
                  y="55"
                  width="35"
                  height="35"
                  rx="5"
                  fill="#3498db"
                />
                <rect
                  x="55"
                  y="55"
                  width="35"
                  height="35"
                  rx="5"
                  fill="#2ecc71"
                />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Start Building Your Study Material
            </h1>
            <p className="text-gray-700 text-lg">
              Turn Your Ideas Into Structured Courses in Minutes
            </p>
          </div>
        </div>
      </Card>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-4">Course Description / Prompt</h2>
        <div className="border border-purple-300 rounded-2xl p-1">
          <div className="relative">
            <div className="absolute left-4 top-4 flex space-x-2">
              <div className="relative group">
                <button className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800">
                  <span className="text-lg">+</span>
                </button>
                <div className="absolute left-0 top-full mt-1 bg-white shadow-md rounded-md py-1 w-40 hidden group-hover:block hover:block z-10 border border-gray-200">
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2">
                    <FileUp className="h-4 w-4" />
                    <span>Upload</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2">
                    <YoutubeIcon className="h-4 w-4" />
                    <span>YouTube Link</span>
                  </button>
                </div>
              </div>
              <button className="text-gray-500 w-8 h-8 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <Textarea
              placeholder="e.g., Create a beginner-friendly course on Python."
              className="min-h-[200px] pl-20 pr-4 pt-4 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between mt-2 px-2">
          <div className="text-gray-500 text-sm">
            {description.length}/10000
          </div>
          <Button
            onClick={() => {
              route.push("/materials/4");
            }}
            className="bg-purple-700 hover:bg-purple-800 rounded-full px-6"
          >
            Generate
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
