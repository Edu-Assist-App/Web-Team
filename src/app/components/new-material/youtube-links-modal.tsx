"use client";

import { useState } from "react";
import { X, Youtube } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface YoutubeLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLink: (link: string) => void;
}

export function YoutubeLinksModal({
  isOpen,
  onClose,
  onAddLink,
}: YoutubeLinksModalProps) {
  const [currentLink, setCurrentLink] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const validateYouTubeUrl = (url: string) => {
    // Basic validation for YouTube URLs
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleAddLink = () => {
    if (!currentLink.trim()) {
      setError("Please enter a YouTube link");
      return;
    }

    if (!validateYouTubeUrl(currentLink)) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    onAddLink(currentLink);
    setCurrentLink("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium flex items-center">
            <Youtube className="w-5 h-5 mr-2 text-red-500" />
            Add YouTube Link
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <label
              htmlFor="youtube-link"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              YouTube URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Youtube className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="youtube-link"
                type="text"
                value={currentLink}
                onChange={(e) => {
                  setCurrentLink(e.target.value);
                  setError("");
                }}
                placeholder="https://www.youtube.com/watch?v=..."
                className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Add a YouTube video link that contains relevant content for your
            study material.
          </p>
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="bg-white">
            Cancel
          </Button>
          <Button
            onClick={handleAddLink}
            className="bg-purple-700 hover:bg-purple-800 text-white"
          >
            Add Link
          </Button>
        </div>
      </div>
    </div>
  );
}
