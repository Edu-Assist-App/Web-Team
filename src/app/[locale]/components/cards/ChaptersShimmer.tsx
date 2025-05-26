import React from "react";

export default function ChaptersShimmer() {
  return (
    <div>
      <div className="h-6 w-40 bg-gray-200 rounded mb-4 animate-pulse" />

      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-[#f8f8f8] rounded-xl p-4 shadow-sm mb-4 animate-pulse"
        >
          <div className="w-full flex items-center justify-between mb-2">
            <div className="h-5 w-3/4 bg-gray-300 rounded" />
            <div className="h-5 w-5 bg-gray-300 rounded" />
          </div>
          <div className="h-4 w-full bg-gray-200 rounded mt-2" />
          <div className="h-4 w-5/6 bg-gray-200 rounded mt-2" />
        </div>
      ))}
    </div>
  );
}
