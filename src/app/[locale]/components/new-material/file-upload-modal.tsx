"use client";

import { useState, useRef } from "react";
import { X, Upload, File } from "lucide-react";
import { Button } from "@/app/[locale]/components/ui/button";
import { useTranslations } from "next-intl";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFiles: (files: { name: string; size: number; type: string }[]) => void;
}

export function FileUploadModal({
  isOpen,
  onClose,
  onAddFiles,
}: FileUploadModalProps) {
  const t = useTranslations("Materials.form.upload");
  const [files, setFiles] = useState<
    { name: string; size: number; type: string }[]
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setFiles(newFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setFiles(newFiles);
    }
  };

  const handleSubmit = () => {
    onAddFiles(files);
    setFiles([]);
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Upload className="w-5 h-5" />
            {t("label")}
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
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
              isDragging
                ? "border-purple-500 bg-purple-50"
                : "border-gray-300 hover:border-purple-500 hover:bg-purple-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />

            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-700 mb-2">{t("textDrag")}</p>
            <p className="text-gray-500 text-sm mb-4">{t("textBrowse")}</p>
            <Button
              variant="outline"
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {t("buttons.browse")}
            </Button>
            <p className="text-gray-500 text-xs mt-2">{t("description")}</p>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">
                selectedFiles, count:{files.length}
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <div className="flex items-center">
                      <File className="w-4 h-4 mr-2 text-gray-500" />
                      <div>
                        <p className="text-sm truncate max-w-[200px] md:max-w-[300px]">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setFiles(files.filter((_, i) => i !== index));
                      }}
                      className="text-gray-500 hover:text-red-500"
                      aria-label={t("removeFile")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="bg-white">
            {t("buttons.cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-purple-700 hover:bg-purple-800 text-white"
            disabled={files.length === 0}
          >
            {t("buttons.add")}
          </Button>
        </div>
      </div>
    </div>
  );
}
