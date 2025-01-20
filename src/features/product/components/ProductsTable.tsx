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
import { PencilLine, SquareArrowOutUpRight, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/features/product/api/productApiSlice.ts";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";
import { EditProductForm } from "@/features/product/forms/EditProductForm.tsx";
import { DeleteProductForm } from "@/features/product/forms/DeleteProductForm.tsx";
import { CustomDialog } from "@/components/CustomDialog.tsx";
import { useState } from "react";

export function ProductsTable() {
  const { data, isLoading, error } = useGetProductsQuery();

  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  if (isLoading) return <Loader />;
  if (error) return <ErrorBox error={error} />;

  const products = data?.data.products || [];

  const handleEditClick = (productId: number) => {
    setSelectedProductId(productId);
    setIsOpenEditDialog(true);
  };

  const handleDeleteClick = (productId: number) => {
    setSelectedProductId(productId);
    setIsOpenDeleteDialog(true);
  };

  return (
    <div>
      <Table>
        <TableCaption>لیستی هەمو کاڵاکان</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right"> #</TableHead>
            <TableHead className="text-right">ناوی کاڵا</TableHead>
            <TableHead className="text-right">وردەکاری کاڵا</TableHead>
            <TableHead className="text-right">جۆری کاڵا</TableHead>
            <TableHead className="text-right">یەکەی سەرەکی کاڵا</TableHead>
            <TableHead className="text-right">نرخی فرۆشتن</TableHead>
            <TableHead className="text-right"> کردارەکان</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                {kurdishNumberFormatter.format(index + 1)}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>{product.baseUnit.unitSymbol}</TableCell>
              <TableCell>
                <Link
                  to={`/app/products/${product.id}`}
                  className="flex items-center gap-2"
                >
                  بینین
                  <SquareArrowOutUpRight className="h-4 w-4" />
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleEditClick(product.id);
                    }}
                  >
                    <PencilLine width={18} height={18} />
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteClick(product.id);
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

      <CustomDialog
        open={isOpenEditDialog}
        setOpen={setIsOpenEditDialog}
        title="دەستکاری کاڵا بکە"
        description="وردەکارییەکانی کاڵا لێرە بگۆڕە"
      >
        {selectedProductId && (
          <EditProductForm
            productId={selectedProductId}
            onClose={() => setIsOpenEditDialog(false)}
          />
        )}
      </CustomDialog>

      <CustomDialog
        open={isOpenDeleteDialog}
        setOpen={setIsOpenDeleteDialog}
        title="سڕینەوەی کاڵا"
        description="ئایا دڵنیایت لە سڕینەوەی ئەم کاڵایە؟"
      >
        {selectedProductId && (
          <DeleteProductForm
            productId={selectedProductId}
            onClose={() => setIsOpenDeleteDialog(false)}
          />
        )}
      </CustomDialog>
    </div>
  );
}
