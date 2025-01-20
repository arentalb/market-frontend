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
import { PencilLine } from "lucide-react";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { EditSupplierWorkerForm } from "@/features/company/forms/EditSupplierWorkerForm.tsx";
import { useGetSupplierWorkersQuery } from "@/features/company/api/supplierWorkerApiSlice.ts";

export function SupplierWorkersTable() {
  const { id } = useParams();
  const supplierId = Number(id);
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useGetSupplierWorkersQuery(
    { supplierId: supplierId },
    { skip: !id || isNaN(supplierId) },
  );

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
                      setOpen(true);
                    }}
                  >
                    <PencilLine width={18} height={18} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        title="زانیاری کارمەند  تازە بکەرەوە"
        description="دڵنیا بەرەوە لە هەموو زانیاریەکان"
      >
        <EditSupplierWorkerForm onClose={() => setOpen(false)} />
      </CustomDialog>
    </div>
  );
}
