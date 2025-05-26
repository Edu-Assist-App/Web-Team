import React from "react";

export default function ShimmerCourse() {
  return (
    <div
      className="flex flex-col items-start gap-[13.24px] p-1 rounded-[10.39px] sm:w-full animate-pulse"
      aria-busy="true"
    >
      {/* Image Placeholder */}
      <div className="relative w-full">
        <div
          className="w-full h-[194.64px] rounded-lg bg-gray-200"
          aria-hidden="true"
        />
        <div
          className="absolute top-2 right-2 w-8 h-8 bg-gray-200 rounded-[28px]"
          aria-hidden="true"
        />
      </div>

      {/* Text Placeholder */}
      <div className="flex flex-col items-start gap-[9.93px] p-0 w-full">
        <div className="flex flex-col items-start justify-center gap-[5.56px] w-full">
          <div className="w-3/4 h-5 bg-gray-200 rounded" aria-hidden="true" />
          <div className="w-full h-4 bg-gray-200 rounded" aria-hidden="true" />
          <div className="w-2/3 h-4 bg-gray-200 rounded" aria-hidden="true" />
        </div>
      </div>

      {/* Button Placeholder */}
      <div className="w-24 h-8 bg-gray-200 rounded-[99px]" aria-hidden="true" />
    </div>
  );
}
