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
import { Pencil, SquareArrowOutUpRight, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/features/product/api/productApiSlice.ts";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";

export function ProductsTable() {
  const { data, isLoading, error } = useGetProductsQuery();
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  const products = data?.data.products || [];
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
                  className={"flex  items-center gap-2"}
                >
                  بینین
                  <SquareArrowOutUpRight className=" h-4 w-4" />
                </Link>
              </TableCell>
              <TableCell>
                <div className={"flex gap-2"}>
                  <Link to={`/app/products/${product.id}`}>
                    <Pencil className=" h-4 w-4 stroke-blue-500" />
                  </Link>
                  <Link to={`/app/products/${product.id}`}>
                    <Trash className=" h-4 w-4  stroke-red-500" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
