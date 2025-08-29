"use client";

import AsyncSelect from "react-select/async";
import type { AsyncProps } from "react-select/async";
import type { GroupBase } from "react-select";
import { Controller } from "react-hook-form";
import clsx from "clsx";

type OptionType = {
  label: string;
  value: number | string;
};

type AsyncSelectInputProps = {
  name: string;
  label?: string;
  control?: any;
  error?: string;
  className?: string;
  selectClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
} & Omit<AsyncProps<OptionType, false, GroupBase<OptionType>>, "name">;

export default function AutoComplete({
  name,
  label,
  control,
  error,
  className = "",
  selectClassName = "",
  menuClassName,
  optionClassName,
  ...rest
}: AsyncSelectInputProps) {
  return (
    <div className={`w-full min-w-[150px] flex-1 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium mb-1 text-white text-nowrap"
        >
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        defaultValue={rest.defaultValue ?? null}
        render={({ field }) => (
          <AsyncSelect
            {...field}
            {...rest}
            instanceId={name}
            onChange={(val) => field.onChange(val)}
            classNames={{
              control: () =>
                clsx(
                  "w-full px-3 py-1 rounded-md shadow-sm",
                  "!bg-gray-10 border !border-gray-15 !focus:outline-none",
                  selectClassName,
                  error && "border border-red-500"
                ),
              menu: () =>
                clsx("z-50 !bg-gray-15 rounded-md shadow-lg", menuClassName),
              option: ({ isFocused, isSelected }) =>
                clsx(
                  "px-3 py-2 cursor-pointer !text-white",
                  optionClassName,
                  isFocused && "bg-gray-100",
                  isSelected && "bg-gray-200 font-medium"
                ),
              input: () => clsx("!text-white"),
            }}
          />
        )}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
