import { PageHeader } from "@/components/common/PageHeader";
import { FoundProductList } from "@/features/purchase/components/FoundedProductList.tsx";
import { SelectedProductList } from "@/features/purchase/components/SelectedProductList.tsx";

export function PurchasePage() {
  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader title="کڕین" />
      <div className="grid grid-cols-2 gap-2 flex-grow min-h-0">
        <FoundProductList />
        <SelectedProductList />
      </div>
    </div>
  );
}
