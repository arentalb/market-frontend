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
import { useParams } from "react-router-dom";
import {
  useDeleteSupplierWorkerMutation,
  useGetSupplierWorkersQuery,
} from "@/features/company/api/supplierWorkerApiSlice.ts";
import { SupplierWorker } from "@/features/company/types/supplier.types.ts";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { EditSupplierWorkerForm } from "@/features/company/forms/EditSupplierWorkerForm.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";
import { NotFoundPage } from "@/features/common/pages/NotFoundPage.tsx";

export function SupplierWorkersTable() {
  const { id } = useParams<{ id: string }>();
  const supplierId = Number(id);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnFilters] = useState<ColumnFiltersState>([]);
  const [sorting] = useState<SortingState>([]);

  const { toast } = useToast();

  const { data, isLoading, isError, error } = useGetSupplierWorkersQuery(
    { supplierId, page: pagination.pageIndex, size: pagination.pageSize },
    { skip: !id || isNaN(supplierId) },
  );

  const workers = data?.data.workers ?? [];
  const totalItems = data?.meta?.totalItems ?? 0;
  const serverSize = data?.meta?.size ?? 10;
  const totalPages = Math.ceil(totalItems / serverSize);

  const [deleteSupplierWorker, { isLoading: isLoadingDelete }] =
    useDeleteSupplierWorkerMutation();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<SupplierWorker | null>(
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

  const handleEditWorker = (worker: SupplierWorker) => {
    setSelectedWorker(worker);
    setIsEditDialogOpen(true);
  };

  const handleDeleteWorker = (worker: SupplierWorker) => {
    setSelectedWorker(worker);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteWorker = async () => {
    if (!selectedWorker) return;
    try {
      await deleteSupplierWorker({
        supplierId,
        workerId: selectedWorker.id,
      }).unwrap();
      toast({
        title: "Success",
        description: "Worker deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
      setSelectedWorker(null);
    } catch (e) {
      const err = e as ClientError;
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    }
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedWorker(null);
  };

  if (!supplierId) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorBox error={error} />;
  }

  if (!data?.data) {
    return <NotFoundPage />;
  }

  if (workers.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500">هیچ مەندوبێک نییە</p>
    );
  }

  return (
    <div>
      <DataTable
        data={workers}
        columns={workerColumns(handleEditWorker, handleDeleteWorker)}
        manualPagination
        pageCount={totalPages}
        manualSorting
        manualFiltering
        onPaginationChange={setPagination}
        pagination={pagination}
        sorting={sorting}
        columnFilters={columnFilters}
      />

      {selectedWorker && (
        <CustomDialog
          open={isEditDialogOpen}
          setOpen={setIsEditDialogOpen}
          title="زانیاری کارمەند تازە بکەرەوە"
          description="دڵنیا بەرەوە لە هەموو زانیاریەکان"
        >
          <EditSupplierWorkerForm
            onClose={handleCloseEditDialog}
            worker={selectedWorker}
          />
        </CustomDialog>
      )}

      {selectedWorker && (
        <CustomDialog
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          title="کارمەند بسڕەوە"
          description="دوای سڕینەوە ناتوانیت بیگەڕێنیتەوە"
        >
          <Button
            className="w-full"
            variant="destructive"
            onClick={confirmDeleteWorker}
            disabled={isLoadingDelete}
          >
            {isLoadingDelete ? "سڕینەوە ..." : "کارمەند بسڕەوە"}
          </Button>
        </CustomDialog>
      )}
    </div>
  );
}

const workerColumns = (
  handleEditWorker: (worker: SupplierWorker) => void,
  handleDeleteWorker: (worker: SupplierWorker) => void,
): ColumnDef<SupplierWorker>[] => [
  {
    accessorKey: "name",
    header: () => <div className="text-right">ناوی مەندوب</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<string>()}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-right">ژمارەی مەندوب</div>,
    cell: ({ getValue }) => (
      <div className="text-right">{getValue<string>()}</div>
    ),
    enableSorting: false,
  },
  {
    id: "actions",
    header: () => <div className="text-right">کردارەکان</div>,
    cell: ({ row }) => {
      const worker = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center p-2">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>کردارەکان</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEditWorker(worker)}>
              گۆڕینی زانیاری
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteWorker(worker)}
              className="text-red-500"
            >
              بسڕینەوە
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
  },
];
