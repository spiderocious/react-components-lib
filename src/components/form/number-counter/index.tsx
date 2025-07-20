import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, useEffect, useState, type ComponentProps } from "react";
import { cn } from "../../../utils";

const numberCounterStyles = cva(["flex", "items-center", "gap-2", "w-fit"]);

const buttonStyles = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "rounded-full",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-1",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "font-medium",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500/20",
        secondary:
          "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500/20",
        outline:
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500/20",
      },
      size: {
        sm: "h-6 w-6 text-xs",
        md: "h-8 w-8 text-sm",
        lg: "h-10 w-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const inputStyles = cva(
  [
    "text-center",
    "border-0",
    "bg-transparent",
    "focus:outline-none",
    "focus:ring-0",
    "font-medium",
  ],
  {
    variants: {
      size: {
        sm: "w-8 text-xs",
        md: "w-12 text-sm",
        lg: "w-16 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type NumberCounterProps = Omit<ComponentProps<"div">, "onChange"> &
  VariantProps<typeof numberCounterStyles> & {
    value?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "secondary" | "outline";
    allowManualInput?: boolean;
    errorMessage?: string;
  };

export const NumberCounter = forwardRef<HTMLDivElement, NumberCounterProps>(
  (
    {
      className,
      value = 0,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      size = "md",
      variant = "default",
      allowManualInput = true,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const [inputValue, setInputValue] = useState(value.toString());

    // Sync internal value with prop value
    useEffect(() => {
      setInternalValue(value);
      setInputValue(value.toString());
    }, [value]);

    // Handle increment
    const handleIncrement = () => {
      if (disabled) return;

      const newValue = Math.min(internalValue + step, max);
      setInternalValue(newValue);
      setInputValue(newValue.toString());
      onChange?.(newValue);
    };

    // Handle decrement
    const handleDecrement = () => {
      if (disabled) return;

      const newValue = Math.max(internalValue - step, min);
      setInternalValue(newValue);
      setInputValue(newValue.toString());
      onChange?.(newValue);
    };

    // Handle manual input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!allowManualInput || disabled) return;

      const rawValue = e.target.value;
      setInputValue(rawValue);

      // Parse and validate the input
      const numericValue = parseInt(rawValue, 10);
      if (!isNaN(numericValue)) {
        const clampedValue = Math.max(min, Math.min(max, numericValue));
        setInternalValue(clampedValue);
        onChange?.(clampedValue);
      }
    };

    // Handle input blur to clean up the display value
    const handleInputBlur = () => {
      setInputValue(internalValue.toString());
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleIncrement();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleDecrement();
      }
    };

    const MinusIcon = () => (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M5 12h14" />
      </svg>
    );

    const PlusIcon = () => (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    );

    const isAtMin = internalValue <= min;
    const isAtMax = internalValue >= max;

    return (
      <div className="w-full">
        <div
          ref={ref}
          className={cn(numberCounterStyles(), className)}
          {...props}
        >
          {/* Decrement Button */}
          <button
            type="button"
            className={cn(buttonStyles({ variant, size }))}
            onClick={handleDecrement}
            disabled={disabled || isAtMin}
            aria-label="Decrease value"
          >
            <MinusIcon />
          </button>

          {/* Number Input */}
          {allowManualInput ? (
            <input
              type="text"
              className={cn(inputStyles({ size }))}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              aria-label="Number value"
            />
          ) : (
            <span className={cn(inputStyles({ size }))}>{internalValue}</span>
          )}

          {/* Increment Button */}
          <button
            type="button"
            className={cn(buttonStyles({ variant, size }))}
            onClick={handleIncrement}
            disabled={disabled || isAtMax}
            aria-label="Increase value"
          >
            <PlusIcon />
          </button>
        </div>

        {errorMessage && (
          <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1 duration-200">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

NumberCounter.displayName = "NumberCounter";
