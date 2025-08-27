import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="grid grid-rows-[auto_auto]">
      {/* Top hero content */}
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] items-center w-full h-full">
        {/* Left text */}
        <div className="flex flex-col order-2 md:order-1 gap-6 p-10 items-start  max-w-4xl">
          <div>
            <h2 className="text-6xl font-bold leading-tight py-5">Discover Your Dream Property with Estatein</h2>
            <p className="text-gray-60">Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.</p>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-5 flex-wrap">
            <Link href="#" className="link flex-grow">
              Learn More
            </Link>
            <Link href="#" className="link-fill flex-grow">
              Browse Properties
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-5 w-full">
            <div className="flex flex-col bg-gray-10 rounded-md p-5 flex-1 min-w-[200px] border-1 border-gray-15">
              <span className="text-3xl font-semibold">200+</span>
              <span className="text-gray-60">Happy Customers</span>
            </div>
            <div className="flex flex-col bg-gray-10 rounded-md p-5 flex-1 min-w-[200px] border-1 border-gray-15">
              <span className="text-3xl font-semibold">150+</span>
              <span className="text-gray-60">Properties Listed</span>
            </div>
            <div className="flex flex-col bg-gray-10 rounded-md p-5 flex-1 min-w-[200px] border-1 border-gray-15">
              <span className="text-3xl font-semibold">50+</span>
              <span className="text-gray-60">Awards Won</span>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative order-1 md:order-2 w-full h-[600px] aspect-square">
          <Image src="/assets/Container.png" alt="Property showcase" fill className="object-fill" priority />
        </div>
      </div>

      {/* Bottom row (logos, partners, etc.) */}
      <div className="row-span-1 flex items-center justify-center p-5 gap-5 flex-wrap w-full border-4 border-gray-15">
        <div className="relative flex flex-col items-center justify-center gap-5 rounded-md border-1 border-gray-15 bg-gray-10 h-[150px] text-center flex-1 min-w-[250px]">
          <Image src="/assets/home.png" alt="" width={50} height={50} />
          <p>Find Your Dream Home</p>
        </div>
        <div className="relative flex flex-col items-center justify-center gap-5 rounded-md border-1 border-gray-15 bg-gray-10 h-[150px] text-center flex-1 min-w-[250px]">
          <Image src="/assets/value.png" alt="" width={50} height={50} />
          <p>Unlock Property Value</p>
        </div>
        <div className="relative flex flex-col items-center justify-center gap-5 rounded-md border-1 border-gray-15 bg-gray-10 h-[150px] text-center flex-1 min-w-[250px]">
          <Image src="/assets/management.png" alt="" width={50} height={50} />
          <p>Effortless Property Management</p>
        </div>
        <div className="relative flex flex-col items-center justify-center gap-5 rounded-md border-1 border-gray-15 bg-gray-10 h-[150px] text-center flex-1 min-w-[250px]">
          <Image src="/assets/smart.png" alt="" width={50} height={50} />
          <p>Smart Investments, Informed Decisions</p>
        </div>
      </div>
    </div>
  );
}
