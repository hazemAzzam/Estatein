import { SearchIcon } from "lucide-react";
import React from "react";

type Props = {
  className?: string;
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
  buttonAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export default function SearchField({
  className,
  inputAttributes,
  buttonAttributes,
}: Props) {
  return (
    <div
      className={`flex flex-row gap-2 bg-gray-08 p-3 rounded-lg border border-gray-15 ${className}`}
    >
      <input
        type="text"
        className="w-full focus:outline-none bg-transparent"
        {...inputAttributes}
      />
      <button
        className="link-fill flex flex-row items-center cursor-pointer gap-2 flex-nowrap whitespace-nowrap !px-3 !py-2"
        {...buttonAttributes}
      >
        <SearchIcon className="size-4" />
        <span className="hidden md:block">Find Property</span>
      </button>
    </div>
  );
}
