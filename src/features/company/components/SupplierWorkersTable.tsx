import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { kurdishNumberFormatter } from "@/lib/utils.tsx";
import { useParams } from "react-router-dom";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";
import { NotFoundPage } from "@/features/common/pages/NotFoundPage.tsx";
import { useState } from "react";
import { PencilLine, Trash } from "lucide-react";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { EditSupplierWorkerForm } from "@/features/company/forms/EditSupplierWorkerForm.tsx";
import {
  useDeleteSupplierWorkerMutation,
  useGetSupplierWorkersQuery,
} from "@/features/company/api/supplierWorkerApiSlice.ts";
import { SupplierWorker } from "@/features/company/types/supplier.types.ts";
import { Button } from "@/components/ui/button.tsx";
import { useToast } from "@/hooks/use-toast.ts";
import { ClientError } from "@/app/apiSlice.ts";

export function SupplierWorkersTable() {
  const { id } = useParams();
  const supplierId = Number(id);
  const [updateWorkerDialogOpen, setUpdateWorkerDialogOpen] = useState(false);
  const [deleteWorkerDialogOpen, setDeleteWorkerDialogOpen] = useState(false);

  const [selectedWorker, setSelectedWorker] = useState<SupplierWorker | null>(
    null,
  );
  const { data, isLoading, error } = useGetSupplierWorkersQuery(
    { supplierId: supplierId },
    { skip: !id || isNaN(supplierId) },
  );

  const [deleteSupplierWorker, { isLoading: isLoadingDelete }] =
    useDeleteSupplierWorkerMutation();
  const { toast } = useToast();

  if (!supplierId) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Loader />;
  }
  if (!data?.data) {
    return <NotFoundPage />;
  }

  if (data.data.workers.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500">هیچ مەندوبێک نییە </p>
    );
  }
  if (error) {
    return <ErrorBox error={error} />;
  }
  function handleDeleteProduct() {
    try {
      deleteSupplierWorker({
        supplierId,
        workerId: selectedWorker?.id as number,
      });
      setDeleteWorkerDialogOpen(false);
    } catch (e) {
      const error = e as ClientError;
      toast({
        title: "هەڵە",
        description: error.message,
        variant: "destructive",
      });
    }
  }
  const workers = data?.data.workers || [];
  return (
    <div>
      <Table>
        <TableCaption>لیستی هەموو مەندوبەکانی کۆمپانیا</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="text-right"> #</TableHead>
            <TableHead className="text-right">ناوی مەندوب</TableHead>
            <TableHead className="text-right">ژمارەی مەندوب</TableHead>
            <TableHead className="text-right"> کردارەکان</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workers.map((worker, index) => (
            <TableRow key={worker.id}>
              <TableCell className="font-medium">
                {kurdishNumberFormatter.format(index + 1)}
              </TableCell>

              <TableCell>{worker.name}</TableCell>
              <TableCell>{worker.phone}</TableCell>

              <TableCell>
                <div className={"flex gap-2"}>
                  <button
                    onClick={() => {
                      setUpdateWorkerDialogOpen(true);
                      setSelectedWorker(worker);
                    }}
                  >
                    <PencilLine width={18} height={18} />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteWorkerDialogOpen(true);
                      setSelectedWorker(worker);
                    }}
                  >
                    <Trash width={18} height={18} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedWorker && (
        <CustomDialog
          open={updateWorkerDialogOpen}
          setOpen={setUpdateWorkerDialogOpen}
          title="زانیاری کارمەند  تازە بکەرەوە"
          description="دڵنیا بەرەوە لە هەموو زانیاریەکان"
        >
          <EditSupplierWorkerForm
            onClose={() => setUpdateWorkerDialogOpen(false)}
            worker={selectedWorker}
          />
        </CustomDialog>
      )}
      {selectedWorker && (
        <CustomDialog
          open={deleteWorkerDialogOpen}
          setOpen={setDeleteWorkerDialogOpen}
          title=" کارمەند بسڕەوە"
          description="دوای سرینەوە ناتوانیت بیگەڕێنیتەوە"
        >
          <Button
            className={"w-full"}
            variant={"destructive"}
            onClick={handleDeleteProduct}
          >
            {isLoadingDelete ? "سڕینەوە ..." : "کارمەند بسڕەوە"}
          </Button>
        </CustomDialog>
      )}
    </div>
  );
}
