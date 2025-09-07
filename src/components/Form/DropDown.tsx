import React from "react"
import { Controller } from "react-hook-form";
import type { Control, FieldError, FieldValues, Path } from "react-hook-form";
import { Select as AntSelect, AutoComplete } from "antd";
import clsx from "clsx";
import { FormDropdownProps } from "./types";

const { Option } = AntSelect;

export const FormDropdown = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  options,
  multiple = false,
  searchable = false,
  clearable = true,
  required = false,
  disabled = false,
  className,
  loading = false,
  onSearch,
}: FormDropdownProps<T>) => {
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
              "block text-sm sm:text-base font-medium text-black mb-2 dark:text-white",
              required && "after:content-['*'] after:text-red-500 after:ml-1"
            )}
          >
            {label}
          </label>

          {searchable ? (
            <AutoComplete
              placeholder={placeholder}
              value={value || undefined}
              onChange={onChange}
              onBlur={onBlur}
              onSearch={onSearch}
              disabled={disabled}
              allowClear={clearable}
              status={error ? "error" : undefined}
              className={clsx(
                "w-full transition-all duration-200 h-12",
                "!custom-ant-select",
                error && "[&_.ant-select-selector]:!border-red-500"
              )}
              style={{ fontSize: "clamp(14px, 2.5vw, 16px)" }}
              options={options.map((opt) => ({
                value: opt.value,
                label: opt.label,
                disabled: opt.disabled,
              }))}
              filterOption={(inputValue, option) =>
                option?.label
                  ?.toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()) ?? false
              }
            />
          ) : (
            <AntSelect
              placeholder={placeholder}
              value={multiple ? value || [] : value}
              onChange={onChange}
              onBlur={onBlur}
              mode={multiple ? "multiple" : undefined}
              disabled={disabled}
              loading={loading}
              allowClear={clearable}
              showSearch={searchable}
              status={error ? "error" : undefined}
              className={clsx(
                "w-full transition-all duration-200 ",
                "!custom-ant-select",
                error && "[&_.ant-select-selector]:!border-red-500"
                // error && "custom-ant-select-error"
              )}
              style={{ fontSize: "clamp(14px, 2.5vw, 16px)" }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {options.map((option) => (
                <Option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  label={option.label}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base">{option.label}</span>
                  </div>
                </Option>
              ))}
            </AntSelect>
          )}

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

export default FormDropdown;
