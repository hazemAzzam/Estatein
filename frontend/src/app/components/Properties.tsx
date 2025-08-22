import React from "react";
import PropertyCard from "./PropertyCard";
import { PropertyType } from "../types/PropertyTypes";
import SliderSection from "@/ui/SliderSection";

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
