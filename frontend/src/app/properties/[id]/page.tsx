import Gallery from "@/features/properties/components/details/Gallery";
import { PROPERTIES } from "@/features/properties/constants";
import { getRandomImages } from "@/features/properties/utils";
import Container from "@/components/ui/Container";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import PropertyDescriptionSection from "@/features/properties/components/details/PropertyDescriptionSection";
import PropertyFeaturesSection from "@/features/properties/components/details/PropertyFeaturesSection";
import PropertyInquireSection from "@/features/properties/components/details/PropertyInquireSection";

export default async function PropertyDetails(
  props: PageProps<"/properties/[id]">
) {
  const { id } = await props.params;
  const property = PROPERTIES.find((property) => property.id === id);

  if (!property) {
    notFound();
  }

  const images = await getRandomImages(9);
  return (
    <Container>
      <div className="flex flex-col gap-8 py-8">
        {/* Header */}
        <div className="flex flex-row items-center justify-between flex-wrap gap-5">
          <div className="flex flex-row items-center gap-4 flex-wrap">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <div className="flex flex-row items-center gap-1 border border-gray-20 p-2 rounded-lg">
              <MapPin size={20} />
              <h2 className="font-bold">{property.location}</h2>
            </div>
          </div>

          <div className="flex flex-col text-start">
            <span className="text-gray-500">Price</span>
            <span className="text-2xl font-semibold text-primary">
              ${property.price.toLocaleString()}
            </span>
          </div>
        </div>

        <Gallery images={images} />

        <div className="flex flex-row gap-4 w-full flex-wrap ">
          <PropertyDescriptionSection property={property} />
          <PropertyFeaturesSection property={property} />
        </div>

        <PropertyInquireSection property={property} />
      </div>
    </Container>
  );
}
