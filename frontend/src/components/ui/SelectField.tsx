"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

type Props = {
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  name?: string;
  id?: string;
  helpText?: string;
  icon?: React.ReactNode;
};

export default function SelectField({
  className,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  disabled = false,
  error = false,
  label,
  required = false,
  size = "md",
  name,
  id,
  helpText,
  icon,
}: Props) {
  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-10 text-sm",
    lg: "h-12 text-base",
  };

  return (
    <div className={cn("w-full bg-gray-08", className)}>
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        name={name}
      >
        <SelectTrigger
          className={cn(
            sizeClasses[size],
            "w-full p-5",
            error && "border-red-500 focus:ring-red-200 focus:border-red-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          id={id || name}
        >
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">
              No options available
            </div>
          ) : (
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      {helpText && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}

      {error && (
        <p className="mt-1 text-sm text-red-600">This field is required</p>
      )}
    </div>
  );
}
