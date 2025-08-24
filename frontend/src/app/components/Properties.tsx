import React from "react";
import { PropertyType } from "../types/PropertyTypes";
import SliderSection from "@/ui/SliderSection";
import Link from "next/link";
import { BedDouble } from "lucide-react";
import { Text } from "@/ui/toolbox/Text";
import Image from "next/image";

const PROPERTIES: PropertyType[] = [
  {
    id: "1",
    title: "Seaside Serenity Villa",
    description:
      "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood",
    keywords: ["4-Bedroom", "3-Bathroom", "Villa"],
    thubnail: "/assets/villa.png",
    price: 550000,
  },
  {
    id: "2",
    title: "Metropolitan Haven",
    description:
      "A chic and fully-furnished 2-bedroom apartment with panoramic city views",
    keywords: ["2-Bedroom", "2-Bathroom", "Villa"],
    thubnail: "/assets/villa-2.png",
    price: 550000,
  },
  {
    id: "3",
    title: "Rustic Retreat Cottage",
    description:
      "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community",
    keywords: ["3-Bedroom", "3-Bathroom", "Villa"],
    thubnail: "/assets/villa-3.png",
    price: 550000,
  },
  {
    id: "4",
    title: "Rustic Retreat Cottage",
    description:
      "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community",
    keywords: ["3-Bedroom", "3-Bathroom", "Villa"],
    thubnail: "/assets/villa-3.png",
    price: 550000,
  },
  {
    id: "4",
    title: "Rustic Retreat Cottage",
    description:
      "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community",
    keywords: ["3-Bedroom", "3-Bathroom", "Villa"],
    thubnail: "/assets/villa-3.png",
    price: 550000,
  },
];

export default function Properties() {
  return (
    <>
      <SliderSection
        title={"Featured Properties"}
        description={`Explore our handpicked selection of featured properties. Each
                  listing offers a glimpse into exceptional homes and
                  investments available through Estatein. Click "View Details"
                  for more information.`}
        action_name={"View All Properties"}
        sliderItems={PROPERTIES.map((item, i) => (
          <PropertyCard property={item} key={i} />
        ))}
      />
    </>
  );
}

type PropertyCardProps = {
  property: PropertyType;
  className?: string;
};

const PropertyCard = ({ property, className }: PropertyCardProps) => {
  return (
    <div
      className={`h-[500px]  border max-w-[385px] border-gray-20 rounded-md p-5 ${className}`}
    >
      <div className="flex flex-col gap-5 w-full h-full">
        <div className="relative w-full h-full">
          <Image src={property.thubnail} alt="" fill />
        </div>
        <div className="relative w-full h-full flex flex-col gap-2 items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl">{property.title}</h3>
            <Text
              text={property.description}
              lineClamp={2}
              className="text-gray-60 text-[14px]"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {property?.keywords.map((keyword, i) => {
              return (
                <div
                  key={i}
                  className="bg-gray-15 rounded-full px-3 py-1 flex items-center gap-1"
                >
                  <BedDouble size={19} /> <span>{keyword}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-1 items-center justify-between w-full flex-row">
            <div className="flex flex-col w-fit">
              <span className="text-gray-60">price</span>
              <span className="text-xl">
                {property.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <Link href="" className="link-fill text-nowrap text-center">
              View Property Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
