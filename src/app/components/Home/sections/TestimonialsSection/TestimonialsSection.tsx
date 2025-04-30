import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";

export const TestimonialsSection = (): JSX.Element => {
  // FAQ data for mapping
  const faqItems = [
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking link via email.",
      defaultOpen: true,
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, PayPal, and other major payment methods.",
      defaultOpen: false,
    },
    {
      question: "How do I return or exchange an item?",
      answer:
        "You can initiate a return or exchange through your account within 30 days of purchase.",
      defaultOpen: false,
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team via email, phone, or live chat on our website.",
      defaultOpen: false,
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 flex flex-col gap-16 w-full">
      <h2 className="text-4xl font-medium text-[#040303] font-['Ubuntu',Helvetica] text-center">
        Frequently Asked Questions (FAQ)
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-0"
      >
        {faqItems.map((item, index) => (
          <AccordionItem
            key={`item-${index}`}
            value={`item-${index}`}
            className="border-b"
          >
            <AccordionTrigger className="py-4 px-6 md:px-16 text-xl font-medium font-['Poppins',Helvetica]">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-6 md:px-20 py-6">
              <p className="font-['Poppins',Helvetica] text-base">
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
