import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "../../../utils";

const progressContainerStyles = cva(
  ["relative", "overflow-hidden", "bg-gray-200"],
  {
    variants: {
      orientation: {
        horizontal: "w-full",
        vertical: "h-full",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      shape: {
        rounded: "rounded-full",
        square: "rounded-none",
        pill: "rounded-full",
      },
    },
    compoundVariants: [
      // Horizontal sizing
      { orientation: "horizontal", size: "sm", class: "h-1" },
      { orientation: "horizontal", size: "md", class: "h-2" },
      { orientation: "horizontal", size: "lg", class: "h-3" },

      // Vertical sizing
      { orientation: "vertical", size: "sm", class: "w-1" },
      { orientation: "vertical", size: "md", class: "w-2" },
      { orientation: "vertical", size: "lg", class: "w-3" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
      shape: "rounded",
    },
  }
);

const progressBarStyles = cva(
  ["h-full", "transition-all", "duration-300", "ease-out"],
  {
    variants: {
      variant: {
        blue: "bg-blue-500",
        green: "bg-green-500",
        red: "bg-red-500",
        yellow: "bg-yellow-500",
        orange: "bg-orange-500",
        purple: "bg-purple-500",
        gray: "bg-gray-500",
        gradient: "bg-gradient-to-r from-blue-500 to-purple-500",
      },
      animated: {
        true: "bg-size-200 bg-pos-0 animate-progress-flow",
        false: "",
      },
    },
    defaultVariants: {
      variant: "blue",
      animated: false,
    },
  }
);

export type ProgressProps = ComponentProps<"div"> &
  VariantProps<typeof progressContainerStyles> &
  Pick<VariantProps<typeof progressBarStyles>, "variant"> & {
    value: number;
    max?: number;
    showLabel?: boolean;
    label?: string;
    animated?: boolean;
    indeterminate?: boolean;
  };

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      orientation = "horizontal",
      size = "md",
      shape = "rounded",
      variant = "blue",
      showLabel = false,
      label,
      animated = false,
      indeterminate = false,
      className,
      ...props
    },
    ref
  ) => {
    // Clamp value between 0 and max
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percentage = (clampedValue / max) * 100;

    const progressStyle =
      orientation === "horizontal"
        ? { width: indeterminate ? "30%" : `${percentage}%` }
        : { height: indeterminate ? "30%" : `${percentage}%` };

    const formatLabel = () => {
      if (label) return label;
      if (indeterminate) return "Loading...";
      return `${Math.round(percentage)}%`;
    };

    return (
      <div className="w-full">
        {/* Label */}
        {showLabel && (
          <div
            className={cn(
              "flex justify-between items-center mb-2 text-sm text-gray-600",
              orientation === "vertical" && "flex-col mb-0 mr-2"
            )}
          >
            <span>{formatLabel()}</span>
            {!indeterminate && (
              <span>
                {clampedValue}/{max}
              </span>
            )}
          </div>
        )}

        {/* Progress Container */}
        <div className={cn(orientation === "vertical" && "flex items-end")}>
          <div
            ref={ref}
            className={cn(
              progressContainerStyles({ orientation, size, shape }),
              orientation === "vertical" && "min-h-[100px]",
              className
            )}
            role="progressbar"
            aria-valuenow={indeterminate ? undefined : clampedValue}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={label || "Progress"}
            {...props}
          >
            {/* Progress Bar */}
            <div
              className={cn(
                progressBarStyles({ variant, animated }),
                indeterminate &&
                  orientation === "horizontal" &&
                  "animate-progress-indeterminate",
                indeterminate &&
                  orientation === "vertical" &&
                  "animate-progress-indeterminate-vertical",
                orientation === "vertical" && "w-full"
              )}
              style={progressStyle}
            />
          </div>
        </div>
      </div>
    );
  }
);

// Predefined progress variants
export const ProgressSuccess = forwardRef<
  HTMLDivElement,
  Omit<ProgressProps, "variant">
>((props, ref) => <Progress ref={ref} variant="green" {...props} />);

export const ProgressError = forwardRef<
  HTMLDivElement,
  Omit<ProgressProps, "variant">
>((props, ref) => <Progress ref={ref} variant="red" {...props} />);

export const ProgressWarning = forwardRef<
  HTMLDivElement,
  Omit<ProgressProps, "variant">
>((props, ref) => <Progress ref={ref} variant="yellow" {...props} />);

export const ProgressGradient = forwardRef<
  HTMLDivElement,
  Omit<ProgressProps, "variant">
>((props, ref) => <Progress ref={ref} variant="gradient" {...props} />);

Progress.displayName = "Progress";
ProgressSuccess.displayName = "ProgressSuccess";
ProgressError.displayName = "ProgressError";
ProgressWarning.displayName = "ProgressWarning";
ProgressGradient.displayName = "ProgressGradient";
