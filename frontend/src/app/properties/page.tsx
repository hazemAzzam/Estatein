"use client";

import React from "react";
import PropertiesHeaderSection from "../../features/properties/components/PropertiesHeaderSection";
import Section from "@/ui/SliderSection";
import { PropertyCard } from "@/features/properties/components/PropertyCard";
import { PROPERTIES } from "@/features/properties/constants";
import { Slider } from "@/ui/toolbox/Slider";
import Container from "@/ui/Container";
import PropertyForm from "@/features/properties/components/PropertyForm";

export default function page() {
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col w-full h-full gap-25  justify-between">
        <PropertiesHeaderSection />
        <Container>
          <Section
            title="Discover a World of Possibilities"
            description="Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home"
          >
            <Slider
              Items={PROPERTIES.map((item, i) => (
                <PropertyCard property={item} key={i} />
              ))}
            />
          </Section>
        </Container>
        <PropertyForm />
      </div>
    </div>
  );
}
