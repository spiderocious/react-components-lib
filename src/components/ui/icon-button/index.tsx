import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../../utils";

const iconButtonStyles = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-full",
    "transition-all",
    "duration-200",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "shadow-sm",
    "hover:shadow-md",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500",
        secondary:
          "bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-gray-500",
        success:
          "bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500",
        danger:
          "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
        warning:
          "bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-500",
        purple:
          "bg-purple-500 text-white hover:bg-purple-600 focus-visible:ring-purple-500",
        white:
          "bg-white text-blue-500 hover:bg-gray-50 focus-visible:ring-blue-500 border border-gray-200",
        dark: "bg-gray-800 text-yellow-400 hover:bg-gray-700 focus-visible:ring-gray-500",
        ghost:
          "bg-transparent text-gray-600 hover:bg-gray-100 focus-visible:ring-gray-500",
      },
      size: {
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-14 w-14 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type IconButtonProps = Omit<ComponentProps<"button">, "children"> &
  VariantProps<typeof iconButtonStyles> & {
    icon: ReactNode;
    "aria-label": string; // Required for accessibility
  };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant, size, className, icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(iconButtonStyles({ variant, size, className }))}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
