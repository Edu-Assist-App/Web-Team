"use client";

import { useState } from "react";
import { X, Youtube } from "lucide-react";
import { Button } from "@/app/[locale]/components/ui/button";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Materials.form.youtube");
  const [currentLink, setCurrentLink] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleAddLink = () => {
    if (!currentLink.trim()) {
      setError(t("errors.empty"));
      return;
    }

    if (!validateYouTubeUrl(currentLink)) {
      setError(t("errors.invalid"));
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
            {t("title")}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label={t("buttons.cancel")}
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
              {t("label")}
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
                placeholder={t("placeholder")}
                className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <p className="text-sm text-gray-500 mb-4">{t("description")}</p>
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="bg-white">
            {t("buttons.cancel")}
          </Button>
          <Button
            onClick={handleAddLink}
            className="bg-purple-700 hover:bg-purple-800 text-white"
          >
            {t("buttons.add")}
          </Button>
        </div>
      </div>
    </div>
  );
}
