import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "../../../utils";

const ratingContainerStyles = cva(["inline-flex", "items-center"], {
  variants: {
    orientation: {
      horizontal: "flex-row gap-1",
      vertical: "flex-col gap-1",
    },
    size: {
      xs: "gap-0.5",
      sm: "gap-1",
      md: "gap-1",
      lg: "gap-1.5",
      xl: "gap-2",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

const starStyles = cva(
  ["cursor-pointer", "transition-all", "duration-200", "select-none"],
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
      },
      state: {
        empty: "text-gray-300",
        filled: "text-yellow-400",
        half: "text-yellow-400",
        hover: "text-yellow-300",
      },
      interactive: {
        true: "hover:scale-110",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      state: "empty",
      interactive: false,
    },
  }
);

export type RatingProps = ComponentProps<"div"> &
  VariantProps<typeof ratingContainerStyles> & {
    value: number;
    max?: number;
    precision?: 0.5 | 1;
    readOnly?: boolean;
    onChange?: (value: number) => void;
    onHover?: (value: number) => void;
    icon?: ReactNode;
    emptyIcon?: ReactNode;
    halfIcon?: ReactNode;
    showTooltip?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
  };

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value,
      max = 5,
      precision = 1,
      readOnly = false,
      onChange,
      onHover,
      orientation = "horizontal",
      size = "md",
      icon,
      emptyIcon,
      halfIcon,
      showTooltip = false,
      allowClear = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [tooltip, setTooltip] = useState<string>("");

    const isInteractive = !readOnly && !disabled;
    const displayValue = hoverValue !== null ? hoverValue : value;

    // Default icons
    const DefaultFilledIcon = ({ className }: { className?: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );

    const DefaultEmptyIcon = ({ className }: { className?: string }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );

    const DefaultHalfIcon = ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24">
        <defs>
          <linearGradient id="half-fill">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-fill)"
          stroke="currentColor"
          strokeWidth="2"
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>
    );

    const FilledIcon = icon || <DefaultFilledIcon />;
    const EmptyIcon = emptyIcon || <DefaultEmptyIcon />;
    const HalfIcon = halfIcon || <DefaultHalfIcon />;

    const handleClick = (starValue: number) => {
      if (!isInteractive) return;

      let newValue = starValue;

      // Allow clearing if clicking on current value and allowClear is true
      if (allowClear && value === starValue) {
        newValue = 0;
      }

      onChange?.(newValue);
    };

    const handleMouseEnter = (starValue: number) => {
      if (!isInteractive) return;

      setHoverValue(starValue);
      onHover?.(starValue);

      if (showTooltip) {
        setTooltip(`${starValue} out of ${max} stars`);
      }
    };

    const handleMouseLeave = () => {
      if (!isInteractive) return;

      setHoverValue(null);
      setTooltip("");
    };

    const getStarState = (starIndex: number): "empty" | "filled" | "half" => {
      const starValue = starIndex + 1;

      if (displayValue >= starValue) {
        return "filled";
      } else if (precision === 0.5 && displayValue >= starValue - 0.5) {
        return "half";
      } else {
        return "empty";
      }
    };

    const renderStar = (starIndex: number) => {
      const starValue = starIndex + 1;
      const state = getStarState(starIndex);
      const isHovered = hoverValue !== null && starValue <= hoverValue;

      let IconComponent = EmptyIcon;
      let iconState: "empty" | "filled" | "half" | "hover" = state;

      if (isHovered) {
        IconComponent = FilledIcon;
        iconState = "hover";
      } else if (state === "filled") {
        IconComponent = FilledIcon;
      } else if (state === "half") {
        IconComponent = HalfIcon;
      }

      return (
        <button
          key={starIndex}
          type="button"
          className={cn(
            starStyles({
              size,
              state,
              interactive: isInteractive,
            }),
            disabled && "cursor-not-allowed opacity-50"
          )}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => handleMouseEnter(starValue)}
          onMouseLeave={handleMouseLeave}
          disabled={disabled}
          aria-label={`Rate ${starValue} out of ${max} stars`}
          title={showTooltip ? tooltip : undefined}
        >
          <span
            className={cn(
              starStyles({ size, state: iconState, interactive: isInteractive })
            )}
          >
            {IconComponent}
          </span>
        </button>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(ratingContainerStyles({ orientation, size }), className)}
        role="radiogroup"
        aria-label={`Rating: ${value} out of ${max} stars`}
        {...props}
      >
        {Array.from({ length: max }, (_, index) => renderStar(index))}

        {showTooltip && tooltip && (
          <div className="ml-2 text-sm text-gray-600">{tooltip}</div>
        )}
      </div>
    );
  }
);

// Predefined rating variants
export const RatingReadOnly = forwardRef<
  HTMLDivElement,
  Omit<RatingProps, "readOnly">
>((props, ref) => <Rating ref={ref} readOnly {...props} />);

export const RatingInteractive = forwardRef<
  HTMLDivElement,
  Omit<RatingProps, "readOnly">
>((props, ref) => <Rating ref={ref} readOnly={false} {...props} />);

export const RatingHalf = forwardRef<
  HTMLDivElement,
  Omit<RatingProps, "precision">
>((props, ref) => <Rating ref={ref} precision={0.5} {...props} />);

// Import React for cloneElement

Rating.displayName = "Rating";
RatingReadOnly.displayName = "RatingReadOnly";
RatingInteractive.displayName = "RatingInteractive";
RatingHalf.displayName = "RatingHalf";
