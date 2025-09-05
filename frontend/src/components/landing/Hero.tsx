import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  function Card({ image, title }: { image: string; title: string }) {
    return (
      <div className="relative flex flex-col items-center justify-center gap-3 sm:gap-5 rounded-md border-1 border-gray-15 bg-gray-10 h-[120px] sm:h-[150px] text-center w-full sm:flex-1 min-w-[150px]">
        <Image
          src={image}
          alt=""
          width={40}
          height={40}
          className="sm:w-[50px] sm:h-[50px]"
        />
        <p className="text-sm sm:text-base">{title}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Top hero content */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-center w-full h-full">
        {/* Left text */}
        <div className="flex flex-col order-2 md:order-1 gap-6 items-start max-w-4xl flex-1">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight py-3 md:py-5">
              Discover Your Dream Property with Estatein
            </h2>
            <p className="text-gray-60 text-sm sm:text-base">
              Your journey to finding the perfect property begins here. Explore
              our listings to find the home that matches your dreams.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full">
            <Link href="#" className="link flex-grow text-center">
              Learn More
            </Link>
            <Link href="#" className="link-fill flex-grow text-center">
              Browse Properties
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full">
            <div className="flex flex-col bg-gray-10 rounded-md p-4 sm:p-5 flex-1 min-w-0 border-1 border-gray-15">
              <span className="text-2xl sm:text-3xl font-semibold">200+</span>
              <span className="text-gray-60 text-sm sm:text-base">
                Happy Customers
              </span>
            </div>
            <div className="flex flex-col bg-gray-10 rounded-md p-4 sm:p-5 flex-1 min-w-0 border-1 border-gray-15">
              <span className="text-2xl sm:text-3xl font-semibold">150+</span>
              <span className="text-gray-60 text-sm sm:text-base">
                Properties Listed
              </span>
            </div>
            <div className="flex flex-col bg-gray-10 rounded-md p-4 sm:p-5 flex-1 min-w-0 border-1 border-gray-15">
              <span className="text-2xl sm:text-3xl font-semibold">50+</span>
              <span className="text-gray-60 text-sm sm:text-base">
                Awards Won
              </span>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative order-1 md:order-2 w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] flex-1 min-h-[250px] overflow-hidden">
          <Image
            src="/assets/Container.png"
            alt="Property showcase"
            fill
            className="object-cover rounded-lg"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Bottom row (logos, partners, etc.) */}
      <div className="flex flex-col sm:flex-row items-center justify-center p-3 sm:p-5 gap-3 sm:gap-5 w-full border-4 border-gray-15 flex-wrap">
        <Card image="/assets/home.png" title="Find Your Dream Home" />
        <Card image="/assets/value.png" title="Unlock Property Value" />
        <Card
          image="/assets/management.png"
          title="Effortless Property Management"
        />
        <Card
          image="/assets/smart.png"
          title="Smart Investments, Informed Decisions"
        />
      </div>
    </div>
  );
}
