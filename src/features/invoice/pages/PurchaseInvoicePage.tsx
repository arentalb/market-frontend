import { PageHeader } from "@/components/common/PageHeader.tsx";
import { PurchaseInvoiceTable } from "@/features/invoice/components/PurchaseInvoiceTable.tsx";

export function PurchaseInvoicePage() {
  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader title="وەسڵەکان" />
      <div className="">
        <PurchaseInvoiceTable />
      </div>
    </div>
  );
}
