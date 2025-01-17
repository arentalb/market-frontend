import { Unit } from "@/features/unit/types/unit.types.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { kurdishNumberFormatter } from "@/lib/utils.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

export function ProductUnitsTable({
  productUnits,
  selectedProductId,
}: {
  productUnits: Unit[];
  selectedProductId: number;
}) {
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
                {kurdishNumberFormatter.format(index + 1)}
              </TableCell>

              <TableCell>{productUnit.unitSymbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button asChild className={"w-full mt-4"}>
        <Link to={`/app/products/${selectedProductId}`}>دەستکاری بکە</Link>
      </Button>
    </div>
  );
}
