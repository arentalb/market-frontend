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
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Unit } from "@/features/unit/types/unit.types.ts";

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

function ProductUnitsTable({ productUnits }: { productUnits: Unit[] }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right"> #</TableHead>
            <TableHead className="text-right"> هێمای یەکە</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productUnits.map((productUnit, index) => (
            <TableRow key={productUnit.id}>
              <TableCell className="font-medium">
                {" "}
                {kurdishNumberFormatter.format(index + 1)}
              </TableCell>

              <TableCell>{productUnit.unitSymbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
