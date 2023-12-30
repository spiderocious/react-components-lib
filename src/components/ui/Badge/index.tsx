import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../../utils";

const badgeStyles = cva(
  [
    "inline-flex",
    "items-center",
    "gap-1.5",
    "px-2.5",
    "py-1",
    "rounded-full",
    "text-xs",
    "font-medium",
    "transition-all",
    "duration-200",
    "select-none",
  ],
  {
    variants: {
      variant: {
        // Light variants (colored backgrounds)
        blue: "bg-blue-100 text-blue-700",
        red: "bg-red-100 text-red-700",
        green: "bg-green-100 text-green-700",
        orange: "bg-orange-100 text-orange-700",
        gray: "bg-gray-100 text-gray-700",
        purple: "bg-purple-100 text-purple-700",
        cyan: "bg-cyan-100 text-cyan-700",
        yellow: "bg-yellow-100 text-yellow-700",

        // Dark variants (solid backgrounds)
        "blue-dark": "bg-blue-600 text-white",
        "red-dark": "bg-red-600 text-white",
        "green-dark": "bg-green-600 text-white",
        "orange-dark": "bg-orange-600 text-white",
        "gray-dark": "bg-gray-600 text-white",
        "purple-dark": "bg-purple-600 text-white",
        "cyan-dark": "bg-cyan-600 text-white",
        "yellow-dark": "bg-yellow-600 text-white",
        black: "bg-gray-900 text-white",

        // Special variants
        outline: "border border-gray-300 text-gray-700 bg-transparent",
        "outline-blue": "border border-blue-300 text-blue-700 bg-transparent",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "md",
    },
  }
);

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeStyles> & {
    children: ReactNode;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
  };

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "blue",
      size = "md",
      children,
      icon,
      iconPosition = "left",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeStyles({ variant, size }), className)}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="flex items-center justify-center">{icon}</span>
        )}

        <span className="truncate">{children}</span>

        {icon && iconPosition === "right" && (
          <span className="flex items-center justify-center">{icon}</span>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";
