import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../../utils";

const alertStyles = cva(
  [
    "relative",
    "w-full",
    "rounded-lg",
    "border",
    "p-4",
    "transition-all",
    "duration-200",
  ],
  {
    variants: {
      variant: {
        info: ["bg-blue-50", "border-blue-200", "text-blue-800"],
        success: ["bg-green-50", "border-green-200", "text-green-800"],
        warning: ["bg-orange-50", "border-orange-200", "text-orange-800"],
        error: ["bg-red-50", "border-red-200", "text-red-800"],
        neutral: ["bg-gray-50", "border-gray-200", "text-gray-800"],
      },
      size: {
        sm: "p-3 text-sm",
        md: "p-4 text-sm",
        lg: "p-5 text-base",
      },
    },
    defaultVariants: {
      variant: "info",
      size: "md",
    },
  }
);

const alertIconStyles = cva(
  ["flex-shrink-0", "rounded-full", "flex", "items-center", "justify-center"],
  {
    variants: {
      variant: {
        info: "bg-blue-500 text-white",
        success: "bg-green-500 text-white",
        warning: "bg-orange-500 text-white",
        error: "bg-red-500 text-white",
        neutral: "bg-gray-500 text-white",
      },
      size: {
        sm: "h-5 w-5",
        md: "h-6 w-6",
        lg: "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "info",
      size: "md",
    },
  }
);

const alertContentStyles = cva(["flex-1", "min-w-0"], {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const alertTitleStyles = cva(["font-medium", "leading-tight"], {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const alertDescriptionStyles = cva(["mt-1", "leading-relaxed"], {
  variants: {
    variant: {
      info: "text-blue-700",
      success: "text-green-700",
      warning: "text-orange-700",
      error: "text-red-700",
      neutral: "text-gray-700",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    variant: "info",
    size: "md",
  },
});

const alertActionStyles = cva(["flex-shrink-0", "ml-3"], {
  variants: {
    layout: {
      inline: "self-start",
      block: "self-start mt-3 ml-0",
    },
  },
  defaultVariants: {
    layout: "inline",
  },
});

export type AlertProps = ComponentProps<"div"> &
  VariantProps<typeof alertStyles> & {
    title?: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
    icon?: ReactNode;
    layout?: "inline" | "block";
    hideIcon?: boolean;
  };

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "info",
      size = "md",
      title,
      description,
      action,
      icon,
      layout = "inline",
      hideIcon = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Default icons for each variant
    const getDefaultIcon = () => {
      switch (variant) {
        case "success":
          return (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          );
        case "warning":
          return (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="m12 17 .01 0" />
            </svg>
          );
        case "error":
          return (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          );
        case "neutral":
          return (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="m12 8 .01 0" />
            </svg>
          );
        default: // info
          return (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="m12 8 .01 0" />
            </svg>
          );
      }
    };

    // Determine if we should show the action on a new line
    const shouldShowActionInline = layout === "inline" && !description;
    const shouldShowActionBlock =
      layout === "block" || (layout === "inline" && description);

    // If only children are provided (simple text content)
    if (children && !title && !description) {
      return (
        <div
          ref={ref}
          className={cn(alertStyles({ variant, size }), className)}
          role="alert"
          {...props}
        >
          <div className="flex items-start gap-3">
            {!hideIcon && (
              <div className={alertIconStyles({ variant, size })}>
                {icon || getDefaultIcon()}
              </div>
            )}

            <div className={cn(alertContentStyles({ size }), "flex-1")}>
              {children}
            </div>

            {action && shouldShowActionInline && (
              <div className={alertActionStyles({ layout: "inline" })}>
                {action}
              </div>
            )}
          </div>

          {action && shouldShowActionBlock && (
            <div
              className={cn(
                alertActionStyles({ layout: "block" }),
                !hideIcon && "ml-9"
              )}
            >
              {action}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(alertStyles({ variant, size }), className)}
        role="alert"
        {...props}
      >
        <div className="flex items-start gap-3">
          {!hideIcon && (
            <div className={alertIconStyles({ variant, size })}>
              {icon || getDefaultIcon()}
            </div>
          )}

          <div className={alertContentStyles({ size })}>
            {title && <div className={alertTitleStyles({ size })}>{title}</div>}

            {description && (
              <div className={alertDescriptionStyles({ variant, size })}>
                {description}
              </div>
            )}

            {children && (
              <div
                className={cn(
                  title || description ? "mt-2" : "",
                  alertDescriptionStyles({ variant, size })
                )}
              >
                {children}
              </div>
            )}
          </div>

          {action && shouldShowActionInline && (
            <div className={alertActionStyles({ layout: "inline" })}>
              {action}
            </div>
          )}
        </div>

        {action && shouldShowActionBlock && (
          <div
            className={cn(
              alertActionStyles({ layout: "block" }),
              !hideIcon && "ml-9"
            )}
          >
            {action}
          </div>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";
