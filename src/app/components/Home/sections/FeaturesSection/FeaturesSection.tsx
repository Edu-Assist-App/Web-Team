import React from "react";
import { Card, CardContent } from "../../../ui/card";

export const FeaturesSection = (): JSX.Element => {
  const topRowFeatures = [
    {
      id: 1,
      title: "AI Chatbot Assistance",
      description: "Get instant answers and explanations.",
      iconBg: "bg-[#f1fdff]",
      iconSrc: "/frame-3.svg",
    },
    {
      id: 2,
      title: "Smart File Management",
      description: "Upload, organize, and annotate resources.",
      iconBg: "bg-[#155ddc0a]",
      iconSrc: "/frame-3.svg",
    },
    {
      id: 3,
      title: "AI-Generated Learning Materials",
      description: "Summaries, flashcards, and quizzes.",
      iconBg: "bg-[#f1fdff]",
      iconSrc: "/frame-3.svg",
    },
  ];

  const bottomRowFeatures = [
    {
      id: 1,
      title: "Personalized Learning Paths",
      description: "Study plans tailored to your progress.",
      iconBg: "bg-[#000d9f14]",
      iconSrc: "/frame-3.svg",
    },
    {
      id: 2,
      title: "Real-Time Progress Tracking",
      description: "Monitor your learning in one place.",
      iconBg: "bg-[#000d9f14]",
      iconSrc: "/frame-3.svg",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-8 sm:gap-16 py-16 sm:py-[120px] px-4 sm:px-8 lg:px-[120px] w-full">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#040303] font-['Outfit',Helvetica] tracking-normal text-center">
        Your Smartest Study Companion
      </h2>

      <div className="flex flex-col items-start gap-4 sm:gap-8 w-full">
        {/* Top row with 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full">
          {topRowFeatures.map((feature) => (
            <Card
              key={feature.id}
              className="flex-1 rounded-3xl shadow-[0px_0px_32.5px_#00000012] border-none"
            >
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6 sm:p-[30px]">
                <div
                  className={`inline-flex items-center justify-center p-6 sm:p-8 ${feature.iconBg} rounded-[53.33px] overflow-hidden`}
                >
                  <img
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    alt="Feature icon"
                    src={feature.iconSrc}
                  />
                </div>

                <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 w-full">
                  <h3 className="font-['Ubuntu',Helvetica] font-medium text-[#040303] text-xl sm:text-2xl text-center tracking-normal w-full">
                    {feature.title}
                  </h3>
                  <p className="font-['Poppins',Helvetica] font-normal text-[#040303] text-sm sm:text-base text-center tracking-normal w-full">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom row with 2 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full">
          {bottomRowFeatures.map((feature) => (
            <Card
              key={feature.id}
              className="flex-1 h-auto sm:h-[260px] rounded-3xl shadow-[0px_0px_32.5px_#00000012] border-none"
            >
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6 sm:p-[30px] h-full">
                <div
                  className={`inline-flex items-center justify-center p-6 sm:p-8 ${feature.iconBg} rounded-[53.33px] overflow-hidden`}
                >
                  <img
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    alt="Feature icon"
                    src={feature.iconSrc}
                  />
                </div>

                <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 w-full">
                  <h3 className="font-['Ubuntu',Helvetica] font-medium text-[#040303] text-xl sm:text-2xl text-center tracking-normal w-full">
                    {feature.title}
                  </h3>
                  <p className="font-['Poppins',Helvetica] font-normal text-[#040303] text-sm sm:text-base text-center tracking-normal w-full">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};