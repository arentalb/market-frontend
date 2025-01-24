import { InvoiceDetailPayment } from "@/features/purchaseInvoice/types/purchaseInvoice.types.ts";
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

export function PurchaseInvoicePaymentsTable({
  payments,
}: {
  payments: InvoiceDetailPayment[];
}) {
  return (
    <div>
      <p className={"text-2xl"}>پارەکان</p>

      <Table>
        <TableCaption>لیستی هەموو پارە دراوەکان</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right"> #</TableHead>
            <TableHead className="text-right"> دراوە لە لایەن</TableHead>
            <TableHead className="text-right"> رێژەی پارەکە</TableHead>
            <TableHead className="text-right">کاتی پارەیانەکە</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment, index) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">
                {kurdishNumberFormatter.format(index + 1)}
              </TableCell>
              <TableCell>{payment.workerName}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{new Date(payment.paidAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
