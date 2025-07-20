import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "../../../utils";

const inputStyles = cva(
  [
    "w-full",
    "rounded-md",
    "border",
    "bg-white",
    "px-3",
    "py-2",
    "text-sm",
    "transition-all",
    "duration-200",
    "placeholder:text-gray-400",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-1",
    "disabled:cursor-not-allowed",
    "disabled:bg-gray-50",
    "disabled:text-gray-500",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-gray-200",
          "focus:border-blue-500",
          "focus:ring-blue-500/20",
        ],
        error: [
          "border-red-500",
          "focus:border-red-500",
          "focus:ring-red-500/20",
        ],
      },
      size: {
        sm: "px-2 py-1.5 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const inputWrapperStyles = cva(["relative", "w-full"]);

const iconStyles = cva(
  [
    "absolute",
    "top-1/2",
    "-translate-y-1/2",
    "text-gray-400",
    "pointer-events-none",
  ],
  {
    variants: {
      position: {
        left: "left-3",
        right: "right-3",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      position: "left",
      size: "md",
    },
  }
);

const clearButtonStyles = cva([
  "absolute",
  "right-2",
  "top-1/2",
  "-translate-y-1/2",
  "h-5",
  "w-5",
  "rounded-full",
  "bg-gray-200",
  "text-gray-500",
  "hover:bg-gray-300",
  "hover:text-gray-700",
  "transition-colors",
  "cursor-pointer",
  "flex",
  "items-center",
  "justify-center",
]);

export type InputProps = Omit<ComponentProps<"input">, "size"> &
  VariantProps<typeof inputStyles> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    clearable?: boolean;
    onClear?: () => void;
    errorMessage?: string;
    regex?: RegExp;
    validateOnBlur?: boolean;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      size,
      className,
      leftIcon,
      rightIcon,
      clearable,
      onClear,
      errorMessage,
      regex,
      validateOnBlur = false,
      value,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [internalError, setInternalError] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);

    // Determine if we should show error state
    const hasError = Boolean(errorMessage || internalError);
    const currentVariant = hasError ? "error" : variant;

    // Validation function
    const validateInput = (inputValue: string) => {
      if (!regex || !inputValue) {
        setInternalError("");
        return;
      }

      if (!regex.test(inputValue)) {
        setInternalError(errorMessage || "Invalid value");
      } else {
        setInternalError("");
      }
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);

      if (!validateOnBlur) {
        validateInput(e.target.value);
      }
    };

    // Handle input blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);

      if (validateOnBlur) {
        validateInput(e.target.value);
      }
    };

    // Handle clear
    const handleClear = () => {
      setInternalError("");
      onClear?.();
    };

    // Calculate padding based on icons
    const getPaddingClass = () => {
      const baseClass =
        size === "sm" ? "px-2" : size === "lg" ? "px-4" : "px-3";

      if (leftIcon && (rightIcon || clearable)) {
        return size === "sm"
          ? "pl-7 pr-8"
          : size === "lg"
          ? "pl-10 pr-12"
          : "pl-9 pr-10";
      } else if (leftIcon) {
        return size === "sm" ? "pl-7" : size === "lg" ? "pl-10" : "pl-9";
      } else if (rightIcon || clearable) {
        return size === "sm" ? "pr-8" : size === "lg" ? "pr-12" : "pr-10";
      }

      return baseClass;
    };

    const XIcon = () => (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m18 6-12 12M6 6l12 12" />
      </svg>
    );

    return (
      <div className="w-full">
        <div className={inputWrapperStyles()}>
          {leftIcon && (
            <div className={iconStyles({ position: "left", size })}>
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              inputStyles({ variant: currentVariant, size }),
              getPaddingClass(),
              className
            )}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={() => setIsFocused(true)}
            {...props}
          />

          {rightIcon && !clearable && (
            <div className={iconStyles({ position: "right", size })}>
              {rightIcon}
            </div>
          )}

          {clearable && value && (
            <button
              type="button"
              className={clearButtonStyles()}
              onClick={handleClear}
              tabIndex={-1}
            >
              <XIcon />
            </button>
          )}
        </div>

        {(errorMessage || internalError) && (
          <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1 duration-200">
            {errorMessage || internalError}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
