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
import { Product } from "@/features/product/types/product.types.ts";
import { Eye } from "lucide-react";

type ProductTableProps = {
  products: Product[];
};
export function ProductsTable({ products }: ProductTableProps) {
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
            <TableHead className="text-right"> یەکەکان</TableHead>
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
                <a href={`/app/products/${product.id}`}>
                  <Eye className=" h-5 w-5" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
