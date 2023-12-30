import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../../utils";

const chipStyles = cva(
  [
    "inline-flex",
    "items-center",
    "gap-1.5",
    "px-3",
    "py-1.5",
    "rounded-full",
    "text-sm",
    "font-medium",
    "transition-all",
    "duration-200",
    "cursor-default",
    "select-none",
  ],
  {
    variants: {
      variant: {
        blue: "bg-blue-100 text-blue-700 border border-blue-200",
        red: "bg-red-100 text-red-700 border border-red-200",
        green: "bg-green-100 text-green-700 border border-green-200",
        orange: "bg-orange-100 text-orange-700 border border-orange-200",
        gray: "bg-gray-100 text-gray-700 border border-gray-200",
        purple: "bg-purple-100 text-purple-700 border border-purple-200",
        cyan: "bg-cyan-100 text-cyan-700 border border-cyan-200",
        yellow: "bg-yellow-100 text-yellow-700 border border-yellow-200",
        pink: "bg-pink-100 text-pink-700 border border-pink-200",
        indigo: "bg-indigo-100 text-indigo-700 border border-indigo-200",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
      clickable: {
        true: "cursor-pointer hover:shadow-sm",
        false: "",
      },
    },
    compoundVariants: [
      // Hover states for clickable chips
      {
        variant: "blue",
        clickable: true,
        class: "hover:bg-blue-200 hover:border-blue-300",
      },
      {
        variant: "red",
        clickable: true,
        class: "hover:bg-red-200 hover:border-red-300",
      },
      {
        variant: "green",
        clickable: true,
        class: "hover:bg-green-200 hover:border-green-300",
      },
      {
        variant: "orange",
        clickable: true,
        class: "hover:bg-orange-200 hover:border-orange-300",
      },
      {
        variant: "gray",
        clickable: true,
        class: "hover:bg-gray-200 hover:border-gray-300",
      },
      {
        variant: "purple",
        clickable: true,
        class: "hover:bg-purple-200 hover:border-purple-300",
      },
      {
        variant: "cyan",
        clickable: true,
        class: "hover:bg-cyan-200 hover:border-cyan-300",
      },
    ],
    defaultVariants: {
      variant: "blue",
      size: "md",
      clickable: false,
    },
  }
);

const closeButtonStyles = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "rounded-full",
    "transition-colors",
    "duration-200",
    "cursor-pointer",
    "hover:bg-black/10",
  ],
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type ChipProps = Omit<ComponentProps<"div">, "children"> &
  VariantProps<typeof chipStyles> & {
    children: ReactNode;
    onClose?: () => void;
    closePosition?: "left" | "right";
    icon?: ReactNode;
    disabled?: boolean;
  };

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      variant = "blue",
      size = "md",
      clickable,
      children,
      onClose,
      closePosition = "right",
      icon,
      disabled = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const isClickable = clickable || !!onClick;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
    };

    const handleCloseClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      onClose?.();
    };

    const CloseIcon = () => (
      <svg
        width={size === "sm" ? "10" : size === "lg" ? "16" : "12"}
        height={size === "sm" ? "10" : size === "lg" ? "16" : "12"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m18 6-12 12M6 6l12 12" />
      </svg>
    );

    const renderCloseButton = () => {
      if (!onClose) return null;

      return (
        <button
          type="button"
          className={closeButtonStyles({ size })}
          onClick={handleCloseClick}
          disabled={disabled}
          aria-label="Remove"
        >
          <CloseIcon />
        </button>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          chipStyles({
            variant,
            size,
            clickable: isClickable && !disabled,
          }),
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={isClickable ? handleClick : undefined}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable && !disabled ? 0 : undefined}
        aria-disabled={disabled}
        {...props}
      >
        {/* Left side content */}
        {closePosition === "left" && renderCloseButton()}
        {icon && (
          <span className="flex items-center justify-center">{icon}</span>
        )}

        {/* Main content */}
        <span className="truncate">{children}</span>

        {/* Right side content */}
        {closePosition === "right" && renderCloseButton()}
      </div>
    );
  }
);

Chip.displayName = "Chip";
