import { PageHeader } from "@/components/common/PageHeader.tsx";
import { ProductsTable } from "@/features/product/components/ProductsTable.tsx";
import { ProductCreateDialog } from "@/features/product/components/ProductCreateDialog.tsx";

export function ProductsPage() {
  return (
    <div>
      <PageHeader title={"کاڵاکان"} />
      <div>
        <div className={"mb-2 flex justify-end items-center"}>
          <ProductCreateDialog />
        </div>
        <ProductsTable />
      </div>
    </div>
  );
}
