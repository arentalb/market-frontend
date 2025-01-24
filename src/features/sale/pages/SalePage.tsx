import { PageHeader } from "@/components/common/PageHeader";
import { FoundedSaleProductList } from "@/features/sale/components/FoundedSaleProductList.tsx";
import { SaleProductCartList } from "@/features/sale/components/SaleProductCartList.tsx";

export function SalePage() {
  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader title="فرۆشتن" />
      <div className="grid grid-cols-2 gap-2 flex-grow min-h-0">
        <FoundedSaleProductList />
        <SaleProductCartList />
      </div>
    </div>
  );
}
