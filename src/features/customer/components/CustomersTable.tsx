import React, { useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useGetCustomersQuery } from "@/features/customer/api/customerApiSlice";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { customersColumns } from "@/features/customer/components/CustomersColumns";
import { Loader } from "@/components/common/Loader.tsx";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";

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
