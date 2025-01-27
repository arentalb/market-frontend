import { useEffect, useState } from "react";
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
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useGetSuppliersQuery } from "@/features/company/api/supplierApiSlice.ts";
import { Supplier } from "@/features/company/types/supplier.types.ts";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { EditSupplierForm } from "@/features/company/forms/EditSupplierForm.tsx";

export function SupplierTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnFilters] = useState<ColumnFiltersState>([]);
  const [sorting] = useState<SortingState>([]);

  const { toast } = useToast();

  const { data, isLoading, isError, error } = useGetSuppliersQuery({
    page: pagination.pageIndex,
    size: pagination.pageSize,
  });

  const suppliers = data?.data.suppliers ?? [];
  const totalItems = data?.meta?.totalItems ?? 0;
  const serverSize = data?.meta?.size ?? 10;
  const totalPages = Math.ceil(totalItems / serverSize);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );

  useEffect(() => {
    if (isError) {
      const err = error as ClientError;
      toast({
        variant: "destructive",
        title: err.message,
      });
    }
  }, [error, isError, toast]);

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSupplier(null);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <DataTable
        data={suppliers}
        columns={supplierColumns(handleEditSupplier)}
        manualPagination
        pageCount={totalPages}
        manualSorting
        manualFiltering
        onPaginationChange={setPagination}
        pagination={pagination}
        sorting={sorting}
        columnFilters={columnFilters}
      />

      {selectedSupplier && (
        <CustomDialog
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          title="زانیاری کۆمپانیاکا تازە بکەرەوە"
          description="دڵنیا بەرەوە لە هەموو زانیاریەکان"
        >
          <EditSupplierForm
            onClose={handleCloseDialog}
            supplier={selectedSupplier}
          />
        </CustomDialog>
      )}
    </div>
  );
}
const supplierColumns = (
  handleEditSupplier: (supplier: Supplier) => void,
): ColumnDef<Supplier>[] => [
  {
    accessorKey: "name",
    header: () => <div className="text-right">ناوی کۆمپانیا</div>,
    enableSorting: false,
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-right">ژمارەی کۆمپانیا</div>,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const supplier = row.original;

      return (
        <>
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
                <Link to={`/app/company/${supplier.id}/workers`}>
                  کارمەندەکان
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditSupplier(supplier)}>
                گۆڕینی زانیاری
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
    enableSorting: false,
  },
];
