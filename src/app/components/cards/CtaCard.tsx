import Image from "next/image";
import React from "react";
import { Progress } from "../ui/progress";

type CtaCardProps = {
  haveProgress: boolean | false;
  title: string | "Create your first study material now!";
  description: string | "Create your first study material now!";
  imageUrl: string | "/puzzle-icon.png";
  noChapter: boolean | false;
  chapters: number | 0;
  progress: number | 0;
};
export default function CtaCard({
  haveProgress,
  title,
  description,
  imageUrl,
  noChapter,
  chapters,
  progress,
}: CtaCardProps) {
  return (
    <div className="bg-[#f8f8f8f8] rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
      <div className="bg-white rounded-full p-4 h-24 w-24 flex items-center justify-center flex-shrink-0">
        <div className="relative">
          <Image src={imageUrl} alt="" width={64} height={64} />
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-medium mb-2">{title}</h1>
        <p className="text-gray-600 mb-4">{description}</p>

        {haveProgress && (
          <>
            {noChapter && (
              <div className=" chapter flex items-center gap-1 mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="20"
                    height="20"
                    rx="2"
                    fill="black"
                    fillOpacity="0.8"
                  />
                  <path
                    d="M5 10H15M5 6H15M5 14H12"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-medium">Total Chapter : {chapters}</span>
              </div>
            )}

            <div>
              <div className="text-sm font-medium mb-1">Course Progress</div>
              <div className="flex items-center gap-2">
                <Progress
                  value={progress}
                  className="h-2 flex-1"
                  indicatorColor="bg-[#3900B3]"
                />
                <span className="text-sm font-medium">{progress}%</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
