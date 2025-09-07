import React, { useEffect, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Switch } from "antd";
import clsx from "clsx";
import { FormToggleProps } from "./types";

export const FormToggle = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  disabled = false,
  className,
  checkedChildren,
  unCheckedChildren,
  size = "small",
  color,
  loading = false,
}: FormToggleProps<T>) => {
  return (
    <Controller<any>
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        const [localValue, setLocalValue] = useState(!!value);

        useEffect(() => {
          setLocalValue(!!value);
        }, [value]);

        const handleChange = (checked: boolean) => {
          setLocalValue(checked);
          onChange(checked);
        };

        return (
          <div
            className={clsx(
              "w-full flex flex-row items-center justify-between",
              "border-2 border-[#d2d2d2] rounded-lg px-3 h-12",
              "bg-gray-100 mt-8",
              className
            )}
          >
            <label
              className={clsx(
                "text-sm sm:text-base font-medium text-black",
                required && "after:content-['*'] after:text-red-500 after:ml-1",
                "mb-0"
              )}
            >
              {label}
            </label>
            <Switch
              checked={localValue}
              onChange={handleChange}
              disabled={disabled}
              checkedChildren={checkedChildren}
              unCheckedChildren={unCheckedChildren}
              loading={loading}
              className="ml-4"
              size={size === "small" ? "small" : "default"}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 animate-fadeIn w-full">
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormToggle;