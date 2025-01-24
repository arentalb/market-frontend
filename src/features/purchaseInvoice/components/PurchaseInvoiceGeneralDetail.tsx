import {
  InvoiceDetail,
  InvoiceStatus,
} from "@/features/purchaseInvoice/types/purchaseInvoice.types.ts";
import { statusMapping } from "@/features/purchaseInvoice/utils/statusMapping.ts";
import { PayPurchaseInvoiceForm } from "@/features/purchaseInvoice/forms/PayPurchaseInvoiceForm.tsx";

export function PurchaseInvoiceGeneralDetail({
  invoice,
}: {
  invoice: InvoiceDetail;
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
          <span className="font-medium text-gray-600">فرۆشیار</span>
          <span className="mt-1 text-lg font-bold text-gray-800">
            {invoice.supplierName}
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
        <PayPurchaseInvoiceForm invoiceId={invoice.id} />
      )}
    </div>
  );
}
