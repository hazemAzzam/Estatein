import Hero from "@/components/landing/Hero";
import Properties from "@/components/landing/Properties";
import Image from "next/image";
import ClientStory from "../components/landing/ClientStory";
import QuestionsSection from "../components/landing/QuestionsSection";
import CTA from "../components/landing/CTA";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Properties />
      <ClientStory />
      <QuestionsSection />
      <CTA />
    </div>
  );
}
