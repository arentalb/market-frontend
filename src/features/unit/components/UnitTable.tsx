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
import { useGetUnitsQuery } from "@/features/unit/api/unitApiSlice.ts";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";

export function UnitTable() {
  const { isLoading, data, error } = useGetUnitsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }
  const units = data?.data.units || [];
  return (
    <div>
      <Table>
        <TableCaption>لیستی هەمو یەکەکان</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right"> #</TableHead>
            <TableHead className="text-right">ناوی یەکە</TableHead>
            <TableHead className="text-right">هێمای یەکە</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {units.map((unit, index) => (
            <TableRow key={unit.id}>
              <TableCell className="font-medium">
                {" "}
                {kurdishNumberFormatter.format(index + 1)}
              </TableCell>

              <TableCell>{unit.unitName}</TableCell>
              <TableCell>{unit.unitSymbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
