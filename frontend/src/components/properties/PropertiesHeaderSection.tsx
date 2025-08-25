// "use client";

import SearchField from "@/ui/toolbox/SearchField";
import Select from "@/ui/toolbox/Select/Select";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function PropertiesHeaderSection() {
  return (
    <div
      className=" 
        flex flex-col  justify-center gap-5
        w-full h-fit"
    >
      <div
        className="
          mx-auto flex flex-col
          justify-center items-center h-full gap-2 
          [background:linear-gradient(150deg,#262626_0%,transparent_30%)] 
          w-full min-h-[250px]
          border-b-1 border-gray-15"
      >
        <div className="container h-full flex flex-col gap-2">
          <h2 className="md:text-4xl text-2xl">Find Your Dream Property</h2>
          <p className="text-gray-60 text-sm">
            Welcome to Estatein, where your dream property awaits in every
            corner of our beautiful world. Explore our curated selection of
            properties, each offering a unique story and a chance to redefine
            your life. With categories to suit every dreamer, your journey{" "}
          </p>
        </div>
      </div>
      <div className="relative container  px-5 md:-my-15!  flex flex-col gap-5 md:gap-0 items-center">
        <div
          className={`flex-grow  w-full max-w-[1200px] min-h-[50px] flex flex-row bg-gray-10 p-2  gap-2 rounded-xl md:rounded-t-xl md:rounded-b-none`}
        >
          <SearchField
            className="w-full"
            inputAttributes={{ placeholder: "Search For A Property" }}
          />
        </div>
        <div
          className={`flex-grow w-full max-w-[1400px] min-h-[50px] flex flex-row flex-wrap bg-gray-10 p-2  gap-5 rounded-xl`}
        >
          {/* Filters */}
          <Select
            icon={
              <Image
                src={"/assets/map-pin.svg"}
                alt=""
                width={25}
                height={25}
              />
            }
            placeholder="Location"
            className="flex-1"
          />
          <Select
            icon={
              <Image
                src={"/assets/home-modern.svg"}
                alt=""
                width={25}
                height={25}
              />
            }
            placeholder="Property Type"
            className="flex-1"
          />
          <Select
            icon={
              <Image
                src={"/assets/banknotes.svg"}
                alt=""
                width={25}
                height={25}
              />
            }
            placeholder="Price Range"
            className="flex-1"
          />

          <Select
            icon={
              <Image src={"/assets/cube.svg"} alt="" width={25} height={25} />
            }
            placeholder="Property Size"
            className="flex-1"
          />
          <Select
            icon={
              <Image
                src={"/assets/calendar.svg"}
                alt=""
                width={25}
                height={25}
              />
            }
            placeholder="Build Year"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
