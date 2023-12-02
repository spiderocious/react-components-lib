import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "../../../utils";

const buttonStyles = cva(
  [
    "w-full",
    "rounded-md",
    "px-4",
    "py-2",
    "text-sm",
    "font-medium",
    "disabled:cursor-not-allowed",
    "text-left",
  ],
  {
    variants: {
      variant: {
        solids: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
      colorscheme: {
        primary: "text-white",
      },
    },
    compoundVariants: [
      {
        variant: "solids",
        colorscheme: "primary",
        class: "bg-blue-500 text-white hover:bg-blue-600",
      },
      {
        variant: "outline",
        colorscheme: "primary",
        class: "border border-blue-500 text-blue-500 hover:bg-blue-50",
      },
    ],
    defaultVariants: {
      variant: "solids",
      size: "md",
      colorscheme: "primary",
    },
  }
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonStyles>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, colorscheme, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size, colorscheme, className }))}
        {...props}
      />
    );
  }
);
