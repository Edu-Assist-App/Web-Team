import React from "react";

export default function ShimmerCta() {
  return (
    <div className="relative overflow-hidden flex flex-col md:flex-row items-center gap-8 p-4 md:p-8 w-full bg-gray-200 rounded-2xl shadow-sm animate-pulse">
      {/* Icon placeholder */}
      <div className="flex items-center justify-center gap-2 px-6 py-[22px] bg-gray-50 rounded-[99px] shadow z-10">
        <div className="w-12 md:w-16 h-12 md:h-16 bg-gray-300 rounded-full" />
      </div>

      {/* Text and Progress placeholder */}
      <div className="flex flex-col items-start gap-3 flex-1 z-10 w-full">
        <div className="w-3/4 h-6 bg-gray-300 rounded-md" /> {/* title */}
        <div className="w-2/3 h-4 bg-gray-300 rounded-md" />{" "}
        {/* Progress bar */}
        <div className="w-full mt-2 space-y-2">
          <div className="w-24 h-3 bg-gray-300 rounded-md" />
          <div className="w-full h-2 bg-gray-300 rounded-md" />
        </div>
      </div>
    </div>
  );
}
