import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils";
import type { TimePickerProps } from "./types";
import { formatTime, parseValue, toISOString } from "./utils";

export const TimePicker: React.FC<TimePickerProps> = ({
  selectedValue,
  onSelect,
  disabled = false,
  placeholder = "Select time",
  format = "12h",
  minuteStep = 15,
  showSeconds = false,
  className,
  timePickerClassName,
  timeInputClassName,
  amPmClassName,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(() => {
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

  const handleTimeChange = (newTime: Date) => {
    setSelectedTime(newTime);
    onSelect?.(toISOString(newTime));
  };

  const handleAmPmChange = (isPM: boolean) => {
    const newTime = new Date(selectedTime);
    const currentHour = newTime.getHours();

    if (isPM && currentHour < 12) {
      newTime.setHours(currentHour + 12);
    } else if (!isPM && currentHour >= 12) {
      newTime.setHours(currentHour - 12);
    }

    handleTimeChange(newTime);
  };

  const handleScrollableChange = (
    value: number,
    type: "hour" | "minute" | "second",
    direction: "up" | "down"
  ) => {
    const newTime = new Date(selectedTime);
    let newValue = value;

    if (direction === "up") {
      if (type === "hour") {
        newValue = format === "12h" ? (value % 12) + 1 : (value + 1) % 24;
        if (format === "12h" && newValue === 0) newValue = 12;
      } else if (type === "minute") {
        newValue = (value + minuteStep) % 60;
      } else if (type === "second") {
        newValue = (value + 1) % 60;
      }
    } else {
      if (type === "hour") {
        newValue =
          format === "12h"
            ? value - 1 <= 0
              ? 12
              : value - 1
            : value - 1 < 0
            ? 23
            : value - 1;
      } else if (type === "minute") {
        newValue =
          value - minuteStep < 0 ? 60 - minuteStep : value - minuteStep;
      } else if (type === "second") {
        newValue = value - 1 < 0 ? 59 : value - 1;
      }
    }

    if (type === "hour") {
      // Handle 12h format conversion
      if (format === "12h") {
        const isPM = selectedTime.getHours() >= 12;
        const hour24 =
          newValue === 12 ? (isPM ? 12 : 0) : isPM ? newValue + 12 : newValue;
        newTime.setHours(hour24);
      } else {
        newTime.setHours(newValue);
      }
    } else if (type === "minute") {
      newTime.setMinutes(newValue);
    } else if (type === "second") {
      newTime.setSeconds(newValue);
    }

    handleTimeChange(newTime);
  };

  const currentHour = selectedTime.getHours();
  const currentMinute = selectedTime.getMinutes();
  const currentSecond = selectedTime.getSeconds();

  const displayHour =
    format === "12h"
      ? currentHour === 0
        ? 12
        : currentHour > 12
        ? currentHour - 12
        : currentHour
      : currentHour;
  const isPM = currentHour >= 12;

  const ChevronUpIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  const TimeColumn = ({
    value,
    onChange,
    label,
  }: {
    value: number;
    onChange: (value: number, direction: "up" | "down") => void;
    max: number;
    label: string;
    step?: number;
  }) => (
    <div className="flex flex-col items-center">
      <button
        onClick={() => onChange(value, "up")}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        type="button"
      >
        <ChevronUpIcon />
      </button>
      <div className="flex flex-col items-center py-4 min-w-[60px]">
        <div className="text-2xl font-bold text-gray-900">
          {String(value).padStart(2, "0")}
        </div>
        <div className="text-xs text-gray-500 mt-1">{label}</div>
      </div>
      <button
        onClick={() => onChange(value, "down")}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        type="button"
      >
        <ChevronDownIcon />
      </button>
    </div>
  );

  const TimePicker = () => (
    <div
      ref={pickerRef}
      className={cn(
        "bg-white border border-gray-200 rounded-lg shadow-lg p-6 z-50",
        isMobile
          ? "fixed bottom-0 left-0 right-0 rounded-t-lg rounded-b-none border-b-0"
          : "absolute mt-2 w-auto min-w-[280px]",
        timePickerClassName
      )}
    >
      <div className="flex items-center justify-center gap-4">
        {/* Hour */}
        <TimeColumn
          value={displayHour}
          onChange={(_, direction) =>
            handleScrollableChange(displayHour, "hour", direction)
          }
          max={format === "12h" ? 12 : 23}
          label="Hours"
        />

        {/* Separator */}
        <div className="text-2xl font-bold text-gray-400 py-4">:</div>

        {/* Minute */}
        <TimeColumn
          value={currentMinute}
          onChange={(_, direction) =>
            handleScrollableChange(currentMinute, "minute", direction)
          }
          max={59}
          label="Minutes"
          step={minuteStep}
        />

        {/* Seconds */}
        {showSeconds && (
          <>
            <div className="text-2xl font-bold text-gray-400 py-4">:</div>
            <TimeColumn
              value={currentSecond}
              onChange={(_, direction) =>
                handleScrollableChange(currentSecond, "second", direction)
              }
              max={59}
              label="Seconds"
            />
          </>
        )}

        {/* AM/PM */}
        {format === "12h" && (
          <div className="flex flex-col items-center ml-2">
            <button
              onClick={() => handleAmPmChange(false)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded transition-colors",
                !isPM
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                amPmClassName
              )}
              type="button"
            >
              AM
            </button>
            <button
              onClick={() => handleAmPmChange(true)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded transition-colors mt-1",
                isPM
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                amPmClassName
              )}
              type="button"
            >
              PM
            </button>
          </div>
        )}
      </div>

      {isMobile && (
        <div className="mt-6 pt-4 border-t border-gray-200">
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

  const selectedDate = parseValue(selectedValue);

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
          <div
            className={cn(
              "flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-colors",
              timeInputClassName
            )}
          >
            <span className={selectedDate ? "text-gray-900" : "text-gray-500"}>
              {selectedDate
                ? formatTime(selectedDate, format, showSeconds)
                : placeholder}
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Time picker overlay */}
      {isOpen && (
        <>
          {isMobile && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
          <TimePicker />
        </>
      )}
    </div>
  );
};
