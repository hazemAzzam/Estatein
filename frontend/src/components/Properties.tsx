import Image from "next/image";
import Link from "next/link";
import React from "react";
import PropertyCard from "./PropertyCard";

export default function Properties() {
  return (
    <div className="w-full min-h-screen bg-gray-08 flex items-center justify-center px-10 py-20">
      <div className="relative w-full max-w-[1400px] h-full max-h-[700px] bg-gray-08">
        <Image
          src="/assets/stars.svg"
          alt=""
          width={100}
          height={50}
          className="absolute top-[-60px] left-[-30px]"
        />
        <div className="w-full h-full flex flex-col items-center justify-center gap-20">
          <div className="flex flex-row flex-wrap gap-5 w-full justify-between">
            <div className="flex flex-col gap-5 max-w-[1000px] ">
              <h2 className="text-5xl">Featured Properties</h2>
              <p className="text-gray-60">
                Explore our handpicked selection of featured properties. Each
                listing offers a glimpse into exceptional homes and investments
                available through Estatein. Click "View Details" for more
                information.
              </p>
            </div>
            <div className="flex items-end">
              <Link href="" className="link text-nowrap">
                View All Properties
              </Link>
            </div>
          </div>
          <div className="flex flex-row gap-3 justify-between w-full h-[500px] bg-gray-08 overflow-x-auto overflow-y-hidden">
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </div>
        </div>
      </div>
    </div>
  );
}
