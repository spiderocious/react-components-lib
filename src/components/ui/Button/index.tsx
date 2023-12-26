import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../../utils";

const buttonStyles = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "rounded-full",
    "px-6",
    "py-3",
    "text-sm",
    "font-medium",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500",
        secondary:
          "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500",
        danger:
          "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
        success:
          "bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500",
        warning:
          "bg-yellow-400 text-gray-900 hover:bg-yellow-500 focus-visible:ring-yellow-500",
        dark: "bg-gray-800 text-white hover:bg-gray-900 focus-visible:ring-gray-500",
        outline:
          "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500",
        ghost:
          "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500",
      },
      size: {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonStyles> & {
    icon?: ReactNode;
    iconPosition?: "left" | "right";
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      className,
      children,
      icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size, className }))}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
