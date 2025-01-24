import { PaySaleInvoiceForm } from "@/features/saleInvoice/forms/PaySaleInvoiceForm.tsx";
import {
  InvoiceStatus,
  SaleInvoiceDetail,
} from "@/features/saleInvoice/types/purchaseInvoice.types.ts";
import { statusMapping } from "@/features/saleInvoice/utils/statusMapping.ts";

export function SaleInvoiceGeneralDetail({
  invoice,
}: {
  invoice: SaleInvoiceDetail;
}) {
  return (
    <div className="border-b-2 mb-4 rounded-lg py-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <span className="font-medium text-gray-600">کۆی گشتی</span>
          <span className="mt-1 text-lg font-bold text-gray-800">
            {invoice.totalAmount.toLocaleString()}{" "}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-gray-600">پارەدان تاکو ئێستا</span>
          <span className="mt-1 text-lg font-bold text-gray-800">
            {invoice.paidSoFar.toLocaleString()}{" "}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-gray-600">ژمارەی کاڵاکان</span>
          <span className="mt-1 text-lg font-bold text-gray-800">
            {invoice.products.length}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-gray-600">بارودۆخ</span>
          <span
            className={`mt-1 text-lg font-bold ${
              invoice.status === InvoiceStatus.Paid
                ? "text-green-600"
                : invoice.status === InvoiceStatus.PartiallyPaid
                  ? "text-yellow-600"
                  : "text-red-600"
            }`}
          >
            {statusMapping[invoice.status]}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-gray-600">ناوی موشتەری</span>
          <span className="mt-1 text-lg font-bold text-gray-800">
            {invoice.customerName}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-gray-600">کارمەند</span>
          <span className="mt-1 text-lg font-bold text-gray-800">
            {invoice.workerName}
          </span>
        </div>
      </div>
      {invoice.status !== InvoiceStatus.Paid && (
        <PaySaleInvoiceForm invoiceId={invoice.id} />
      )}
    </div>
  );
}
