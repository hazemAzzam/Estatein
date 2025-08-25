import { ChevronDown, LocateIcon, MapPin, Tally1 } from "lucide-react";
import React from "react";
import style from "./select.module.css";

type Props = {
  className?: string;
  placeholder?: string;
  icon?: React.ReactNode;
};

export default function Select({ className, placeholder, icon }: Props) {
  return (
    <div
      className={`relative flex min-w-[250px] items-center flex-row border border-gray-15 bg-gray-08 rounded-md p-3 ${className}`}
    >
      <div className="flex flex-row gap-1 items-center">
        <div className="relative">{icon}</div>
        <Tally1 className="text-gray-15" />
      </div>
      <select
        className={`${style.select} w-full bg-transparent outline-none`}
        defaultValue={""}
      >
        <option value="" disabled hidden>
          {placeholder || "Select an option"}
        </option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <div className="absolute right-2 text-white pointer-events-none bg-gray-10 rounded-full p-1">
        <ChevronDown size={20} className="" />
      </div>
    </div>
  );
}
