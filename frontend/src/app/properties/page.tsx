"use client";

import React from "react";
import PropertiesHeaderSection from "../../features/properties/components/PropertiesHeaderSection";
import Section from "@/ui/SliderSection";
import { PropertyCard } from "@/features/properties/components/PropertyCard";
import { PROPERTIES } from "@/features/properties/constants";
import { Slider } from "@/ui/toolbox/Slider";
import Container from "@/ui/Container";
import Input from "@/ui/toolbox/Input";
import Checkbox from "@/ui/toolbox/Checkbox";
import AutoComplete from "@/ui/toolbox/AutoComplete";
import { useForm } from "react-hook-form";

export default function page() {
  const { control, handleSubmit } = useForm();

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
        <Container>
          <Section
            title="Let's Make it Happen"
            description="Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match. Don't wait; let's embark on this exciting journey together."
          >
            {/* Form */}
            <form className="flex flex-col gap-10 w-full border border-gray-15 rounded-md p-10">
              <div className="flex flex-col gap-10 w-full h-full ">
                <div className="flex flex-row gap-10 flex-wrap w-full">
                  <Input
                    name="firstName"
                    label="First Name"
                    placeholder="Enter First Name"
                    className="flex-1"
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    className="flex-1"
                  />
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter Your Email"
                    className="flex-1"
                  />
                  <Input
                    name="phone"
                    type="tel"
                    label="Phone"
                    placeholder="Enter Phone Number"
                    className="flex-1"
                  />
                </div>

                <div className="flex flex-row gap-10 flex-wrap w-full">
                  <AutoComplete
                    name="preferredLocation"
                    label="Preferred Location"
                    control={control}
                  />

                  <AutoComplete
                    name="preferredType"
                    label="Preferred Type"
                    control={control}
                  />

                  <AutoComplete
                    name="numberOfBathrooms"
                    label="No. of Bathrooms"
                    control={control}
                  />

                  <AutoComplete
                    name="numberOfBedrooms"
                    label="No. of Bedrooms"
                    control={control}
                  />
                </div>

                <AutoComplete
                  name="budget"
                  label="Budget"
                  control={control}
                  className="col-span-4"
                />

                <Input
                  name="message"
                  label="Message"
                  placeholder="Write Your Message"
                  className="col-span-4"
                  type="textarea"
                />
              </div>

              <div className="flex flex-row flex-wrap gap-10 w-full justify-between p-2">
                <Checkbox
                  id={"terms"}
                  name="terms"
                  label="I agree with Terms of Use and Privacy Policy"
                  className="flex-1"
                  labelProps={{ className: "text-pretty flex-1 max-w-full" }}
                />
                <button className="btn bg-purple-60 p-3 rounded-md flex-1 md:flex-none text-nowrap cursor-pointer">
                  Send Your Message
                </button>
              </div>
            </form>
          </Section>
        </Container>
      </div>
    </div>
  );
}
