"use client";
import {
  BadgeCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { useTranslations } from "next-intl";

export const Testimonials = (): JSX.Element => {
  const t = useTranslations("HomePage.TestimonialsSection");
  const testimonials = t.raw("testimonials");
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);
  const autoPlayTimeout = useRef<NodeJS.Timeout | null>(null);

  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollAmount = () => {
    if (!carouselRef.current) return 0;
    const width = carouselRef.current.offsetWidth;
    return width * 0.7; // Adjust scroll sensitivity
  };

  const scrollNext = () => {
    setIsAutoPlaying(false);
    carouselRef.current?.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    resetAutoPlay();
  };

  const scrollPrev = () => {
    setIsAutoPlaying(false);
    carouselRef.current?.scrollBy({
      left: -scrollAmount(),
      behavior: "smooth",
    });
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
    if (autoPlayTimeout.current) clearTimeout(autoPlayTimeout.current);

    autoPlayTimeout.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayInterval.current = setInterval(() => {
        carouselRef.current?.scrollBy({
          left: scrollAmount(),
          behavior: "smooth",
        });
      }, 5000);
    }

    return () => {
      if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
      if (autoPlayTimeout.current) clearTimeout(autoPlayTimeout.current);
    };
  }, [isAutoPlaying]);

  return (
    <section className="py-[120px] px-4 sm:px-8 lg:px-[120px] bg-[#155ddc0a] flex flex-col gap-16 w-full">
      <h2 className="font-bold text-3xl sm:text-4xl text-[#040303] font-['Ubuntu',Helvetica] tracking-[0] leading-normal text-center sm:text-left">
        {t("title")}
      </h2>

      <div className="relative w-full">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {testimonials.map((testimonial: any) => (
            <Card
              key={testimonial.id}
              className="flex-shrink-0 snap-start rounded-[20px] w-[85%] sm:w-[45%] lg:w-[30%] bg-white shadow-md transition-transform duration-300"
            >
              <CardContent className="p-6 sm:p-8 flex flex-col items-start gap-6 h-full">
                <div className="flex items-center gap-4">
                  <Avatar className="w-[60px] h-[60px] sm:w-[81.2px] sm:h-[81.2px] rounded-full bg-[#d9d9d9]">
                    <AvatarImage
                      src="/ellipse-1-2.png"
                      alt="User avatar"
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-['Ubuntu',Helvetica] font-medium text-[#3800b3] text-xl leading-[22px]">
                        {testimonial.name}
                      </span>
                      <BadgeCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#3800b3]" />
                    </div>
                    <span className="text-sm text-gray-500">
                      Verified Customer
                    </span>
                  </div>
                </div>

                <p className="font-['Poppins',Helvetica] font-normal text-gray-800 text-sm sm:text-base leading-[22.4px]">
                  {testimonial.text}
                </p>

                <div className="flex items-start gap-1 sm:gap-[6.49px] mt-auto">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img
                      key={star}
                      className="w-[18px] h-[17px] sm:w-[21.47px] sm:h-[20.42px]"
                      alt="Star"
                      src="/star-1.svg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 w-full">
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full hover:bg-[#3800b3] hover:text-white transition-colors"
          aria-label={t("navigation.previous")}
          onClick={scrollPrev}
        >
          <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full hover:bg-[#3800b3] hover:text-white transition-colors"
          aria-label={t("navigation.next")}
          onClick={scrollNext}
        >
          <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>
    </section>
  );
};
