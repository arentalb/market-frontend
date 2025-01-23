import { InvoiceStatus } from "@/features/invoice/types/purchaseInvoice.types.ts";

export const statusMapping: { [key in InvoiceStatus]: string } = {
  [InvoiceStatus.Paid]: "پارەدراوە",
  [InvoiceStatus.Unpaid]: "هیج پارە نەدراوە",
  [InvoiceStatus.PartiallyPaid]: "بەشێک پارەدراوە",
};
