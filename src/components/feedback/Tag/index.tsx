import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../../utils";

const tagStyles = cva(
  [
    "inline-flex",
    "items-center",
    "gap-2",
    "px-4",
    "py-3",
    "text-sm",
    "font-medium",
    "transition-all",
    "duration-200",
    "cursor-pointer",
    "select-none",
    "border",
  ],
  {
    variants: {
      variant: {
        purple:
          "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
        blue: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
        cyan: "bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-200",
        indigo:
          "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200",
        green:
          "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
        orange:
          "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200",
        pink: "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200",
        gray: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200",
        white: "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-3 text-sm",
        lg: "px-5 py-4 text-base",
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-full",
        square: "rounded-none",
      },
      layout: {
        horizontal: "flex-row",
        vertical: "flex-col text-center",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "md",
      shape: "rounded",
      layout: "horizontal",
    },
  }
);

const iconStyles = cva(["flex-shrink-0"], {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    },
    layout: {
      horizontal: "",
      vertical: "mx-auto",
    },
  },
  defaultVariants: {
    size: "md",
    layout: "horizontal",
  },
});

export type TagProps = ComponentProps<"div"> &
  VariantProps<typeof tagStyles> & {
    children: ReactNode;
    icon?: ReactNode;
    badge?: ReactNode;
    disabled?: boolean;
    selected?: boolean;
  };

export const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      variant = "blue",
      size = "md",
      shape = "rounded",
      layout = "horizontal",
      children,
      icon,
      badge,
      disabled = false,
      selected = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
    };

    return (
      <div
        ref={ref}
        className={cn(
          tagStyles({ variant, size, shape, layout }),
          selected && "ring-2 ring-blue-500 ring-offset-1",
          disabled && "opacity-50 cursor-not-allowed hover:bg-current",
          className
        )}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-pressed={selected}
        {...props}
      >
        {icon && <div className={iconStyles({ size, layout })}>{icon}</div>}

        <span className={cn("truncate", layout === "vertical" && "mt-1")}>
          {children}
        </span>

        {badge && <div className="flex-shrink-0">{badge}</div>}
      </div>
    );
  }
);

Tag.displayName = "Tag";
