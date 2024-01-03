import {
  DEFAULT_BREAKPOINTS,
  type BaseLayoutProps,
  type BreakpointKey,
  type Breakpoints,
  type BreakpointValue,
  type SpaceValue,
} from "./types";

export const convertSpaceValue = (value: SpaceValue): string => {
  if (typeof value === "number") {
    return `${value}px`;
  }
  return value;
};

export const convertBreakpointValue = (value: BreakpointValue): string => {
  if (typeof value === "number") {
    return `${value}px`;
  }
  return value;
};

export const getSpacingClasses = (props: BaseLayoutProps): string => {
  const classes: string[] = [];

  // Padding
  if (props.padding || props.p) {
    const value = convertSpaceValue(props.padding || props.p!);
    classes.push(`[padding:${value}]`);
  }
  if (props.px) {
    const value = convertSpaceValue(props.px);
    classes.push(`[padding-left:${value}]`, `[padding-right:${value}]`);
  }
  if (props.py) {
    const value = convertSpaceValue(props.py);
    classes.push(`[padding-top:${value}]`, `[padding-bottom:${value}]`);
  }
  if (props.pt) {
    const value = convertSpaceValue(props.pt);
    classes.push(`[padding-top:${value}]`);
  }
  if (props.pb) {
    const value = convertSpaceValue(props.pb);
    classes.push(`[padding-bottom:${value}]`);
  }
  if (props.pl) {
    const value = convertSpaceValue(props.pl);
    classes.push(`[padding-left:${value}]`);
  }
  if (props.pr) {
    const value = convertSpaceValue(props.pr);
    classes.push(`[padding-right:${value}]`);
  }

  // Margin
  if (props.margin || props.m) {
    const value = convertSpaceValue(props.margin || props.m!);
    classes.push(`[margin:${value}]`);
  }
  if (props.mx) {
    const value = convertSpaceValue(props.mx);
    classes.push(`[margin-left:${value}]`, `[margin-right:${value}]`);
  }
  if (props.my) {
    const value = convertSpaceValue(props.my);
    classes.push(`[margin-top:${value}]`, `[margin-bottom:${value}]`);
  }
  if (props.mt) {
    const value = convertSpaceValue(props.mt);
    classes.push(`[margin-top:${value}]`);
  }
  if (props.mb) {
    const value = convertSpaceValue(props.mb);
    classes.push(`[margin-bottom:${value}]`);
  }
  if (props.ml) {
    const value = convertSpaceValue(props.ml);
    classes.push(`[margin-left:${value}]`);
  }
  if (props.mr) {
    const value = convertSpaceValue(props.mr);
    classes.push(`[margin-right:${value}]`);
  }

  // Gap
  if (props.gap) {
    const value = convertSpaceValue(props.gap);
    classes.push(`[gap:${value}]`);
  }

  return classes.join(" ");
};

export const getAlignClass = (align?: string): string => {
  switch (align) {
    case "start":
      return "items-start";
    case "center":
      return "items-center";
    case "end":
      return "items-end";
    case "stretch":
      return "items-stretch";
    case "baseline":
      return "items-baseline";
    default:
      return "";
  }
};

export const getJustifyClass = (justify?: string): string => {
  switch (justify) {
    case "start":
      return "justify-start";
    case "center":
      return "justify-center";
    case "end":
      return "justify-end";
    case "between":
      return "justify-between";
    case "around":
      return "justify-around";
    case "evenly":
      return "justify-evenly";
    default:
      return "";
  }
};

export const getDirectionClass = (direction?: string): string => {
  switch (direction) {
    case "row":
      return "flex-row";
    case "column":
      return "flex-col";
    case "row-reverse":
      return "flex-row-reverse";
    case "column-reverse":
      return "flex-col-reverse";
    default:
      return "flex-row";
  }
};

export const getGridColsClass = (cols?: number | string): string => {
  if (!cols) return "";

  if (typeof cols === "number") {
    // Handle common grid column counts
    const gridColsMap: Record<number, string> = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12",
    };
    return gridColsMap[cols] || `[grid-template-columns:repeat(${cols},1fr)]`;
  }

  return `[grid-template-columns:${cols}]`;
};

export const getGridRowsClass = (rows?: number | string): string => {
  if (!rows) return "";

  if (typeof rows === "number") {
    // Handle common grid row counts
    const gridRowsMap: Record<number, string> = {
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      5: "grid-rows-5",
      6: "grid-rows-6",
    };
    return gridRowsMap[rows] || `[grid-template-rows:repeat(${rows},1fr)]`;
  }

  return `[grid-template-rows:${rows}]`;
};

// Hook for detecting current breakpoint
export const useBreakpoint = (
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS
): BreakpointKey => {
  if (typeof window === "undefined") {
    return "desktop"; // Default for SSR
  }

  const width = window.innerWidth;
  const tabletWidth = parseInt(
    convertBreakpointValue(breakpoints.tablet || DEFAULT_BREAKPOINTS.tablet)
  );
  const desktopWidth = parseInt(
    convertBreakpointValue(breakpoints.desktop || DEFAULT_BREAKPOINTS.desktop)
  );

  if (width >= desktopWidth) return "desktop";
  if (width >= tabletWidth) return "tablet";
  return "mobile";
};
