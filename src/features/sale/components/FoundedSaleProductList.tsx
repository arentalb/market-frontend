import { useState } from "react";
import { useSearchProductsQuery } from "@/features/product/api/productApiSlice.ts";
import { Loader } from "@/components/common/Loader.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { FoundSaleProductCard } from "@/features/sale/components/FoundSaleProductCard.tsx";

export function FoundedSaleProductList() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useSearchProductsQuery(
    { name: searchTerm },
    { skip: !searchTerm },
  );

  const filteredProducts = searchTerm ? (data?.data.products ?? []) : [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
        {isLoading && <Loader />}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            <p>هیج کاڵایەک نەدۆزرایەوە</p>
          </div>
        )}

        {!isLoading &&
          filteredProducts.map((product) => (
            <FoundSaleProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
