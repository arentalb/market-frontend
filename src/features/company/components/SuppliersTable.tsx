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
import { useDispatch } from "react-redux";
import { useGetSuppliersQuery } from "@/features/company/api/supplierApiSlice.ts";
import { setSupplierId } from "@/features/company/store/supplierSlice.ts";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { useState } from "react";
import { EditSupplierForm } from "@/features/company/forms/EditSupplierForm.tsx";

export function SuppliersTable() {
  const { data, isLoading, error } = useGetSuppliersQuery();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  const supplier = data?.data.supplier || [];
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
          {supplier.map((supplier, index) => (
            <TableRow key={supplier.id}>
              <TableCell className="font-medium">
                {kurdishNumberFormatter.format(index + 1)}
              </TableCell>

              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.phone}</TableCell>

              <TableCell>
                <Link
                  to={`/app/company/${supplier.id}/workers`}
                  className={"flex  items-center gap-2"}
                >
                  بینین
                  <SquareArrowOutUpRight className=" h-4 w-4" />
                </Link>
              </TableCell>
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
        title="زانیاری کۆمپانیاکا  تازە بکەرەوە"
        description="دڵنیا بەرەوە لە هەموو زانیاریەکان"
      >
        <EditSupplierForm onClose={() => setOpen(false)} />
      </CustomDialog>
    </div>
  );
}
