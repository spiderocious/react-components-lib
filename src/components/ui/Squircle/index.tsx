import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../../utils";

const squircleStyles = cva(
  ["relative", "overflow-hidden", "bg-clip-padding", "w-fit"],
  {
    variants: {
      size: {
        xs: "rounded-lg", // 8px equivalent for small sizes
        sm: "rounded-xl", // 12px equivalent
        md: "rounded-2xl", // 16px equivalent
        lg: "rounded-3xl", // 24px equivalent
        xl: "rounded-[2rem]", // 32px equivalent
        "2xl": "rounded-[2.5rem]", // 40px equivalent
      },
      variant: {
        default: "",
        bordered: "ring-2 ring-white ring-opacity-50",
        shadow: "shadow-lg",
        "bordered-shadow": "ring-2 ring-white ring-opacity-50 shadow-lg",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export type SquircleProps = ComponentProps<"div"> &
  VariantProps<typeof squircleStyles> & {
    children: ReactNode;
  };

export const Squircle = forwardRef<HTMLDivElement, SquircleProps>(
  ({ size, variant, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(squircleStyles({ size, variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Squircle.displayName = "squircle";
