import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import {
  kurdishNumberFormatter,
  unitConversionDetailFormater,
} from "@/lib/utils.tsx";
import { UnitConversion } from "@/features/unit/unit.types.ts";

type UnitTableProps = {
  conversions: UnitConversion[];
};
export function UnitConversionTable({ conversions }: UnitTableProps) {
  return (
    <div>
      <Table>
        <TableCaption>لیستی هەموو پەیوەندی یەکەکان</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right"> #</TableHead>
            <TableHead className="text-right"> لە</TableHead>
            <TableHead className="text-right">بۆ </TableHead>
            <TableHead className="text-right"> ڕێژە</TableHead>
            <TableHead className="text-right"> ووردەکاری</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conversions.map((conversion, index) => (
            <TableRow key={conversion.id}>
              <TableCell className="font-medium">
                {kurdishNumberFormatter.format(index + 1)}
              </TableCell>

              <TableCell>{conversion.fromUnit.unitName}</TableCell>
              <TableCell>{conversion.toUnit.unitSymbol}</TableCell>
              <TableCell>{conversion.conversionRate}</TableCell>

              <TableCell>
                {unitConversionDetailFormater(
                  conversion.toUnit.unitSymbol,
                  conversion.fromUnit.unitSymbol,
                  conversion.conversionRate,
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
