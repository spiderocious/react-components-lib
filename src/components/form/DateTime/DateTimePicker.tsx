import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils";
import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";
import type { DateTimePickerProps } from "./types";
import { formatDate, formatTime, parseValue, toISOString } from "./utils";

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selectedValue,
  min,
  max,
  onSelect,
  disabled = false,
  placeholder = "Select date and time",
  format = "MM/DD/YYYY",
  separateDateTime = false,
  dateTimeFormat,
  timeFormat = "12h",
  className,
  dateTimeClassName,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"date" | "time">("date");
  const [selectedDateTime, setSelectedDateTime] = useState(() => {
    const selected = parseValue(selectedValue);
    return selected || new Date();
  });

  const triggerRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
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

  const handleDateChange = (dateISO: string) => {
    const newDate = new Date(dateISO);
    const updatedDateTime = new Date(selectedDateTime);
    updatedDateTime.setFullYear(newDate.getFullYear());
    updatedDateTime.setMonth(newDate.getMonth());
    updatedDateTime.setDate(newDate.getDate());

    setSelectedDateTime(updatedDateTime);
    onSelect?.(toISOString(updatedDateTime));

    if (!separateDateTime) {
      setActiveTab("time");
    }
  };

  const handleTimeChange = (timeISO: string) => {
    const newTime = new Date(timeISO);
    const updatedDateTime = new Date(selectedDateTime);
    updatedDateTime.setHours(newTime.getHours());
    updatedDateTime.setMinutes(newTime.getMinutes());
    updatedDateTime.setSeconds(newTime.getSeconds());

    setSelectedDateTime(updatedDateTime);
    onSelect?.(toISOString(updatedDateTime));

    if (!separateDateTime) {
      setIsOpen(false);
    }
  };

  const formatDateTime = (date: Date): string => {
    if (dateTimeFormat) {
      // Custom format logic could be implemented here
      return dateTimeFormat;
    }

    const dateStr = formatDate(date, format);
    const timeStr = formatTime(date, timeFormat, props.showSeconds);

    return `${dateStr} ${timeStr}`;
  };

  const selectedDate = parseValue(selectedValue);

  const DateTimePickerContent = () => {
    if (separateDateTime) {
      return (
        <div
          ref={pickerRef}
          className={cn(
            "bg-white border border-gray-200 rounded-lg shadow-lg z-50",
            isMobile
              ? "fixed bottom-0 left-0 right-0 rounded-t-lg rounded-b-none border-b-0"
              : "absolute mt-2 w-auto",
            dateTimeClassName
          )}
        >
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Date Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Select Date
                </h3>
                <DatePicker
                  {...props}
                  selectedValue={selectedDateTime}
                  onSelect={handleDateChange}
                  min={min}
                  max={max}
                >
                  <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition-colors">
                    {formatDate(selectedDateTime, format)}
                  </div>
                </DatePicker>
              </div>

              {/* Time Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Select Time
                </h3>
                <TimePicker
                  {...props}
                  selectedValue={selectedDateTime}
                  onSelect={handleTimeChange}
                >
                  <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition-colors">
                    {formatTime(
                      selectedDateTime,
                      timeFormat,
                      props.showSeconds
                    )}
                  </div>
                </TimePicker>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={pickerRef}
        className={cn(
          "bg-white border border-gray-200 rounded-lg shadow-lg z-50",
          isMobile
            ? "fixed bottom-0 left-0 right-0 rounded-t-lg rounded-b-none border-b-0"
            : "absolute mt-2 w-80",
          dateTimeClassName
        )}
      >
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("date")}
            className={cn(
              "flex-1 py-3 px-4 text-sm font-medium transition-colors",
              activeTab === "date"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            📅 Date
          </button>
          <button
            onClick={() => setActiveTab("time")}
            className={cn(
              "flex-1 py-3 px-4 text-sm font-medium transition-colors",
              activeTab === "time"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            🕐 Time
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "date" ? (
            <DatePicker
              {...props}
              selectedValue={selectedDateTime}
              onSelect={handleDateChange}
              min={min}
              max={max}
            >
              <div />
            </DatePicker>
          ) : (
            <TimePicker
              {...props}
              selectedValue={selectedDateTime}
              onSelect={handleTimeChange}
            >
              <div />
            </TimePicker>
          )}
        </div>

        {isMobile && (
          <div className="p-4 pt-0">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    );
  };

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
              {selectedDate ? formatDateTime(selectedDate) : placeholder}
            </span>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-gray-400"
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
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* DateTime picker overlay */}
      {isOpen && (
        <>
          {isMobile && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
          <DateTimePickerContent />
        </>
      )}
    </div>
  );
};
