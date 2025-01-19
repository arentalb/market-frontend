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
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";
import { ProductEditDialog } from "@/features/product/components/ProductEditDialog.tsx";
import { useDispatch } from "react-redux";
import { useGetSuppliersQuery } from "@/features/company/api/supplierApiSlice.ts";
import { setSupplierId } from "@/features/company/store/supplierSlice.ts";

export function SuppliersTable() {
  const { data, isLoading, error } = useGetSuppliersQuery();
  const dispatch = useDispatch();

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
                  to={`/app/company/workers`}
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
                    }}
                  >
                    <ProductEditDialog />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
