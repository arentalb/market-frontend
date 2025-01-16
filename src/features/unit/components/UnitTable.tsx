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
import { Unit } from "@/features/unit/types/unit.types.ts";

type UnitTableProps = {
  units: Unit[];
};
export function UnitTable({ units }: UnitTableProps) {
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
