import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

export const Steps = (): JSX.Element => {
  const steps = [
    {
      id: "step-1",
      title: "Upload Your Learning Materials",
      content: "PDFs, videos, and links.",
      defaultOpen: true,
    },
    {
      id: "step-2",
      title: "Chat with AI for Instant Help",
      content: "",
      defaultOpen: false,
    },
    {
      id: "step-3",
      title: "Learn & Track Progress",
      content: "",
      defaultOpen: false,
    },
  ];

  return (
    <section className="flex flex-col items-center gap-8 sm:gap-16 px-4 sm:px-8 lg:px-24 py-16 sm:py-[120px] border border-solid border-[#f8f8f8] w-full">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-9 text-[#040303] font-medium font-['Ubuntu',Helvetica] tracking-[0] text-center">
        Learning Made Simple – Just 3 Steps!
      </h2>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 w-full">
        {/* Demo Card */}
        <Card className="flex flex-col w-full lg:w-[565px] h-[300px] lg:h-[467px] items-center justify-center gap-6 p-6 bg-[#155ddc0a] rounded-xl">
          <CardContent className="flex items-center justify-center w-full h-full p-0">
            <Button
              variant="outline"
              className="inline-flex items-center gap-[10.38px] pl-[10.38px] pr-[31.15px] py-[10.38px] bg-white rounded-[128.5px] border-[0.65px] border-solid border-[#0000001a]"
            >
              <span className="inline-flex items-center justify-center gap-[10.38px] p-[10.38px] bg-[#3800b3] rounded-[128.5px]">
                <img
                  className="w-[20.77px] h-[20.77px]"
                  alt="Frame"
                  src="/frame-8.svg"
                />
              </span>
              <span className="font-['Ubuntu',Helvetica] font-medium text-[#090909] text-[15.6px]">
                View Live Demo
              </span>
            </Button>
          </CardContent>
        </Card>

        {/* Steps Section */}
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
              Join Now →
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
