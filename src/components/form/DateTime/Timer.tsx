import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils";
import type { TimeRemaining, TimerProps } from "./types";
import { calculateTimeRemaining, parseValue } from "./utils";

export const Timer: React.FC<TimerProps> = ({
  to,
  showYears = false,
  showMonths = false,
  showDays = false,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  onEnd,
  onStart,
  size = 200,
  strokeWidth = 8,
  progressColor = "#3B82F6",
  backgroundColor = "#E5E7EB",
  textColor = "#1F2937",
  className,
  timerClassName,
  circleClassName,
  progressClassName,
  centerTextClassName,
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
  const [totalDuration, setTotalDuration] = useState(0);
  const [_isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<any>(null);
  const onEndCalledRef = useRef(false);
  const onStartCalledRef = useRef(false);

  useEffect(() => {
    const targetDate = parseValue(to);
    if (!targetDate) return;

    // Calculate initial total duration
    const initialRemaining = calculateTimeRemaining(targetDate);
    setTotalDuration(initialRemaining.total);

    const updateTimer = () => {
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
    updateTimer();

    // Set up interval for updates
    intervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [to, onEnd, onStart]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  const getDisplayText = (): string => {
    const parts: string[] = [];

    if (showYears && timeRemaining.years > 0) {
      parts.push(`${timeRemaining.years}y`);
    }
    if (showMonths && timeRemaining.months > 0) {
      parts.push(`${timeRemaining.months}mo`);
    }
    if (showDays && timeRemaining.days > 0) {
      parts.push(`${timeRemaining.days}d`);
    }
    if (showHours && (timeRemaining.hours > 0 || parts.length > 0)) {
      parts.push(`${formatNumber(timeRemaining.hours)}h`);
    }
    if (showMinutes && (timeRemaining.minutes > 0 || parts.length > 0)) {
      parts.push(`${formatNumber(timeRemaining.minutes)}m`);
    }
    if (showSeconds) {
      parts.push(`${formatNumber(timeRemaining.seconds)}s`);
    }

    // If we have multiple parts, show them on separate lines for better fit
    if (parts.length > 2) {
      return parts.slice(0, 2).join(" ");
    }

    return parts.join(" ") || "00s";
  };

  const getSubText = (): string => {
    const parts: string[] = [];

    if (showYears && timeRemaining.years > 0) {
      parts.push(`${timeRemaining.years}y`);
    }
    if (showMonths && timeRemaining.months > 0) {
      parts.push(`${timeRemaining.months}mo`);
    }
    if (showDays && timeRemaining.days > 0) {
      parts.push(`${timeRemaining.days}d`);
    }
    if (showHours && (timeRemaining.hours > 0 || parts.length > 0)) {
      parts.push(`${formatNumber(timeRemaining.hours)}h`);
    }
    if (showMinutes && (timeRemaining.minutes > 0 || parts.length > 0)) {
      parts.push(`${formatNumber(timeRemaining.minutes)}m`);
    }
    if (showSeconds) {
      parts.push(`${formatNumber(timeRemaining.seconds)}s`);
    }

    // Return remaining parts if we have more than 2
    if (parts.length > 2) {
      return parts.slice(2).join(" ");
    }

    return "";
  };

  // Calculate progress percentage
  const progress =
    totalDuration > 0
      ? Math.max(
          0,
          Math.min(
            100,
            ((totalDuration - timeRemaining.total) / totalDuration) * 100
          )
        )
      : 0;

  // SVG circle calculations
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const mainText = getDisplayText();
  const subText = getSubText();

  // Determine font sizes based on text length and circle size
  const getMainFontSize = () => {
    if (size <= 100) return "12px";
    if (size <= 150) return "16px";
    if (size <= 200) return "20px";
    return "24px";
  };

  const getSubFontSize = () => {
    if (size <= 100) return "10px";
    if (size <= 150) return "12px";
    if (size <= 200) return "14px";
    return "16px";
  };

  if (isCompleted) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full border-4 border-green-500",
            timerClassName
          )}
          style={{ width: size, height: size }}
        >
          <div className="text-center">
            <div
              style={{ fontSize: getMainFontSize(), color: textColor }}
              className="font-bold"
            >
              ✓
            </div>
            <div
              style={{ fontSize: getSubFontSize(), color: textColor }}
              className="opacity-75"
            >
              Done
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn("relative", timerClassName)}
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          className={cn("transform -rotate-90", circleClassName)}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="opacity-30"
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              "transition-all duration-1000 ease-out",
              progressClassName
            )}
            style={{
              filter: "drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))",
            }}
          />
        </svg>

        {/* Center text */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center text-center px-2",
            centerTextClassName
          )}
        >
          <div
            style={{
              fontSize: getMainFontSize(),
              color: textColor,
              lineHeight: "1.2",
            }}
            className="font-bold font-mono"
          >
            {mainText}
          </div>
          {subText && (
            <div
              style={{
                fontSize: getSubFontSize(),
                color: textColor,
                lineHeight: "1.1",
              }}
              className="opacity-75 font-mono mt-1"
            >
              {subText}
            </div>
          )}
        </div>

        {/* Progress indicator dots */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative" style={{ width: size, height: size }}>
            {/* You can add progress dots here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};
