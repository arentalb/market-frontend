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
import { PencilLine, SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";
import { useState } from "react";
import { useGetSuppliersQuery } from "@/features/company/api/supplierApiSlice.ts";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { EditSupplierForm } from "@/features/company/forms/EditSupplierForm.tsx";
import { Supplier } from "@/features/company/types/supplier.types.ts";

export function SuppliersTable() {
  const { data, isLoading, error } = useGetSuppliersQuery();
  const [open, setOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  const suppliers = data?.data.suppliers || [];
  if (suppliers.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500">هیچ کۆمپانیایەک نییە </p>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>لیستی هەمو کۆمپانیاکان</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right"> #</TableHead>
            <TableHead className="text-right">ناوی کۆمپانیا</TableHead>
            <TableHead className="text-right">ژمارەی کۆمپانیا</TableHead>
            <TableHead className="text-right">مەندوبەکان </TableHead>
            <TableHead className="text-right"> کردارەکان</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier, index) => (
            <TableRow key={supplier.id}>
              <TableCell className="font-medium">
                {kurdishNumberFormatter.format(index + 1)}
              </TableCell>

              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.phone}</TableCell>

              <TableCell>
                <Link
                  to={`/app/company/${supplier.id}/workers`}
                  className={"flex items-center gap-2"}
                >
                  بینین
                  <SquareArrowOutUpRight className="h-4 w-4" />
                </Link>
              </TableCell>
              <TableCell>
                <div className={"flex gap-2"}>
                  <button
                    onClick={() => {
                      setSelectedSupplier(supplier);
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

      {selectedSupplier && (
        <CustomDialog
          open={open}
          setOpen={setOpen}
          title="زانیاری کۆمپانیاکا تازە بکەرەوە"
          description="دڵنیا بەرەوە لە هەموو زانیاریەکان"
        >
          <EditSupplierForm
            onClose={() => setOpen(false)}
            supplier={selectedSupplier}
          />
        </CustomDialog>
      )}
    </div>
  );
}
