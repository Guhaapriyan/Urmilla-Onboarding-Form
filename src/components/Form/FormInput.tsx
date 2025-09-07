import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldError, FieldValues, Path } from "react-hook-form";
import { Input, InputNumber } from "antd";
import clsx from "clsx";
import { FormInputProps } from "./types";
import { useDebouncedCallback } from "../../lib/useDebounce";

// Ant Design Form Input
export const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  className,
  maxLength,
  multiline = false,
  rows = 4,
}: FormInputProps<T>) => {
  return (
    <Controller<any>
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        const [localValue, setLocalValue] = useState(value || "");
        const debouncedOnChange = useDebouncedCallback(onChange, 2000);

        // Update local value when form value changes (e.g., from external sources)
        useEffect(() => {
          setLocalValue(value || "");
        }, [value]);

        const handleChange = (newValue: any) => {
          // Update local state immediately for visual feedback
          setLocalValue(newValue);
          // Debounce the form state update
          debouncedOnChange(newValue);
        };

        return (
          <div className={clsx("w-full", className)}>
            <label
              className={clsx(
                "block text-sm sm:text-base font-medium text-black mb-2",
                required && "after:content-['*'] after:text-red-500 after:ml-1"
              )}
            >
              {label}
            </label>

            {multiline ? (
              <Input.TextArea
                placeholder={placeholder}
                value={localValue}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={onBlur}
                disabled={disabled}
                maxLength={maxLength}
                rows={rows}
                status={error ? "error" : undefined}
                className={clsx(
                  "w-full transition-all duration-200 rounded-lg h-12",
                  "hover:border-[#313475] focus:border-[#313475] focus:ring-1 focus:ring-[#313475]",
                  error &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500"
                )}
                style={{ fontSize: "clamp(14px, 2.5vw, 16px)" }}
                showCount={!!maxLength}
              />
            ) : type === "number" ? (
              <InputNumber
                placeholder={placeholder}
                value={localValue || undefined}
                onChange={handleChange}
                onBlur={onBlur}
                disabled={disabled}
                status={error ? "error" : undefined}
                className={clsx(
                  "w-full transition-all duration-200 h-12",
                  "hover:border-[#313475] focus:border-[#313475]",
                  error && "border-red-500 focus:border-red-500"
                )}
                style={{
                  fontSize: "clamp(14px, 2.5vw, 16px)",
                  width: "100%",
                  height: "47px",
                  borderWidth: 2,
                  borderColor: "#313475",
                  borderRadius: 4,
                  boxShadow: "none",
                }}
                controls={false}
              />
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                value={localValue}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={onBlur}
                disabled={disabled}
                maxLength={maxLength}
                status={error ? "error" : undefined}
                className={clsx(
                  "w-full transition-all duration-200 h-12",
                  "hover:border-[#313475] focus:border-[#313475] rounded-lg",
                  error && "border-red-500 focus:border-red-500"
                )}
                style={{ fontSize: "clamp(14px, 2.5vw, 16px)", height: "48px" }}
              />
            )}

            {error && (
              <p className="mt-2 text-sm text-red-600 animate-fadeIn">
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

// Mobile Number Input Component (Indian Format)
export const MobileNumberInput = <T extends FieldValues>({
  name,
  control,
  label = "Mobile Number",
  placeholder = "Enter mobile number",
  required = false,
  disabled = false,
  className,
  size = "large",
}: Omit<FormInputProps<T>, "type">) => {
  return (
    <Controller<any>
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        const [localValue, setLocalValue] = useState(value || "");
        const debouncedOnChange = useDebouncedCallback(onChange, 2000);

        // Update local value when form value changes (e.g., from external sources)
        useEffect(() => {
          setLocalValue(value || "");
        }, [value]);

        const handleChange = (newValue: string) => {
          // Update local state immediately for visual feedback
          setLocalValue(newValue);
          // Debounce the form state update
          debouncedOnChange(newValue);
        };

        return (
          <div className={clsx("w-full", className)}>
            <label
              className={clsx(
                "block text-sm sm:text-base font-medium text-gray-700 mb-2",
                required && "after:content-['*'] after:text-red-500 after:ml-1"
              )}
            >
              {label}
            </label>

            <div
              className={`h-12 flex rounded-md border-[#313475] hover:border-[#313475] focus:border-[#313475] border-2 transition-all duration-200 ${
                error &&
                "border-red-400 focus-within:border-red-500 hover:border-red-400 "
              }`}
              style={{borderRadius : 9}}
            >
              <div
                className={clsx(
                  "flex items-center px-3 bg-gray-50 border-r border-gray-300 rounded-l-lg",
                  size === "small" && "py-2",
                  size === "large" && "py-3",
                  size === "medium" && "py-2.5"
                )}
              >
                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                  <span
                    className={`text-xs font-medium text-gray-700 whitespace-nowrap`}
                  >
                    +91
                  </span>
                </span>
              </div>

              <Input
                type="tel"
                placeholder={placeholder}
                value={localValue}
                onChange={(e) => {
                  const numericValue = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  handleChange(numericValue);
                }}
                onBlur={onBlur}
                disabled={disabled}
                maxLength={10}
                status={undefined}
                bordered={false}
                className={clsx(
                  "flex-1 transition-all duration-200 rounded-r-lg"
                )}
                style={{
                  fontSize: "clamp(14px, 2.5vw, 16px)",
                  boxShadow: "none",
                }}
              />
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-600 animate-fadeIn">
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormInput;
