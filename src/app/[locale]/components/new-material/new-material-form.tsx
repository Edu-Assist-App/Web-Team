"use client";

import type React from "react";

import { useState, useRef, use } from "react";
import {
  PlusCircle,
  X,
  Paperclip,
  Youtube,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/app/[locale]/components/ui/button";
import { FileUploadModal } from "./file-upload-modal";
import { YoutubeLinksModal } from "./youtube-links-modal";
import { useTranslations } from "next-intl";
import { createCourse } from "@/app/Services/api/course";
import {
  generateLearningPathOutline,
  createLearningPathFromOutline,
} from "../../../Services/api/learning";
import { set } from "react-hook-form";

export function NewMaterialForm() {
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Materials.form");
  const [files, setFiles] = useState<
    { name: string; size: number; type: string }[]
  >([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [uploadedItemsExpanded, setUploadedItemsExpanded] = useState(true);

  const handleOptionClick = (option: "youtube" | "file") => {
    if (option === "youtube") {
      setShowYoutubeModal(true);
    } else {
      setShowFileModal(true);
    }
    setShowOptions(false);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const addYoutubeLink = (link: string) => {
    setYoutubeLinks([...youtubeLinks, link]);
  };

  const removeYoutubeLink = (index: number) => {
    setYoutubeLinks(youtubeLinks.filter((_, i) => i !== index));
  };

  const addFiles = (
    newFiles: { name: string; size: number; type: string }[]
  ) => {
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      // 1. Create the course
      const courseData = await createCourse({
        prompt,
        title,
        sub_title: subtitle,
        description,
      });
      const courseId = courseData.id;
      console.log("Course created:", courseData);

      // 2. Placeholder for file upload
      // TODO: Implement file upload logic here and associate with courseId

      // 3. Generate learning path outline
      const outlineData = await generateLearningPathOutline(courseId);
      console.log("Learning path outline generated:", outlineData);

      // 4. Create learning path from outline
      const learningPath = await createLearningPathFromOutline(courseId);
      console.log("Learning path created:", learningPath);

      // 5. Display learning path (or navigate, etc.)
      // For now, just logging as requested
      // navigate using window location instead of Router
      window.location.href = `/materials/${courseId}`;
      console.log("Final Learning Path:", learningPath);
      setIsLoading(false);

      // Optionally, reset form fields or navigate the user
      // setPrompt("");
      // setTitle("");
      // setSubtitle("");
      // setDescription("");
      // setFiles([]);
      // setYoutubeLinks([]);
    } catch (error) {
      console.error("Error in generation process:", error);
      // Handle errors appropriately in the UI
    }
  };

  return (
    <>
      {/* Input Section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">{t("label")}</h2>
        <div className="space-y-4 mb-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label
              htmlFor="subtitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter course subtitle (optional)"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description"
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div className="relative">
          <div className="border border-purple-700 rounded-xl bg-gray-50 overflow-hidden">
            <div className="flex items-start p-4">
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors mr-2 mt-1"
                >
                  {showOptions ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <PlusCircle className="w-5 h-5" />
                  )}
                </button>

                {/* Dropdown Options */}
                {showOptions && (
                  <div className="absolute top-8 left-0 bg-white rounded-md shadow-lg z-10 w-48 py-1 border">
                    <button
                      onClick={() => handleOptionClick("file")}
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                    >
                      <Paperclip className="w-4 h-4 mr-2" />
                      {t("upload.label")}
                    </button>
                    <button
                      onClick={() => handleOptionClick("youtube")}
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                    >
                      <Youtube className="w-4 h-4 mr-2" />
                      {t("youtube.label")}
                    </button>
                  </div>
                )}
              </div>

              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={handleTextareaChange}
                placeholder={t("placeholder")}
                className="flex-grow bg-transparent border-none outline-none resize-none min-h-[100px] pt-1 text-gray-800"
                rows={1}
              />
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1 flex justify-between">
            <span>0/10000</span>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-end mb-6">
        <Button
          onClick={handleGenerate}
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              t("buttons.generate")
              <Send className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </div>

      {/* Uploaded Files and YouTube Links Section Wrapper */}
      {/* This wrapper reserves space */}
      <div className="min-h-[56px]">
        {(files.length > 0 || youtubeLinks.length > 0) && (
          <>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-medium">
                Uploaded Files and Youtube Links
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setUploadedItemsExpanded(!uploadedItemsExpanded)}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                {uploadedItemsExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </Button>
            </div>

            {uploadedItemsExpanded && (
              <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 border border-gray-300 rounded-lg p-3 bg-white shadow-sm">
                {/* Files Section */}
                {files.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-gray-700">
                      {t("upload.label")} ({files.length})
                    </h3>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded hover:bg-gray-100"
                        >
                          <div className="flex items-center min-w-0">
                            <Paperclip className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm text-gray-800 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-red-500 p-1 ml-2 flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* YouTube Links Section */}
                {youtubeLinks.length > 0 && (
                  <div>
                    <h3
                      className={`text-sm font-medium mb-2 text-gray-700 ${
                        files.length > 0 ? "mt-3" : ""
                      }`}
                    >
                      {t("youtube.label")} ({youtubeLinks.length})
                    </h3>
                    <div className="space-y-2">
                      {youtubeLinks.map((link, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded hover:bg-gray-100"
                        >
                          <div className="flex items-center flex-grow overflow-hidden">
                            <Youtube className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline truncate"
                            >
                              {link}
                            </a>
                          </div>
                          <button
                            onClick={() => removeYoutubeLink(index)}
                            className="text-gray-400 hover:text-red-500 ml-2 flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <FileUploadModal
        isOpen={showFileModal}
        onClose={() => setShowFileModal(false)}
        onAddFiles={addFiles}
      />

      <YoutubeLinksModal
        isOpen={showYoutubeModal}
        onClose={() => setShowYoutubeModal(false)}
        onAddLink={addYoutubeLink}
      />
    </>
  );
}
