import Hero from "@/app/components/Hero";
import Properties from "@/app/components/Properties";
import Image from "next/image";
import ClientStory from "./components/ClientStory";
import QuestionsSection from "./components/QuestionsSection";
import CTA from "./components/CTA";

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
