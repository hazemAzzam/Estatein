import { BathIcon, BedDouble } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  MdBedroomParent,
  MdOutlineBedroomParent,
  MdOutlineVilla,
  MdVilla,
} from "react-icons/md";

export default function PropertyCard() {
  return (
    <div className="h-full min-w-[385px] max-w-[385px] border border-gray-20 rounded-md p-5">
      <div className="flex flex-col gap-5 w-full h-full">
        <div className="relative w-full h-full">
          <Image src={"/assets/villa.png"} alt="" fill />
        </div>
        <div className="relative w-full h-full flex flex-col gap-2 items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl">Seaside Serenity Villa</h3>
            <p className="text-gray-60 text-[14px]">
              A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban
              neighborhood... Read More
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <div className="bg-gray-15 rounded-full px-3 py-1 flex items-center gap-1">
              <BedDouble size={19} /> <span>4-Bedroom</span>
            </div>
            <div className="bg-gray-15 rounded-full px-3 py-1 flex items-center gap-1">
              <BathIcon size={19} /> <span>3-Bathroom</span>
            </div>
            <div className="bg-gray-15 rounded-full px-3 py-1 flex items-center gap-1">
              <MdOutlineVilla size={19} /> <span>Villa</span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full flex-row gap-2">
            <div className="flex flex-col">
              <span className="text-gray-60">price</span>
              <span className="text-xl">$550,000</span>
            </div>
            <div>
              <Link href="" className="link-fill">
                View Property Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
