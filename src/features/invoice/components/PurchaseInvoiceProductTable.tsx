import { InvoiceDetailProduct } from "@/features/invoice/types/purchaseInvoice.types.ts";
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

export function PurchaseInvoiceProductTable({
  products,
}: {
  products: InvoiceDetailProduct[];
}) {
  return (
    <div>
      <p className={"text-2xl"}>کاڵاکان</p>

      <Table>
        <TableCaption>لیستی هەمو کاڵاکان</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right"> #</TableHead>
            <TableHead className="text-right">ناوی کاڵا</TableHead>
            <TableHead className="text-right">یەکەی کاڵا</TableHead>
            <TableHead className="text-right">نرخی کاڵا</TableHead>
            <TableHead className="text-right"> عەدەدی کاڵا</TableHead>
            <TableHead className="text-right">کۆی گشتی</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                {kurdishNumberFormatter.format(index + 1)}
              </TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.unitSymbol}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.quantity * product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
