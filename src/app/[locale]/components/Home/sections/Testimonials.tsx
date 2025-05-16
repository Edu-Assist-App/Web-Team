import {
  BadgeCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

export const Testimonials = (): JSX.Element => {
  // Testimonial data for mapping
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      image: "/ellipse-1-2.png",
      text: '"EduAssist transformed the way I study! The AI chatbot makes complex topics easy to understand, and the personalized quizzes help me retain knowledge better."',
    },
    {
      id: 2,
      name: "Sarah M.",
      image: "/ellipse-1-2.png",
      text: '"EduAssist transformed the way I study! The AI chatbot makes complex topics easy to understand, and the personalized quizzes help me retain knowledge better."',
    },
    {
      id: 3,
      name: "Sarah M.",
      image: "/ellipse-1-2.png",
      text: '"EduAssist transformed the way I study! The AI chatbot makes complex topics easy to understand, and the personalized quizzes help me retain knowledge better."',
    },
  ];

  return (
    <section className="py-[120px] px-[120px] bg-[#155ddc0a] flex flex-col gap-16 w-full">
      <h2 className="font-bold text-4xl text-[#040303] font-['Ubuntu',Helvetica] tracking-[0] leading-normal">
        See What Our Users Say
      </h2>

      <div className="flex gap-6 w-full">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="flex-1 rounded-[20px] overflow-hidden"
          >
            <CardContent className="p-8 flex flex-col items-start gap-6">
              <Avatar className="w-[81.2px] h-[81.2px] rounded-full bg-[#d9d9d9]">
                <AvatarImage
                  src={testimonial.image}
                  alt="User avatar"
                  className="object-cover"
                />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start gap-3 w-full">
                <div className="flex items-center gap-1">
                  <span className="font-['Ubuntu',Helvetica] font-medium text-black text-xl leading-[22px]">
                    {testimonial.name}
                  </span>
                  <BadgeCheckIcon className="w-6 h-6" />
                </div>

                <p className="font-['Poppins',Helvetica] font-normal text-[#00000099] text-base leading-[22.4px]">
                  {testimonial.text}
                </p>
              </div>

              <div className="flex items-start gap-[6.49px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    className="w-[21.47px] h-[20.42px]"
                    alt="Star"
                    src="/star-1.svg"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 w-full">
        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            size="icon"
            className="w-[52px] h-[52px] rounded-full"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-[52px] h-[52px] rounded-full"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};
