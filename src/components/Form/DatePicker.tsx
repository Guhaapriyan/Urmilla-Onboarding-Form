import React, { useState } from "react"
import { Controller } from "react-hook-form";
import type { Control, FieldError, FieldValues, Path } from "react-hook-form";
import dayjs from "dayjs";
import clsx from "clsx";
import { FormDatePickerProps } from "./types";
import { Calendar } from "../UI/calender";
import { Popover, PopoverContent, PopoverTrigger } from "../UI/popover";
import { Button } from "../UI/button";
import { CalendarIcon } from "lucide-react";

// Custom Date Picker
export const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select date",
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

  return (
    <Controller<any>
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        const [open, setOpen] = useState(false);
        
        const handleDateSelect = (date: Date | undefined) => {
          if (date) {
            onChange(dayjs(date).format("YYYY-MM-DD"));
          } else {
            onChange(null);
          }
          setOpen(false);
        };

        const disabledDate = (date: Date) => {
          if (disablePast && date < new Date(new Date().setHours(0, 0, 0, 0))) {
            return true;
          }
          if (disableFuture && date > new Date(new Date().setHours(23, 59, 59, 999))) {
            return true;
          }
          if (minDate && date < new Date(minDate)) {
            return true;
          }
          if (maxDate && date > new Date(maxDate)) {
            return true;
          }
          return false;
        };

        return (
          <div className={clsx("w-full", className)}>
            <label
              className={clsx(
                "block text-sm sm:text-base font-medium text-black dark:text-white mb-2",
                required && "after:content-['*'] after:text-red-500 after:ml-1"
              )}
            >
              {label}
            </label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={clsx(
                    "w-full justify-start text-left font-normal h-12",
                    "border-[#c5c5c5] hover:border-[#313475] focus:border-[#313475] bg-white text-black",
                    "transition-all duration-200",
                    !value && "text-muted-foreground",
                    error && "border-red-500 focus:border-red-500"
                  )}
                  disabled={disabled}
                  onBlur={onBlur}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
                  {value ? dayjs(value).format(getDateFormat()) : placeholder}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white text-black shadow-md border border-gray-300" align="start">
                <Calendar
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={handleDateSelect}
                  disabled={disabledDate}
                  initialFocus
                  className="rounded-md border border-gray-200 bg-white"
                />
              </PopoverContent>
            </Popover>

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
              "block text-sm sm:text-base font-medium text-black dark:text-white mb-2",
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
