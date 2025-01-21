import { useDispatch } from "react-redux";
import { useState } from "react";
import { addPurchaseProduct } from "@/features/purchase/stores/purchaseSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSearchProductsQuery } from "@/features/product/api/productApiSlice.ts";
import { ProductSearchResult } from "@/features/purchase/types/purchaseProduct.types.ts";
import { Loader } from "@/components/common/Loader.tsx";

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
            <FoundProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

interface FoundProductCardProps {
  product: ProductSearchResult;
}

function FoundProductCard({ product }: FoundProductCardProps) {
  const dispatch = useDispatch();
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

  const onSelectUnit = (unitId: number) => {
    setSelectedUnitId((prev) => (prev === unitId ? null : unitId));
  };

  const onAddProduct = () => {
    if (selectedUnitId === null) return;

    const selectedUnit = product.productUnits.find(
      (unit) => unit.id === selectedUnitId,
    );
    if (!selectedUnit) return;

    dispatch(
      addPurchaseProduct({
        product,
        selectedUnit,
        quantity: 1,
        price: 1000,
      }),
    );

    setSelectedUnitId(null);
  };

  return (
    <div className="border p-4 rounded-md flex justify-between items-center mb-2">
      <div>
        <p className="text-lg font-semibold">{product.name}</p>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {product.productUnits?.map((unit) => (
            <Button
              key={unit.id}
              variant={selectedUnitId === unit.id ? "default" : "secondary"}
              onClick={() => onSelectUnit(unit.id)}
              className={"border"}
            >
              {unit.unitSymbol}
            </Button>
          ))}
        </div>
      </div>
      <Button
        onClick={onAddProduct}
        disabled={selectedUnitId === null}
        className="ml-4"
      >
        <ArrowLeft size={20} />
      </Button>
    </div>
  );
}
