import React from "react";
import { ClientStoryType } from "../../types/ClientStoryTypes";
import Section from "@/components/ui/SliderSection";
import { Star } from "lucide-react";
import Image from "next/image";
import { Slider } from "@/components/ui/Slider";

const STORIES: ClientStoryType[] = [
  {
    stars: 5,
    title: "Exceptional Service!",
    experience:
      "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
    user_picture: "/assets/user-1.png",
    user_name: "Wade Warren",
    user_city: "USA, California",
  },
  {
    stars: 5,
    title: "Efficient and Reliable",
    experience:
      "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
    user_picture: "/assets/user-2.png",
    user_name: "Emelie Thomson",
    user_city: "USA, Florida",
  },
  {
    stars: 5,
    title: "Trusted Advisors",
    experience:
      "The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!",
    user_picture: "/assets/user-3.png",
    user_name: "John Mans",
    user_city: "USA, Nevada",
  },
];

export default function ClientStory() {
  return (
    <>
      <Section
        title="What Our Clients Say"
        description={`Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs.`}
        action_name="View All Testimonials"
      >
        <Slider
          Items={STORIES.map((story, i) => (
            <ClientStoryCard story={story} key={i} />
          ))}
        />
      </Section>
    </>
  );
}

const ClientStoryCard = ({ story }: { story: ClientStoryType }) => {
  return (
    <div
      className={`max-h-[400px] h-fit  border max-w-[385px] border-gray-20 rounded-md p-7`}
    >
      <div className="flex flex-col justify-around gap-5 h-full w-full">
        <div className="flex gap-2 ">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-full bg-gray-10 p-2 border border-gray-15"
            >
              <Star
                key={i}
                // size={20}
                fill={i < story.stars ? "#FFE500" : "transparent"}
                className="text-[#FFE500] stroke-[#FFE500] w-[20px] h-[20px] md:w-[25px] md:h-[25px]"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-3">
          <p className="text-2xl text-white">{story.title}</p>
          <p className="text-white">{story.experience}</p>
        </div>
        <div className="flex flex-row gap-3">
          <div className="">
            <Image src={story.user_picture} width={50} height={50} alt="" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <p>{story.user_name}</p>
            <p className="text-gray-60">{story.user_city}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
