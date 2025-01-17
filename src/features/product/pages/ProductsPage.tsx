import { PageHeader } from "@/components/common/PageHeader.tsx";
import { useGetProductsQuery } from "@/features/product/api/productApiSlice.ts";
import { ProductsTable } from "@/features/product/components/product/ProductsTable.tsx";
import { ProductCreateDialog } from "@/features/product/components/product/ProductCreateDialog.tsx";

export function ProductsPage() {
  const { data, isLoading } = useGetProductsQuery();
  return (
    <div>
      <PageHeader title={"کاڵاکان"} />
      <div>
        <div className={"mb-2 flex justify-between items-center"}>
          <ProductCreateDialog />
        </div>

        {!isLoading && <ProductsTable products={data?.data.products || []} />}
      </div>
    </div>
  );
}
