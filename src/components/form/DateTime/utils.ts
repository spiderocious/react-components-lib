import type {
  DateTimeValue,
  DisableDaysConfig,
  TimeFormat,
  TimeRemaining,
} from "./types";

export const formatDate = (date: Date, format: string): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();

  switch (format) {
    case "MM/DD/YYYY":
      return `${String(m + 1).padStart(2, "0")}/${String(d).padStart(
        2,
        "0"
      )}/${y}`;
    case "DD/MM/YYYY":
      return `${String(d).padStart(2, "0")}/${String(m + 1).padStart(
        2,
        "0"
      )}/${y}`;
    case "YYYY-MM-DD":
      return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(
        2,
        "0"
      )}`;
    case "MMM DD, YYYY":
      return `${months[m]} ${d}, ${y}`;
    default:
      return date.toLocaleDateString();
  }
};

export const formatTime = (
  date: Date,
  format: TimeFormat,
  showSeconds = false
): string => {
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  if (format === "24h") {
    const timeStr = `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}`;
    return showSeconds ? `${timeStr}:${String(s).padStart(2, "0")}` : timeStr;
  } else {
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const ampm = h >= 12 ? "PM" : "AM";
    const timeStr = `${String(h12).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}`;
    const baseTime = showSeconds
      ? `${timeStr}:${String(s).padStart(2, "0")}`
      : timeStr;
    return `${baseTime} ${ampm}`;
  }
};

export const parseValue = (value?: DateTimeValue): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return value;
  return new Date(value);
};

export const toISOString = (date: Date): string => {
  return date.toISOString();
};

export const isDayDisabled = (
  date: Date,
  config: DisableDaysConfig
): boolean => {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Check specific day disables
  if (config.disableMondays && dayOfWeek === 1) return true;
  if (config.disableTuesdays && dayOfWeek === 2) return true;
  if (config.disableWednesdays && dayOfWeek === 3) return true;
  if (config.disableThursdays && dayOfWeek === 4) return true;
  if (config.disableFridays && dayOfWeek === 5) return true;
  if (config.disableSaturdays && dayOfWeek === 6) return true;
  if (config.disableSundays && dayOfWeek === 0) return true;

  // Check weekdays/weekends
  if (config.disableWeekdays && dayOfWeek >= 1 && dayOfWeek <= 5) return true;
  if (config.disableWeekends && (dayOfWeek === 0 || dayOfWeek === 6))
    return true;

  // Check specific disabled dates
  if (config.disabledDates) {
    return config.disabledDates.some(
      (disabledDate) => disabledDate.toDateString() === date.toDateString()
    );
  }

  return false;
};

export const isDateInRange = (
  date: Date,
  min?: DateTimeValue,
  max?: DateTimeValue
): boolean => {
  const minDate = parseValue(min);
  const maxDate = parseValue(max);

  if (minDate && date < minDate) return false;
  if (maxDate && date > maxDate) return false;

  return true;
};

export const generateTimeOptions = (
  format: "12h" | "24h",
  minuteStep = 15,
  showSeconds = false
) => {
  const times: string[] = [];

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += minuteStep) {
      if (showSeconds) {
        for (let s = 0; s < 60; s += 15) {
          const date = new Date();
          date.setHours(h, m, s);
          times.push(formatTime(date, format, true));
        }
      } else {
        const date = new Date();
        date.setHours(h, m, 0);
        times.push(formatTime(date, format, false));
      }
    }
  }

  return times;
};

// Calendar utilities
export const getCalendarDays = (year: number, month: number): Date[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  const endDate = new Date(lastDay);

  // Get first day of the week for the month
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // Get last day to complete the calendar grid
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const days: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

export const getMonthName = (month: number): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month];
};

export const getShortMonthName = (month: number): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month];
};

// Countdown utilities

export const calculateTimeRemaining = (targetDate: Date): TimeRemaining => {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const total = target - now;

  if (total <= 0) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
    };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  // Approximate years and months
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);

  return { years, months, days, hours, minutes, seconds, total };
};
