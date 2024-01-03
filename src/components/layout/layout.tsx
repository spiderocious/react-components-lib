import React, { forwardRef, useEffect, useState } from "react";
import { cn } from "../../utils";
import {
  DEFAULT_BREAKPOINTS,
  type ColumnProps,
  type FlexProps,
  type GridProps,
  type HiddenProps,
  type ResponsiveOnlyProps,
  type ResponsiveSectionProps,
  type RowProps,
  type SpacerProps,
} from "./types";

import {
  convertBreakpointValue,
  convertSpaceValue,
  getAlignClass,
  getDirectionClass,
  getGridColsClass,
  getGridRowsClass,
  getJustifyClass,
  getSpacingClasses,
} from "./utils";

// Column Component
export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ children, className, align, justify, wrap = false, ...props }, ref) => {
    const spacingClasses = getSpacingClasses(props);
    const alignClass = getAlignClass(align);
    const justifyClass = getJustifyClass(justify);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          alignClass,
          justifyClass,
          wrap && "flex-wrap",
          spacingClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Column.displayName = "Column";

// Row Component
export const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ children, className, align, justify, wrap = false, ...props }, ref) => {
    const spacingClasses = getSpacingClasses(props);
    const alignClass = getAlignClass(align);
    const justifyClass = getJustifyClass(justify);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row",
          alignClass,
          justifyClass,
          wrap && "flex-wrap",
          spacingClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Row.displayName = "Row";

// Flex Component
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      children,
      className,
      direction = "row",
      align,
      justify,
      wrap = false,
      flex,
      ...props
    },
    ref
  ) => {
    const spacingClasses = getSpacingClasses(props);
    const directionClass = getDirectionClass(direction);
    const alignClass = getAlignClass(align);
    const justifyClass = getJustifyClass(justify);

    const flexStyle = flex
      ? { flex: typeof flex === "number" ? flex : flex }
      : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          directionClass,
          alignClass,
          justifyClass,
          wrap && "flex-wrap",
          spacingClasses,
          className
        )}
        style={flexStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";

// Grid Component
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      className,
      cols,
      rows,
      gap,
      rowGap,
      colGap,
      autoFlow,
      placeItems,
      placeContent,
      ...props
    },
    ref
  ) => {
    const spacingClasses = getSpacingClasses(props);
    const colsClass = getGridColsClass(cols);
    const rowsClass = getGridRowsClass(rows);

    const gridStyles: React.CSSProperties = {};

    if (gap) gridStyles.gap = convertSpaceValue(gap);
    if (rowGap) gridStyles.rowGap = convertSpaceValue(rowGap);
    if (colGap) gridStyles.columnGap = convertSpaceValue(colGap);
    if (autoFlow) gridStyles.gridAutoFlow = autoFlow;
    if (placeItems) {
      gridStyles.placeItems =
        placeItems === "start"
          ? "start"
          : placeItems === "center"
          ? "center"
          : placeItems === "end"
          ? "end"
          : "stretch";
    }
    if (placeContent) {
      gridStyles.placeContent = placeContent;
    }

    return (
      <div
        ref={ref}
        className={cn("grid", colsClass, rowsClass, spacingClasses, className)}
        style={gridStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

// Spacer Component
export const Spacer: React.FC<SpacerProps> = ({
  space,
  width,
  height,
  w,
  h,
  className,
}) => {
  const styles: React.CSSProperties = {};

  // Priority: explicit width/height > w/h > space
  if (width !== undefined) {
    styles.width = convertSpaceValue(width);
  } else if (w !== undefined) {
    styles.width = convertSpaceValue(w);
  } else if (space !== undefined) {
    styles.width = convertSpaceValue(space);
  }

  if (height !== undefined) {
    styles.height = convertSpaceValue(height);
  } else if (h !== undefined) {
    styles.height = convertSpaceValue(h);
  } else if (space !== undefined) {
    styles.height = convertSpaceValue(space);
  }

  return (
    <div
      className={cn("flex-shrink-0", className)}
      style={styles}
      aria-hidden="true"
    />
  );
};

// ResponsiveSection Component
export const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({
  children,
  mobile,
  tablet,
  desktop,
  breakpoints = DEFAULT_BREAKPOINTS,
  className,
  ...componentProps
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<
    "mobile" | "tablet" | "desktop"
  >("desktop");

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const tabletWidth = parseInt(
        convertBreakpointValue(breakpoints.tablet || DEFAULT_BREAKPOINTS.tablet)
      );
      const desktopWidth = parseInt(
        convertBreakpointValue(
          breakpoints.desktop || DEFAULT_BREAKPOINTS.desktop
        )
      );

      if (width >= desktopWidth) {
        setCurrentBreakpoint("desktop");
      } else if (width >= tabletWidth) {
        setCurrentBreakpoint("tablet");
      } else {
        setCurrentBreakpoint("mobile");
      }
    };

    // Initial check
    updateBreakpoint();

    // Listen for resize
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, [breakpoints]);

  // Determine which component to use based on priority
  let SelectedComponent: React.ComponentType<any>;

  if (currentBreakpoint === "mobile") {
    // Mobile: use mobile if available, then tablet, then desktop
    SelectedComponent = mobile || tablet || desktop || Flex;
  } else if (currentBreakpoint === "tablet") {
    // Tablet: use tablet if available, then desktop (they should share), then mobile as fallback
    SelectedComponent = tablet || desktop || mobile || Flex;
  } else {
    // Desktop: use desktop if available, then tablet (they should share), then mobile as fallback
    SelectedComponent = desktop || tablet || mobile || Flex;
  }

  return (
    <SelectedComponent className={className} {...componentProps}>
      {children}
    </SelectedComponent>
  );
};

export const Box: React.FC<{
  children?: React.ReactNode;
  className?: string;
  color?: "blue" | "green" | "purple" | "red" | "yellow" | "gray";
}> = ({ children, className = "", color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-100 border-blue-300 text-blue-800",
    green: "bg-green-100 border-green-300 text-green-800",
    purple: "bg-purple-100 border-purple-300 text-purple-800",
    red: "bg-red-100 border-red-300 text-red-800",
    yellow: "bg-yellow-100 border-yellow-300 text-yellow-800",
    gray: "bg-gray-100 border-gray-300 text-gray-800",
  };

  return (
    <div
      className={`p-4 border-2 rounded-lg ${colorClasses[color]} ${className}`}
    >
      {children || `Box ${color}`}
    </div>
  );
};

// Hidden Component
export const Hidden: React.FC<HiddenProps> = ({
  children,
  when = false,
  className,
}) => {
  if (when) {
    return null;
  }

  return <div className={className}>{children}</div>;
};

// MobileOnly Component
export const MobileOnly: React.FC<ResponsiveOnlyProps> = ({
  children,
  breakpoint = DEFAULT_BREAKPOINTS.tablet,
  className,
}) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const updateVisibility = () => {
      const width = window.innerWidth;
      const breakpointWidth = parseInt(convertBreakpointValue(breakpoint));
      setIsMobile(width < breakpointWidth);
    };

    updateVisibility();
    window.addEventListener("resize", updateVisibility);
    return () => window.removeEventListener("resize", updateVisibility);
  }, [breakpoint]);

  if (!isMobile) {
    return null;
  }

  return <div className={className}>{children}</div>;
};

// TabletOnly Component
export const TabletOnly: React.FC<
  ResponsiveOnlyProps & {
    minBreakpoint?: string | number;
    maxBreakpoint?: string | number;
  }
> = ({
  children,
  breakpoint, // This becomes minBreakpoint for backward compatibility
  minBreakpoint = breakpoint || DEFAULT_BREAKPOINTS.tablet,
  maxBreakpoint = DEFAULT_BREAKPOINTS.desktop,
  className,
}) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const width = window.innerWidth;
      const minWidth = parseInt(convertBreakpointValue(minBreakpoint));
      const maxWidth = parseInt(convertBreakpointValue(maxBreakpoint));
      setIsTablet(width >= minWidth && width < maxWidth);
    };

    updateVisibility();
    window.addEventListener("resize", updateVisibility);
    return () => window.removeEventListener("resize", updateVisibility);
  }, [minBreakpoint, maxBreakpoint]);

  if (!isTablet) {
    return null;
  }

  return <div className={className}>{children}</div>;
};

// DesktopOnly Component
export const DesktopOnly: React.FC<ResponsiveOnlyProps> = ({
  children,
  breakpoint = DEFAULT_BREAKPOINTS.desktop,
  className,
}) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const updateVisibility = () => {
      const width = window.innerWidth;
      const breakpointWidth = parseInt(convertBreakpointValue(breakpoint));
      setIsDesktop(width >= breakpointWidth);
    };

    updateVisibility();
    window.addEventListener("resize", updateVisibility);
    return () => window.removeEventListener("resize", updateVisibility);
  }, [breakpoint]);

  if (!isDesktop) {
    return null;
  }

  return <div className={className}>{children}</div>;
};
