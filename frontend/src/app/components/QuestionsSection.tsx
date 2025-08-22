import React from "react";
import { AskedQuestionType } from "../types/AskedQuestionType";
import SliderSection from "@/ui/SliderSection";
import Link from "next/link";

const QUESTIONS: AskedQuestionType[] = [
  {
    title: "How do I search for properties on Estatein?",
    description:
      "Learn how to use our user-friendly search tools to find properties that match your criteria.",
  },
  {
    title: "What documents do I need to sell my property through Estatein?",
    description:
      "Find out about the necessary documentation for listing your property with us.",
  },
  {
    title: "How can I contact an Estatein agent?",
    description:
      "Discover the different ways you can get in touch with our experienced agents.",
  },
];

export default function QuestionsSection() {
  return (
    <SliderSection
      title="Frequently Asked Questions"
      description="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."
      action_name="View All FAQ’s"
      sliderItems={QUESTIONS.map((question, i) => (
        <QuestionCard question={question} key={i} />
      ))}
    />
  );
}

const QuestionCard = ({ question }: { question: AskedQuestionType }) => {
  return (
    <div
      className={`h-[250px]  border max-w-[385px] border-gray-20 rounded-md p-7`}
    >
      <div className="w-full h-full flex flex-col justify-between items-start gap-2">
        <p>{question.title}</p>
        <p className="text-gray-60">{question.description}</p>
        <Link href="" className="link-fill bg-gray-10! w-fit">
          Read More
        </Link>
      </div>
    </div>
  );
};
