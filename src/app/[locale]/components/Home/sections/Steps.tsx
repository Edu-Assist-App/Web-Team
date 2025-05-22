"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { useTranslations } from "next-intl";

export const Steps = (): JSX.Element => {
  const t = useTranslations("HomePage.StepsSection");
  const [showVideo, setShowVideo] = useState(false);
  const videoId = "yHk7Vavmc7Q"; // Extract from your YouTube URL

  const steps = [
    {
      id: "step-1",
      title: t("steps.step1.title"),
      content: t("steps.step1.content"),
      defaultOpen: true,
    },
    {
      id: "step-2",
      title: t("steps.step2.title"),
      content: t("steps.step2.content"),
      defaultOpen: false,
    },
    {
      id: "step-3",
      title: t("steps.step3.title"),
      content: t("steps.step3.content"),
      defaultOpen: false,
    },
  ];

  const handleToggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <section className="flex flex-col items-center gap-8 sm:gap-16 px-4 sm:px-8 lg:px-24 py-16 sm:py-[120px] border border-solid border-[#f8f8f8] w-full">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-9 text-[#040303] font-medium font-['Ubuntu',Helvetica] tracking-[0] text-center">
        {t("title")}
      </h2>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 w-full">
        {/* Demo Card */}
        <Card className="flex flex-col w-full lg:w-[565px] h-[300px] lg:h-[467px] items-center justify-center gap-6 bg-[#155ddc0a] rounded-xl overflow-hidden">
          <CardContent className="relative w-full h-full p-0 group">
            {showVideo ? (
              // YouTube Iframe
              <div className="absolute inset-0 w-full h-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl"
                ></iframe>
              </div>
            ) : (
              // YouTube Thumbnail with dark overlay
              <div
                className="absolute inset-0 w-full h-full bg-gray-200 overflow-hidden cursor-pointer"
                onClick={handleToggleVideo}
              >
                <div className="relative w-full h-full">
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Demo Preview"
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/800x450?text=Demo+Preview";
                    }}
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity group-hover:bg-opacity-40"></div>
                </div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#3800b3] bg-opacity-90 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-8 h-8 ml-1"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Steps Section (unchanged) */}
        <div className="flex flex-col items-start justify-center gap-8 p-3 flex-1 w-full">
          <Accordion
            type="single"
            collapsible
            defaultValue="step-1"
            className="w-full"
          >
            {steps.map((step) => (
              <AccordionItem key={step.id} value={step.id} className="border-0">
                <AccordionTrigger className="px-4 sm:px-8 py-4 sm:py-6 bg-white rounded-[99px] font-['Poppins',Helvetica] font-medium text-black text-lg sm:text-2xl">
                  {step.title}
                </AccordionTrigger>
                <AccordionContent className="items-start px-6 sm:px-20 py-4 sm:py-6 rounded-xl">
                  <p className="font-['Poppins',Helvetica] font-normal text-black text-base sm:text-lg">
                    {step.content}
                  </p>
                </AccordionContent>
                <div className="w-full h-px bg-[url('/divider.svg')] bg-cover"></div>
              </AccordionItem>
            ))}
          </Accordion>

          <Button className="w-full sm:w-auto px-6 py-3 bg-[#3800b3] rounded-[99px] hover:bg-[#3800b3]/90">
            <span className="font-['Ubuntu',Helvetica] font-medium text-white text-base">
              {t("joinButton.text")}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
