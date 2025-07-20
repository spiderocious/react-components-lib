import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, useState, type ComponentProps } from "react";
import { cn } from "../../../utils";

const textareaStyles = cva(
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
    "resize-none",
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
        sm: "px-2 py-1.5 text-xs min-h-[60px]",
        md: "px-3 py-2 text-sm min-h-[80px]",
        lg: "px-4 py-3 text-base min-h-[120px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type TextAreaProps = Omit<ComponentProps<"textarea">, "size"> &
  VariantProps<typeof textareaStyles> & {
    errorMessage?: string;
    regex?: RegExp;
    validateOnBlur?: boolean;
    maxLength?: number;
    showCharacterCount?: boolean;
    autoResize?: boolean;
  };

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant,
      size,
      className,
      errorMessage,
      regex,
      validateOnBlur = false,
      maxLength,
      showCharacterCount = false,
      autoResize = false,
      value,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [internalError, setInternalError] = useState<string>("");
    const [characterCount, setCharacterCount] = useState(0);

    // Determine if we should show error state
    const hasError = Boolean(errorMessage || internalError);
    const currentVariant = hasError ? "error" : variant;

    // Validation function
    const validateTextarea = (inputValue: string) => {
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

    // Handle textarea change
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      // Handle max length
      if (maxLength && newValue.length > maxLength) {
        return;
      }

      setCharacterCount(newValue.length);
      onChange?.(e);

      if (!validateOnBlur) {
        validateTextarea(newValue);
      }

      // Auto resize functionality
      if (autoResize) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
    };

    // Handle textarea blur
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onBlur?.(e);

      if (validateOnBlur) {
        validateTextarea(e.target.value);
      }
    };

    // Calculate character count from value
    const currentCount =
      typeof value === "string" ? value.length : characterCount;

    return (
      <div className="w-full">
        <div className="relative">
          <textarea
            ref={ref}
            className={cn(
              textareaStyles({ variant: currentVariant, size }),
              className
            )}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={maxLength}
            {...props}
          />
        </div>

        {/* Character count and error message container */}
        <div className="flex justify-between items-start mt-1">
          <div className="flex-1">
            {(errorMessage || internalError) && (
              <p className="text-xs text-red-500 animate-in slide-in-from-top-1 duration-200">
                {errorMessage || internalError}
              </p>
            )}
          </div>

          {(showCharacterCount || maxLength) && (
            <p
              className={cn(
                "text-xs flex-shrink-0 ml-2",
                maxLength && currentCount > maxLength * 0.9
                  ? "text-red-500"
                  : "text-gray-400"
              )}
            >
              {currentCount}
              {maxLength && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
