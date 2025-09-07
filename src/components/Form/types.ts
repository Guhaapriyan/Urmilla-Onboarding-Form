import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import type { ReactNode } from 'react';

// Base form field props interface
export interface BaseFormFieldProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: FieldError;
  size?: 'small' | 'medium' | 'large';
}

// Input specific props
export interface FormInputProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  multiline?: boolean;
  rows?: number;
  autoComplete?: string;
  alphaOnly?: boolean;
}

// Dropdown/Select props
export interface FormDropdownProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  options: DropdownOption[] | [];
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  onSearch?: (value: string) => void;
  filterOption?: boolean;
  showSearch?: boolean;
}

export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  children?: DropdownOption[];
}

// Date picker props
export interface FormDatePickerProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  variant?: 'date' | 'datetime' | 'time' | 'year' | 'month';
  minDate?: Date | string;
  maxDate?: Date | string;
  format?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
  showTime?: boolean;
  use12Hours?: boolean;
  maxLength?: number;
}

// File upload props
export interface FormFileUploadProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  showPreview?: boolean;
  onFileChange?: (files: File[]) => void;
  uploadText?: string;
  dragText?: string;
  listType?: 'text' | 'picture' | 'picture-card';
}

// Button props
export interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'contained' | 'outlined' | 'text' | 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
  disabled?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  block?: boolean;
  danger?: boolean;
  shape?: 'default' | 'circle' | 'round';
}

// Toggle/Switch props
export interface FormToggleProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  checkedChildren?: ReactNode;
  unCheckedChildren?: ReactNode;
  loading?: boolean;
}

// Stepper props
export interface StepperProps {
  steps: StepConfig[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'dots' | 'progress' | 'numbers' | 'navigation';
  onStepChange?: (step: number) => void;
  allowStepClick?: boolean;
  showStepNumber?: boolean;
  className?: string;
}

export interface StepConfig {
  id: string | number;
  label: string;
  description?: string;
  optional?: boolean;
  completed?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  content?: ReactNode;
}

// Common types
export type UILibrary = 'mui' | 'antd' | 'custom';

export interface ComponentVariantProps {
  variant?: UILibrary;
}