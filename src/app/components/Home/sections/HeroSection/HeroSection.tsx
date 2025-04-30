import React from "react";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";

export const HeroSection = (): JSX.Element => {
  const features = [
    {
      icon: "/frame-3.svg",
      title: "AI-Generated Learning Materials",
      position: "left-top",
    },
    {
      icon: "/frame-18.svg",
      title: "Smart File Management",
      position: "left-bottom",
    },
    {
      icon: "/frame-10.svg",
      title: "Personalized Learning Paths",
      position: "right-top",
    },
    {
      icon: "/frame-15.svg",
      title: "Real-Time Progress Tracking",
      position: "right-bottom",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center w-full gap-8 pt-0 pb-8 px-4 sm:px-8">
      <div className="flex flex-col items-center justify-center w-full gap-8 sm:gap-16 pt-20 sm:pt-40 pb-10 sm:pb-20 px-4 sm:px-8 lg:px-[120px] rounded-3xl [background:radial-gradient(50%_50%_at_50%_46%,rgba(241,253,255,1)_68%,rgba(255,255,255,1)_100%)]">
        {/* Hero content */}
        <div className="flex flex-col w-full lg:w-[833px] items-center justify-center gap-6">
          {/* Badge */}
          <Badge className="gap-2 pl-2 pr-6 py-1 bg-white rounded-[99px]">
            <div className="inline-flex items-center justify-center gap-2 p-2 bg-[#3800b3] rounded-[99px]">
              <img className="w-4 h-4" alt="Start icon" src="/frame-2.svg" />
            </div>
            <span className="font-medium text-[#090218] text-xs font-['Poppins',Helvetica]">
              Start your journey
            </span>
          </Badge>

          {/* Heading */}
          <h1 className="self-stretch text-3xl sm:text-4xl lg:text-[52px] text-center leading-normal font-['Ubuntu',Helvetica] font-medium tracking-[0]">
            <span className="text-[#040303]">
              Unlock Personalized Learning with{" "}
            </span>
            <span className="text-[#3800b3]">AI-Powered</span>
            <span className="text-[#040303]"> Assistance</span>
          </h1>

          {/* Subheading */}
          <p className="self-stretch font-['Poppins',Helvetica] font-normal text-[#040303] text-sm sm:text-base text-center px-4">
            EduAssist helps students, educators, and professionals learn smarter
            with AI-driven insights, multilingual support, and personalized
            study tools.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-6 w-full sm:w-auto">
            <Button className="w-full sm:w-auto px-6 py-3.5 bg-[#3800b3] rounded-[99px] font-['Ubuntu',Helvetica] font-medium text-white text-base">
              Join for Free →
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto gap-2 pl-2 pr-6 py-2 bg-white rounded-[99px] border-[0.5px] border-solid border-[#3800b3]"
            >
              <div className="inline-flex items-center justify-center gap-2 p-2 bg-[#3800b3] rounded-[99px]">
                <img className="w-4 h-4" alt="Demo icon" src="/frame-29.svg" />
              </div>
              <span className="font-['Ubuntu',Helvetica] font-medium text-[#090909] text-sm">
                View Live Demo
              </span>
            </Button>
          </div>
        </div>

        {/* Features diagram - Hidden on mobile, visible on tablet and desktop */}
        <div className="hidden md:flex items-center justify-center py-16 w-full">
          {/* Left features */}
          <div className="flex flex-col w-[277px] items-start gap-8 p-2">
            {features.slice(0, 2).map((feature, index) => (
              <Card
                key={`left-${index}`}
                className="flex items-center justify-center gap-3 px-8 py-6 w-full bg-white rounded-3xl border-[0.5px] border-solid border-[#000da0b2]"
              >
                <CardContent className="p-0 flex items-center gap-3">
                  {index === 0 ? (
                    <div className="inline-flex items-center gap-[10.04px] p-5 bg-white rounded-[50.2px] overflow-hidden border border-solid border-[#1a18e414]">
                      <img
                        className="w-6 h-6"
                        alt={feature.title}
                        src={feature.icon}
                      />
                    </div>
                  ) : (
                    <img alt={feature.title} src={feature.icon} />
                  )}
                  <div className="flex-1 font-['Ubuntu',Helvetica] font-medium text-[#090909] text-base">
                    {feature.title}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Left connector */}
          <img
            className="w-[179.32px] h-[95.73px] ml-[-7px]"
            alt="Left connector"
            src="/vector-2.svg"
          />

          {/* Center logo */}
          <div className="flex-col justify-center gap-2.5 p-[30px] ml-[-7px] bg-[#000da008] rounded-[48px] border border-solid border-[#000d9f] shadow-[0px_1.25px_31.25px_#1b19e51a] backdrop-blur backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(8px)_brightness(100%)] inline-flex items-center">
            <img
              className="w-[60px] h-[60px] z-[1]"
              alt="EduAssist logo"
              src="/frame-11.svg"
            />
            <div className="z-0 font-medium text-[#040303] text-2xl font-['Ubuntu',Helvetica] whitespace-nowrap">
              EduAssist
            </div>
          </div>

          {/* Right connector */}
          <img
            className="w-[179.32px] h-[95.73px] ml-[-7px]"
            alt="Right connector"
            src="/vector-5.svg"
          />

          {/* Right features */}
          <div className="flex flex-col items-start gap-8 p-2 flex-1 grow ml-[-7px]">
            {features.slice(2, 4).map((feature, index) => (
              <Card
                key={`right-${index}`}
                className="flex items-center justify-center gap-3 px-8 py-6 w-full bg-white rounded-3xl border-[0.5px] border-solid border-[#000da0b2]"
              >
                <CardContent className="p-0 flex items-center gap-3">
                  <div className="inline-flex items-center gap-[10.04px] p-5 bg-white rounded-[50.2px] overflow-hidden border border-solid border-[#1a18e414]">
                    <img
                      className="w-6 h-6"
                      alt={feature.title}
                      src={feature.icon}
                    />
                  </div>
                  <div className="flex-1 font-['Ubuntu',Helvetica] font-medium text-[#090909] text-base">
                    {feature.title}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mobile Features List */}
        <div className="flex flex-col gap-4 md:hidden w-full px-4">
          {features.map((feature, index) => (
            <Card
              key={`mobile-${index}`}
              className="w-full bg-white rounded-xl border-[0.5px] border-solid border-[#000da0b2]"
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className="inline-flex items-center justify-center p-3 bg-white rounded-full border border-solid border-[#1a18e414]">
                  <img
                    className="w-5 h-5"
                    alt={feature.title}
                    src={feature.icon}
                  />
                </div>
                <div className="font-['Ubuntu',Helvetica] font-medium text-[#090909] text-sm">
                  {feature.title}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};