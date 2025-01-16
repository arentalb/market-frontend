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
import { Category } from "@/features/category/types/category.types.ts";

type CategoryTableProps = {
  categories: Category[];
};

export function CategoryTable({ categories }: CategoryTableProps) {
  return (
    <div>
      <Table>
        <TableCaption>لیستی هەمو جۆرەکان</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right"> #</TableHead>
            <TableHead className="text-right">ناوی جۆر </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">
                {" "}
                {kurdishNumberFormatter.format(index + 1)}
              </TableCell>

              <TableCell>{category.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
