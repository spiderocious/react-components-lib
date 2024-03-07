import type { ComponentType, HTMLAttributes, ReactNode } from "react";

export const DEFAULT_BREAKPOINTS = {
  mobile: "0px",
  tablet: "768px",
  desktop: "1024px",
} as const;

export type BreakpointKey = keyof typeof DEFAULT_BREAKPOINTS;
export type BreakpointValue = string | number;
export type Breakpoints = Partial<Record<BreakpointKey, BreakpointValue>>;

// Spacing utilities
export type SpaceValue = string | number;

export interface SpacingProps {
  space?: SpaceValue;
  width?: SpaceValue;
  height?: SpaceValue;
  w?: SpaceValue;
  h?: SpaceValue;
}

// Base layout props
export interface BaseLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  gap?: SpaceValue;
  padding?: SpaceValue;
  margin?: SpaceValue;
  p?: SpaceValue;
  m?: SpaceValue;
  px?: SpaceValue;
  py?: SpaceValue;
  pt?: SpaceValue;
  pb?: SpaceValue;
  pl?: SpaceValue;
  pr?: SpaceValue;
  mx?: SpaceValue;
  my?: SpaceValue;
  mt?: SpaceValue;
  mb?: SpaceValue;
  ml?: SpaceValue;
  mr?: SpaceValue;
}

// Column props
export interface ColumnProps extends BaseLayoutProps {
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
}

// Row props
export interface RowProps extends BaseLayoutProps {
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
}

// Flex props
export interface FlexProps extends BaseLayoutProps {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  flex?: string | number;
}

// Grid props
export interface GridProps extends BaseLayoutProps {
  cols?: number | string;
  rows?: number | string;
  gap?: SpaceValue;
  rowGap?: SpaceValue;
  colGap?: SpaceValue;
  autoFlow?: "row" | "column" | "dense" | "row dense" | "column dense";
  placeItems?: "start" | "center" | "end" | "stretch";
  placeContent?:
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "between"
    | "around"
    | "evenly";
}

// Spacer props
export interface SpacerProps extends SpacingProps {
  className?: string;
}

// Responsive section props
export interface ResponsiveSectionProps {
  children: ReactNode;
  mobile?: ComponentType<any>;
  tablet?: ComponentType<any>;
  desktop?: ComponentType<any>;
  breakpoints?: Breakpoints;
  className?: string;
  // Props to pass to the selected component
  [key: string]: any;
}

// Visibility props
export interface HiddenProps {
  children: ReactNode;
  when?: boolean;
  className?: string;
}

export interface ResponsiveOnlyProps {
  children: ReactNode;
  breakpoint?: BreakpointValue;
  className?: string;
}
