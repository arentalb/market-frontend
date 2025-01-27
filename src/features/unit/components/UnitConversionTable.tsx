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
import { useGetUnitConversionsQuery } from "@/features/unit/api/unitApiSlice.ts";
import { UnitConversion } from "@/features/unit/types/unit.types.ts";
import { unitConversionDetailFormater } from "@/features/unit/utils/kurdishFormatedRate.tsx";

export function UnitConversionTable() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting] = useState<SortingState>([]);
  const [columnFilters] = useState<ColumnFiltersState>([]);

  const { toast } = useToast();

  const { data, isLoading, isError, error } = useGetUnitConversionsQuery({
    page: pagination.pageIndex,
    size: pagination.pageSize,
  });

  const customers = data?.data.conversions ?? [];
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
        columns={unitConversionColumns}
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

const unitConversionColumns: ColumnDef<UnitConversion>[] = [
  {
    accessorKey: "fromUnit.unitSymbol",
    header: () => {
      return <div className="text-right">لە</div>;
    },
    enableSorting: true,
  },

  {
    accessorKey: "toUnit.unitSymbol",
    header: () => <div className="text-right">بۆ</div>,
    enableSorting: false,
  },

  {
    accessorKey: "conversionRate",
    header: () => <div className="text-right">رێژە</div>,
    enableSorting: false,
  },

  {
    id: "detail",
    header: () => <div className="text-right">وردەکاری</div>,
    enableSorting: false,
    cell: ({ row }) => {
      const { toUnit, fromUnit, conversionRate } = row.original;
      return (
        <div className="text-right font-medium">
          {unitConversionDetailFormater(
            toUnit.unitSymbol,
            fromUnit.unitSymbol,
            conversionRate,
          )}
        </div>
      );
    },
  },
];
