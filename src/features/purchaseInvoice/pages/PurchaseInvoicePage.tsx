import { PageHeader } from "@/components/common/PageHeader.tsx";
import { PurchaseInvoiceTable } from "@/features/purchaseInvoice/components/PurchaseInvoiceTable.tsx";

export function PurchaseInvoicePage() {
  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader title="وەسڵی کڕینەکان" />
      <div className="">
        <PurchaseInvoiceTable />
      </div>
    </div>
  );
}
