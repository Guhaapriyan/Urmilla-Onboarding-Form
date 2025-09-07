import React from "react"
import { Controller } from "react-hook-form";
import type { Control, FieldError, FieldValues, Path } from "react-hook-form";
import { DatePicker as AntDatePicker } from "antd";
import dayjs from "dayjs";
import clsx from "clsx";
import { FormDatePickerProps } from "./types";

// Ant Design Date Picker
export const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  variant = "date",
  required = false,
  disabled = false,
  className,
  minDate,
  maxDate,
  disablePast = false,
  disableFuture = false,
  showTime = false,
  format,
}: FormDatePickerProps<T>) => {
  const getDateFormat = () => {
    if (format) return format;
    switch (variant) {
      case "datetime":
        return "DD/MM/YYYY HH:mm";
      case "time":
        return "HH:mm";
      case "year":
        return "YYYY";
      case "month":
        return "MM/YYYY";
      default:
        return "DD/MM/YYYY";
    }
  };

  const getDatePicker = () => {
    switch (variant) {
      case "year":
        return AntDatePicker.YearPicker;
      case "month":
        return AntDatePicker.MonthPicker;
      case "time":
        return AntDatePicker.TimePicker;
      default:
        return AntDatePicker;
    }
  };

  const DatePickerComponent = getDatePicker();

  return (
    <Controller<any>
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <div className={clsx("w-full", className)}>
          <label
            className={clsx(
              "block text-sm sm:text-base font-medium text-black mb-2",
              required && "after:content-['*'] after:text-red-500 after:ml-1"
            )}
          >
            {label}
          </label>

          <DatePickerComponent
            placeholder={placeholder}
            value={value ? dayjs(value) : null}
            onChange={(date) =>
              onChange(date ? date.format("YYYY-MM-DD") : null)
            }
            onBlur={onBlur}
            disabled={disabled}
            inputReadOnly={true}
            format={getDateFormat()}
            showTime={variant === "datetime" || showTime}
            status={error ? "error" : undefined}
            minDate={minDate ? dayjs(minDate) : undefined}
            maxDate={maxDate ? dayjs(maxDate) : undefined}
            disabledDate={(current) => {
              if (disablePast && current && current < dayjs().startOf("day")) {
                return true;
              }
              if (disableFuture && current && current > dayjs().startOf("day")) {
                return true;
              }
              return false;
            }}
            className={clsx(
              "w-full transition-all duration-200",
              "hover:border-[#313475] focus:border-[#313475]",
              error && "!border-red-500"
            )}
            style={{
              fontSize: "clamp(14px, 2.5vw, 16px)",
            }}
          />

          {error && (
            <p className="mt-2 text-sm text-red-600 animate-fadeIn">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

// Year Picker Component
export const YearPicker = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select year",
  required = false,
  disabled = false,
  className,
  size = "large",
}: Omit<FormDatePickerProps<T>, "variant">) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);

  return (
    <Controller<any>
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <div className={clsx("w-full", className)}>
          <label
            className={clsx(
              "block text-sm sm:text-base font-medium !text-black mb-2",
              required && "after:content-['*'] after:text-red-500 after:ml-1"
            )}
          >
            {label}
          </label>

          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={disabled}
            className={clsx(
              "w-full px-3 py-2 border h-12 border-gray-300 rounded-lg transition-all duration-200",
              "hover:border-[#313475] focus:border-[#313475] focus:outline-none",
              "text-sm sm:text-base",
              size === "small" && "py-1.5 text-sm",
              size === "large" && "py-3 text-base",
              error && "!border-red-500",
              disabled && "bg-gray-100 cursor-not-allowed"
            )}
            style={{ fontSize: "clamp(14px, 2.5vw, 16px)" }}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {error && (
            <p className="mt-2 text-sm text-red-600 animate-fadeIn">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default FormDatePicker;
