import React from "react";
import { FAQSection } from "./sections/FAQSection/FAQSection";
import { FeaturesSection } from "./sections/FeaturesSection/FeaturesSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { LearningProcessSection } from "./sections/LearningProcessSection/LearningProcessSection";
import { StudyCompanionSection } from "./sections/StudyCompanionSection/StudyCompanionSection";
import { TestimonialsSection } from "./sections/TestimonialsSection/TestimonialsSection";

export const Home = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full bg-white">
      <HeaderSection />
      <section id="hero">
        <HeroSection />
      </section>
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="how-it-works">
        <StudyCompanionSection />
      </section>
      <section id="learning-process">
        <LearningProcessSection />
      </section>
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      <section id="faq">
        <FAQSection />
      </section>
    </main>
  );
};