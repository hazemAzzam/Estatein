import clsx from "clsx";
import React from "react";

type props = {
  id?: string;
  label?: string;
  name: string;
  register?: any; // react-hook-form register
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | readonly string[];
  checked?: boolean;
  error?: string;
  className?: string;

  disabled?: boolean;

  checkboxProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
};

export default function Checkbox({
  id,
  label,
  name,
  register,
  onChange,
  value,
  checked,
  error,
  className = "",
  disabled = false,
  checkboxProps,
  labelProps,
}: props) {
  const registerProps = register ? register(name) : {};

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...registerProps}
        {...checkboxProps}
        className={`
            relative
            material-symbols-outlined
            !min-w-6 !min-h-6 appearance-none border-2 border-gray-40 bg-gray-10 rounded-sm checked:bg-purple-60 checked:border-purple-60 focus:outline-none
            before:content-['check'] before:text-white before:absolute before:scale-0 checked:before:scale-90 before:transition-transform before:duration-150 before:ease-in-out before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
            ${checkboxProps?.className || ""}
           `}
      />

      {label && (
        <label
          htmlFor={id}
          {...labelProps}
          className={clsx(
            `text-sm text-gray-70`,
            disabled && "text-gray-400",
            labelProps?.className
          )}
        >
          {label}
        </label>
      )}

      {error && <p className="text-sm text-red-500 ml-2">{error}</p>}
    </div>
  );
}
