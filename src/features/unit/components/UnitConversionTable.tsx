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
import { unitConversionDetailFormater } from "@/features/unit/utils/kurdishFormatedRate.tsx";
import { useGetUnitConversionsQuery } from "@/features/unit/api/unitApiSlice.ts";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";

export function UnitConversionTable() {
  const { isLoading, data, error } = useGetUnitConversionsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  const conversions = data?.data.conversions || [];
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
