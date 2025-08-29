import clsx from "clsx";
import React from "react";

type props = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  register?: any; // react-hook-form register
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  rows?: number;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  register,
  onChange,
  value,
  error,
  className = "",
  disabled = false,
  rows = 4,
  inputProps,
}: props) {
  const registerProps = register ? register(name) : {};

  const commonProps = {
    id: name,
    name,
    placeholder,
    disabled,
    onChange,
    value,
    ...registerProps,
    ...inputProps,
    className: clsx(
      "w-full min-w-[150px] px-3 py-2 bg-gray-10 border border-gray-15 rounded-md shadow-sm focus:outline-none focus:border-purple-60 focus:ring-1 focus:ring-purple-60 transition",
      inputProps?.className,
      error && "border-red-500",
      disabled && "bg-gray-100 cursor-not-allowed"
    ),
  };

  return (
    <div className={`h-fit w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium mb-1 text-white text-nowrap"
        >
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input type={type} {...commonProps} />
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
