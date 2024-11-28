'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'I offer comprehensive web and product design services, including website design, user experience (UX) design, user interface (UI) design, responsive design, prototyping, branding, and usability testing. My goal is to create visually appealing and user-friendly digital experiences that meet your business needs.',
  },
  {
    question: 'How do you approach a new design project?',
    answer:
      'I begin with a thorough discovery phase to understand your goals, target audience, and requirements. Then, I create wireframes and prototypes, iterate based on feedback, and finally deliver the polished product.',
  },
  {
    question: 'Can you redesign my existing website or product?',
    answer:
      "Yes, I specialize in both new designs and redesigns. I'll analyze your current design, identify areas for improvement, and create a modern, user-friendly solution.",
  },
  {
    question: 'How long does a typical design project take?',
    answer:
      'Project timelines vary based on scope and complexity. A typical website design might take 4-8 weeks, while larger products could take 3-6 months.',
  },
  {
    question: 'How do you ensure the designs are user-friendly and accessible?',
    answer:
      'I follow WCAG guidelines, conduct user testing, and implement responsive design principles to ensure all users can access and navigate the design effectively.',
  },
  {
    question: 'How can I get started with your services?',
    answer:
      "Fill out the project inquiry form on this page, and I'll get back to you within 24-48 hours to discuss your project in detail.",
  },
];

export default function FaqSection() {
  return (
    <section className="py-12">
      <h2 className="text-4xl font-bold text-white mb-8">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-gray-800 rounded-lg px-4"
          >
            <AccordionTrigger className="text-lg font-medium text-white hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
