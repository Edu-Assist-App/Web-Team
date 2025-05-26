import React from "react";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Features } from "./sections/Features";
import { Steps } from "./sections/Steps";
import { FAQ } from "./sections/FAQ";
import { Testimonials } from "./sections/Testimonials";
import { Footer } from "./sections/Footer";

export const Home = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full bg-white">
      <Header />
      <section id="hero">
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="how-it-works">
        <Steps />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="learning-process">
        <FAQ />
      </section>
      <section id="faq">
        <Footer />
      </section>
    </main>
  );
};
