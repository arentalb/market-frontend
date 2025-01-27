import React, { useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import {
  Customer,
  useGetCustomersQuery,
} from "@/features/customer/api/customerApiSlice";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { Loader } from "@/components/common/Loader.tsx";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function CustomersTable() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const { toast } = useToast();
  const firstNameFilter =
    (columnFilters.find((f) => f.id === "firstName")?.value as string) || "";
  const phoneFilter =
    (columnFilters.find((f) => f.id === "phone")?.value as string) || "";

  const primarySort = sorting.length ? sorting[0] : undefined;
  const sortBy = primarySort?.id || "";
  const sortDir = primarySort?.desc ? "desc" : "asc";

  const { data, isLoading, isError, error } = useGetCustomersQuery({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    firstName: firstNameFilter,
    phone: phoneFilter,
    sortBy,
    sortDir,
  });

  const customers = data?.data.customers ?? [];
  const totalItems = data?.meta?.totalItems ?? 0;
  const serverSize = data?.meta?.size ?? 10;
  const totalPages = Math.ceil(totalItems / serverSize);

  useEffect(() => {
    if (isError) {
      const err = error as ClientError;
      toast({
        variant: "destructive",
        title: err.message,
      });
    }
  }, [error, isError, toast]);
  return (
    <div>
      {isLoading && <Loader />}

      <DataTable
        data={customers}
        columns={customersColumns}
        manualPagination
        pageCount={totalPages}
        onPaginationChange={(updater) => {
          setPagination((old) =>
            typeof updater === "function" ? updater(old) : updater,
          );
        }}
        manualFiltering
        onColumnFiltersChange={(updater) => {
          setColumnFilters((old) =>
            typeof updater === "function" ? updater(old) : updater,
          );
          setPagination((old) => ({ ...old, pageIndex: 0 }));
        }}
        manualSorting
        onSortingChange={(updater) => {
          setSorting((old) =>
            typeof updater === "function" ? updater(old) : updater,
          );
          setPagination((old) => ({ ...old, pageIndex: 0 }));
        }}
        sorting={sorting}
        columnFilters={columnFilters}
        pagination={pagination}
        filterableColumns={[
          { id: "firstName", placeholder: "سێرج بە پێی ناو" },
          { id: "phone", placeholder: "سێرج بە ژمارە" },
        ]}
      />
    </div>
  );
}

const customersColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ناوی یەکەم
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "lastName",
    header: () => <div className="text-right">ناوی دوەم </div>,
    enableSorting: false,
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-left">ژمارە </div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("phone")}</div>
      );
    },
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>کردارەکان</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/app/customers/${customer.id}`}>بینینی زیاتر</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>پرینت</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
  },
];
