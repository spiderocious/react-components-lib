import React, { useMemo, useState } from "react";
import { cn } from "../../../utils";
import { Table, useTable } from "./";
import type {
  EmptyStateConfig,
  ExportOptions,
  LoadingConfig,
  RowAction,
  TableInstance,
  TableOptions,
  ToolbarConfig,
} from "./types";

// Loading/Skeleton component
export const TableSkeleton: React.FC<LoadingConfig & { columns: number }> = ({
  rows = 5,
  columns,
  showHeader = true,
  showPagination = false,
  variant = "skeleton",
}) => {
  const SkeletonBar = ({ className }: { className?: string }) => (
    <div className={cn("animate-pulse bg-gray-200 rounded", className)} />
  );

  return (
    <div className="w-full">
      <div className="overflow-auto">
        <table className="w-full border-collapse bg-white">
          {showHeader && (
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {Array.from({ length: columns }).map((_, i) => (
                  <th key={i} className="px-4 py-3 text-left">
                    <SkeletonBar className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-3">
                    <SkeletonBar className="h-4 w-full max-w-[200px]" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <SkeletonBar className="h-8 w-24" />
            <SkeletonBar className="h-8 w-16" />
          </div>
          <div className="flex items-center gap-2">
            <SkeletonBar className="h-8 w-8" />
            <SkeletonBar className="h-8 w-8" />
            <SkeletonBar className="h-8 w-8" />
            <SkeletonBar className="h-8 w-8" />
          </div>
        </div>
      )}
    </div>
  );
};

// Empty state component
export const TableEmptyState: React.FC<EmptyStateConfig> = ({
  title = "No data available",
  description = "There are no items to display at the moment.",
  icon,
  action,
}) => {
  const DefaultIcon = () => (
    <svg
      className="w-12 h-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4">{icon || <DefaultIcon />}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-md">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

// Pagination component
export const TablePagination: React.FC<{
  instance: TableInstance<any>;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
}> = ({
  instance,
  showPageSizeSelector = true,
  pageSizeOptions = [10, 25, 50, 100],
}) => {
  const state = instance.getState();
  const { pagination } = state;

  const totalRows = pagination.total || 0;
  const startRow = pagination.pageIndex * pagination.pageSize + 1;
  const endRow = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    totalRows
  );

  const ChevronLeftIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">
          Showing {totalRows > 0 ? startRow : 0} to {endRow} of {totalRows}{" "}
          results
        </span>

        {showPageSizeSelector && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Show</label>
            <select
              value={pagination.pageSize}
              onChange={(e) => instance.setPageSize(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <label className="text-sm text-gray-700">entries</label>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => instance.setPageIndex(0)}
          disabled={!instance.getCanPreviousPage()}
          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          title="First page"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => instance.previousPage()}
          disabled={!instance.getCanPreviousPage()}
          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Previous page"
        >
          <ChevronLeftIcon />
        </button>

        <div className="flex items-center gap-1">
          {Array.from(
            { length: Math.min(instance.getPageCount(), 7) },
            (_, i) => {
              const pageCount = instance.getPageCount();
              const currentPage = pagination.pageIndex;

              let pageNumber: number;
              if (pageCount <= 7) {
                pageNumber = i;
              } else if (currentPage <= 3) {
                pageNumber = i;
              } else if (currentPage >= pageCount - 4) {
                pageNumber = pageCount - 7 + i;
              } else {
                pageNumber = currentPage - 3 + i;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => instance.setPageIndex(pageNumber)}
                  className={cn(
                    "px-3 py-1 text-sm border rounded",
                    pageNumber === currentPage
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-700 border-gray-300 hover:bg-gray-50"
                  )}
                >
                  {pageNumber + 1}
                </button>
              );
            }
          )}
        </div>

        <button
          onClick={() => instance.nextPage()}
          disabled={!instance.getCanNextPage()}
          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Next page"
        >
          <ChevronRightIcon />
        </button>

        <button
          onClick={() => instance.setPageIndex(instance.getPageCount() - 1)}
          disabled={!instance.getCanNextPage()}
          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Last page"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Table toolbar component
export const TableToolbar: React.FC<{
  instance: TableInstance<any>;
  config?: ToolbarConfig<any>;
  title?: string;
}> = ({ instance, config = {}, title }) => {
  const [globalFilter, setGlobalFilter] = useState(
    instance.getState().globalFilter
  );
  const [showColumnToggle, setShowColumnToggle] = useState(false);

  const state = instance.getState();
  const selectedRows = instance
    .getRowModel()
    .rows.filter((row) => row.getIsSelected());
  const hasSelection = selectedRows.length > 0;

  const SearchIcon = () => (
    <svg
      className="w-4 h-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const FilterIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );

  const DownloadIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilter(value);
    instance.setGlobalFilter(value);
  };

  const exportData = (format: "csv" | "json") => {
    const rows = instance.getFilteredRowModel().rows;
    const columns = instance.getVisibleColumns();

    if (format === "csv") {
      const headers = columns.map((col) => col.columnDef.header).join(",");
      const csvContent = [
        headers,
        ...rows.map((row) =>
          columns
            .map((col) => {
              const value = row.getValue(col.id);
              return `"${value?.toString().replace(/"/g, '""') || ""}"`;
            })
            .join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "table-data.csv";
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === "json") {
      const jsonData = rows.map((row) => row.original);
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "table-data.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}

            {config.showGlobalFilter !== false && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={globalFilter}
                  onChange={(e) => handleGlobalFilterChange(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {config.customActions}

            {config.showColumnToggle !== false && (
              <div className="relative">
                <button
                  onClick={() => setShowColumnToggle(!showColumnToggle)}
                  className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <FilterIcon />
                  Columns
                </button>

                {showColumnToggle && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="p-2">
                      {instance.getAllColumns().map((column) => (
                        <label
                          key={column.id}
                          className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={column.getIsVisible()}
                            onChange={column.toggleVisibility}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">
                            {column.columnDef.header}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {config.showExport !== false && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => exportData("csv")}
                  className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  title="Export as CSV"
                >
                  <DownloadIcon />
                  CSV
                </button>
                <button
                  onClick={() => exportData("json")}
                  className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  title="Export as JSON"
                >
                  <DownloadIcon />
                  JSON
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bulk actions */}
        {hasSelection &&
          config.bulkActions &&
          config.bulkActions.length > 0 && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">
                  {selectedRows.length} row(s) selected
                </span>
                <div className="flex items-center gap-2">
                  {config.bulkActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() =>
                        action.onClick(selectedRows.map((row) => row.original))
                      }
                      disabled={action.disabled}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1 text-sm rounded-md transition-colors",
                        action.variant === "danger"
                          ? "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300"
                          : action.variant === "warning"
                          ? "bg-yellow-600 text-white hover:bg-yellow-700 disabled:bg-yellow-300"
                          : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
                        action.disabled && "cursor-not-allowed"
                      )}
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

// All-in-one DataTable component
export interface DataTableProps<TData extends Record<string, any>>
  extends TableOptions<TData> {
  title?: string;
  loading?: boolean;
  loadingConfig?: LoadingConfig;
  emptyConfig?: EmptyStateConfig;
  toolbarConfig?: ToolbarConfig<TData>;
  showPagination?: boolean;
  showToolbar?: boolean;
  rowActions?: RowAction<TData>[];
  onExport?: (options: ExportOptions) => void;
}

export const DataTable = <TData extends Record<string, any>>({
  data,
  columns,
  title,
  loading = false,
  loadingConfig = {},
  emptyConfig = {},
  toolbarConfig = {},
  showPagination = true,
  showToolbar = true,
  rowActions = [],
  enablePagination = true,
  enableSelection = false,
  enableSorting = true,
  enableFiltering = false,
  enableGlobalFilter = true,
  ...tableOptions
}: DataTableProps<TData>) => {
  // Add row actions column if provided
  const enhancedColumns = useMemo(() => {
    if (rowActions.length === 0) return columns;

    const actionsColumn = {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: TData }) => (
        <div className="flex items-center gap-1">
          {rowActions.map((action) => (
            <button
              key={action.id}
              onClick={() => action.onClick(row)}
              disabled={action.disabled?.(row)}
              className={cn(
                "p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
                action.variant === "danger" &&
                  "hover:bg-red-50 hover:text-red-600",
                action.variant === "warning" &&
                  "hover:bg-yellow-50 hover:text-yellow-600"
              )}
              title={action.label as string}
            >
              {action.icon}
            </button>
          ))}
        </div>
      ),
      sticky: "right" as const,
      width: rowActions.length * 40 + 20,
    };

    return [...columns, actionsColumn];
  }, [columns, rowActions]);

  // Add selection column if enabled
  const finalColumns = useMemo(() => {
    if (!enableSelection) return enhancedColumns;

    const selectionColumn = {
      id: "select",
      header: ({ instance }: { instance: TableInstance<TData> }) => (
        <input
          type="checkbox"
          checked={instance.getState().selection.isAllSelected}
          ref={(el) => {
            if (el)
              el.indeterminate = instance.getState().selection.isIndeterminate;
          }}
          onChange={instance.toggleAllRowsSelection}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
      cell: ({ row }: { row: any }) => {
        // Check if row is a Row instance (has getIsSelected method) or raw data
        if (
          typeof row === "object" &&
          "getIsSelected" in row &&
          "toggleSelected" in row
        ) {
          // Row instance - use the methods directly
          return (
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={row.toggleSelected}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          );
        } else {
          // Raw data - we need to access the table instance
          // For now, this is a fallback, but ideally we should always receive Row instance
          return (
            <input
              type="checkbox"
              checked={false}
              onChange={() => {}}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              disabled
            />
          );
        }
      },
      sticky: "left" as const,
      width: 50,
    };

    return [selectionColumn, ...enhancedColumns];
  }, [enhancedColumns, enableSelection]);

  const instance = useTable({
    data,
    columns: finalColumns as any,
    enablePagination,
    enableSelection,
    enableSorting,
    enableFiltering,
    enableGlobalFilter,
    ...tableOptions,
  });

  const { rows } = instance.getRowModel();
  const isEmpty = !loading && rows.length === 0;

  if (loading) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {showToolbar && (
          <div className="border-b border-gray-200 bg-white px-4 py-3">
            <div className="animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
          </div>
        )}
        <TableSkeleton columns={finalColumns.length} {...loadingConfig} />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {showToolbar && (
          <TableToolbar
            instance={instance}
            config={toolbarConfig}
            title={title}
          />
        )}
        <TableEmptyState {...emptyConfig} />
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {showToolbar && (
        <TableToolbar
          instance={instance}
          config={toolbarConfig}
          title={title}
        />
      )}

      <Table
        instance={instance}
        data={data}
        columns={finalColumns as any}
        {...tableOptions}
      />

      {showPagination && enablePagination && (
        <TablePagination instance={instance} />
      )}
    </div>
  );
};

// Simple table for basic use cases
export const SimpleTable = <TData extends Record<string, any>>({
  data,
  columns,
  className,
  ...props
}: {
  data: TData[];
  columns: any[];
  className?: string;
} & Partial<TableOptions<TData>>) => {
  return (
    <div
      className={cn(
        "border border-gray-200 rounded-lg overflow-hidden",
        className
      )}
    >
      <Table
        data={data}
        columns={columns}
        enableSorting={false}
        enableFiltering={false}
        enableSelection={false}
        enablePagination={false}
        {...props}
      />
    </div>
  );
};
