import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CTA() {
  return (
    <div className="relative h-fit w-full  py-[50px] flex items-center justify-center">
      <div className="absolute w-full top-0 left-0 z-[-1] h-full flex flex-row ">
        <div className="relative w-full h-full flex flex-row justify-between">
          <div className="relative max-w-1/3 flex-1">
            <Image src="/assets/squares-bg.png" alt="" fill />
          </div>
          <div className="relative max-w-1/3 flex-1">
            <Image
              src="/assets/squares-bg.png"
              alt=""
              fill
              className="right-0 scale-x-[-1]"
            />
          </div>
        </div>
      </div>
      <Container className="relative z-1 flex flex-row  max-w-[1400px] h-full justify-between items-center gap-5 flex-wrap">
        <div className="flex flex-col gap-4 items-start justify-start md:w-2/3">
          <h3 className="text-4xl">Start Your Real Estate Journey Today</h3>
          <p className="text-gray-60">
            Your dream property is just a click away. Whether you&apos;re
            looking for a new home, a strategic investment, or expert real
            estate advice, Estatein is here to assist you every step of the way.
            Take the first step towards your real estate goals and explore our
            available properties or get in touch with our team for personalized
            assistance.
          </p>
        </div>
        <Link
          href="/properties"
          className="link-fill text-nowrap text-center md:flex-none flex-grow "
        >
          Explore Properties
        </Link>
      </Container>
    </div>
  );
}
