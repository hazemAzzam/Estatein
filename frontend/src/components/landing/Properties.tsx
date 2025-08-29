import React from "react";
import Section from "@/ui/SliderSection";
import { PROPERTIES } from "@/features/properties/constants";
import { PropertyCard } from "@/features/properties/components/PropertyCard";
import { Slider } from "@/ui/toolbox/Slider";

export default function Properties() {
  return (
    <>
      <Section
        title={"Featured Properties"}
        description={`Explore our handpicked selection of featured properties. Each
                  listing offers a glimpse into exceptional homes and
                  investments available through Estatein. Click "View Details"
                  for more information.`}
        action_name={"View All Properties"}
      >
        <Slider
          Items={PROPERTIES.map((item, i) => (
            <PropertyCard property={item} key={i} />
          ))}
        />
      </Section>
    </>
  );
}
