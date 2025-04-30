"use client";

import type React from "react";

import { useState, useRef } from "react";
import { X, Upload, File, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface FileUploadAreaProps {
  onClose: () => void;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export function FileUploadArea({ onClose }: FileUploadAreaProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setFiles([...files, ...newFiles]);
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
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-medium flex items-center">
          <File className="w-4 h-4 mr-2" />
          Upload Files
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? "border-purple-500 bg-purple-500/10" : "border-gray-700"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />

        <Upload className="w-10 h-10 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-300 mb-2">Drag and drop files here</p>
        <p className="text-gray-500 text-sm mb-4">or</p>
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          Browse Files
        </Button>
        <p className="text-gray-500 text-xs mt-2">
          PDF, DOCX, TXT, PPT files (max 10MB each)
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2 mt-4">
          <h4 className="text-sm font-medium text-gray-300">Uploaded Files</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 rounded-md p-2"
              >
                <div className="flex items-center">
                  <File className="w-4 h-4 mr-2 text-gray-400" />
                  <div>
                    <p className="text-sm text-white truncate max-w-[200px] sm:max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
