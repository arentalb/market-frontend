import { PageHeader } from "@/components/common/PageHeader.tsx";
import { useGetProductSalePriceHistoryQuery } from "@/features/product/api/productApiSlice.ts";
import { useParams } from "react-router-dom";
import { ProductSalePriceHistoryTable } from "@/features/product/components/ProductSalePriceHistoryTable.tsx";
import { ProductAddUnitDialog } from "@/features/product/components/ProductAddUnitDialog.tsx";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";
import { NotFoundPage } from "@/features/common/pages/NotFoundPage.tsx";

export function ProductsDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const { data, isLoading, error } = useGetProductSalePriceHistoryQuery(
    { id: productId },
    { skip: !id || isNaN(productId) },
  );

  if (!productId) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Loader />;
  }
  if (!data?.data.product) {
    return <NotFoundPage />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }
  const { product } = data.data;

  return (
    <div>
      <PageHeader title={`${product.name}`} />
      <div>
        <div className="mb-2 flex text-lg justify-between items-center">
          نرخی فرۆشتنەکان
          <ProductAddUnitDialog />
        </div>
        <ProductSalePriceHistoryTable product={product} />

        <div className="mb-2 flex text-lg justify-between items-center">
          نرخی کرینەکان
        </div>
      </div>
    </div>
  );
}
