import Container from "@/ui/Container";
import Section from "@/ui/SliderSection";
import AutoComplete from "@/ui/toolbox/AutoComplete";
import Checkbox from "@/ui/toolbox/Checkbox";
import Input from "@/ui/toolbox/Input";
import React from "react";
import { useForm } from "react-hook-form";

export default function PropertyForm() {
  const { control, handleSubmit } = useForm();

  return (
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
  );
}
