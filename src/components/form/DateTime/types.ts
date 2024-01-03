import type { ReactNode } from "react";

// Base types
export type DateValue = Date | string | null;
export type TimeValue = string | Date | null; // HH:MM format or Date
export type DateTimeValue = Date | string | null;

// Day disable options
export interface DisableDaysConfig {
  disableWeekdays?: boolean;
  disableWeekends?: boolean;
  disableMondays?: boolean;
  disableTuesdays?: boolean;
  disableWednesdays?: boolean;
  disableThursdays?: boolean;
  disableFridays?: boolean;
  disableSaturdays?: boolean;
  disableSundays?: boolean;
  disabledDates?: Date[];
}

// Base picker props
export interface BasePickerProps {
  selectedValue?: DateTimeValue;
  min?: DateTimeValue;
  max?: DateTimeValue;
  onSelect?: (value: string) => void; // Always returns ISO string
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  children?: ReactNode;
}

// Date picker specific props
export interface DatePickerProps extends BasePickerProps, DisableDaysConfig {
  format?: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD" | "MMM DD, YYYY";
  showYearDropdown?: boolean;
  showMonthDropdown?: boolean;
  calendarClassName?: string;
  headerClassName?: string;
  dayClassName?: string;
  selectedDayClassName?: string;
  disabledDayClassName?: string;
  todayClassName?: string;
}

// Time picker specific props
export interface TimePickerProps extends BasePickerProps {
  format?: "12h" | "24h";
  minuteStep?: number;
  showSeconds?: boolean;
  timePickerClassName?: string;
  timeInputClassName?: string;
  amPmClassName?: string;
}

// DateTime picker props
// Omit 'format' from DatePickerProps and TimePickerProps to avoid conflict
export interface DateTimePickerProps
  extends Omit<DatePickerProps, "format">,
    Omit<TimePickerProps, "format"> {
  format?:
    | "MM/DD/YYYY"
    | "DD/MM/YYYY"
    | "YYYY-MM-DD"
    | "MMM DD, YYYY"
    | TimeFormat;
  timeFormat?: TimeFormat;
  dateTimeFormat?: string;
  separateDateTime?: boolean; // Show date and time in separate sections
  dateTimeClassName?: string;
}

export type TimeFormat = "12h" | "24h";

// Countdown props
export interface CountdownProps {
  to: DateTimeValue;
  showYears?: boolean;
  showMonths?: boolean;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  onEnd?: () => void;
  onStart?: () => void;
  className?: string;
  digitClassName?: string;
  labelClassName?: string;
  separatorClassName?: string;
  completedClassName?: string;
  format?: "minimal" | "full" | "compact";
}

// Timer props (circular)
export interface TimerProps extends CountdownProps {
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
  textColor?: string;
  timerClassName?: string;
  circleClassName?: string;
  progressClassName?: string;
  centerTextClassName?: string;
}

export interface TimeRemaining {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}
