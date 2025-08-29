"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type SectionProps = {
  title: string;
  description: string;
  action_name?: string;
  children?: React.ReactNode;
};

export default function Section({
  title,
  description,
  action_name,
  children,
}: SectionProps) {
  return (
    <div className="w-full h-fit  flex items-center justify-center px-5 py-5">
      <div className="relative w-full max-w-[1400px] h-full bg-gray-08">
        <div className="w-full h-full flex flex-col items-start justify-center">
          <Image src="/assets/stars.svg" alt="" width={100} height={50} />
          <div className="px-5 w-full flex flex-col gap-10">
            <div className="flex flex-row flex-wrap gap-5 w-full justify-between py-5">
              <div className="flex flex-col gap-5 max-w-[1000px] ">
                <h2 className="text-5xl">{title}</h2>
                <p className="text-gray-60">{description}</p>
              </div>
              {action_name && (
                <div className="flex items-end">
                  <Link href="" className="link text-nowrap">
                    {action_name}
                  </Link>
                </div>
              )}
            </div>
            <div className="flex flex-row gap-3 items-center justify-between w-full h-fit bg-gray-08 overflow-x-auto overflow-y-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
