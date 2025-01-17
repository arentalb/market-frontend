import { PageHeader } from "@/components/common/PageHeader.tsx";
import { useGetProductByIdQuery } from "@/features/product/api/productApiSlice.ts";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "@/features/common/pages/NotFoundPage.tsx";
import { ProductSalePriceHistoryTable } from "@/features/product/components/productDetail/ProductSalePriceHistoryTable.tsx";

export function ProductsDetailPage() {
  const { id } = useParams();
  const productId = Number(id);

  const { data, isLoading, error } = useGetProductByIdQuery(
    { id: productId },
    { skip: !id || isNaN(productId) },
  );

  if (!id || isNaN(productId)) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data?.data.product) {
    return <NotFoundPage />;
  }

  const { product } = data.data;

  return (
    <div>
      <PageHeader title={`${product.name}`} />
      <div>
        <div className="mb-2 flex text-lg justify-between items-center">
          نرخی فرۆشتنەکان
        </div>
        <ProductSalePriceHistoryTable product={product} />

        <div className="mb-2 flex text-lg justify-between items-center">
          نرخی کرینەکان
        </div>
      </div>
    </div>
  );
}
