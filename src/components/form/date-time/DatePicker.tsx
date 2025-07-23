import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils";
import type { DatePickerProps } from "./types";
import {
  formatDate,
  getCalendarDays,
  getMonthName,
  isDateInRange,
  isDayDisabled,
  parseValue,
  toISOString,
} from "./utils";

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedValue,
  min,
  max,
  onSelect,
  disabled = false,
  placeholder = "Select date",
  format = "MM/DD/YYYY",
  showYearDropdown = true,
  showMonthDropdown = true,
  className,
  calendarClassName,
  headerClassName,
  dayClassName,
  selectedDayClassName,
  disabledDayClassName,
  todayClassName,
  children,
  ...disableConfig
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [_currentDate, setCurrentDate] = useState(() => {
    const selected = parseValue(selectedValue);
    return selected || new Date();
  });
  const [viewDate, setViewDate] = useState(() => {
    const selected = parseValue(selectedValue);
    return selected || new Date();
  });

  const triggerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const selectedDate = parseValue(selectedValue);
  const today = new Date();

  // Close calendar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Mobile detection
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleDateSelect = (date: Date) => {
    if (isDayDisabled(date, disableConfig) || !isDateInRange(date, min, max)) {
      return;
    }

    setCurrentDate(date);
    onSelect?.(toISOString(date));
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleMonthChange = (month: number) => {
    setViewDate((prev) => new Date(prev.getFullYear(), month, 1));
  };

  const handleYearChange = (year: number) => {
    setViewDate((prev) => new Date(year, prev.getMonth(), 1));
  };

  const calendarDays = getCalendarDays(
    viewDate.getFullYear(),
    viewDate.getMonth()
  );
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  // Generate year options (current year ± 50)
  const yearOptions = Array.from(
    { length: 101 },
    (_, i) => currentYear - 50 + i
  );

  const ChevronLeftIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  const Calendar = () => (
    <div
      ref={calendarRef}
      className={cn(
        "bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50",
        isMobile
          ? "fixed bottom-0 left-0 right-0 rounded-t-lg rounded-b-none border-b-0"
          : "absolute mt-2 w-80",
        calendarClassName
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between mb-4",
          headerClassName
        )}
      >
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          type="button"
        >
          <ChevronLeftIcon />
        </button>

        <div className="flex items-center gap-2">
          {showMonthDropdown ? (
            <select
              value={currentMonth}
              onChange={(e) => handleMonthChange(Number(e.target.value))}
              className="text-lg font-semibold bg-transparent border-none focus:outline-none cursor-pointer"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {getMonthName(i)}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-lg font-semibold">
              {getMonthName(currentMonth)}
            </span>
          )}

          {showYearDropdown ? (
            <select
              value={currentYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="text-lg font-semibold bg-transparent border-none focus:outline-none cursor-pointer"
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-lg font-semibold">{currentYear}</span>
          )}
        </div>

        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          type="button"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 p-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          const isSelected =
            selectedDate && date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === today.toDateString();
          const isCurrentMonth = date.getMonth() === currentMonth;
          const isDisabled =
            isDayDisabled(date, disableConfig) ||
            !isDateInRange(date, min, max);

          return (
            <button
              key={index}
              onClick={() => handleDateSelect(date)}
              disabled={isDisabled}
              className={cn(
                "p-2 text-sm rounded-full transition-all duration-200 hover:bg-gray-100",
                !isCurrentMonth && "text-gray-400",
                isCurrentMonth && "text-gray-900",
                isSelected && "bg-blue-600 text-white hover:bg-blue-700",
                isToday &&
                  !isSelected &&
                  "bg-blue-50 text-blue-600 font-semibold",
                isDisabled &&
                  "opacity-50 cursor-not-allowed hover:bg-transparent",
                dayClassName,
                isSelected && selectedDayClassName,
                isDisabled && disabledDayClassName,
                isToday && !isSelected && todayClassName
              )}
              type="button"
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {isMobile && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={cn("relative", className)}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {children || (
          <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-colors">
            <span className={selectedDate ? "text-gray-900" : "text-gray-500"}>
              {selectedDate ? formatDate(selectedDate, format) : placeholder}
            </span>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Calendar overlay */}
      {isOpen && (
        <>
          {isMobile && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
          <Calendar />
        </>
      )}
    </div>
  );
};
