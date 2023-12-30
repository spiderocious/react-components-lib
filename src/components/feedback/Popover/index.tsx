import { cva } from "class-variance-authority";
import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../../../utils";

const popoverStyles = cva(
  [
    "absolute",
    "z-50",
    "w-80",
    "max-w-sm",
    "bg-white",
    "border",
    "border-gray-200",
    "rounded-lg",
    "shadow-lg",
    "p-4",
    "text-sm",
    "animate-in",
    "fade-in-0",
    "zoom-in-95",
  ],
  {
    variants: {
      side: {
        top: "bottom-full mb-2",
        bottom: "top-full mt-2",
        left: "right-full mr-2",
        right: "left-full ml-2",
      },
      align: {
        start: "",
        center: "",
        end: "",
      },
    },
    compoundVariants: [
      // Top positioning
      { side: "top", align: "start", class: "left-0" },
      { side: "top", align: "center", class: "left-1/2 -translate-x-1/2" },
      { side: "top", align: "end", class: "right-0" },

      // Bottom positioning
      { side: "bottom", align: "start", class: "left-0" },
      { side: "bottom", align: "center", class: "left-1/2 -translate-x-1/2" },
      { side: "bottom", align: "end", class: "right-0" },

      // Left positioning
      { side: "left", align: "start", class: "top-0" },
      { side: "left", align: "center", class: "top-1/2 -translate-y-1/2" },
      { side: "left", align: "end", class: "bottom-0" },

      // Right positioning
      { side: "right", align: "start", class: "top-0" },
      { side: "right", align: "center", class: "top-1/2 -translate-y-1/2" },
      { side: "right", align: "end", class: "bottom-0" },
    ],
    defaultVariants: {
      side: "bottom",
      align: "center",
    },
  }
);

const arrowStyles = cva(
  [
    "absolute",
    "h-2",
    "w-2",
    "bg-white",
    "border",
    "border-gray-200",
    "rotate-45",
  ],
  {
    variants: {
      side: {
        top: "top-full -mt-1 border-t-0 border-l-0",
        bottom: "bottom-full -mb-1 border-b-0 border-r-0",
        left: "left-full -ml-1 border-l-0 border-b-0",
        right: "right-full -mr-1 border-r-0 border-t-0",
      },
      align: {
        start: "",
        center: "",
        end: "",
      },
    },
    compoundVariants: [
      // Top arrow positioning
      { side: "top", align: "start", class: "left-4" },
      { side: "top", align: "center", class: "left-1/2 -translate-x-1/2" },
      { side: "top", align: "end", class: "right-4" },

      // Bottom arrow positioning
      { side: "bottom", align: "start", class: "left-4" },
      { side: "bottom", align: "center", class: "left-1/2 -translate-x-1/2" },
      { side: "bottom", align: "end", class: "right-4" },

      // Left arrow positioning
      { side: "left", align: "start", class: "top-4" },
      { side: "left", align: "center", class: "top-1/2 -translate-y-1/2" },
      { side: "left", align: "end", class: "bottom-4" },

      // Right arrow positioning
      { side: "right", align: "start", class: "top-4" },
      { side: "right", align: "center", class: "top-1/2 -translate-y-1/2" },
      { side: "right", align: "end", class: "bottom-4" },
    ],
    defaultVariants: {
      side: "bottom",
      align: "center",
    },
  }
);

export type PopoverProps = {
  // Content
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  badge?: ReactNode;

  // Trigger and behavior
  trigger: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;

  // Positioning
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";

  // Interaction
  mode?: "hover" | "click";
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;

  // Styling
  className?: string;
  contentClassName?: string;

  // Accessibility
  "aria-label"?: string;
};

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      title,
      description,
      action,
      badge,
      trigger,
      open: controlledOpen,
      onOpenChange,
      defaultOpen = false,
      side = "bottom",
      align = "center",
      mode = "click",
      closeOnClickOutside = true,
      closeOnEscape = true,
      className,
      contentClassName,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<number | null>(null);

    const setOpen = (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    // Handle click outside
    useEffect(() => {
      if (!closeOnClickOutside || !isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          triggerRef.current &&
          !contentRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, closeOnClickOutside]);

    // Handle escape key
    useEffect(() => {
      if (!closeOnEscape || !isOpen) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, closeOnEscape]);

    // Handle hover events
    const handleMouseEnter = () => {
      if (mode === "hover") {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        setOpen(true);
      }
    };

    const handleMouseLeave = () => {
      if (mode === "hover") {
        hoverTimeoutRef.current = setTimeout(() => {
          setOpen(false);
        }, 150); // Small delay to prevent flickering
      }
    };

    const handleContentMouseEnter = () => {
      if (mode === "hover" && hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };

    const handleContentMouseLeave = () => {
      if (mode === "hover") {
        setOpen(false);
      }
    };

    // Handle click events
    const handleClick = () => {
      if (mode === "click") {
        setOpen(!isOpen);
      }
    };

    return (
      <div
        className={cn("relative inline-block", className)}
        ref={ref}
        {...props}
      >
        {/* Trigger */}
        <div
          ref={triggerRef}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer"
        >
          {trigger}
        </div>

        {/* Popover Content */}
        {isOpen && (
          <div
            ref={contentRef}
            className={cn(popoverStyles({ side, align }), contentClassName)}
            onMouseEnter={handleContentMouseEnter}
            onMouseLeave={handleContentMouseLeave}
            role="tooltip"
            aria-label={ariaLabel}
          >
            {/* Arrow */}
            <div className={arrowStyles({ side, align })} />

            {/* Header */}
            {(title || badge) && (
              <div className="flex items-start justify-between mb-3">
                {title && (
                  <h3 className="font-medium text-gray-900 text-base leading-tight">
                    {title}
                  </h3>
                )}
                {badge && <div className="ml-2 flex-shrink-0">{badge}</div>}
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="text-gray-600 text-sm leading-relaxed mb-4">
                {description}
              </div>
            )}

            {/* Action */}
            {action && (
              <div className="flex items-center justify-end gap-2">
                {action}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Popover.displayName = "Popover";
