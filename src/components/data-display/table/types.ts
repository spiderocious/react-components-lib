import { type ReactNode } from "react";

export type SortDirection = "asc" | "desc" | null;
export type FilterValue = string | number | boolean | Date | null | any;
export type CellValue =
  | string
  | number
  | boolean
  | Date
  | ReactNode
  | null
  | any;

export interface SortState {
  columnId: string;
  direction: SortDirection;
}

export interface FilterState {
  columnId: string;
  value: FilterValue;
  operator?:
    | "contains"
    | "equals"
    | "startsWith"
    | "endsWith"
    | "gt"
    | "lt"
    | "gte"
    | "lte";
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
  total?: number;
}

export interface SelectionState {
  selectedRowIds: Set<string>;
  isAllSelected: boolean;
  isIndeterminate: boolean;
}

export interface ColumnDef<TData = any> {
  id: string;
  header: ReactNode;
  accessorKey?: keyof TData;
  accessorFn?: (row: TData) => CellValue;
  cell?: (props: {
    value: CellValue;
    row: TData | Row<TData>;
    column: ColumnDef<TData>;
  }) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  sortingFn?: (rowA: TData, rowB: TData, columnId: string) => number;
  filterFn?: (
    row: TData,
    columnId: string,
    filterValue: FilterValue
  ) => boolean;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  sticky?: "left" | "right" | false;
  align?: "left" | "center" | "right";
  hidden?: boolean;
  meta?: {
    headerClassName?: string;
    cellClassName?: string;
    [key: string]: any;
  };
}

export interface TableState {
  sorting: SortState[];
  filters: FilterState[];
  pagination: PaginationState;
  selection: SelectionState;
  globalFilter: string;
  columnVisibility: Record<string, boolean>;
  columnOrder: string[];
  columnSizing: Record<string, number>;
  expanded: Set<string>;
}

export interface TableOptions<TData = any> {
  data: TData[];
  columns: ColumnDef<TData>[] | any[];

  // Features
  enableSorting?: boolean;
  enableMultiSort?: boolean;
  enableFiltering?: boolean;
  enableGlobalFilter?: boolean;
  enableSelection?: boolean;
  enableMultiSelection?: boolean;
  enableExpanding?: boolean;
  enablePagination?: boolean;

  // Pagination
  pageSize?: number;
  pageIndex?: number;
  pageCount?: number;
  manualPagination?: boolean;

  // Sorting
  manualSorting?: boolean;
  sortDescFirst?: boolean;

  // Filtering
  manualFiltering?: boolean;
  globalFilterFn?: (
    row: TData,
    columnId: string,
    filterValue: string
  ) => boolean;

  // Row identification
  getRowId?: (row: TData, index: number) => string;

  // Sub-components
  getSubRows?: (row: TData) => TData[] | undefined;

  // Event handlers
  onSortingChange?: (sorting: SortState[]) => void;
  onFiltersChange?: (filters: FilterState[]) => void;
  onPaginationChange?: (pagination: PaginationState) => void;
  onSelectionChange?: (selection: SelectionState) => void;
  onGlobalFilterChange?: (globalFilter: string) => void;
  onRowClick?: (row: TData, event: React.MouseEvent) => void;
  onRowDoubleClick?: (row: TData, event: React.MouseEvent) => void;

  // State
  initialState?: Partial<TableState>;
  state?: Partial<TableState>;

  // Loading & Empty states
  loading?: boolean;
  empty?: boolean;

  // Styling
  className?: string;
  size?: "sm" | "md" | "lg";
}

export interface TableInstance<TData = any> {
  // Data
  getRowModel: () => { rows: Row<TData>[] };
  getFilteredRowModel: () => { rows: Row<TData>[] };
  getSortedRowModel: () => { rows: Row<TData>[] };
  getPaginationRowModel: () => { rows: Row<TData>[] };

  // State
  getState: () => TableState;
  setState: (
    updater: Partial<TableState> | ((old: TableState) => Partial<TableState>)
  ) => void;

  // Features
  toggleSorting: (columnId: string, desc?: boolean) => void;
  setColumnFilters: (filters: FilterState[]) => void;
  setGlobalFilter: (filter: string) => void;
  toggleRowSelection: (rowId: string) => void;
  toggleAllRowsSelection: () => void;

  // Pagination
  nextPage: () => void;
  previousPage: () => void;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  getPageCount: () => number;

  // Columns
  getAllColumns: () => Column<TData>[];
  getVisibleColumns: () => Column<TData>[];
  getLeftVisibleColumns: () => Column<TData>[];
  getCenterVisibleColumns: () => Column<TData>[];
  getRightVisibleColumns: () => Column<TData>[];
}

export interface Row<TData = any> {
  id: string;
  index: number;
  original: TData;
  getValue: (columnId: string) => CellValue;
  getVisibleCells: () => Cell<TData>[];
  getIsSelected: () => boolean;
  getIsExpanded: () => boolean;
  getCanExpand: () => boolean;
  toggleSelected: () => void;
  toggleExpanded: () => void;
  subRows?: Row<TData>[];
}

export interface Cell<TData = any> {
  id: string;
  column: Column<TData>;
  row: Row<TData>;
  getValue: () => CellValue;
  renderValue: () => ReactNode;
}

export interface Column<TData = any> {
  id: string;
  columnDef: ColumnDef<TData>;
  getCanSort: () => boolean;
  getCanFilter: () => boolean;
  getIsSorted: () => SortDirection;
  toggleSorting: (desc?: boolean) => void;
  clearSorting: () => void;
  getSize: () => number;
  getIsVisible: () => boolean;
  toggleVisibility: () => void;
}

export interface TableMeta {
  updateData?: (rowIndex: number, columnId: string, value: any) => void;
  [key: string]: any;
}

// Utility types for better DX
export type RowSelectionState = Record<string, boolean>;
export type ColumnSizingState = Record<string, number>;
export type ColumnVisibilityState = Record<string, boolean>;
export type ExpandedState = Record<string, boolean>;

// Export types
export interface ExportOptions {
  filename?: string;
  includeHeaders?: boolean;
  selectedRowsOnly?: boolean;
  visibleColumnsOnly?: boolean;
  format: "csv" | "excel" | "json";
}

// Bulk action types
export interface BulkAction<TData = any> {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  variant?: "default" | "danger" | "warning";
  disabled?: boolean;
  onClick: (selectedRows: TData[]) => void | Promise<void>;
}

// Row action types
export interface RowAction<TData = any> {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  variant?: "default" | "danger" | "warning";
  disabled?: (row: TData) => boolean;
  onClick: (row: TData) => void | Promise<void>;
}

// Toolbar configuration
export interface ToolbarConfig<TData = any> {
  showGlobalFilter?: boolean;
  showColumnToggle?: boolean;
  showExport?: boolean;
  showBulkActions?: boolean;
  customActions?: ReactNode;
  bulkActions?: BulkAction<TData>[];
}

// Loading configuration
export interface LoadingConfig {
  rows?: number;
  showHeader?: boolean;
  showPagination?: boolean;
  variant?: "skeleton" | "spinner" | "shimmer";
}

// Empty state configuration
export interface EmptyStateConfig {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}

// Responsive configuration
export interface ResponsiveConfig {
  breakpoint?: "sm" | "md" | "lg" | "xl";
  stackOnMobile?: boolean;
  hideColumnsOnMobile?: string[];
  mobileCardView?: boolean;
}
