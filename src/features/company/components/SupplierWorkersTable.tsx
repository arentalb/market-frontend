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
import { useDispatch } from "react-redux";
import { useGetSupplierByIdQuery } from "@/features/company/api/supplierApiSlice.ts";
import { setSupplierId } from "@/features/company/store/supplierSlice.ts";
import { NotFoundPage } from "@/features/common/pages/NotFoundPage.tsx";
import { useState } from "react";
import { PencilLine } from "lucide-react";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { EditSupplierWorkerForm } from "@/features/company/forms/EditSupplierWorkerForm.tsx";

export function SupplierWorkersTable() {
  const { id } = useParams();
  const supplierId = Number(id);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetSupplierByIdQuery(
    { id: supplierId },
    { skip: !id || isNaN(supplierId) },
  );

  if (!supplierId) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Loader />;
  }
  if (!data?.data.supplier) {
    return <NotFoundPage />;
  }
  if (error) {
    return <ErrorBox error={error} />;
  }
  const supplier = data?.data.supplier || [];
  return (
    <div>
      <Table>
        <TableCaption>
          لیستی هەموو مەندوبەکانی کۆمپانیا {supplier.name}
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="text-right"> #</TableHead>
            <TableHead className="text-right">ناوی مەندوب</TableHead>
            <TableHead className="text-right">ژمارەی مەندوب</TableHead>
            <TableHead className="text-right"> کردارەکان</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supplier.workers.map((worker, index) => (
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
                      dispatch(setSupplierId(supplier.id));
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
