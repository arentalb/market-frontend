import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { Loader } from "@/components/common/Loader.tsx";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";
import { useGetUnitsQuery } from "@/features/unit/api/unitApiSlice.ts";
import { Unit } from "@/features/unit/types/unit.types.ts";

export function UnitTable() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting] = useState<SortingState>([]);
  const [columnFilters] = useState<ColumnFiltersState>([]);

  const { toast } = useToast();

  const { data, isLoading, isError, error } = useGetUnitsQuery({
    page: pagination.pageIndex,
    size: pagination.pageSize,
  });

  const units = data?.data.units ?? [];
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
        data={units}
        columns={unitColumns}
        manualPagination
        manualSorting
        manualFiltering
        pageCount={totalPages}
        onPaginationChange={setPagination}
        pagination={pagination}
        sorting={sorting}
        columnFilters={columnFilters}
      />
    </div>
  );
}

const unitColumns: ColumnDef<Unit>[] = [
  {
    accessorKey: "unitName",
    header: () => {
      return <div className="text-right">ناوی یەکە</div>;
    },
    enableSorting: false,
  },

  {
    accessorKey: "unitSymbol",
    header: () => <div className="text-right">هێمای یەکە</div>,
    enableSorting: false,
  },
];
