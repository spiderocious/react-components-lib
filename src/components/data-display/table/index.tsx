import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
} from "react";
import { cn } from "../../../utils";
import type {
  Cell,
  CellValue,
  Column,
  ColumnDef,
  FilterState,
  Row,
  SortDirection,
  SortState,
  TableInstance,
  TableOptions,
  TableState,
} from "./types";

const tableStyles = cva(["w-full", "border-collapse", "bg-white", "text-sm"], {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    variant: {
      default: "",
      bordered: "border border-gray-200",
      striped: "",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

const headerStyles = cva(
  [
    "bg-gray-50",
    "border-b",
    "border-gray-200",
    "px-4",
    "py-3",
    "text-left",
    "font-medium",
    "text-gray-900",
    "tracking-wider",
    "uppercase",
    "select-none",
  ],
  {
    variants: {
      sortable: {
        true: "cursor-pointer hover:bg-gray-100 transition-colors",
        false: "",
      },
      sticky: {
        left: "sticky left-0 z-10 bg-gray-50",
        right: "sticky right-0 z-10 bg-gray-50",
        false: "",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      sortable: false,
      sticky: false,
      align: "left",
    },
  }
);

const cellStyles = cva(
  ["px-4", "py-3", "border-b", "border-gray-200", "text-gray-900"],
  {
    variants: {
      sticky: {
        left: "sticky left-0 z-10 bg-white",
        right: "sticky right-0 z-10 bg-white",
        false: "",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      selected: {
        true: "bg-blue-50",
        false: "",
      },
    },
    defaultVariants: {
      sticky: false,
      align: "left",
      selected: false,
    },
  }
);

const rowStyles = cva(["transition-colors", "duration-150"], {
  variants: {
    clickable: {
      true: "cursor-pointer hover:bg-gray-50",
      false: "",
    },
    selected: {
      true: "bg-blue-50",
      false: "",
    },
    striped: {
      true: "even:bg-gray-50",
      false: "",
    },
  },
  defaultVariants: {
    clickable: false,
    selected: false,
    striped: false,
  },
});

// Create a table instance hook
// eslint-disable-next-line react-refresh/only-export-components
export function useTable<TData extends Record<string, any>>(
  options: TableOptions<TData>
): TableInstance<TData> {
  const {
    data,
    columns,
    enableSorting = true,
    enableMultiSort = false,
    enableFiltering = false,
    enableMultiSelection = true,
    enablePagination = false,
    pageSize = 10,
    pageIndex = 0,
    manualPagination = false,
    manualSorting = false,
    manualFiltering = false,
    getRowId = (row, index) => row.id?.toString() || index.toString(),
    initialState = {},
  } = options;

  // Initialize state
  const [state, setState] = useState<TableState>(() => ({
    sorting: [],
    filters: [],
    pagination: {
      pageIndex: initialState.pagination?.pageIndex || pageIndex,
      pageSize: initialState.pagination?.pageSize || pageSize,
      total: data.length,
    },
    selection: {
      selectedRowIds: new Set(),
      isAllSelected: false,
      isIndeterminate: false,
    },
    globalFilter: "",
    columnVisibility: {},
    columnOrder: columns.map((col) => col.id),
    columnSizing: {},
    expanded: new Set(),
    ...initialState,
  }));

  // Sorting functions
  const toggleSorting = useCallback(
    (columnId: string, desc?: boolean) => {
      setState((prev) => {
        const existingSort = prev.sorting.find((s) => s.columnId === columnId);
        let newSorting: SortState[];

        if (existingSort) {
          if (existingSort.direction === "asc") {
            newSorting = prev.sorting.map((s) =>
              s.columnId === columnId
                ? { ...s, direction: "desc" as SortDirection }
                : s
            );
          } else {
            newSorting = prev.sorting.filter((s) => s.columnId !== columnId);
          }
        } else {
          const newSort: SortState = {
            columnId,
            direction: desc !== undefined ? (desc ? "desc" : "asc") : "asc",
          };

          if (enableMultiSort) {
            newSorting = [...prev.sorting, newSort];
          } else {
            newSorting = [newSort];
          }
        }

        return { ...prev, sorting: newSorting };
      });
    },
    [enableMultiSort]
  );

  // Selection functions
  const toggleRowSelection = useCallback(
    (rowId: string) => {
      setState((prev) => {
        const newSelectedIds = new Set(prev.selection.selectedRowIds);

        if (newSelectedIds.has(rowId)) {
          newSelectedIds.delete(rowId);
        } else {
          if (!enableMultiSelection) {
            newSelectedIds.clear();
          }
          newSelectedIds.add(rowId);
        }

        const totalRows = data.length;
        const selectedCount = newSelectedIds.size;

        return {
          ...prev,
          selection: {
            selectedRowIds: newSelectedIds,
            isAllSelected: selectedCount === totalRows && totalRows > 0,
            isIndeterminate: selectedCount > 0 && selectedCount < totalRows,
          },
        };
      });
    },
    [enableMultiSelection, data.length]
  );

  // Create column instances
  const createColumn = useCallback(
    (columnDef: ColumnDef<TData>): Column<TData> => ({
      id: columnDef.id,
      columnDef,
      getCanSort: () => enableSorting && columnDef.sortable !== false,
      getCanFilter: () => enableFiltering && columnDef.filterable !== false,
      getIsSorted: () => {
        const sortState = state.sorting.find(
          (s) => s.columnId === columnDef.id
        );
        return sortState?.direction || null;
      },
      toggleSorting: (desc?: boolean) => toggleSorting(columnDef.id, desc),
      clearSorting: () => {
        setState((prev) => ({
          ...prev,
          sorting: prev.sorting.filter((s) => s.columnId !== columnDef.id),
        }));
      },
      getSize: () =>
        state.columnSizing[columnDef.id] || (columnDef.width as number) || 150,
      getIsVisible: () => state.columnVisibility[columnDef.id] !== false,
      toggleVisibility: () => {
        setState((prev) => ({
          ...prev,
          columnVisibility: {
            ...prev.columnVisibility,
            [columnDef.id]: !prev.columnVisibility[columnDef.id],
          },
        }));
      },
    }),
    [
      state.sorting,
      state.columnSizing,
      state.columnVisibility,
      enableSorting,
      enableFiltering,
      toggleSorting,
    ]
  );

  // Create rows with proper typing
  const rows: Row<TData>[] = useMemo(() => {
    const createRowsInternal = (): Row<TData>[] => {
      return data.map((original, index) => {
        const id = getRowId(original, index);
        const row: Row<TData> = {
          id,
          index,
          original,
          getValue: (columnId: string) => {
            const column = columns.find((col) => col.id === columnId);
            if (!column) return null;

            if (column.accessorFn) {
              return column.accessorFn(original);
            } else if (column.accessorKey) {
              return original[column.accessorKey] as CellValue;
            }
            return null;
          },
          getVisibleCells: (): Cell<TData>[] => {
            return columns
              .filter((col) => state.columnVisibility[col.id] !== false)
              .map(
                (column): Cell<TData> => ({
                  id: `${id}_${column.id}`,
                  column: createColumn(column),
                  row,
                  getValue: () => {
                    if (column.accessorFn) {
                      return column.accessorFn(original);
                    } else if (column.accessorKey) {
                      return original[column.accessorKey] as CellValue;
                    }
                    return null;
                  },
                  renderValue: () => {
                    const value = column.accessorFn
                      ? column.accessorFn(original)
                      : (original[column.accessorKey!] as CellValue);

                    if (column.cell) {
                      return column.cell({
                        value,
                        row: row,
                        column,
                      });
                    }

                    return value?.toString() || "";
                  },
                })
              );
          },
          getIsSelected: () => state.selection.selectedRowIds.has(id),
          getIsExpanded: () => state.expanded.has(id),
          getCanExpand: () => false, // TODO: Implement subrows
          toggleSelected: () => toggleRowSelection(id),
          toggleExpanded: () => {
            const newExpanded = new Set(state.expanded);
            if (newExpanded.has(id)) {
              newExpanded.delete(id);
            } else {
              newExpanded.add(id);
            }
            setState((prev) => ({ ...prev, expanded: newExpanded }));
          },
        };
        return row;
      });
    };
    return createRowsInternal();
  }, [
    data,
    columns,
    state.columnVisibility,
    state.selection.selectedRowIds,
    state.expanded,
    getRowId,
    createColumn,
    toggleRowSelection,
  ]);

  const toggleAllRowsSelection = useCallback(() => {
    setState((prev) => {
      const allRowIds = rows.map((row) => row.id);
      const isCurrentlyAllSelected = prev.selection.isAllSelected;

      return {
        ...prev,
        selection: {
          selectedRowIds: isCurrentlyAllSelected
            ? new Set()
            : new Set(allRowIds),
          isAllSelected: !isCurrentlyAllSelected,
          isIndeterminate: false,
        },
      };
    });
  }, [rows]);

  // Pagination functions
  const nextPage = useCallback(() => {
    const pageCount = Math.ceil(
      (state.pagination.total || rows.length) / state.pagination.pageSize
    );
    setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageIndex: Math.min(prev.pagination.pageIndex + 1, pageCount - 1),
      },
    }));
  }, [state.pagination.total, state.pagination.pageSize, rows.length]);

  const previousPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageIndex: Math.max(prev.pagination.pageIndex - 1, 0),
      },
    }));
  }, []);

  const setPageIndex = useCallback((pageIndex: number) => {
    setState((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, pageIndex },
    }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setState((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, pageSize, pageIndex: 0 },
    }));
  }, []);

  const getCanPreviousPage = useCallback(() => {
    return state.pagination.pageIndex > 0;
  }, [state.pagination.pageIndex]);

  const getCanNextPage = useCallback(() => {
    const pageCount = Math.ceil(
      (state.pagination.total || rows.length) / state.pagination.pageSize
    );
    return state.pagination.pageIndex < pageCount - 1;
  }, [
    state.pagination.pageIndex,
    state.pagination.total,
    state.pagination.pageSize,
    rows.length,
  ]);

  const getPageCount = useCallback(() => {
    return Math.ceil(
      (state.pagination.total || rows.length) / state.pagination.pageSize
    );
  }, [state.pagination.total, state.pagination.pageSize, rows.length]);

  // Apply sorting
  const sortedRows = useMemo(() => {
    if (manualSorting || state.sorting.length === 0) {
      return rows;
    }

    return [...rows].sort((a, b) => {
      for (const sort of state.sorting) {
        const column = columns.find((col) => col.id === sort.columnId);
        if (!column) continue;

        const aVal = a.getValue(sort.columnId);
        const bVal = b.getValue(sort.columnId);

        // Handle null/undefined values
        if (aVal == null && bVal == null) continue;
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        // Use custom sorting function if provided
        if (column.sortingFn) {
          const result = column.sortingFn(
            a.original,
            b.original,
            sort.columnId
          );
          if (result !== 0) {
            return sort.direction === "desc" ? -result : result;
          }
          continue;
        }

        // Default sorting
        if (aVal < bVal) {
          return sort.direction === "desc" ? 1 : -1;
        }
        if (aVal > bVal) {
          return sort.direction === "desc" ? -1 : 1;
        }
      }
      return 0;
    });
  }, [rows, state.sorting, manualSorting, columns]);

  // Apply filtering
  const filteredRows = useMemo(() => {
    if (
      manualFiltering ||
      (state.filters.length === 0 && !state.globalFilter)
    ) {
      return sortedRows;
    }

    return sortedRows.filter((row) => {
      // Global filter
      if (state.globalFilter) {
        const globalMatch = columns.some((column) => {
          const value = row.getValue(column.id);
          return value
            ?.toString()
            .toLowerCase()
            .includes(state.globalFilter.toLowerCase());
        });
        if (!globalMatch) return false;
      }

      // Column filters
      return state.filters.every((filter) => {
        const column = columns.find((col) => col.id === filter.columnId);
        if (!column) return true;

        if (column.filterFn) {
          return column.filterFn(row.original, filter.columnId, filter.value);
        }

        const value = row.getValue(filter.columnId);
        if (value == null) return false;

        const strValue = value.toString().toLowerCase();
        const filterValue = filter.value?.toString().toLowerCase() || "";

        switch (filter.operator || "contains") {
          case "contains":
            return strValue.includes(filterValue);
          case "equals":
            return strValue === filterValue;
          case "startsWith":
            return strValue.startsWith(filterValue);
          case "endsWith":
            return strValue.endsWith(filterValue);
          default:
            return true;
        }
      });
    });
  }, [sortedRows, state.filters, state.globalFilter, manualFiltering, columns]);

  // Apply pagination
  const paginatedRows = useMemo(() => {
    if (!enablePagination || manualPagination) {
      return filteredRows;
    }

    const start = state.pagination.pageIndex * state.pagination.pageSize;
    const end = start + state.pagination.pageSize;
    return filteredRows.slice(start, end);
  }, [filteredRows, state.pagination, enablePagination, manualPagination]);

  // Update pagination total when filtered data changes
  useEffect(() => {
    if (!manualPagination) {
      setState((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: filteredRows.length,
        },
      }));
    }
  }, [filteredRows.length, manualPagination]);

  // Column helpers
  const getAllColumns = useCallback(() => {
    return columns.map(createColumn);
  }, [columns, createColumn]);

  const getVisibleColumns = useCallback(() => {
    return columns
      .filter((col) => state.columnVisibility[col.id] !== false)
      .map(createColumn);
  }, [columns, state.columnVisibility, createColumn]);

  const getLeftVisibleColumns = useCallback(() => {
    return getVisibleColumns().filter((col) => col.columnDef.sticky === "left");
  }, [getVisibleColumns]);

  const getCenterVisibleColumns = useCallback(() => {
    return getVisibleColumns().filter((col) => !col.columnDef.sticky);
  }, [getVisibleColumns]);

  const getRightVisibleColumns = useCallback(() => {
    return getVisibleColumns().filter(
      (col) => col.columnDef.sticky === "right"
    );
  }, [getVisibleColumns]);

  // Global filter
  const setGlobalFilter = useCallback((filter: string) => {
    setState((prev) => ({ ...prev, globalFilter: filter }));
  }, []);

  // Column filters
  const setColumnFilters = useCallback((filters: FilterState[]) => {
    setState((prev) => ({ ...prev, filters }));
  }, []);

  return {
    getRowModel: () => ({ rows: paginatedRows }),
    getFilteredRowModel: () => ({ rows: filteredRows }),
    getSortedRowModel: () => ({ rows: sortedRows }),
    getPaginationRowModel: () => ({ rows: paginatedRows }),

    getState: () => state,
    setState: (updater) => {
      if (typeof updater === "function") {
        setState((prev) => ({ ...prev, ...updater(prev) }));
      } else {
        setState((prev) => ({ ...prev, ...updater }));
      }
    },

    toggleSorting,
    setColumnFilters,
    setGlobalFilter,
    toggleRowSelection,
    toggleAllRowsSelection,

    nextPage,
    previousPage,
    setPageIndex,
    setPageSize,
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,

    getAllColumns,
    getVisibleColumns,
    getLeftVisibleColumns,
    getCenterVisibleColumns,
    getRightVisibleColumns,
  };
}

// Table component props
export type TableProps<TData extends Record<string, any>> =
  ComponentProps<"table"> &
    VariantProps<typeof tableStyles> &
    TableOptions<TData> & {
      instance?: TableInstance<TData>;
    };

// Main Table component
export const Table = forwardRef<HTMLTableElement, TableProps<any>>(
  (
    {
      data = [],
      columns = [],
      size = "md",
      variant = "default",
      className,
      instance: externalInstance,
      onRowClick,
      onRowDoubleClick,
      ...tableOptions
    },
    ref
  ) => {
    // Create internal instance if not provided
    const internalInstance = useTable({ data, columns, ...tableOptions });
    const instance = externalInstance || internalInstance;

    const { rows } = instance.getRowModel();
    const visibleColumns = instance.getVisibleColumns();

    const SortIcon = ({ direction }: { direction: SortDirection }) => {
      if (direction === "asc") {
        return (
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      if (direction === "desc") {
        return (
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      return (
        <svg
          className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-50"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
    };

    return (
      <div className="overflow-auto">
        <table
          ref={ref}
          className={cn(tableStyles({ size, variant }), className)}
        >
          <thead>
            <tr>
              {visibleColumns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    headerStyles({
                      sortable: column.getCanSort(),
                      sticky: column.columnDef.sticky || false,
                      align: column.columnDef.align,
                    }),
                    column.columnDef.meta?.headerClassName,
                    "group"
                  )}
                  style={{
                    width: column.getSize(),
                    minWidth: column.columnDef.minWidth,
                    maxWidth: column.columnDef.maxWidth,
                  }}
                  onClick={() => {
                    if (column.getCanSort()) {
                      column.toggleSorting();
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.columnDef.header}</span>
                    {column.getCanSort() && (
                      <SortIcon direction={column.getIsSorted()} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  rowStyles({
                    clickable: !!onRowClick || !!onRowDoubleClick,
                    selected: row.getIsSelected(),
                    striped: variant === "striped",
                  })
                )}
                onClick={(e) => onRowClick?.(row.original, e)}
                onDoubleClick={(e) => onRowDoubleClick?.(row.original, e)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={cn(
                      cellStyles({
                        sticky: cell.column.columnDef.sticky || false,
                        align: cell.column.columnDef.align,
                        selected: row.getIsSelected(),
                      }),
                      cell.column.columnDef.meta?.cellClassName
                    )}
                  >
                    {cell.renderValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";
