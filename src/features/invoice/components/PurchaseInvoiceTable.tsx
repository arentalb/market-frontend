import { useGetPurchaseInvoicesQuery } from "@/features/invoice/api/purchaseInvoiceApiSlice.ts";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";
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
import { InvoiceStatus } from "@/features/invoice/types/purchaseInvoice.types.ts";
import { statusMapping } from "@/features/invoice/utils/statusMapping.ts";
import { Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";

export function PurchaseInvoiceTable() {
  const { data, isLoading, error } = useGetPurchaseInvoicesQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  const invoices = data?.data.invoices || [];
  if (invoices.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500">هیچ وەسڵێک نییە </p>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>لیستی هەمو وەسڵەکان</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right"> #</TableHead>
            <TableHead className="text-right">ژمارەی وەسڵ</TableHead>
            <TableHead className="text-right">ناوی کۆمپانیا</TableHead>
            <TableHead className="text-right">ناوی کارمەند</TableHead>
            <TableHead className="text-right">کۆی گشتی</TableHead>
            <TableHead className="text-right">پارەی دراو</TableHead>
            <TableHead className="text-right">دۆخ</TableHead>
            <TableHead className="text-right">زانیاری زیاتر</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                {kurdishNumberFormatter.format(index + 1)}
              </TableCell>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>{invoice.supplierName}</TableCell>
              <TableCell>{invoice.workerName}</TableCell>
              <TableCell>{invoice.totalAmount}</TableCell>
              <TableCell>{invoice.paidSoFar}</TableCell>
              <TableCell>
                <span
                  className={` ${
                    invoice.status === InvoiceStatus.Paid
                      ? "text-green-600"
                      : invoice.status === InvoiceStatus.PartiallyPaid
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {statusMapping[invoice.status]}
                </span>
              </TableCell>
              <TableCell>
                <Link
                  to={`/app/invoices/purchase/${invoice.id}`}
                  className={"flex items-center gap-2"}
                >
                  بینین
                  <SquareArrowOutUpRight className="h-4 w-4" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
