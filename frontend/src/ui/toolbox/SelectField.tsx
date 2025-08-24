import React from "react";

type Props = {
  className?: string;
};

export default function SelectField({ className }: Props) {
  return (
    <div
      className={`flex flex-row gap-2 bg-gray-08 p-3 rounded-lg border border-gray-15 ${className}`}
    ></div>
  );
}
