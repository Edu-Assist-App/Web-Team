import Image from "next/image";
import React from "react";
import { Progress } from "../ui/progress";
import { Card, CardContent } from "../ui/card";

type CtaCardProps = {
  haveProgress?: boolean;
  title: string;
  description: string;
  imageUrl: string;
  noChapter?: boolean;
  chapters?: number;
  progress?: number;
};

export default function CtaCard({
  haveProgress = false,
  title,
  description,
  imageUrl = "/puzzle-icon.png",
  noChapter = false,
  chapters = 0,
  progress = 0,
}: CtaCardProps) {
  return (
    <div className="relative overflow-hidden flex flex-col md:flex-row items-center gap-8 p-4 md:p-8 w-full bg-gradient-to-l from-[#5103ab] to-[#360271] rounded-2xl  shadow-sm">
      {/* Subtle animated floating circle accents
      <div className="absolute top-[-30px] left-[-30px] w-28 h-28 rounded-full bg-[#3800b3]/10 blur-3xl animate-float" />
      <div className="absolute bottom-[-40px] right-[-40px] w-36 h-36 rounded-full bg-[#3800b3]/15 blur-4xl " /> */}

      {/* Icon container */}
      <div className="flex items-center justify-center gap-2 px-6 py-[22px] bg-white rounded-[99px] shadow z-10">
        <Image
          className="w-12 md:w-16 h-12 md:h-16 object-cover"
          alt="Icon"
          src={imageUrl}
          width={64}
          height={64}
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-start gap-2 p-0 flex-1 text-center md:text-left z-10">
        <h2 className="font-['Ubuntu',Helvetica] font-medium text-[#ffffff] text-2xl md:text-[28px]">
          {title}
        </h2>
        <p className="font-['Poppins',Helvetica] font-normal text-[#ffffff] text-sm">
          {description}
        </p>

        {haveProgress && (
          <>
            {noChapter && (
              <div className="mt-3 flex items-center text-sm gap-2 text-[#c5adf9] font-medium">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 10H15M5 6H15M5 14H12"
                    stroke="#3800b3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Total Chapters: {chapters}
              </div>
            )}

            <div className="mt-2 w-full">
              <p className="text-xs font-medium text-[#3800b3] mb-1">
                Course Progress
              </p>
              <div className="flex items-center gap-2">
                <Progress
                  value={progress}
                  className="h-2 flex-1 bg-[#ddd]"
                  indicatorColor="bg-[#3800b3]"
                />
                <span className="text-sm font-semibold text-[#3800b3]">
                  {progress}%
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
