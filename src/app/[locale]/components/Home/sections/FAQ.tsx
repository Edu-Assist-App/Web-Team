import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { useTranslations } from "next-intl";

export const FAQ = (): JSX.Element => {
  const t = useTranslations("HomePage.FAQSection");
  const faqItems = t.raw("faqItems");

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 flex flex-col gap-16 w-full">
      <h2 className="text-4xl font-medium text-[#040303] font-['Ubuntu',Helvetica] text-center">
        {t("title")}
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-0"
      >
        {faqItems.map((item: any, index: number) => (
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
