import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilterInput } from "@/components/ui/filter-input.tsx";

interface FilterableColumn {
  id: string;
  placeholder?: string;
}

/**
 * Props for our reusable DataTable, which can do:
 * - Client or server-side pagination
 * - Client or server-side filtering
 * - Client or server-side sorting
 */
interface DataTableProps<TData, TValue> {
  /** The data to display (for the current page if server-side pagination). */
  data: TData[];

  /** Column definitions for TanStack Table. */
  columns: ColumnDef<TData, TValue>[];

  /**
   * Which columns should have filter inputs in the UI?
   */
  filterableColumns?: FilterableColumn[];

  /**
   * -- Pagination Props --
   * If `manualPagination` is true, the parent handles fetching each page from the server.
   */
  manualPagination?: boolean;
  pageCount?: number;
  onPaginationChange?: (
    updater: PaginationState | ((prev: PaginationState) => PaginationState),
  ) => void;

  /**
   * -- Filtering Props --
   * If `manualFiltering` is true, the parent handles server-side filtering.
   */
  manualFiltering?: boolean;
  onColumnFiltersChange?: (
    updater:
      | ColumnFiltersState
      | ((prev: ColumnFiltersState) => ColumnFiltersState),
  ) => void;

  /**
   * -- Sorting Props --
   * If `manualSorting` is true, the parent handles server-side sorting.
   */
  manualSorting?: boolean;
  onSortingChange?: (
    updater: SortingState | ((prev: SortingState) => SortingState),
  ) => void;

  /** External state managed by the parent */
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  filterableColumns,

  manualPagination = false,
  pageCount,
  onPaginationChange,

  manualFiltering = false,
  onColumnFiltersChange,

  manualSorting = false,
  onSortingChange,

  sorting,
  columnFilters,
  pagination,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
      pagination,
    },

    manualSorting,
    getSortedRowModel: !manualSorting ? getSortedRowModel() : undefined,
    onSortingChange,

    manualFiltering,
    getFilteredRowModel: !manualFiltering ? getFilteredRowModel() : undefined,
    onColumnFiltersChange,

    manualPagination,
    pageCount,
    getPaginationRowModel: !manualPagination
      ? getPaginationRowModel()
      : undefined,
    onPaginationChange,

    getCoreRowModel: getCoreRowModel(),
  });

  const totalPages = manualPagination
    ? (pageCount ?? 1)
    : Math.ceil(
        table.getPrePaginationRowModel().rows.length / pagination.pageSize,
      );

  return (
    <div className="w-full">
      {filterableColumns && filterableColumns.length > 0 && (
        <div className="flex flex-wrap gap-2 py-4">
          {filterableColumns.map((col) => {
            const tableCol = table.getColumn(col.id);
            if (!tableCol) return null;

            return (
              <FilterInput
                key={col.id}
                column={tableCol}
                placeholder={col.placeholder}
                debounceDelay={1000}
              />
            );
          })}
        </div>
      )}

      {/* TABLE */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  هیچ داتایەک نەدۆزرایەوە
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          پێشتر
        </Button>
        <span>
          لاپەڕەی {pagination.pageIndex + 1} لە {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          دواتر
        </Button>
      </div>
    </div>
  );
}
