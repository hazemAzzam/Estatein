"use client";
import { useState } from "react";

type Props = {
  text: string;
  className?: string;
  lineClamp?: number | 2;
};

export const Text = ({ text, lineClamp, className }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <p
        className={`text-gray-60 text-[14px] ${
          expanded ? "" : lineClamp
        } ${className}`}
      >
        {text}
      </p>
      {text.length > 80 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 text-sm mt-1"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </>
  );
};
