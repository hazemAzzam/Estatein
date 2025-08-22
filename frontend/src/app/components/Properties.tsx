import Image from "next/image";
import Link from "next/link";
import React from "react";
import PropertyCard from "./PropertyCard";
import { PropertyType } from "../types/PropertyTypes";
import { PropertySlider } from "./PropertySlider";

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
    <div className="w-full h-fit  flex items-center justify-center px-10 py-10">
      <div className="relative w-full max-w-[1400px] h-full bg-gray-08">
        <div className="w-full h-full flex flex-col items-start justify-center">
          <Image src="/assets/stars.svg" alt="" width={100} height={50} />
          <div className="px-5 w-full">
            <div className="flex flex-row flex-wrap gap-5 w-full justify-between py-5">
              <div className="flex flex-col gap-5 max-w-[1000px] ">
                <h2 className="text-5xl">Featured Properties</h2>
                <p className="text-gray-60">
                  Explore our handpicked selection of featured properties. Each
                  listing offers a glimpse into exceptional homes and
                  investments available through Estatein. Click "View Details"
                  for more information.
                </p>
              </div>
              <div className="flex items-end">
                <Link href="" className="link text-nowrap">
                  View All Properties
                </Link>
              </div>
            </div>
            <div className="flex flex-row gap-3 justify-between w-full h-fit bg-gray-08 overflow-x-auto overflow-y-hidden">
              <PropertySlider properties={PROPERTIES} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
