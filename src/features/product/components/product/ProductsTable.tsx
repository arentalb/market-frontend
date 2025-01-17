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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { ChevronDown } from "lucide-react";
import { ProductUnitsTable } from "@/features/product/components/product/ProductUnitsTable.tsx";

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
            <TableHead className="text-right"> یەکەی فرۆشتن</TableHead>
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
                <Popover>
                  <PopoverTrigger>
                    <div className={"flex gap-2 items-center"}>
                      <p>بینین</p>
                      <ChevronDown className="ml-2 h-5 w-5" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <ProductUnitsTable
                      productUnits={product.productUnits || []}
                      selectedProductId={product.id}
                    />
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
