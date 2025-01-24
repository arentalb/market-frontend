import { PageHeader } from "@/components/common/PageHeader.tsx";
import { SaleInvoiceTable } from "@/features/saleInvoice/components/SaleInvoiceTable.tsx";

export function SaleInvoicePage() {
  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader title="وەسڵی فرۆشتنەکان" />
      <div className="">
        <SaleInvoiceTable />
      </div>
    </div>
  );
}
