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
import { PropertyType } from "../types/PropertyTypes";
import { Text } from "@/ui/Text";

type PropertyCardProps = {
  property: PropertyType;
  className?: string;
};

export default function PropertyCard({
  property,
  className,
}: PropertyCardProps) {
  return (
    <div
      className={`h-full w-full border max-w-[385px] border-gray-20 rounded-md p-5 ${className}`}
    >
      <div className="flex flex-col gap-5 w-full h-full">
        <div className="relative w-full h-full">
          <Image src={property.thubnail} alt="" fill />
        </div>
        <div className="relative w-full h-full flex flex-col gap-2 items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl">{property.title}</h3>
            <Text
              text={property.description}
              lineClamp={2}
              className="text-gray-60 text-[14px]"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {property?.keywords.map((keyword, i) => {
              return (
                <div
                  key={i}
                  className="bg-gray-15 rounded-full px-3 py-1 flex items-center gap-1"
                >
                  <BedDouble size={19} /> <span>{keyword}</span>
                </div>
              );
            })}
            {/* <div className="bg-gray-15 rounded-full px-3 py-1 flex items-center gap-1">
              <BedDouble size={19} /> <span>4-Bedroom</span>
            </div>
            <div className="bg-gray-15 rounded-full px-3 py-1 flex items-center gap-1">
              <BathIcon size={19} /> <span>3-Bathroom</span>
            </div>
            <div className="bg-gray-15 rounded-full px-3 py-1 flex items-center gap-1">
              <MdOutlineVilla size={19} /> <span>Villa</span>
            </div> */}
          </div>
          <div className="flex flex-wrap gap-1 items-center justify-between w-full flex-row">
            <div className="flex flex-col w-fit">
              <span className="text-gray-60">price</span>
              <span className="text-xl">
                {property.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <Link href="" className="link-fill text-nowrap text-center">
              View Property Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
