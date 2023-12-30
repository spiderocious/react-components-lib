import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "../../../utils";

const skeletonStyles = cva(["bg-gray-200", "relative", "overflow-hidden"], {
  variants: {
    animation: {
      pulse: "animate-pulse",
      wave: "animate-shimmer",
      none: "",
    },
    shape: {
      rectangle: "",
      circle: "rounded-full",
      rounded: "rounded-md",
      pill: "rounded-full",
    },
    variant: {
      default: "bg-gray-200",
      light: "bg-gray-100",
      lighter: "bg-gray-50",
    },
  },
  defaultVariants: {
    animation: "pulse",
    shape: "rounded",
    variant: "default",
  },
});

export type SkeletonProps = ComponentProps<"div"> &
  VariantProps<typeof skeletonStyles> & {
    width?: string | number;
    height?: string | number;
    count?: number;
    spacing?: string;
  };

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      animation = "pulse",
      shape = "rounded",
      variant = "default",
      width,
      height,
      count = 1,
      spacing = "0.5rem",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const skeletonStyle = {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      ...style,
    };

    if (count === 1) {
      return (
        <div
          ref={ref}
          className={cn(
            skeletonStyles({ animation, shape, variant }),
            className
          )}
          style={skeletonStyle}
          {...props}
        />
      );
    }

    return (
      <div ref={ref} className="space-y-2" style={{ gap: spacing }}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn(
              skeletonStyles({ animation, shape, variant }),
              className
            )}
            style={skeletonStyle}
            {...props}
          />
        ))}
      </div>
    );
  }
);

// Predefined skeleton patterns
export const SkeletonText = forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "shape">
>(({ height = "1rem", ...props }, ref) => (
  <Skeleton ref={ref} height={height} shape="rounded" {...props} />
));

export const SkeletonCircle = forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "shape">
>(({ width = "3rem", height, ...props }, ref) => (
  <Skeleton
    ref={ref}
    width={width}
    height={height || width}
    shape="circle"
    {...props}
  />
));

export const SkeletonAvatar = forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "shape" | "width" | "height">
>(({ ...props }, ref) => (
  <Skeleton
    ref={ref}
    width="2.5rem"
    height="2.5rem"
    shape="circle"
    {...props}
  />
));

export const SkeletonButton = forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "shape">
>(({ width = "6rem", height = "2.5rem", ...props }, ref) => (
  <Skeleton
    ref={ref}
    width={width}
    height={height}
    shape="rounded"
    {...props}
  />
));

export const SkeletonCard = forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, "count">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 border rounded-lg", className)}>
    <div className="space-y-3">
      <SkeletonCircle width="3rem" />
      <div className="space-y-2">
        <SkeletonText height="1.25rem" width="60%" />
        <SkeletonText height="1rem" width="80%" />
        <SkeletonText height="1rem" width="40%" />
      </div>
    </div>
  </div>
));

Skeleton.displayName = "Skeleton";
SkeletonText.displayName = "SkeletonText";
SkeletonCircle.displayName = "SkeletonCircle";
SkeletonAvatar.displayName = "SkeletonAvatar";
SkeletonButton.displayName = "SkeletonButton";
SkeletonCard.displayName = "SkeletonCard";
