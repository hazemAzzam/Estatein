import Hero from "@/app/components/Hero";
import Properties from "@/app/components/Properties";
import Image from "next/image";
import ClientStory from "./components/ClientStory";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Properties />
      <ClientStory />
    </div>
  );
}
