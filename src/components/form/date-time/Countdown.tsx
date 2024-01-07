import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils";
import type { CountdownProps, TimeRemaining } from "./types";
import { calculateTimeRemaining, parseValue } from "./utils";

export const Countdown: React.FC<CountdownProps> = ({
  to,
  showYears = false,
  showMonths = false,
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  onEnd,
  onStart,
  className,
  digitClassName,
  labelClassName,
  separatorClassName,
  completedClassName,
  format = "full",
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });
  const [_isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<any>(null);
  const onEndCalledRef = useRef(false);
  const onStartCalledRef = useRef(false);

  useEffect(() => {
    const targetDate = parseValue(to);
    if (!targetDate) return;

    const updateCountdown = () => {
      const remaining = calculateTimeRemaining(targetDate);
      setTimeRemaining(remaining);

      // Handle start callback
      if (!onStartCalledRef.current && remaining.total > 0) {
        setIsStarted(true);
        onStart?.();
        onStartCalledRef.current = true;
      }

      // Handle end callback
      if (remaining.total <= 0 && !onEndCalledRef.current) {
        setIsCompleted(true);
        onEnd?.();
        onEndCalledRef.current = true;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    };

    // Initial update
    updateCountdown();

    // Set up interval for updates
    intervalRef.current = setInterval(updateCountdown, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [to, onEnd, onStart]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  const TimeUnit = ({
    value,
    label,
    show,
  }: {
    value: number;
    label: string;
    show: boolean;
  }) => {
    if (!show) return null;

    return (
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "text-4xl font-bold text-blue-600 font-mono",
            format === "minimal" && "text-2xl",
            format === "compact" && "text-3xl",
            digitClassName
          )}
        >
          {formatNumber(value)}
        </div>
        <div
          className={cn(
            "text-sm text-gray-600 mt-1 uppercase tracking-wide",
            format === "minimal" && "text-xs",
            labelClassName
          )}
        >
          {label}
        </div>
      </div>
    );
  };

  const Separator = () => (
    <div
      className={cn(
        "text-2xl text-gray-400 mx-2 mt-2",
        format === "minimal" && "text-lg mx-1",
        format === "compact" && "text-xl mx-1",
        separatorClassName
      )}
    >
      :
    </div>
  );

  if (isCompleted) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200",
          completedClassName,
          className
        )}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            Time's Up!
          </div>
          <div className="text-gray-600">The countdown has completed</div>
        </div>
      </div>
    );
  }

  // Determine which units to show
  const units = [
    { value: timeRemaining.years, label: "Years", show: showYears },
    { value: timeRemaining.months, label: "Months", show: showMonths },
    { value: timeRemaining.days, label: "Days", show: showDays },
    { value: timeRemaining.hours, label: "Hours", show: showHours },
    { value: timeRemaining.minutes, label: "Minutes", show: showMinutes },
    { value: timeRemaining.seconds, label: "Seconds", show: showSeconds },
  ].filter((unit) => unit.show);

  if (format === "minimal") {
    return (
      <div
        className={cn("flex items-center justify-center space-x-1", className)}
      >
        {units.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <span
              className={cn(
                "text-xl font-mono font-bold text-blue-600",
                digitClassName
              )}
            >
              {formatNumber(unit.value)}
            </span>
            <span className={cn("text-sm text-gray-500", labelClassName)}>
              {unit.label.charAt(0).toLowerCase()}
            </span>
            {index < units.length - 1 && (
              <span className={cn("text-gray-400 mx-1", separatorClassName)}>
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (format === "compact") {
    return (
      <div
        className={cn(
          "inline-flex items-center space-x-2 p-4 bg-white rounded-lg border",
          className
        )}
      >
        {units.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="text-center">
              <div
                className={cn(
                  "text-2xl font-bold text-blue-600 font-mono",
                  digitClassName
                )}
              >
                {formatNumber(unit.value)}
              </div>
              <div
                className={cn(
                  "text-xs text-gray-600 uppercase",
                  labelClassName
                )}
              >
                {unit.label}
              </div>
            </div>
            {index < units.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    );
  }

  // Full format (default)
  return (
    <div
      className={cn(
        "flex items-center justify-center space-x-6 p-8 bg-white rounded-lg border border-gray-200 shadow-sm",
        className
      )}
    >
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <TimeUnit {...unit} />
          {index < units.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};
