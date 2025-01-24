import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSearchProductsQuery } from "@/features/product/api/productApiSlice.ts";
import { Loader } from "@/components/common/Loader.tsx";
import { FoundPurchaseProductCard } from "@/features/purchase/components/FoundPurchaseProductCard.tsx";

export function FoundProductList() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useSearchProductsQuery(
    { name: searchTerm },
    { skip: !searchTerm },
  );

  const filteredProducts = searchTerm ? data?.data.products : [];

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchTerm(value);
  }

  return (
    <div className="border p-2 flex flex-col overflow-y-auto">
      <div className="mb-4 space-y-1">
        <Label htmlFor="search">بە دوای کاڵادا بگەڕێ</Label>
        <Input
          id="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="ناوی کاڵا"
        />
      </div>

      <div className="flex-grow overflow-y-auto scroll-bar pl-2">
        {isLoading ? (
          <Loader />
        ) : filteredProducts?.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            <p>هیج کاڵایەک نەدۆزرایەوە</p>
          </div>
        ) : (
          filteredProducts?.map((product) => (
            <FoundPurchaseProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
